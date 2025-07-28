#!/usr/bin/env python3

from airflow.decorators import dag, task
from datetime import datetime
import requests
import json
import mysql.connector
from airflow.hooks.base import BaseHook

conn = BaseHook.get_connection("veracity_mysql")
engine_uri = conn.get_uri()


@dag(schedule="@daily", start_date=datetime(2025, 7, 1), catchup=False)  # noqa: E501
def wikidata_etl():
    @task()
    def extract():
        # 1) Get top-10 articles of today via Pageviews API
        today = datetime.utcnow().strftime("%Y/%m/%d")
        pv_url = f"https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/{today}"  # noqa: E501
        resp = requests.get(pv_url)
        resp.raise_for_status()
        articles = resp.json()["items"][0]["articles"][
            :10
        ]  # top-10 :contentReference[oaicite:2]{index=2}
        return [{"title": a["article"], "views": a["views"]} for a in articles]

    @task()
    def enrich(articles):
        enriched = []
        for art in articles:
            title = art["title"]
            # 2a) Fetch Wikidata QID via search
            mw_q = requests.get(
                "https://www.wikidata.org/w/api.php",
                params={
                    "action": "wbsearchentities",
                    "format": "json",
                    "search": title,
                    "language": "en",
                },
            ).json()
            qid = mw_q["search"][0]["id"]

            # 2b) Fetch Wikidata item details
            wd = requests.get(
                f"https://www.wikidata.org/w/rest.php/wikibase/v1/item/{qid}"
            ).json()

            # 2c) Fetch page content and infobox via MediaWiki Action API
            mw_resp = requests.get(
                "https://en.wikipedia.org/w/api.php",
                params={
                    "action": "parse",
                    "page": title,
                    "prop": "text|sections|infoboxes|categories",
                    "format": "json",
                    "formatversion": 2,
                },
            )
            parse = mw_resp.json()["parse"]

            enriched.append(
                {
                    "qid": qid,
                    "title": wd["labels"]["en"]["value"],
                    "description": wd["descriptions"]["en"]["value"],
                    "image": wd["claims"]
                    .get("P18", [{}])[0]
                    .get("mainsnak", {})
                    .get("datavalue", {})
                    .get("value", {})
                    .get("source", ""),
                    "views": art["views"],
                    "category": wd["claims"]
                    .get("P31", [{}])[0]
                    .get("mainsnak", {})
                    .get("datavalue", {})
                    .get("value", ""),
                    "rarity": "Common",
                    "last_updated": wd["lastrevid"],
                    "infobox": parse.get("infoboxes", {}),
                    "content": parse["text"],
                    "score_date": datetime.utcnow().date().isoformat(),
                }
            )
        return enriched

    @task()
    def load(data):
        import os

        conn = mysql.connector.connect(
            user=os.environ["VV_MYSQL_USER"],
            password=os.environ["VV_MYSQL_PASSWORD"],
            host=os.environ["VV_HOST"],
            port=int(os.environ.get("VV_PORT", 3306)),
            database=os.environ["VV_MYSQL_DB"],
        )
        cursor = conn.cursor()
        for a in data:
            cursor.execute(
                """
                INSERT INTO wikidata_items
                (id, title, description, image, views, category, rarity,
                    last_updated, infobox, content, score_date)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                ON DUPLICATE KEY UPDATE
                title=VALUES(title),
                description=VALUES(description),
                image=VALUES(image),
                views=VALUES(views),
                category=VALUES(category),
                rarity=VALUES(rarity),
                last_updated=VALUES(last_updated),
                infobox=VALUES(infobox),
                content=VALUES(content),
                score_date=VALUES(score_date)
            """,
                (
                    a["qid"],
                    a["title"],
                    a["description"],
                    a["image"],
                    a["views"],
                    a["category"],
                    a["rarity"],
                    a["last_updated"],
                    json.dumps(a["infobox"]),
                    a["content"],
                    a["score_date"],
                ),
            )
        conn.commit()
        cursor.close()
        conn.close()

    load(enrich(extract()))


wikidata_etl()
