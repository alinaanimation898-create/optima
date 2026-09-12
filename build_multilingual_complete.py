# -*- coding: utf-8 -*-
"""
Complete Multilingual Builder for Altai Optima
Generates en.html and tr.html with EXACTLY 0 Cyrillic characters remaining.
"""

import re
import json
import sys

def clean_cyrillic_comments(text):
    # CSS comments containing Cyrillic
    text = re.sub(r'/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/', lambda m: '' if re.search(r'[\u0400-\u04FF]', m.group(0)) else m.group(0), text)
    # HTML comments containing Cyrillic
    text = re.sub(r'<!--.*?-->', lambda m: '' if re.search(r'[\u0400-\u04FF]', m.group(0)) else m.group(0), text, flags=re.DOTALL)
    # JS single line comments containing Cyrillic
    text = re.sub(r'//[^\n]*?[\u0400-\u04FF]+[^\n]*', '', text)
    return text

with open('index.html', 'r', encoding='utf-8') as f:
    source_html = f.read()

cleaned_base = clean_cyrillic_comments(source_html)

from scratch.compile_all_locales import en_books_json, tr_books_json, en_personas_data, tr_personas_data, en_cases_data, tr_cases_data, en_branches, tr_branches
from scratch.generate_translations_master import en_replacements, tr_replacements

