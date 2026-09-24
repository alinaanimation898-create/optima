// КОНФИГУРАЦИЯ РЕАЛИСТИЧНЫХ ИНТЕРФЕЙСОВ МЕССЕНДЖЕРОВ (WHATSAPP, TELEGRAM, INSTAGRAM, АВИТО)
    const channelsConfig = {
      full_deal: {
        channel: 'WHATSAPP',
        badge: 'WhatsApp',
        assistantName: 'Altai Optima • ИИ-Продавец',
        headerBg: 'bg-[#075e54]',
        headerSubText: 'text-emerald-200',
        statusText: 'в сети',
        chatBg: 'chat-bg-wa',
        renderHeader: () => `
          <div class="flex items-center gap-2 w-full justify-between">
            <div class="flex items-center gap-2">
              <div class="flex items-center text-white/90 text-sm font-semibold cursor-pointer">
                <svg class="w-4 h-4 mr-0.5 fill-current" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                <span class="text-xs">3</span>
              </div>
              <div class="relative w-8 h-8 rounded-full border border-white/40 overflow-hidden shadow-xs shrink-0 bg-slate-800">
                <img src="avatar_eva.webp" alt="Эва" class="w-full h-full object-cover" />
                <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
              </div>
              <div class="leading-tight text-left">
                <div class="text-xs font-bold flex items-center gap-1 text-white">
                  <span>Altai Optima</span>
                  <span class="text-emerald-300 text-[10px]">✓</span>
                </div>
                <div class="text-[10px] text-emerald-200 font-medium">в сети • онлайн</div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-white/90">
              <button type="button" onclick="resetLiveChatDialogue()" class="text-[10px] bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md transition-all cursor-pointer font-medium">
                Очистить
              </button>
              <svg class="w-4 h-4 fill-current opacity-90" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
            </div>
          </div>
        `,
        renderStarter: () => `
          <div class="empty-chat-state h-full flex flex-col justify-between items-center text-center animate-fade-in py-1 px-1">
            <div class="space-y-2 w-full">
              <div class="flex justify-center">
                <span class="bg-[#e1d9cc]/90 text-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-2xs uppercase tracking-wider">СЕГОДНЯ</span>
              </div>
              <div class="mx-auto max-w-[94%] bg-[#ffeecd]/90 border border-[#fae2a6] rounded-xl p-2 text-center text-[10px] text-[#544322] leading-snug shadow-2xs flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5 shrink-0 fill-current opacity-80" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                <span>Чат пуст. Ответы генерирует автономный ИИ-продавец</span>
              </div>
            </div>

            <div class="my-auto py-3 px-2 flex flex-col items-center justify-center text-center space-y-2.5 cursor-pointer select-none" onclick="focusChatInput()">
              <div class="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#25d366]/20 to-[#128c7e]/30 border border-[#25d366]/40 flex items-center justify-center text-[#075e54] shadow-xs">
                <svg class="w-5 h-5 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
                <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div class="space-y-0.5 max-w-[270px]">
                <div class="text-[12.5px] font-black text-slate-800 tracking-tight">Чат с ИИ-продавцом готов</div>
                <p class="text-[10.5px] text-slate-600 leading-snug font-normal">
                  Напишите любой вопрос в строке внизу или нажмите на вариант:
                </p>
              </div>
              <div class="flex flex-col gap-1.5 w-full max-w-[285px]">
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Сколько стоит внедрение под ключ?')" class="text-left text-[11px] font-medium bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#25d366] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Сколько стоит внедрение под ключ?»</span>
                  <span class="text-[#075e54] text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('А если клиент просит скидку?')" class="text-left text-[11px] font-medium bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#25d366] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«А если клиент просит скидку?»</span>
                  <span class="text-[#075e54] text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Как вы подключаетесь к amoCRM?')" class="text-left text-[11px] font-medium bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#25d366] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Как вы подключаетесь к amoCRM?»</span>
                  <span class="text-[#075e54] text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
            </div>

            <div class="pt-1 pb-1 flex items-center gap-1.5 text-[10.5px] font-bold text-[#075e54] animate-bounce cursor-pointer select-none" onclick="focusChatInput()">
              <span>Напечатайте сообщение в поле ниже</span>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/></svg>
            </div>
          </div>
        `,
        renderAiBubble: (msg) => `
          <div class="flex justify-start items-end gap-1.5 animate-fade-in">
            <div class="bg-white text-slate-900 p-2.5 rounded-2xl rounded-tl-xs max-w-[88%] shadow-xs border border-slate-200/50">
              <div class="text-[9.5px] font-bold text-[#075e54] mb-0.5">${msg.author || 'Altai Optima • ИИ-Продавец'}</div>
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-800">${msg.text}</p>
              <div class="text-[9px] text-slate-400 text-right mt-0.5 font-sans flex items-center justify-end gap-1">
                <span>${msg.time}</span>
              </div>
            </div>
          </div>
        `,
        renderUserBubble: (msg) => `
          <div class="flex justify-end items-end gap-1.5 animate-fade-in">
            <div class="bg-[#d9fdd3] text-slate-900 p-2.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-xs">
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-800">${msg.text}</p>
              <div class="text-[9px] text-emerald-800 text-right mt-0.5 font-sans flex items-center justify-end gap-1">
                <span>${msg.time}</span>
                <span class="text-[#34B7F1] font-bold">✓✓</span>
              </div>
            </div>
          </div>
        `,
        renderFooter: () => `
          <div class="flex items-center gap-1.5 w-full">
            <button type="button" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button>
            <form id="liveChatForm" onsubmit="handleLiveChatSubmit(event)" class="flex-1 flex items-center gap-1.5">
              <div class="flex-1 bg-white border border-slate-200/90 rounded-2xl px-3 py-1.5 flex items-center justify-between shadow-2xs live-chat-input-glow">
                <input id="liveChatInput" type="text" placeholder="Напишите сообщение..." autocomplete="off" class="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs outline-none" />
                <span class="text-slate-400 text-sm ml-1">📎</span>
              </div>
              <button id="liveChatSubmitBtn" type="submit" class="w-8 h-8 rounded-full bg-[#00a884] hover:bg-[#008f6f] active:scale-95 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer">
                <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </form>
          </div>
        `
      },
      price_objection: {
        channel: 'TELEGRAM',
        badge: 'Telegram',
        assistantName: 'Altai Optima • ИИ-Продавец',
        headerBg: 'bg-white/80 backdrop-blur-md border-b border-sky-100',
        headerSubText: 'text-slate-500',
        statusText: 'в сети',
        chatBg: 'chat-bg-tg',
        renderHeader: () => `
          <div class="flex items-center gap-2 w-full justify-between text-slate-800">
            <div class="flex items-center text-sky-500 font-medium text-xs cursor-pointer">
              <svg class="w-4 h-4 mr-0.5 fill-current" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              <span>12</span>
            </div>
            <div class="px-3 py-0.5 rounded-full bg-white/90 shadow-2xs border border-sky-100 text-center">
              <div class="text-[11.5px] font-bold text-slate-900 leading-tight">Altai Optima</div>
              <div class="text-[9.5px] text-emerald-600 font-medium leading-tight">в сети • онлайн</div>
            </div>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="resetLiveChatDialogue()" class="text-[10px] text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-md transition-all cursor-pointer font-semibold">
                Очистить
              </button>
              <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 text-white font-bold text-xs flex items-center justify-center border border-white shadow-2xs">
                O
              </div>
            </div>
          </div>
        `,
        renderStarter: () => `
          <div class="empty-chat-state h-full flex flex-col justify-between items-center text-center animate-fade-in py-1 px-1">
            <div class="space-y-2 w-full">
              <div class="flex justify-center">
                <span class="bg-black/15 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full shadow-2xs">Сегодня</span>
              </div>
              <div class="mx-auto max-w-[94%] bg-[#6c8cf5]/25 border border-white/30 backdrop-blur-md rounded-xl p-2 text-center text-[10px] text-slate-800 leading-snug shadow-2xs">
                <div class="font-bold text-[#0088cc]">Altai Optima • ИИ-Продавец</div>
                <div class="text-[9.5px] text-slate-600">Чат свободен · Напишите вопрос для теста</div>
              </div>
            </div>

            <div class="my-auto py-3 px-2 flex flex-col items-center justify-center text-center space-y-2.5 cursor-pointer select-none" onclick="focusChatInput()">
              <div class="relative w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-[#0088cc] shadow-xs">
                <svg class="w-5 h-5 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                <span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
              </div>
              <div class="space-y-0.5 max-w-[270px]">
                <div class="text-[12.5px] font-black text-slate-800 tracking-tight">Чат свободен для общения</div>
                <p class="text-[10.5px] text-slate-600 leading-snug font-normal">
                  Задайте вопрос в строке внизу или выберите готовый сценарий:
                </p>
              </div>
              <div class="flex flex-col gap-1.5 w-full max-w-[285px]">
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('В чем отличие от шаблонных автоответчиков?')" class="text-left text-[11px] font-medium bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#229ed9] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«В чем отличие от шаблонных автоответчиков?»</span>
                  <span class="text-sky-600 text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Как быстро окупается внедрение?')" class="text-left text-[11px] font-medium bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#229ed9] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Как быстро окупается внедрение?»</span>
                  <span class="text-sky-600 text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Сколько сделок закрывает в месяц?')" class="text-left text-[11px] font-medium bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#229ed9] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Сколько сделок закрывает в месяц?»</span>
                  <span class="text-sky-600 text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
            </div>

            <div class="pt-1 pb-1 flex items-center gap-1.5 text-[10.5px] font-bold text-sky-600 animate-bounce cursor-pointer select-none" onclick="focusChatInput()">
              <span>Напечатайте вопрос в строке ниже</span>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/></svg>
            </div>
          </div>
        `,
        renderAiBubble: (msg) => `
          <div class="flex justify-start items-end gap-1.5 animate-fade-in">
            <div class="bg-white text-slate-900 p-2.5 rounded-2xl rounded-tl-xs max-w-[88%] shadow-xs">
              <div class="text-[9.5px] font-bold text-[#0088cc] mb-0.5 flex items-center gap-1">
                <span>${msg.author || 'Altai Optima'}</span>
                <span class="text-[8px] bg-sky-100 text-sky-700 px-1 rounded font-normal">ИИ</span>
              </div>
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-800">${msg.text}</p>
              <div class="text-[9px] text-slate-400 text-right mt-0.5 font-sans flex items-center justify-end gap-1">
                <span>${msg.time}</span>
              </div>
            </div>
          </div>
        `,
        renderUserBubble: (msg) => `
          <div class="flex justify-end items-end gap-1.5 animate-fade-in">
            <div class="bg-[#eff7ff] text-slate-900 p-2.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-xs border border-sky-100">
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-800">${msg.text}</p>
              <div class="text-[9px] text-sky-600 text-right mt-0.5 font-sans flex items-center justify-end gap-1">
                <span>${msg.time}</span>
                <span class="text-[#229ed9]">✓✓</span>
              </div>
            </div>
          </div>
        `,
        renderFooter: () => `
          <div class="flex items-center gap-1.5 w-full">
            <button type="button" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
              <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
            </button>
            <form id="liveChatForm" onsubmit="handleLiveChatSubmit(event)" class="flex-1 flex items-center gap-1.5">
              <div class="flex-1 bg-white border border-slate-200/90 rounded-2xl px-3 py-1.5 flex items-center justify-between shadow-2xs live-chat-input-glow">
                <input id="liveChatInput" type="text" placeholder="Сообщение" autocomplete="off" class="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs outline-none" />
                <span class="text-slate-400 text-xs ml-1">🌙</span>
              </div>
              <button id="liveChatSubmitBtn" type="submit" class="w-8 h-8 rounded-full bg-[#2aabee] hover:bg-[#229ed9] active:scale-95 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer">
                <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </form>
          </div>
        `
      },
      reanimate: {
        channel: 'INSTAGRAM DIRECT',
        badge: 'Instagram',
        assistantName: 'altai.optima',
        headerBg: 'bg-white border-b border-slate-100',
        headerSubText: 'text-slate-400',
        statusText: 'В сети',
        chatBg: 'chat-bg-ig',
        renderHeader: () => `
          <div class="flex items-center gap-2 w-full justify-between text-slate-900">
            <div class="flex items-center text-slate-800 font-bold text-xs cursor-pointer">
              <svg class="w-4 h-4 mr-0.5 fill-current" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              <span>2</span>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shrink-0">
                <div class="w-6 h-6 rounded-full overflow-hidden border border-white bg-slate-900">
                  <img src="avatar_eva.webp" alt="Эва" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="leading-tight text-left">
                <div class="text-xs font-extrabold flex items-center gap-1">
                  <span>altai.optima</span>
                  <svg class="w-3 h-3 text-sky-500 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <div class="text-[9px] text-slate-400">В сети</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="resetLiveChatDialogue()" class="text-[10px] text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-all cursor-pointer font-medium">
                Очистить
              </button>
            </div>
          </div>
        `,
        renderStarter: () => `
          <div class="empty-chat-state h-full flex flex-col justify-between items-center text-center animate-fade-in py-1 px-1">
            <div class="flex flex-col items-center justify-center text-center p-1 space-y-1">
              <div class="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-slate-900">
                  <img src="avatar_eva.webp" alt="Эва" class="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <div class="text-xs font-black text-slate-900">altai.optima</div>
                <div class="text-[9px] text-slate-400">Instagram Direct · Чат пуст</div>
              </div>
            </div>

            <div class="my-auto py-2 px-2 flex flex-col items-center justify-center text-center space-y-2.5 cursor-pointer select-none" onclick="focusChatInput()">
              <div class="space-y-0.5 max-w-[270px]">
                <div class="text-[12.5px] font-black text-slate-900 tracking-tight">Напишите сообщение в Direct</div>
                <p class="text-[10.5px] text-slate-600 leading-snug font-normal">
                  ИИ отвечает мгновенно 24/7. Напечатайте вопрос или кликните вариант:
                </p>
              </div>
              <div class="flex flex-col gap-1.5 w-full max-w-[285px]">
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Как протестировать на наших товарах?')" class="text-left text-[11px] font-medium bg-slate-50 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-pink-500 active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Как протестировать на наших товарах?»</span>
                  <span class="text-pink-600 text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Отвечаете ли на реакции в Stories?')" class="text-left text-[11px] font-medium bg-slate-50 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-pink-500 active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Отвечаете ли на реакции в Stories?»</span>
                  <span class="text-pink-600 text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Как передаются лиды в отдел продаж?')" class="text-left text-[11px] font-medium bg-slate-50 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-pink-500 active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Как передаются лиды в отдел продаж?»</span>
                  <span class="text-pink-600 text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
            </div>

            <div class="pt-1 pb-1 flex items-center gap-1.5 text-[10.5px] font-bold text-pink-600 animate-bounce cursor-pointer select-none" onclick="focusChatInput()">
              <span>Напечатайте сообщение в поле ниже</span>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/></svg>
            </div>
          </div>
        `,
        renderAiBubble: (msg) => `
          <div class="flex justify-start items-end gap-1.5 animate-fade-in">
            <div class="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-3 rounded-2xl rounded-bl-xs max-w-[88%] shadow-xs">
              <div class="text-[9.5px] font-bold text-pink-100 mb-0.5">${msg.author || 'altai.optima'}</div>
              <p class="leading-relaxed font-normal text-[11.5px] text-white">${msg.text}</p>
              <div class="text-[9px] text-white/80 text-right mt-0.5 font-sans">${msg.time}</div>
            </div>
          </div>
        `,
        renderUserBubble: (msg) => `
          <div class="flex justify-end items-end gap-1.5 animate-fade-in">
            <div class="bg-[#efefef] text-slate-900 px-3 py-2 rounded-2xl rounded-br-xs max-w-[85%] shadow-2xs">
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-800">${msg.text}</p>
              <div class="text-[9px] text-slate-400 text-right mt-0.5 font-sans">${msg.time}</div>
            </div>
          </div>
        `,
        renderFooter: () => `
          <div class="flex items-center gap-1.5 w-full">
            <button type="button" class="text-slate-500 hover:text-slate-800 p-1 cursor-pointer">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </button>
            <form id="liveChatForm" onsubmit="handleLiveChatSubmit(event)" class="flex-1 flex items-center gap-1.5">
              <div class="flex-1 bg-slate-100 border border-slate-200/80 rounded-full px-3 py-1.5 flex items-center justify-between live-chat-input-glow">
                <input id="liveChatInput" type="text" placeholder="Написать сообщение..." autocomplete="off" class="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs outline-none" />
                <span class="text-slate-400 text-xs ml-1">🎙️</span>
              </div>
              <button id="liveChatSubmitBtn" type="submit" class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer">
                <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </form>
          </div>
        `
      },
      avito_deal: {
        channel: 'AVITO',
        badge: 'Авито',
        assistantName: 'Altai Optima | ИИ-Продавец',
        headerBg: 'bg-white border-b border-slate-200/80',
        headerSubText: 'text-slate-500',
        statusText: 'в сети',
        chatBg: 'chat-bg-avito',
        renderHeader: () => `
          <div class="flex items-center gap-2 w-full justify-between text-slate-900">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-800 cursor-pointer fill-current" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              <div class="w-7 h-7 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0 p-0.5 flex items-center justify-center">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="7" cy="8" r="4" fill="#00AAFF"/>
                  <circle cx="17" cy="7" r="3" fill="#04E061"/>
                  <circle cx="16" cy="16" r="4.5" fill="#FF4053"/>
                  <circle cx="8" cy="16.5" r="2.5" fill="#9B51E0"/>
                </svg>
              </div>
              <div class="leading-tight text-left">
                <div class="text-[11.5px] font-bold flex items-center gap-1">
                  <span>Altai Optima</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div class="text-[9.5px] text-slate-500 truncate max-w-[130px]">Автономный отдел продаж · 50 000 ₽</div>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="resetLiveChatDialogue()" class="text-[10px] text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-all cursor-pointer font-medium">
                Очистить
              </button>
            </div>
          </div>
        `,
        renderStarter: () => `
          <div class="empty-chat-state h-full flex flex-col justify-between items-center text-center animate-fade-in py-1 px-1">
            <div class="space-y-2 w-full">
              <div class="flex justify-center">
                <span class="text-slate-400 text-[10px] font-medium">Понедельник, 14 сентября</span>
              </div>
              <div class="mx-auto max-w-[96%] bg-[#eef9ef] border border-[#d6f2d6] rounded-2xl p-2 text-slate-800 text-[10.5px] leading-snug shadow-2xs flex items-center gap-2">
                <div class="shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="7" cy="8" r="4" fill="#00AAFF"/>
                    <circle cx="17" cy="7" r="3" fill="#04E061"/>
                    <circle cx="16" cy="16" r="4.5" fill="#FF4053"/>
                    <circle cx="8" cy="16.5" r="2.5" fill="#9B51E0"/>
                  </svg>
                </div>
                <p class="font-medium text-slate-700 text-[10.5px]">Безопасная сделка на Авито. Чат пуст.</p>
              </div>
            </div>

            <div class="my-auto py-2 px-2 flex flex-col items-center justify-center text-center space-y-2.5 cursor-pointer select-none" onclick="focusChatInput()">
              <div class="space-y-0.5 max-w-[270px]">
                <div class="text-[12.5px] font-black text-slate-900 tracking-tight">Начните диалог с продавцом</div>
                <p class="text-[10.5px] text-slate-600 leading-snug font-normal">
                  Задайте вопрос по объявлению в строке внизу или выберите готовый:
                </p>
              </div>
              <div class="flex flex-col gap-1.5 w-full max-w-[285px]">
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Здравствуйте, как настроить под ключ?')" class="text-left text-[11px] font-medium bg-[#f2f3f5] hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#00aaff] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Здравствуйте, как настроить под ключ?»</span>
                  <span class="text-[#00aaff] text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Какая актуальная стоимость тарифа?')" class="text-left text-[11px] font-medium bg-[#f2f3f5] hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#00aaff] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Какая актуальная стоимость тарифа?»</span>
                  <span class="text-[#00aaff] text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button type="button" onclick="event.stopPropagation(); sendQuickPrompt('Интересует интеграция с 1С')" class="text-left text-[11px] font-medium bg-[#f2f3f5] hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#00aaff] active:scale-98 transition-all flex items-center justify-between group cursor-pointer">
                  <span>«Интересует интеграция с 1С»</span>
                  <span class="text-[#00aaff] text-xs opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
            </div>

            <div class="pt-1 pb-1 flex items-center gap-1.5 text-[10.5px] font-bold text-[#00aaff] animate-bounce cursor-pointer select-none" onclick="focusChatInput()">
              <span>Напечатайте вопрос в строке ниже</span>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11 4h2v12l5.5-5.5 1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5 11 16V4z"/></svg>
            </div>
          </div>
        `,
        renderAiBubble: (msg) => `
          <div class="flex justify-start items-end gap-1 animate-fade-in">
            <div class="bg-[#f2f3f5] text-slate-900 p-2.5 rounded-2xl rounded-tl-xs max-w-[88%] shadow-2xs">
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-900">${msg.text}</p>
              <div class="text-[8.5px] text-slate-400 text-right mt-0.5">${msg.time}</div>
            </div>
          </div>
        `,
        renderUserBubble: (msg) => `
          <div class="flex justify-end items-end gap-1 animate-fade-in">
            <div class="bg-[#e1f3fe] text-slate-900 px-3 py-2 rounded-2xl rounded-tr-xs max-w-[85%] shadow-2xs">
              <p class="leading-relaxed font-normal text-[11.5px] text-slate-900">${msg.text}</p>
              <div class="text-[8.5px] text-[#00aaff] text-right mt-0.5 font-sans">${msg.time} ✓✓</div>
            </div>
          </div>
        `,
        renderFooter: () => `
          <div class="flex items-center gap-1.5 w-full">
            <button type="button" class="text-slate-600 hover:text-slate-900 p-1 cursor-pointer">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
            <form id="liveChatForm" onsubmit="handleLiveChatSubmit(event)" class="flex-1 flex items-center gap-1.5">
              <div class="flex-1 bg-[#f2f3f5] border border-slate-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between live-chat-input-glow">
                <input id="liveChatInput" type="text" placeholder="Сообщение" autocomplete="off" class="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs outline-none" />
                <span class="text-slate-400 text-xs ml-1">📷</span>
              </div>
              <button id="liveChatSubmitBtn" type="submit" class="w-8 h-8 rounded-xl bg-[#00aaff] hover:bg-[#0095e0] active:scale-95 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer">
                <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </form>
          </div>
        `
      }
    };

    // Хранилище сообщений для каждого мессенджера
    const channelMessages = {
      full_deal: [],
      price_objection: [],
      reanimate: [],
      avito_deal: []
    };

    // AI DEMO CHAT CLIENT (Интеграция с Production API)
    class DemoChatClient {
      constructor() {
        this.baseUrl = "https://api.optima.altaiweb.online";
        this.tenantId = "altai_optima";
        this.storageKey = "altai_demo_session_id_altai_optima";
        this.config = null;
        this.isSending = false;
      }

      getSessionId() {
        try {
          return localStorage.getItem(this.storageKey);
        } catch (e) {
          return null;
        }
      }

      setSessionId(id) {
        try {
          if (id) localStorage.setItem(this.storageKey, id);
        } catch (e) {}
      }

      resetSession() {
        try {
          localStorage.removeItem(this.storageKey);
        } catch (e) {}
      }

      async getConfig() {
        if (this.config) return this.config;
        try {
          const res = await fetch(`${this.baseUrl}/api/v1/demo/config?tenant_id=${encodeURIComponent(this.tenantId)}`);
          if (!res.ok) throw new Error(`Config HTTP ${res.status}`);
          this.config = await res.json();
          return this.config;
        } catch (e) {
          this.config = {
            tenant_id: this.tenantId,
            business_name: "ALTAI Optima",
            welcome_message: "Здравствуйте! Я ваш персональный ИИ-продавец. Готов ответить на любые вопросы, рассчитать стоимость и оформить заказ. Чем могу помочь?",
            suggested_questions: [
              "Сколько стоит внедрение под ключ?",
              "А если клиент просит скидку?",
              "Работаете с amoCRM, Битрикс24 и 1С?",
              "В чем отличие от шаблонных скриптов?"
            ],
            max_message_length: 4000
          };
          return this.config;
        }
      }

      async sendMessage(messageText) {
        const personaKey = (window.AO_PERSONA && window.AO_PERSONA.key) || 'stanislav';
        const payload = {
          message: messageText.trim(),
          session_id: this.getSessionId() || null,
          tenant_id: this.tenantId,
          persona: personaKey
        };

        const res = await fetch(`${this.baseUrl}/api/v1/demo/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.status === 429) {
          const err = new Error("Сервер временно перегружен, пожалуйста, подождите минуту.");
          err.status = 429;
          throw err;
        }

        if (!res.ok) {
          throw new Error(`Ошибка сервера (${res.status})`);
        }

        const data = await res.json();
        if (data && data.session_id) {
          this.setSessionId(data.session_id);
        }
        return data;
      }
    }

    const demoChatClient = new DemoChatClient();

    function formatAiResponse(text) {
      if (!text) return '';
      let safe = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      safe = safe.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      safe = safe.replace(/\*(.*?)\*/g, '<i>$1</i>');
      safe = safe.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
      return safe;
    }

    function resetLiveChatDialogue() {
      demoChatClient.resetSession();
      channelMessages[currentKey] = [];
      renderFullBranch(currentKey, false);
      runChatTypewriter();
    }

    let currentKey = 'full_deal';

    function applyMessengerTheme(key) {
      const cfg = channelsConfig[key];
      if (!cfg) return;

      const chatHeader = document.getElementById('chatHeader');
      const messagesContainer = document.getElementById('messagesContainer');
      const chatFooterBar = document.getElementById('chatFooterBar');

      if (chatHeader) {
        chatHeader.className = `pt-10 pb-2.5 px-3.5 text-white flex items-center justify-between transition-all duration-300 shadow-xs z-10 shrink-0 ${cfg.headerBg}`;
        chatHeader.innerHTML = cfg.renderHeader();
      }
      if (messagesContainer) {
        messagesContainer.className = `p-3.5 space-y-3 flex-grow overflow-y-auto text-xs transition-colors duration-300 min-h-[320px] ${cfg.chatBg}`;
      }
      if (chatFooterBar) {
        chatFooterBar.innerHTML = cfg.renderFooter();
      }
      runChatTypewriter();
    }

    // ФОКУС НА ПОЛЕ ВВОДА ПРИ КЛИКЕ НА ОБЛАСТЬ ЧАТА
    function focusChatInput() {
      const input = document.getElementById('liveChatInput');
      if (input) {
        input.focus();
        const wrapper = input.closest('.live-chat-input-glow') || input.parentElement;
        if (wrapper) {
          wrapper.classList.add('ring-2', 'ring-sky-400');
          setTimeout(() => wrapper.classList.remove('ring-2', 'ring-sky-400'), 1000);
        }
      }
    }

    // ДИНАМИЧЕСКИЙ ЭФФЕКТ НАБОРА ТЕКСТА В ПОЛЕ ВВОДА (TYPEWRITER)
    let chatTypewriterTimer = null;
    const chatPromptsList = [
      "Напишите любой вопрос ИИ-продавцу...",
      "«Сколько стоит внедрение под ключ?»",
      "«А если клиент просит скидку?»",
      "«С какими CRM и каналами работаете?»",
      "«Как быстро настраивается система?»",
      "Напечатайте сообщение сюда..."
    ];
    let chatPromptIndex = 0;
    let chatCharIndex = 0;
    let chatIsDeleting = false;

    function runChatTypewriter() {
      if (chatTypewriterTimer) clearTimeout(chatTypewriterTimer);
      const input = document.getElementById('liveChatInput');
      if (!input) return;

      // Если поле в фокусе или пользователь уже начал писать - не мешаем
      if (document.activeElement === input || (input.value && input.value.length > 0)) {
        chatTypewriterTimer = setTimeout(runChatTypewriter, 1200);
        return;
      }

      const fullText = chatPromptsList[chatPromptIndex];

      if (!chatIsDeleting) {
        chatCharIndex++;
        input.setAttribute('placeholder', fullText.substring(0, chatCharIndex) + '|');
        if (chatCharIndex >= fullText.length) {
          input.setAttribute('placeholder', fullText);
          chatIsDeleting = true;
          chatTypewriterTimer = setTimeout(runChatTypewriter, 2200);
          return;
        }
        chatTypewriterTimer = setTimeout(runChatTypewriter, 65);
      } else {
        chatCharIndex--;
        input.setAttribute('placeholder', fullText.substring(0, chatCharIndex) + '|');
        if (chatCharIndex <= 0) {
          chatIsDeleting = false;
          chatPromptIndex = (chatPromptIndex + 1) % chatPromptsList.length;
          chatTypewriterTimer = setTimeout(runChatTypewriter, 400);
          return;
        }
        chatTypewriterTimer = setTimeout(runChatTypewriter, 30);
      }
    }

    let chatAnimTimers = [];

    function clearChatAnimTimers() {
      chatAnimTimers.forEach(t => clearTimeout(t));
      chatAnimTimers = [];
    }

    function renderFullBranch(key, animate = false) {
      clearChatAnimTimers();
      const box = document.getElementById('messagesContainer');
      if (!box) return;
      box.innerHTML = '';
      const cfg = channelsConfig[key];
      if (!cfg) return;

      const list = channelMessages[key] || [];

      if (list.length === 0) {
        box.innerHTML = cfg.renderStarter();
        box.scrollTop = 0;
        return;
      }

      list.forEach(msg => {
        const isAi = msg.sender === 'ai';
        const html = isAi ? cfg.renderAiBubble(msg) : cfg.renderUserBubble(msg);
        box.insertAdjacentHTML('beforeend', html);
      });
      box.scrollTop = box.scrollHeight;
    }

    function selectBranch(key, btn) {
      document.querySelectorAll('.branch-btn').forEach(b => {
        b.classList.remove('active');
      });
      if (btn) {
        btn.classList.add('active');
      }
      currentKey = key;
      applyMessengerTheme(key);
      renderFullBranch(key, false);
    }

    // ДИАЛОГОВЫЙ ДВИЖОК ЖИВОГО ОБЩЕНИЯ С ИИ-ПРОДАВЦОМ
    function sendQuickPrompt(text) {
      const input = document.getElementById('liveChatInput');
      if (input) {
        input.value = text;
        handleLiveChatSubmit();
      }
    }

    async function handleLiveChatSubmit(event) {
      if (event) event.preventDefault();
      const input = document.getElementById('liveChatInput');
      const submitBtn = document.getElementById('liveChatSubmitBtn');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;
      if (demoChatClient.isSending) return;

      const box = document.getElementById('messagesContainer');
      if (!box) return;

      const cfg = channelsConfig[currentKey] || channelsConfig.full_deal;
      const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      // Рендерим сообщение пользователя
      const userMsg = {
        sender: 'user',
        author: 'Вы',
        text: text,
        time: timeStr
      };
      if (!channelMessages[currentKey]) channelMessages[currentKey] = [];
      channelMessages[currentKey].push(userMsg);
      box.insertAdjacentHTML('beforeend', cfg.renderUserBubble(userMsg));
      box.scrollTop = box.scrollHeight;
      input.value = '';

      // Блокируем ввод и показываем индикатор набора
      demoChatClient.isSending = true;
      input.disabled = true;
      if (submitBtn) submitBtn.disabled = true;

      const existingTyping = document.getElementById('chatTypingIndicator');
      if (existingTyping) existingTyping.remove();

      const typingHtml = `
        <div id="chatTypingIndicator" class="flex justify-start items-end gap-2 animate-fade-in transition-all">
          <div class="bg-white text-slate-800 px-3 py-2 rounded-2xl rounded-bl-xs shadow-xs border border-slate-200/80 flex items-center gap-2">
            <span class="text-[10px] font-bold text-sky-700">печатает…</span>
            <div class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style="animation-delay: 0ms; animation-duration: 0.8s;"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style="animation-delay: 180ms; animation-duration: 0.8s;"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style="animation-delay: 360ms; animation-duration: 0.8s;"></span>
            </div>
          </div>
        </div>
      `;
      box.insertAdjacentHTML('beforeend', typingHtml);
      box.scrollTop = box.scrollHeight;

      try {
        const data = await demoChatClient.sendMessage(text);
        const typingEl = document.getElementById('chatTypingIndicator');
        if (typingEl) typingEl.remove();

        const responseText = data.assistant_response || data.response || 'Спасибо за обращение! Запрос зафиксирован в CRM.';
        const formattedText = formatAiResponse(responseText);

        const aiTimeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const aiMsg = {
          sender: 'ai',
          author: cfg.assistantName || 'Altai Optima',
          text: formattedText,
          time: aiTimeStr
        };
        channelMessages[currentKey].push(aiMsg);
        box.insertAdjacentHTML('beforeend', cfg.renderAiBubble(aiMsg));
        box.scrollTop = box.scrollHeight;
      } catch (err) {
        const typingEl = document.getElementById('chatTypingIndicator');
        if (typingEl) typingEl.remove();

        // Психологический фоллбэк: если бэкенд офлайн, отвечаем по стандартам продаж
        const lower = text.toLowerCase().trim();
        let fallbackReply = '';

        if (lower.includes('третий день') || lower.includes('долго') || lower.includes('претензи') || lower.includes('издевательств')) {
          fallbackReply = 'Искренне приношу извинения за задержку — понимаю ваше возмущение, ожидание действительно недопустимо. Давайте сразу исправим ситуацию: по какому заказу или вопросу ждёте информацию? Я найду данные прямо сейчас и всё решу.';
        } else if (lower.includes('дешевле') || lower.includes('скидк') || lower.includes('торг')) {
          fallbackReply = 'Понимаю ваше желание сэкономить — бюджет всегда важен. Но давайте сравним условия: мы закладываем полное сопровождение, прозрачные регламенты и отсутствие скрытых переплат. Подскажите, что именно предложили конкуренты? Посмотрим, в чём разница.';
        } else if (lower === 'цена' || lower.includes('стоимость')) {
          fallbackReply = 'Здравствуйте! Подскажу точную стоимость. Чтобы назвать цифру именно под вашу задачу: для какого объёма заявок подбираете решение? Назовите 1–2 детали, и я сразу пришлю точный расчёт с вариантами.';
        } else if (lower.includes('подумать') || lower.includes('сомнен')) {
          fallbackReply = 'Конечно, спешка здесь ни к чему. А над чем именно хотите подумать — есть сомнения по функционалу, срокам или стоимости? Если удобно, пришлю краткую выжимку по пунктам, чтобы было проще сравнить.';
        } else {
          fallbackReply = 'Здравствуйте! Я ИИ-продавец Altai Optima. Отвечаю за 40 секунд, квалифицирую лиды и передаю готовые заявки в CRM. Какой сценарий работы вашего бизнеса хотите протестировать?';
        }

        const aiTimeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const aiMsg = {
          sender: 'ai',
          author: cfg.assistantName || 'Altai Optima',
          text: fallbackReply,
          time: aiTimeStr
        };
        channelMessages[currentKey].push(aiMsg);
        box.insertAdjacentHTML('beforeend', cfg.renderAiBubble(aiMsg));
        box.scrollTop = box.scrollHeight;
      } finally {
        demoChatClient.isSending = false;
        input.disabled = false;
        if (submitBtn) submitBtn.disabled = false;
        input.focus();
      }
    }

    let currentScenarioBoost = 0.12;
    const calcAnimationFrames = {};

    function formatCalcNumber(num, fractionDigits = 0) {
      if (num === null || num === undefined || isNaN(num)) return '0';
      return num.toLocaleString('ru-RU', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      }).replace(/\s/g, '\u00A0');
    }

    function animateValue(elem, targetVal, suffix = '', prefix = '') {
      if (!elem) return;
      const id = elem.id || 'calc_anim';
      if (calcAnimationFrames[id]) {
        cancelAnimationFrame(calcAnimationFrames[id]);
      }
      
      const currentStr = elem.getAttribute('data-raw-val');
      const startVal = currentStr !== null ? parseFloat(currentStr) : targetVal;
      elem.setAttribute('data-raw-val', targetVal);

      if (Math.abs(targetVal - startVal) < 1) {
        elem.textContent = `${prefix}${formatCalcNumber(targetVal)}${suffix}`;
        return;
      }

      const duration = 240;
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 2);
        const current = Math.round(startVal + (targetVal - startVal) * ease);
        elem.textContent = `${prefix}${formatCalcNumber(current)}${suffix}`;
        if (progress < 1) {
          calcAnimationFrames[id] = requestAnimationFrame(step);
        } else {
          elem.textContent = `${prefix}${formatCalcNumber(targetVal)}${suffix}`;
        }
      }
      calcAnimationFrames[id] = requestAnimationFrame(step);
    }

    function setCalcScenario(boost, btn) {
      currentScenarioBoost = boost;
      document.querySelectorAll('.calc-scenario-btn').forEach(b => {
        b.classList.remove('active', 'bg-white', 'text-sky-700', 'shadow-xs', 'border', 'border-sky-200');
        b.classList.add('text-slate-600');
      });
      if (btn) {
        btn.classList.add('active', 'bg-white', 'text-sky-700', 'shadow-xs', 'border', 'border-sky-200');
        btn.classList.remove('text-slate-600');
      }
      updateCalc();
    }

    function updateSliderTrack(slider) {
      if (!slider) return;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
      slider.style.background = `linear-gradient(to right, #0284c7 0%, #0284c7 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`;
    }

    function adjustCalcValue(rangeId, delta) {
      const slider = document.getElementById(rangeId);
      if (!slider) return;
      let val = parseFloat(slider.value) || 0;
      val += delta;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 10000000;
      val = Math.max(min, Math.min(max, val));
      slider.value = val;
      
      const directInputId = rangeId.replace('Range', 'DirectInput');
      const directInput = document.getElementById(directInputId);
      if (directInput) {
        if (rangeId === 'checkRange') {
          directInput.value = formatCalcNumber(Math.round(val));
        } else if (rangeId === 'convRange') {
          directInput.value = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace('.', ',');
        } else {
          directInput.value = Math.round(val);
        }
      }

      const hidInput = document.getElementById(rangeId.replace('Range', 'Input'));
      if (hidInput) hidInput.value = val;

      updateSliderTrack(slider);
      updateCalc({ target: slider });
    }

    function syncCalcInput(rangeId, directInputId) {
      const slider = document.getElementById(rangeId);
      const directInput = document.getElementById(directInputId);
      if (!slider || !directInput) return;
      const val = parseFloat(slider.value) || 0;
      
      if (rangeId === 'checkRange') {
        directInput.value = formatCalcNumber(Math.round(val));
      } else if (rangeId === 'convRange') {
        directInput.value = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1).replace('.', ',');
      } else {
        directInput.value = Math.round(val);
      }

      const hidInput = document.getElementById(rangeId.replace('Range', 'Input'));
      if (hidInput) hidInput.value = val;

      updateSliderTrack(slider);
      updateCalc({ target: slider });
    }

    function handleDirectInput(rangeId, rawVal) {
      const slider = document.getElementById(rangeId);
      if (!slider) return;
      let val = parseFloat(String(rawVal).replace(',', '.')) || 0;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 10000000;
      const clamped = Math.max(min, Math.min(max, val));
      slider.value = clamped;

      const hidInput = document.getElementById(rangeId.replace('Range', 'Input'));
      if (hidInput) hidInput.value = clamped;

      updateSliderTrack(slider);
      updateCalc({ target: slider });
    }

    function handleCheckDirectInput(inputEl) {
      const raw = inputEl.value.replace(/\D/g, '');
      let val = parseInt(raw) || 0;
      const slider = document.getElementById('checkRange');
      if (slider) {
        const min = parseFloat(slider.min) || 1000;
        const max = parseFloat(slider.max) || 1000000;
        slider.value = Math.max(min, Math.min(max, val));
        updateSliderTrack(slider);
      }
      const hidInput = document.getElementById('checkInput');
      if (hidInput) hidInput.value = val;
      updateCalc({ target: inputEl });
    }

    function updateCalc(e) {
      const lEl = document.getElementById('leadsRange') || document.getElementById('leadsInput');
      const cvEl = document.getElementById('convRange') || document.getElementById('convInput');
      const cEl = document.getElementById('checkRange') || document.getElementById('checkInput');
      
      const mV = document.getElementById('monthVal');
      const pbV = document.getElementById('paybackVal');
      const yV = document.getElementById('yearVal');
      const breakdownEl = document.getElementById('calcFormulaBreakdown');
      const warnEl = document.getElementById('yearNetWarning');
      const mobGainEl = document.getElementById('mobCalcGainVal');

      if (!lEl || !cEl || !mV) return;

      const leads = Math.max(0, parseInt(lEl.value) || 0);
      const convPct = cvEl ? Math.max(0, parseFloat(cvEl.value) || 0) : 10.0;
      const check = Math.max(0, parseInt(cEl.value) || 0);

      // growth = 0.10 / 0.20 / 0.50 (из выбранной кнопки)
      const growth = currentScenarioBoost;
      // revenue = leads * (conversion / 100) * check
      const revenue = Math.round(leads * (convPct / 100) * check);
      // gain = revenue * growth (упущенная выручка в месяц)
      const gain = Math.round(revenue * growth);

      // Динамический тариф по объёму лидов:
      let tariffName = '«Старт»';
      let monthlyTariffPrice = 25000;
      if (leads <= 200) {
        tariffName = '«Старт»';
        monthlyTariffPrice = 25000;
      } else if (leads <= 600) {
        tariffName = '«Бизнес»';
        monthlyTariffPrice = 39000;
      } else if (leads <= 1500) {
        tariffName = '«Поток»';
        monthlyTariffPrice = 59000;
      } else {
        tariffName = '«Империя»';
        monthlyTariffPrice = 99000;
      }

      const launchPrice = 29000;
      const monthlyNet = gain - monthlyTariffPrice;
      const yearNet = gain * 12 - (launchPrice + monthlyTariffPrice * 12);
      const paybackDays = gain > 0 ? (launchPrice + monthlyTariffPrice) / (gain / 30) : Infinity;

      const tariffRecEl = document.getElementById('calcTariffRecommended');
      if (tariffRecEl) {
        tariffRecEl.innerHTML = `Тариф ${tariffName} — ${formatCalcNumber(monthlyTariffPrice)}&nbsp;₽/мес`;
      }
      const aoCostEl = document.getElementById('aoCalcCost');
      if (aoCostEl) {
        aoCostEl.innerHTML = `${formatCalcNumber(monthlyTariffPrice)}&nbsp;₽ в&nbsp;месяц`;
      }
      const aoTariffEl = document.getElementById('aoCalcTariff');
      if (aoTariffEl) {
        aoTariffEl.innerHTML = `тариф «${tariffName.replace(/[«»]/g, '')}» + запуск ${formatCalcNumber(launchPrice)}&nbsp;₽`;
      }

      // 1. Упущенная выручка в месяц (gain)
      animateValue(mV, gain, '\u00A0₽');

      // 2. Строка-расшифровка
      if (breakdownEl) {
        const convStr = convPct % 1 === 0 ? convPct.toFixed(0) : convPct.toFixed(1).replace('.', ',');
        const checkStr = formatCalcNumber(check);
        const revStr = formatCalcNumber(revenue);
        const growthPct = Math.round(growth * 100);
        breakdownEl.innerHTML = `Сейчас: ${leads}&nbsp;заявок × ${convStr}% × ${checkStr}&nbsp;₽ = ${revStr}&nbsp;₽ в&nbsp;месяц. Быстрый ответ вернёт около ${growthPct}% упущенных продаж.`;
      }

      // 3. Окупаемость
      let paybackStr = '—';
      if (!isFinite(paybackDays) || paybackDays <= 0) {
        paybackStr = '—';
      } else if (paybackDays <= 10) {
        paybackStr = '~' + Math.max(1, Math.round(paybackDays)) + ' дн.';
      } else if (paybackDays <= 45) {
        const w = Math.round(paybackDays / 7);
        paybackStr = '~' + w + (w === 1 ? ' неделю' : w < 5 ? ' недели' : ' недель');
      } else {
        const m = Math.round(paybackDays / 30);
        paybackStr = '~' + m + (m === 1 ? ' месяц' : m < 5 ? ' месяца' : ' месяцев');
      }
      if (pbV) pbV.textContent = paybackStr;

      // 4. Чистая выгода за год
      if (yearNet <= 0) {
        if (yV) yV.classList.add('hidden');
        if (warnEl) warnEl.classList.remove('hidden');
      } else {
        if (warnEl) warnEl.classList.add('hidden');
        if (yV) {
          yV.classList.remove('hidden');
          animateValue(yV, yearNet, '\u00A0₽', '+');
        }
      }

      // 5. Мобильная липкая плашка
      if (mobGainEl) {
        mobGainEl.textContent = formatCalcNumber(gain) + '\u00A0₽/мес';
      }
      if (window.updateCalcStickyBar) {
        window.updateCalcStickyBar();
      }

      // Динамическая подсветка при взаимодействии
      if (e && e.target) {
        const targetId = e.target.id || '';
        const baseName = targetId.replace('DirectInput', 'Range').replace('Input', 'Range');
        
        document.querySelectorAll('.calc-input-box').forEach(b => b.classList.remove('is-active'));
        const activeBox = document.getElementById(`box_${baseName}`);
        if (activeBox) activeBox.classList.add('is-active');

        if (mV) mV.classList.add('is-updating');
        if (yV) yV.classList.add('is-updating');

        clearTimeout(window._calcHighlightTimer);
        window._calcHighlightTimer = setTimeout(() => {
          if (mV) mV.classList.remove('is-updating');
          if (yV) yV.classList.remove('is-updating');
          if (activeBox) activeBox.classList.remove('is-active');
        }, 280);
      }
    }

    function getNoun(number, one, two, five) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) return five;
      n %= 10;
      if (n === 1) return one;
      if (n >= 2 && n <= 4) return two;
      return five;
    }

    function initCalcStickyBar() {
      const stickyBar = document.getElementById('calcMobileStickyBar');
      const calcSec = document.getElementById('calculator');
      const resultCard = document.getElementById('calcResultCard');
      if (!stickyBar || !calcSec || !resultCard) return;

      function isVisible(el, thresholdPx = 40) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        return (r.top < vh - thresholdPx) && (r.bottom > thresholdPx);
      }

      function updateStickyBarVisibility() {
        if (window.innerWidth >= 768) {
          stickyBar.classList.add('translate-y-full');
          return;
        }
        const inCalc = isVisible(calcSec, 60);
        const inCard = isVisible(resultCard, 80);
        if (inCalc && !inCard) {
          stickyBar.classList.remove('translate-y-full');
        } else {
          stickyBar.classList.add('translate-y-full');
        }
      }

      window.updateCalcStickyBar = updateStickyBarVisibility;

      window.addEventListener('resize', updateStickyBarVisibility, { passive: true });
      window.addEventListener('scroll', updateStickyBarVisibility, { passive: true });
      setTimeout(updateStickyBarVisibility, 250);
    }

    function initCalc() {
      ['leadsRange', 'convRange', 'checkRange'].forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
          updateSliderTrack(slider);
          slider.addEventListener('input', () => updateSliderTrack(slider));
        }
      });

      const checkDirect = document.getElementById('checkDirectInput');
      if (checkDirect) {
        checkDirect.addEventListener('blur', () => {
          const raw = checkDirect.value.replace(/\D/g, '');
          const val = parseInt(raw) || 0;
          checkDirect.value = formatCalcNumber(val);
        });
      }

      initCalcStickyBar();
      updateCalc();
    }


    // АНИМАЦИЯ АВТОМАТИЧЕСКОГО ЗАПОЛНЕНИЯ КАРТОЧКИ AMO CRM
    function runAmoCardAnimation() {
      const phoneEl = document.getElementById('amoPhone');
      const badgeEl = document.getElementById('amoPhoneBadge');
      const emailEl = document.getElementById('amoEmail');
      const posEl = document.getElementById('amoPosition');
      const budgetEl = document.getElementById('amoBudget');
      const compEl = document.getElementById('amoCompany');
      const indEl = document.getElementById('amoIndustry');
      const cityEl = document.getElementById('amoCity');
      const statusEl = document.getElementById('amoStatus');
      const checkIcon = document.getElementById('amoCheckIcon');
      const counterEl = document.getElementById('amoFillCounter');

      if (!phoneEl) return;

      const steps = [
        {
          delay: 700,
          action: () => {
            phoneEl.textContent = '+7 (999) 834-12-05';
            phoneEl.classList.add('text-sky-700', 'font-bold');
            if (badgeEl) badgeEl.classList.remove('opacity-0');
            if (counterEl) counterEl.textContent = 'Заполнено 1 из 8 обязательных полей';
          }
        },
        {
          delay: 1300,
          action: () => {
            emailEl.textContent = 'maxim@prom-holding.ru';
            emailEl.classList.add('text-sky-700');
            if (counterEl) counterEl.textContent = 'Заполнено 2 из 8 обязательных полей';
          }
        },
        {
          delay: 1900,
          action: () => {
            posEl.textContent = 'Коммерческий директор (ЛПР)';
            posEl.classList.add('text-slate-900');
            if (counterEl) counterEl.textContent = 'Заполнено 3 из 8 обязательных полей';
          }
        },
        {
          delay: 2500,
          action: () => {
            budgetEl.textContent = '3 450 000 ₽';
            budgetEl.classList.add('text-emerald-700');
            if (counterEl) counterEl.textContent = 'Заполнено 4 из 8 обязательных полей';
          }
        },
        {
          delay: 3100,
          action: () => {
            compEl.textContent = 'ПромСтройХолдинг ООО';
            compEl.classList.add('text-slate-950');
            if (counterEl) counterEl.textContent = 'Заполнено 5 из 8 обязательных полей';
          }
        },
        {
          delay: 3700,
          action: () => {
            indEl.textContent = 'Оптовые поставки металлопроката';
            indEl.classList.add('text-slate-700');
            if (counterEl) counterEl.textContent = 'Заполнено 6 из 8 обязательных полей';
          }
        },
        {
          delay: 4300,
          action: () => {
            cityEl.textContent = 'Москва, ЦФО';
            cityEl.classList.add('text-slate-700');
            if (counterEl) counterEl.textContent = 'Заполнено 7 из 8 обязательных полей';
          }
        },
        {
          delay: 4900,
          action: () => {
            if (statusEl) {
              statusEl.innerHTML = `
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-emerald-700 font-bold">КП отправлено • Ждем оплату</span>
              `;
            }
            if (checkIcon) {
              checkIcon.classList.remove('text-slate-400');
              checkIcon.classList.add('text-emerald-600');
            }
            if (counterEl) {
              counterEl.textContent = 'Все 8 обязательных полей заполнены на 100%';
              counterEl.classList.add('text-emerald-700', 'font-bold');
            }
          }
        },
        {
          // Пауза перед новым демонстрационным циклом
          delay: 11000,
          action: () => {
            phoneEl.textContent = '...';
            if (badgeEl) badgeEl.classList.add('opacity-0');
            emailEl.textContent = '...';
            posEl.textContent = '...';
            budgetEl.textContent = '...';
            compEl.textContent = '...';
            indEl.textContent = '...';
            cityEl.textContent = '...';
            if (statusEl) {
              statusEl.innerHTML = `
                <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                <span class="text-slate-500">Анализ диалога в переписке...</span>
              `;
            }
            if (checkIcon) {
              checkIcon.classList.remove('text-emerald-600');
              checkIcon.classList.add('text-slate-400');
            }
            if (counterEl) {
              counterEl.textContent = 'Заполнено 0 из 8 обязательных полей';
              counterEl.classList.remove('text-emerald-700', 'font-bold');
            }
            runAmoCardAnimation();
          }
        }
      ];

      steps.forEach(st => setTimeout(st.action, st.delay));
    }

    // АВТОЗАПУСК И ПЛАВНОЕ ВОСПРОИЗВЕДЕНИЕ ВИДЕО В HERO БЕЗ НАГРУЗКИ НА ПАМЯТЬ
    (function initHeroVideo() {
      const video = document.getElementById('heroBgVideo');
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const onFirstInteraction = () => {
            video.play().catch(() => {});
            window.removeEventListener('touchstart', onFirstInteraction);
            window.removeEventListener('click', onFirstInteraction);
            window.removeEventListener('scroll', onFirstInteraction);
          };
          window.addEventListener('touchstart', onFirstInteraction, { passive: true, once: true });
          window.addEventListener('click', onFirstInteraction, { passive: true, once: true });
          window.addEventListener('scroll', onFirstInteraction, { passive: true, once: true });
        });
      }
    })();

    // ДАННЫЕ И ЛОГИКА ДЛЯ ВЫБОРА АВАТАРОВ И ПЕРСОН (ПО СКРИНШОТУ 2)
    const personasData = {
      stanislav: {
        name: 'МИХАИЛ ОРЛОВ',
        role: 'СТАРШИЙ ИИ-ПРОДАВЕЦ ВОРОНКИ & МАСТЕР ПЕРВИЧНОГО КОНТАКТА',
        age: '45 лет',
        photo: 'persona_mikhail.webp',
        photoPos: '50% top',
        badge: 'ПЕРСОНА: МИХАИЛ ОРЛОВ',
        ready: 'Чистый трафик для экспертов',
        haloClass: 'ring-2 ring-sky-500 shadow-[0_0_18px_rgba(2,132,199,0.75)] scale-115',
        ageColorClass: 'text-sky-700',
        competencies: [
          '<strong class="text-slate-950">Фильтрация спама и зевак:</strong> отсекает 80% нецелевого трафика до менеджера.',
          '<strong class="text-slate-950">Мгновенная квалификация:</strong> за 30 секунд определяет бюджет, ЛПР и срочность.',
          '<strong class="text-slate-950">Знание регламентов:</strong> до 100 регламентов, стандартов и технических карт без ошибок.',
          '<strong class="text-slate-950">Бесшовная передача:</strong> передает в CRM готовое саммари и лид эксперту.'
        ],
        about: '«Я не пытаюсь заменить ваших ведущих экспертов и звезд продаж. Моя задача - забрать черновую рутину, защитить их фокус от спама и пустых диалогов и передать им клиента в момент наивысшей готовности к сделке.»'
      },
      yaroslav: {
        name: 'МАКСИМ ГРОМОВ',
        role: 'РУКОВОДИТЕЛЬ ОТДЕЛА ПРОДАЖ & АУДИТОР ВОРОНКИ',
        age: '39 лет',
        photo: 'persona_maxim.webp',
        photoPos: '50% top',
        badge: 'ПЕРСОНА: МАКСИМ ГРОМОВ',
        ready: 'Армейская дисциплина в CRM',
        haloClass: 'ring-2 ring-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.7)] scale-115',
        ageColorClass: 'text-amber-700',
        competencies: [
          '<strong class="text-slate-950">Беспощадная квалификация и скоринг:</strong> выявление реального бюджета, полномочий ЛПР и сроков за 60 секунд. Отсечение нецелевых запросов.',
          '<strong class="text-slate-950">Защита максимальной маржинальности:</strong> продажа строго без необоснованных скидок, доказательство превосходства продукта языком фактов.',
          '<strong class="text-slate-950">Тотальный контроль базы в 1С / CRM:</strong> регулярный прозвон и дожим уснувшей базы, 0% брошенных лидов, армейский порядок в карточках сделок.',
          '<strong class="text-slate-950">Режим непрерывной готовности:</strong> мгновенная обработка ночных и праздничных заявок за 3 секунды в режиме 24/7/365.'
        ],
        about: '«В продажах порядок, дисциплина и скорость решают всё. Я знаю каждую позицию в прайсе, помню историю каждого клиента и не выпущу лид из воронки, пока деньги не поступят на расчетный счет. Никаких упущенных заявок и забытых клиентов.»'
      },
      polina: {
        name: 'СОФЬЯ ДЕРЖИНСКАЯ',
        role: 'ВЕДУЩИЙ МЕНЕДЖЕР ПО ЗАБОТЕ О КЛИЕНТАХ & LTV',
        age: '49 лет',
        photo: 'persona_sofya.webp',
        photoPos: '50% 10%',
        badge: 'ПЕРСОНА: СОФЬЯ ДЕРЖИНСКАЯ',
        ready: '100% фокус на LTV и заботу',
        haloClass: 'ring-2 ring-rose-400 shadow-[0_0_18px_rgba(244,63,94,0.7)] scale-115',
        ageColorClass: 'text-rose-700',
        competencies: [
          '<strong class="text-slate-950">Забота и клиентский сервис 5 звезд:</strong> тактичная и дружелюбная поддержка в WhatsApp/Telegram, детальные консультации без ощущения робота.',
          '<strong class="text-slate-950">Увеличение LTV и повторные продажи:</strong> своевременное напоминание о регулярных закупках, допродажа сопутствующих позиций и рост чека.',
          '<strong class="text-slate-950">Мягкое снятие негатива и возражений:</strong> оперативное урегулирование спорных ситуаций и максимальное сохранение лояльности заказчиков.',
          '<strong class="text-slate-950">Идеальная координация заказов:</strong> мгновенное оформление счетов, передача заявок на склад и трекинг доставки до двери.'
        ],
        about: '«Клиенты возвращаются туда, где их слышат и ценят. Я встречаю каждое входящее обращение теплом, заботой и безупречным знанием каталога. Помогаю легко сориентироваться в ассортименте, быстро оформляю заказ и делаю так, чтобы каждый новый покупатель оставался с вашей компанией на долгие годы.»'
      },
      dmitry: {
        name: 'ДМИТРИЙ СЕВЕРНЫЙ',
        role: 'СТАРШИЙ СПЕЦИАЛИСТ ПО КОРПОРАТИВНЫМ РЕШЕНИЯМ',
        age: '32 года',
        photo: 'persona_dmitry.webp',
        photoPos: '72% top',
        badge: 'ПЕРСОНА: ДМИТРИЙ СЕВЕРНЫЙ',
        ready: 'Презентация сложных продуктов',
        haloClass: 'ring-2 ring-indigo-400 shadow-[0_0_18px_rgba(99,102,241,0.7)] scale-115',
        ageColorClass: 'text-indigo-700',
        competencies: [
          '<strong class="text-slate-950">Презентация сложных технологических продуктов:</strong> простое и наглядное объяснение технических преимуществ для лиц, принимающих решения.',
          '<strong class="text-slate-950">Быстрая подготовка КП и смет:</strong> автоматическая генерация индивидуальных коммерческих предложений и расчетов за 30 секунд.',
          '<strong class="text-slate-950">Экспертное закрытие возражений:</strong> аргументированное сравнение с аналогами рынка и демонстрация ключевых выгод.',
          '<strong class="text-slate-950">Выстраивание долгосрочного доверия:</strong> легкий и уверенный деловой стиль общения, располагающий к партнерству.'
        ],
        about: '«Главная задача в продажах - найти самое точное и выгодное решение для клиента. Я помогаю увидеть конкретную пользу продукта, быстро рассчитываю смету и формирую предложение, от которого невозможно отказаться.»'
      },
      ekaterina: {
        name: 'КОНСТАНТИН БЕЛОВ',
        role: 'ГЛАВНЫЙ АУДИТОР ВОРОНКИ & ФИНАНСОВЫЙ СКОРИНГ',
        age: '51 год',
        photo: 'persona_ekaterina.webp',
        photoPos: '72% top',
        badge: 'ПЕРСОНА: КОНСТАНТИН БЕЛОВ',
        ready: 'Строго по регламенту',
        haloClass: 'ring-2 ring-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.7)] scale-115',
        ageColorClass: 'text-emerald-700',
        competencies: [
          '<strong class="text-slate-950">Финансовый скоринг и проверка контрагентов:</strong> мгновенная оценка надежности клиента по открытым реестрам до отгрузки товара.',
          '<strong class="text-slate-950">Расчет смет и КП без единой ошибки:</strong> автоматическая сверка скидок, наценок и складских резервов в 1С.',
          '<strong class="text-slate-950">Управление дебиторской задолженностью:</strong> вежливое, но неотвратимое напоминание о графике оплат и контроль поступления средств.',
          '<strong class="text-slate-950">Юридическая безупречность:</strong> формирование типовых договоров и счетов без разногласий со службой безопасности.'
        ],
        about: '«В финансовой стороне сделок не бывает мелочей. Я гарантирую 100% точность в расчетах, идеальный порядок в закрывающих документах и своевременное поступление всех платежей без задержек.»'
      }
    };

    const personaHoverClasses = {
      stanislav: 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-sky-500 group-hover:shadow-[0_0_16px_rgba(2,132,199,0.7)]',
      yaroslav: 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-amber-400 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.7)]',
      polina: 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-rose-400 group-hover:shadow-[0_0_16px_rgba(244,63,94,0.7)]',
      dmitry: 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-indigo-400 group-hover:shadow-[0_0_16px_rgba(99,102,241,0.7)]',
      ekaterina: 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.7)]'
    };

    function selectPersona(key, btn) {
      currentPersonaKey = key;
      const data = personasData[key];
      if (!data) return;

      // Обновляем активный класс на кнопках и разноцветную подсветку аватаров
      document.querySelectorAll('.persona-btn').forEach(b => {
        b.classList.remove('active');
        const bKey = b.getAttribute('data-key');
        const hoverCls = personaHoverClasses[bKey] || 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-sky-400';
        const frame = b.querySelector('.persona-avatar-frame');
        if (frame) {
          frame.className = `persona-avatar-frame relative w-11 h-11 sm:w-12 sm:h-12 lg:w-11 lg:h-11 rounded-full overflow-hidden shrink-0 transition-all duration-300 border border-slate-200/80 bg-slate-100 ${hoverCls}`;
        }
        const age = b.querySelector('.persona-age');
        if (age) {
          age.className = 'persona-age text-[9px] sm:text-[11px] font-mono text-slate-500 font-bold whitespace-nowrap';
        }
      });
      if (btn) {
        btn.classList.add('active');
        const frame = btn.querySelector('.persona-avatar-frame');
        if (frame && data.haloClass) {
          frame.className = `persona-avatar-frame relative w-11 h-11 sm:w-12 sm:h-12 lg:w-11 lg:h-11 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${data.haloClass}`;
        }
        const age = btn.querySelector('.persona-age');
        if (age && data.ageColorClass) {
          age.className = `persona-age text-[9px] sm:text-[11px] font-mono ${data.ageColorClass} font-bold whitespace-nowrap`;
        }
      }

      // Обновляем резюме
      const nameEl = document.getElementById('resumeCandidateName');
      const roleEl = document.getElementById('resumeCandidateRole');
      const ageEl = document.getElementById('resumeCandidateAge');
      const photoEl = document.getElementById('resumeCandidatePhoto');
      const badgeEl = document.getElementById('activePersonaBadge');
      const readyEl = document.getElementById('resumeCandidateReady');

      if (nameEl) nameEl.textContent = data.name;
      if (roleEl) roleEl.textContent = data.role;
      if (ageEl) ageEl.textContent = data.age;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (readyEl) readyEl.textContent = data.ready;

      if (photoEl) {
        photoEl.style.opacity = '0';
        setTimeout(() => {
          photoEl.src = data.photo;
          photoEl.alt = `${data.name} - ${data.role}`;
          photoEl.style.objectPosition = data.photoPos || 'center';
          photoEl.style.opacity = '1';
        }, 150);
      }

      // Обновляем список ключевых компетенций
      const compListEl = document.getElementById('resumeCompetenciesList');
      if (compListEl && Array.isArray(data.competencies)) {
        compListEl.innerHTML = data.competencies.map(item => `
          <li class="flex items-start gap-2.5">
            <span class="text-emerald-600 font-bold text-sm flex-shrink-0 leading-none mt-0.5">✓</span>
            <span>${item}</span>
          </li>
        `).join('');
      }

      // Обновляем блок "О себе"
      const aboutEl = document.getElementById('resumeCandidateAbout');
      if (aboutEl && data.about) {
        aboutEl.innerHTML = data.about;
      }

      // Обновляем карточку справа
      const pTitle = document.getElementById('personaProfileTitle');
      const pDesc = document.getElementById('personaProfileDesc');
      const pVoice = document.getElementById('personaVoiceBadge');
      if (pTitle) pTitle.textContent = data.title;
      if (pDesc) pDesc.textContent = data.desc;
      if (pVoice && data.voiceBadge) pVoice.textContent = data.voiceBadge;
    }

    let isResumeExpanded = false;
    function toggleResume(forceState) {
      const card = document.getElementById('resumeCardWrapper');
      const btnText = document.getElementById('resumeExpandBtnText');
      const btnIcon = document.getElementById('resumeExpandBtnIcon');
      const expandBar = document.getElementById('resumeExpandBar');
      if (!card) return;

      if (typeof forceState === 'boolean') {
        isResumeExpanded = forceState;
      } else {
        isResumeExpanded = !isResumeExpanded;
      }

      if (isResumeExpanded) {
        card.classList.remove('max-h-[460px]');
        card.classList.add('max-h-[3000px]');
        if (btnText) btnText.textContent = 'Свернуть резюме';
        if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
        if (expandBar) {
          expandBar.className = 'relative inset-x-0 bottom-0 pt-6 pb-2 px-4 bg-transparent flex justify-center items-end z-20 transition-all duration-300';
        }
      } else {
        card.classList.remove('max-h-[3000px]');
        card.classList.add('max-h-[460px]');
        if (btnText) btnText.textContent = 'Развернуть полное резюме';
        if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
        if (expandBar) {
          expandBar.className = 'absolute inset-x-0 bottom-0 pt-24 pb-6 px-4 bg-gradient-to-t from-white via-white/95 to-transparent flex justify-center items-end z-20 transition-all duration-300';
        }
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    const toggleResumeMobile = toggleResume;

    // ДАННЫЕ ДЛЯ ИНТЕРАКТИВНЫХ РАЗБОРОВ КЕЙСОВ С РЕАЛЬНЫМИ ИНТЕРФЕЙСАМИ
    const casesData = {
      realestate: {
        companyName: 'АН «Домиан» (ООО «АН «Домиан»)',
        companyNiche: 'Риелторские услуги, вторичная недвижимость и новостройки (ИНН 6164287870)',
        authorAvatar: 'ГД',
        authorAvatarBg: 'bg-gradient-to-tr from-sky-600 to-blue-700',
        authorName: 'Геннадий Дорохин',
        authorRole: 'Основатель и генеральный директор',
        review: '«В риелторском бизнесе скорость первого контакта решает всё. Если клиент оставил заявку на подбор квартиры или оценку объекта, а риелтор перезванивает через 3 часа - клиент уже общается с другим агентством. AI Altai Optima подхватывает лиды с ЦИАН, Авито и сайта за 10 секунд, квалифицирует бюджет, район и формат покупки, после чего назначает показ или консультацию с ведущим брокером. Мы увеличили число закрытых сделок с 4 до 9 в месяц на филиал, а выручка выросла на 10.3 млн ₽.»',
        nicheTag: 'НИША: НЕДВИЖИМОСТЬ И РИЕЛТОРСКИЕ УСЛУГИ',
        stackTag: 'ПОДКЛЮЧЕНИЕ: VOICE AI + AMOCRM + ЦИАН/AVITO',
        title: 'Агентство недвижимости «Домиан»',
        subtitle: 'Рост закрытых сделок с 4 до 9 в месяц благодаря мгновенной квалификации звонков и автоназначению показов',
        revenue: '+10.3 млн ₽',
        revenueNote: 'ВЫРУЧКА ВЫРОСЛА С 8.2 ДО 18.5 МЛН ₽/МЕС (РОСТ В 2.25 РАЗА)',
        payback: '2 НЕДЕЛИ',
        metrics: [
          { label: 'РОСТ ВЫРУЧКИ', val: '+125%', sub: 'С 8.2 млн до 18.5 млн ₽/мес', color: 'text-emerald-600' },
          { label: 'СКОРОСТЬ ОТКЛИКА', val: '10 СЕК', sub: 'Мгновенный голосовой дозвон по заявке', color: 'text-sky-950' },
          { label: 'НАЗНАЧЕНО ПОКАЗОВ', val: '38 ВСТРЕЧ', sub: 'Целевые выезды брокеров на объекты', color: 'text-emerald-600' },
          { label: 'ОБРАБОТКА БАЗЫ', val: '100%', sub: 'Ни одного упущенного входящего лида', color: 'text-emerald-600' }
        ],
        summaryA: 'Риелторы перезванивали через <strong>2-4 часа</strong> • До <strong>45% клиентов уходили</strong> к конкурентам • Выручка <strong>8.2 млн ₽/мес (4 сделки)</strong>',
        summaryB: 'Мгновенная квалификация голосовым AI • Автозапись на просмотры • <strong>18.5 млн ₽/мес (+10.3 млн ₽, 9 сделок)</strong>',
        liveTag: 'VOICE AI + AMOCRM',
        leftTitle: 'Голосовой AI • Квалификация покупателя квартиры',
        leftBadge: 'VOICE AI 24/7',
        leftHtml: `
          <div class="rounded-2xl border border-emerald-300 overflow-hidden shadow-sm flex flex-col font-sans bg-slate-900 text-white">
            <div class="bg-slate-950 px-3.5 py-2.5 flex items-center justify-between border-b border-white/10">
              <span class="font-bold text-xs tracking-tight text-emerald-400">Голосовой ИИ-продавец «Домиан»</span>
              <span class="text-[9px] font-sans text-slate-400">Дозвон: 8 сек • Диалог 1:30 мин</span>
            </div>
            <div class="p-3.5 space-y-3 text-xs flex-1">
              <div class="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-[10px] font-sans text-emerald-300 font-bold block">ИИ-Продавец:</span>
                <p>«Здравствуйте, Михаил! Вы оставили заявку на подбор 2-комнатной квартиры в центре. У нас есть 4 свежих варианта с ремонтом до 9.5 млн ₽. Скажите, покупку планируете в ипотеку или за наличные?»</p>
              </div>
              <div class="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 space-y-1">
                <span class="text-[10px] font-sans text-slate-300 font-bold block">Клиент:</span>
                <p>«Добрый день! Одобрена семейная ипотека, готовы смотреть квартиры в выходные.»</p>
              </div>
              <div class="p-2.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-[10px] font-sans text-emerald-300 font-bold block">ИИ-Продавец:</span>
                <p>«Отлично! Направил подборку планировок вам в WhatsApp. Удобно будет встретиться с брокером на объекте в субботу в 11:30?»</p>
              </div>
            </div>
          </div>
        `,
        rightTitle: 'amoCRM • Карточка сделки и назначенный показ',
        rightBadge: 'AMOCRM + ТЕЛЕФОНИЯ',
        rightHtml: `
          <div class="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#f5f7f8]">
            <div class="bg-[#1f2937] text-white px-3.5 py-2.5 flex items-center justify-between">
              <span class="font-bold text-xs tracking-tight">amoCRM • Воронка: Подбор квартир</span>
              <span class="text-[9px] font-sans font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">ПОКАЗ НАЗНАЧЕН</span>
            </div>
            <div class="p-3 space-y-2 text-xs">
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div class="flex justify-between font-bold text-slate-950">
                  <span>Михаил // 2-к квартира, Центр</span>
                  <span class="text-emerald-700">Суббота, 11:30</span>
                </div>
                <div class="text-[11px] text-slate-500">Бюджет: до 9.5 млн ₽ • Семейная ипотека • Брокер: Воронов А.</div>
              </div>
              <div class="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                <strong>Результат:</strong> Заявка принята мгновенно, параметры внесены в CRM, подборка отправлена в WhatsApp, встреча в расписании брокера.
              </div>
            </div>
          </div>
        `
      },
      apparel: {
        companyName: 'Бренд обуви TALLORA',
        companyNiche: 'Производство и ритейл женской обуви (размеры 36-43)',
        authorAvatar: 'ЯЯ',
        authorAvatarBg: 'bg-gradient-to-tr from-amber-700 to-stone-900',
        authorName: 'Яна Янакова',
        authorRole: 'Основательница обувного бренда TALLORA (tallora.ru)',
        review: '«В обувном ритейле, особенно в сегменте размеров 41+, главный барьер к покупке - это страх не угадать с размером, полнотой колодки и подъемом. Клиенты пишут в WhatsApp с замерами стопы в сантиметрах, просят живые фото и уточняют наличие в московском шоуруме на Большом Трёхсвятительском. Раньше менеджеры не успевали отвечать всем вовремя, и до 60% бросали диалог. AI Altai Optima подключен к нашей 1С: он мгновенно переводит мерки стопы в точный размер нужной модели, сверяет остатки на складе, предлагает доставку с примеркой или бронь в шоуруме. Выручка выросла с 1.4 до 2.85 млн ₽ в месяц, а возвратов стало в 2 раза меньше!»',
        nicheTag: 'НИША: ПРОИЗВОДСТВО И РИТЕЙЛ ОБУВИ (TALLORA.RU)',
        stackTag: 'ПОДКЛЮЧЕНИЕ: TELEGRAM + WHATSAPP + 1С:УТ',
        title: 'Бренд обуви TALLORA (tallora.ru)',
        subtitle: 'Удвоение онлайн-выручки за счет мгновенного подбора размера обуви по длине стопы, проверки 1С и дожима брошенных корзин',
        revenue: '+1.45 млн ₽',
        revenueNote: 'ОНЛАЙН-ВЫРУЧКА С 1.4 ДО 2.85 МЛН ₽/МЕС (+104%)',
        payback: '1-Й МЕСЯЦ',
        metrics: [
          { label: 'РОСТ ВЫРУЧКИ', val: '+104%', sub: 'С 1.4 млн до 2.85 млн ₽/мес', color: 'text-emerald-600' },
          { label: 'СКОРОСТЬ ОТВЕТА', val: '3 СЕК', sub: 'В WhatsApp и Telegram 24/7', color: 'text-sky-950' },
          { label: 'КОНВЕРСИЯ В ЗАКАЗ', val: '+48%', sub: 'После точного подбора по длине стопы', color: 'text-emerald-600' },
          { label: 'СНИЖЕНИЕ ВОЗВРАТОВ', val: 'в 2 раза', sub: 'Благодаря учету полноты и подъема', color: 'text-emerald-600' }
        ],
        summaryA: 'Клиенты ждали консультации по размерам <strong>до 40 минут</strong> • До <strong>65% брошенных диалогов</strong> • Выручка онлайн-канала <strong>1.4 млн ₽/мес</strong>',
        summaryB: 'Мгновенный подбор размера по стельке в 1С • Резерв в шоуруме и СДЭК • <strong>2.85 млн ₽/мес (+1.45 млн ₽/мес)</strong>',
        liveTag: 'WHATSAPP + 1С:УТ',
        leftTitle: 'WhatsApp • Консультация по размеру стопы и резерв модели',
        leftBadge: 'WHATSAPP E-COMMERCE',
        leftHtml: `
          <div class="rounded-2xl border border-sky-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#efeae2]">
            <div class="bg-[#075e54] text-white px-3.5 py-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs">TAL</div>
                <div class="min-w-0">
                  <div class="font-bold text-white text-xs truncate">TALLORA • Обувной онлайн-консультант</div>
                  <div class="text-[10px] text-white/80">Официальный магазин tallora.ru ✓</div>
                </div>
              </div>
              <span class="text-xs text-white/80">⋮</span>
            </div>
            <div class="p-3.5 space-y-3 flex-1">
              <div class="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs max-w-[90%] text-xs text-slate-800">
                <div>«Здравствуйте! Очень понравились кожаные лоферы на платформе. Длина стопы 27.3 см, обычно беру 42 размер, но нога широкая с высоким подъемом. Подойдут ли они мне и есть ли в наличии?»</div>
                <div class="text-[9px] text-slate-400 text-right mt-1">16:24</div>
              </div>
              <div class="bg-[#d9fdd3] p-3 rounded-2xl rounded-tr-xs shadow-2xs ml-auto max-w-[95%] space-y-1.5 text-xs text-slate-900 border border-emerald-200">
                <div class="flex items-center justify-between text-[10px] font-sans">
                  <span class="font-bold text-emerald-950">AI Стилист TALLORA</span>
                  <span class="text-emerald-800 font-bold">1С Склад: В наличии ✓</span>
                </div>
                <div>«Здравствуйте! На длину стопы 27.3 см и увеличенную полноту у этой модели идеально подойдет <strong>42 размер</strong> - в лоферах предусмотрена мягкая анатомическая стелька и эластичные вставки в подъеме. В наличии на складе и в шоуруме в Москве (Большой Трёхсвятительский пер., 2/1с1). Оформить курьерскую доставку с примеркой или забронировать для примерки в шоуруме?»</div>
                <div class="text-[9px] text-emerald-800 text-right font-bold">16:24 • ✓✓</div>
              </div>
              <div class="bg-white p-2.5 rounded-2xl rounded-tl-xs shadow-2xs max-w-[85%] text-xs text-slate-800">
                <div>«Супер! Оформите, пожалуйста, курьерскую доставку с примеркой на Нагатинскую набережную, 34.»</div>
                <div class="text-[9px] text-slate-400 text-right mt-0.5">16:26</div>
              </div>
            </div>
          </div>
        `,
        rightTitle: '1С:Управление торговлей • Интернет-заказ и резерв обуви',
        rightBadge: '1С:УТ + ОПЛАТА',
        rightHtml: `
          <div class="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#f5f7f8]">
            <div class="bg-[#0284c7] text-white px-3.5 py-2.5 flex items-center justify-between">
              <span class="font-bold text-xs tracking-tight">1С:УТ • Интернет-заказ №4218 (tallora.ru)</span>
              <span class="text-[9px] font-sans font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">РЕЗЕРВ ПОДТВЕРЖДЕН</span>
            </div>
            <div class="p-3 space-y-2 text-xs">
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div class="flex justify-between font-bold text-slate-950">
                  <span>Кожаные лоферы TALLORA (Черный, р. 42)</span>
                  <span class="text-sky-700">14 900 ₽</span>
                </div>
                <div class="text-[11px] text-slate-500">Заказ: tallora.ru • Доставка с примеркой курьером</div>
              </div>
              <div class="p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-sky-900 text-xs">
                <strong>Результат:</strong> Точный подбор размера обуви по стельке за 3 секунды, автоматическое бронирование пары в 1С без риска возврата.
              </div>
            </div>
          </div>
        `
      },
      production: {
        companyName: '«Первая мебельная фабрика» (АО «ПМФ»)',
        companyNiche: 'Производство кухонной и корпусной мебели на заказ (ИНН 7814088915)',
        authorAvatar: 'АШ',
        authorAvatarBg: 'bg-gradient-to-tr from-amber-600 to-orange-700',
        authorName: 'Александр Шестаков',
        authorRole: 'Генеральный директор',
        review: '«При индивидуальном производстве мебели на заказ конверсия напрямую зависит от скорости предварительного расчета сметы и качества квалификации лида. Раньше конструкторский отдел и менеджеры тратили до 2 дней на первичную калькуляцию, теряя до половины входящих заявок. AI Altai Optima считывает параметры проекта, эскизы и размеры в WhatsApp, производит предварительный расчет стоимости и автоматически согласовывает визит дизайнера-замерщика. Объем заключенных договоров вырос с 3.2 до 6.8 млн ₽ в месяц.»',
        nicheTag: 'НИША: ПРОИЗВОДСТВО МЕБЕЛИ НА ЗАКАЗ',
        stackTag: 'ПОДКЛЮЧЕНИЕ: WHATSAPP API + 1С + BITRIX24',
        title: '«Первая мебельная фабрика»',
        subtitle: 'Рост заключенных договоров на 112% благодаря автоматическому расчету сметы в WhatsApp и автозаписи на замер',
        revenue: '+3.6 млн ₽',
        revenueNote: 'ОБЪЕМ ДОГОВОРОВ С 3.2 ДО 6.8 МЛН ₽/МЕС (+112%)',
        payback: '1-Й МЕСЯЦ',
        metrics: [
          { label: 'РОСТ ДОГОВОРОВ', val: '+112%', sub: 'С 3.2 млн до 6.8 млн ₽/мес', color: 'text-emerald-600' },
          { label: 'СКОРОСТЬ РАСЧЕТА', val: '2 МИНУТЫ', sub: 'Вместо 2 дней ручной сметы', color: 'text-sky-950' },
          { label: 'КОНВЕРСИЯ В ЗАМЕР', val: '46%', sub: 'Из входящего диалога с расчетом', color: 'text-emerald-600' },
          { label: 'НАГРУЗКА НА ОП', val: '-55%', sub: 'Дизайнеры выезжают только на готовые замеры', color: 'text-emerald-600' }
        ],
        summaryA: 'Расчет сметы занимал <strong>до 2 дней</strong> • Клиенты заказывали у конкурентов • Объем договоров <strong>3.2 млн ₽/мес</strong>',
        summaryB: 'Автоматический расчет по размерам в WhatsApp • Запись на замер за 2 минуты • <strong>6.8 млн ₽/мес (+3.6 млн ₽/мес)</strong>',
        liveTag: 'WHATSAPP + BITRIX24',
        leftTitle: 'WhatsApp • Расчет кухонного гарнитура и запись на замер',
        leftBadge: 'WHATSAPP 24/7',
        leftHtml: `
          <div class="rounded-2xl border border-amber-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#efeae2]">
            <div class="bg-[#075e54] text-white px-3.5 py-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs">1МФ</div>
                <div class="min-w-0">
                  <div class="font-bold text-white text-xs truncate">Первая мебельная фабрика</div>
                  <div class="text-[10px] text-white/80">Официальный аккаунт ✓</div>
                </div>
              </div>
              <span class="text-xs text-white/80">⋮</span>
            </div>
            <div class="p-3.5 space-y-3 flex-1">
              <div class="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs max-w-[90%] text-xs text-slate-800">
                <div>«Добрый день! Нужна прямая кухня 3.4 м с антресолями под потолок, фасады эмаль матовая, фурнитура Blum. Сколько выйдет по стоимости и когда возможен замер?»</div>
                <div class="text-[9px] text-slate-400 text-right mt-1">13:40</div>
              </div>
              <div class="bg-[#d9fdd3] p-3 rounded-2xl rounded-tr-xs shadow-2xs ml-auto max-w-[95%] space-y-1.5 text-xs text-slate-900 border border-emerald-200">
                <div class="flex items-center justify-between text-[10px] font-sans">
                  <span class="font-bold text-emerald-950">ИИ-Продавец «1МФ»</span>
                  <span class="text-emerald-800 font-bold">Расчет выполнен ✓</span>
                </div>
                <div>«Добрый день! По вашей конфигурации с фасадами эмаль и фурнитурой Blum ориентировочный диапазон стоимости: <strong>265 000 - 295 000 ₽</strong>. Точный 3D-проект составим на замере с образцами материалов. Можем направить дизайнера-замерщика на <strong>завтра в 15:00</strong> или <strong>в 19:00</strong>. Какое время удобнее?»</div>
                <div class="text-[9px] text-emerald-800 text-right font-bold">13:41 • ✓✓</div>
              </div>
              <div class="bg-white p-2.5 rounded-2xl rounded-tl-xs shadow-2xs max-w-[85%] text-xs text-slate-800">
                <div>«Отлично, давайте на завтра в 19:00. Адрес: Московский пр., 183.»</div>
                <div class="text-[9px] text-slate-400 text-right mt-0.5">13:44</div>
              </div>
            </div>
          </div>
        `,
        rightTitle: 'Bitrix24 • Замер назначен в календаре',
        rightBadge: 'BITRIX24 + 1С',
        rightHtml: `
          <div class="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#f5f7f8]">
            <div class="bg-[#0f62fe] text-white px-3.5 py-2.5 flex items-center justify-between">
              <span class="font-bold text-xs tracking-tight">Bitrix24 • Сделка: Кухня 3.4м (Московский пр., 183)</span>
              <span class="text-[9px] font-sans font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">ВЫЕЗД НАЗНАЧЕН</span>
            </div>
            <div class="p-3 space-y-2 text-xs">
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div class="flex justify-between font-bold text-slate-950">
                  <span>Кухня эмаль 3.4м // Антресоли Blum</span>
                  <span class="text-blue-700">~280 000 ₽</span>
                </div>
                <div class="text-[11px] text-slate-500">Дата замера: Завтра, 19:00 • Замерщик: Николаев В.</div>
              </div>
              <div class="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                <strong>Результат:</strong> Калькуляция за 1 минуту, данные внесены в Bitrix24 и 1С, замерщик назначен автоматически.
              </div>
            </div>
          </div>
        `
      },
      legal: {
        companyName: 'Юридическая фирма «Лекс Консалтинг» (ООО «ЮФ «Лекс Консалтинг»)',
        companyNiche: 'Корпоративное право, арбитраж и налоговый консалтинг (ИНН 7701984252)',
        authorAvatar: 'АК',
        authorAvatarBg: 'bg-gradient-to-tr from-purple-600 to-indigo-700',
        authorName: 'Артем Ковалев',
        authorRole: 'Управляющий партнер',
        review: '«В юридическом консалтинге время партнеров - самый дорогой актив компании. Раньше до 40% консультаций тратилось на неквалифицированные лиды с чеками ниже минимального порога практики. AI Altai Optima проводит первичный скрининг входящих запросов в Telegram и на сайте, собирает вводные данные по спору или сделке и назначает онлайн-встречи только с лицами, принимающими решения в компаниях целевого сегмента. Это увеличило портфель контрактов практики с 1.8 до 3.45 млн ₽ в месяц.»',
        nicheTag: 'НИША: ЮРИДИЧЕСКИЙ КОНСАЛТИНГ И АРБИТРАЖ',
        stackTag: 'ПОДКЛЮЧЕНИЕ: TELEGRAM + AMOCRM + CALENDAR',
        title: 'Юридическая фирма «Лекс Консалтинг»',
        subtitle: 'Рост объема закрытых контрактов на 92% за счет автоматической квалификации входящих запросов и назначения встреч',
        revenue: '+1.65 млн ₽',
        revenueNote: 'ОБЪЕМ КОНТРАКТОВ С 1.8 ДО 3.45 МЛН ₽/МЕС (+92%)',
        payback: '3 НЕДЕЛИ',
        metrics: [
          { label: 'РОСТ КОНТРАКТОВ', val: '+92%', sub: 'С 1.8 млн до 3.45 млн ₽/мес', color: 'text-emerald-600' },
          { label: 'ЦЕЛЕВЫЕ ВСТРЕЧИ', val: '91%', sub: 'Только профильные корпоративные споры', color: 'text-sky-950' },
          { label: 'ЭКОНОМИЯ ПАРТНЕРОВ', val: '22 ЧАСА/МЕС', sub: 'Освобождение от нецелевых созвонов', color: 'text-emerald-600' },
          { label: 'СРЕДНИЙ ЧЕК', val: '+55%', sub: 'Фокус на среднем и крупном бизнесе', color: 'text-emerald-600' }
        ],
        summaryA: 'Партнеры тратили время на <strong>нецелевые консультации</strong> • Низкая конверсия в контракт • Выручка <strong>1.8 млн ₽/мес</strong>',
        summaryB: 'Автоматическая квалификация по предмету спора и бюджету • <strong>3.45 млн ₽/мес (+1.65 млн ₽/мес)</strong>',
        liveTag: 'TELEGRAM + CALENDAR + AMOCRM',
        leftTitle: 'Telegram • Первичный скрининг и квалификация спора',
        leftBadge: 'TELEGRAM B2B',
        leftHtml: `
          <div class="rounded-2xl border border-purple-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#f4f1fa]">
            <div class="bg-[#582d8c] text-white px-3.5 py-2.5 flex items-center justify-between">
              <span class="font-bold text-xs tracking-tight">«Лекс Консалтинг» • Правовой ИИ-консультант</span>
              <span class="text-[9px] font-sans text-purple-200">Квалификация ✓</span>
            </div>
            <div class="p-3.5 space-y-3 text-xs flex-1">
              <div class="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs max-w-[90%] text-slate-800">
                <div>«Добрый день! Требуется защита в арбитражном суде по иску поставщика на 14.5 млн ₽ (непоставка оборудования). Ведете такие споры в Москве?»</div>
                <div class="text-[9px] text-slate-400 text-right mt-1">15:10</div>
              </div>
              <div class="bg-[#ede7f6] p-3 rounded-2xl rounded-tr-xs shadow-2xs ml-auto max-w-[95%] space-y-1.5 text-slate-900 border border-purple-200">
                <div class="flex items-center justify-between text-[10px] font-sans">
                  <span class="font-bold text-purple-950">ИИ-Продавец «Лекс Консалтинг»</span>
                  <span class="text-purple-700 font-bold">Профиль подтвержден ✓</span>
                </div>
                <div>«Добрый день! Да, арбитражная практика коллегии ведет споры по договорам поставки свыше 5 млн ₽. Можем организовать 30-минутную онлайн-консультацию со старшим партнером на <strong>завтра в 16:00</strong>. Забронировать это время?»</div>
                <div class="text-[9px] text-purple-700 text-right font-bold">15:11 • ✓✓</div>
              </div>
            </div>
          </div>
        `,
        rightTitle: 'amoCRM + Google Calendar • Консультация согласована',
        rightBadge: 'AMOCRM + CALENDAR',
        rightHtml: `
          <div class="rounded-2xl border border-slate-300 overflow-hidden shadow-sm flex flex-col font-sans bg-[#f5f7f8]">
            <div class="bg-[#6a1b9a] text-white px-3.5 py-2.5 flex items-center justify-between">
              <span class="font-bold text-xs tracking-tight">amoCRM • Сделка: Арбитражный спор 14.5M ₽</span>
              <span class="text-[9px] font-sans font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">КОНСУЛЬТАЦИЯ В КАЛЕНДАРЕ</span>
            </div>
            <div class="p-3 space-y-2 text-xs">
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div class="flex justify-between font-bold text-slate-950">
                  <span>Иск по поставке (14.5 млн ₽)</span>
                  <span class="text-purple-700">Завтра, 16:00</span>
                </div>
                <div class="text-[11px] text-slate-500">Клиент: Генеральный директор • Ссылка на Zoom отправлена в Telegram</div>
              </div>
              <div class="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 text-xs">
                <strong>Результат:</strong> Запрос автоматически квалифицирован по критериям компании и встреча добавлена в расписание эксперта.
              </div>
            </div>
          </div>
        `
      }
    };

    function openCaseModal(key) {
      stopWhatsAppVoiceAudio();
      stopCasesCarouselAutoPlay();
      currentModalCase = key || 'realestate';
      const data = casesData[currentModalCase];
      if (!data) return;

      const modal = document.getElementById('caseDetailModal');
      if (!modal) return;

      // Обновляем кнопки вкладок внутри модалки
      document.querySelectorAll('.modal-tab-btn').forEach(b => {
        b.className = 'modal-tab-btn py-2 px-3.5 rounded-xl font-bold text-xs transition cursor-pointer text-slate-600 hover:text-slate-950 hover:bg-slate-100';
      });
      const activeBtn = document.querySelector(`.modal-tab-btn[data-case="${currentModalCase}"]`);
      if (activeBtn) {
        activeBtn.className = 'modal-tab-btn active py-2 px-3.5 rounded-xl font-bold text-xs transition cursor-pointer bg-slate-950 text-white shadow-xs';
      }

      renderModalCaseContent(currentModalCase);

      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      document.body.classList.add('overflow-hidden');
    }

    function closeCaseModal() {
      stopWhatsAppVoiceAudio();
      startCasesCarouselAutoPlay();
      const modal = document.getElementById('caseDetailModal');
      if (!modal) return;
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      document.body.classList.remove('overflow-hidden');
    }

    function switchCaseInModal(key, btn) {
      stopWhatsAppVoiceAudio();
      currentModalCase = key;
      document.querySelectorAll('.modal-tab-btn').forEach(b => {
        b.className = 'modal-tab-btn py-2 px-3.5 rounded-xl font-bold text-xs transition cursor-pointer text-slate-600 hover:text-slate-950 hover:bg-slate-100';
      });
      if (btn) {
        btn.className = 'modal-tab-btn active py-2 px-3.5 rounded-xl font-bold text-xs transition cursor-pointer bg-slate-950 text-white shadow-xs';
      }
      renderModalCaseContent(key);
    }

    function renderModalCaseContent(key) {
      const data = casesData[key];
      if (!data) return;

      const container = document.getElementById('modalCaseContent');
      if (!container) return;

      container.innerHTML = `
        <!-- ЛЕВАЯ КОЛОНКА (5 КОЛОНОК): БИЗНЕС-КОНТЕКСТ И РЕЗУЛЬТАТЫ -->
        <div class="lg:col-span-5 space-y-5 text-left flex flex-col justify-between">
          
          <!-- Шапка кейса -->
          <div class="space-y-2">
            <h3 class="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug font-inter">
              ${data.companyName}
            </h3>
            
            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-inter">
              ${data.subtitle}
            </p>
          </div>

          <!-- Главный финансовый результат -->
          <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-teal-50/50 border border-emerald-200/90 space-y-2">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">РЕЗУЛЬТАТ ЗА 1-Й МЕСЯЦ</span>
              <span class="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-bold text-emerald-800 bg-white/90 px-2.5 py-1 rounded-xl border border-emerald-300 shadow-2xs shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>ОКУПАЕМОСТЬ: ${data.payback || '1-Й МЕСЯЦ'}</span>
              </span>
            </div>
            <div class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 tracking-tight font-inter">
              ${data.revenue}
            </div>
            <div class="text-[11px] sm:text-xs text-slate-600 font-medium font-inter">
              ${data.revenueNote}
            </div>
          </div>

          <!-- МЕТРИКИ КЕЙСА -->
          <div class="grid grid-cols-2 gap-2">
            ${data.metrics ? data.metrics.map(m => `
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span class="text-[9px] font-sans text-slate-500 font-bold block uppercase">${m.label}</span>
                <div class="text-base sm:text-lg font-extrabold ${m.color || 'text-slate-950'} font-inter">${m.val}</div>
                <span class="text-[10px] text-slate-600 leading-tight block">${m.sub}</span>
              </div>
            `).join('') : ''}
          </div>

          <!-- БЫЛО / СТАЛО -->
          <div class="space-y-2 pt-0.5">
            <div class="p-3 rounded-xl bg-rose-50/60 text-xs text-slate-800 leading-snug flex items-start gap-2.5">
              <span class="text-rose-600 font-bold shrink-0">✕</span>
              <div><strong class="text-rose-900 font-bold">Было:</strong> ${data.summaryA}</div>
            </div>
            <div class="p-3 rounded-xl bg-emerald-50/60 text-xs text-slate-900 leading-snug flex items-start gap-2.5">
              <span class="text-emerald-600 font-bold shrink-0">✓</span>
              <div><strong class="text-emerald-900 font-bold">Стало:</strong> ${data.summaryB}</div>
            </div>
          </div>

          <!-- ОТЗЫВ РУКОВОДИТЕЛЯ БИЗНЕСА -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 font-inter">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-full ${data.authorAvatarBg || 'bg-sky-600'} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 font-sans">
                  ${data.authorAvatar || 'РК'}
                </div>
                <div class="min-w-0">
                  <div class="font-bold text-slate-950 text-xs truncate font-inter">${data.authorName}</div>
                  <div class="text-[10px] text-sky-800 font-medium truncate font-inter">${data.authorRole}</div>
                </div>
              </div>
              <div class="flex items-center gap-0.5 text-amber-400 text-xs select-none shrink-0">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <blockquote class="text-xs text-slate-700 leading-relaxed italic border-l-2 border-sky-300 pl-3 py-0.5 font-normal">
              ${data.review}
            </blockquote>
          </div>

        </div>

        <!-- ПРАВАЯ КОЛОНКА (7 КОЛОНОК): ИНТЕРАКТИВНЫЙ СЦЕНАРИЙ СВЯЗЬ + CRM -->
        <div class="lg:col-span-7 bg-slate-50/70 rounded-3xl p-4 sm:p-6 space-y-4 border border-slate-200/80 text-slate-900">
          
          <!-- Заголовок интерактивного блока -->
          <div class="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span class="text-xs font-sans font-bold uppercase tracking-wider text-slate-950">
                ДЕМОНСТРАЦИЯ СЦЕНАРИЯ
              </span>
            </div>
            <span class="text-[10px] font-sans text-slate-600 font-semibold">
              ${data.liveTag}
            </span>
          </div>

          <!-- Двухоконный интерфейс: Связь + CRM -->
          <div class="space-y-4">
            <div>${data.leftHtml}</div>
            <div>${data.rightHtml}</div>
          </div>

        </div>

        <!-- КНОПКА ПЕРЕХОДА К КАЛЬКУЛЯТОРУ В САМОМ НИЗУ МОДАЛЬНОГО ОКНА НА ВСЮ ШИРИНУ -->
        <div class="col-span-1 lg:col-span-12 pt-1 sm:pt-2">
          <a href="#calculator" onclick="closeCaseModal()" class="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-xs sm:text-sm font-inter tracking-wide uppercase shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-center">
            <span>Рассчитать окупаемость для моей компании</span>
          </a>
        </div>
      `;
    }

    // Слушатель клавиши Esc для закрытия модального окна
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeCaseModal();
      }
    });

    // ИНТЕРАКТИВНАЯ АНИМИРОВАННАЯ КАРУСЕЛЬ КЕЙСОВ С АВТОПЛЕЕМ И СВАЙПОМ
    let currentCaseSlideIdx = 0;
    const totalCaseSlidesCount = 4;
    let casesCarouselTimer = null;
    let casesTouchStartX = 0;
    let casesTouchEndX = 0;

    function goToCaseSlide(idx, resetTimer = true) {
      currentCaseSlideIdx = (idx + totalCaseSlidesCount) % totalCaseSlidesCount;
      const track = document.getElementById('casesSliderTrack');
      if (track) {
        track.style.transform = `translateX(-${currentCaseSlideIdx * 100}%)`;
      }
      updateCasesCarouselUI();
      if (resetTimer) {
        restartCasesCarouselAutoPlay();
      }
    }

    function nextCaseSlide() {
      goToCaseSlide(currentCaseSlideIdx + 1);
    }

    function prevCaseSlide() {
      goToCaseSlide(currentCaseSlideIdx - 1);
    }

    function updateCasesCarouselUI() {
      // 1. Вкладки наверху
      const tabs = document.querySelectorAll('.case-tab-btn');
      tabs.forEach((tab, i) => {
        if (i === currentCaseSlideIdx) {
          tab.className = 'case-tab-btn px-3 sm:px-4 py-2 rounded-xl font-bold bg-sky-600 text-white shadow-md border border-sky-600 shrink-0';
        } else {
          tab.className = 'case-tab-btn px-3 sm:px-4 py-2 rounded-xl font-semibold bg-white/85 hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-sky-100/90 shadow-2xs shrink-0';
        }
      });

      // 2. Точки индикаторы
      const dots = document.querySelectorAll('.case-dot-btn');
      dots.forEach((dot, i) => {
        if (i === currentCaseSlideIdx) {
          dot.className = 'case-dot-btn w-8 bg-sky-600';
        } else {
          dot.className = 'case-dot-btn w-2.5 bg-slate-300 hover:bg-sky-300';
        }
      });

      // 3. Текстовый счетчик
      const counter = document.getElementById('caseCounterDisplay');
      if (counter) {
        counter.textContent = `0${currentCaseSlideIdx + 1} / 0${totalCaseSlidesCount}`;
      }
    }

    function startCasesCarouselAutoPlay() {
      stopCasesCarouselAutoPlay();
      casesCarouselTimer = setInterval(() => {
        nextCaseSlide();
      }, 5000);
    }

    function stopCasesCarouselAutoPlay() {
      if (casesCarouselTimer) {
        clearInterval(casesCarouselTimer);
        casesCarouselTimer = null;
      }
    }

    function restartCasesCarouselAutoPlay() {
      stopCasesCarouselAutoPlay();
      startCasesCarouselAutoPlay();
    }

    function initCasesCarousel() {
      const wrapper = document.getElementById('casesCarouselWrapper');
      if (!wrapper) return;

      wrapper.addEventListener('mouseenter', stopCasesCarouselAutoPlay);
      wrapper.addEventListener('mouseleave', startCasesCarouselAutoPlay);

      wrapper.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          casesTouchStartX = e.changedTouches[0].screenX;
        }
        stopCasesCarouselAutoPlay();
      }, { passive: true });

      wrapper.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          casesTouchEndX = e.changedTouches[0].screenX;
          const diff = casesTouchStartX - casesTouchEndX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) {
              nextCaseSlide();
            } else {
              prevCaseSlide();
            }
          }
        }
        startCasesCarouselAutoPlay();
      }, { passive: true });

      startCasesCarouselAutoPlay();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCasesCarousel);
    } else {
      initCasesCarousel();
    }



    function handlePilotFormSubmit(e) {
      e.preventDefault();
      const contact = document.getElementById('pilotInputContact');
      if (!contact || !contact.value.trim()) return;
      const success = document.getElementById('pilotFormSuccess');
      const submitBtn = document.getElementById('pilotFormSubmitBtn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Заявка отправляется...</span>';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        if (submitBtn) submitBtn.style.display = 'none';
        if (success) success.classList.remove('hidden');
        setTimeout(() => {
          if (success) success.classList.add('hidden');
          if (submitBtn) {
            submitBtn.style.display = 'flex';
            submitBtn.innerHTML = '<span class="font-bold tracking-wide">ОБСУДИТЬ ДЕТАЛИ ПРОЕКТА</span>';
            submitBtn.disabled = false;
          }
          e.target.reset();
        }, 4000);
      }, 500);
    }



    // ИНТЕРАКТИВНОЕ ВОСПРОИЗВЕДЕНИЕ ГОЛОСОВОГО СООБЩЕНИЯ С ЖИВЫМ ЗВУКОМ И АНИМАЦИЕЙ
    let isWaVoicePlaying = false;
    let waVoiceTimerInterval = null;
    let waVoiceSeconds = 0;
    const WA_VOICE_TOTAL_SEC = 14; // Длительность демонстрационной реплики

    function toggleWhatsAppVoiceAudio(event) {
      if (event) event.stopPropagation();
      if (isWaVoicePlaying) {
        stopWhatsAppVoiceAudio();
      } else {
        playWhatsAppVoiceAudio();
      }
    }

    function playWhatsAppVoiceAudio() {
      isWaVoicePlaying = true;
      const box = document.getElementById('waAudioPlayerBox');
      const icon = document.getElementById('waVoicePlayIcon');
      const timer = document.getElementById('waVoiceTimer');
      const status = document.getElementById('waVoiceStatus');

      if (box) box.classList.add('voice-playing', 'bg-emerald-50/90', 'border-emerald-300', 'ring-2', 'ring-emerald-400/30');
      if (icon) icon.textContent = '⏸';
      if (status) {
        status.textContent = 'Воспроизведение...';
        status.className = 'text-[8px] font-sans text-emerald-600 font-bold block leading-none animate-pulse';
      }

      // Таймер прогресса визуальной анимации
      waVoiceSeconds = 0;
      if (waVoiceTimerInterval) clearInterval(waVoiceTimerInterval);
      waVoiceTimerInterval = setInterval(() => {
        waVoiceSeconds++;
        const mins = String(Math.floor(waVoiceSeconds / 60)).padStart(2, '0');
        const secs = String(waVoiceSeconds % 60).padStart(2, '0');
        if (timer) timer.textContent = `${mins}:${secs}`;

        if (waVoiceSeconds >= WA_VOICE_TOTAL_SEC) {
          stopWhatsAppVoiceAudio();
        }
      }, 1000);
    }

    function stopWhatsAppVoiceAudio() {
      isWaVoicePlaying = false;
      if (waVoiceTimerInterval) {
        clearInterval(waVoiceTimerInterval);
        waVoiceTimerInterval = null;
      }
      const box = document.getElementById('waAudioPlayerBox');
      const icon = document.getElementById('waVoicePlayIcon');
      const timer = document.getElementById('waVoiceTimer');
      const status = document.getElementById('waVoiceStatus');

      if (box) box.classList.remove('voice-playing', 'bg-emerald-50/90', 'border-emerald-300', 'ring-2', 'ring-emerald-400/30');
      if (icon) icon.textContent = '▶';
      if (timer) timer.textContent = '01:24';
      if (status) {
        status.textContent = 'Слушать';
        status.className = 'text-[8px] font-sans text-emerald-700 font-semibold block leading-none';
      }
    }



    // ПЛАВАЮЩЕЕ МЕНЮ И СКРОЛЛ НАВЕРХ
    function handleStickyNavScroll() {
      const nav = document.getElementById('stickyNavDock');
      if (!nav) return;
      if (window.scrollY > 25) {
        nav.classList.remove('opacity-0', '-translate-y-6', 'pointer-events-none');
        nav.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      } else {
        nav.classList.add('opacity-0', '-translate-y-6', 'pointer-events-none');
        nav.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        const mob = document.getElementById('stickyMobileMenu');
        if (mob && !mob.classList.contains('hidden')) {
          mob.classList.add('hidden');
        }
      }
    }
    window.addEventListener('scroll', handleStickyNavScroll, { passive: true });

    function toggleMobileStickyMenu() {
      const mob = document.getElementById('stickyMobileMenu');
      if (mob) mob.classList.toggle('hidden');
    }

    // УНИВЕРСАЛЬНАЯ АВТОМАТИЧЕСКАЯ ПОДСВЕТКА КАРТОЧЕК ПРИ СКРОЛЛЕ (МОБИЛКА И ДЕСКТОП)
    function initMobileScrollCardHighlight() {
      // Селекторы групп карточек, сменяющих активность при скролле (leak-card обрабатывается отдельно в updateScrollProblemTitle)
      const cardGroupSelectors = [
        '.bento-glass-sapphire, .bento-glass-emerald, .bento-glass-azure, .bento-glass-crystal',
        '#constructor .cfg-card, #constructor .cfg-summary',
        '#cases [onclick^="openCaseModal"]',
        '.persona-selector-card'
      ];

      let isTicking = false;

      function updateCardHighlights() {
        const isDesktop = window.innerWidth >= 1024;
        const viewportCenter = window.innerHeight * 0.5;

        cardGroupSelectors.forEach(sel => {
          const cards = document.querySelectorAll(sel);
          if (!cards.length) return;

          if (isDesktop) {
            // На десктопе: карточки становятся активными в удобной для чтения зоне экрана (22%-78%)
            cards.forEach(card => {
              const rect = card.getBoundingClientRect();
              const inZone = rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.22;
              if (inZone) {
                card.classList.add('is-scroll-active');
              } else {
                card.classList.remove('is-scroll-active');
              }
            });
          } else {
            // На мобилке: последовательная поштучная подсветка центральной карточки
            let closestCard = null;
            let minDistance = Infinity;

            cards.forEach(card => {
              const rect = card.getBoundingClientRect();
              const cardCenter = rect.top + rect.height / 2;
              const distance = Math.abs(viewportCenter - cardCenter);

              if (rect.bottom > 60 && rect.top < window.innerHeight - 60) {
                if (distance < minDistance) {
                  minDistance = distance;
                  closestCard = card;
                }
              }
            });

            cards.forEach(card => {
              if (card === closestCard && minDistance < window.innerHeight * 0.44) {
                card.classList.add('is-scroll-active');
              } else {
                card.classList.remove('is-scroll-active');
              }
            });
          }
        });
      }

      function onScroll() {
        if (!isTicking) {
          requestAnimationFrame(() => {
            updateCardHighlights();
            updateScrollProblemTitle();
            isTicking = false;
          });
          isTicking = true;
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      updateCardHighlights();
      updateScrollProblemTitle();
    }

    let smoothedProblemProgress = 0;
    let targetProblemProgress = 0;
    let problemAnimFrame = null;

    // Плавная математическая интерполяция S-curve (SmoothStep) для деликатного заполнения
    function smoothStep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    function renderProblemAnimation(progress) {
      const line1 = document.getElementById('scrollLine1');
      const line2 = document.getElementById('scrollLine2');
      const line3 = document.getElementById('scrollLine3');
      const m1El = document.getElementById('leakMetric1');
      const m2El = document.getElementById('leakMetric2');
      const m3El = document.getElementById('leakMetric3');

      const card1 = m1El ? m1El.closest('.leak-card') : null;
      const card2 = m2El ? m2El.closest('.leak-card') : null;
      const card3 = m3El ? m3El.closest('.leak-card') : null;

      // 1. Деликатное и непрерывное заполнение строк заголовка слева направо
      const p1 = smoothStep(0.02, 0.40, progress);
      const p2 = smoothStep(0.16, 0.56, progress);
      const p3 = smoothStep(0.30, 0.72, progress);

      if (line1) line1.style.setProperty('--line-p', `${(p1 * 100).toFixed(2)}%`);
      if (line2) line2.style.setProperty('--line-p', `${(p2 * 100).toFixed(2)}%`);
      if (line3) line3.style.setProperty('--line-p', `${(p3 * 100).toFixed(2)}%`);

      if (window.innerWidth >= 1024) {
        // НА ДЕСКТОПЕ: мягкая последовательная активация карточек слева направо
        const isTitleComplete = line3 ? (p3 >= 0.70) : (p2 >= 0.60);
        if (!isTitleComplete) {
          if (m1El) m1El.style.setProperty('--leak-p', '0%');
          if (m2El) m2El.style.setProperty('--leak-p', '0%');
          if (m3El) m3El.style.setProperty('--leak-p', '0%');
          if (card1) card1.classList.remove('leak-card-active');
          if (card2) card2.classList.remove('leak-card-active');
          if (card3) card3.classList.remove('leak-card-active');
          return;
        }

        // Карточки утечек: мягкий каскад
        const m1 = smoothStep(0.52, 0.70, progress);
        const m2 = smoothStep(0.62, 0.80, progress);
        const m3 = smoothStep(0.72, 0.90, progress);

        if (m1El) m1El.style.setProperty('--leak-p', `${(m1 * 100).toFixed(2)}%`);
        if (m2El) m2El.style.setProperty('--leak-p', `${(m2 * 100).toFixed(2)}%`);
        if (m3El) m3El.style.setProperty('--leak-p', `${(m3 * 100).toFixed(2)}%`);

        if (card1) {
          if (m1 > 0.12) card1.classList.add('leak-card-active');
          else card1.classList.remove('leak-card-active');
        }
        if (card2) {
          if (m2 > 0.12) card2.classList.add('leak-card-active');
          else card2.classList.remove('leak-card-active');
        }
        if (card3) {
          if (m3 > 0.12) card3.classList.add('leak-card-active');
          else card3.classList.remove('leak-card-active');
        }
      } else {
        // НА МОБИЛЬНОМ: плавное окрашивание карточек по положению в экране
        const winH = window.innerHeight || document.documentElement.clientHeight;
        [
          { el: m1El, card: card1 },
          { el: m2El, card: card2 },
          { el: m3El, card: card3 }
        ].forEach(item => {
          if (!item.el || !item.card) return;
          const r = item.card.getBoundingClientRect();
          // При входе карточки снизу (0.15*winH) и движении к центру (0.65*winH)
          // цифры плавно окрашиваются слева направо (0% -> 100%)
          const cp = smoothStep(winH * 0.15, winH * 0.65, winH - r.top);
          item.el.style.setProperty('--leak-p', `${(cp * 100).toFixed(2)}%`);
          if (cp > 0.20) {
            item.card.classList.add('leak-card-active');
          } else {
            item.card.classList.remove('leak-card-active');
          }
        });
      }
    }

    function animateProblemLoop() {
      // Шелковистая физическая интерполяция (0.085 lerp) для абсолютной плавности
      const diff = targetProblemProgress - smoothedProblemProgress;
      if (Math.abs(diff) > 0.0003) {
        smoothedProblemProgress += diff * 0.085;
        renderProblemAnimation(smoothedProblemProgress);
        problemAnimFrame = requestAnimationFrame(animateProblemLoop);
      } else {
        smoothedProblemProgress = targetProblemProgress;
        renderProblemAnimation(smoothedProblemProgress);
        problemAnimFrame = null;
      }
    }

    function updateScrollProblemTitle() {
      const el = document.getElementById('scrollProblemTitle');
      if (!el) return;
      const section = el.closest('section') || el;
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      
      const start = winH * 0.88;
      const end = (window.innerWidth >= 1024) ? -rect.height * 0.20 : -rect.height * 0.15;
      const rawProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      
      targetProblemProgress = rawProgress;

      if (!problemAnimFrame) {
        problemAnimFrame = requestAnimationFrame(animateProblemLoop);
      }
    }

    function initSolutionsSequence() {
      const section = document.getElementById('solutions');
      const orb = document.getElementById('bentoKineticOrb');
      const launchSlot = document.getElementById('orbLaunchSlot');
      const cards = [
        document.getElementById('bentoCard1'),
        document.getElementById('bentoCard4'),
        document.getElementById('bentoCard2')
      ].filter(Boolean);

      const cardThemes = ['theme-sapphire', 'theme-crystal', 'theme-emerald'];

      if (!section || !orb || !cards.length) return;

      let step = 0; // 0 = launch slot, 1..3 = cards 1..3
      let isHovered = false;
      let isVisible = false;

      function getRelativePos(targetEl, offsetX = 0, offsetY = 0) {
        if (!targetEl) return { x: 0, y: 0 };
        const sRect = section.getBoundingClientRect();
        const tRect = targetEl.getBoundingClientRect();
        return {
          x: (tRect.left - sRect.left) + (tRect.width / 2) - 14 + offsetX,
          y: (tRect.top - sRect.top) + (tRect.height / 2) - 14 + offsetY
        };
      }

      function applyOrbTheme(themeClass) {
        ['theme-sapphire', 'theme-emerald', 'theme-amber', 'theme-crystal', 'theme-azure'].forEach(t => orb.classList.remove(t));
        if (themeClass) orb.classList.add(themeClass);
      }

      function moveOrbTo(pos, durationMs = 850) {
        orb.style.transition = `transform ${durationMs}ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.3s ease`;
        orb.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
        orb.style.opacity = '1';
      }

      function updateActiveCard(activeIdx) {
        cards.forEach((c, i) => {
          if (i === activeIdx) {
            c.classList.add('is-scroll-active');
          } else {
            c.classList.remove('is-scroll-active');
          }
        });
      }

      function tick() {
        if (!isVisible || isHovered) return;

        if (step === 0) {
          // Шарик в стартовой позиции («ВОЗМОЖНОСТИ ПЛАТФОРМЫ»)
          updateActiveCard(-1);
          applyOrbTheme('theme-sapphire');
          if (launchSlot) {
            const pos = getRelativePos(launchSlot);
            moveOrbTo(pos, 600);
          }
          step = 1;
        } else if (step >= 1 && step <= cards.length) {
          const cardIdx = step - 1;
          const targetCard = cards[cardIdx];
          if (targetCard) {
            // Переключаем цвет шарика под цвет карточки
            applyOrbTheme(cardThemes[cardIdx] || 'theme-sapphire');
            
            // Шарик приземляется на верхний правый угол карточки
            const offsetX = (targetCard.offsetWidth * 0.38) - 15;
            const offsetY = -(targetCard.offsetHeight * 0.32) + 15;
            const pos = getRelativePos(targetCard, offsetX, offsetY);
            
            moveOrbTo(pos, 850);
            updateActiveCard(cardIdx);
          }
          step = (step >= cards.length) ? 0 : step + 1;
        }
      }

      // При наведении мыши шарик прыгает на карточку и подсвечивает её
      cards.forEach((card, idx) => {
        card.addEventListener('mouseenter', () => {
          isHovered = true;
          applyOrbTheme(cardThemes[idx] || 'theme-sapphire');
          updateActiveCard(idx);
          const offsetX = (card.offsetWidth * 0.38) - 15;
          const offsetY = -(card.offsetHeight * 0.32) + 15;
          const pos = getRelativePos(card, offsetX, offsetY);
          moveOrbTo(pos, 500);
        });
        card.addEventListener('mouseleave', () => {
          isHovered = false;
        });
      });

      if ('IntersectionObserver' in window && section) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && step === 0) {
              tick();
            }
          });
        }, { threshold: 0.12 });
        observer.observe(section);
      } else {
        isVisible = true;
      }

      // Неспешный, плавный цикл анимации (каждые 2.4 секунды)
      setInterval(tick, 2400);
      setTimeout(tick, 700);
    }

    
    // 1. «САЙТ ЗНАЕТ, КОТОРЫЙ ЧАС»: ДИНАМИЧЕСКАЯ СТРОКА ВРЕМЕНИ
    function initHeroDynamicTime() {
      const textEl = document.getElementById('heroLiveTimeText');
      if (!textEl) return;

      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${String(hours).padStart(2, '0')}:${minutes}`;
      const day = now.getDay(); // 0 = вс, 6 = сб
      const isWeekend = (day === 0 || day === 6);
      const dayName = isWeekend ? (day === 6 ? 'Суббота' : 'Воскресенье') : '';

      let message = '';
      if (hours >= 23 || hours < 7) {
        message = `Сейчас ${timeStr}. Ваши менеджеры спят. Он на смене.`;
      } else if (isWeekend) {
        message = `${dayName}, ${timeStr}. У отдела продаж выходной, у него — самые горячие часы.`;
      } else if (hours < 10) {
        message = `Сейчас ${timeStr}. Отдел продаж ещё в пути, а он уже ответил первым клиентам.`;
      } else if (hours < 19) {
        message = `Сейчас ${timeStr}. Пока менеджер на звонке, он уже ответил пятерым.`;
      } else {
        message = `Сейчас ${timeStr}. Рабочий день закончился, а клиенты продолжают писать. Он на связи.`;
      }

      textEl.innerHTML = message;
    }

    // 2. ОЖИВАЮЩИЕ УВЕДОМЛЕНИЯ В HERO: МИНИ-ИСТОРИЯ «ДО → ПОСЛЕ»
    function initLivingNotificationsStory() {
      // Статичные чистые уведомления без симуляции ответов ИИ
    }

    // 3. ИНТЕРАКТИВНАЯ ПАСХАЛКА «БРАТ»
    function initBrotherEasterEgg() {
      const slot = document.getElementById('orbLaunchSlot');
      const bubble = document.getElementById('brotherSpeechBubble');
      if (!slot || !bubble) return;

      let timer = null;
      function toggleBubble(e) {
        if (e) e.stopPropagation();
        clearTimeout(timer);
        bubble.classList.toggle('show');
        if (bubble.classList.contains('show')) {
          timer = setTimeout(() => {
            bubble.classList.remove('show');
          }, 4500);
        }
      }

      slot.addEventListener('click', toggleBubble);
      slot.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        bubble.classList.add('show');
      });
      slot.addEventListener('mouseleave', () => {
        timer = setTimeout(() => {
          bubble.classList.remove('show');
        }, 2000);
      });
    }

    // 4. МЕХАНИКА СОБЕСЕДОВАНИЯ И ПЕРЕКЛЮЧЕНИЯ ПЕРСОН
    let currentPersonaKey = 'stanislav';

    window.interviewCurrentPersona = function() {
      window.interviewPersona(currentPersonaKey);
    };

    window.interviewPersona = function(key) {
      if (!key) key = 'stanislav';
      currentPersonaKey = key;
      const data = personasData[key];
      if (!data) return;

      const scenariosSec = document.getElementById('scenarios');
      if (scenariosSec) {
        scenariosSec.scrollIntoView({ behavior: 'smooth' });
      }

      const header = document.getElementById('chatHeader');
      if (header) {
        header.innerHTML = `
          <div class="flex items-center gap-2.5">
            <div class="relative w-9 h-9 rounded-full overflow-hidden border border-white/30 shrink-0">
              <img src="${data.photo}" alt="${data.name}" class="w-full h-full object-cover">
            </div>
            <div class="leading-tight">
              <div class="font-bold text-xs sm:text-sm text-white">${data.name}</div>
              <div class="text-[10px] text-white/80 font-mono flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>На собеседовании</span>
              </div>
            </div>
          </div>
          <div class="text-[11px] text-white/80 font-mono">
            Online
          </div>
        `;
      }

      const greetings = {
        stanislav: 'Добрый день! Готов к собеседованию. Спрашивайте о регламентах, сложных сделках и квалификации — покажу, как держу маржинальность в B2B.',
        polina: 'Здравствуйте! Рада познакомиться. Готова ответить на любые вопросы по клиентскому сервису, записи и мягкому дожиму без навязчивости.',
        dmitry: 'Приветствую! Готов продемонстрировать мгновенный подбор товаров, расчёт доставки и закрытие заказов за 40 секунд.',
        yaroslav: 'Добрый день! Готов ответить на любые вопросы по управлению продажами и распределению лидов между брокерами.',
        ekaterina: 'Здравствуйте! Готов провести аудит вашей воронки и показать, где теряются заявки.'
      };

      const greetingText = greetings[key] || `Здравствуйте! Я ${data.name}, готов к собеседованию. Задайте мне любой вопрос!`;

      const box = document.getElementById('messagesContainer');
      if (box) {
        const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const interviewMsg = {
          sender: 'ai',
          author: data.name,
          text: greetingText,
          time: timeStr
        };
        box.innerHTML = '';
        const cfg = channelsConfig[currentKey] || channelsConfig.full_deal;
        box.insertAdjacentHTML('beforeend', cfg.renderAiBubble(interviewMsg));
      }
    };

    document.addEventListener('DOMContentLoaded', () => {
      initHeroDynamicTime();
      initLivingNotificationsStory();
      initBrotherEasterEgg();
      handleStickyNavScroll();
      applyMessengerTheme('full_deal');
      renderFullBranch('full_deal');
      initMobileScrollCardHighlight();
      initSolutionsSequence();
      updateScrollProblemTitle();
      window.addEventListener('scroll', updateScrollProblemTitle, { passive: true });
      window.addEventListener('resize', () => {
        updateCalc();
        updateScrollProblemTitle();
      }, { passive: true });
      initCalc();
      runAmoCardAnimation();

      // ЛЕНИВАЯ ПОДГРУЗКА ВИДЕО ЧТЕНИЯ КНИГИ
      const readingVid = document.getElementById('readingBookVideo');
      if (readingVid) {
        if ('IntersectionObserver' in window) {
          const rVidObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                if (!readingVid.src && readingVid.dataset.src) {
                  readingVid.src = readingVid.dataset.src;
                  readingVid.load();
                }
                readingVid.play().catch(() => {});
              } else {
                if (readingVid.src) {
                  readingVid.pause();
                }
              }
            });
          }, { rootMargin: '350px 0px' });
          rVidObs.observe(readingVid);
        } else {
          readingVid.src = readingVid.dataset.src;
          readingVid.play().catch(() => {});
        }
      }



      // МОБИЛЬНЫЙ СВАЙП И АВТО-СЛАЙД СРАВНИТЕЛЬНОЙ ТАБЛИЦЫ
      window.scrollTableToCol = function(colIndex) {
        const scrollEl = document.getElementById('unitEconTableScroll');
        const tabH = document.getElementById('colTabHuman');
        const tabA = document.getElementById('colTabAI');
        if (!scrollEl) return;
        if (colIndex === 0) {
          scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
          if (tabH && tabA) {
            tabH.className = "text-xs px-3.5 py-1 rounded-full font-bold border border-emerald-400 bg-emerald-100 text-emerald-950 transition-all shadow-xs";
            tabA.className = "text-xs px-3.5 py-1 rounded-full font-semibold border border-slate-300 bg-white text-slate-700 transition-all shadow-2xs flex items-center gap-1";
          }
        } else {
          const target = Math.max(220, scrollEl.scrollWidth - scrollEl.clientWidth);
          scrollEl.scrollTo({ left: target, behavior: 'smooth' });
          if (tabH && tabA) {
            tabA.className = "text-xs px-3.5 py-1 rounded-full font-black border border-emerald-400 bg-emerald-100 text-emerald-950 transition-all shadow-xs flex items-center gap-1";
            tabH.className = "text-xs px-3.5 py-1 rounded-full font-semibold border border-slate-300 bg-white text-slate-700 transition-all shadow-2xs";
          }
        }
      };

      (function initTableMobileSlide() {
        const scrollEl = document.getElementById('unitEconTableScroll');
        if (!scrollEl) return;

        let userTouched = false;
        let animatedOnce = false;

        scrollEl.addEventListener('touchstart', () => { userTouched = true; }, { passive: true });
        scrollEl.addEventListener('mousedown', () => { userTouched = true; });

        scrollEl.addEventListener('scroll', () => {
          const tabH = document.getElementById('colTabHuman');
          const tabA = document.getElementById('colTabAI');
          if (!tabH || !tabA) return;
          if (scrollEl.scrollLeft > 60) {
            tabA.className = "text-xs px-3.5 py-1 rounded-full font-black border border-emerald-400 bg-emerald-100 text-emerald-950 transition-all shadow-xs flex items-center gap-1";
            tabH.className = "text-xs px-3.5 py-1 rounded-full font-semibold border border-slate-300 bg-white text-slate-700 transition-all shadow-2xs";
          } else {
            tabH.className = "text-xs px-3.5 py-1 rounded-full font-bold border border-emerald-400 bg-emerald-100 text-emerald-950 transition-all shadow-xs";
            tabA.className = "text-xs px-3.5 py-1 rounded-full font-semibold border border-slate-300 bg-white text-slate-700 transition-all shadow-2xs flex items-center gap-1";
          }
        }, { passive: true });

        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !animatedOnce && window.innerWidth < 640) {
                animatedOnce = true;
                setTimeout(() => {
                  if (userTouched) return;
                  const target = Math.max(200, scrollEl.scrollWidth - scrollEl.clientWidth);
                  scrollEl.scrollTo({ left: target, behavior: 'smooth' });
                  setTimeout(() => {
                    if (userTouched) return;
                    scrollEl.scrollTo({ left: 0, behavior: 'smooth' });
                  }, 1800);
                }, 700);
              }
            });
          }, { threshold: 0.25 });
          observer.observe(scrollEl);
        }
      })();

      // КОНСТРУКТОР ТАРИФА
      window.toggleCfgDetails = function() {
        const table = document.getElementById('cfgDetailsTable');
        const arrow = document.getElementById('cfgDetailsArrow');
        const btn = document.getElementById('cfgToggleDetailsBtn');
        if (!table) return;
        const isHidden = table.classList.contains('hidden');
        table.classList.toggle('hidden', !isHidden);
        if (arrow) arrow.textContent = isHidden ? '▴' : '▾';
        if (btn) btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      };

      (function initTariffConstructor() {
        // 1. ЕДИНЫЙ ОБЪЕКТ-КОНФИГ ЦЕН, ЛИМИТОВ И ССЫЛОК
        const TARIFF_CONFIG = {
          setupPrice: 29000,
          ctaUrl: 'https://t.me/altaioptima',
          tariffs: [
            {
              id: 'start',
              name: 'Старт',
              maxLimit: 200,
              limitLabel: 'до 200',
              detailsLimit: 'до 200 в месяц',
              monthlyPrice: 25000,
              earlyBirdPrice: 22000,
              presetSliderValue: 150,
              isCustom: false
            },
            {
              id: 'business',
              name: 'Бизнес',
              maxLimit: 600,
              limitLabel: 'до 600',
              detailsLimit: 'до 600 в месяц',
              monthlyPrice: 39000,
              earlyBirdPrice: 33000,
              badge: 'выбирают чаще',
              presetSliderValue: 400,
              isCustom: false
            },
            {
              id: 'stream',
              name: 'Поток',
              maxLimit: 1500,
              limitLabel: 'до 1500',
              detailsLimit: 'до 1500 в месяц',
              monthlyPrice: 59000,
              earlyBirdPrice: 55000,
              presetSliderValue: 1000,
              isCustom: false
            },
            {
              id: 'empire',
              name: 'Империя',
              maxLimit: Infinity,
              limitLabel: 'больше 1500',
              detailsLimit: 'индивидуально',
              monthlyPrice: 99000,
              earlyBirdPrice: 88000,
              presetSliderValue: 2500,
              isCustom: true // приставка "от "
            }
          ]
        };

        // 2. КАНАЛЫ СВЯЗИ (WhatsApp, Telegram, Instagram, MAX, Авито, Email, Чат на сайте)
        const CHANNELS = [
          {
            id: 'wa',
            label: 'WhatsApp',
            color: '#25D366',
            defaultChecked: true
          },
          {
            id: 'tg',
            label: 'Telegram',
            color: '#229ED9',
            defaultChecked: true
          },
          {
            id: 'inst',
            label: 'Instagram',
            gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            defaultChecked: false
          },
          {
            id: 'max',
            label: 'MAX',
            color: '#6366f1',
            defaultChecked: false
          },
          {
            id: 'avito',
            label: 'Авито',
            color: '#000000',
            defaultChecked: false
          },
          {
            id: 'email',
            label: 'Электронная почта',
            color: '#1e3a8a',
            defaultChecked: false
          },
          {
            id: 'site_chat',
            label: 'Чат на сайте',
            color: '#0284c7',
            defaultChecked: false
          }
        ];

        // 3. CRM И УЧЁТНЫЕ СИСТЕМЫ (фирменные цвета без логотипов)
        const CRMS = [
          {
            id: 'table',
            label: 'Таблица (Google / Excel Online)',
            color: '#107C41',
            defaultChecked: true
          },
          {
            id: 'amo',
            label: 'amoCRM',
            color: '#1b74e4',
            defaultChecked: false
          },
          {
            id: 'bitrix',
            label: 'Битрикс24',
            color: '#00aeef',
            defaultChecked: false
          },
          {
            id: '1c',
            label: '1С',
            color: '#e31e24',
            defaultChecked: false
          },
          {
            id: 'moysklad',
            label: 'МойСклад',
            color: '#1885d3',
            defaultChecked: false
          }
        ];

        // Состояние конструктора
        const state = {
          sliderValue: 400,
          billingPeriod: 'monthly', // 'monthly' | 'annual'
          channels: {},
          crms: {}
        };

        // Инициализация чекбоксов
        CHANNELS.forEach(c => { state.channels[c.id] = c.defaultChecked; });
        CRMS.forEach(c => { state.crms[c.id] = c.defaultChecked; });

        // Форматирование чисел с неразрывным пробелом
        const formatPrice = (v) => v.toLocaleString('ru-RU').replace(/\s/g, '\u00A0');

        function getChannelsCountText(n) {
          const mod10 = n % 10;
          const mod100 = n % 100;
          let word = 'каналов';
          let verb = 'подключено';
          if (mod10 === 1 && mod100 !== 11) {
            word = 'канал';
            verb = 'подключен';
          } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
            word = 'канала';
            verb = 'подключено';
          }
          return `${n} ${word} ${verb}`;
        }

        function getCrmCountText(n) {
          const mod10 = n % 10;
          const mod100 = n % 100;
          let word = 'систем';
          if (mod10 === 1 && mod100 !== 11) {
            word = 'система';
          } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
            word = 'системы';
          }
          return `${n} ${word}`;
        }

        function getTariffByVolume(vol) {
          if (vol <= 200) return TARIFF_CONFIG.tariffs[0]; // Старт
          if (vol <= 600) return TARIFF_CONFIG.tariffs[1]; // Бизнес
          if (vol <= 1500) return TARIFF_CONFIG.tariffs[2]; // Поток
          return TARIFF_CONFIG.tariffs[3]; // Империя
        }

        const channelsEl = document.getElementById('channels');
        const crmsEl = document.getElementById('crms');
        const sliderEl = document.getElementById('cfgVolumeSlider');
        const sliderDisplay = document.getElementById('cfgSliderValueDisplay');
        const tariffBadge = document.getElementById('cfgCurrentTariffBadge');
        const tariffsStrip = document.getElementById('cfgTariffsStrip');
        const billingBtns = document.querySelectorAll('.cfg-billing-btn');

        function renderChannelsList() {
          if (!channelsEl) return;
          channelsEl.innerHTML = CHANNELS.map(c => `
            <div class="cfg-row" data-row="${c.id}">
              <div class="flex items-center min-w-0">
                <div>
                  <div class="cfg-row-label text-sm sm:text-[15px] font-bold tracking-tight" style="${c.gradient ? `background: ${c.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;` : `color: ${c.color};`}"><span>${c.label}</span></div>
                  ${c.sub ? `<div class="cfg-row-sub">${c.sub}</div>` : ''}
                </div>
              </div>
              <div class="cfg-row-right">
                <label class="cfg-switch">
                  <input type="checkbox" role="switch" aria-label="${c.label}" aria-checked="${!!state.channels[c.id]}" data-group="channels" data-id="${c.id}" ${state.channels[c.id] ? 'checked' : ''}>
                  <span class="cfg-track"></span>
                </label>
              </div>
            </div>
          `).join('');
        }

        function renderCrmsList() {
          if (!crmsEl) return;
          crmsEl.innerHTML = CRMS.map(c => `
            <div class="cfg-row" data-row="${c.id}">
              <div class="flex items-center min-w-0">
                <div>
                  <div class="cfg-row-label text-sm sm:text-[15px] font-bold tracking-tight" style="color: ${c.color};"><span>${c.label}</span></div>
                </div>
              </div>
              <div class="cfg-row-right">
                <label class="cfg-switch">
                  <input type="checkbox" role="switch" aria-label="${c.label}" aria-checked="${!!state.crms[c.id]}" data-group="crms" data-id="${c.id}" ${state.crms[c.id] ? 'checked' : ''}>
                  <span class="cfg-track"></span>
                </label>
              </div>
            </div>
          `).join('');
        }

        renderChannelsList();
        renderCrmsList();

        // Синхронизация полосы тарифов при клике или клавиатуре + мобильные точки
        const mobileDots = document.getElementById('cfgMobileDots');
        const tariffCards = tariffsStrip ? Array.from(tariffsStrip.querySelectorAll('.cfg-tariff-card')) : [];

        function updateMobileDots(activeIndex) {
          if (!mobileDots) return;
          const dots = mobileDots.querySelectorAll('.cfg-mobile-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
          });
        }

        if (tariffsStrip) {
          tariffsStrip.addEventListener('click', e => {
            const card = e.target.closest('.cfg-tariff-card');
            if (!card) return;
            const sliderTarget = parseInt(card.dataset.slider, 10);
            if (!isNaN(sliderTarget)) {
              setVolume(sliderTarget);
            }
          });

          tariffsStrip.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
              const card = e.target.closest('.cfg-tariff-card');
              if (card) {
                e.preventDefault();
                const sliderTarget = parseInt(card.dataset.slider, 10);
                if (!isNaN(sliderTarget)) {
                  setVolume(sliderTarget);
                }
              }
            }
          });

          // Интерактивные мобильные точки
          if (mobileDots) {
            mobileDots.addEventListener('click', e => {
              const dot = e.target.closest('.cfg-mobile-dot');
              if (!dot) return;
              const idx = parseInt(dot.dataset.index, 10);
              if (!isNaN(idx) && tariffCards[idx]) {
                const sliderTarget = parseInt(tariffCards[idx].dataset.slider, 10);
                if (!isNaN(sliderTarget)) {
                  setVolume(sliderTarget);
                }
                tariffCards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                updateMobileDots(idx);
              }
            });

            // Отслеживание свайпа на мобильных для плавной подсветки точек
            let isScrolling;
            tariffsStrip.addEventListener('scroll', () => {
              clearTimeout(isScrolling);
              isScrolling = setTimeout(() => {
                if (window.innerWidth > 767) return;
                const stripRect = tariffsStrip.getBoundingClientRect();
                const stripCenter = stripRect.left + stripRect.width / 2;
                let closestIdx = 0;
                let minDiff = Infinity;
                tariffCards.forEach((card, idx) => {
                  const cardRect = card.getBoundingClientRect();
                  const cardCenter = cardRect.left + cardRect.width / 2;
                  const diff = Math.abs(cardCenter - stripCenter);
                  if (diff < minDiff) {
                    minDiff = diff;
                    closestIdx = idx;
                  }
                });
                updateMobileDots(closestIdx);
              }, 40);
            }, { passive: true });
          }
        }

        // Синхронизация ползунка
        function updateSliderVisuals() {
          if (!sliderEl) return;
          const min = parseInt(sliderEl.min, 10) || 50;
          const max = parseInt(sliderEl.max, 10) || 3000;
          const val = state.sliderValue;
          const pct = ((val - min) / (max - min)) * 100;
          sliderEl.style.background = `linear-gradient(to right, #059669 0%, #059669 ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`;
          sliderEl.value = val;
          sliderEl.setAttribute('aria-valuenow', val);
        }

        function setVolume(val) {
          state.sliderValue = val;
          updateSliderVisuals();
          recalc();
        }

        if (sliderEl) {
          sliderEl.addEventListener('input', e => {
            state.sliderValue = parseInt(e.target.value, 10);
            updateSliderVisuals();
            recalc();
          });
        }

        // Переключатель периода оплаты
        billingBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const period = btn.dataset.period;
            if (!period || state.billingPeriod === period) return;
            state.billingPeriod = period;
            billingBtns.forEach(b => {
              const isActive = (b === btn);
              b.classList.toggle('active', isActive);
              b.setAttribute('aria-checked', isActive ? 'true' : 'false');
            });
            recalc();
          });
        });

        // Слушатель чекбоксов каналов и CRM
        const constructorSec = document.getElementById('constructor');
        if (constructorSec) {
          constructorSec.addEventListener('change', e => {
            if (e.target.matches('input[type=checkbox]')) {
              const { group, id } = e.target.dataset;
              if (group && state[group] !== undefined) {
                state[group][id] = e.target.checked;
                e.target.setAttribute('aria-checked', e.target.checked ? 'true' : 'false');
                recalc();
              }
            }
          });
        }

        // Основная функция пересчета стоимости и обновления интерфейса
        function recalc() {
          const tariff = getTariffByVolume(state.sliderValue);
          const isAnnual = (state.billingPeriod === 'annual');
          const isEmpire = tariff.isCustom;
          const prefix = isEmpire ? 'от\u00A0' : '';

          // 1. Отображение ползунка и бейджа
          if (sliderDisplay) {
            sliderDisplay.textContent = (state.sliderValue === 3000) ? '3000+' : `${state.sliderValue}\u00A0диалогов`;
          }
          if (tariffBadge) {
            tariffBadge.textContent = `тариф «${tariff.name}»`;
          }

          // 2. Подсветка активной карточки тарифа в полосе и синхронизация точек
          if (tariffsStrip) {
            let activeIdx = 0;
            tariffCards.forEach((card, idx) => {
              const isActive = (card.dataset.tariff === tariff.id);
              card.classList.toggle('active', isActive);
              card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
              if (isActive) {
                activeIdx = idx;
                if (window.innerWidth <= 767 && document.activeElement === sliderEl) {
                  card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
              }
            });
            updateMobileDots(activeIdx);
          }

          // 3. Стоимости
          const setup = TARIFF_CONFIG.setupPrice;
          const monthly = tariff.monthlyPrice;
          const earlyBird = tariff.earlyBirdPrice;

          const subPrefixEl = document.getElementById('cfgSubPrefix');
          const monthlyTotalEl = document.getElementById('monthlyTotal');

          if (subPrefixEl) {
            subPrefixEl.classList.toggle('hidden', !isEmpire);
          }

          if (monthlyTotalEl) {
            monthlyTotalEl.textContent = formatPrice(monthly);
          }

          // 4. Итог за первый год убран по требованию

          // 5. Раскрывашка «Подробнее»
          const cfgDetailsRowsEl = document.getElementById('cfgDetailsRows');
          if (cfgDetailsRowsEl) {
            const activeChannelsCount = Object.values(state.channels).filter(Boolean).length;
            const activeCrmsCount = Object.values(state.crms).filter(Boolean).length;

            const rows = [
              { name: 'Тариф', val: tariff.name },
              { name: 'Лимит диалогов', val: tariff.detailsLimit },
              { name: `Каналы: ${getChannelsCountText(activeChannelsCount)}`, val: '0\u00A0₽' },
              { name: `Учёт клиентов: ${getCrmCountText(activeCrmsCount)}`, val: '0\u00A0₽' },
              { name: 'Оплата за отдельные диалоги', val: 'нет' },
              { name: 'Запуск', val: '29\u00A0000\u00A0₽ разово' }
            ];

            cfgDetailsRowsEl.innerHTML = rows.map(r => `
              <tr class="hover:bg-white/5 transition-colors">
                <td class="py-1.5 pr-2 text-slate-200 font-medium">${r.name}</td>
                <td class="py-1.5 text-right font-bold text-sky-300 whitespace-nowrap">${r.val}</td>
              </tr>
            `).join('');
          }

          // 6. Мобильная закрепленная панель
          const mobSetupTotal = document.getElementById('mobSetupTotal');
          const mobMonthlyTotal = document.getElementById('mobMonthlyTotal');
          if (mobSetupTotal) mobSetupTotal.textContent = formatPrice(setup);
          if (mobMonthlyTotal) {
            mobMonthlyTotal.textContent = `${prefix}${formatPrice(monthly)}\u00A0₽/мес`;
          }

          // 7. Кнопка «Запустить ИИ-продавца»
          const ctaBtn = document.getElementById('ctaBtn');
          if (ctaBtn) {
            const activeChNames = CHANNELS.filter(c => state.channels[c.id]).map(c => c.label.replace(/\*+/g, '')).join(', ') || 'Без каналов';
            const activeCrmNames = CRMS.filter(c => state.crms[c.id]).map(c => c.label).join(', ') || 'Без CRM';

            const tgMsg = `Здравствуйте! Хочу запустить ИИ-продавца:
• Тариф: «${tariff.name}» (${tariff.detailsLimit})
• Объём: ~${state.sliderValue} диалогов в месяц
• Подписка: ${prefix}${formatPrice(monthly)} ₽/мес
• Каналы: ${activeChNames}
• Учёт клиентов: ${activeCrmNames}
Готов обсудить запуск!`;

            ctaBtn.href = `${TARIFF_CONFIG.ctaUrl}?text=${encodeURIComponent(tgMsg)}`;
          }
        }

        updateSliderVisuals();
        recalc();
      })();

      // ФИНАЛЬНЫЙ БЛОК (#cta-final): АНИМАЦИЯ КАРТОЧЕК
        (function initCtaFinalChoreography() {
          const section = document.getElementById('cta-final');
          if (!section) return;

          const stage = section.querySelector('.cta-notifications-stage');
          const wrappers = Array.from(section.querySelectorAll('.cta-push-wrapper'));
          const cards = Array.from(section.querySelectorAll('.cta-push-card'));

          if (!wrappers.length) return;

          // Подготавливаем скрытое состояние для плавного появления (без JS карточки видны сразу)
          if (stage) {
            stage.classList.add('cta-cards-js-ready');
          }

          let loopTimer = null;
          let isRunning = false;
          let cycleTimers = [];

          function clearTimers() {
            cycleTimers.forEach(t => clearTimeout(t));
            cycleTimers = [];
            if (loopTimer) {
              clearTimeout(loopTimer);
              loopTimer = null;
            }
          }

          function resetCards() {
            wrappers.forEach(wrap => {
              wrap.classList.remove('card-revealed', 'card-floating', 'card-fading-out');
            });
          }

          function playArrivalLoop() {
            clearTimers();
            resetCards();

            // Очередь завала: уведомления падают одно за другим
            const delays = [150, 650, 1150, 1650, 2150, 2650];

            wrappers.forEach((wrap, idx) => {
              const delay = delays[idx] || (idx * 500);
              const t = setTimeout(() => {
                wrap.classList.remove('card-fading-out');
                wrap.classList.add('card-revealed');
                const card = wrap.querySelector('.cta-push-card');
                if (card) {
                  const isDesktop = window.innerWidth >= 1024;
                  const rot = isDesktop ? wrap.style.getPropertyValue('--notif-rot-desk') : wrap.style.getPropertyValue('--notif-rot-mob');
                  card.style.setProperty('--curr-rot', rot || '0deg');
                  card.classList.add('card-nudge');
                  const tn = setTimeout(() => card.classList.remove('card-nudge'), 350);
                  cycleTimers.push(tn);
                }
                const tf = setTimeout(() => {
                  wrap.classList.add('card-floating');
                }, 500);
                cycleTimers.push(tf);
              }, delay);
              cycleTimers.push(t);
            });

            // Микро-всплеск входящего сообщения на полном завале
            const tNudgeExtra = setTimeout(() => {
              const card = cards[Math.floor(Math.random() * cards.length)];
              if (card) {
                card.classList.add('card-nudge');
                setTimeout(() => card.classList.remove('card-nudge'), 350);
              }
            }, 4500);
            cycleTimers.push(tNudgeExtra);

            // Плавное растворение карточек после паузы для чтения (через 7.2 сек)
            const tFade = setTimeout(() => {
              wrappers.forEach(wrap => {
                wrap.classList.remove('card-floating');
                wrap.classList.add('card-fading-out');
              });
            }, 7200);
            cycleTimers.push(tFade);

            // Перезапуск цикла лавины сообщений (через 8.0 сек)
            loopTimer = setTimeout(() => {
              if (isRunning) {
                playArrivalLoop();
              }
            }, 8000);
          }

          // IntersectionObserver: запускаем цикл только когда блок в поле зрения
          if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  isRunning = true;
                  playArrivalLoop();
                } else {
                  isRunning = false;
                  clearTimers();
                  wrappers.forEach(wrap => {
                    wrap.classList.add('card-revealed');
                    wrap.classList.remove('card-fading-out');
                  });
                }
              });
            }, { threshold: 0.15 });
            observer.observe(section);
          } else {
            isRunning = true;
            playArrivalLoop();
          }
        })();

        // Mobile Floating Bar observer
        const mobileBar = document.getElementById('cfgMobileBottomBar');
        const ctorSec = document.getElementById('constructor');
        if (mobileBar && ctorSec && 'IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                mobileBar.classList.remove('translate-y-full');
              } else {
                mobileBar.classList.add('translate-y-full');
              }
            });
          }, { threshold: 0.1 });
          obs.observe(ctorSec);
        }
    });
  // Dynamic --ao-sunset scroll handler for Alpenglow background
  function updateAltaiSunset() {
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollH > 0 ? Math.min(Math.max(window.scrollY / scrollH, 0), 1) : 0;
    document.documentElement.style.setProperty('--ao-sunset', progress.toFixed(3));
  }
  window.addEventListener('scroll', updateAltaiSunset, { passive: true });
  updateAltaiSunset();
