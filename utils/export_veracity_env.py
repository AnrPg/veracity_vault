import os
from pathlib import Path
from decrypt_config import load_config


config_path = Path(__file__).parent.parent / ".config" / "sensitive_config.yml.age"
config = load_config(config_path)

veracity_cfg = config["veracity_vault_db"]

for key, value in veracity_cfg.items():
    os.environ[f"VV_{key.upper()}"] = str(value)

# Optional: print debug
print("[INFO] Loaded environment variables for veracity_vault_db")
