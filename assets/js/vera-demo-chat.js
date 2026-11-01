/*
 * vera-demo-chat.js — the one demo chat client for optima pages.
 *
 *   const chat = new VeraDemoChat({ tenantId: 'my_demo' });
 *   const cfg  = await chat.getConfig();            // GET  /api/v1/demo/config
 *   const data = await chat.send('Привет');         // POST /api/v1/demo/chat
 *
 * API base: prod by default; `?api=stage` in the page URL (or options.env = 'stage') switches to stage.
 * Errors thrown by send() carry `.status` (429 = rate limit / queue busy) and a Russian `.message`.
 * VeraDemoChat.mount(el, opts) renders a ready-made chat UI; custom layouts use the hooks
 * (onUser / onTyping / onReply / onError) or call send() themselves and use VeraDemoChat.formatText().
 */
(function (global) {
  'use strict';

  var API = {
    prod: 'https://api.optima.altaiweb.online',
    stage: 'https://stage-api.optima.altaiweb.online'
  };

  function detectEnv(explicit) {
    if (explicit === 'stage' || explicit === 'prod') return explicit;
    try {
      if (new URLSearchParams(global.location.search).get('api') === 'stage') return 'stage';
    } catch (e) {}
    return 'prod';
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /** Escapes text, links http(s) URLs only, supports **bold**, *italic* and line breaks. */
  function formatText(text, linkClass) {
    if (!text) return '';
    var cls = linkClass || 'vdc-link';
    var safe = escapeHtml(text);
    safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function (_m, label, url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="' + cls + '">' + label + '</a>';
    });
    safe = safe.replace(/(^|[\s(>])(https?:\/\/[^\s<]+)/g, function (_m, prefix, url) {
      var trailing = '';
      var punct = url.match(/[.,;:!?)]+$/);
      if (punct) {
        trailing = punct[0];
        url = url.slice(0, -trailing.length);
      }
      return prefix + '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="' + cls + '">' + url + '</a>' + trailing;
    });
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    return safe.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }

  function VeraDemoChat(options) {
    options = options || {};
    if (!options.tenantId) throw new Error('VeraDemoChat: tenantId is required');
    this.tenantId = options.tenantId;
    this.env = detectEnv(options.env);
    this.baseUrl = (options.apiBase || API[this.env]).replace(/\/$/, '');
    this.storageKey = 'vera_demo_session_' + this.tenantId;
    this.persistSession = options.persistSession !== false;
    this.extraPayload = options.extraPayload || {};
    this.hooks = {
      onUser: options.onUser, onTyping: options.onTyping, onReply: options.onReply, onError: options.onError
    };
    this.config = null;
    this.sessionId = null;
    this.isSending = false;
    if (this.persistSession) {
      try { this.sessionId = global.sessionStorage.getItem(this.storageKey); } catch (e) {}
    }
  }

  VeraDemoChat.formatText = formatText;
  VeraDemoChat.escapeHtml = escapeHtml;

  VeraDemoChat.prototype._setSession = function (id) {
    this.sessionId = id || null;
    if (!this.persistSession) return;
    try {
      if (id) global.sessionStorage.setItem(this.storageKey, id);
      else global.sessionStorage.removeItem(this.storageKey);
    } catch (e) {}
  };

  VeraDemoChat.prototype.reset = function () { this._setSession(null); };

  VeraDemoChat.prototype.getConfig = async function () {
    if (this.config) return this.config;
    var res = await fetch(this.baseUrl + '/api/v1/demo/config?tenant_id=' + encodeURIComponent(this.tenantId));
    if (!res.ok) {
      var err = new Error(res.status === 404 ? 'Демо не найдено или отключено.' : 'Не удалось загрузить настройки демо.');
      err.status = res.status;
      throw err;
    }
    this.config = await res.json();
    return this.config;
  };

  /** Sends one message; resolves with the API response (assistant_response, escalation, ...). */
  VeraDemoChat.prototype.send = async function (message) {
    var text = String(message || '').trim();
    if (!text || this.isSending) return null;
    this.isSending = true;
    if (this.hooks.onUser) this.hooks.onUser(text);
    if (this.hooks.onTyping) this.hooks.onTyping(true);
    try {
      var payload = Object.assign({}, this.extraPayload, {
        message: text,
        tenant_id: this.tenantId,
        session_id: this.sessionId || undefined
      });
      var res = await fetch(this.baseUrl + '/api/v1/demo/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        var e = new Error(res.status === 429
          ? 'Сервер временно перегружен или вы пишете слишком часто — подождите минуту.'
          : 'Ошибка сервера (' + res.status + ')');
        e.status = res.status;
        throw e;
      }
      var data = await res.json();
      if (data && data.session_id) this._setSession(data.session_id);
      if (this.hooks.onReply) this.hooks.onReply(data);
      return data;
    } catch (err) {
      if (this.hooks.onError) this.hooks.onError(err);
      throw err;
    } finally {
      this.isSending = false;
      if (this.hooks.onTyping) this.hooks.onTyping(false);
    }
  };

  /**
   * Ready-made UI. Colors come from the tenant config (accent_color) via CSS variables:
   * --vdc-accent. opts: { chat, suggestions: true }.
   */
  VeraDemoChat.mount = async function (el, opts) {
    opts = opts || {};
    var chat = opts.chat || new VeraDemoChat({ tenantId: opts.tenantId });
    var cfg = await chat.getConfig();
    el.classList.add('vdc-root');
    if (cfg.accent_color) el.style.setProperty('--vdc-accent', cfg.accent_color);
    el.innerHTML =
      '<div class="vdc-messages" role="log" aria-live="polite"></div>' +
      '<div class="vdc-suggest"></div>' +
      '<form class="vdc-form"><input class="vdc-input" type="text" autocomplete="off" maxlength="' +
      (cfg.max_message_length || 4000) + '" placeholder="' +
      escapeHtml(cfg.placeholder_text || 'Задайте вопрос…') + '"><button class="vdc-send" type="submit">Отправить</button></form>';

    var box = el.querySelector('.vdc-messages');
    var input = el.querySelector('.vdc-input');
    var typingEl = null;
    var who = cfg.business_name || 'Вера';

    function add(role, html) {
      var d = document.createElement('div');
      d.className = 'vdc-msg vdc-' + role;
      d.innerHTML = html;
      box.appendChild(d);
      box.scrollTop = box.scrollHeight;
      return d;
    }

    chat.hooks.onUser = function (t) { add('user', formatText(t)); };
    chat.hooks.onTyping = function (on) {
      if (on && !typingEl) typingEl = add('ai vdc-typing', '<span></span><span></span><span></span>');
      if (!on && typingEl) { typingEl.remove(); typingEl = null; }
    };
    chat.hooks.onReply = function (d) {
      add('ai', '<b class="vdc-who">' + escapeHtml(who) + '</b>' + formatText(d.assistant_response || ''));
    };
    chat.hooks.onError = function (e) { add('ai vdc-error', escapeHtml(e.message || 'Ошибка')); };

    add('ai', '<b class="vdc-who">' + escapeHtml(who) + '</b>' + formatText(cfg.welcome_message || ''));

    function submit(text) {
      input.value = '';
      chat.send(text).catch(function () {});
    }
    el.querySelector('.vdc-form').addEventListener('submit', function (e) {
      e.preventDefault();
      submit(input.value);
    });
    if (opts.suggestions !== false) {
      var sg = el.querySelector('.vdc-suggest');
      (cfg.suggested_questions || []).forEach(function (q) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'vdc-chip';
        b.textContent = q;
        b.addEventListener('click', function () { submit(q); });
        sg.appendChild(b);
      });
    }
    return { chat: chat, config: cfg };
  };

  global.VeraDemoChat = VeraDemoChat;
})(typeof window !== 'undefined' ? window : this);
