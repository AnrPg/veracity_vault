#!/bin/sh
set -e

# Set AGE key path (used by decrypt_config.py)
export AGE_IDENTITY=${AGE_IDENTITY:-"./.config/age/key.txt"}

# Decrypt and export DB credentials for veracity_vault
echo "[INFO] Loading encrypted config..."
python utils/export_veracity_env.py

# Register Airflow MySQL connection (will be used in the DAGs)
airflow connections add 'veracity_mysql' \
  --conn-uri "mysql://${VV_MYSQL_USER}:${VV_MYSQL_PASSWORD}@${VV_HOST}:${VV_PORT}/${VV_MYSQL_DB}" || true

# Ensure airflow.cfg exists
if [ ! -f "$AIRFLOW_HOME/airflow.cfg" ]; then
    echo "[INFO] Creating airflow.cfg"
    airflow db migrate
fi

# Ensure authentication is enabled in airflow.cfg
sed -i '/^authenticate =/d' "$AIRFLOW_HOME/airflow.cfg"
sed -i '/^auth_backend =/d' "$AIRFLOW_HOME/airflow.cfg"
echo "authenticate = True" >> "$AIRFLOW_HOME/airflow.cfg"
echo "auth_backend = airflow.www.security.FabAuthBackend" >> "$AIRFLOW_HOME/airflow.cfg"

# 1) Initialize the metadata DB (creates airflow.db if not exists)
airflow db migrate

# 2) Create Admin user (only if not already created)
airflow users create \
  --username admin \
  --firstname Apostolos \
  --lastname Regas \
  --role Admin \
  --password admin \
  --email regas.apn@gmail.com || true

airflow users list

# 3) Start Airflow
airflow scheduler &                    # Background scheduler
airflow webserver --port 8080 &       # UI

# 4) Start FastAPI
uvicorn main:app --host 0.0.0.0 --port 8000 &

# 5) Start frontend
cd frontend
npm ci
npm run build
npm run start -- -p 3000 &

# 6) Wait for everything
wait
