/*
 * demo-page.js — renders the two-column demo stand (intro + Vera chat) for one demo tenant.
 * Data: GET /api/v1/demo/config (via VeraDemoChat) + legacy extras from brands.json (photo, footer logo,
 * integrations, white background). Tenant id: window.DEMO_TENANT or ?t=<id>. window.DEMO_OVERRIDES (optional, unused now)
 * can override hero_description / accent / name. Requires ../assets/js/vera-demo-chat.js.
 */
(function () {
  'use strict';
  var SCRIPT = document.currentScript && document.currentScript.src;
  var BASE = new URL('./', SCRIPT || location.href).href;
  var BRAND = BASE + 'brand/';
  var esc = VeraDemoChat.escapeHtml;
  var DEFAULT_AVATAR = BRAND + 'vera_avatar_v2.png';
  var DEFAULT_INTEGRATIONS = [
    { title: 'Я на связи везде:', description: 'встречаю клиентов в WhatsApp, Telegram, MAX, на Авито, в VK и на сайте.' },
    { title: 'Я знаю ваш продукт до мелочей:', description: 'интегрируюсь с 1С, МойСклад и базами учета — проверяю наличие, свободные слоты, актуальные цены и считаю стоимость на лету.' },
    { title: 'Я сама веду CRM:', description: 'мгновенно фиксирую контакты, историю общения и готовые сделки в Битрикс24, amoCRM или любой другой системе.' }
  ];
  var DEFAULT_HERO = 'Я уже изучила ваш бизнес и готова стать вашим лучшим сотрудником. Объединяю обаяние чуткого эксперта, острый ум и железную цифровую дисциплину. Держу в памяти историю каждого клиента, общаюсь по стандартам флагманского салона и уверенно довожу диалоги до реальных сделок в CRM.';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
  var ICON_RESET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>';

  var ICON_BOSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>';
  var ICON_CLIENT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  var BOSS_INTRO = '<div class="dp-day">Сегодня</div><div class="dp-boss-note">Вы — руководитель. Спросите Веру о сегодняшних клиентах, эскалациях или о том, что она знает.</div>';
  var BOSS_CHIPS = ['Сколько клиентов сегодня писали?', 'О чём чаще всего спрашивали?', 'Были ли сегодня эскалации?'];
  var BOSS_PLACEHOLDER = 'Спросите, сколько клиентов сегодня писали';

  function asset(v) { return !v ? '' : /^(https?:)?\/\//.test(v) ? v : BRAND + v; }
  function hexToRgb(h) {
    h = String(h || '').replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function darken(h, k) {
    var c = hexToRgb(h);
    return c ? '#' + c.map(function (x) { return ('0' + Math.round(x * k).toString(16)).slice(-2); }).join('') : h;
  }
  function time() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

  // The Human-in-the-Loop card the manager gets. The backend sends the real one (escalation.alert_preview, written
  // from the whole dialog); show it with demo-only bits (session id, internal channel name) cleaned up.
  // Only if it is missing, fall back to a rough client-side guess (guessCard).
  function escalationCard(userText, history, reply, e) {
    e = e || {};
    var p = String(e.alert_preview || '').trim();
    if (p) {
      return p.replace(/(👤 Клиент:\s*)demo_[a-z0-9]+/i, '$1имя не указано')
        .replace(/\s*\(demo_[a-z0-9]+\)/gi, '')
        .replace(/(📱 Канал:\s*)landing_demo\b/, '$1Виджет на сайте');
    }
    return guessCard(userText, history, reply, e.reason);
  }

  function guessCard(userText, history, reply, reason) {
    var ctx = history.concat([userText]).join(' ');
    var m, name = null;
    // A name is a capitalised word: "Меня зовут Алексей", "Я Алексей", "Алексей здесь", or a short reply to
    // "как к вам обращаться?" ("Алексей", "Алексей, руковожу отделом"). Newest message first; "я руковожу" is not a name.
    var notName = ['Здравствуйте', 'Добрый', 'Доброе', 'Привет', 'Приветствую', 'Спасибо', 'Поняла', 'Понял', 'Конечно',
      'Уже', 'Да', 'Нет', 'Хорошо', 'Ок', 'Скажите', 'Подскажите', 'Расскажите', 'Сколько', 'Какие', 'Какая', 'Как', 'Что', 'Чем',
      'Где', 'Когда', 'Можно', 'Хочу', 'Нужно', 'Нам', 'Мы', 'Мне', 'Руковожу', 'Работаю', 'Интересует', 'Отлично',
      'Понятно', 'Ясно', 'Супер', 'Давайте', 'Интересно', 'Благодарю', 'Здорово', 'Telegram', 'WhatsApp', 'Instagram', 'Email'];
    // Imperatives and verbs ("Подождите", "Перезвоните", "Объясните") are not names.
    function pick(w) { return w && notName.indexOf(w) < 0 && !/(?:те|ть|ться|тесь|ся)$/.test(w) ? w : null; }
    var msgs = history.concat([userText]);
    for (var k = msgs.length - 1; k >= 0 && !name; k--) {
      var t = String(msgs[k] || '').trim();
      if ((m = t.match(/(?:[Мм]еня зовут|[Мм]о[её] имя)\s+([А-ЯЁA-Z][а-яёa-z]+)/)) ||
          (m = t.match(/(?:^|[\s,.!?])[Яя]\s*[-,]?\s+([А-ЯЁA-Z][а-яёa-z]+)/)) ||
          (m = t.match(/([А-ЯЁA-Z][а-яёa-z]+)\s+(?:здесь|тут)\b/)) ||
          (m = t.match(/^([А-ЯЁA-Z][а-яёa-z]{1,20})\s*(?:[,.!]|$)/))) name = pick(m[1]);
    }
    if (!name && (m = reply.match(/^([А-ЯЁA-Z][а-яёa-z]+)[,!]/))) name = pick(m[1]);
    var cities = [], cityRe = /(Москв|Казан|Санкт-Петербург|Питер|Батуми|Тбилиси|Екатеринбург|Новосибирск|Краснодар|Сочи)[а-я]*/gi, cm;
    var norm = { 'москв': 'Москва', 'казан': 'Казань', 'санкт-петербург': 'Санкт-Петербург', 'питер': 'Санкт-Петербург', 'батуми': 'Батуми',
      'тбилиси': 'Тбилиси', 'екатеринбург': 'Екатеринбург', 'новосибирск': 'Новосибирск', 'краснодар': 'Краснодар', 'сочи': 'Сочи' };
    while ((cm = cityRe.exec(ctx))) { var c = norm[cm[1].toLowerCase()] || cm[0]; if (cities.indexOf(c) < 0) cities.push(c); }
    // The backend's reason is a summary of the dialog: never replace it with a keyword guess.
    var problem = reason || 'Срочный вопрос клиента';
    var contact = (ctx.match(/\+?[78][-\s(]?[0-9]{3}[-\s)]?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}/) ||
      ctx.match(/@[a-zA-Z0-9_]{4,}/) || ctx.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/) || [null])[0];
    var l = ['🚨 Срочная эскалация менеджеру (Human-in-the-Loop)\n', '👤 Клиент: ' + (name || 'Имя не указано')];
    if (contact) l.push('📞 Контакт: ' + contact);
    if (cities.length) l.push('📍 География: ' + cities.join(', '));
    l.push('⚠️ Суть проблемы: ' + problem, '💬 Сообщение: «' + userText.trim() + '»', '📱 Канал: Виджет на сайте', '⏰ Норматив реакции: < 60 секунд');
    return l.join('\n');
  }

  async function legacy(tid) {
    try {
      var r = await fetch(BASE + 'brands.json', { cache: 'no-cache' });
      if (!r.ok) return {};
      return ((await r.json()).tenants || {})[tid] || {};
    } catch (e) { return {}; }
  }

  async function init(root) {
    var tid = window.DEMO_TENANT || new URLSearchParams(location.search).get('t');
    if (!tid || !/^[a-z0-9_-]{1,64}$/.test(tid)) {
      root.innerHTML = '<div class="dp-err">Укажите демо в адресе: ?t=&lt;id&gt;</div>';
      return;
    }
    var chat = new VeraDemoChat({ tenantId: tid, persistSession: false });
    var boss = null;  // boss-mode chat, created once /demo/config says boss_mode: true
    var cfg, lg;
    try { cfg = await chat.getConfig(); } catch (e) { root.innerHTML = '<div class="dp-err">' + esc(e.message) + '</div>'; return; }
    var bossEnabled = cfg.boss_mode === true;
    if (bossEnabled) boss = new VeraDemoChat({ tenantId: tid, env: chat.env, persistSession: false, endpoint: '/api/v1/demo/boss-chat', storageKey: 'vera_demo_boss_session_' + tid });
    lg = await legacy(tid);
    var ov = window.DEMO_OVERRIDES || {};

    var name = ov.name || cfg.business_name || lg.name || tid;
    var accent = ov.accent || cfg.accent_color || lg.accent || '#f59e0b';
    var hover = (!ov.accent && !cfg.accent_color && lg.hover) || darken(accent, 0.82);
    var rgb = hexToRgb(accent);
    var ring = rgb ? 'rgba(' + rgb.join(',') + ',.35)' : 'rgba(245,158,11,.35)';
    var avatar = asset(cfg.avatar_url) || asset(lg.avatar) || DEFAULT_AVATAR;
    var photo = asset(ov.photo_url) || asset(lg.photo);
    var footerLogo = asset(lg.footer_logo) || asset(cfg.logo_url);
    var hero = ov.hero_description || cfg.hero_description || lg.hero_description || DEFAULT_HERO;
    var placeholder = cfg.placeholder_text || lg.placeholder || 'Задайте любой вопрос по продукции, ценам или услугам...';
    // brands.json "hide_questions": true keeps the chat window free of suggestion chips (they hide replies on phones).
    var chips = lg.hide_questions ? [] : (cfg.suggested_questions && cfg.suggested_questions.length ? cfg.suggested_questions : lg.suggested_questions) || [];
    var integrations = lg.integrations && lg.integrations.length ? lg.integrations : DEFAULT_INTEGRATIONS;
    // Optional brands.json wording: "of_name" (genitive, e.g. "Школы менеджмента «Стратоплан»") and "note_role" ("будущего слушателя").
    var ofName = lg.of_name || name, sourceOf = lg.of_name || 'компании ' + name;
    var noteRole = lg.note_role || 'покупателя';

    document.title = 'Демо ALTAI Optima + ' + name;
    root.className = 'dp' + (lg.white_background ? ' dp-white' : '');
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-hover', hover);
    root.style.setProperty('--accent-ring', ring);

    var info = '<div class="dp-info">' + integrations.map(function (i) {
      return '<p><b>' + esc(i.title) + '</b> <span>' + esc(i.description) + '</span></p>';
    }).join('') + '<p class="dp-small">И это лишь малая часть моих навыков. Напишите мне в чат и давайте пообщаемся поближе. Готова пройти любой стресс-тест.</p></div>' +
      '<p class="dp-disc">Это демо-версия Веры на основе открытых материалов ' + esc(sourceOf) +
      '. Для точных ответов во всех сценариях нужна полноценная интеграция от <a href="https://optima.altaiweb.online" target="_blank" rel="noopener noreferrer">ALTAI Optima</a></p>';

    root.innerHTML =
      '<main class="dp-main">' +
        '<section class="dp-intro"><div class="dp-top">' +
          '<h1>Добрый день! <span>Меня зовут Вера</span></h1>' +
          '<p class="dp-desc">' + esc(hero) + '</p>' +
          '<p class="dp-note">Напишите мне от лица ' + esc(noteRole) + ' и проверьте мой профессионализм в деле</p>' +
          (photo ? '<div class="dp-photo"><img src="' + esc(photo) + '" alt="Вера, консультант ' + esc(ofName) + '"></div>' : '') +
        '</div><div class="dp-info-desktop">' + info + '</div></section>' +
        '<section class="dp-chat" aria-label="Чат с Верой">' +
          '<div class="dp-head"><div class="dp-who"><div class="dp-ava"><img src="' + esc(avatar) + '" alt="Вера"><i></i></div>' +
            '<div class="dp-name"><b>Вера</b><small><span class="dp-sub-c">консультант ' + esc(ofName) + ' · </span><span class="dp-sub-b" hidden>режим руководителя · </span><span class="dp-status">в сети</span></small></div></div>' +
            '<button type="button" class="dp-reset" title="Начать диалог сначала" aria-label="Сбросить диалог">' + ICON_RESET + '<span>Новый диалог</span></button></div>' +
          (bossEnabled ? '<button type="button" class="dp-mode" hidden></button>' : '') +
          '<div class="dp-stream" role="log" aria-live="polite"><div class="dp-day">Сегодня</div></div>' +
          (bossEnabled ? '<div class="dp-stream" role="log" aria-live="polite" hidden>' + BOSS_INTRO + '</div>' : '') +
          '<div class="dp-foot">' + (chips.length || bossEnabled ? '<div class="dp-chips"></div>' : '') +
            '<form class="dp-form"><input class="dp-input" type="text" autocomplete="off" maxlength="' + (cfg.max_message_length || 4000) + '" placeholder="' + esc(placeholder) + '">' +
            '<button class="dp-send" type="submit" aria-label="Отправить" disabled>' + ICON_SEND + '</button></form></div>' +
        '</section>' +
        '<div class="dp-info-mobile">' + info + '</div>' +
      '</main>' +
      '<footer class="dp-bar"><div>' + (footerLogo ? '<img src="' + esc(footerLogo) + '" alt="' + esc(name) + '">' : '') + '</div>' +
        '<a href="https://optima.altaiweb.online" target="_blank" rel="noopener noreferrer"><span>powered by</span><b>ALTAI OPTIMA</b></a></footer>';

    var streams = root.querySelectorAll('.dp-stream'), stream = streams[0], bstream = streams[1] || null;
    var input = root.querySelector('.dp-input'), sendBtn = root.querySelector('.dp-send');
    var status = root.querySelector('.dp-status'), modeBtn = root.querySelector('.dp-mode'), chipsEl = root.querySelector('.dp-chips');
    var subC = root.querySelector('.dp-sub-c'), subB = root.querySelector('.dp-sub-b');
    var mode = 'customer', voice = null, bossShown = false, drafts = { customer: '', boss: '' };

    function bubble(inner, extra) { return '<div class="dp-bubble">' + inner + (extra || '') + '<div class="dp-time">' + time() + '</div></div>'; }

    // One view per chat: its own stream, typing indicator and last rows. Customer replies may carry escalation cards;
    // boss replies are plain Vera bubbles.
    function bindView(c, st, isBoss) {
      var typing = null, lastUser = '', lastUserRow = null, lastAiRow = null, view = { history: [] };
      function scroll() { setTimeout(function () { st.scrollTo({ top: st.scrollHeight, behavior: 'smooth' }); }, 30); }
      function row(kind, html) {
        var d = document.createElement('div');
        d.className = 'dp-row ' + kind;
        d.innerHTML = (kind !== 'user' ? '<img src="' + esc(avatar) + '" alt="">' : '') + html;
        st.appendChild(d);
        scroll();
        return d;
      }
      c.hooks.onUser = function (t) { lastUser = t; lastAiRow = null; lastUserRow = row('user', bubble(VeraDemoChat.formatText(t))); };
      c.hooks.onUserVoice = function (v) {
        lastUser = 'Голосовое сообщение'; lastAiRow = null;
        lastUserRow = row('user', bubble(''));
        lastUserRow.querySelector('.dp-bubble').insertBefore(VeraDemoChat.createVoicePlayer(v, 'dp'), lastUserRow.querySelector('.dp-time'));
      };
      // Transcript: small grey text under Vera's reply (or under the visitor's bubble when Vera wrote nothing).
      c.hooks.onTranscript = function (t) {
        var host = lastAiRow || lastUserRow;
        var b = host && host.querySelector('.dp-bubble');
        if (!b) return;
        var d = document.createElement('div');
        d.className = 'dp-transcript';
        d.textContent = 'Вы сказали: «' + t + '»';
        b.insertBefore(d, b.querySelector('.dp-time'));
        scroll();
      };
      c.hooks.onTyping = function (on) {
        status.textContent = on ? 'печатает…' : 'в сети';
        if (on && !typing) { typing = row('ai', '<div class="dp-typing" aria-label="Вера печатает"><span></span><span></span><span></span></div>'); }
        if (!on && typing) { typing.remove(); typing = null; }
        updateModeBtn();
      };
      c.hooks.onError = function (e) { row('ai err', bubble(esc(e.message || 'Извините, произошла временная ошибка связи. Пожалуйста, попробуйте еще раз.'))); };
      if (isBoss) {
        c.hooks.onReply = function (d) {
          var text = String(d.assistant_response || '').trim();
          if (!text || d.technical) { row('ai err', bubble('Вера не смогла ответить. Попробуйте ещё раз.')); return; }
          lastAiRow = row('ai', bubble(VeraDemoChat.formatText(text)));
        };
        return view;
      }
      var history = view.history;
      c.hooks.onReply = function (d) {
        // Escalation: Vera writes nothing, as in a real chat. The page explains what happened instead.
        if (d.technical) {
          var note = document.createElement('div');
          note.className = 'dp-esc';
          note.innerHTML = '<b>🔔 Вера передала диалог менеджеру</b>' +
            '<p>Клиент не получает автоответ, чат встаёт на паузу, а менеджеру в Telegram приходит карточка:</p>' +
            '<pre>' + esc(escalationCard(lastUser, history, '', d.escalation)) + '</pre>' +
            '<em>💡 На демо-стенде чат не блокируется: можно продолжать.</em>';
          history.push(lastUser);
          st.appendChild(note);
          scroll();
          return;
        }
        var text = d.assistant_response || 'Спасибо за обращение! Менеджер свяжется с вами.', esca = '';
        if (d.escalation) {
          esca = '<div class="dp-esc"><b>🔔 Симуляция эскалации менеджеру (Human-in-the-Loop)</b>' +
            '<p>В боевом мессенджере диалог ставится на паузу, а в Telegram-бот команды отправляется карточка:</p>' +
            '<pre>' + esc(escalationCard(lastUser, history, text, d.escalation)) + '</pre>' +
            '<em>💡 На демо-стенде диалог не блокируется — вы можете продолжить общение с Верой.</em></div>';
        }
        history.push(lastUser);
        lastAiRow = row('ai', bubble(VeraDemoChat.formatText(text), esca));
        // The first real reply (not a note, not an error, not empty) of this page load unlocks the boss-mode button.
        if (bossEnabled && !bossShown && d.ok !== false && !d.error && String(d.assistant_response || '').trim()) showModeBtn();
      };
      return view;
    }
    var cview = bindView(chat, stream, false);
    if (boss) bindView(boss, bstream, true);

    function curChat() { return mode === 'boss' ? boss : chat; }
    function submit(t) {
      t = String(t || '').trim();
      var c = curChat();
      if (!t || c.isSending) return;
      input.value = ''; sendBtn.disabled = true;
      if (voice) voice.sync();
      c.send(t).catch(function () {}).then(function () { input.focus(); if (voice) voice.sync(); });
    }
    // Mic next to Send while the input is empty; only when the browser can record and /demo/config has voice_enabled: true.
    voice = typeof VeraDemoChat.bindVoice === 'function' && VeraDemoChat.bindVoice(chat, { form: root.querySelector('.dp-form'), input: input, sendBtn: sendBtn, prefix: 'dp', onRecordingChange: function () { updateModeBtn(); } });
    root.querySelector('.dp-form').addEventListener('submit', function (e) { e.preventDefault(); submit(input.value); });
    input.addEventListener('input', function () { sendBtn.disabled = !input.value.trim(); });
    function renderChips(list) {
      if (!chipsEl) return;
      chipsEl.innerHTML = '';
      list.forEach(function (q) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'dp-chip'; b.textContent = q;
        b.addEventListener('click', function () { submit(q); });
        chipsEl.appendChild(b);
      });
    }
    renderChips(chips);
    root.querySelector('.dp-reset').addEventListener('click', function () {
      if (mode === 'boss') { boss.reset(); bstream.innerHTML = BOSS_INTRO; return; }
      chat.reset(); cview.history.length = 0;
      stream.innerHTML = '<div class="dp-day">Сегодня</div>';
    });

    // ---- boss mode: the mode button and the switch between the two chats
    function updateModeBtn() {
      if (!modeBtn) return;
      modeBtn.disabled = !!(chat.isSending || (boss && boss.isSending) || (voice && voice.isRecording()));
    }
    function paintModeBtn() {
      var b = mode === 'boss';
      modeBtn.classList.toggle('dp-mode-alt', b);
      modeBtn.innerHTML = (b ? ICON_CLIENT : ICON_BOSS) + '<span>' + (b ? 'Пообщайтесь с Верой как клиент' : 'Пообщайтесь с Верой как её руководитель') + '</span>';
    }
    function showModeBtn() {
      if (bossShown || !modeBtn) return;
      bossShown = true;
      paintModeBtn();
      updateModeBtn();
      modeBtn.hidden = false;
      modeBtn.classList.add('dp-mode-in');  // CSS animation (none under prefers-reduced-motion)
    }
    function setMode(next) {
      if (next === mode || (modeBtn && modeBtn.disabled)) return;
      drafts[mode] = input.value;
      mode = next;
      var b = mode === 'boss';
      stream.hidden = b; bstream.hidden = !b;
      subC.hidden = b; subB.hidden = !b;
      input.placeholder = b ? BOSS_PLACEHOLDER : placeholder;
      renderChips(b ? BOSS_CHIPS : chips);
      if (chipsEl) chipsEl.hidden = false;
      input.value = drafts[mode];
      sendBtn.disabled = !input.value.trim();
      if (voice && voice.setEnabled) voice.setEnabled(!b); else if (voice) voice.sync();
      paintModeBtn();
      var sh = b ? bstream : stream;
      sh.scrollTop = sh.scrollHeight;
    }
    if (modeBtn) modeBtn.addEventListener('click', function () { setMode(mode === 'boss' ? 'customer' : 'boss'); });
  }

  var root = document.getElementById('app');
  if (root) init(root);
})();
