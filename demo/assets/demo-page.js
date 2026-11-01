/*
 * demo-page.js — renders the two-column demo stand (intro + Vera chat) for one demo tenant.
 * Data: GET /api/v1/demo/config (via VeraDemoChat) + legacy extras from brands.json (photo, footer logo,
 * integrations, white background). Tenant id: window.DEMO_TENANT or ?t=<id>. window.DEMO_OVERRIDES (from demo.json)
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

  // Client-side preview of the Human-in-the-Loop card the supervisor would get (demo only).
  function escalationCard(userText, history, reply, reason) {
    var ctx = history.concat([userText]).join(' ');
    var m, name = null;
    if ((m = ctx.match(/(?:меня зовут|мое имя|я)\s+([А-ЯЁA-Z][а-яёa-z]+)/i)) ||
        (m = ctx.match(/([А-ЯЁA-Z][а-яёa-z]+)\s+(?:здесь|тут)/i))) name = m[1].charAt(0).toUpperCase() + m[1].slice(1);
    if (!name && (m = reply.match(/^([А-ЯЁA-Z][а-яёa-z]+)[,!]/)) &&
        ['Здравствуйте', 'Добрый', 'Привет', 'Приветствую', 'Спасибо', 'Поняла', 'Конечно', 'Уже'].indexOf(m[1]) < 0) name = m[1];
    var project = null;
    if (/клиник|медицин|стоматолог|здоров/i.test(ctx)) project = 'Медицина / Клиники';
    else if (/недвижим|резиденци|квартир|новостройк|жк/i.test(ctx)) project = 'Недвижимость / Резиденции';
    else if (/приложени|доставк/i.test(ctx)) project = 'Мобильное приложение / Доставка';
    else if (/магазин|e-commerce|бренд|ритейл/i.test(ctx)) project = 'E-commerce / Ритейл';
    var cities = [], cityRe = /(Москв|Казан|Санкт-Петербург|Питер|Батуми|Тбилиси|Екатеринбург|Новосибирск|Краснодар|Сочи)[а-я]*/gi, cm;
    var norm = { 'москв': 'Москва', 'казан': 'Казань', 'санкт-петербург': 'Санкт-Петербург', 'питер': 'Санкт-Петербург', 'батуми': 'Батуми',
      'тбилиси': 'Тбилиси', 'екатеринбург': 'Екатеринбург', 'новосибирск': 'Новосибирск', 'краснодар': 'Краснодар', 'сочи': 'Сочи' };
    while ((cm = cityRe.exec(ctx))) { var c = norm[cm[1].toLowerCase()] || cm[0]; if (cities.indexOf(c) < 0) cities.push(c); }
    var problem = reason || 'Срочный вопрос клиента';
    var money = /деньги|списал|баланс|оплат/i.test(ctx), stop = /встал|останов|не крут|сбой|ошибк/i.test(ctx);
    if (money && stop) problem = 'Кампания остановлена, средства списаны';
    else if (money) problem = 'Вопрос по балансу / списанию средств';
    else if (stop) problem = 'Остановка открутки кампании / технический сбой';
    else if (/договор|акт|счет|бухгалтер/i.test(ctx)) problem = 'Вопрос по закрывающим документам и договору';
    else if (/скидк|тариф|стоимост|прайс/i.test(ctx)) problem = 'Запрос индивидуальных коммерческих условий';
    var contact = (ctx.match(/\+?[78][-\s(]?[0-9]{3}[-\s)]?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}/) ||
      ctx.match(/@[a-zA-Z0-9_]{4,}/) || ctx.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/) || [null])[0];
    var l = ['🚨 Срочная эскалация менеджеру (Human-in-the-Loop)\n', '👤 Клиент: ' + (name || 'Имя не указано')];
    if (contact) l.push('📞 Контакт: ' + contact);
    if (project) l.push('🏢 Проект / сфера: ' + project);
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
    var cfg, lg;
    try { cfg = await chat.getConfig(); } catch (e) { root.innerHTML = '<div class="dp-err">' + esc(e.message) + '</div>'; return; }
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
    var chips = (cfg.suggested_questions && cfg.suggested_questions.length ? cfg.suggested_questions : lg.suggested_questions) || [];
    var integrations = lg.integrations && lg.integrations.length ? lg.integrations : DEFAULT_INTEGRATIONS;

    document.title = 'Демо ALTAI Optima + ' + name;
    root.className = 'dp' + (lg.white_background ? ' dp-white' : '');
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-hover', hover);
    root.style.setProperty('--accent-ring', ring);

    var info = '<div class="dp-info">' + integrations.map(function (i) {
      return '<p><b>' + esc(i.title) + '</b> <span>' + esc(i.description) + '</span></p>';
    }).join('') + '<p class="dp-small">И это лишь малая часть моих навыков. Напишите мне в чат и давайте пообщаемся поближе. Готова пройти любой стресс-тест.</p></div>' +
      '<p class="dp-disc">Это демо-версия Веры на основе открытых материалов компании ' + esc(name) +
      '. Для точных ответов во всех сценариях нужна полноценная интеграция от <a href="https://optima.altaiweb.online" target="_blank" rel="noopener noreferrer">ALTAI Optima</a></p>';

    root.innerHTML =
      '<main class="dp-main">' +
        '<section class="dp-intro"><div class="dp-top">' +
          '<h1>Добрый день! <span>Меня зовут Вера</span></h1>' +
          '<p class="dp-desc">' + esc(hero) + '</p>' +
          '<p class="dp-note">Напишите мне от лица покупателя и проверьте мой профессионализм в деле</p>' +
          (photo ? '<div class="dp-photo"><img src="' + esc(photo) + '" alt="Вера — консультант ' + esc(name) + '"></div>' : '') +
        '</div><div class="dp-info-desktop">' + info + '</div></section>' +
        '<section class="dp-chat" aria-label="Чат с Верой">' +
          '<div class="dp-head"><div class="dp-who"><div class="dp-ava"><img src="' + esc(avatar) + '" alt="Вера"><i></i></div>' +
            '<div class="dp-name"><b>Вера</b><small>консультант ' + esc(name) + ' · <span class="dp-status">в сети</span></small></div></div>' +
            '<button type="button" class="dp-reset" title="Начать диалог сначала" aria-label="Сбросить диалог">' + ICON_RESET + '<span>Новый диалог</span></button></div>' +
          '<div class="dp-stream" role="log" aria-live="polite"><div class="dp-day">Сегодня</div></div>' +
          '<div class="dp-foot"><div class="dp-chips"></div>' +
            '<form class="dp-form"><input class="dp-input" type="text" autocomplete="off" maxlength="' + (cfg.max_message_length || 4000) + '" placeholder="' + esc(placeholder) + '">' +
            '<button class="dp-send" type="submit" aria-label="Отправить" disabled>' + ICON_SEND + '</button></form></div>' +
        '</section>' +
        '<div class="dp-info-mobile">' + info + '</div>' +
      '</main>' +
      '<footer class="dp-bar"><div>' + (footerLogo ? '<img src="' + esc(footerLogo) + '" alt="' + esc(name) + '">' : '') + '</div>' +
        '<a href="https://optima.altaiweb.online" target="_blank" rel="noopener noreferrer"><span>powered by</span><b>ALTAI OPTIMA</b></a></footer>';

    var stream = root.querySelector('.dp-stream'), input = root.querySelector('.dp-input'), sendBtn = root.querySelector('.dp-send');
    var status = root.querySelector('.dp-status'), typing = null, history = [], lastUser = '';

    function scroll() { setTimeout(function () { stream.scrollTo({ top: stream.scrollHeight, behavior: 'smooth' }); }, 30); }
    function row(kind, html) {
      var d = document.createElement('div');
      d.className = 'dp-row ' + kind;
      d.innerHTML = (kind !== 'user' ? '<img src="' + esc(avatar) + '" alt="">' : '') + html;
      stream.appendChild(d);
      scroll();
      return d;
    }
    function bubble(inner, extra) { return '<div class="dp-bubble">' + inner + (extra || '') + '<div class="dp-time">' + time() + '</div></div>'; }

    chat.hooks.onUser = function (t) { lastUser = t; row('user', bubble(VeraDemoChat.formatText(t))); };
    chat.hooks.onTyping = function (on) {
      status.textContent = on ? 'печатает…' : 'в сети';
      if (on && !typing) { typing = row('ai', '<div class="dp-typing" aria-label="Вера печатает"><span></span><span></span><span></span></div>'); }
      if (!on && typing) { typing.remove(); typing = null; }
    };
    chat.hooks.onReply = function (d) {
      var text = d.assistant_response || 'Спасибо за обращение! Менеджер свяжется с вами.', esca = '';
      if (d.escalation) {
        esca = '<div class="dp-esc"><b>🔔 Симуляция эскалации менеджеру (Human-in-the-Loop)</b>' +
          '<p>В боевом мессенджере диалог ставится на паузу, а в Telegram-бот команды отправляется карточка:</p>' +
          '<pre>' + esc(escalationCard(lastUser, history, text, d.escalation.reason)) + '</pre>' +
          '<em>💡 На демо-стенде диалог не блокируется — вы можете продолжить общение с Верой.</em></div>';
      }
      history.push(lastUser);
      row('ai', bubble(VeraDemoChat.formatText(text), esca));
    };
    chat.hooks.onError = function (e) { row('ai err', bubble(esc(e.message || 'Извините, произошла временная ошибка связи. Пожалуйста, попробуйте еще раз.'))); };

    function submit(t) {
      t = String(t || '').trim();
      if (!t || chat.isSending) return;
      input.value = ''; sendBtn.disabled = true;
      chat.send(t).catch(function () {}).then(function () { input.focus(); });
    }
    root.querySelector('.dp-form').addEventListener('submit', function (e) { e.preventDefault(); submit(input.value); });
    input.addEventListener('input', function () { sendBtn.disabled = !input.value.trim(); });
    chips.forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'dp-chip'; b.textContent = q;
      b.addEventListener('click', function () { submit(q); });
      root.querySelector('.dp-chips').appendChild(b);
    });
    root.querySelector('.dp-reset').addEventListener('click', function () {
      chat.reset(); history = [];
      stream.innerHTML = '<div class="dp-day">Сегодня</div>';
    });
  }

  var root = document.getElementById('app');
  if (root) init(root);
})();
