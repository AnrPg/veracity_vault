CREATE DATABASE IF NOT EXISTS veracity_vault_db;
USE veracity_vault_db;

CREATE TABLE IF NOT EXISTS wikidata_items (
  id VARCHAR(32) NOT NULL PRIMARY KEY,
  title VARCHAR(512) NOT NULL,
  description TEXT,
  image VARCHAR(1024),
  views INT DEFAULT 0,
  category VARCHAR(256),
  rarity VARCHAR(64),
  last_updated DATETIME,
  infobox JSON,
  content TEXT,
  score_date DATE NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_score_date (score_date)
);
