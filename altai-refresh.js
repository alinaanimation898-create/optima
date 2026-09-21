/* =====================================================================
   ALTAI OPTIMA — обновление 21.09.2026
   1. Строка «который час» на первом экране
   2. Оживающие уведомления
   3. «ИИ печатает» → «печатает» по всему сайту
   4. Демо: кнопки «трудного клиента»
   5. Команда: «Пригласить на собеседование» и «Нанять»
   6. Результаты: расчётные сценарии по нишам
   7. Калькулятор: пересчёт по актуальным тарифам
   Подключается после main.js (defer). Ничего не ломает, если элемента нет.
   ===================================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nf = function (n) { return Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' '); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Тарифы (единый источник цифр) ---------- */
  var SETUP = 29000;
  var TARIFFS = [
    { name: 'Старт', upTo: 200, price: 22000 },
    { name: 'Бизнес', upTo: 600, price: 33000 },
    { name: 'Поток', upTo: 1500, price: 55000 },
    { name: 'Империя', upTo: Infinity, price: 88000 }
  ];
  function tariffFor(dialogs) {
    for (var i = 0; i < TARIFFS.length; i++) if (dialogs <= TARIFFS[i].upTo) return TARIFFS[i];
    return TARIFFS[TARIFFS.length - 1];
  }

  /* =================================================================
     1. «Сайт знает, который час»
     ================================================================= */
  var DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  function timeLine() {
    var el = document.getElementById('aoTimeText');
    if (!el) return;
    var d = new Date();
    var h = d.getHours(), day = d.getDay();
    var hm = ('0' + h).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    var weekend = day === 0 || day === 6;
    var text;
    if (h >= 23 || h < 7) text = '<b>Сейчас ' + hm + '.</b> Ваши менеджеры спят. Он на смене.';
    else if (weekend) text = '<b>' + DAYS[day] + ', ' + hm + '.</b> У отдела продаж выходной, у него — самые горячие часы.';
    else if (h < 10) text = '<b>Сейчас ' + hm + '.</b> Отдел продаж ещё в пути, а он уже ответил первым клиентам.';
    else if (h < 19) text = '<b>Сейчас ' + hm + '.</b> Пока менеджер на звонке, он уже ответил пятерым.';
    else text = '<b>Сейчас ' + hm + '.</b> Рабочий день закончился, а клиенты только начинают писать. Он на связи.';
    el.innerHTML = text;
  }

  /* =================================================================
     2. Оживающие уведомления
     ================================================================= */
  var NOTIF = [
    { wrap: '.cta-push-wrap-1', mode: 'reply', delay: 300,
      reply: 'Здравствуйте, Анна! Да, работаем. Подскажу по наличию и оформлю заказ?', badge: 'ответ за 40 сек' },
    { wrap: '.cta-push-wrap-2', mode: 'reply', delay: 1500,
      reply: 'Доброе утро, Мария! Подскажу цену и наличие. Какой у вас размер?', badge: 'ответ за 30 сек' },
    { wrap: '.cta-push-wrap-3', mode: 'swap', delay: 2700,
      text: 'ИИ-продавец ответил клиенту по регламенту скидок', badge: 'готово' },
    { wrap: '.cta-push-wrap-4', mode: 'swap', delay: 3700,
      text: '4 сделки распределены между менеджерами', badge: 'готово' },
    { wrap: '.cta-push-wrap-5', mode: 'swap', delay: 4700,
      text: 'Отлично, оформляйте! Когда сможете доставить?', badge: 'клиент остался' }
  ];
  var notifTimers = [];
  function notifCard(item) {
    var w = $(item.wrap);
    return w ? { card: w.querySelector('.cta-push-card'), p: w.querySelector('p') } : null;
  }
  function notifReset() {
    notifTimers.forEach(clearTimeout); notifTimers = [];
    NOTIF.forEach(function (item) {
      var n = notifCard(item); if (!n || !n.card) return;
      n.card.classList.remove('ao-done');
      $$('.ao-reply,.ao-typing,.ao-badge', n.card).forEach(function (x) { x.remove(); });
      if (n.p && n.p.dataset.aoOrig) { n.p.innerHTML = n.p.dataset.aoOrig; n.p.classList.remove('ao-swap'); }
    });
  }
  function notifFinish(item, n) {
    var badge = document.createElement('span');
    badge.className = 'ao-badge'; badge.textContent = item.badge;
    if (item.mode === 'reply') {
      var r = document.createElement('div');
      r.className = 'ao-reply';
      r.innerHTML = '<em>ИИ-продавец</em>';
      r.appendChild(document.createTextNode(item.reply));
      r.appendChild(badge);
      n.p.parentNode.appendChild(r);
    } else {
      n.p.textContent = item.text;
      n.p.appendChild(badge);
      n.p.classList.add('ao-swap');
    }
    n.card.classList.add('ao-done');
  }
  function notifPlay() {
    notifReset();
    NOTIF.forEach(function (item) {
      var n = notifCard(item); if (!n || !n.card || !n.p) return;
      if (!n.p.dataset.aoOrig) n.p.dataset.aoOrig = n.p.innerHTML;
      if (REDUCED) { notifFinish(item, n); return; }
      notifTimers.push(setTimeout(function () {
        var t = document.createElement('div');
        t.className = 'ao-typing'; t.textContent = 'печатает…';
        n.p.parentNode.appendChild(t);
        notifTimers.push(setTimeout(function () { t.remove(); notifFinish(item, n); }, 1000));
      }, item.delay + 900));
    });
  }
  function initNotifications() {
    var stage = $('.cta-notifications-stage');
    if (!stage) return;
    var replay = document.getElementById('aoReplay');
    if (replay) replay.addEventListener('click', notifPlay);
    if (!('IntersectionObserver' in window)) { notifPlay(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { notifPlay(); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(stage);
  }

  /* =================================================================
     3. «ИИ печатает» → «печатает» (в том числе в тексте, который рисуют main.js и виджет)
     ================================================================= */
  var TYPING_RE = /(ИИ[\u2011\-\s]?продав(?:ец|ца)|ИИ|AI|Эва)\s+(печатает|набирает сообщение)/g;
  function fixTypingIn(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (TYPING_RE.test(node.nodeValue)) { TYPING_RE.lastIndex = 0; node.nodeValue = node.nodeValue.replace(TYPING_RE, 'печатает'); }
      TYPING_RE.lastIndex = 0;
      return;
    }
    if (node.nodeType !== 1 || node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
    var w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    var t; while ((t = w.nextNode())) fixTypingIn(t);
  }
  function initTypingFix() {
    fixTypingIn(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === 'characterData') fixTypingIn(m.target);
        m.addedNodes && Array.prototype.forEach.call(m.addedNodes, fixTypingIn);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* =================================================================
     4. Демо: «трудный клиент»
     ================================================================= */
  function initRoles() {
    $$('[data-ao-role]').forEach(function (b) {
      b.addEventListener('click', function () {
        var phrase = b.getAttribute('data-ao-role');
        var phone = document.getElementById('phoneContainer');
        if (phone && phone.getBoundingClientRect().top < 0) phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof window.sendQuickPrompt === 'function') window.sendQuickPrompt(phrase);
        else {
          var inp = document.getElementById('liveChatInput');
          if (inp) { inp.value = phrase; inp.focus(); }
        }
      });
    });
  }

  /* =================================================================
     5. Команда: собеседование и найм
     ================================================================= */
  var PERSONAS = {
    stanislav: { greet: 'Добрый день! Готов к собеседованию. Спрашивайте про продукт, цены, возражения — отвечу так, как ответил бы вашему клиенту.', gen: 'Михаила' },
    yaroslav: { greet: 'Здравствуйте! Люблю конкретику: расскажите, что вы продаёте и где сейчас теряются заявки?', gen: 'Максима' },
    polina: { greet: 'Здравствуйте! Я отвечаю за заботу о клиентах. Задайте любой вопрос — постараюсь помочь.', gen: 'Софью' },
    dmitry: { greet: 'Привет! Корпоративные решения и быстрые ответы. Проверяйте меня на прочность!', gen: 'Дмитрия' },
    ekaterina: { greet: 'Добрый день. Моя специальность — аудит воронки и оценка заявок. Опишите вашу воронку, покажу, где в ней теряются деньги.', gen: 'Константина' }
  };
  var activeKey = 'stanislav';
  function personaNow() {
    var nameEl = document.getElementById('resumeCandidateName');
    var photo = document.getElementById('resumeCandidatePhoto');
    var raw = nameEl ? nameEl.textContent.trim() : 'Михаил Орлов';
    var name = raw.toLowerCase().replace(/(^|\s|-)\S/g, function (c) { return c.toUpperCase(); });
    var p = PERSONAS[activeKey] || PERSONAS.stanislav;
    return { key: activeKey, name: name, first: name.split(' ')[0], photo: photo ? photo.getAttribute('src') : null, greet: p.greet, gen: p.gen };
  }
  function syncHireLabels() {
    var p = personaNow();
    var n = document.getElementById('aoHireName'); if (n) n.textContent = p.name;
    var i = document.getElementById('aoInterviewBtn'); if (i) i.textContent = 'Пригласить ' + p.gen + ' на собеседование';
    var h = document.getElementById('aoHireBtn'); if (h) h.textContent = 'Нанять ' + p.gen;
  }
  function applyPersonaToChat() {
    var p = window.AO_PERSONA; if (!p) return;
    var header = document.getElementById('chatHeader');
    if (header) {
      var img = header.querySelector('img'); if (img && p.photo) { img.src = p.photo; img.alt = p.name; }
      var spans = $$('span', header);
      for (var i = 0; i < spans.length; i++) {
        if (/Altai Optima|ALTAI Optima/.test(spans[i].textContent) && spans[i].children.length === 0) { spans[i].textContent = p.name; break; }
      }
    }
    var inp = document.getElementById('liveChatInput');
    if (inp) inp.placeholder = 'Спросите ' + p.gen + ' о чём угодно…';
  }
  function interview() {
    var p = personaNow();
    window.AO_PERSONA = p; // main.js может передавать p.key в запрос к ИИ, чтобы менялся характер ответа
    var demo = document.getElementById('scenarios');
    if (demo) demo.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    applyPersonaToChat();
    var box = document.getElementById('messagesContainer');
    if (box) {
      var old = box.querySelector('.ao-bubble'); if (old) old.remove();
      var b = document.createElement('div');
      b.className = 'ao-bubble';
      b.innerHTML = '<b></b>';
      b.firstChild.textContent = p.name;
      b.appendChild(document.createTextNode(p.greet));
      var first = box.firstElementChild;
      if (first && first.nextSibling) box.insertBefore(b, first.nextSibling); else box.appendChild(b);
    }
    setTimeout(function () { var inp = document.getElementById('liveChatInput'); if (inp) inp.focus({ preventScroll: true }); }, REDUCED ? 0 : 700);
  }
  function hire() {
    var p = personaNow();
    var target = document.getElementById('constructor');
    if (!target) return;
    var old = document.getElementById('aoHireBanner'); if (old) old.remove();
    var ban = document.createElement('div');
    ban.id = 'aoHireBanner'; ban.className = 'ao-hire-banner'; ban.setAttribute('role', 'status');
    ban.innerHTML = 'Отличный выбор: <b></b> готов выйти на смену. Выберите тариф — через 3 дня он начнёт отвечать вашим клиентам.<button type="button" aria-label="Закрыть">×</button>';
    ban.querySelector('b').textContent = p.name;
    ban.querySelector('button').addEventListener('click', function () { ban.remove(); });
    target.insertBefore(ban, target.firstChild);
    target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  }
  function initHire() {
    var i = document.getElementById('aoInterviewBtn');
    var h = document.getElementById('aoHireBtn');
    if (i) i.addEventListener('click', interview);
    if (h) h.addEventListener('click', hire);
    if (typeof window.selectPersona === 'function' && !window.selectPersona.__ao) {
      var orig = window.selectPersona;
      window.selectPersona = function (key) {
        activeKey = key || activeKey;
        var r = orig.apply(this, arguments);
        setTimeout(syncHireLabels, 60);
        return r;
      };
      window.selectPersona.__ao = true;
    }
    if (typeof window.selectBranch === 'function' && !window.selectBranch.__ao) {
      var ob = window.selectBranch;
      window.selectBranch = function () { var r = ob.apply(this, arguments); setTimeout(applyPersonaToChat, 60); return r; };
      window.selectBranch.__ao = true;
    }
    syncHireLabels();
  }

  /* =================================================================
     6. Реальные кейсы внедрения ИИ-продавца
     ================================================================= */
  var CASES = [
    {
      id: 'furniture',
      tab: 'Мебель на заказ',
      title: 'Фабрика корпусной мебели «WoodCraft»',
      city: 'Москва',
      avatar: 'assets/images/persona_mikhail.webp',
      author: 'Артём Васильев',
      role: 'Основатель фабрики',
      quote: '«Раньше заявки с Авито и сайта после 20:00 висели до утра — люди остывали и уходили. Теперь ИИ отвечает за полминуты, квалифицирует бюджет и передает замерщику готовый контакт. Окупился на 11-й день работы.»',
      metrics: [
        { label: 'Прирост выручки', value: '+540 000 ₽/мес', highlight: true },
        { label: 'Скорость ответа', value: '38 секунд' },
        { label: 'Окупаемость тарифа', value: '11 дней' }
      ],
      before: 'До 35% заявок приходило вечером и ночью. Менеджеры отвечали утром с опозданием в 10–12 часов. Конверсия ночного трафика была всего 3,2%.',
      solution: 'Подключили ИИ-продавца в WhatsApp, Telegram и Авито. ИИ рассчитывает ориентировочную смету по размерам и материалам и бронирует выезд замерщика в amoCRM.',
      after: 'Мгновенный ответ 24/7. Конверсия ночных обращений в замер выросла до 11,8%. +4,5 дополнительных закрытых договора каждый месяц.'
    },
    {
      id: 'realty',
      tab: 'Недвижимость',
      title: 'Агентство недвижимости «Prime City»',
      city: 'Санкт-Петербург',
      avatar: 'persona_maxim.webp',
      author: 'Елена Морозова',
      role: 'Руководитель отдела продаж',
      quote: '«Брокеры тонули в спаме и пустых звонках, а реальные покупатели квартир от 15 млн ₽ ждали ответа по 2 часа. ИИ отфильтровал весь мусор и передает агентам только горячих клиентов с подтвержденным бюджетом.»',
      metrics: [
        { label: 'Чистая комиссия', value: '+1 450 000 ₽/кв.', highlight: true },
        { label: 'Отсев нецелевых', value: '84% спама' },
        { label: 'Рост конверсии', value: 'в 2,4 раза' }
      ],
      before: 'Менеджеры тратили 65% дня на первичные расспросы зевак. Горячие клиенты с одобренной ипотекой не дожидались ответа и уходили к конкурентам.',
      solution: 'ИИ-продавец за 40 секунд выявляет бюджет, локацию и форму оплаты, отправляет подборку подходящих ЖК и ставит брокеру задачу на звонок.',
      after: 'Брокеры общаются только с целевыми покупателями. Время квалификации лида сократилось до 1 минуты. +3 закрытые сделки в первый месяц.'
    },
    {
      id: 'fashion',
      tab: 'Одежда & E-commerce',
      title: 'Бренд одежды и обуви «Velvet Store»',
      city: 'Москва / РФ',
      avatar: 'persona_sofya.webp',
      author: 'Виктория Соколова',
      role: 'Директор по маркетингу',
      quote: '«В пик распродаж директ и WhatsApp разрывались — менеджеры физически не успевали, и заказы сгорали. ИИ взял на себя 90% вопросов по наличию размеров и доставке. Конверсия в оплату выросла на 42%.»',
      metrics: [
        { label: 'Доп. заказы', value: '+128 покупок/мес', highlight: true },
        { label: 'Пиковый трафик', value: '100% без задержек' },
        { label: 'Оплата ночью', value: '82% диалогов' }
      ],
      before: 'В вечерние часы и выходные до 40% обращений «есть ли в наличии размер?» оставались без ответа. Клиенты уходили на маркетплейсы.',
      solution: 'Интеграция с МойСклад. ИИ на лету проверяет складские остатки, консультирует по посадке и отправляет прямую ссылку на оплату корзины.',
      after: '0 потерянных обращений. 82% клиентов, написавших ночью, оплачивают заказ сразу в переписке до наступления утра.'
    },
    {
      id: 'services',
      tab: 'Юридические услуги',
      title: 'Юридическая группа «Правовой Стандарт»',
      city: 'Екатеринбург',
      avatar: 'persona_dmitry.webp',
      author: 'Игорь Дмитриев',
      role: 'Управляющий партнер',
      quote: '«Юристы должны заниматься делами в судах, а не часами выяснять суть вопроса по телефону. ИИ по нашему регламенту собирает вводные, оценивает перспективы и записывает доверителя на платную консультацию.»',
      metrics: [
        { label: 'Платные консультации', value: '+46 в месяц', highlight: true },
        { label: 'Экономия юристов', value: '130+ часов/мес' },
        { label: 'Окупаемость', value: 'за 6 дней' }
      ],
      before: 'Юристы отвлекались на десятки входящих сообщений. Первичная квалификация затягивалась, доходимость до встречи была слабой.',
      solution: 'Сценарий первичного скоринга: предмет спора, сумма требований, наличие документов. Автоматическая запись в график консультаций в CRM.',
      after: 'Юристы получают клиента с подробным саммари дела. Доходимость до платной консультации выросла с 28% до 64%.'
    }
  ];

  function renderNiche(id) {
    var c = CASES.filter(function (x) { return x.id === id; })[0] || CASES[0];
    var box = document.getElementById('aoCase');
    if (!box) return;

    var metricsHtml = c.metrics.map(function (m) {
      return '<div class="ao-metric-item">' +
        '<div class="ao-metric-label">' + m.label + '</div>' +
        '<div class="ao-metric-val' + (m.highlight ? ' highlight' : '') + '">' + m.value + '</div>' +
      '</div>';
    }).join('');

    box.innerHTML =
      '<div class="ao-case-info">' +
        '<div class="ao-case-header">' +
          '<div class="ao-case-badge">КЕЙС ВНЕДРЕНИЯ</div>' +
          '<div class="ao-case-title">' + c.title + ' <span class="ao-case-city">· ' + c.city + '</span></div>' +
        '</div>' +
        '<div class="ao-case-flow">' +
          '<div class="ao-case-step">' +
            '<span class="ao-case-icon ao-icon-before">✕</span>' +
            '<div><strong>Было:</strong> ' + c.before + '</div>' +
          '</div>' +
          '<div class="ao-case-step">' +
            '<span class="ao-case-icon ao-icon-solution">⚙</span>' +
            '<div><strong>Что сделали:</strong> ' + c.solution + '</div>' +
          '</div>' +
          '<div class="ao-case-step">' +
            '<span class="ao-case-icon ao-icon-after">✓</span>' +
            '<div><strong>Результат:</strong> ' + c.after + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="ao-case-quote-box">' +
          '<p class="ao-case-quote">' + c.quote + '</p>' +
          '<div class="ao-case-author">' +
            '<img src="' + c.avatar + '" alt="' + c.author + '" class="ao-case-avatar" loading="lazy" />' +
            '<div>' +
              '<div class="ao-case-author-name">' + c.author + '</div>' +
              '<div class="ao-case-author-role">' + c.role + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ao-case-sidebar">' +
        '<div class="ao-metrics-title">РЕЗУЛЬТАТ В ЦИФРАХ</div>' +
        '<div class="ao-metrics-grid">' + metricsHtml + '</div>' +
        '<div class="ao-case-cta">' +
          '<a href="#calculator" class="ao-case-btn">Рассчитать для своего бизнеса →</a>' +
        '</div>' +
      '</div>';

    $$('.ao-tabs button').forEach(function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-niche') === c.id ? 'true' : 'false');
    });
  }

  function initResults() {
    var tabs = $('.ao-tabs');
    if (!tabs) return;
    tabs.innerHTML = CASES.map(function (c, i) {
      return '<button type="button" role="tab" data-niche="' + c.id + '" aria-selected="' + (i === 0) + '">' + c.tab + '</button>';
    }).join('');
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-niche]');
      if (b) renderNiche(b.getAttribute('data-niche'));
    });
    renderNiche(CASES[0].id);
  }

  /* =================================================================
     7. Калькулятор: актуальные тарифы вместо старых 15 000 ₽
     Числа в main.js старые, поэтому пересчитываем результат поверх него.
     Когда Давид поменяет константы в main.js, этот блок можно удалить.
     ================================================================= */
  var scen = 0.12;
  var desired = {};
  var calcMO = null, calcIds = ['monthVal', 'mobCalcGainVal', 'calcFormulaBreakdown', 'paybackVal', 'yearVal'];
  function watchCalc(on) {
    if (!calcMO) return;
    if (!on) { calcMO.takeRecords(); calcMO.disconnect(); return; }
    calcIds.forEach(function (id) { var el = document.getElementById(id); if (el) calcMO.observe(el, { childList: true, characterData: true, subtree: true }); });
  }
  function setText(id, html) {
    var el = document.getElementById(id); if (!el) return;
    watchCalc(false);
    el.innerHTML = html;
    desired[id] = el.innerHTML; // храним так, как браузер это сериализовал
    watchCalc(true);
  }
  function num(id, dflt) {
    var el = document.getElementById(id); if (!el) return dflt;
    var v = parseFloat(String(el.value).replace(/[^\d.,]/g, '').replace(',', '.'));
    return isFinite(v) ? v : dflt;
  }
  function paybackText(days) {
    if (!isFinite(days) || days <= 0) return '—';
    if (days <= 10) return '~' + Math.max(1, Math.round(days)) + ' дн.';
    if (days <= 45) { var w = Math.round(days / 7); return '~' + w + (w === 1 ? ' неделю' : w < 5 ? ' недели' : ' недель'); }
    var m = Math.round(days / 30); return '~' + m + (m === 1 ? ' месяц' : m < 5 ? ' месяца' : ' месяцев');
  }
  function recalc() {
    var L = num('leadsInput', num('leadsRange', 200));
    var C = num('convInput', num('convRange', 10));
    var K = num('checkInput', num('checkRange', 30000));
    var base = L * C / 100 * K;
    var month = base * scen;
    var t = tariffFor(L);
    var days = month > 0 ? (SETUP + t.price) / (month / 30) : Infinity;
    var year = month * 12 - t.price * 12 - SETUP;
    var s = '&nbsp;';
    setText('monthVal', nf(month).replace(/ /g, s) + s + '₽');
    setText('mobCalcGainVal', nf(month).replace(/ /g, s) + s + '₽/мес');
    setText('calcFormulaBreakdown', 'Сейчас: ' + nf(L) + s + 'заявок × ' + String(C).replace('.', ',') + '% × ' + nf(K).replace(/ /g, s) + s + '₽ = ' + nf(base).replace(/ /g, s) + s + '₽ в' + s + 'месяц. Быстрый ответ вернёт около ' + Math.round(scen * 100) + '% этой выручки.');
    setText('aoCalcCost', nf(t.price).replace(/ /g, s) + s + '₽ в' + s + 'месяц');
    setText('aoCalcTariff', 'тариф «' + t.name + '» + запуск ' + nf(SETUP).replace(/ /g, s) + s + '₽');
    setText('paybackVal', paybackText(days));
    setText('yearVal', (year >= 0 ? '+' : '−') + nf(Math.abs(year)).replace(/ /g, s) + s + '₽');
    var warn = document.getElementById('yearNetWarning');
    if (warn) warn.style.display = year > 0 ? 'none' : '';
  }
  function initCalc() {
    if (!document.getElementById('calcResultCard')) return;
    ['syncCalcInput', 'handleDirectInput', 'handleCheckDirectInput', 'updateCalc'].forEach(function (fn) {
      var f = window[fn];
      if (typeof f === 'function' && !f.__ao) {
        window[fn] = function () { var r = f.apply(this, arguments); setTimeout(recalc, 0); return r; };
        window[fn].__ao = true;
      }
    });
    var sc = window.setCalcScenario;
    if (typeof sc === 'function' && !sc.__ao) {
      window.setCalcScenario = function (v) { scen = +v || scen; var r = sc.apply(this, arguments); setTimeout(recalc, 0); return r; };
      window.setCalcScenario.__ao = true;
    }
    ['leadsRange', 'convRange', 'checkRange', 'leadsDirectInput', 'convDirectInput', 'checkDirectInput'].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.addEventListener('input', function () { setTimeout(recalc, 0); });
    });
    // main.js анимирует цифры — возвращаем наши значения, если их перезаписали
    calcMO = new MutationObserver(function () {
      watchCalc(false);
      calcIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && desired[id] != null && el.innerHTML !== desired[id]) { el.innerHTML = desired[id]; desired[id] = el.innerHTML; }
      });
      watchCalc(true);
    });
    // сценарий по умолчанию — «в течение часа»
    var btns = $$('#calculator button[onclick^="setCalcScenario"]');
    if (btns[1] && typeof window.setCalcScenario === 'function') window.setCalcScenario(0.12, btns[1]);
    recalc();
  }

  /* ---------- Запуск ---------- */
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    timeLine(); setInterval(timeLine, 30000);
    initNotifications();
    initTypingFix();
    initRoles();
    initResults();
  });
  // функции main.js появляются после его загрузки
  window.addEventListener('load', function () {
    initHire();
    initCalc();
  });
})();