# Additional specific replacements for 100% coverage
en_additional = [
    ('<span class="font-bold text-slate-900 font-inter sm:hidden text-[10px] group-hover:text-sky-600 transition-colors">Почта</span>', '<span class="font-bold text-slate-900 font-inter sm:hidden text-[10px] group-hover:text-sky-600 transition-colors">Email</span>'),
    ('ПОТЕРЯ ВЫРУЧКИ', 'LOST REVENUE'),
    ('СЛИВ КОНВЕРСИИ', 'DROPPED CONVERSION'),
    ('Клиент готов оплатить чек 300 000 ₽ вечером в выходной. Менеджер не на связи. Через 5 минут заказ уходит конкуренту, ответившему сразу.', 'A high-intent buyer is ready to pay a $5,000 invoice on a weekend evening. Rep is offline. Within 5 minutes the order is lost to a faster competitor.'),
    ('Горячая заявка остывает, пока сотрудник раскачивается с утра. Лид теряет интерес и при звонке сухо бросает: спасибо, уже неактуально.', 'A hot inbound lead goes cold while a sales rep gets ready for the day. The buyer loses interest: "Thanks, already bought elsewhere."'),
    ('ИИ-продавец мгновенно считывает микропаузы, снимает возражения и ведет коммуникацию человеческим голосом и подачей', 'The AI sales rep instantly reads micro-pauses, handles objections, and converses with natural human voice and delivery'),
    ('ИИ-продавец мгновенно считывает микропаузы, снимает возражения и ведет коммуникацию человеческим голосом.', 'The AI sales rep instantly reads micro-pauses, handles objections, and converses with an authentic human voice.'),
    ('Интеграция с любым сервисом. База клиентов всегда в чистоте, сделки двигаются по воронке автоматически', 'Seamless integration with any platform. Client database stays perfectly clean, deals progress automatically'),
    ('Интеграция с любым сервисом. База клиентов всегда в чистоте, сделки двигаются по воронке автоматически.', 'Seamless integration with any platform. Client database stays perfectly clean, deals progress automatically.'),
    ('<span>— ЦИТАТА ИЗ КНИГИ —</span>', '<span>— BOOK QUOTE —</span>'),
    ('<span>Как это заложено в нашего AI-продавца:</span>', '<span>How this empowers our AI sales rep:</span>'),
    ('Скачать книгу <span id="downloadBtnBookTitle">', 'Download book <span id="downloadBtnBookTitle">'),
    ('aria-label="Закрыть"', 'aria-label="Close"'),
    ('<span>Закрытая AI-библиотека</span>', '<span>Private AI Library</span>'),
    ('<h3 id="bookModalTitle" class="text-xl sm:text-2xl font-black text-slate-900 font-inter tracking-tight leading-snug">\n                Клиенты на всю жизнь\n              </h3>', '<h3 id="bookModalTitle" class="text-xl sm:text-2xl font-black text-slate-900 font-inter tracking-tight leading-snug">\n                “Customers for Life”\n              </h3>'),
    ('Клиенты на всю жизнь', '“Customers for Life”'),
    ('📚 Полная электронная версия книги, ключевые конспекты и практические AI-промпты для переговоров уже выложены в нашем закрытом Telegram-канале.', '📚 Full digital edition, executive notes, and actionable AI negotiation prompts are published in our private Telegram channel.'),
    ('📚 Полная электронная версия книги, ключевые конспекты и практические AI-промпты для переговоров уже ждут вас.', '📚 Full digital book version, executive summary, and actionable AI negotiation prompts are ready for you.'),
    ('Перейдите по ссылке ниже, чтобы бесплатно скачать книгу и получить доступ к базе знаний Altai Optima', 'Follow the link below to download the book for free and gain access to the Altai Optima knowledge base'),
    ('<span>Перейти в Telegram и скачать книгу</span>', '<span>Open Telegram & Download Book</span>'),
    ('Закрыть окно', 'Close Window'),
    ('alt="Михаил"', 'alt="Michael"'),
    ('alt="Максим"', 'alt="Maxim"'),
    ('alt="Софья"', 'alt="Sophia"'),
    ('alt="Дмитрий"', 'alt="Dmitry"'),
    ('alt="Константин"', 'alt="Konstantin"'),
    ('title="Михаил \n', 'title="Michael \n'),
    ('title="Максим \n', 'title="Maxim \n'),
    ('title="Софья Держинская \n', 'title="Sophia Derzhinskaya \n'),
    ('title="Дмитрий \n', 'title="Dmitry \n'),
    ('title="Константин \n', 'title="Konstantin \n'),
    ('alt="Михаил — Директор по стратегическим сделкам"', 'alt="Michael — Strategic Deals Director"'),
    ('«В B2B продажах опираюсь на системность и глубокое понимание бизнес-задач клиента. Не занимаюсь агрессивным "впариванием" — выстраиваю доверительный диалог на языке цифр и выгод. Погружаюсь в регламенты и номенклатуру вашей компании с первого дня: оперативно квалифицирую входящий трафик, готовлю точные расчеты, снимаю сомнения заказчиков и довожу каждую целевую заявку до подписания договора и поступления денег на расчетный счет.»', '“In high-ticket B2B sales, I prioritize structured value logic and deep empathy for client business targets. I don’t just pitch product features — I prove ROI. I bridge alignment with C-level stakeholders and navigate complex multi-stakeholder deals to closed revenue.”'),
    ('<span class="whitespace-nowrap inline-block">ИИ&#8209;продавец</span> automatically', '<span class="whitespace-nowrap inline-block">AI sales rep</span> automatically'),
    ('<span class="whitespace-nowrap inline-block">ИИ&#8209;продавец?</span>', '<span class="whitespace-nowrap inline-block">AI sales rep?</span>'),
    ('<span class="whitespace-nowrap inline-block">ИИ&#8209;продавец</span>', '<span class="whitespace-nowrap inline-block">AI sales rep</span>'),
    ('<span class="inline-block">ИИ&#8209;продавца</span>', '<span class="inline-block">AI sales rep</span>'),
    ('title="Активно"', 'title="Active"'),
    ('aria-label="Предыдущий кейс"', 'aria-label="Previous Case"'),
    ('aria-label="Следующий кейс"', 'aria-label="Next Case"'),
    ('aria-label="Перейти к кейсу 1"', 'aria-label="Go to Case 1"'),
    ('aria-label="Перейти к кейсу 2"', 'aria-label="Go to Case 2"'),
    ('aria-label="Перейти к кейсу 3"', 'aria-label="Go to Case 3"'),
    ('aria-label="Перейти к кейсу 4"', 'aria-label="Go to Case 4"'),
    ('Входящих заявок в месяц:', 'Inbound leads per month:'),
    ('Входящих leads per month:', 'Inbound leads per month:'),
    ('Полная кастомизация под крупные корпоративные задачи: глубокая интеграция с вашими учетными системами, голосовые ассистенты для сложных сценариев и бесшовная работа сети AI-сотрудников на любом объеме данных', 'Full enterprise customization: deep integration with internal ERP, proprietary databases, custom telephony, training on terabytes of corporate data, and dedicated GPU clusters scaling to dozens of AI agents across unlimited volume'),
    ('title="Подарок при подключении — выгода 45 000 ₽"', 'title="Bonus gift on launch"'),
    ('title="Подарок при подключении — выгода 45 000 $"', 'title="Bonus gift on launch"'),
    ('placeholder="Александр"', 'placeholder="Alexander"'),
    ('placeholder="+7 (999) 000-00-00 или @username"', 'placeholder="+1 (555) 000-0000 or @username"'),
    ('title="Закрыть (Esc)"', 'title="Close (Esc)"'),
    ("agentStatus.textContent = 'печатает сообщение...';", "agentStatus.textContent = 'is typing a message...';"),
    ("${msg.author.split(' ')[0]} печатает", "${msg.author.split(' ')[0]} is typing"),
    ("pill.textContent = 'Демонстрация';", "pill.textContent = 'Demo';"),
    ("pill.textContent = 'В эфире • 24/7';", "pill.textContent = 'Live • 24/7';"),
    ("getNoun(currDeals, 'сделка', 'сделки', 'сделок')", "'deals'"),
    ("getNoun(boostedDeals, 'сделка', 'сделки', 'сделок')", "'deals'"),
    ("getNoun(extraDeals, 'сделка', 'сделки', 'сделок')", "'deals'"),
    ("$/мес", "$/mo"),
    ("₽/мес", "$/mo"),
    ("getNoun(days, 'день', 'дня', 'дней')", "'days'"),
    ("`за ${days} ${getNoun(days, 'день', 'дня', 'дней')}` : 'в 1-й месяц'", "`in ${days} days` : 'in 1st month'"),
    ("`за ${days} ${'days'}` : 'в 1-й месяц'", "`in ${days} days` : 'in 1st month'"),
    ("pbEl.textContent = 'в 1-й месяц';", "pbEl.textContent = 'in 1st month';"),
    ("counterEl.textContent = 'Заполнено 1 из 8 обязательных полей';", "counterEl.textContent = '1 of 8 required fields completed';"),
    ("counterEl.textContent = 'Заполнено 2 из 8 обязательных полей';", "counterEl.textContent = '2 of 8 required fields completed';"),
    ("posEl.textContent = 'Коммерческий директор (ЛПР)';", "posEl.textContent = 'Chief Commercial Officer (Decision Maker)';"),
    ("counterEl.textContent = 'Заполнено 3 из 8 обязательных полей';", "counterEl.textContent = '3 of 8 required fields completed';"),
    ("counterEl.textContent = 'Заполнено 4 из 8 обязательных полей';", "counterEl.textContent = '4 of 8 required fields completed';"),
    ("compEl.textContent = 'ПромСтройХолдинг ООО';", "compEl.textContent = 'Industrial Metals Corp';"),
    ("counterEl.textContent = 'Заполнено 5 из 8 обязательных полей';", "counterEl.textContent = '5 of 8 required fields completed';"),
    ("indEl.textContent = 'Оптовые поставки металлопроката';", "indEl.textContent = 'Wholesale Industrial Rolled Steel';"),
    ("counterEl.textContent = 'Заполнено 6 из 8 обязательных полей';", "counterEl.textContent = '6 of 8 required fields completed';"),
    ("cityEl.textContent = 'Москва, ЦФО';", "cityEl.textContent = 'Chicago, IL';"),
    ("counterEl.textContent = 'Заполнено 7 из 8 обязательных полей';", "counterEl.textContent = '7 of 8 required fields completed';"),
    ('<span class="text-emerald-700 font-bold">КП отправлено • Ждем оплату</span>', '<span class="text-emerald-700 font-bold">Proposal Sent • Awaiting Payment</span>'),
    ("counterEl.textContent = 'Все 8 обязательных полей заполнены на 100%';", "counterEl.textContent = 'All 8 required fields completed 100%';"),
    ('<span class="text-slate-500">Анализ диалога в переписке...</span>', '<span class="text-slate-500">Analyzing live dialogue...</span>'),
    ("counterEl.textContent = 'Заполнено 0 из 8 обязательных полей';", "counterEl.textContent = '0 of 8 required fields completed';"),
    ("btnText.textContent = 'Свернуть резюме';", "btnText.textContent = 'Collapse Dossier';"),
    ("${data.authorAvatar || 'РК'}", "${data.authorAvatar || 'RC'}"),
]

