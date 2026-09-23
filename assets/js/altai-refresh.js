/* =====================================================================
   ALTAI OPTIMA — Обновление 21.09.2026 (Рефреш механик)
   1. Строка «который час» на первом экране
   2. Оживающие уведомления (автоответ ИИ)
   3. Демо: кнопки «трудного клиента»
   4. Команда: «Пригласить на собеседование» и «Нанять»
   5. Результаты: расчётные сценарии по нишам
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
    var el = document.getElementById('heroLiveTimeText') || document.getElementById('aoTimeText');
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
    else text = '<b>Сейчас ' + hm + '.</b> Рабочий день закончился, а клиенты продолжают писать. Он на связи.';
    el.innerHTML = text;
  }

  /* =================================================================
     3. Демо: «трудный клиент»
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
     4. Команда: собеседование и найм
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
    window.AO_PERSONA = p;
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
     5. Результаты: расчётные сценарии по нишам
     ================================================================= */
  var NICHES = [
    { id: 'furniture', tab: 'Мебель на заказ', leads: 150, conv: 8, check: 120000, share: 30, dialogs: 400 },
    { id: 'realty', tab: 'Недвижимость', leads: 120, conv: 4, check: 150000, share: 35, dialogs: 350, checkLabel: 'Средняя комиссия со сделки' },
    { id: 'fashion', tab: 'Обувь и одежда онлайн', leads: 600, conv: 12, check: 8000, share: 40, dialogs: 1200 },
    { id: 'services', tab: 'Юридические услуги', leads: 80, conv: 15, check: 60000, share: 25, dialogs: 150 }
  ];
  var CASES = [
    {
      id: 'furniture',
      tab: 'Мебель на заказ',
      title: 'Фабрика корпусной мебели «WoodCraft»',
      city: 'Москва',
      avatar: 'persona_mikhail.webp',
      author: 'Михаил Васильев',
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
      avatar: 'persona_elena.webp',
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
      avatar: 'persona_viktoria.webp',
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
      author: 'Дмитрий Романов',
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
          '<a href="#calculator" class="ao-case-btn">Рассчитать для своего бизнеса</a>' +
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

  /* ---------- Запуск ---------- */
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    timeLine(); setInterval(timeLine, 30000);
    initRoles();
    initResults();
  });
  window.addEventListener('load', function () {
    initHire();
  });
})();
