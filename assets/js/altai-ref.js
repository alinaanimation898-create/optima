/**
 * altai-ref.js: partner referral code + public API helpers shared by every top-level page.
 * - On load: reads ?r= (alias ?ref=), validates ^[A-Za-z0-9]{4,20}$, lowercases it and stores the cookie
 *   `altai_ref` (90 days, Domain=.altaiweb.online so the partner portal reads it too). Last link wins.
 * - window.AltaiRef.get()      -> stored code or ''
 * - window.AltaiRef.apiBase()  -> API base (prod default; ?api=stage / ?api=local), same rule as vera-demo-chat.js
 * - window.AltaiRef.portalUrl()-> partner portal base (prod / stage / local)
 * - window.AltaiRef.postJson(path, body) -> {ok, status, data}; never throws, no credentials
 * - window.AltaiRef.sendLead(fields) -> POST /api/v1/public/leads with ref, page and the honeypot filled in.
 *   `fields.ref` (a code the visitor typed) wins over the cookie; a valid typed code is also stored as the cookie.
 */
(function (global) {
  'use strict';
  var COOKIE = 'altai_ref';
  var CODE_RE = /^[A-Za-z0-9]{4,20}$/;
  var API = {
    prod: 'https://api.optima.altaiweb.online',
    stage: 'https://stage-api.optima.altaiweb.online',
    local: 'http://localhost:8000'
  };
  var PORTAL = {
    prod: 'https://partner.altaiweb.online',
    stage: 'https://stage-partner.altaiweb.online',
    local: 'http://localhost:3000'
  };

  function env() {
    try {
      var q = new URLSearchParams(global.location.search).get('api');
      if (q === 'stage' || q === 'local') return q;
    } catch (e) {}
    return 'prod';
  }

  function isLocalHost() {
    var h = global.location.hostname;
    return !h || h === 'localhost' || h === '127.0.0.1' || global.location.protocol === 'file:';
  }

  function store(code) {
    var c = COOKIE + '=' + code + '; Path=/; Max-Age=7776000; SameSite=Lax';
    if (!isLocalHost()) c += '; Domain=.altaiweb.online; Secure';
    try { document.cookie = c; } catch (e) {}
  }

  function get() {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=([^;]*)'));
      var v = m ? decodeURIComponent(m[1]).toLowerCase() : '';
      return CODE_RE.test(v) ? v : '';
    } catch (e) { return ''; }
  }

  try {
    var p = new URLSearchParams(global.location.search);
    var raw = (p.get('r') || p.get('ref') || '').trim();
    if (CODE_RE.test(raw)) store(raw.toLowerCase());
  } catch (e) {}

  function postJson(path, body) {
    return fetch(API[env()] + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (data) {
        return { ok: r.ok && data && data.ok !== false, status: r.status, data: data || {} };
      });
    }).catch(function () {
      return { ok: false, status: 0, data: {} };
    });
  }

  function typedRef(v) {
    var t = String(v || '').trim().toLowerCase();
    if (!t) return get();
    if (CODE_RE.test(t)) store(t);
    return t;
  }

  function sendLead(f) {
    return postJson('/api/v1/public/leads', {
      kind: f.kind || 'client_trial',
      name: f.name || '',
      contact: f.contact || '',
      channel: f.channel || '',
      site: f.site || '',
      message: f.message || '',
      page: String(global.location.href).slice(0, 500),
      ref: typedRef(f.ref),
      website: f.website || ''
    });
  }

  global.AltaiRef = {
    get: get,
    apiBase: function () { return API[env()]; },
    portalUrl: function () { return PORTAL[env()]; },
    postJson: postJson,
    sendLead: sendLead
  };
})(window);