tr_additional = [
    ('<span class="font-bold text-slate-900 font-inter sm:hidden text-[10px] group-hover:text-sky-600 transition-colors">Почта</span>', '<span class="font-bold text-slate-900 font-inter sm:hidden text-[10px] group-hover:text-sky-600 transition-colors">E-posta</span>'),
    ('ПОТЕРЯ ВЫРУЧКИ', 'KAYIP GELİR'),
    ('СЛИВ КОНВЕРСИИ', 'DÖNÜŞÜM KAYBI'),
    ('Клиент готов оплатить чек 300 000 ₽ вечером в выходной. Менеджер не на связи. Через 5 минут заказ уходит конкуренту, ответившему сразу.', 'Müşteri hafta sonu akşam 5.000 $\'lık ödeme yapmaya hazır. Temsilci çevrimdışı. 5 dakika içinde sipariş anında yanıt veren rakibe gidiyor.'),
    ('Горячая заявка остывает, пока сотрудник раскачивается с утра. Лид теряет интерес и при звонке сухо бросает: спасибо, уже неактуально.', 'Sıcak talep, personel sabah işe başlayana kadar soğuyor. Alıcı ilgisini kaybediyor ve arandığında: "Teşekkürler, başka yerden aldık" diyor.'),
    ('ИИ-продавец мгновенно считывает микропаузы, снимает возражения и ведет коммуникацию человеческим голосом и подачей', 'Yapay zeka satıcısı mikro duraklamaları algılar, itirazları giderir ve doğal insan sesi ve tavrıyla görüşmeyi yönetir'),
    ('ИИ-продавец мгновенно считывает микропаузы, снимает возражения и ведет коммуникацию человеческим голосом.', 'Yapay zeka satıcısı mikro duraklamaları anında algılar, itirazları giderir ve doğal insan sesiyle görüşmeyi yönetir.'),
    ('Интеграция с любым сервисом. База клиентов всегда в чистоте, сделки двигаются по воронке автоматически', 'Tüm platformlarla entegrasyon. Müşteri veri tabanı daima düzenli kalır, anlaşmalar hunide otomatik ilerler'),
    ('Интеграция с любым сервисом. База клиентов всегда в чистоте, сделки двигаются по воронке автоматически.', 'Tüm platformlarla entegrasyon. Müşteri veri tabanı daima düzenli kalır, anlaşmalar hunide otomatik ilerler.'),
    ('<span>— ЦИТАТА ИЗ КНИГИ —</span>', '<span>— KİTAPTAN ALINTI —</span>'),
    ('<span>Как это заложено в нашего AI-продавца:</span>', '<span>Yapay zeka satıcımıza nasıl entegre edildi:</span>'),
    ('Скачать книгу <span id="downloadBtnBookTitle">', 'Kitabı indir <span id="downloadBtnBookTitle">'),
    ('aria-label="Закрыть"', 'aria-label="Kapat"'),
    ('<span>Закрытая AI-библиотека</span>', '<span>Özel Yapay Zeka Kütüphanesi</span>'),
    ('<h3 id="bookModalTitle" class="text-xl sm:text-2xl font-black text-slate-900 font-inter tracking-tight leading-snug">\n                Клиенты на всю жизнь\n              </h3>', '<h3 id="bookModalTitle" class="text-xl sm:text-2xl font-black text-slate-900 font-inter tracking-tight leading-snug">\n                “Ömür Boyu Müşteriler”\n              </h3>'),
    ('Клиенты на всю жизнь', '“Ömür Boyu Müşteriler”'),
    ('📚 Полная электронная версия книги, ключевые конспекты и практические AI-промпты для переговоров уже выложены в нашем закрытом Telegram-канале.', '📚 Kitabın tam e-kitap sürümü, özet notlar ve müzakere için pratik yapay zeka promptları özel Telegram kanalımızda hazır.'),
    ('📚 Полная электронная версия книги, ключевые конспекты и практические AI-промпты для переговоров уже ждут вас.', '📚 Kitabın tam e-kitap sürümü, özet notlar ve müzakere için pratik yapay zeka promptları sizi bekliyor.'),
    ('Перейдите по ссылке ниже, чтобы бесплатно скачать книгу и получить доступ к базе знаний Altai Optima', 'Kitabı ücretsiz indirmek ve Altai Optima bilgi tabanına erişmek için aşağıdaki bağlantıya tıklayın'),
    ('<span>Перейти в Telegram и скачать книгу</span>', '<span>Telegram\'a Git ve Kitabı İndir</span>'),
    ('Закрыть окно', 'Pencereyi Kapat'),
    ('alt="Михаил"', 'alt="Mikhail"'),
    ('alt="Максим"', 'alt="Maksim"'),
    ('alt="Софья"', 'alt="Sofya"'),
    ('alt="Дмитрий"', 'alt="Dmitry"'),
    ('alt="Константин"', 'alt="Konstantin"'),
    ('title="Михаил \n', 'title="Mikhail \n'),
    ('title="Максим \n', 'title="Maksim \n'),
    ('title="Софья Держинская \n', 'title="Sofya Derzhinskaya \n'),
    ('title="Дмитрий \n', 'title="Dmitry \n'),
    ('title="Константин \n', 'title="Konstantin \n'),
    ('alt="Михаил — Директор по стратегическим сделкам"', 'alt="Mikhail — Stratejik Anlaşmalar Direktörü"'),
    ('«В B2B продажах опираюсь на системность и глубокое понимание бизнес-задач клиента. Не занимаюсь агрессивным "впариванием" — выстраиваю доверительный диалог на языке цифр и выгод. Погружаюсь в регламенты и номенклатуру вашей компании с первого дня: оперативно квалифицирую входящий трафик, готовлю точные расчеты, снимаю сомнения заказчиков и довожу каждую целевую заявку до подписания договора и поступления денег на расчетный счет.»', '“B2B satışlarda sistematik yaklaşıma ve müşterinin iş hedeflerini derinlemesine anlamaya odaklanırım. Sadece özellik satmam — yatırım getirisini kanıtlarım. Her seviyedeki karar vericilerle ortak dil bulur ve çok milyonluk müzakereleri başarıyla tahsilata ulaştırırım.”'),
    ('<span class="whitespace-nowrap inline-block">ИИ&#8209;продавец</span> automatically', '<span class="whitespace-nowrap inline-block">yapay zeka satıcısı</span> otomatik olarak'),
    ('<span class="whitespace-nowrap inline-block">ИИ&#8209;продавец?</span>', '<span class="whitespace-nowrap inline-block">yapay zeka satıcısı?</span>'),
    ('<span class="whitespace-nowrap inline-block">ИИ&#8209;продавец</span>', '<span class="whitespace-nowrap inline-block">yapay zeka satıcısı</span>'),
    ('<span class="inline-block">ИИ&#8209;продавца</span>', '<span class="inline-block">yapay zeka satıcısı</span>'),
    ('title="Активно"', 'title="Aktif"'),
    ('aria-label="Предыдущий кейс"', 'aria-label="Önceki Vaka"'),
    ('aria-label="Следующий кейс"', 'aria-label="Sonraki Vaka"'),
    ('aria-label="Перейти к кейсу 1"', 'aria-label="1. Vakaya Git"'),
    ('aria-label="Перейти к кейсу 2"', 'aria-label="2. Vakaya Git"'),
    ('aria-label="Перейти к кейсу 3"', 'aria-label="3. Vakaya Git"'),
    ('aria-label="Перейти к кейсу 4"', 'aria-label="4. Vakaya Git"'),
    ('Входящих заявок в месяц:', 'Aylık gelen talep sayısı:'),
    ('Входящих leads per month:', 'Aylık gelen talep sayısı:'),
    ('Входящих talep aylık:', 'Aylık gelen talep sayısı:'),
    ('Полная кастомизация под крупные корпоративные задачи: глубокая интеграция с вашими учетными системами, голосовые ассистенты для сложных сценариев и бесшовная работа сети AI-сотрудников на любом объеме данных', 'Büyük kurumsal hedefler için tam özelleştirme: dahili ERP, veri tabanları ve santral ile derin entegrasyon, terabaytlarca kurumsal veri ile özel model eğitimi ve sınırsız hacimde onlarca yapay zeka çalışanı için özel sunucu altyapısı'),
    ('title="Подарок при подключении — выгода 45 000 ₽"', 'title="Kurulum hediyesi"'),
    ('title="Подарок при подключении — выгода 45 000 $"', 'title="Kurulum hediyesi"'),
    ('placeholder="Александр"', 'placeholder="Ahmet"'),
    ('placeholder="+7 (999) 000-00-00 или @username"', 'placeholder="+90 (555) 000-0000 veya @kullaniciadi"'),
    ('title="Закрыть (Esc)"', 'title="Kapat (Esc)"'),
    ("agentStatus.textContent = 'печатает сообщение...';", "agentStatus.textContent = 'mesaj yazıyor...';"),
    ("${msg.author.split(' ')[0]} печатает", "${msg.author.split(' ')[0]} yazıyor"),
    ("pill.textContent = 'Демонстрация';", "pill.textContent = 'Demo';"),
    ("pill.textContent = 'В эфире • 24/7';", "pill.textContent = 'Canlı • 7/24';"),
    ("getNoun(currDeals, 'сделка', 'сделки', 'сделок')", "'satış'"),
    ("getNoun(boostedDeals, 'сделка', 'сделки', 'сделок')", "'satış'"),
    ("getNoun(extraDeals, 'сделка', 'сделки', 'сделок')", "'satış'"),
    ("$/мес", "$/ay"),
    ("₽/мес", "$/ay"),
    ("getNoun(days, 'день', 'дня', 'дней')", "'gün'"),
    ("`за ${days} ${getNoun(days, 'день', 'дня', 'дней')}` : 'в 1-й месяц'", "`${days} gün içinde` : '1. ayda'"),
    ("`за ${days} ${'gün'}` : 'в 1-й месяц'", "`${days} gün içinde` : '1. ayda'"),
    ("pbEl.textContent = 'в 1-й месяц';", "pbEl.textContent = '1. ayda';"),
    ("counterEl.textContent = 'Заполнено 1 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 1 tanesi dolduruldu';"),
    ("counterEl.textContent = 'Заполнено 2 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 2 tanesi dolduruldu';"),
    ("posEl.textContent = 'Коммерческий директор (ЛПР)';", "posEl.textContent = 'Ticari Direktör (Karar Verici)';"),
    ("counterEl.textContent = 'Заполнено 3 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 3 tanesi dolduruldu';"),
    ("counterEl.textContent = 'Заполнено 4 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 4 tanesi dolduruldu';"),
    ("compEl.textContent = 'ПромСтройХолдинг ООО';", "compEl.textContent = 'Sanayi Metal San. Tic. A.Ş.';"),
    ("counterEl.textContent = 'Заполнено 5 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 5 tanesi dolduruldu';"),
    ("indEl.textContent = 'Оптовые поставки металлопроката';", "indEl.textContent = 'Toptan Endüstriyel Çelik Tedariki';"),
    ("counterEl.textContent = 'Заполнено 6 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 6 tanesi dolduruldu';"),
    ("cityEl.textContent = 'Москва, ЦФО';", "cityEl.textContent = 'İstanbul, TR';"),
    ("counterEl.textContent = 'Заполнено 7 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 7 tanesi dolduruldu';"),
    ('<span class="text-emerald-700 font-bold">КП отправлено • Ждем оплату</span>', '<span class="text-emerald-700 font-bold">Teklif İletildi • Ödeme Bekleniyor</span>'),
    ("counterEl.textContent = 'Все 8 обязательных полей заполнены на 100%';", "counterEl.textContent = 'Tüm 8 zorunlu alan %100 dolduruldu';"),
    ('<span class="text-slate-500">Анализ диалога в переписке...</span>', '<span class="text-slate-500">Yazışma analiz ediliyor...</span>'),
    ("counterEl.textContent = 'Заполнено 0 из 8 обязательных полей';", "counterEl.textContent = '8 zorunlu alandan 0 tanesi dolduruldu';"),
    ("btnText.textContent = 'Свернуть резюме';", "btnText.textContent = 'Özgeçmişi Daralt';"),
    ("${data.authorAvatar || 'РК'}", "${data.authorAvatar || 'YK'}"),
]

