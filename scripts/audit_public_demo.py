from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {".html", ".css", ".js", ".md", ".txt", ".yml", ".yaml"}
FORBIDDEN_SUFFIXES = {".db", ".sqlite", ".sqlite3", ".pem", ".p12", ".pfx"}
FORBIDDEN_FILENAMES = {".env", "id_rsa", "id_ed25519"}
NETWORK_PATTERNS = {
    "fetch": re.compile(r"\bfetch\s*\("),
    "XMLHttpRequest": re.compile(r"\bXMLHttpRequest\b"),
    "WebSocket": re.compile(r"\bWebSocket\b"),
    "external URL": re.compile(r"https?://", re.IGNORECASE),
}
SECRET_PATTERNS = {
    "private key": re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    "generic API key": re.compile(r"(?i)\bapi[_-]?key\s*[:=]\s*['\"][^'\"]{12,}"),
    "generic client secret": re.compile(r"(?i)\bclient[_-]?secret\s*[:=]\s*['\"][^'\"]{12,}"),
    "bearer token": re.compile(r"(?i)\bauthorization\s*[:=]\s*['\"]bearer\s+[^'\"]+"),
}


class StrictHTMLParser(HTMLParser):
    def error(self, message: str) -> None:  # pragma: no cover - compatibility hook
        raise ValueError(message)


def project_files() -> list[Path]:
    ignored = {".git", "__pycache__"}
    return [path for path in ROOT.rglob("*") if path.is_file() and not ignored.intersection(path.parts)]


def main() -> int:
    errors: list[str] = []
    files = project_files()

    for path in files:
        relative = path.relative_to(ROOT)
        if path.name.lower() in FORBIDDEN_FILENAMES or path.suffix.lower() in FORBIDDEN_SUFFIXES:
            errors.append(f"arquivo sensível não permitido: {relative}")

    index = ROOT / "index.html"
    if not index.exists():
        errors.append("index.html ausente")
    else:
        parser = StrictHTMLParser(convert_charrefs=True)
        try:
            parser.feed(index.read_text(encoding="utf-8"))
            parser.close()
        except Exception as exc:  # noqa: BLE001
            errors.append(f"HTML inválido: {exc}")

    for path in files:
        if path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(ROOT)
        if relative.as_posix() == "README.md":
            text_for_network_scan = text.replace("https://leviroiz.github.io/gestao-lotes-consignados-demo/", "").replace("https://github.com/leviroiz", "")
        else:
            text_for_network_scan = text
        if relative.as_posix() in {"assets/app.js", "assets/styles.css", "index.html"}:
            for label, pattern in NETWORK_PATTERNS.items():
                if pattern.search(text_for_network_scan):
                    errors.append(f"integração de rede ({label}) encontrada em {relative}")
        for label, pattern in SECRET_PATTERNS.items():
            if pattern.search(text):
                errors.append(f"possível segredo ({label}) encontrado em {relative}")

    if errors:
        print("Auditoria reprovada:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Auditoria aprovada: {len(files)} arquivos verificados.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
