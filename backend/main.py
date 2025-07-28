#!/usr/bin/env python3

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncpg


class Article(BaseModel):
    qid: str
    title: str
    description: str
    image: str
    views: int
    category: str
    rarity: str
    lastUpdated: int
    infobox: dict[str, str]
    content: str
    score_date: str


app = FastAPI()


@app.get("/api/items/{qid}")
async def get_item(qid: str):
    conn = await asyncpg.connect(
        user="root", password="root", database="wikidata", host="mysql"
    )
    row = await conn.fetchrow(
        """
       SELECT id as qid, title, description, image, views, category, rarity,
              last_updated AS lastUpdated, infobox, content, score_date
       FROM wikidata_items
       WHERE id = $1
    """,
        qid,
    )
    await conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Item not found")
    return dict(row)