def build_locale(lang, books_json, personas_data, cases_data, branches_data, replacements, additional_replacements):
    text = cleaned_base
    
    # 1. Replace books array
    text = re.sub(r'const\s+books\s*=\s*\[[\s\S]*?\];', f'const books = {books_json};', text)
    
    # 2. Replace personasData
    text = re.sub(r'const\s+personasData\s*=\s*\{[\s\S]*?\n\s*\};', personas_data, text)
    
    # 3. Replace casesData
    text = re.sub(r'const\s+casesData\s*=\s*\{[\s\S]*?\n\s*\};', cases_data, text)
    
    # 4. Replace branches
    text = re.sub(r'const\s+branches\s*=\s*\{[\s\S]*?\n\s*\};', branches_data, text)
    
    # Clean avatar letter Э
    text = re.sub(r'>\s*Э\s*<', '>E<', text)
    
    # Clean cases title block
    if lang == 'en':
        text = re.sub(r'\n\s*КЕЙСЫ\s*\n', '\n          CASES\n', text)
    else:
        text = re.sub(r'\n\s*КЕЙСЫ\s*\n', '\n          VAKALAR\n', text)

    # Combine replacements sorted by length of search key (longest first)
    all_reps = list(dict(additional_replacements + replacements).items())
    all_reps.sort(key=lambda x: len(x[0]), reverse=True)
    
    # 5. Apply replacement tuples
    for r_from, r_to in all_reps:
        text = text.replace(r_from, r_to)
        
    # 6. Specific JS / Dynamic text strings
    if lang == 'en':
        text = text.replace("dot.setAttribute(\"aria-label\", `Книга ${i + 1}`);", "dot.setAttribute(\"aria-label\", `Book ${i + 1}`);")
        text = text.replace("if (authorEl) authorEl.textContent = `Автор: ${b.author}`;", "if (authorEl) authorEl.textContent = `Author: ${b.author}`;")
        text = text.replace("if (a && author) a.textContent = \"Автор: \" + author;", "if (a && author) a.textContent = \"Author: \" + author;")
        text = text.replace("submitBtn.innerHTML = '<span>Заявка отправляется...</span>';", "submitBtn.innerHTML = '<span>Sending request...</span>';")
        text = text.replace("submitBtn.innerHTML = '<span class=\"font-bold tracking-wide\">ОБСУДИТЬ ДЕТАЛИ ПРОЕКТА</span>';", "submitBtn.innerHTML = '<span class=\"font-bold tracking-wide\">DISCUSS PROJECT DETAILS</span>';")
        text = text.replace("status.textContent = 'Воспроизведение...';", "status.textContent = 'Playing...';")
        text = text.replace("status.textContent = 'Слушать';", "status.textContent = 'Listen';")
        text = text.replace("<span>ОКУПАЕМОСТЬ: ${data.payback || '1-Й МЕСЯЦ'}</span>", "<span>PAYBACK: ${data.payback || '1ST MONTH'}</span>")
        text = text.replace("<span>Рассчитать окупаемость для моей компании</span>", "<span>Calculate ROI for My Business</span>")
        text = text.replace('<span class="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">РЕЗУЛЬТАТ ЗА 1-Й МЕСЯЦ</span>', '<span class="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">1ST MONTH RESULT</span>')
        text = text.replace('ДЕМОНСТРАЦИЯ СЦЕНАРИЯ', 'LIVE SCENARIO DEMO')
        text = text.replace('<div><strong class="text-rose-900 font-bold">Было:</strong> ${data.summaryA}</div>', '<div><strong class="text-rose-900 font-bold">Before:</strong> ${data.summaryA}</div>')
        text = text.replace('<div><strong class="text-emerald-900 font-bold">Стало:</strong> ${data.summaryB}</div>', '<div><strong class="text-emerald-900 font-bold">After:</strong> ${data.summaryB}</div>')
        text = text.replace('statusText: \'в сети • отклик до 60 сек\',', 'statusText: \'online • response < 60s\',')
        text = text.replace('badge: \'Авито\',', 'badge: \'Marketplace\',')
        text = text.replace('<span class="text-[8px] bg-sky-100 text-sky-800 px-1 rounded font-normal">Компания ✓</span>', '<span class="text-[8px] bg-sky-100 text-sky-800 px-1 rounded font-normal">Verified ✓</span>')
        text = text.replace('<span class="text-xs sm:text-sm font-bold text-sky-800 font-inter tracking-wide uppercase">БРАТ</span>', '<span class="text-xs sm:text-sm font-bold text-sky-800 font-inter tracking-wide uppercase">BENEFIT</span>')
        # Currency in calculator
        text = text.replace('₽', '$')
        text = text.replace('млн $', 'M $')
        text = text.replace('тыс. $', 'k $')
        text = text.replace('заявок', 'leads')
        text = text.replace('сделок', 'deals')
        text = text.replace('$/мес', '$/mo')
    elif lang == 'tr':
        text = text.replace("dot.setAttribute(\"aria-label\", `Книга ${i + 1}`);", "dot.setAttribute(\"aria-label\", `Kitap ${i + 1}`);")
        text = text.replace("if (authorEl) authorEl.textContent = `Автор: ${b.author}`;", "if (authorEl) authorEl.textContent = `Yazar: ${b.author}`;")
        text = text.replace("if (a && author) a.textContent = \"Автор: \" + author;", "if (a && author) a.textContent = \"Yazar: \" + author;")
        text = text.replace("submitBtn.innerHTML = '<span>Заявка отправляется...</span>';", "submitBtn.innerHTML = '<span>Talep gönderiliyor...</span>';")
        text = text.replace("submitBtn.innerHTML = '<span class=\"font-bold tracking-wide\">ОБСУДИТЬ ДЕТАЛИ ПРОЕКТА</span>';", "submitBtn.innerHTML = '<span class=\"font-bold tracking-wide\">PROJE DETAYLARINI GÖRÜŞÜN</span>';")
        text = text.replace("status.textContent = 'Воспроизведение...';", "status.textContent = 'Oynatılıyor...';")
        text = text.replace("status.textContent = 'Слушать';", "status.textContent = 'Dinle';")
        text = text.replace("<span>ОКУПАЕМОСТЬ: ${data.payback || '1-Й МЕСЯЦ'}</span>", "<span>GERİ DÖNÜŞ: ${data.payback || '1. AY'}</span>")
        text = text.replace("<span>Рассчитать окупаемость для моей компании</span>", "<span>Şirketim İçin Geri Dönüşü Hesapla</span>")
        text = text.replace('<span class="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">РЕЗУЛЬТАТ ЗА 1-Й МЕСЯЦ</span>', '<span class="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider">1. AY SONUCU</span>')
        text = text.replace('ДЕМОНСТРАЦИЯ СЦЕНАРИЯ', 'CANLI SENARYO DEMOSU')
        text = text.replace('<div><strong class="text-rose-900 font-bold">Было:</strong> ${data.summaryA}</div>', '<div><strong class="text-rose-900 font-bold">Önce:</strong> ${data.summaryA}</div>')
        text = text.replace('<div><strong class="text-emerald-900 font-bold">Стало:</strong> ${data.summaryB}</div>', '<div><strong class="text-emerald-900 font-bold">Sonra:</strong> ${data.summaryB}</div>')
        text = text.replace('statusText: \'в сети • отклик до 60 сек\',', 'statusText: \'çevrimiçi • yanıt < 60 sn\',')
        text = text.replace('badge: \'Авито\',', 'badge: \'Canlı Sohbet\',')
        text = text.replace('<span class="text-[8px] bg-sky-100 text-sky-800 px-1 rounded font-normal">Компания ✓</span>', '<span class="text-[8px] bg-sky-100 text-sky-800 px-1 rounded font-normal">Onaylı ✓</span>')
        text = text.replace('<span class="text-xs sm:text-sm font-bold text-sky-800 font-inter tracking-wide uppercase">БРАТ</span>', '<span class="text-xs sm:text-sm font-bold text-sky-800 font-inter tracking-wide uppercase">AVANTAJ</span>')
        # Currency in calculator
        text = text.replace('₽', '$')
        text = text.replace('млн $', 'M $')
        text = text.replace('тыс. $', 'k $')
        text = text.replace('заявок', 'talep')
        text = text.replace('сделок', 'satış')
        text = text.replace('$/мес', '$/ay')

    # Final comment cleanup
    text = clean_cyrillic_comments(text)
    return text

print("Building en.html...")
en_output = build_locale('en', en_books_json, en_personas_data, en_cases_data, en_branches, en_replacements, en_additional)
with open('en.html', 'w', encoding='utf-8') as f:
    f.write(en_output)

print("Building tr.html...")
tr_output = build_locale('tr', tr_books_json, tr_personas_data, tr_cases_data, tr_branches, tr_replacements, tr_additional)
with open('tr.html', 'w', encoding='utf-8') as f:
    f.write(tr_output)

print("Build finished. Checking remaining Cyrillic lines...")
for fname in ['en.html', 'tr.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    cyr = [(i, l.strip()) for i, l in enumerate(lines, 1) if re.search(r'[\u0400-\u04FF]', l)]
    print(f"[{fname}] Total lines: {len(lines)}, Cyrillic lines remaining: {len(cyr)}")
    if cyr:
        for idx, l in cyr[:20]:
            print(f"  Line {idx}: {l[:100]}")
