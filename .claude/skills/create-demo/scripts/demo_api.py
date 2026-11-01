#!/usr/bin/env python3
"""Tiny client for the ALTAI demo-admin API (stdlib only). Shared by create-demo and update-demo.

Key lookup: --api-key, env ALTAI_DEMO_API_KEY, file ~/.config/altai/demo_api_key (chmod 600).
Environment: prod (default) or stage. The key only works on the environment that issued it.
"""
import json
import os
import urllib.error
import urllib.request

API_BASES = {
    "prod": "https://api.optima.altaiweb.online",
    "stage": "https://stage-api.optima.altaiweb.online",
}
SITE_BASE = "https://optima.altaiweb.online"


class ApiError(RuntimeError):
    def __init__(self, status: int, detail: str):
        super().__init__(f"HTTP {status}: {detail}")
        self.status = status
        self.detail = detail


def load_key(explicit: str = "") -> str:
    key = explicit or os.environ.get("ALTAI_DEMO_API_KEY", "")
    if not key:
        try:
            with open(os.path.expanduser("~/.config/altai/demo_api_key")) as f:
                key = f.read().strip()
        except OSError:
            key = ""
    if not key:
        raise SystemExit(
            "Demo API key required: pass --api-key, set ALTAI_DEMO_API_KEY, or put it in "
            "~/.config/altai/demo_api_key (chmod 600). Ask David for a personal key."
        )
    return key


class DemoApi:
    def __init__(self, env: str = "prod", api_key: str = ""):
        if env not in API_BASES:
            raise SystemExit("--env must be prod or stage")
        self.env = env
        # ALTAI_DEMO_API_BASE is for local testing against a dev server only
        self.base = os.environ.get("ALTAI_DEMO_API_BASE", API_BASES[env]).rstrip("/")
        self.key = load_key(api_key)

    def _call(self, method: str, path: str, body=None, auth: bool = True, timeout: int = 60):
        headers = {"Content-Type": "application/json"}
        if auth:
            headers["X-Demo-Api-Key"] = self.key
        data = json.dumps(body).encode("utf-8") if body is not None else None
        req = urllib.request.Request(self.base + path, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            raw = e.read().decode("utf-8", "replace")
            try:
                detail = json.loads(raw).get("detail", raw)
            except ValueError:
                detail = raw
            raise ApiError(e.code, str(detail))
        except urllib.error.URLError as e:
            raise SystemExit(f"Cannot reach {self.base}: {e}")

    # demo-admin
    def list_tenants(self):
        return self._call("GET", "/api/v1/demo-admin/tenants")["tenants"]

    def get_tenant(self, tid: str):
        return self._call("GET", f"/api/v1/demo-admin/tenants/{tid}")["tenant"]

    def create_tenant(self, tid: str, business_name: str):
        return self._call("POST", "/api/v1/demo-admin/tenants", {"tenant_id": tid, "business_name": business_name})["tenant"]

    def get_kb(self, tid: str):
        return self._call("GET", f"/api/v1/demo-admin/tenants/{tid}/kb")

    def put_kb(self, tid: str, doc: dict):
        return self._call("PUT", f"/api/v1/demo-admin/tenants/{tid}/kb", doc)

    def get_presentation(self, tid: str):
        return self._call("GET", f"/api/v1/demo-admin/tenants/{tid}/presentation")

    def put_presentation(self, tid: str, cfg: dict):
        return self._call("PUT", f"/api/v1/demo-admin/tenants/{tid}/presentation", cfg)

    def deactivate(self, tid: str):
        return self._call("POST", f"/api/v1/demo-admin/tenants/{tid}/deactivate", {})

    # public demo endpoints (no key)
    def chat(self, tid: str, message: str, session_id: str = ""):
        body = {"tenant_id": tid, "message": message}
        if session_id:
            body["session_id"] = session_id
        return self._call("POST", "/api/v1/demo/chat", body, auth=False, timeout=90)


def page_url(tid: str, env: str = "prod") -> str:
    suffix = "" if env == "prod" else "?api=stage"
    return f"{SITE_BASE}/demo/{tid}/{suffix}"


def generic_url(tid: str, env: str = "prod") -> str:
    suffix = "" if env == "prod" else "&api=stage"
    return f"{SITE_BASE}/demo/?t={tid}{suffix}"
