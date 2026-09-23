(function() {
        const books = [
          {
            "id": 1,
            "title": "Удовлетворение гарантировано",
            "author": "Хорст Шульце",
            "category": "Премиальный сервис",
            "badge": "СТАНДАРТЫ СЕРВИСА",
            "gradient": "linear-gradient(145deg, #091a28 0%, #03456b 50%, #011624 100%)",
            "border": "#38bdf8",
            "spine": "#0284c7",
            "accent": "#38bdf8",
            "essence": "Создание безупречного сервиса через самоуважение сотрудников и абсолютные стандарты качества. Учит вести бизнес без лакейства, суеты и заискивания, выстраивая подлинное гостеприимство.",
            "quote": "«Мы - дамы и господа к услугам дам и господ»",
            "thought": "В диалоге исключены робость и подобострастие. Агент держит благородную осанку, соблюдает эталонный деловой этикет и обращается к собеседнику с равным достоинством."
          },
          {
            "id": 2,
            "title": "Никогда не идите на компромисс",
            "author": "Крис Восс",
            "category": "Тактика диалога",
            "badge": "ЭМОЦИОНАЛЬНЫЙ ИНТЕЛЛЕКТ",
            "gradient": "linear-gradient(145deg, #130f30 0%, #3e338c 50%, #0a071d 100%)",
            "border": "#c084fc",
            "spine": "#7c3aed",
            "accent": "#c084fc",
            "essence": "Применение протоколов тактического эмоционального интеллекта переговорщиков ФБР в бизнесе. Помогает сохранять хладнокровие под давлением, снимать агрессию и слышать истинные страхи оппонента.",
            "quote": "«Компромисс в переговорах часто оказывается худшим решением, вскрывайте скрытые мотивы через тактическую эмпатию.»",
            "thought": "Алгоритм анализирует тональность реплик, мягко зеркалит фразы клиента и задает калиброванные вопросы. Он сохраняет ледяное спокойствие в конфликтных ситуациях и не идет на глупые скидки."
          },
          {
            "id": 3,
            "title": "Сначала скажите „нет“",
            "author": "Джим Кэмп",
            "category": "Переговоры",
            "badge": "ПЕРЕГОВОРЫ",
            "gradient": "linear-gradient(145deg, #270611 0%, #6d1030 50%, #170208 100%)",
            "border": "#fb7185",
            "spine": "#e11d48",
            "accent": "#fb7185",
            "essence": "Стратегия ведения переговоров без нужды, манипуляций и погони за сиюминутным согласием. Устраняет страх отказа, сохраняет маржинальность сделки и избавляет от унизительной роли просителя.",
            "quote": "«Предоставьте клиенту полное право сказать „нет“, чтобы освободить диалог от давления и лицемерия.»",
            "thought": "Способность спокойно принимать сомнения клиента, твердо держать границы компании и вести конструктивный диалог исключительно с позиции внутренней силы."
          },
          {
            "id": 4,
            "title": "СПИН-продажи",
            "author": "Нил Рэкхэм",
            "category": "B2B-методология",
            "badge": "СПИН МЕТОД",
            "gradient": "linear-gradient(145deg, #071738 0%, #15459b 50%, #030b1c 100%)",
            "border": "#60a5fa",
            "spine": "#2563eb",
            "accent": "#60a5fa",
            "essence": "Научно обоснованная методология ведения крупных B2B-сделок через продуманную цепочку вопросов. Предотвращает преждевременные презентации и защищает от типичных возражений.",
            "quote": "«Профессионалы высшей лиги задают точные вопросы, заставляя клиента самостоятельно осознать масштаб своей боли.»",
            "thought": "Структура диалога по системе СПИН (ситуационные, проблемные, извлекающие и направляющие вопросы). Агент сначала оцифровывает проблему клиента и только затем презентует решение."
          },
          {
            "id": 5,
            "title": "Чемпионы продаж",
            "author": "Мэттью Диксон, Брент Адамсон",
            "category": "Коммерческое обучение",
            "badge": "CHALLENGER SALE",
            "gradient": "linear-gradient(145deg, #1b0a2a 0%, #4a154b 50%, #13051e 100%)",
            "border": "#e879f9",
            "spine": "#a21caf",
            "accent": "#e879f9",
            "essence": "Исследование эффективности продавцов, доказывающее превосходство интеллектуального вызова над банальным выстраиванием отношений. Дает схему коммерческого обучения, позволяющую бросить вызов привычкам покупателя.",
            "quote": "«Современные клиенты платят за новое видение своего бизнеса, а не за дружеские беседы.»",
            "thought": "Способность выступать сильным экспертом, адаптировать предложение под разные уровни лиц, принимающих решения, и держать инициативу в диалоге."
          },
          {
            "id": 6,
            "title": "Психология влияния",
            "author": "Роберт Чалдини",
            "category": "Психология решений",
            "badge": "ТРИГГЕРЫ ВЛИЯНИЯ",
            "gradient": "linear-gradient(145deg, #241403 0%, #683a06 50%, #150a01 100%)",
            "border": "#fbbf24",
            "spine": "#d97706",
            "accent": "#fbbf24",
            "essence": "Фундаментальный разбор психологических законов, побуждающих человека согласиться на предложение. Помогает экологично подвести собеседника к целевому действию и защищает от манипуляций.",
            "quote": "«Человеческое мышление использует универсальные триггеры, понимание которых позволяет этично направлять выбор.»",
            "thought": "Точное встраивание в реплики социальных доказательств, принципа взаимного обмена и дефицита времени без ощущения давления на собеседника."
          },
          {
            "id": 7,
            "title": "Жесткий менеджмент",
            "author": "Ден Кеннеди",
            "category": "Управление прибылью",
            "badge": "КОНТРОЛЬ ПРИБЫЛИ",
            "gradient": "linear-gradient(145deg, #261605 0%, #78350f 50%, #170c02 100%)",
            "border": "#f59e0b",
            "spine": "#b45309",
            "accent": "#f59e0b",
            "essence": "Циничный, прагматичный подход к коммерции, ориентированный на чистую прибыль и пресечение потерь. Истребляет жалость к упущенным лидам, дисциплинирует финансовую сторону переговоров.",
            "quote": "«Бизнес существует ради извлечения прибыли, любая мягкость в воронке продаж оплачивается из кармана собственника.»",
            "thought": "Железобетонный фокус на закрытие сделки. Агент не разводит пустые беседы ради бесед, оперативно отсекает нецелевую аудиторию и ведет контакт строго по маршруту окупаемости."
          },
          {
            "id": 8,
            "title": "Клиенты на всю жизнь",
            "author": "Карл Сьюэлл",
            "category": "Клиентский сервис",
            "badge": "LTV & СЕРВИС",
            "gradient": "linear-gradient(145deg, #06221c 0%, #0d5f4c 50%, #021712 100%)",
            "border": "#34d399",
            "spine": "#059669",
            "accent": "#34d399",
            "essence": "Пошаговая система превращения случайного покупателя в постоянный источник дохода на десятилетия вперед. Чистота процессов и внимание к деталям гарантируют повторные продажи.",
            "quote": "«Рассматривайте каждого обратившегося человека через призму пожизненной ценности клиента (LTV).»",
            "thought": "Агент фиксирует в CRM мельчайшие детали о клиенте, помнит контекст прошлых встреч и общается с прицелом на долгосрочное партнерство, а не на разовый куш."
          },
          {
            "id": 9,
            "title": "Доставляя счастье",
            "author": "Тони Шей",
            "category": "Бизнес-культура",
            "badge": "ЛОЯЛЬНОСТЬ & КУЛЬТУРА",
            "gradient": "linear-gradient(145deg, #052422 0%, #0c6a64 50%, #021514 100%)",
            "border": "#2dd4bf",
            "spine": "#0e7490",
            "accent": "#2dd4bf",
            "essence": "Опыт создания многомиллиардного бизнеса через искреннюю культуру заботы о покупателе. Учит выстраивать доверительную человеческую связь поверх сухого прайс-листа.",
            "quote": "«Искренний сервис - это не строка расходов, а главный двигатель органического роста компании»",
            "thought": "Естественный, живой язык диалога без шаблонных канцеляризмов. Агент вникает в ситуацию гостя и искренне подбирает решение под реальную задачу."
          },
          {
            "id": 10,
            "title": "Первоклассный сервис",
            "author": "Джон Шоул",
            "category": "Системный сервис",
            "badge": "СКОРОСТЬ & СЕРВИС",
            "gradient": "linear-gradient(145deg, #061e2c 0%, #0c567a 50%, #02131e 100%)",
            "border": "#22d3ee",
            "spine": "#0891b2",
            "accent": "#22d3ee",
            "essence": "Технология преобразования клиентского сервиса в измеримую корпоративную стратегию. Помогает ликвидировать внутреннюю бюрократию и ускорить прохождение клиента по воронке.",
            "quote": "«Скорость реакции и полномочия персонала решать вопрос здесь и сейчас побеждают любые рекламные бюджеты.»",
            "thought": "Мгновенный отклик на запрос в течение трех секунд и готовность предоставить исчерпывающий ответ без бесконечных перенаправлений к другим сотрудникам."
          },
          {
            "id": 11,
            "title": "Переговоры без поражений",
            "author": "Роджер Фишер, Уильям Юри",
            "category": "Гарвардский метод",
            "badge": "WIN-WIN ПЕРЕГОВОРЫ",
            "gradient": "linear-gradient(145deg, #06212b 0%, #0f627f 50%, #021219 100%)",
            "border": "#38bdf8",
            "spine": "#0284c7",
            "accent": "#38bdf8",
            "essence": "Классическая гарвардская методика принципиальных переговоров на основе взаимных интересов. Учит сохранять партнерские отношения даже в условиях жестких разногласий.",
            "quote": "«Отделите человека от проблемы и ищите взаимную выгоду вместо позиционной борьбы.»",
            "thought": "Способность выявлять реальные бизнес-цели клиента, обходить ультиматумы и предлагать взаимовыгодные сценарии сотрудничества."
          }
        ];

        let activeIndex = 0;
        let autoRotateTimer = null;
        const total = books.length;

        const sphereTrack = document.getElementById("bookSphereTrack");
        const dotsContainer = document.getElementById("bookSphereDots");
        const quickNavContainer = document.getElementById("bookQuickNav");
        const evaBookNum = document.getElementById("evaActiveBookNum");
        const titleEl = document.getElementById("activeBookTitle");
        const quoteBookTitleEl = document.getElementById("quoteBookTitle");
        const downloadBtnBookTitleEl = document.getElementById("downloadBtnBookTitle");
        const authorEl = document.getElementById("activeBookAuthor");
        const catEl = document.getElementById("activeBookCategory");
        const badgeEl = document.getElementById("activeBookBadge");
        const quoteEl = document.getElementById("activeBookQuote");
        const essenceEl = document.getElementById("activeBookEssence");
        const thoughtEl = document.getElementById("activeBookThought");
        const downloadBtn = document.getElementById("downloadBookBtn");

        // Построение элементов книг в 3D пространстве с неоновой подсветкой по краям
        if (sphereTrack) {
          sphereTrack.innerHTML = "";
          books.forEach((b, i) => {
            const card = document.createElement("div");
            card.className = "book-3d-item absolute cursor-pointer select-none flex flex-col justify-between p-4 sm:p-5 rounded-2xl transition-all duration-500 ease-out overflow-hidden";
            card.style.width = "178px";
            card.style.height = "248px";
            card.style.background = b.gradient;
            card.style.border = `1.5px solid ${b.border}55`;
            card.style.boxShadow = `0 15px 35px -10px rgba(0,0,0,0.6), inset 5px 0 15px -3px rgba(255,255,255,0.15), inset -5px 0 15px -3px rgba(0,0,0,0.5)`;
            card.dataset.index = i;

            // Контент книги
            card.innerHTML = `
              <div class="relative z-10 flex flex-col h-full justify-between text-white pointer-events-none">
                <div>
                  <h4 class="font-extrabold leading-snug text-white mt-1.5 drop-shadow-sm" style="font-size: ${b.title.length > 22 ? '13px' : (b.title.length > 15 ? '14.5px' : '16px')}; hyphens: auto; word-break: normal;">
                    ${b.title}
                  </h4>
                </div>
                
                <div class="pt-3 border-t border-white/15">
                  <p class="text-xs font-semibold drop-shadow-sm" style="color: ${b.accent};">
                    ${b.author}
                  </p>
                  <p class="text-[10px] text-slate-400 font-mono mt-0.5">
                    ${b.category}
                  </p>
                </div>
              </div>
              <!-- Корешок книги с металлическим отливом -->
              <div class="absolute left-0 top-0 bottom-0 w-3 rounded-l-2xl" style="background: linear-gradient(to right, ${b.spine}, rgba(255,255,255,0.2) 50%, ${b.spine});"></div>
              <!-- Неоновый контур-вспышка при наведении -->
              <div class="book-neon-glow absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0" style="box-shadow: inset 0 0 20px ${b.border}, 0 0 30px ${b.border}99; border: 2px solid ${b.border};"></div>
            `;

            // Hover: неоновая подсветка краев
            card.addEventListener("mouseenter", () => {
              const glow = card.querySelector(".book-neon-glow");
              if (glow) glow.style.opacity = "1";
              card.style.borderColor = b.border;
              card.style.boxShadow = `0 20px 45px -5px ${b.border}77, 0 0 35px ${b.border}55, inset 0 0 15px ${b.border}44`;
            });

            card.addEventListener("mouseleave", () => {
              const glow = card.querySelector(".book-neon-glow");
              if (glow) glow.style.opacity = (i === activeIndex) ? "0.8" : "0";
              if (i === activeIndex) {
                card.style.borderColor = b.border;
                card.style.boxShadow = `0 20px 45px -10px ${b.border}66, 0 0 25px ${b.border}44, inset 0 0 20px -5px ${b.border}33`;
              } else {
                card.style.borderColor = `${b.border}44`;
                card.style.boxShadow = `0 10px 25px -10px rgba(0,0,0,0.5)`;
              }
            });

            card.addEventListener("click", () => {
              if (activeIndex === i) {
                openBookModal(b.title, b.author);
              } else {
                setActiveBook(i);
                resetAutoRotate();
              }
            });

            sphereTrack.appendChild(card);
          });
        }

        // Построение точек
        if (dotsContainer) {
          dotsContainer.innerHTML = "";
          books.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "w-2.5 h-2.5 rounded-full transition-all duration-300 bg-slate-300 hover:bg-sky-400";
            dot.setAttribute("aria-label", `Книга ${i + 1}`);
            dot.addEventListener("click", () => {
              setActiveBook(i);
              resetAutoRotate();
            });
            dotsContainer.appendChild(dot);
          });
        }

        // Построение быстрой навигации
        if (quickNavContainer) {
          quickNavContainer.innerHTML = "";
          books.forEach((b, i) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "quick-book-chip px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all duration-200 border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-2xs flex items-center justify-center gap-1";
            btn.innerHTML = `<span class="w-1.5 h-1.5 rounded-full" style="background: ${b.border};"></span><span>#${b.id}</span>`;
            btn.title = `${b.title} (${b.author})`;
            btn.addEventListener("click", () => {
              setActiveBook(i);
              resetAutoRotate();
            });
            // Hover неоновое свечение на мини-плашках
            btn.addEventListener("mouseenter", () => {
              btn.style.borderColor = b.border;
              btn.style.boxShadow = `0 0 12px ${b.border}66`;
            });
            btn.addEventListener("mouseleave", () => {
              if (i !== activeIndex) {
                btn.style.borderColor = "";
                btn.style.boxShadow = "";
              }
            });
            quickNavContainer.appendChild(btn);
          });
        }

        // Функция обновления 3D позиции для эффекта сферы/цилиндра
        function update3DPositions() {
          if (!sphereTrack) return;
          const cards = sphereTrack.children;
          const isMobile = window.innerWidth < 640;
          const radiusX = isMobile ? 75 : 98;
          const radiusZ = isMobile ? 85 : 110;

          for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            let diff = i - activeIndex;
            // Нормализация кратчайшего расстояния по кольцу
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const absDiff = Math.abs(diff);
            const glow = card.querySelector(".book-neon-glow");

            if (absDiff <= 2) {
              card.style.display = "flex";
              const angle = diff * (isMobile ? 26 : 28);
              const tx = diff * radiusX;
              const tz = -absDiff * (isMobile ? 35 : 45) + (diff === 0 ? 45 : 0);
              const scale = diff === 0 ? (isMobile ? 1.02 : 1.06) : Math.max(0.72, 1 - absDiff * 0.16);
              const opacity = diff === 0 ? 1 : Math.max(0.4, 1 - absDiff * 0.28);
              const zIndex = 30 - absDiff * 10;

              card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${-angle}deg) scale(${scale})`;
              card.style.opacity = opacity;
              card.style.zIndex = zIndex;
              card.style.pointerEvents = "auto";

              if (diff === 0) {
                card.style.borderColor = books[i].border;
                card.style.boxShadow = `0 20px 45px -10px ${books[i].border}66, 0 0 25px ${books[i].border}44, inset 0 0 20px -5px ${books[i].border}33`;
                if (glow) glow.style.opacity = "0.7";
              } else {
                card.style.borderColor = `${books[i].border}44`;
                card.style.boxShadow = `0 10px 25px -10px rgba(0,0,0,0.5)`;
                if (glow) glow.style.opacity = "0";
              }
            } else {
              card.style.display = "none";
              card.style.opacity = "0";
              card.style.pointerEvents = "none";
              if (glow) glow.style.opacity = "0";
            }
          }

          // Обновление точек
          if (dotsContainer) {
            const dots = dotsContainer.children;
            for (let i = 0; i < dots.length; i++) {
              if (i === activeIndex) {
                dots[i].className = "w-6 h-2.5 rounded-full transition-all duration-300 bg-sky-500 shadow-sm";
              } else {
                dots[i].className = "w-2.5 h-2.5 rounded-full transition-all duration-300 bg-slate-300 hover:bg-sky-400";
              }
            }
          }

          // Обновление мини-плашек
          if (quickNavContainer) {
            const chips = quickNavContainer.children;
            for (let i = 0; i < chips.length; i++) {
              if (i === activeIndex) {
                chips[i].style.borderColor = books[i].border;
                chips[i].style.background = "#0f172a";
                chips[i].style.color = "#ffffff";
                chips[i].style.boxShadow = `0 0 14px ${books[i].border}77`;
              } else {
                chips[i].style.borderColor = "";
                chips[i].style.background = "#ffffff";
                chips[i].style.color = "";
                chips[i].style.boxShadow = "";
              }
            }
          }

          if (evaBookNum) {
            evaBookNum.textContent = (activeIndex + 1);
          }
        }

        // Обновление панели активной книги (с плавной сменой)
        function updateActivePanel() {
          const b = books[activeIndex];
          if (!b) return;

          const section = document.getElementById("activeBookSection");
          const subparts = section ? section.querySelectorAll(".active-book-subpart") : [];
          if (section) section.classList.add("opacity-50");
          subparts.forEach(el => el.classList.add("opacity-50"));

          setTimeout(() => {
            if (titleEl) titleEl.textContent = `«${b.title}»`;
            if (quoteBookTitleEl) quoteBookTitleEl.textContent = b.title;
            if (downloadBtnBookTitleEl) downloadBtnBookTitleEl.textContent = `«${b.title}»`;
            if (authorEl) authorEl.textContent = `Автор: ${b.author}`;
            if (catEl) catEl.textContent = b.category;
            if (badgeEl) badgeEl.textContent = b.badge;
            if (quoteEl) quoteEl.textContent = b.quote;
            if (essenceEl) essenceEl.textContent = b.essence;
            if (thoughtEl) thoughtEl.textContent = b.thought;
            if (section) section.classList.remove("opacity-50");
            subparts.forEach(el => el.classList.remove("opacity-50"));
          }, 150);
        }

        function setActiveBook(idx) {
          activeIndex = (idx + total) % total;
          update3DPositions();
          updateActivePanel();
        }

        // Навигация
        document.getElementById("bookSpherePrev")?.addEventListener("click", () => {
          setActiveBook(activeIndex - 1);
          resetAutoRotate();
        });

        document.getElementById("bookSphereNext")?.addEventListener("click", () => {
          setActiveBook(activeIndex + 1);
          resetAutoRotate();
        });

        if (downloadBtn) {
          downloadBtn.addEventListener("click", () => {
            const b = books[activeIndex];
            openBookModal(b.title, b.author);
          });
        }

        // Авто-ротация
        function startAutoRotate() {
          stopAutoRotate();
          autoRotateTimer = setInterval(() => {
            setActiveBook(activeIndex + 1);
          }, 6000);
        }

        function stopAutoRotate() {
          if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
          }
        }

        function resetAutoRotate() {
          stopAutoRotate();
          startAutoRotate();
        }

        const scene = document.getElementById("bookSphereScene");
        if (scene) {
          scene.addEventListener("mouseenter", stopAutoRotate);
          scene.addEventListener("mouseleave", startAutoRotate);

          // Свайпы на мобильных
          let touchStartX = 0;
          scene.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoRotate();
          }, { passive: true });

          scene.addEventListener("touchend", (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 40) {
              setActiveBook(activeIndex + 1);
            } else if (touchEndX - touchStartX > 40) {
              setActiveBook(activeIndex - 1);
            }
            startAutoRotate();
          }, { passive: true });
        }

        // Модальное окно
        function openBookModal(title, author) {
          const modal = document.getElementById("bookModal");
          if (!modal) return;
          const t = document.getElementById("modalBookTitle");
          const a = document.getElementById("modalBookAuthor");
          if (t && title) t.textContent = title;
          if (a && author) a.textContent = "Автор: " + author;

          modal.classList.remove("opacity-0", "pointer-events-none");
          const inner = modal.querySelector("div");
          if (inner) {
            inner.classList.remove("scale-95");
            inner.classList.add("scale-100");
          }
        }

        function closeBookModal() {
          const modal = document.getElementById("bookModal");
          if (!modal) return;
          modal.classList.add("opacity-0", "pointer-events-none");
          const inner = modal.querySelector("div");
          if (inner) {
            inner.classList.remove("scale-100");
            inner.classList.add("scale-95");
          }
        }

        window.openBookModal = openBookModal;
        window.closeBookModal = closeBookModal;

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeBookModal();
        });

        window.addEventListener("resize", update3DPositions);

        // Инициализация
        setActiveBook(0);
        startAutoRotate();
      })();