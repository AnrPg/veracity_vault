# 🧠 Veracity Vault

![CI](https://github.com/AnrPg/veracity_vault/actions/workflows/ci.yml/badge.svg)
![Deps Export](https://github.com/AnrPg/veracity_vault/actions/workflows/export-dependencies.yml/badge.svg)

> **Veracity Vault** is a fully containerized, API-first data pipeline that ingests, enriches, and serves structured knowledge from Wikidata — powering dynamic, Wikipedia-style infopages with real-time updates.

---

## 🌍 Why Veracity Vault?

Knowledge on the internet is fragmented and often stale. This project bridges SPARQL and REST endpoints from Wikidata into a MySQL-backed data pipeline, processed by Apache Airflow, and served through a blazing-fast FastAPI backend to a modern React/Next.js frontend. It showcases:

- 🔄 **Automated ETL** of structured linked data (SPARQL + REST)
- ⚡ **Async API** with PostgreSQL-like performance using `asyncpg`
- 🌐 **SEO-ready frontend** that mimics Wikipedia’s Infoboxes
- 🐳 **Full Docker containerization** for reproducible environments
- 🔁 **CI workflows + pre-commit hooks** for stability and hygiene

---

## 📦 Project Structure

```
veracity-vault/
├── airflow/         # Apache Airflow DAGs and ETL logic
├── backend/         # FastAPI async backend
├── frontend/        # Next.js frontend
├── db/              # MySQL schema and initialization
├── .github/         # CI workflows (GitHub Actions)
├── .env             # Environment variables
├── docker-compose.yml
├── environment.yml  # Conda environment definition
└── README.md
```

---

## 🚀 How It Works

### 🛠️ 1. Daily ETL with Apache Airflow

- `extract()`: SPARQL query to fetch top-10 human entities
- `enrich()`: Fetches full data via Wikidata REST API
- `load()`: UPSERTs enriched records into MySQL (`wikidata_items`)

### 🔌 2. Async FastAPI Backend

```python
@app.get("/api/items/{qid}")
async def get_item(qid: str):
    conn = await asyncpg.connect(...)
    row = await conn.fetchrow("SELECT * FROM wikidata_items WHERE id = $1", qid)
    return dict(row) if row else {"error": "Item not found"}
```

- ⚙️ **Non-blocking I/O** with `asyncpg`
- 📜 **Pydantic** for validation and OpenAPI docs (`/docs`)

### 🖼️ 3. Static Frontend with Next.js

- `getStaticProps` fetches entity data at build time from FastAPI
- `Infobox.tsx` renders structured fields like a Wikipedia sidebar

---

## 💡 Impact & Use Cases

- **Educational Tools**: Real-time entity cards for students or researchers
- **Search Interfaces**: Addable as a module to semantic search UIs
- **Data Journalism**: Rapid profiles for trending topics or people
- **Research Prototyping**: Great example of DAG + API + UI stack

---

## ✅ Quickstart

```bash
# 1. Clone & Setup Conda (for local dev tools)
conda env create -f environment.yml
conda activate veracity-vault

# 2. Build and run all services
docker-compose up --build

# 3. Access services:
# - Airflow:   http://localhost:8080
# - Backend:   http://localhost:8000/api/items/Q42
# - Frontend:  http://localhost:3000/items/Q42
```

---

## 🔍 Developer Workflows

### Pre-commit Hook

Auto-formats Python, lints frontend, and checks types.

```bash
cp scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### CI/CD

- `ci.yml`: Runs formatting, linting, and type-checks on every PR
- `export-deps.yml`: Updates dependency snapshots automatically

---

## 🔒 Encryption with *age*

Veracity Vault ensures sensitive configuration files (such as `.env` or database dumps) remain secure using the modern, minimal‑dependency encryption tool **age** by Filippo Valsorda. Designed for simplicity, safety, and composability, age encrypts data to public‑key recipients or passphrases—without the overhead and complexity of traditional tools like GPG. Learn more at [filippo.io/age](https://filippo.io/age/age).

- Encryption Command

To encrypt your sensitive YAML or env files before committing:

```bash
age -r $(cat ./.config/age/key.pub) \
  -o ./.config/sensitive_config.yml.age \
  ./.config/sensitive_config.yml
```

- `-r $(cat key.pub)`: Reads the recipient’s public key and encrypts the plaintext file.
- `-o ...age`: Specifies the output file, with `.age` extension.
- The unencrypted file `.config/sensitive_config.yml` remains local; only the encrypted `.age` file is committed.

Under the hood, **age** uses ChaCha20‑Poly1305 AEAD, providing both confidentiality and integrity guarantees without added complexity.

- Suggested Workflow & Integration

1. Generate your keypair with `age-keygen`.
2. Store the **public key** (`key.pub`) in your repository (e.g., `.config/age/key.pub`) and **keep the private key secure**.
3. Encrypt sensitive files locally before committing.
4. In CI/CD pipelines or deployments:
   - Decrypt using the private key.
   - Use secrets without exposing them in logs or artifacts.
   - Never commit decrypted files.

- Reference

Official project repository and documentation: **[github.com/FiloSottile/age](https://github.com/FiloSottile/age)**.

---

## 📜 License

MIT License. See `LICENSE` file.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 🧠 Inspired by

- [Wikidata](https://www.wikidata.org/)
- [Apache Airflow](https://airflow.apache.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)