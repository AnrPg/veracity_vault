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
    data = None
    if path.suffix == ".age":
        # determine identity file
        identity = os.environ.get("AGE_IDENTITY")
        # (bash command export:
        # AGE_IDENTITY="~/apps/alethiomics_sensitive_data/key.txt")
        # e.g. /home/user/key.pub or /.config/key.txt or whatever...

        cmd = ["age"]
        if identity:
            cmd += ["--identity", identity]
        cmd += ["--decrypt", str(path)]
        # decrypt into memory
        proc = subprocess.run(cmd, check=True, stdout=subprocess.PIPE)
        data = proc.stdout.decode()
    else:
        data = path.read_text()
    return yaml.safe_load(data) or {}
