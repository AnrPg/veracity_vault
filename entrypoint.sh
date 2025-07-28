#!/bin/sh
set -e

# 1) Migrate metadata DB and load default connections
airflow db migrate                                              # Create/upgrade the metadata schema :contentReference[oaicite:0]{index=0}
airflow connections create-default-connections                  # Load Airflow’s built-in provider connections :contentReference[oaicite:1]{index=1}

# 2) Create an admin user (if not already present)
airflow users create \
  --username admin \
  --firstname Apostolos \
  --lastname Regas \
  --role Admin \
  --password admin \
  --email regas.apn@gmail.com

# 3) Start Airflow scheduler & webserver
airflow scheduler &                                             # Kick off scheduled DAG runs :contentReference[oaicite:2]{index=2}
airflow webserver --port 8080 &                                 # Serve the UI on port 8080 :contentReference[oaicite:3]{index=3}

# 4) Launch FastAPI
uvicorn main:app --host 0.0.0.0 --port 8000 &                   # Run your FastAPI backend :contentReference[oaicite:4]{index=4}

# 5) Build & serve Next.js
cd frontend
npm ci                                                          # Install dependencies
npm run build                                                   # Build static assets
npm run start -- -p 3000 &                                      # Serve on port 3000

# 6) Wait for all background processes
wait
