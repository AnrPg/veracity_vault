#!/usr/bin/env python3

import os
import subprocess
import yaml
from pathlib import Path


def load_config(path: Path) -> dict:
    """
    If `path` ends in .age, run `age --decrypt`
    (using $AGE_IDENTITY or default).
    Otherwise load plaintext YAML.
    """

    if not path.exists():
        raise FileNotFoundError(f"Config file not found: {path}")

    if path.suffix == ".age":
        # determine identity file
        identity = os.environ.get("AGE_IDENTITY")
        # (bash command export:
        # AGE_IDENTITY="~/apps/alethiomics_sensitive_data/key.txt")
        # e.g. /home/user/key.pub or /.config/key.txt or whatever...

        if not identity:
            raise EnvironmentError("AGE_IDENTITY is not set")

        cmd = ["age", "--identity", identity, "--decrypt", str(path)]
        proc = subprocess.run(cmd, check=True, stdout=subprocess.PIPE)

        raw_yaml = proc.stdout.decode()
    else:
        raw_yaml = path.read_text()

    return yaml.safe_load(raw_yaml) or {}
