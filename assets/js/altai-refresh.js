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
  function calcNiche(n) {
    var baseDeals = n.leads * n.conv / 100;
    var baseRev = baseDeals * n.check;
    var late = n.leads * n.share / 100;
    var extraDeals = late * (n.conv / 100 - n.conv / 200);
    var extraRev = extraDeals * n.check;
    var t = tariffFor(n.dialogs);
    return { baseDeals: baseDeals, baseRev: baseRev, late: late, extraDeals: extraDeals, extraRev: extraRev, pct: extraRev / baseRev * 100, tariff: t, roi: extraRev / t.price };
  }
  function fmtDeals(x) { return (Math.round(x * 10) / 10).toString().replace('.', ','); }
  function renderNiche(id) {
    var n = NICHES.filter(function (x) { return x.id === id; })[0] || NICHES[0];
    var r = calcNiche(n);
    var box = document.getElementById('aoCase');
    if (!box) return;
    box.innerHTML =
      '<div><h3>Исходные данные</h3><dl>' +
      '<dt>Заявок в месяц</dt><dd>' + nf(n.leads) + '</dd>' +
      '<dt>Покупают</dt><dd>' + String(n.conv).replace('.', ',') + '%</dd>' +
      '<dt>' + (n.checkLabel || 'Средний чек') + '</dt><dd>' + nf(n.check) + ' ₽</dd>' +
      '<dt>Сейчас в месяц</dt><dd>' + fmtDeals(r.baseDeals) + ' сделок · ' + nf(r.baseRev) + ' ₽</dd>' +
      '<dt class="ao-assume">Заявок вечером и в выходные</dt><dd>' + n.share + '%</dd>' +
      '<dt class="ao-assume">Они сейчас покупают</dt><dd>вдвое реже</dd>' +
      '</dl><p class="ao-logic">ИИ-продавец отвечает на них сразу, и они покупают так же, как дневные. Остальные заявки считаем без изменений.</p></div>' +
      '<div class="ao-out"><h3>Что добавит ИИ-продавец</h3><dl>' +
      '<dt>Дополнительные сделки</dt><dd>+' + fmtDeals(r.extraDeals) + ' в месяц</dd>' +
      '<dt>Тариф «' + r.tariff.name + '»</dt><dd>' + nf(r.tariff.price) + ' ₽/мес</dd>' +
      '</dl><div class="ao-big">+' + nf(r.extraRev) + ' ₽</div>' +
      '<div class="ao-big-cap">в месяц, это +' + Math.round(r.pct) + '% к выручке. Каждый рубль подписки возвращает ' + (Math.round(r.roi * 10) / 10).toString().replace('.', ',') + ' ₽.</div></div>';
    $$('.ao-tabs button').forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-niche') === n.id ? 'true' : 'false'); });
  }
  function initResults() {
    var tabs = $('.ao-tabs');
    if (!tabs) return;
    tabs.innerHTML = NICHES.map(function (n, i) {
      return '<button type="button" role="tab" data-niche="' + n.id + '" aria-selected="' + (i === 0) + '">' + n.tab + '</button>';
    }).join('');
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-niche]'); if (b) renderNiche(b.getAttribute('data-niche'));
    });
    renderNiche(NICHES[0].id);
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
