/*
 * vera-demo-chat.js — the one demo chat client for optima pages.
 *
 *   const chat = new VeraDemoChat({ tenantId: 'my_demo' });
 *   const cfg  = await chat.getConfig();            // GET  /api/v1/demo/config
 *   const data = await chat.send('Привет');         // POST /api/v1/demo/chat
 *
 * API base: prod by default; `?api=stage` / `?api=local` in the page URL (or options.env) switches to stage / http://localhost:8000.
 * options.endpoint (default '/api/v1/demo/chat') is the path send() posts to; options.storageKey overrides the session key.
 * Errors thrown by send() carry `.status` (429 = rate limit / queue busy) and a Russian `.message`.
 * VeraDemoChat.mount(el, opts) renders a ready-made chat UI; custom layouts use the hooks
 * (onUser / onTyping / onReply / onError) or call send() themselves and use VeraDemoChat.formatText().
 *
 * Voice (core POST /api/v1/demo/voice): shown only when VeraDemoChat.voiceSupported() and /demo/config has
 * `voice_enabled: true` (chat.voiceAvailable()). chat.sendVoice(blob, secs) fires onUserVoice({blob, secs, url}) and, after
 * onReply, onTranscript(text, data) when the transcript is not empty. VeraDemoChat.bindVoice() wires a mic button,
 * the recording bar and the hint into a form; VeraDemoChat.createVoicePlayer() builds the play button for a voice bubble.
 */
