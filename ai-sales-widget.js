/**
 * ALTAI OPTIMA - AI Sales Assistant Floating Widget (Light Theme)
 * Интерактивный виджет живого общения с ALTAI Optima по теме установки софта
 * Подключается к Production API: https://api.optima.altaiweb.online
 */

(function () {
  'use strict';


  const currentLang = document.documentElement.lang || (window.location.pathname.includes('/tr') ? 'tr' : (window.location.pathname.includes('/en') ? 'en' : 'ru'));

  const I18N = {
    ru: {
      assistantName: 'ALTAI Optima',
      avatarAlt: 'Эва',
      online: 'Онлайн',
      close: 'Закрыть',
      minimize: 'Свернуть',
      reset: 'Очистить диалог',
      teaserText: 'Здравствуйте! Готова ответить на любые вопросы по установке софта и интеграциям 🚀',
      startChat: 'Начать диалог →',
      replyTime: 'Ответ за 3 сек',
      inputPlaceholder: 'Задайте вопрос по установке софта...',
      sendTitle: 'Отправить вопрос',
      openChatAria: 'Открыть чат с ALTAI Optima',
      welcomeTitle: 'Здравствуйте!',
      welcomeText: 'Я персональный консультант <strong>ALTAI Optima</strong>. Помогу рассчитать сроки и стоимость установки софта, расскажу об интеграциях с вашей CRM (amoCRM, Битрикс24, 1С) и запуск под ключ.',
      quickQuestionsTitle: 'Проверьте сами: задайте ему любой вопрос',
      suggestedQuestions: [
        'Претензия: Третий день жду ответа, почему так долго?',
        'Торг: У конкурентов на 20% дешевле, дадите скидку?',
        'Краткий запрос: цена',
        'Сомнение: Мне нужно подумать…',
        'Сколько стоит запуск 29 000 ₽ и ежемесячная подписка?'
      ],
      typing: 'печатает…',
      errWait: 'Сервер временно перегружен запросами. Пожалуйста, подождите минуту.',
      errServer: 'Ошибка связи с сервером',
      defaultResponse: 'Спасибо за обращение! Ваш вопрос передан специалистам по внедрению.',
      notice: 'Уведомление',
      defaultError: 'Не удалось получить ответ сервера. Проверьте соединение.'
    },
    tr: {
      assistantName: 'ALTAI Optima',
      avatarAlt: 'Eva',
      online: 'Çevrimiçi',
      close: 'Kapat',
      minimize: 'Küçült',
      reset: 'Sohbeti Temizle',
      teaserText: 'Merhaba! Yazılım kurulumu ve CRM entegrasyonları hakkındaki tüm sorularınızı yanıtlamaya hazırım 🚀',
      startChat: 'Görüşmeye Başla →',
      replyTime: '3 sn içinde yanıt',
      inputPlaceholder: 'Yazılım kurulumu hakkında bir soru yazın...',
      sendTitle: 'Soruyu Gönder',
      openChatAria: 'ALTAI Optima ile sohbeti aç',
      welcomeTitle: 'Merhaba!',
      welcomeText: 'Ben <strong>ALTAI Optima</strong> kişisel danışmanıyım. Kurulum süresi ve maliyetini hesaplayabilir, CRM (amoCRM, Bitrix24, ERP) entegrasyonlarını ve anahtar teslim devreye alımı anlatabilirim.',
      quickQuestionsTitle: 'Kendiniz test edin: ona herhangi bir soru sorun',
      suggestedQuestions: [
        'Şikayet: Üç gündür yanıt bekliyorum, neden bu kadar uzun sürdü?',
        'Pazarlık: Rakiplerde %20 daha ucuz, indirim yapar mısınız?',
        'Kısa soru: fiyat',
        'Şüphe: Düşünmem gerekiyor…',
        'Kurulum ve aylık abonelik maliyeti nedir?'
      ],
      typing: 'yazıyor…',
      errWait: 'Sunucu geçici olarak meşgul, lütfen bir dakika bekleyin.',
      errServer: 'Sunucu bağlantı hatası',
      defaultResponse: 'İlginiz için teşekkürler! Talebiniz uzmanlarımıza iletildi.',
      notice: 'Bildirim',
      defaultError: 'Sunucudan yanıt alınamadı. Lütfen internet bağlantınızı kontrol edin.'
    },
    en: {
      assistantName: 'ALTAI Optima',
      avatarAlt: 'Eva',
      online: 'Online',
      close: 'Close',
      minimize: 'Minimize',
      reset: 'Clear chat',
      teaserText: 'Hello! I am ready to answer any questions about software setup and CRM integrations 🚀',
      startChat: 'Start Chat →',
      replyTime: 'Replies in 3s',
      inputPlaceholder: 'Ask a question about software setup...',
      sendTitle: 'Send Question',
      openChatAria: 'Open chat with ALTAI Optima',
      welcomeTitle: 'Hello!',
      welcomeText: 'I am your <strong>ALTAI Optima</strong> personal consultant. I can help calculate setup timeline & costs, and explain CRM integrations and turn-key launch.',
      quickQuestionsTitle: 'Test it yourself: ask any question',
      suggestedQuestions: [
        'Complaint: Waiting 3 days for a reply, why so long?',
        'Bargaining: Competitors are 20% cheaper, can you discount?',
        'Brief query: price',
        'Hesitation: I need to think about it…',
        'How much is setup and monthly subscription?'
      ],
      typing: 'typing…',
      errWait: 'Server is temporarily busy. Please wait a minute.',
      errServer: 'Server connection error',
      defaultResponse: 'Thank you for reaching out! Your inquiry has been forwarded to our specialists.',
      notice: 'Notice',
      defaultError: 'Could not connect to the server. Please check your connection.'
    }
  };

  const T = I18N[currentLang] || I18N.ru;

  const CONFIG = {
    apiBaseUrl: 'https://api.optima.altaiweb.online',
    tenantId: 'altai_optima',
    storageKeySession: 'altai_ai_widget_session_id',
    storageKeyMessages: 'altai_ai_widget_messages_v1',
    storageKeyTeaserDismissed: 'altai_ai_widget_teaser_dismissed',
    avatarUrl: 'avatar_eva.jpg',
    assistantName: 'ALTAI Optima',
    suggestedQuestions: T.suggestedQuestions
  };

  // State
  let isOpen = false;
  let isSending = false;
  let sessionId = null;
  let messages = [];

  // Web Audio synth chime for incoming messages (soft subtle ping)
  function playNotificationChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Markdown Formatter
  function formatMarkdown(text) {
    if (!text) return '';
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Inline code
    safe = safe.replace(/`([^`]+)`/g, '<code style="background: #f1f5f9; color: #0284c7; padding: 2px 5px; border-radius: 4px; font-family: monospace; font-size: 11px; border: 1px solid #e2e8f0;">$1</code>');

    // Split lines for list / paragraph handling
    const lines = safe.split('\n');
    let inUl = false;
    let inOl = false;
    const output = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
      const ulMatch = trimmed.match(/^[-•*]\s+(.+)$/);

      if (olMatch) {
        if (inUl) { output.push('</ul>'); inUl = false; }
        if (!inOl) { output.push('<ol style="margin: 6px 0; padding-left: 20px; list-style-type: decimal;">'); inOl = true; }
        output.push(`<li style="margin: 3px 0;">${olMatch[2]}</li>`);
      } else if (ulMatch) {
        if (inOl) { output.push('</ol>'); inOl = false; }
        if (!inUl) { output.push('<ul style="margin: 6px 0; padding-left: 18px; list-style-type: disc;">'); inUl = true; }
        output.push(`<li style="margin: 3px 0;">${ulMatch[1]}</li>`);
      } else {
        if (inUl) output.push('</ul>');
        if (inOl) output.push('</ol>');
        if (trimmed === '') {
          output.push('<div style="height: 6px;"></div>');
        } else {
          output.push(`<p style="margin: 3px 0; line-height: 1.5;">${line}</p>`);
        }
      }
    });

    if (inUl) output.push('</ul>');
    if (inOl) output.push('</ol>');

    return output.join('');
  }

  // Load state from localStorage
  function loadState() {
    try {
      sessionId = localStorage.getItem(CONFIG.storageKeySession) || null;
      const savedMsgs = localStorage.getItem(CONFIG.storageKeyMessages);
      if (savedMsgs) {
        messages = JSON.parse(savedMsgs);
      }
    } catch (e) {
      console.warn('[AI Widget] Storage read error:', e);
    }
  }

  // Save state
  function saveState() {
    try {
      if (sessionId) {
        localStorage.setItem(CONFIG.storageKeySession, sessionId);
      } else {
        localStorage.removeItem(CONFIG.storageKeySession);
      }
      localStorage.setItem(CONFIG.storageKeyMessages, JSON.stringify(messages));
    } catch (e) {
      console.warn('[AI Widget] Storage write error:', e);
    }
  }

  // CSS Injection - Pure Light Theme
  function injectStyles() {
    const styleId = 'altai-ai-sales-widget-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .altai-widget-root {
        position: fixed;
        bottom: 22px;
        right: 22px;
        z-index: 99999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      @media (max-width: 640px) {
        .altai-widget-root {
          bottom: 18px;
          right: 18px;
        }
      }

      /* Floating Launcher Button */
      .altai-widget-launcher {
        position: relative;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
        border: 2.5px solid #ffffff;
        box-shadow: 0 10px 25px -3px rgba(2, 132, 199, 0.45), 0 4px 12px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      .altai-widget-launcher:hover {
        transform: scale(1.08) translateY(-2px);
        box-shadow: 0 14px 30px -2px rgba(2, 132, 199, 0.55), 0 6px 16px rgba(0, 0, 0, 0.12);
      }

      .altai-widget-launcher:active {
        transform: scale(0.95);
      }

      /* Pulsing Ring */
      .altai-widget-pulse-ring {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 2px solid rgba(14, 165, 233, 0.5);
        animation: altaiRingPulse 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        pointer-events: none;
      }

      @keyframes altaiRingPulse {
        0% { transform: scale(0.95); opacity: 0.85; }
        50% { transform: scale(1.18); opacity: 0; }
        100% { transform: scale(1.18); opacity: 0; }
      }

      /* Teaser Pill (Light Theme) */
      .altai-widget-teaser {
        position: absolute;
        bottom: 76px;
        right: 0;
        width: 300px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        padding: 13px 15px;
        box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.03);
        color: #0f172a;
        transform-origin: bottom right;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        z-index: 99998;
      }

      .altai-widget-teaser.hidden {
        opacity: 0;
        transform: scale(0.8) translateY(12px);
        pointer-events: none;
      }

      /* Chat Modal Window (Light Theme) */
      .altai-widget-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 410px;
        height: 600px;
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 105px);
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 24px;
        box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform-origin: bottom right;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 100000;
      }

      .altai-widget-window.minimized {
        opacity: 0;
        transform: scale(0.85) translateY(24px);
        pointer-events: none;
      }

      @media (max-width: 480px) {
        .altai-widget-window {
          bottom: 74px;
          right: -6px;
          width: calc(100vw - 24px);
          height: calc(100vh - 110px);
          max-height: 580px;
          border-radius: 20px;
        }
      }

      /* Clean Light Scrollbar */
      .altai-widget-scroll::-webkit-scrollbar {
        width: 6px;
      }
      .altai-widget-scroll::-webkit-scrollbar-track {
        background: #f8fafc;
      }
      .altai-widget-scroll::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 8px;
      }
      .altai-widget-scroll::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }

      /* Typing indicator dots */
      @keyframes altaiTypingBounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
      }
      .altai-typing-dot {
        animation: altaiTypingBounce 1.2s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  // Create DOM Structure - Pure Light Theme
  function createWidgetDOM() {
    if (document.getElementById('altaiAiSalesWidgetRoot')) return;

    injectStyles();

    const root = document.createElement('div');
    root.id = 'altaiAiSalesWidgetRoot';
    root.className = 'altai-widget-root';

    root.innerHTML = `
      <!-- Proactive Teaser Bubble -->
      <div id="altaiWidgetTeaser" class="altai-widget-teaser hidden" onclick="window.openAiSalesWidget()">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 9px;">
            <div style="position: relative; width: 36px; height: 36px; border-radius: 50%; overflow: hidden; border: 1.5px solid #0284c7; flex-shrink: 0; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);">
              <img src="${CONFIG.avatarUrl}" alt="${T.avatarAlt}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='brand_logo.png'" />
              <span style="position: absolute; bottom: 0; right: 0; width: 9px; height: 9px; background: #10b981; border: 1.5px solid #ffffff; border-radius: 50%;"></span>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;">ALTAI Optima</div>
              <div style="font-size: 10px; color: #10b981; font-weight: 600;">${T.online}</div>
            </div>
          </div>
          <button id="altaiTeaserCloseBtn" type="button" style="background: none; border: none; color: #94a3b8; font-size: 14px; cursor: pointer; padding: 2px 4px; line-height: 1; transition: color 0.2s;" onmouseover="this.style.color='#334155'" onmouseout="this.style.color='#94a3b8'" title="${T.close}">✕</button>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 1.45; color: #334155; font-weight: 500;">
          ${T.teaserText}
        </p>
        <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 11px; font-weight: 700; color: #0284c7; display: flex; align-items: center; gap: 4px;">
            ${T.startChat}
          </span>
          <span style="font-size: 10px; color: #94a3b8;">${T.replyTime}</span>
        </div>
      </div>

      <!-- Main Chat Window -->
      <div id="altaiWidgetWindow" class="altai-widget-window minimized">
        <!-- Header -->
        <div style="background: #ffffff; border-bottom: 1px solid #f1f5f9; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="position: relative; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #0284c7; flex-shrink: 0; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);">
              <img src="${CONFIG.avatarUrl}" alt="${T.avatarAlt}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='brand_logo.png'" />
              <span style="position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px; background: #10b981; border: 2px solid #ffffff; border-radius: 50%;"></span>
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;">
                ALTAI Optima
              </div>
              <div style="font-size: 10.5px; color: #10b981; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                <span style="width: 6px; height: 6px; background: #10b981; border-radius: 50%;"></span>
                Онлайн
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            <!-- Reset / Clear dialogue -->
            <button id="altaiWidgetResetBtn" type="button" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'; this.style.color='#0f172a';" onmouseout="this.style.background='#f8fafc'; this.style.color='#64748b';" title="${T.reset}">
              <svg style="width: 14px; height: 14px; fill: currentColor;" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
            </button>
            <!-- Close / Minimize -->
            <button id="altaiWidgetCloseBtn" type="button" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'; this.style.color='#0f172a';" onmouseout="this.style.background='#f8fafc'; this.style.color='#64748b';" title="${T.minimize}">
              <span style="font-size: 14px; line-height: 1;">✕</span>
            </button>
          </div>
        </div>

        <!-- Messages Stream -->
        <div id="altaiWidgetMessages" class="altai-widget-scroll" style="flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 12px; background: #f8fafc;">
          <!-- Dynamically populated -->
        </div>

        <!-- Input Bar -->
        <div style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 12px 14px; flex-shrink: 0;">
          <form id="altaiWidgetForm" style="display: flex; align-items: center; gap: 8px; margin: 0;">
            <div style="flex: 1; position: relative; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 16px; padding: 2px 12px; display: flex; align-items: center; transition: all 0.2s;">
              <input 
                id="altaiWidgetInput" 
                type="text" 
                placeholder="${T.inputPlaceholder}" 
                autocomplete="off" 
                style="width: 100%; background: transparent; border: none; outline: none; font-size: 12.5px; color: #0f172a; padding: 8px 0; font-family: inherit;"
              />
            </div>
            <button 
              id="altaiWidgetSubmitBtn" 
              type="submit" 
              style="width: 38px; height: 38px; border-radius: 14px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: none; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; box-shadow: 0 3px 10px rgba(2, 132, 199, 0.3); transition: all 0.2s;"
              onmouseover="this.style.filter='brightness(1.1)'"
              onmouseout="this.style.filter='none'"
              title="${T.sendTitle}"
            >
              <svg style="width: 16px; height: 16px; fill: currentColor; margin-left: 2px;" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      </div>

      <!-- Floating Action Button (FAB Launcher) -->
      <button id="altaiWidgetLauncher" type="button" class="altai-widget-launcher" aria-label="${T.openChatAria}">
        <div class="altai-widget-pulse-ring"></div>
        
        <!-- Closed state icon (Eva's avatar + chat icon) -->
        <div id="altaiLauncherIconClosed" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 1.5px solid rgba(255,255,255,0.95); box-shadow: inset 0 0 4px rgba(0,0,0,0.2);">
            <img src="${CONFIG.avatarUrl}" alt="${T.avatarAlt}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='brand_logo.png'" />
          </div>
          <!-- Online green dot -->
          <span style="position: absolute; top: 4px; right: 4px; width: 13px; height: 13px; background: #10b981; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></span>
        </div>

        <!-- Opened state icon (Cross ✕) -->
        <div id="altaiLauncherIconOpened" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; color: #ffffff; font-size: 24px; font-weight: 400;">
          ✕
        </div>
      </button>
    `;

    document.body.appendChild(root);

    attachEventListeners();
    renderDialogue();

    // Schedule proactive teaser if not dismissed previously
    const teaserDismissed = sessionStorage.getItem(CONFIG.storageKeyTeaserDismissed);
    if (!teaserDismissed) {
      setTimeout(() => {
        if (!isOpen) {
          const teaser = document.getElementById('altaiWidgetTeaser');
          if (teaser) teaser.classList.remove('hidden');
        }
      }, 3500);
    }
  }

  // Render Dialogue stream - Light Theme
  function renderDialogue() {
    const container = document.getElementById('altaiWidgetMessages');
    if (!container) return;

    if (messages.length === 0) {
      // Render clean starter card + suggested question chips
      const starterHtml = `
        <div style="display: flex; flex-direction: column; gap: 12px; animation: fadeIn 0.3s ease-out;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 14px; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 18px;">👋</span>
              <span style="font-size: 13px; font-weight: 700; color: #0f172a;">${T.welcomeTitle}</span>
            </div>
            <p style="font-size: 12px; line-height: 1.5; color: #334155; margin: 0;">${T.welcomeText}</p>
          </div>

          <div>
            <div style="font-size: 10.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; padding-left: 2px;">
              ${T.quickQuestionsTitle}
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${CONFIG.suggestedQuestions.map(q => `
                <button 
                  type="button" 
                  onclick="window.sendAiSalesWidgetQuestion('${q.replace(/'/g, "\\'")}')" 
                  style="text-align: left; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 9px 12px; color: #1e293b; font-size: 11.5px; line-height: 1.35; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);"
                  onmouseover="this.style.borderColor='#0284c7'; this.style.background='#f0f9ff'; this.style.color='#0284c7';"
                  onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#ffffff'; this.style.color='#1e293b';"
                >
                  <span>${q}</span>
                  <span style="color: #0284c7; font-size: 12px; flex-shrink: 0;">→</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      container.innerHTML = starterHtml;
      return;
    }

    // Render message history
    let html = '';
    messages.forEach(msg => {
      if (msg.role === 'user') {
        html += `
          <div style="display: flex; justify-content: flex-end; animation: fadeIn 0.2s ease-out;">
            <div style="max-width: 86%; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border-radius: 18px 18px 4px 18px; padding: 10px 14px; font-size: 12px; line-height: 1.45; box-shadow: 0 3px 10px rgba(2, 132, 199, 0.25);">
              <div style="word-break: break-word;">${escapeHtml(msg.text)}</div>
              <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-top: 4px; font-size: 9px; color: #e0f2fe;">
                <span>${msg.time || ''}</span>
                <span style="color: #bae6fd; font-weight: 700;">✓✓</span>
              </div>
            </div>
          </div>
        `;
      } else {
        html += `
          <div style="display: flex; justify-content: flex-start; gap: 8px; animation: fadeIn 0.2s ease-out;">
            <div style="width: 28px; height: 28px; border-radius: 50%; overflow: hidden; border: 1.5px solid #0284c7; flex-shrink: 0; margin-top: 2px;">
              <img src="${CONFIG.avatarUrl}" alt="${T.avatarAlt}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='brand_logo.png'" />
            </div>
            <div style="max-width: 85%; background: #ffffff; border: 1px solid #e2e8f0; color: #0f172a; border-radius: 18px 18px 18px 4px; padding: 10px 14px; font-size: 12px; line-height: 1.5; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
              <div style="font-size: 10px; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.02em;">
                ${CONFIG.assistantName}
              </div>
              <div style="word-break: break-word; color: #1e293b;" class="altai-msg-content">${formatMarkdown(msg.text)}</div>
              <div style="margin-top: 5px; text-align: right; font-size: 9px; color: #94a3b8;">
                ${msg.time || ''}
              </div>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = html;
    scrollToBottom();
  }

  function scrollToBottom() {
    const container = document.getElementById('altaiWidgetMessages');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Show typing indicator
  function showTypingIndicator() {
    const container = document.getElementById('altaiWidgetMessages');
    if (!container) return;

    removeTypingIndicator();

    const typingHtml = `
      <div id="altaiWidgetTyping" style="display: flex; justify-content: flex-start; gap: 8px; animation: fadeIn 0.2s ease-out;">
        <div style="width: 28px; height: 28px; border-radius: 50%; overflow: hidden; border: 1.5px solid #0284c7; flex-shrink: 0; margin-top: 2px;">
          <img src="${CONFIG.avatarUrl}" alt="${T.avatarAlt}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='brand_logo.png'" />
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px 16px 16px 4px; padding: 10px 14px; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
          <span style="font-size: 11px; font-weight: 700; color: #0284c7;">${T.typing}</span>
          <div style="display: flex; align-items: center; gap: 3px;">
            <span class="altai-typing-dot" style="width: 5px; height: 5px; border-radius: 50%; background: #0284c7; animation-delay: 0s;"></span>
            <span class="altai-typing-dot" style="width: 5px; height: 5px; border-radius: 50%; background: #0284c7; animation-delay: 0.2s;"></span>
            <span class="altai-typing-dot" style="width: 5px; height: 5px; border-radius: 50%; background: #0284c7; animation-delay: 0.4s;"></span>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', typingHtml);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('altaiWidgetTyping');
    if (el) el.remove();
  }

  // Send message turn
  async function submitUserMessage(userText) {
    const text = (userText || '').trim();
    if (!text || isSending) return;

    const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    // Append user message
    messages.push({
      role: 'user',
      text: text,
      time: timeStr
    });
    saveState();
    renderDialogue();

    const input = document.getElementById('altaiWidgetInput');
    const submitBtn = document.getElementById('altaiWidgetSubmitBtn');
    if (input) {
      input.value = '';
      input.disabled = true;
    }
    if (submitBtn) submitBtn.disabled = true;
    isSending = true;

    showTypingIndicator();

    try {
      const payload = {
        message: text,
        session_id: sessionId,
        tenant_id: CONFIG.tenantId
      };

      const res = await fetch(`${CONFIG.apiBaseUrl}/api/v1/demo/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      removeTypingIndicator();

      if (res.status === 429) {
        throw new Error(T.errWait);
      }

      if (!res.ok) {
        throw new Error(`${T.errServer} (${res.status})`);
      }

      const data = await res.json();
      if (data && data.session_id) {
        sessionId = data.session_id;
      }

      const aiResponseText = data.assistant_response || data.response || T.defaultResponse;
      const aiTimeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      messages.push({
        role: 'assistant',
        text: aiResponseText,
        time: aiTimeStr
      });
      saveState();
      renderDialogue();
      playNotificationChime();
    } catch (err) {
      removeTypingIndicator();
      const errTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      messages.push({
        role: 'assistant',
        text: `⚠️ *${T.notice}:* ${err.message || T.defaultError}`,
        time: errTime
      });
      saveState();
      renderDialogue();
    } finally {
      isSending = false;
      if (input) {
        input.disabled = false;
        input.focus();
      }
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  // Open / Close controls
  function openWidget(initialPrompt) {
    isOpen = true;
    const windowEl = document.getElementById('altaiWidgetWindow');
    const teaserEl = document.getElementById('altaiWidgetTeaser');
    const iconClosed = document.getElementById('altaiLauncherIconClosed');
    const iconOpened = document.getElementById('altaiLauncherIconOpened');

    if (windowEl) windowEl.classList.remove('minimized');
    if (teaserEl) teaserEl.classList.add('hidden');
    if (iconClosed) iconClosed.style.display = 'none';
    if (iconOpened) iconOpened.style.display = 'flex';

    sessionStorage.setItem(CONFIG.storageKeyTeaserDismissed, '1');

    scrollToBottom();

    const input = document.getElementById('altaiWidgetInput');
    if (input) {
      setTimeout(() => input.focus(), 300);
      if (initialPrompt) {
        submitUserMessage(initialPrompt);
      }
    }
  }

  function closeWidget() {
    isOpen = false;
    const windowEl = document.getElementById('altaiWidgetWindow');
    const iconClosed = document.getElementById('altaiLauncherIconClosed');
    const iconOpened = document.getElementById('altaiLauncherIconOpened');

    if (windowEl) windowEl.classList.add('minimized');
    if (iconClosed) iconClosed.style.display = 'flex';
    if (iconOpened) iconOpened.style.display = 'none';
  }

  function toggleWidget() {
    if (isOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }

  function resetDialogue() {
    sessionId = null;
    messages = [];
    saveState();
    renderDialogue();
  }

  // Attach event listeners
  function attachEventListeners() {
    const launcher = document.getElementById('altaiWidgetLauncher');
    if (launcher) {
      launcher.addEventListener('click', toggleWidget);
    }

    const closeBtn = document.getElementById('altaiWidgetCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeWidget);
    }

    const resetBtn = document.getElementById('altaiWidgetResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetDialogue);
    }

    const teaserCloseBtn = document.getElementById('altaiTeaserCloseBtn');
    if (teaserCloseBtn) {
      teaserCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const teaser = document.getElementById('altaiWidgetTeaser');
        if (teaser) teaser.classList.add('hidden');
        sessionStorage.setItem(CONFIG.storageKeyTeaserDismissed, '1');
      });
    }

    const form = document.getElementById('altaiWidgetForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('altaiWidgetInput');
        if (input) {
          submitUserMessage(input.value);
        }
      });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeWidget();
      }
    });
  }

  // Global window API
  window.openAiSalesWidget = function (promptText) {
    openWidget(promptText);
  };

  window.closeAiSalesWidget = function () {
    closeWidget();
  };

  window.sendAiSalesWidgetQuestion = function (questionText) {
    openWidget();
    submitUserMessage(questionText);
  };

  // Initialization
  function init() {
    loadState();
    if (document.body) {
      createWidgetDOM();
    } else {
      document.addEventListener('DOMContentLoaded', createWidgetDOM);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