(function (global) {
  'use strict';

function altaiRefCode() {
  try {
    var c = window.AltaiRef && window.AltaiRef.get && window.AltaiRef.get();
    if (!c) { var m = /(?:^|;\s*)altai_ref=([^;]+)/.exec(document.cookie || ''); c = m && decodeURIComponent(m[1]); }
    return c ? String(c).toLowerCase() : '';
  } catch (e) { return ''; }
}

  var API = {
    prod: 'https://api.optima.altaiweb.online',
    stage: 'https://stage-api.optima.altaiweb.online',
    local: 'http://localhost:8000'
  };

  function detectEnv(explicit) {
    if (explicit === 'stage' || explicit === 'prod' || explicit === 'local') return explicit;
    try {
      var q = new URLSearchParams(global.location.search).get('api');
      if (q === 'stage' || q === 'local') return q;
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
    this.storageKey = options.storageKey || 'vera_demo_session_' + this.tenantId;
    this.endpoint = options.endpoint || '/api/v1/demo/chat';
    this.persistSession = options.persistSession !== false;
    this.extraPayload = options.extraPayload || {};
    this.hooks = {
      onUser: options.onUser, onTyping: options.onTyping, onReply: options.onReply, onError: options.onError,
      onUserVoice: options.onUserVoice, onTranscript: options.onTranscript
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
      var refCode = altaiRefCode();
      if (refCode) payload.ref = refCode;
      var res = await fetch(this.baseUrl + this.endpoint, {
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

  // ---------------------------------------------------------------------------------------------------- voice
  var VOICE_MAX_SECS = 60;
  var VOICE_MIN_SECS = 1;

  /** MediaRecorder + getUserMedia + secure context (https or localhost). */
  VeraDemoChat.voiceSupported = function () {
    try {
      return !!(global.isSecureContext && global.MediaRecorder && global.navigator &&
        global.navigator.mediaDevices && typeof global.navigator.mediaDevices.getUserMedia === 'function');
    } catch (e) { return false; }
  };

  /** True only when the browser can record and the core said `voice_enabled: true` (old core: field missing -> false). */
  VeraDemoChat.prototype.voiceAvailable = function () {
    return VeraDemoChat.voiceSupported() && !!this.config && this.config.voice_enabled === true;
  };

  function pickMime() {
    var list = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/mp4;codecs=mp4a.40.2', 'audio/ogg;codecs=opus'];
    for (var i = 0; i < list.length; i++) {
      try { if (global.MediaRecorder.isTypeSupported(list[i])) return list[i]; } catch (e) {}
    }
    return '';
  }

  /**
   * Recorder: start() asks for the microphone and begins; finish() resolves {blob, secs, mime}; cancel() drops it.
   * opts: { maxSecs (60), onTick(secs), onLimit(promise of the result) } — at the limit it stops by itself.
   */
  VeraDemoChat.createRecorder = function (opts) {
    opts = opts || {};
    var maxSecs = opts.maxSecs || VOICE_MAX_SECS;
    var stream = null, rec = null, chunks = [], timer = null, t0 = 0, mime = '', starting = false, cancelled = false;
    var self = { active: false };

    function release() {
      if (timer) { clearInterval(timer); timer = null; }
      if (stream) { stream.getTracks().forEach(function (t) { try { t.stop(); } catch (e) {} }); stream = null; }
      self.active = false;
    }
    function elapsed() { return Math.min(maxSecs, (Date.now() - t0) / 1000); }

    self.start = async function () {
      if (self.active || starting) return;
      starting = true; cancelled = false;
      try {
        var s = await global.navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
        stream = s;
        mime = pickMime();
        chunks = [];
        rec = mime ? new global.MediaRecorder(stream, { mimeType: mime }) : new global.MediaRecorder(stream);
        rec.ondataavailable = function (ev) { if (ev.data && ev.data.size) chunks.push(ev.data); };
        rec.start();
        t0 = Date.now();
        self.active = true;
        timer = setInterval(function () {
          var secs = elapsed();
          if (opts.onTick) opts.onTick(secs);
          if (secs >= maxSecs) {
            var p = self.finish();
            if (opts.onLimit) opts.onLimit(p); else p.catch(function () {});
          }
        }, 250);
        if (opts.onTick) opts.onTick(0);
      } catch (e) {
        release();
        throw e;
      } finally {
        starting = false;
      }
    };

    self.finish = function () {
      return new Promise(function (resolve, reject) {
        if (!rec || !self.active) { reject(new Error('not recording')); return; }
        var r = rec, secs = elapsed();
        self.active = false;
        if (timer) { clearInterval(timer); timer = null; }
        r.onstop = function () {
          var type = r.mimeType || mime || 'audio/webm';
          var blob = new Blob(chunks, { type: type });
          chunks = []; rec = null;
          release();
          resolve({ blob: blob, secs: secs, mime: type });
        };
        try { r.stop(); } catch (e) { release(); reject(e); }
      });
    };

    self.cancel = function () {
      cancelled = true;
      if (rec) { rec.onstop = null; try { if (rec.state !== 'inactive') rec.stop(); } catch (e) {} }
      rec = null; chunks = [];
      release();
    };
    return self;
  };

  function voiceError(status, detail) {
    if (detail && typeof detail === 'string') return detail;
    if (status === 400) return 'Не удалось прочитать запись. Попробуйте ещё раз или напишите текстом.';
    if (status === 404) return 'Демо не найдено или отключено.';
    if (status === 413) return 'Запись слишком большая. Запишите сообщение покороче или напишите текстом.';
    if (status === 429) return 'Слишком много голосовых сообщений — подождите немного или напишите текстом.';
    return 'Ошибка сервера (' + status + ')';
  }

  /** Sends a recorded voice message; resolves with the API response (chat response + transcript). */
  VeraDemoChat.prototype.sendVoice = async function (blob, secs) {
    if (!blob || this.isSending) return null;
    this.isSending = true;
    var url = '';
    try { url = global.URL.createObjectURL(blob); } catch (e) {}
    if (this.hooks.onUserVoice) this.hooks.onUserVoice({ blob: blob, secs: secs || 0, url: url });
    if (this.hooks.onTyping) this.hooks.onTyping(true);
    try {
      var fd = new FormData();
      var ext = /mp4|m4a|aac/i.test(blob.type) ? 'm4a' : /ogg/i.test(blob.type) ? 'ogg' : 'webm';
      fd.append('audio', blob, 'voice.' + ext);
      fd.append('tenant_id', this.tenantId);
      if (this.sessionId) fd.append('session_id', this.sessionId);
      var refCode = altaiRefCode();
      if (refCode) fd.append('ref', refCode);
      if (secs) fd.append('duration_secs', String(Math.floor(secs)));
      var res = await fetch(this.baseUrl + '/api/v1/demo/voice', { method: 'POST', body: fd });
      if (!res.ok) {
        var detail = null;
        try { detail = (await res.json()).detail; } catch (e2) {}
        var e = new Error(voiceError(res.status, detail));
        e.status = res.status;
        throw e;
      }
      var data = await res.json();
      if (data && data.session_id) this._setSession(data.session_id);
      if (this.hooks.onReply) this.hooks.onReply(data);
      var tr = data && typeof data.transcript === 'string' ? data.transcript.trim() : '';
      if (tr && this.hooks.onTranscript) this.hooks.onTranscript(tr, data);
      return data;
    } catch (err) {
      if (this.hooks.onError) this.hooks.onError(err);
      throw err;
    } finally {
      this.isSending = false;
      if (this.hooks.onTyping) this.hooks.onTyping(false);
    }
  };

  function fmtSecs(s) {
    s = Math.max(0, Math.round(s || 0));
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }
  VeraDemoChat.formatDuration = fmtSecs;

  var SVG_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/></svg>';
  var SVG_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z"/></svg>';
  var SVG_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
  var SVG_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';

  /** Play button + duration for the visitor's voice bubble. `prefix` is the CSS class prefix ('dp' or 'vdc'). */
  VeraDemoChat.createVoicePlayer = function (info, prefix) {
    var wrap = document.createElement('div');
    wrap.className = prefix + '-voice';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = prefix + '-voice-play';
    btn.setAttribute('aria-label', 'Воспроизвести');
    btn.innerHTML = SVG_PLAY;
    var bar = document.createElement('span');
    bar.className = prefix + '-voice-bar';
    var fill = document.createElement('i');
    bar.appendChild(fill);
    var dur = document.createElement('span');
    dur.className = prefix + '-voice-dur';
    var total = info.secs || 0;
    dur.textContent = fmtSecs(total);
    wrap.appendChild(btn); wrap.appendChild(bar); wrap.appendChild(dur);
    var audio = null;
    function reset() {
      btn.innerHTML = SVG_PLAY; btn.setAttribute('aria-label', 'Воспроизвести');
      fill.style.width = '0'; dur.textContent = fmtSecs(total);
    }
    btn.addEventListener('click', function () {
      if (!info.url) return;
      if (!audio) {
        audio = new Audio(info.url);
        audio.addEventListener('timeupdate', function () {
          var d = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : total;
          if (d > 0) fill.style.width = Math.min(100, audio.currentTime / d * 100) + '%';
          dur.textContent = fmtSecs(audio.currentTime);
        });
        audio.addEventListener('ended', reset);
      }
      if (audio.paused) {
        audio.play().then(function () { btn.innerHTML = SVG_PAUSE; btn.setAttribute('aria-label', 'Пауза'); }).catch(function () {});
      } else {
        audio.pause(); btn.innerHTML = SVG_PLAY; btn.setAttribute('aria-label', 'Воспроизвести');
      }
    });
    return wrap;
  };

  /**
   * Wires voice recording into a text form. Does nothing (returns null) unless chat.voiceAvailable().
   * ui: { form, input, sendBtn, prefix ('dp'|'vdc'), recorder opts? }. Adds a mic button next to Send (visible while the
   * input is empty), a recording bar (timer, Cancel, Send) and a hint line. Returns { sync() } — call sync() after the
   * input value is changed from code.
   */
  VeraDemoChat.bindVoice = function (chat, ui) {
    if (!chat.voiceAvailable()) return null;
    var p = ui.prefix, form = ui.form, input = ui.input, sendBtn = ui.sendBtn;

    var mic = document.createElement('button');
    mic.type = 'button';
    mic.className = p + '-mic';
    mic.setAttribute('aria-label', 'Записать голосовое сообщение');
    mic.title = 'Записать голосовое сообщение';
    mic.innerHTML = SVG_MIC;
    form.insertBefore(mic, sendBtn);

    var bar = document.createElement('div');
    bar.className = p + '-rec';
    bar.hidden = true;
    bar.innerHTML = '<span class="' + p + '-rec-dot"></span><span class="' + p + '-rec-time" aria-live="off">0:00</span>' +
      '<button type="button" class="' + p + '-rec-cancel">Отмена</button>' +
      '<button type="button" class="' + p + '-rec-send" aria-label="Отправить голосовое сообщение">' + SVG_SEND + '</button>';
    form.appendChild(bar);
    var timeEl = bar.querySelector('.' + p + '-rec-time');

    var hint = document.createElement('div');
    hint.className = p + '-hint';
    hint.setAttribute('role', 'status');
    hint.hidden = true;
    form.parentNode.insertBefore(hint, form);
    var hintTimer = null;
    function showHint(text) {
      hint.textContent = text;
      hint.hidden = !text;
      if (hintTimer) clearTimeout(hintTimer);
      if (text) hintTimer = setTimeout(function () { hint.hidden = true; }, 8000);
    }

    var recording = false;
    function sync() {
      var empty = !input.value.trim();
      if (!enabled) { mic.style.display = 'none'; sendBtn.style.display = ''; bar.hidden = true; input.style.display = ''; return; }
      if (recording) {
        input.style.display = 'none'; mic.style.display = 'none'; sendBtn.style.display = 'none'; bar.hidden = false;
        return;
      }
      bar.hidden = true; input.style.display = '';
      mic.style.display = empty ? '' : 'none';
      sendBtn.style.display = empty ? 'none' : '';
      mic.disabled = !!chat.isSending;
    }
    function setRecording(on) { recording = on; sync(); if (ui.onRecordingChange) ui.onRecordingChange(on); }
    var enabled = true;

    function deliver(result) {
      setRecording(false);
      if (result.secs < VOICE_MIN_SECS) { showHint('Слишком короткое сообщение — запишите ещё раз.'); return; }
      chat.sendVoice(result.blob, result.secs).catch(function () {}).then(sync);
    }

    var recorder = VeraDemoChat.createRecorder({
      maxSecs: VOICE_MAX_SECS,
      onTick: function (secs) { timeEl.textContent = fmtSecs(secs) + ' / ' + fmtSecs(VOICE_MAX_SECS); },
      onLimit: function (promise) { promise.then(deliver).catch(function () { setRecording(false); }); }
    });

    mic.addEventListener('click', function () {
      if (recording || chat.isSending) return;
      showHint('');
      recorder.start().then(function () { setRecording(true); }).catch(function (e) {
        var n = e && e.name;
        if (n === 'NotAllowedError' || n === 'SecurityError' || n === 'PermissionDeniedError') {
          showHint('Нет доступа к микрофону. Разрешите его в настройках браузера или напишите текстом.');
        } else if (n === 'NotFoundError' || n === 'DevicesNotFoundError') {
          showHint('Микрофон не найден. Напишите текстом.');
        } else {
          showHint('Не удалось включить запись. Напишите текстом.');
        }
        setRecording(false);
      });
    });
    bar.querySelector('.' + p + '-rec-cancel').addEventListener('click', function () { recorder.cancel(); setRecording(false); });
    bar.querySelector('.' + p + '-rec-send').addEventListener('click', function () {
      recorder.finish().then(deliver).catch(function () { setRecording(false); });
    });
    input.addEventListener('input', sync);
    global.addEventListener('pagehide', function () { recorder.cancel(); });
    sync();
    // isRecording(): a recording is in progress. setEnabled(false): mic hidden, Send always shown (text-only mode).
    return {
      sync: sync,
      isRecording: function () { return recording; },
      setEnabled: function (on) { enabled = !!on; sync(); }
    };
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
    var lastUserEl = null, lastReplyEl = null;

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
    chat.hooks.onUserVoice = function (v) {
      lastReplyEl = null;
      lastUserEl = add('user vdc-voice-msg', '');
      lastUserEl.appendChild(VeraDemoChat.createVoicePlayer(v, 'vdc'));
    };
    chat.hooks.onReply = function (d) {
      if (d.technical) { add('note', formatText(d.assistant_response || '')); return; }
      lastReplyEl = add('ai', '<b class="vdc-who">' + escapeHtml(who) + '</b>' + formatText(d.assistant_response || ''));
    };
    chat.hooks.onTranscript = function (t) {
      var host = lastReplyEl || lastUserEl;
      if (!host) return;
      var d = document.createElement('div');
      d.className = 'vdc-transcript';
      d.textContent = 'Вы сказали: «' + t + '»';
      host.appendChild(d);
      box.scrollTop = box.scrollHeight;
    };
    chat.hooks.onError = function (e) { add('ai vdc-error', escapeHtml(e.message || 'Ошибка')); };

    add('ai', '<b class="vdc-who">' + escapeHtml(who) + '</b>' + formatText(cfg.welcome_message || ''));

    function submit(text) {
      input.value = '';
      if (voice) voice.sync();
      chat.send(text).catch(function () {}).then(function () { if (voice) voice.sync(); });
    }
    el.querySelector('.vdc-form').addEventListener('submit', function (e) {
      e.preventDefault();
      submit(input.value);
    });
    var voice = VeraDemoChat.bindVoice(chat, {
      form: el.querySelector('.vdc-form'), input: input, sendBtn: el.querySelector('.vdc-send'), prefix: 'vdc'
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
