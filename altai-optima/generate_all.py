# -*- coding: utf-8 -*-
import re
import json
import base_trans

with open('index.html', 'r', encoding='utf-8') as f:
    source_ru = f.read()

def clean_comments_and_scripts(text):
    text = re.sub(r'/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/', lambda m: '' if re.search(r'[\u0400-\u04FF]', m.group(0)) else m.group(0), text)
    text = re.sub(r'<!--.*?-->', lambda m: '' if re.search(r'[\u0400-\u04FF]', m.group(0)) else m.group(0), text, flags=re.DOTALL)
    text = re.sub(r'//[^\n]*?[\u0400-\u04FF]+[^\n]*', '', text)
    return text

# Additional specific translations
additional_translations = [
    ('<h3 class="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-inter">\n                Начало\n              </h3>', '<h3 class="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-inter">\n                Start\n              </h3>', '<h3 class="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-inter">\n                Başlangıç\n              </h3>'),
    ('Начало', 'Start', 'Başlangıç'),
    ('>Начало<', '>Start<', '>Başlangıç<'),
    ('Подключить «Начало»', 'Deploy "Start" Plan', '"Başlangıç" Paketini Seçin'),
    ('Для масштаба и холдингов', 'For Scale & Enterprise', 'Büyük Ölçek ve Holdingler İçin'),
    ('Рассчитать тариф для масштаба', 'Calculate Enterprise Plan', 'Kurumsal Planı Hesaplayın'),
    ('>ТАРИФЫ<', '>PRICING<', '>FİYATLAR<'),
    ('ПРОЗРАЧНЫЕ ТАРИФЫ', 'TRANSPARENT PRICING', 'ŞEFFAF TARİFLER'),
    ('ТАРИФЫ И УСЛОВИЯ', 'PRICING & PLANS', 'FİYATLANDIRMA VE ŞARTLAR'),
    ('Инвестируйте в автономный AI-отдел продаж с гарантией результата по договору. Без скрытых платежей.', 'Invest in an autonomous AI sales infrastructure with contractual performance guarantees. Zero hidden fees.', 'Sözleşmeli performans garantisi ile otonom AI satış mimarisine yatırım yapın. Gizli ücret yok.'),
    ('ПОПУЛЯРНЫЙ СТАРТ', 'POPULAR CHOICE', 'POPÜLER SEÇİM'),
    ('ОКУПАЕМОСТЬ ОТ 7 ДНЕЙ', 'ROI FROM 7 DAYS', '7 GÜNDEN İTİBAREN GERİ DÖNÜŞ'),
    ('Классика', 'Classic', 'Klasik'),
    ('Полноценное внедрение автономного AI-менеджера под ключ для малого и среднего бизнеса.', 'Turnkey deployment of an autonomous AI sales agent for growing SMBs and mid-market enterprises.', 'Küçük ve orta ölçekli işletmeler için anahtar teslim otonom yapay zeka satış temsilcisi kurulumu.'),
    ('1-й месяц (подключение + обучение):', 'Month 1 (Setup & Training):', '1. Ay (Kurulum + Eğitim):'),
    ('100 000 ₽', '$1,200', '$1.200'),
    ('Разработка сценариев, интеграция с вашей CRM и мессенджерами, загрузка базы знаний и тестирование.', 'Custom sales playbook engineering, CRM and omnichannel messaging integration, knowledge base ingestion, and QA testing.', 'Satış senaryolarının hazırlanması, CRM ve mesajlaşma entegrasyonu, bilgi bankası yüklemesi ve canlı testler.'),
    ('Со 2-го месяца (абонплата + саппорт):', 'From Month 2 (Subscription & Support):', '2. Aydan İtibaren (Abonelik + Destek):'),
    ('15 000 ₽', '$180', '$180'),
    ('/ мес', '/ mo', '/ ay'),
    ('Бесперебойная работа 24/7/365, техподдержка, регулярный мониторинг диалогов и дообучение новым продуктам.', '24/7/365 continuous uptime, technical support, live dialogue monitoring, and ongoing retraining for new products.', '7/24/365 kesintisiz çalışma, teknik destek, görüşme analizi ve yeni ürünlerle sürekli model eğitimi.'),
    ('Что входит в тариф:', 'Plan Inclusions:', 'Tarife Kapsamı:'),
    ('<strong>1 AI-менеджер</strong> с персональным характером, стилем речи и фото-аватаром', '<strong>1 Dedicated AI Agent</strong> with custom persona, tailored tone of voice, and photo avatar', 'Markanıza özel üslup, ses tonu ve görsel profile sahip <strong>1 AI Temsilcisi</strong>'),
    ('<strong>Интеграция с каналами:</strong> Telegram, WhatsApp, Avito Чат, сайт', '<strong>Omnichannel Integration:</strong> Telegram, WhatsApp, Web Chat & Marketplaces', '<strong>Kanal Entegrasyonları:</strong> Telegram, WhatsApp, Web Chat ve Pazar Yerleri'),
    ('<strong>Полная синхронизация с CRM:</strong> amoCRM или Битрикс24 (ведение сделок)', '<strong>Complete CRM Sync:</strong> amoCRM or Bitrix24 (automated pipeline progression)', '<strong>Tam CRM Entegrasyonu:</strong> amoCRM veya Bitrix24 (otomatik aşama ilerletme)'),
    ('<strong>Обучение на регламентах:</strong> скрипты, прайс-листы, FAQ и преодоление возражений', '<strong>Trained on Playbooks:</strong> sales scripts, catalogs, FAQs, and objection matrices', '<strong>Kural ve Bilgi Bankası Eğitimi:</strong> Satış senaryoları, fiyat listeleri ve itiraz çözümleri'),
    ('<strong>Мгновенный отклик 0.8 сек</strong> в любое время суток 24/7/365', '<strong>Instant 0.8s Response</strong> 24/7/365 around the clock', 'Gece ve gündüz 7/24/365 <strong>0.8 saniyede anında yanıt</strong>'),
    ('<strong>Техническая поддержка и дообучение</strong> по запросу', '<strong>Technical Support & Retraining</strong> upon request', 'İhtiyaç halinde <strong>teknik destek ve model güncelleme</strong>'),
    ('Подключить «Классику»', 'Deploy "Classic" Plan', '"Klasik" Paketi Seçin'),
    ('ДЛЯ МАСШТАБА И ХОЛДИНГОВ', 'FOR SCALE & ENTERPRISE', 'BÜYÜK ÖLÇEKLİ KURUMLAR İÇİN'),
    ('Персональный', 'Custom Enterprise', 'Özel Enterprise'),
    ('Индивидуальная enterprise-архитектура, голосовые роботы, сложные ERP-интеграции и несколько AI-агентов.', 'Bespoke enterprise architecture, neural voice agents, multi-system ERP integrations, and multi-agent setups.', 'Özel kurumsal mimari, sesli yapay zeka robotları, karmaşık ERP entegrasyonları ve çoklu AI temsilcileri.'),
    ('Стоимость проекта:', 'Project Investment:', 'Proje Bedeli:'),
    ('Индивидуально', 'Custom Quote', 'Özel Teklif'),
    ('Рассчитывается под ваши задачи, количество каналов, нагрузку и глубину интеграций после первичного аудита.', 'Calculated based on your volume, integration depth, and architectural scope following a discovery audit.', 'Ön denetim sonrası ihtiyaçlarınıza, kanal sayınıza ve entegrasyon derinliğinize göre özel hesaplanır.'),
    ('Возможности решения:', 'Enterprise Capabilities:', 'Kurumsal Çözüm Avantajları:'),
    ('<strong>Неограниченное число AI-сотрудников</strong> под разные филиалы, отделы и направления', '<strong>Unlimited AI Sales Agents</strong> for different business units, branches, and divisions', 'Farklı şubeler ve departmanlar için <strong>sınırsız AI temsilcisi</strong>'),
    ('<strong>Голосовой Neural Voice AI:</strong> живые входящие и исходящие звонки с распознаванием речи 99.4%', '<strong>Neural Voice AI:</strong> human-like inbound & outbound calling with 99.4% speech recognition', '<strong>Sesli Yapay Zeka (Voice AI):</strong> %99.4 doğrulukla doğal gelen ve giden sesli aramalar'),
    ('<strong>Глубокая связка с 1С / SAP / МойСклад:</strong> авто-расчет смет, остатков и счетов за 15 сек', '<strong>Deep ERP & Inventory Sync:</strong> automated quoting and inventory reconciliation in 15 seconds', '<strong>Gelişmiş ERP ve Stok Entegrasyonu:</strong> 15 saniyede otomatik teklif ve stok kontrolü'),
    ('<strong>Многоуровневый AI-скоринг:</strong> квалификация по 15+ параметрам и авто-запись в Google Calendar', '<strong>Multi-Factor AI Scoring:</strong> qualification across 15+ criteria & automated Google Calendar booking', '<strong>Çok Kriterli AI Skorlama:</strong> 15+ parametreyle nitelik ve Google Takvim eşleşmesi'),
    ('<strong>Реактивация архивных баз:</strong> обзвон и прогрев 5 000+ спящих клиентов из CRM', '<strong>Database Reactivation:</strong> outreach and nurturing for 5,000+ dormant CRM leads', "<strong>Atıl Müşteri Canlandırma:</strong> CRM'deki 5.000+ uyuyan müşteriye sesli ve yazılı ulaşım"),
    ('<strong>Персональный ведущий архитектор</strong> и выделенный SLA с гарантией аптайма 99.9%', '<strong>Dedicated Lead AI Architect</strong> and customized 99.9% enterprise uptime SLA', '<strong>Özel Kıdemli AI Mimarı</strong> ve %99.9 kesintisiz çalışma garantili kurumsal SLA'),
    ('Рассчитать Персональный тариф', 'Get Custom Enterprise Quote', 'Özel Enterprise Teklifi Alın'),
    ('title="Подарок при подключении — выгода 45 000 ₽"', 'title="Special bonus with setup — $500 value"', 'title="Özel kurulum hediyesi — $500 değerinde"'),
    ('Подарок при подключении — выгода 45 000 ₽', 'Special bonus with setup — $500 value', 'Özel kurulum hediyesi — $500 değerinde'),
    ('text: \'Анастасия, добрый день! Благодарю за обращение в нашу компанию, меня зовут Эва ✨<br><br>Стоимость платья составляет 5 000 рублей.<br><br>На данный момент у нас действует экспресс-доставка по городу с примеркой, а также изделие представлено в онлайн-пространствах.<br><br>Направляю ссылки для вашего удобства:<br>• <strong>Lamoda:</strong> <span class="underline decoration-pink-200 font-medium">lamoda.ru/brand/dress</span><br>• <strong>Ozon:</strong> <span class="underline decoration-pink-200 font-medium">ozon.ru/product/dress</span><br><br>Подсказать вам по наличию вашего размера или оформить заказ с доставкой прямо сейчас?\',', 'text: \'Hello Anastasia! Thank you for contacting us, my name is Eva ✨<br><br>The price of the dress is $75.<br><br>We offer express city delivery with home fitting, and the piece is also available online.<br><br>Here are the links for your convenience:<br>• <strong>Boutique Store:</strong> <span class="underline decoration-pink-200 font-medium">shop.com/brand/dress</span><br>• <strong>Online Marketplace:</strong> <span class="underline decoration-pink-200 font-medium">marketplace.com/product/dress</span><br><br>May I check size availability or place an order with delivery right now?\',', 'text: \'Merhaba Anastasia Hanım! Bize ulaştığınız için teşekkürler, ben Eva ✨<br><br>Elbisenin fiyatı $75\'dır.<br><br>Şu anda adrese denemeli hızlı teslimat hizmetimiz bulunmaktadır ve ürün online mağazalarımızda mevcuttur.<br><br>Kolaylığınız için bağlantıları iletiyorum:<br>• <strong>Butik Mağaza:</strong> <span class="underline decoration-pink-200 font-medium">magaza.com/marka/elbise</span><br>• <strong>Online Pazar Yeri:</strong> <span class="underline decoration-pink-200 font-medium">pazaryeri.com/urun/elbise</span><br><br>Beden durumunu kontrol etmemi veya hemen teslimat oluşturmamı ister misiniz?\','),
    ("status.textContent = 'Эва печатает ответ...';", "status.textContent = 'Eva is typing a response...';", "status.textContent = 'Eva yanıt yazıyor...';"),
    ('«Здравствуйте, Алексей! Спецификацию и счет №482 на сумму <strong>3 420 000 ₽</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! I generated Specification & Invoice #482 for <strong>$45,000</strong>. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ("summaryB: 'Voice AI обзвонил базу за <strong>48 часов</strong> • <strong>1 558 лидов реактивировано</strong> • <strong>+6.8M ₽ чистой прибыли</strong>',", "summaryB: 'Voice AI dialed the database in <strong>48 hours</strong> • <strong>1,558 leads reactivated</strong> • <strong>+$75,000 net profit</strong>',", "summaryB: 'Sesli AI veritabanını <strong>48 saatte</strong> aradı • <strong>1.558 müşteri canlandırıldı</strong> • <strong>+$75.000 net kâr</strong>',"),
    ("review: '«45% обращений с Avito падали ночью и на выходных, когда отдел продаж спал. Клиенты успевали оставить заявки у пяти других дилеров. Робот отвечает за 1.2 секунды, считает лизинг через 1С и записывает на тест-драйв на площадку. Это дало нам +8.2M ₽ дополнительных продаж в месяц.»',", 'review: \'"45% of marketplace inquiries arrived at night and weekends while reps slept. Buyers contacted five other dealers. AI answers in 1.2s, calculates custom leasing via ERP, and books lot test-drives. It added +$90,000/mo in incremental sales."\',', 'review: \'"Pazar yeri taleplerinin %45i satış ekibi uyurken gece ve hafta sonları geliyordu. Müşteriler başka bayilere gidiyordu. AI 1.2 saniyede yanıt veriyor, ERP ile leasing hesaplıyor ve test sürüşü randevusu alıyor. Bu bize ayda +$90.000 ek satış sağladı."\','),
    ("summaryB: 'AI-скоринг 12 параметров • <strong>Время до Zoom: 4 часа</strong> • <strong>+4.6M ₽ выручки</strong>',", "summaryB: '12-point AI scoring • <strong>Time to Zoom: 4 hours</strong> • <strong>+$50,000 closed revenue</strong>',", "summaryB: '12 parametreli AI skorlama • <strong>Zoom süresi: 4 saat</strong> • <strong>+$50.000 ciro</strong>',"),
    ('РЕЗЮМЕ СОТРУДНИКА', 'AI EMPLOYEE RESUME', 'AI ÇALIŞAN ÖZGEÇMİŞİ'),
    ('Подарок при подключении — worth $500', 'Bonus gift with pilot deployment — worth $500', 'Pilot kurulum hediyesi — $500 değerinde'),
    ('Анастасия, добрый день! Благодарю за обращение в нашу компанию, меня зовут Eva ✨<br><br>Стоимость платья составляет 5 000 рублей.<br><br>На данный момент у нас действует экспресс-доставка по городу с примеркой, а также изделие представлено в онлайн-пространствах.<br><br>Направляю ссылки для вашего удобства:<br>• <strong>Lamoda:</strong> <span class="underline decoration-pink-200 font-medium">lamoda.ru/brand/dress</span><br>• <strong>Ozon:</strong> <span class="underline decoration-pink-200 font-medium">ozon.ru/product/dress</span><br><br>Подсказать вам по наличию вашего размера или оформить заказ с доставкой прямо сейчас?', 'Hello Anastasia! Thank you for reaching out, my name is Eva ✨<br><br>The price of the dress is $75.<br><br>We offer express same-day delivery with home fitting, and the piece is also available on online platforms.<br><br>Here are the direct links for your convenience:<br>• <strong>Boutique Store:</strong> <span class="underline decoration-pink-200 font-medium">shop.com/brand/dress</span><br>• <strong>Online Catalog:</strong> <span class="underline decoration-pink-200 font-medium">marketplace.com/product/dress</span><br><br>May I check size availability or arrange express delivery for you?', 'Merhaba Anastasia Hanım! Bize ulaştığınız için teşekkürler, ben Eva ✨<br><br>Elbisenin fiyatı $75\'dır.<br><br>Şu anda adrese denemeli hızlı teslimat hizmetimiz bulunmaktadır ve ürün ayrıca online mağazalarımızda mevcuttur.<br><br>Kolaylığınız için bağlantıları iletiyorum:<br>• <strong>Butik Mağaza:</strong> <span class="underline decoration-pink-200 font-medium">magaza.com/marka/elbise</span><br>• <strong>Online Katalog:</strong> <span class="underline decoration-pink-200 font-medium">pazaryeri.com/urun/elbise</span><br><br>Beden durumunu kontrol etmemi veya hemen teslimat oluşturmamı ister misiniz?'),
    ("status.textContent = 'Eva печатает ответ...';", "status.textContent = 'Eva is typing a response...';", "status.textContent = 'Eva yanıt yazıyor...';"),
    ('«Здравствуйте, Aleksей! Спецификацию и счет №482 на сумму <strong>$45,000</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! Specification & Invoice #482 for <strong>$45,000</strong> generated. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ('«Здравствуйте, Aleksей! Спецификацию и счет №482 на сумму <strong>$45.000</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! Specification & Invoice #482 for <strong>$45,000</strong> generated. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ('Voice AI обзвонил базу за <strong>48 часов</strong> • <strong>1 558 лидов реактивировано</strong> • <strong>+$75,000 чистой прибыли</strong>', 'Voice AI dialed database in <strong>48 hours</strong> • <strong>1,558 leads reactivated</strong> • <strong>+$75,000 net profit</strong>', 'Sesli AI veritabanını <strong>48 saatte</strong> aradı • <strong>1.558 müşteri canlandırıldı</strong> • <strong>+$75.000 net kâr</strong>'),
    ('Voice AI обзвонил базу за <strong>48 часов</strong> • <strong>1 558 лидов реактивировано</strong> • <strong>+$75.000 чистой прибыли</strong>', 'Voice AI dialed database in <strong>48 hours</strong> • <strong>1,558 leads reactivated</strong> • <strong>+$75,000 net profit</strong>', 'Sesli AI veritabanını <strong>48 saatte</strong> aradı • <strong>1.558 müşteri canlandırıldı</strong> • <strong>+$75.000 net kâr</strong>'),
    ('>МА<', '>MA<', '>MA<'),
    ('«45% обращений с Avito падали ночью и на выходных, когда отдел продаж спал. Клиенты успевали оставить заявки у пяти других дилеров. Робот отвечает за 1.2 секунды, считает лизинг через 1С и записывает на тест-драйв на площадку. Eто дало нам +$90,000 дополнительных продаж в месяц.»', '"45% of marketplace inquiries arrived at night and weekends when reps were offline. Buyers contacted five other dealers. AI replies in 1.2 seconds, calculates leasing via ERP, and books lot test-drives. It generated +$90,000/mo in additional sales."', '"Pazar yeri taleplerinin %45i gece ve hafta sonlarında geliyordu. AI 1.2 saniyede yanıt veriyor, ERP ile leasing hesaplıyor ve test sürüşü randevusu alıyor. Bu bize ayda +$90.000 ek satış getirdi."'),
    ('«45% обращений с Avito падали ночью и на выходных, когда отдел продаж спал. Клиенты успевали оставить заявки у пяти других дилеров. Робот отвечает за 1.2 секунды, считает лизинг через 1С и записывает на тест-драйв на площадку. Eто дало нам +$90.000 дополнительных продаж в месяц.»', '"45% of marketplace inquiries arrived at night and weekends when reps were offline. Buyers contacted five other dealers. AI replies in 1.2 seconds, calculates leasing via ERP, and books lot test-drives. It generated +$90,000/mo in additional sales."', '"Pazar yeri taleplerinin %45i gece ve hafta sonlarında geliyordu. AI 1.2 saniyede yanıt veriyor, ERP ile leasing hesaplıyor ve test sürüşü randevusu alıyor. Bu bize ayda +$90.000 ek satış getirdi."'),
    ('AI-скоринг 12 параметров • <strong>Время до Zoom: 4 часа</strong> • <strong>+$50,000 выручки</strong>', '12-parameter AI scoring • <strong>Time to Zoom: 4 hours</strong> • <strong>+$50,000 revenue</strong>', '12 parametreli AI skorlama • <strong>Zoom süresi: 4 saat</strong> • <strong>+$50.000 ciro</strong>'),
    ('AI-скоринг 12 параметров • <strong>Время до Zoom: 4 часа</strong> • <strong>+$50.000 выручки</strong>', '12-parameter AI scoring • <strong>Time to Zoom: 4 hours</strong> • <strong>+$50,000 revenue</strong>', '12 parametreli AI skorlama • <strong>Zoom süresi: 4 saat</strong> • <strong>+$50.000 ciro</strong>'),
    ('Scoring лида', 'Lead Scoring', 'Müşteri Skorlama'),
    ('Skorlama лида', 'Lead Scoring', 'Müşteri Skorlama'),
    ('лида', 'Lead', 'Talep'),
    ('Второе дыхание базы', 'New Life for Dormant Leads', 'Eski Veritabanına İkinci Nefes'),
    ('<strong class="text-purple-700 font-bold">Уснувшие контакты возвращаются в диалог</strong> через деликатные персонализированные касания без спама и раздражения', '<strong class="text-purple-700 font-bold">Dormant contacts return to active conversation</strong> through delicate, hyper-personalized touchpoints without spam or irritation', '<strong class="text-purple-700 font-bold">Uyuyan kontaklar aktif diyaloğa geri döner</strong>; spam ve rahatsızlık vermeyen kişiye özel zarif temaslarla'),
    ('Deals двигаются сами', 'Autonomous Deal Progression', 'Otonom Satış İlerlemesi'),
    ('Сделки двигаются сами', 'Autonomous Deal Progression', 'Otonom Satış İlerlemesi'),
    ('Система протоколирует договоренности, выставляет счета и <strong class="text-sky-700 font-bold">автоматически переводит этап сделки по воронке без участия человека</strong>', 'The system records agreements, issues invoices, and <strong class="text-sky-700 font-bold">automatically advances pipeline stages without human involvement</strong>', 'Sistem anlaşmaları belgeler, fatura iletir ve <strong class="text-sky-700 font-bold">insan müdahalesi olmadan satış aşamasını otomatik olarak ilerletir</strong>'),
    ('ЧИСТАЯ ВЫРУЧКА С AI', 'NET REVENUE WITH AI', 'AI İLE NET CİRO'),
    ('РЕЗУЛЬТАТ', 'RESULT', 'SONUÇ'),
    ('Сметы собирались 3–4 дня в Excel • 38% клиентов уходили к конкурентам', 'Quotes took 3–4 days in Excel • 38% of leads lost to competitors', "Teklifler Excel'de 3–4 gün alıyordu • Müşterilerin %38'i rakiplere gidiyordu"),
    ('КП формируется за 15 секунд • Сделка в 8 раз быстрее • +10.4M ₽ в месяц', 'Quotes created in 15 seconds • Deals 8x faster • +$110,000/mo net profit', 'Teklif 15 saniyede hazır • Anlaşma 8 kat daha hızlı • +$110.000/ay net ciro'),
    ('3 000 лидов', '3,000 leads', '3.000 talep'),
    ('● РЕЖИМ МАКСИМАЛЬНОГО РОСТА', '● MAXIMUM GROWTH MODE', '● MAKSİMUM BÜYÜME MODU'),
    ('>РЕЗЮМЕ СОТРУДНИКА<', '>AI EMPLOYEE RESUME<', '>AI ÇALIŞAN ÖZGEÇMİŞİ<'),
    ('<strong class="text-slate-950 font-bold">Благодаря интеллекту AI знаю любую тему и продукт в совершенстве, поэтому мне не требуется время на адаптацию и обучение.</strong> Я готова уже здесь и сейчас зарабатывать деньги для вашей компании: веду диалог безупречным голосом, строго защищаю базовый прайс и довожу сделку до оплаты с достоинством профессионала — без отпусков, выгорания и человеческого фактора.', '<strong class="text-slate-950 font-bold">Powered by advanced AI, I master any domain and product catalog instantly, requiring zero onboarding or training time.</strong> I am ready to generate revenue for your enterprise right now: conducting high-converting conversations, defending full price margins, and closing deals flawlessly — with zero sick leave, burnout, or human error.', '<strong class="text-slate-950 font-bold">Gelişmiş AI sayesinde her sektörü ve ürün kataloğunu anında öğrenir, adaptasyon veya eğitim süresi gerektirmem.</strong> Şirketiniz için hemen şimdi gelir üretmeye hazırım: kusursuz ses tonuyla görüşme yürütür, liste fiyatını tavizsiz korur ve satışı profesyonellikle tahsilata ulaştırırım — izin, tükenmişlik ve insan hatası olmaksızın.'),
    ('Подарок при подключении — worth $500', 'Bonus with setup — worth $500', 'Kurulum hediyesi — $500 değerinde'),
    ('Анастасия, добрый день! Благодарю за обращение в нашу компанию, меня зовут Eva ✨<br><br>Стоимость платья составляет 5 000 рублей.<br><br>На данный момент у нас действует экспресс-доставка по городу с примеркой, а также изделие представлено в онлайн-пространствах.<br><br>Направляю ссылки для вашего удобства:<br>• <strong>Lamoda:</strong> <span class="underline decoration-pink-200 font-medium">lamoda.ru/brand/dress</span><br>• <strong>Ozon:</strong> <span class="underline decoration-pink-200 font-medium">ozon.ru/product/dress</span><br><br>Подсказать вам по наличию вашего размера или оформить заказ с доставкой прямо сейчас?', 'Hello Anastasia! Thank you for reaching out, my name is Eva ✨<br><br>The price of the dress is $75.<br><br>We currently offer same-day express delivery with home fitting, and the piece is also available in our official online stores.<br><br>Here are the direct links for your convenience:<br>• <strong>Boutique Store:</strong> <span class="underline decoration-pink-200 font-medium">shop.com/brand/dress</span><br>• <strong>Online Catalog:</strong> <span class="underline decoration-pink-200 font-medium">marketplace.com/product/dress</span><br><br>May I check size availability for you or arrange express delivery right away?', 'Merhaba Anastasia Hanım! Bize ulaştığınız için teşekkürler, ben Eva ✨<br><br>Elbisenin fiyatı $75\'dır.<br><br>Şu anda adrese denemeli hızlı teslimat hizmetimiz bulunmaktadır ve ürün ayrıca online mağazalarımızda mevcuttur.<br><br>Kolaylığınız için bağlantıları iletiyorum:<br>• <strong>Butik Mağaza:</strong> <span class="underline decoration-pink-200 font-medium">magaza.com/marka/elbise</span><br>• <strong>Online Katalog:</strong> <span class="underline decoration-pink-200 font-medium">pazaryeri.com/urun/elbise</span><br><br>Beden durumunu kontrol etmemi veya hemen teslimat oluşturmamı ister misiniz?'),
    ("status.textContent = 'Eva печатает ответ...';", "status.textContent = 'Eva is typing a response...';", "status.textContent = 'Eva yanıt yazıyor...';"),
    ('«Здравствуйте, Aleksей! Спецификацию и счет №482 на сумму <strong>$45,000</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! I generated Specification & Invoice #482 for <strong>$45,000</strong>. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ('«Здравствуйте, Aleksей! Спецификацию и счет №482 на сумму <strong>$45.000</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! I generated Specification & Invoice #482 for <strong>$45,000</strong>. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ('НИША: НЕДВИЖИМОСТЬ & ДЕВЕЛОПМЕНТ (ЖК И КП)', 'NICHE: REAL ESTATE & LUXURY DEVELOPMENT', 'SEKTÖR: GAYRİMENKUL & LÜKS KONUT PROJELERİ'),
    ('СТЕК: VOICE AI + AMOCRM + WHATSAPP', 'STACK: VOICE AI + AMOCRM + WHATSAPP', 'ALTYAPI: SESLİ YAPAY ZEKA + CRM + WHATSAPP'),
    ('В архиве висело <strong>3 800 спящих лидов</strong> • Менеджеры саботировали звонки • Бюджет на рекламу рос на 30%', '<strong>3,800 dormant leads</strong> sat in archive • Reps resisted outbound calls • Ad spend climbed +30%', 'Arşivde <strong>3.800 atıl müşteri</strong> bekliyordu • Temsilciler arama yapmıyordu • Reklam bütçesi %30 artıyordu'),
    ('Voice AI обзвонил базу за <strong>48 часов</strong> • <strong>1 558 лидов реактивировано</strong> • <strong>+$75,000 чистой прибыли</strong>', 'Voice AI dialed database in <strong>48 hours</strong> • <strong>1,558 leads reactivated</strong> • <strong>+$75,000 net profit</strong>', 'Sesli AI veritabanını <strong>48 saatte</strong> aradı • <strong>1.558 müşteri canlandırıldı</strong> • <strong>+$75.000 net kâr</strong>'),
    ('Voice AI обзвонил базу за <strong>48 часов</strong> • <strong>1 558 лидов реактивировано</strong> • <strong>+$75.000 чистой прибыли</strong>', 'Voice AI dialed database in <strong>48 hours</strong> • <strong>1,558 leads reactivated</strong> • <strong>+$75,000 net profit</strong>', 'Sesli AI veritabanını <strong>48 saatte</strong> aradı • <strong>1.558 müşteri canlandırıldı</strong> • <strong>+$75.000 net kâr</strong>'),
    ('в сети • WhatsApp Business', 'online • WhatsApp Business', 'çevrimiçi • WhatsApp Business'),
    ('НИША: B2B УСЛУГИ, КОНСАЛТИНГ & АУДИТ', 'NICHE: B2B PROFESSIONAL SERVICES & AUDIT', 'SEKTÖR: B2B DANIŞMANLIK & DENETİM'),
    ('СТЕК: TELEGRAM BOT + AMOCRM + CALENDAR AI', 'STACK: TELEGRAM BOT + AMOCRM + CALENDAR AI', 'ALTYAPI: TELEGRAM BOT + AMOCRM + TAKVİM AI'),
    ('Партнеры тратили <strong>15 часов/нед</strong> на нецелевых клиентов • Долгий цикл согласования слотов (5–7 дней)', 'Senior partners lost <strong>15 hours/wk</strong> to unqualified calls • Booking slots took 5–7 days', 'Ortaklar haftada <strong>15 saat</strong> niteliksiz taleplere harcıyordu • Randevu ayarlama 5-7 gün sürüyordu'),
    ('AI-скоринг 12 параметров • <strong>Время до Zoom: 4 часа</strong> • <strong>+$50,000 выручки</strong>', '12-point AI scoring • <strong>Time to Zoom: 4 hours</strong> • <strong>+$50,000 closed revenue</strong>', '12 parametreli AI skorlama • <strong>Zoom süresi: 4 saat</strong> • <strong>+$50.000 ciro</strong>'),
    ('AI-скоринг 12 параметров • <strong>Время до Zoom: 4 часа</strong> • <strong>+$50.000 выручки</strong>', '12-point AI scoring • <strong>Time to Zoom: 4 hours</strong> • <strong>+$50,000 closed revenue</strong>', '12 parametreli AI skorlama • <strong>Zoom süresi: 4 saat</strong> • <strong>+$50.000 ciro</strong>'),
    ('Instagram Direct & Telegram • Scoring лида', 'Instagram Direct & Telegram • Lead Scoring', 'Instagram Direct & Telegram • Müşteri Skorlama'),
    ('Входящих заявок в месяц:', 'Inbound leads per month:', 'Aylık gelen talep sayısı:'),
    ('100 лидов', '100 leads', '100 talep'),
    ('ИНТЕРАКТИВНЫЙ РЕКРУТЕР', 'INTERACTIVE RECRUITER', 'İNTERAKTİF İŞE ALIM'),
    ('Ваш сотрудник может быть любым', 'Your sales specialist can be tailored to any style', 'Temsilciniz markanıza özel her profilde olabilir'),
    ('Кликните на аватар, чтобы изучить резюме', 'Click on an avatar to explore candidate resume', 'Özgeçmişi incelemek için bir avatara tıklayın'),
    ('Безупречный женский альт, строгий деловой этикет Ritz-Carlton. Идеально закрывает чеки от 500 000 ₽.', 'Flawless executive tone, Ritz-Carlton five-star communication standard. Ideal for closing high-ticket $10k+ deals.', 'Kusursuz iş dili, Ritz-Carlton beş yıldızlı iletişim standardı. Yüksek tutarlı satışları kapatmak için idealdir.'),
    ('Обучена строгим стандартам персонального сервиса на базе Ritz-Carlton.', 'Trained on 5-star concierge and Ritz-Carlton high-touch sales standards.', 'Ritz-Carlton 5 yıldızlı müşteri hizmetleri standartlarında eğitilmiştir.'),
    ('Давайте создадим для вас кастомного <strong class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 font-bold">AI-менеджера</strong> под ваш продукт, интегрируем в CRM и мессенджеры, и проведем тестовый запуск на живом потоке клиентов, чтобы вы увидели рост конверсии в первый же день.', 'Let us build a custom <strong class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 font-bold">AI Sales Executive</strong> tailored to your product catalog, connect it to your CRM and messengers, and launch a live pilot so you see conversion lift on day one.', 'Ürün kataloğunuza özel bir <strong class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 font-bold">AI Satış Temsilcisi</strong> oluşturalım, CRM ve mesajlaşma kanallarınıza entegre edelim ve ilk günden dönüşüm artışını görmeniz için canlı pilot başlatalım.'),
    ('3 дня на настройку', '3-day turnkey setup', '3 günde anahtar teslim kurulum'),
    ('title="Подарок при подключении — worth $500"', 'title="Bonus with setup — worth $500"', 'title="Kurulum hediyesi — $500 değerinde"'),
    ("author: 'Максим (Лид)'", "author: 'Max (Lead)'", "author: 'Max (Talep)'"),
    ("text: 'Добрый день! Интересует подключение ИИ-отдела. Как быстро можно настроить под наши услуги?'", "text: 'Hello! Interested in deploying an AI sales team. How fast can it be configured for our services?'", "text: 'Merhaba! Yapay zeka satış departmanı kurulumuyla ilgileniyorum. Hizmetlerimiz için ne kadar sürede hazır olur?'"),
    ("text: 'Давайте текстом, на встрече сейчас.'", "text: 'Let us chat in text, I am currently in a meeting.'", "text: 'Yazılı devam edelim, şu an toplantıdayım.'"),
    ("text: 'Да, давайте попробуем, отправляйте ссылку.'", "text: 'Yes, let us try it, please send the link.'", "text: 'Evet, deneyelim, lütfen bağlantıyı iletin.'"),
    ("text: 'Видел кнопочных ботов за три копейки. Зачем платить за вашу систему?'", "text: 'I have seen basic button-bots for cheap. Why invest in your enterprise system?'", "text: 'Piyasada basit butonlu botlar var. Neden sizin sisteminize yatırım yapmalıyım?'"),
    ("text: 'То есть скидку вы мне не дадите?)'", "text: 'So you are not offering a discount?)'", "text: 'Yani bana indirim yapmayacak mısınız?)'"),
    ("author: 'Анастасия (Direct)'", "author: 'Anastasia (Direct)'", "author: 'Anastasia (Direct)'"),
    ("text: 'Добрый день! Подскажите, пожалуйста, сколько стоит данное платье?'", "text: 'Hello! Could you please let me know the price of this dress?'", "text: 'Merhaba! Bu elbisenin fiyatını öğrenebilir miyim lütfen?'"),
    ('text: \'Анастасия, добрый день! Благодарю за обращение в нашу компанию, меня зовут Eva ✨<br><br>Стоимость платья составляет 5 000 рублей.<br><br>На данный момент у нас действует экспресс-доставка по городу с примеркой, а также изделие представлено в онлайн-пространствах.<br><br>Направляю ссылки для вашего удобства:<br>• <strong>Lamoda:</strong> <span class="underline decoration-pink-200 font-medium">lamoda.ru/brand/dress</span><br>• <strong>Ozon:</strong> <span class="underline decoration-pink-200 font-medium">ozon.ru/product/dress</span><br><br>Подсказать вам по наличию вашего размера или оформить заказ с доставкой прямо сейчас?\',', 'text: \'Hello Anastasia! Thank you for reaching out, my name is Eva ✨<br><br>The price of the dress is $75.<br><br>We currently offer same-day express delivery with home fitting, and the piece is also available in our official online stores.<br><br>Here are the direct links for your convenience:<br>• <strong>Boutique Store:</strong> <span class="underline decoration-pink-200 font-medium">shop.com/brand/dress</span><br>• <strong>Online Catalog:</strong> <span class="underline decoration-pink-200 font-medium">marketplace.com/product/dress</span><br><br>May I check size availability for you or arrange express delivery right away?\',', 'text: \'Merhaba Anastasia Hanım! Bize ulaştığınız için teşekkürler, ben Eva ✨<br><br>Elbisenin fiyatı $75\'dır.<br><br>Şu anda adrese denemeli hızlı teslimat hizmetimiz bulunmaktadır ve ürün ayrıca online mağazalarımızda mevcuttur.<br><br>Kolaylığınız için bağlantıları iletiyorum:<br>• <strong>Butik Mağaza:</strong> <span class="underline decoration-pink-200 font-medium">magaza.com/marka/elbise</span><br>• <strong>Online Katalog:</strong> <span class="underline decoration-pink-200 font-medium">pazaryeri.com/urun/elbise</span><br><br>Beden durumunu kontrol etmemi veya hemen teslimat oluşturmamı ister misiniz?\','),
    ("text: 'Да, подскажите! На параметры 88-64-92 лучше взять размер S?'", "text: 'Yes please! With measurements 88-64-92 cm, should I take size S?'", "text: 'Evet lütfen! 88-64-92 ölçüler için S beden mi daha uygun olur?'"),
    ("text: 'Анастасия, под ваши параметры идеально подойдет размер S — посадка будет точной и подчеркнет талию. Забронировать его для вас на доставку курьером на завтра?'", "text: 'Anastasia, size S fits your measurements perfectly — it provides a tailored silhouette and accentuates the waistline. Shall I reserve it for courier delivery tomorrow?'", "text: 'Anastasia Hanım, ölçüleriniz için S beden mükemmel uyum sağlayacaktır. Yarın kurye teslimatı için hemen ayıralım mı?'"),
    ("document.getElementById('agentStatus').textContent = 'сделка закрыта ✓';", "document.getElementById('agentStatus').textContent = 'deal closed ✓';", "document.getElementById('agentStatus').textContent = 'satış kazanıldı ✓';"),
    ("status.textContent = 'Eva печатает ответ...';", "status.textContent = 'Eva is typing a response...';", "status.textContent = 'Eva yanıt yazıyor...';"),
    ("typing.textContent = 'Обработка намерения лида (0.8c)...';", "typing.textContent = 'Processing lead intent (0.8s)...';", "typing.textContent = 'Talep niyeti işleniyor (0.8 sn)...';"),
    ("typing.textContent = 'Клиент пишет ответ...';", "typing.textContent = 'Client is typing a reply...';", "typing.textContent = 'Müşteri yanıt yazıyor...';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 1 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 1 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 1 tanesi dolduruldu';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 2 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 2 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 2 tanesi dolduruldu';"),
    ("posEl.textContent = 'Коммерческий директор (ЛПР)';", "posEl.textContent = 'Chief Commercial Officer (Decision Maker)';", "posEl.textContent = 'Ticari Direktör (Karar Verici)';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 3 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 3 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 3 tanesi dolduruldu';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 4 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 4 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 4 tanesi dolduruldu';"),
    ("compEl.textContent = 'ПромСтройХолдинг ООО';", "compEl.textContent = 'PromStroyHolding LLC';", "compEl.textContent = 'PromStroyHolding A.Ş.';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 5 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 5 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 5 tanesi dolduruldu';"),
    ("indEl.textContent = 'Оптовые поставки металлопроката';", "indEl.textContent = 'Wholesale Metals & Construction Supplies';", "indEl.textContent = 'Toptan Metal ve İnşaat Tedariği';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 6 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 6 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 6 tanesi dolduruldu';"),
    ("cityEl.textContent = 'Москва, ЦФО';", "cityEl.textContent = 'New York, USA';", "cityEl.textContent = 'İstanbul, TR';"),
    ("if (counterEl) counterEl.textContent = 'Заполнено 7 из 8 обязательных полей';", "if (counterEl) counterEl.textContent = 'Completed 7 of 8 required fields';", "if (counterEl) counterEl.textContent = '8 zorunlu alandan 7 tanesi dolduruldu';"),
    ('КП отправлено • Ждем оплату', 'Quote Delivered • Awaiting Payment', 'Teklif İletildi • Ödeme Bekleniyor'),
    ("counterEl.textContent = 'Все 8 обязательных полей заполнены на 100%';", "counterEl.textContent = 'All 8 required fields 100% completed';", "counterEl.textContent = '8 zorunlu alanın tamamı %100 dolduruldu';"),
    ('Анализ диалога в переписке...', 'Analyzing conversation transcript...', 'Diyalog dökümü analiz ediliyor...'),
    ("voiceBadge: 'ГОЛОС: СИНТЕЗ HD',", "voiceBadge: 'VOICE: NEURAL HD SYNTHESIS',", "voiceBadge: 'SES: HD YAPAY ZEKA SENTEZİ',"),
    ('AI Altai Optima (1С:УТ)', 'AI Altai Optima (ERP API)', 'AI Altai Optima (ERP API)'),
    ("authorAvatar: 'ЕБ'", "authorAvatar: 'EB'", "authorAvatar: 'EB'"),
    ('Eто дало нам', 'It gave us', 'Bu bize sağladı'),
    ('<strong class="text-purple-700 font-bold">Уснувшие контакты возвращаются в диалог</strong> через деликатные персонализированные офферы. AI не спамит, а решает актуальную задачу клиента.', '<strong class="text-purple-700 font-bold">Dormant contacts re-engage in dialogue</strong> through delicate, highly personalized offers. AI provides real value without spamming.', '<strong class="text-purple-700 font-bold">Uyuyan kontaklar diyaloğa geri döner</strong>; kişiselleştirilmiş zarif tekliflerle. AI spam yapmaz, müşterinin sorununu çözer.'),
    ('Система протоколирует договоренности, выставляет счета и <strong class="text-sky-700 font-bold">автоматически переводит сделку на этап «Оплачено»</strong> после банковского подтверждения.', 'The system records agreements, issues invoices, and <strong class="text-sky-700 font-bold">automatically transitions deals to "Closed Won"</strong> upon bank confirmation.', 'Sistem anlaşmaları belgeler, fatura düzenler ve banka onayından sonra <strong class="text-sky-700 font-bold">satışı otomatik "Kazanıldı" aşamasına geçirir</strong>.'),
    ('Э', 'E', 'E'),
    ('1 день вместо 8 дней', '1 day instead of 8 days', '8 gün yerine 1 gün'),
    ('За счет скорости КП', 'Due to fast quotation', 'Hızlı teklif sayesinde'),
    ('11 ДНЕЙ', '11 DAYS', '11 GÜN'),
    ('С первых 4 сделок', 'From first 4 closed deals', 'İlk 4 anlaşmadan'),
    ('С первых 4 закрытых сделок', 'From first 4 closed deals', 'İlk 4 anlaşmadan'),
    ('Сметы собирались <strong>3–4 дня</strong> в Excel • <strong>38% клиентов уходили</strong> к конкурентам • Менеджеры перегружены рутиной', 'Quotes took <strong>3–4 days</strong> in Excel • <strong>38% of leads lost</strong> to competitors • Reps swamped by routine', "Teklifler Excel'de <strong>3–4 gün</strong> alıyordu • <strong>Müşterilerin %38'i</strong> rakiplere gidiyordu • Temsilciler boğuluyordu"),
    ('КП формируется <strong>за 15 секунд</strong> • Сделка в <strong>8 раз быстрее</strong> • <strong>+$110,000 в месяц</strong> чистой выручки', 'Quotes created in <strong>15 seconds</strong> • Deals closed <strong>8x faster</strong> • <strong>+$110,000/mo</strong> net profit', 'Teklif <strong>15 saniyede</strong> hazır • Anlaşma <strong>8 kat daha hızlı</strong> • <strong>+$110.000/ay</strong> net ciro'),
    ('КП формируется <strong>за 15 секунд</strong> • Сделка в <strong>8 раз быстрее</strong> • <strong>+10.4M ₽ в месяц</strong> чистой выручки', 'Quotes created in <strong>15 seconds</strong> • Deals closed <strong>8x faster</strong> • <strong>+$110,000/mo</strong> net profit', 'Teklif <strong>15 saniyede</strong> hazır • Anlaşma <strong>8 kat daha hızlı</strong> • <strong>+$110.000/ay</strong> net ciro'),
    ('Стало:', 'After:', 'Sonra:'),
    ('МВ', 'MV', 'MV'),
    ('Михаил Воронов', 'Michael Voronov', 'Michael Voronov'),
    ('Генеральный директор и основатель', 'CEO & Founder', 'Genel Müdür ve Kurucu'),
    ('«Раньше менеджеры вручную сводили спецификации по 3–4 дня в Excel, из-за чего 38% горячих заявок уходили к более быстрым конкурентам. После внедрения Altai Optima расчет из 4 000 позиций формируется в 1С за 15 секунд и моментально улетает в Telegram клиенту. В первый же месяц получили +10.4M ₽ чистой выручки.»', '"Previously, sales reps took 3–4 days to manually prepare specifications in Excel, causing 38% of hot leads to buy from competitors. After deploying Altai Optima, calculations of 4,000 SKUs are generated in ERP in 15 seconds and instantly sent to Telegram. In month one, net revenue grew by +$110,000."', '"Eskiden temsilciler Excel\'de 3–4 günde şartname hazırlıyordu ve sıcak taleplerin %38\'i rakiplere kaçıyordu. Altai Optima sonrası 4.000 kalemlik şartname ERP ile 15 saniyede üretilip Telegram\'dan iletiliyor. İlk ayda +$110.000 net ciro sağladık."'),
    ('«Раньше менеджеры вручную сводили спецификации по 3–4 дня в Excel, из-за чего %38 горячих заявок уходили к более быстрым конкурентам. После внедрения Altai Optima расчет из 4 000 позиций формируется в 1С за 15 секунд и моментально улетает в Telegram клиенту. В первый же месяц получили +10.4M ₽ чистой выручки.»', '"Previously, sales reps took 3–4 days to manually prepare specifications in Excel, causing 38% of hot leads to buy from competitors. After deploying Altai Optima, calculations of 4,000 SKUs are generated in ERP in 15 seconds and instantly sent to Telegram. In month one, net revenue grew by +$110,000."', '"Eskiden temsilciler Excel\'de 3–4 günde şartname hazırlıyordu ve sıcak taleplerin %38\'i rakiplere kaçıyordu. Altai Optima sonrası 4.000 kalemlik şartname ERP ile 15 saniyede üretilip Telegram\'dan iletiliyor. İlk ayda +$110.000 net ciro sağladık."'),
    ('TELEGRAM + 1С + БИТРИКС24', 'TELEGRAM + ERP + CRM', 'TELEGRAM + ERP + CRM'),
    ('Сколько чистой прибыли принесет', 'How much net revenue will', 'Otonom satış departmanı'),
    ('автономный отдел продаж?', 'autonomous AI sales generate?', 'ne kadar net kâr getirecek?'),
    ("ready: 'Готова приступить мгновенно'", "ready: 'Ready to deploy immediately'", "ready: 'Anında göreve hazır'"),
    ("ready: 'Готов приступить мгновенно'", "ready: 'Ready to deploy immediately'", "ready: 'Anında göreve hazır'"),
    ("companyLogo: 'ПС'", "companyLogo: 'PS'", "companyLogo: 'PS'"),
    ("companyName: 'ООО «ПромСталь Холдинг»'", "companyName: 'PromSteel Holding LLC'", "companyName: 'PromSteel Holding A.Ş.'"),
    ("companyNiche: 'B2B Металлопрокат & Трубная продукция • Оборот 920M ₽/год'", "companyNiche: 'B2B Industrial Steel & Pipes • $10M/yr ARR'", "companyNiche: 'B2B Endüstriyel Çelik & Boru • Yıllık $10M Ciro'"),
    ("nicheTag: 'НИША: B2B ОПТ И СТРОИТЕЛЬНЫЕ ПОСТАВКИ'", "nicheTag: 'NICHE: B2B WHOLESALE & INDUSTRIAL SUPPLY'", "nicheTag: 'SEKTÖR: B2B TOPTAN VE SANAYİ TEDARİĞİ'"),
    ("stackTag: 'СТЕК: БИТРИКС24 + TELEGRAM API + 1С'", "stackTag: 'STACK: BITRIX24 CRM + TELEGRAM API + ERP'", "stackTag: 'ALTYAPI: BITRIX24 CRM + TELEGRAM API + ERP'"),
    ("revenueNote: 'В ПЕРВЫЙ МЕСЯЦ ВНЕДРЕНИЯ'", "revenueNote: 'FIRST MONTH OF IMPLEMENTATION'", "revenueNote: 'UYGULAMANIN İLK AYINDA'"),
    ("liveTag: 'TELEGRAM + 1С + БИТРИКС24'", "liveTag: 'TELEGRAM + ERP + CRM'", "liveTag: 'TELEGRAM + ERP + CRM'"),
    ("leftTitle: 'Telegram Desktop • Заказчик @metall_stroy'", "leftTitle: 'Telegram Desktop • Buyer @metall_stroy'", "leftTitle: 'Telegram Desktop • Müşteri @metall_stroy'"),
    ('>Чаты<', '>Chats<', '>Sohbetler<'),
    ('>МС<', '>MS<', '>MS<'),
    ('МеталлСтрой Холдинг (Aleksей)', 'MetallStroy Holding (Alex)', 'MetallStroy Holding (Alex)'),
    ('МеталлСтрой Холдинг (Алексей)', 'MetallStroy Holding (Alex)', 'MetallStroy Holding (Alex)'),
    ('в сети • Telegram Desktop', 'online • Telegram Desktop', 'çevrimiçi • Telegram Desktop'),
    ('СЕГОДНЯ, 14:02', 'TODAY, 14:02', 'BUGÜN, 14:02'),
    ('Aleksей (Закупки)', 'Alex (Procurement)', 'Alex (Satınalma)'),
    ('Алексей (Закупки)', 'Alex (Procurement)', 'Alex (Satınalma)'),
    ('«Добрый день! Нужна арматура А500С 12мм — 45 тонн и балка 20Б1 — 18 тонн с доставкой в Новую Москву. Скиньте счет и сроки.»', '"Hello! We need 45 tons of A500C 12mm rebar and 18 tons of 20B1 I-beam delivered to site. Please send invoice and schedule."', '"Merhaba! 45 ton A500C 12mm demir ve 18 ton 20B1 profil ihtiyacımız var. Fatura ve teslimat süresini iletir misiniz?"'),
    ('«Здравствуйте, Aleksей! Спецификацию и счет №482 на сумму <strong>$45,000</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! I generated Specification & Invoice #482 for <strong>$45,000</strong>. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ('«Здравствуйте, Алексей! Спецификацию и счет №482 на сумму <strong>$45,000</strong> сформировал. При оплате до 17:00 отгрузим со склада завтра в 09:00.»', '"Hello Alex! I generated Specification & Invoice #482 for <strong>$45,000</strong>. Upon payment before 5:00 PM, warehouse shipment departs tomorrow at 9:00 AM."', '"Merhaba Alex Bey! <strong>$45.000</strong> tutarındaki #482 nolu şartname ve faturayı oluşturdum. Saat 17:00ye kadar ödemede yarın 09:00da sevk ediyoruz."'),
    ('Счет_Спецификация_482_1С.pdf', 'Invoice_Specification_482_ERP.pdf', 'Fatura_Sartname_482_ERP.pdf'),
    ('1.4 MB • 4 120 позиций сверено в 1С', '1.4 MB • 4,120 items verified in ERP', '1.4 MB • 4.120 kalem ERP ile doğrulandı'),
    ('«Счет передал в бухгалтерию на оплату, резервируйте 45 тонн.»', '"Invoice sent to accounting for payment, please reserve the 45 tons."', '"Faturayı muhasebeye ilettim, lütfen 45 tonu rezerve edin."'),
    ("rightTitle: 'Битрикс24 CRM • Сделка #4892'", "rightTitle: 'Bitrix24 CRM • Deal #4892'", "rightTitle: 'Bitrix24 CRM • Satış #4892'"),
    ("rightBadge: 'БИТРИКС24 + 1С'", "rightBadge: 'BITRIX24 CRM + ERP'", "rightBadge: 'BITRIX24 CRM + ERP'"),
    ('>Битрикс<', '>Bitrix<', '>Bitrix<'),
    ('искать сделку, 1С...', 'search deal, ERP...', 'fırsat ara, ERP...'),
    ('>МО<', '>MO<', '>MO<'),
    ("review: '«База из 3 800 старых лидов просто лежала мертвым грузом — брокеры не успевали их прозванивать. AI-ассистент за один вечер поднял контакты в WhatsApp, выявил реальный интерес и назначил 42 показа на объекте. Система полностью окупилась с первой же комиссии загородного дома.»'", "review: 'A database of 3,800 stale leads was sitting idle — brokers did not have time to call them. In one evening, Voice AI engaged contacts on WhatsApp, uncovered genuine intent, and booked 42 on-site tours. Full ROI achieved with the first estate commission.'", "review: '3.800 eski müşterilik liste atıl bekliyordu; brokerların arayacak zamanı yoktu. Yapay zeka bir akşamda WhatsApp üzerinden iletişime geçti, gerçek ilgiyi tespit etti ve 42 saha randevusu oluşturdu. İlk villa satış komisyonuyla tüm yatırım amorti edildi.'"),
    ("summaryB: 'Voice AI обзвонил базу за <strong>48 часов</strong> • <strong>1 558 лидов реактивировано</strong> • <strong>+$75,000 чистой прибыли</strong>'", "summaryB: 'Voice AI dialed database in <strong>48 hours</strong> • <strong>1,558 leads reactivated</strong> • <strong>+$75,000 net profit</strong>'", "summaryB: 'Sesli AI veritabanını <strong>48 saatte</strong> aradı • <strong>1.558 müşteri canlandırıldı</strong> • <strong>+$75.000 net kâr</strong>'"),
    ("summaryB: 'AI-скоринг 12 параметров • <strong>Время до Zoom: 4 часа</strong> • <strong>+$50,000 выручки</strong>'", "summaryB: '12-parameter AI scoring • <strong>Time to Zoom: 4 hours</strong> • <strong>+$50,000 closed revenue</strong>'", "summaryB: '12 parametreli AI skorlama • <strong>Zoom süresi: 4 saat</strong> • <strong>+$50.000 ciro</strong>'"),
    ("review: '«45% обращений с Avito падали ночью и на выходных, когда отдел продаж спал. Клиенты успевали оставить заявки у пяти других дилеров. Робот отвечает за 1.2 секунды, считает лизинг через 1С и записывает на тест-драйв на площадку. Это дало нам +$90,000 дополнительных продаж в месяц.»'", "review: '45% of marketplace inquiries arrived at night and weekends when reps were offline. Buyers contacted five other dealers. AI replies in 1.2 seconds, calculates leasing via ERP, and books lot test-drives. It generated +$90,000/mo in additional sales.'", "review: 'Pazar yeri taleplerinin %45i gece ve hafta sonlarında geliyordu. AI 1.2 saniyede yanıt veriyor, ERP ile leasing hesaplıyor ve test sürüşü randevusu alıyor. Bu bize ayda +$90.000 ek satış getirdi.'"),
    ("summaryA: '<strong>45% заявок с Avito</strong> приходили ночью и сгорали • Менеджеры тратили до 40 мин на сбор параметров лизинга'", "summaryA: '<strong>45% of incoming inquiries</strong> arrived after hours • Reps spent up to 40 min collecting leasing terms'", "summaryA: '<strong>Taleplerin %45i</strong> mesai dışı gelip kayboluyordu • Temsilciler leasing için 40 dk harcıyordu'"),
    ("review: '«Партнеры с высоким чеком тратили до 15 часов в неделю на пустые квалификационные созвоны. AI проводит интеллектуальный скоринг по 12 критериям за 20 секунд прямо в мессенджере и ставит в Google Calendar только целевых клиентов с крупным оборотом. Время закрытия сделки сократилось в разы.»'", "review: 'Senior partners spent up to 15 hours a week on unvetted discovery calls. AI scores 12 criteria in 20 seconds inside chat and books qualified corporate clients into Google Calendar. Sales cycle was shortened dramatically.'", "review: 'Kıdemli ortaklar haftada 15 saatini niteliksiz ön görüşmelere harcıyordu. AI mesajlaşmada 20 saniyede 12 kriterli skorlama yapıyor ve sadece kurumsal alıcıları Google Takvime ekliyor. Satış süresi katbekat kısaldı.'"),
    # AmoCRM details
    ('counterEl.textContent = \'Заполнено 0 из 8 обязательных полей\';', 'counterEl.textContent = \'Completed 0 of 8 required fields\';', 'counterEl.textContent = \'8 zorunlu alandan 0 tanesi dolduruldu\';'),
    ('counterEl.textContent = `Заполнено ${count} из 8 обязательных полей`;', 'counterEl.textContent = `Completed ${count} of 8 required fields`;', 'counterEl.textContent = `8 zorunlu alandan ${count} tanesi dolduruldu`;'),
    ('Пользовательское с...', 'Custom fields...', 'Özel alanlar...'),
    ('КОМПАНИЯ', 'COMPANY', 'ŞİRKET'),
    ('Тестовая компания', 'Demo Enterprise LLC', 'Örnek Şirket A.Ş.'),
    ('Сфера / Web', 'Industry / Web', 'Sektör / Web'),
    ('Адрес', 'Address', 'Adres'),
    ('г. Москва, Пресненская наб. 12', '100 Wall Street, Suite 1400', 'Büyükdere Cad. No:199, Levent'),
    ('Производство и дистрибуция', 'Manufacturing & Distribution', 'Üretim ve Dağıtım'),
    ('КОНТАКТ', 'CONTACT', 'İLETİŞİM'),
    ('Рабочий email', 'Work Email', 'İş E-postası'),
    ('Основной телефон', 'Main Phone', 'Ana Telefon'),
    ('Доп. телефон', 'Direct Line', 'Dahili Telefon'),
    ('ПРИМЕЧАНИЕ', 'NOTE', 'NOT'),
    ('Лид квалифицирован AI. Готов к коммерческому предложению.', 'Lead qualified by AI. Ready for custom enterprise quotation.', 'Talep AI tarafından nitelendirildi. Teklife hazır.'),
    ('ПОСЛЕДНИЕ ДЕЙСТВИЯ', 'RECENT ACTIVITY', 'SON İŞLEMLER'),
    ('Счет отправлен клиенту', 'Invoice delivered to client', 'Fatura müşteriye iletildi'),
    ('КП сформировано в 1С', 'Quote generated in ERP', 'Teklif ERP üzerinde oluşturuldu'),
    ('Первичный скоринг пройден', 'Initial qualification verified', 'Ön skorlama tamamlandı'),
    ('Захват контакта из чата', 'Lead captured from chat', 'Talep mesajlaşmadan alındı'),

    # Interactive Personas Data Strings
    ('Эва — ведущий AI-консультант', 'Eva — Senior AI Sales Consultant', 'Eva — Kıdemli AI Satış Danışmanı'),
    ('Александр — B2B переговорщик', 'Alexander — B2B Key Account Closer', 'Alexander — B2B Satış Yöneticisi'),
    ('Дарья — эксперт по недвижимости', 'Daria — Real Estate & Property Expert', 'Daria — Gayrimenkul Satış Uzmanı'),
    ('Руслан — авто и спецтехника', 'Ruslan — Automotive & Equipment Expert', 'Ruslan — Ticari Araç & Filo Uzmanı'),
    ('Мэй — международная торговля', 'Mei — International Trade & Supply', 'Mei — Uluslararası Ticaret Uzmanı'),
    ('Марк — финансовые услуги', 'Mark — Financial & Fintech Services', 'Mark — Finans & Fintech Danışmanı'),
    ('Амина — медицина и эстетика', 'Amina — Medical & Aesthetics Expert', 'Amina — Medikal & Sağlık Hizmetleri Uzmanı'),
    ('Денис — IT и SaaS решения', 'Denis — IT & SaaS Sales Specialist', 'Denis — IT & SaaS Satış Uzmanı'),
    ('Кенджи — e-commerce & retail', 'Kenji — E-commerce & Retail Growth', 'Kenji — E-ticaret & Perakende Büyüme Uzmanı'),
    ('Елена — юридический сектор', 'Elena — Legal & Corporate Consulting', 'Elena — Kurumsal Hukuk & Danışmanlık Uzmanı'),
    ('Ведущий AI-консультант', 'Senior AI Sales Consultant', 'Kıdemli AI Satış Danışmanı'),
    ('B2B переговорщик', 'B2B Key Account Closer', 'B2B Satış Yöneticisi'),
    ('эксперт по недвижимости', 'Real Estate & Property Expert', 'Gayrimenkul Satış Uzmanı'),
    ('авто и спецтехника', 'Automotive & Equipment Expert', 'Ticari Araç & Filo Uzmanı'),
    ('международная торговля', 'International Trade & Supply', 'Uluslararası Ticaret Uzmanı'),
    ('финансовые услуги', 'Financial & Fintech Services', 'Finans & Fintech Danışmanı'),
    ('медицина и эстетика', 'Medical & Aesthetics Expert', 'Medikal & Sağlık Hizmetleri Uzmanı'),
    ('IT и SaaS решения', 'IT & SaaS Sales Specialist', 'IT & SaaS Satış Uzmanı'),
    ('e-commerce & retail', 'E-commerce & Retail Growth', 'E-ticaret & Perakende Büyüme Uzmanı'),
    ('юридический сектор', 'Legal & Corporate Consulting', 'Kurumsal Hukuk & Danışmanlık Uzmanı'),

    # Cases Data
    ("companyName: 'Торговый дом «ПромМеталл»'", "companyName: 'PromMetall Commercial Trading'", "companyName: 'PromMetall Ticaret A.Ş.'"),
    ("companyNiche: 'Оптовые поставки металлопроката и труб • Оборот 850M ₽/год'", "companyNiche: 'Wholesale Steel & Industrial Components • $10M/yr ARR'", "companyNiche: 'Toptan Metal, Çelik ve Boru Tedariği • Yıllık $10M Ciro'"),
    ("authorName: 'Игорь Васильев'", "authorName: 'Igor Vasiliev'", "authorName: 'Igor Vasiliev'"),
    ("authorRole: 'Генеральный директор и соучредитель'", "authorRole: 'CEO & Co-Founder'", "authorRole: 'Genel Müdür ve Kurucu Ortak'"),
    ("companyName: 'Девелоперская группа «Skyline Estate»'", "companyName: 'Skyline Estate Development Group'", "companyName: 'Skyline Estate Geliştirme Grubu'"),
    ("companyNiche: 'Загородные поселки & Клубные резиденции • Оборот 1.4B ₽/год'", "companyNiche: 'Luxury Estates & Private Residences • $15M/yr ARR'", "companyNiche: 'Lüks Villalar & Özel Rezidanslar • Yıllık $15M Ciro'"),
    ("authorName: 'Екатерина Белова'", "authorName: 'Ekaterina Belova'", "authorName: 'Ekaterina Belova'"),
    ("authorRole: 'Коммерческий директор девелопера'", "authorRole: 'Chief Commercial Officer'", "authorRole: 'Ticari Direktör'"),
    ("companyName: 'Автохолдинг «Трак-Трейд»'", "companyName: 'Truck-Trade Commercial Vehicles'", "companyName: 'Truck-Trade Ticari Araç Filosu'"),
    ("companyNiche: 'Дилер коммерческого и грузового автотранспорта • Оборот 2.1B ₽/год'", "companyNiche: 'Commercial Trucks & Fleet Dealership • $22M/yr ARR'", "companyNiche: 'Ticari Araç ve Kamyon Distribütörlüğü • Yıllık $22M Ciro'"),
    ("authorName: 'Denis Самойлов'", "authorName: 'Denis Samoilov'", "authorName: 'Denis Samoilov'"),
    ("authorName: 'Денис Самойлов'", "authorName: 'Denis Samoilov'", "authorName: 'Denis Samoilov'"),
    ("authorRole: 'Директор по развитию дилерской сети'", "authorRole: 'Director of Dealer Network Growth'", "authorRole: 'Bayi Ağı Geliştirme Direktörü'"),
    ("companyName: 'Юридическое бюро «Вершинин & Партнеры»'", "companyName: 'Vershinin & Partners Legal Group'", "companyName: 'Vershinin & Partners Hukuk Danışmanlığı'"),
    ("companyNiche: 'Налоговый консалтинг & Аудит холдингов • Оборот 450M ₽/год'", "companyNiche: 'Tax Consulting & Corporate Auditing • $5M/yr ARR'", "companyNiche: 'Vergi Danışmanlığı & Kurumsal Denetim • Yıllık $5M Ciro'"),
    ("authorRole: 'Управляющий партнер и CEO'", "authorRole: 'Managing Partner & CEO'", "authorRole: 'Yönetici Ortak & CEO'"),
    ("authorName: 'Сергей Вершинин'", "authorName: 'Sergey Vershinin'", "authorName: 'Sergey Vershinin'"),

    # Micro dialogue strings in cases
    ('<span>Михаил Aleksандрович (КП Резиденция)</span>', '<span>Michael Anderson (Residence Park)</span>', '<span>Michael Anderson (Residence Park)</span>'),
    ('<span>Михаил Александрович (КП Резиденция)</span>', '<span>Michael Anderson (Residence Park)</span>', '<span>Michael Anderson (Residence Park)</span>'),
    ('Запись звонка: Voice AI Altai Optima', 'Call Recording: Voice AI Altai Optima', 'Ses Kaydı: Sesli AI Altai Optima'),
    ('РАСПОЗНАНО 99.4%', 'RECOGNITION 99.4%', 'DOĞRULUK %99.4'),
    ('>Слушать<', '>Play<', '>Dinle<'),
    ('«Михаил, добрый день! Открыли продажи 2-й очереди КП "Лесная Резиденция" с выгодой 12%. Отправляю генплан в WhatsApp?»', '\"Hello Michael! We launched Phase 2 sales for Forest Residence with an early 12% benefit. May I send the master plan to your WhatsApp?\"', '\"Merhaba Michael Bey! Orman Rezidansı 2. etap satışlarını %12 avantajla açtık. Kat planlarını WhatsApp üzerinden iletebilir miyim?\"'),
    ('«Михаил, закрепил за вами просмотр коттеджа: <strong>Суббота, 12:00</strong>. Персональный пропуск на КП оформил, генплан и планировки 2-й очереди прикрепил ниже 📍»', '\"Michael, I booked your private villa viewing: <strong>Saturday, 12:00 PM</strong>. Your guest access pass is registered, master plan and layouts are attached below 📍\"', '\"Michael Bey, villa inceleme randevunuzu aldım: <strong>Cumartesi 12:00</strong>. Ziyaretçi kartınızı oluşturdum, kat planlarını aşağıya ekledim 📍\"'),
    ('Сообщение...', 'Message...', 'Mesaj yazın...'),
    ('>РОП<', '>VP<', '>MD<'),
    ('ПРОСМОТР НАЗНАЧЕН', 'VIEWING BOOKED', 'RANDEVU ALINDI'),
    ('Суббота, 12:00', 'Saturday, 12:00 PM', 'Cumartesi, 12:00'),
    ('#РЕАКТИВАЦИЯ_41%', '#REACTIVATION_41%', '#CANLANDIRMA_%41'),
    ('#WHATSAPP_ГЕНПЛАН', '#WHATSAPP_MASTERPLAN', '#WHATSAPP_KATPLANI'),
    ('В наличии 4 шт. с ЭПТС', '4 units in stock • Title ready', 'Stokta 4 adet hazır'),
    ('«Седельный тягач Sitrak C7H в наличии? Какой аванс и ежемесячный платеж по лизингу на 3 года?»', '\"Is the Sitrak C7H commercial truck in stock? What is the down payment and monthly leasing fee for 3 years?\"', '\"Sitrak C7H ticari çekici stokta var mı? 3 yıllık leasing için peşinat ve aylık ödeme ne kadar?\"'),
    ('«В наличии 4 тягача 2024 г. на стоянке Север. При авансе 15% (2 220 000 ₽) платеж: <strong>218 000 ₽/мес</strong> с субсидией. Забронировать показ на площадке завтра в 11:00?»', '\"We have 4 units (2024) in stock at the North Lot. With 15% down payment ($25,000), monthly installment is <strong>$2,450/mo</strong> subsidized. Reserve a private inspection tomorrow at 11:00 AM?\"', '\"Kuzey park alanında 2024 model 4 araç hazır. %15 peşinatla aylık taksit: <strong>$2.450/ay</strong>. Yarın saat 11:00 için araç başı inceleme randevusu ayıralım mı?\"'),
    ('Где посмотреть?', 'Where to inspect?', 'Nerede görebilirim?'),
    ('График лизинга', 'Leasing terms', 'Leasing planı'),
    ('В наличии?', 'In stock?', 'Stokta var mı?'),
    ('БРОНЬ НА ТЕСТ', 'TEST-DRIVE BOOKED', 'TEST SÜRÜŞÜ AYRILDI'),
    ('Завтра, 11:00', 'Tomorrow, 11:00 AM', 'Yarın, 11:00'),
    ('Локация: Стоянка Север (бокс №4) • Менеджер площадки уведомлен в Telegram.', 'Location: North Lot (Bay #4) • Lot manager notified via Telegram.', 'Konum: Kuzey Parkı (Peron No:4) • Saha yöneticisi Telegram üzerinden bilgilendirildi.'),
    ('12 из 12 параметров', '12 of 12 Criteria Met', '12 Kriterin 12\'si Karşılandı'),
    ('Синхронизировано ✓', 'Synchronized ✓', 'Senkronize Edildi ✓'),
    ('Заявка отправляется...', 'Submitting request...', 'Talebiniz iletiliyor...'),
    ('Написать сообщение...', 'Type a message...', 'Bir mesaj yazın...'),
    ('02. Скоринг 12/12 ✓', '02. Scoring 12/12 ✓', '02. 12/12 Skorlama ✓'),
    ('03. Zoom Чт 15:00', '03. Zoom Thu 15:00', '03. Zoom Perş 15:00'),
    ('04. Договор 750k', '04. Contract $10k', '04. Sözleşme $10k'),
    ('ЧЕК ПРОЕКТА:', 'PROJECT VALUE:', 'PROJE BEDELİ:'),
    ('СКОРИНГ AI:', 'AI SCORING:', 'AI SKORLAMASI:'),
    ('12 из 12 параметров', '12 of 12 criteria', '12 üzerinden 12 kriter'),
    ('ОБОРОТ БИЗНЕСА:', 'ANNUAL REVENUE:', 'ŞİRKET CİROSU:'),
    ('800 000 000 ₽ (Холдинг)', '$10,000,000+ (Holding)', '$10.000.000+ (Holding)'),
    ('СЛОТ CALENDAR:', 'CALENDAR SLOT:', 'TAKVİM RANDEVUSU:'),
    ('Чт, 15:00 – 15:45', 'Thu, 15:00 – 15:45', 'Perş, 15:00 – 15:45'),
    ('Ссылка Zoom: <span class="font-mono text-sky-700 font-bold">zoom.us/j/94821034...</span> • Бриф рисков отправлен в календарь партнера.', 'Zoom Link: <span class="font-mono text-sky-700 font-bold">zoom.us/j/94821034...</span> • Risk brief delivered to partner calendar.', 'Zoom Bağlantısı: <span class="font-mono text-sky-700 font-bold">zoom.us/j/94821034...</span> • Risk analiz özeti yönetici takvimine eklendi.'),
    ('⚡ Итог: квалифицированный лид с оборотом 800M ₽ поставлен в календарь партнера за 3 минуты.', '⚡ Result: qualified enterprise lead ($10M+ revenue) booked directly into partner calendar in 3 minutes.', '⚡ Sonuç: $10M+ cirolu nitelikli kurumsal müşteri 3 dakikada yönetici takvimine randevu olarak eklendi.'),
    ('Оптовый поставщик металлопроката и комплектующих', 'Wholesale Supplier of Industrial Metals and Hardware', 'Toptan Metal, Boru ve Profil Tedarikçisi'),
    ('Автоматизация расчета спецификаций из 4 000+ позиций и моментальный дожим в Telegram', 'Automating multi-item spec calculations from 4,000+ SKUs & instant Telegram closing', '4.000+ kalemlik şartname hesaplamasının otomasyonu ve Telegram üzerinden anında satış'),
    ('Федеральный девелопер премиальных коттеджных поселков', 'Developer of Premium Gated Residential Communities', 'Premium Konut ve Rezidans Projeleri Geliştiricisi'),
    ('Реактивация 3 800 спящих лидов из архива CRM и автоматическая запись на просмотры', 'Reactivation of 3,800 dormant CRM leads & autonomous booking of on-site viewings', 'CRM arşivindeki 3.800 uyuyan müşterinin canlandırılması ve otomatik randevu kaydı'),
    ('Федеральный дилер грузовой и специальной техники', 'Commercial Truck & Heavy Equipment Dealership', 'Ticari Kamyon ve Ağır Vasıta Distribütörü'),
    ('Обработка ночных заявок с Avito за 1.2 секунды и расчет лизинга онлайн', '1.2s response to off-hours inquiries & real-time leasing calculations', 'Mesai dışı taleplere 1.2 saniyede yanıt ve online leasing hesaplaması'),
    ('Юридический консалтинг и налоговый аудит бизнеса', 'Corporate Legal Consulting & Enterprise Tax Audit', 'Kurumsal Hukuk Danışmanlığı ve Vergi Denetimi'),
    ('Интеллектуальный скоринг входящих заявок и автоматическая запись к экспертам', 'Intelligent lead qualification & automated consultation scheduling with partners', 'Gelen taleplerin akıllı skorlaması ve uzmanlarla otomatik takvim eşleşmesi'),
    ('ЧИСТАЯ ВЫГОДА', 'NET REVENUE GAIN', 'NET KÂR ARTIŞI'),
    ('В первый месяц внедрения', 'In the first month of deployment', 'Uygulamanın ilk ayında'),
    ('ОКУПАЕМОСТЬ: 12 ДНЕЙ', 'ROI: 12 DAYS', 'GERİ DÖNÜŞ: 12 GÜN'),
    ('СКОРОСТЬ РАСЧЕТА', 'CALCULATION SPEED', 'HESAPLAMA HIZI'),
    ('15 СЕКУНД', '15 SECONDS', '15 SANİYE'),
    ('Вместо 3–4 дней в Excel', 'Down from 3-4 days in spreadsheets', 'Excel\'deki 3-4 gün yerine'),
    ('ЦИКЛ СДЕЛКИ', 'DEAL CYCLE', 'SATIŞ SÜRESİ'),
    ('В 8 РАЗ БЫСТРЕЕ', '8X FASTER', '8 KAT DAHA HIZLI'),
    ('С 14 дней до 1.5 суток', 'From 14 days down to 36 hours', '14 günden 36 saate'),
    ('КОНВЕРСИЯ В ОПЛАТУ', 'CLOSING CONVERSION', 'ÖDEME DÖNÜŞÜMÜ'),
    ('42% В СЧЕТ', '42% PAID', '%42 TAHSİLAT'),
    ('Было 18% с долгим циклом', 'Previously 18% with delayed quotes', 'Eski oran: %18'),
    ('ДО ВНЕДРЕНИЯ:', 'BEFORE AI:', 'ÖNCESİ:'),
    ('Менеджеры вручную перебивали номенклатуру из PDF в Excel', 'Sales reps manually transcribed PDF specs into spreadsheets', 'Temsilciler PDF şartnameleri manuel Excel\'e işliyordu'),
    ('Спецификации рассчитывались до 4 рабочих дней', 'Quotes took up to 4 business days to prepare', 'Tekliflerin hazırlanması 4 iş gününü buluyordu'),
    ('Клиенты уходили к конкурентам из-за долгого ответа', 'High-value buyers churned to faster competitors', 'Müşteriler geç yanıt sebebiyle rakiplere gidiyordu'),
    ('ПОСЛЕ ВНЕДРЕНИЯ ALTAI OPTIMA:', 'AFTER ALTAI OPTIMA:', 'ALTAI OPTIMA SONRASI:'),
    ('AI мгновенно распознает любые файлы и чертежи', 'AI instantly parses technical specs and drawings', 'AI tüm teknik şartnameleri ve çizimleri anında okur'),
    ('Автоматический расчет цен и остатков из 1С за секунды', 'Instant ERP inventory check and price quotation', 'ERP üzerinden saniyeler içinde stok ve fiyat hesaplar'),
    ('Автономное выставление счета и дожим до оплаты в мессенджере', 'Autonomous invoicing and follow-up closing inside messaging app', 'Mesajlaşma uygulamasında faturayı iletir ve tahsilatı tamamlar'),
    ('СКОРОСТЬ ОБЗВОНА', 'CALL VELOCITY', 'ARAMA HIZI'),
    ('48 ЧАСОВ', '48 HOURS', '48 SAAT'),
    ('На полный обзвон 3 800 контактов', 'To call all 3,800 dormant contacts', '3.800 kişinin tamamını arama süresi'),
    ('РЕАКТИВАЦИЯ БАЗЫ', 'REACTIVATION RATE', 'CANLANMA ORANI'),
    ('41% ВЕРНУЛИСЬ', '41% RETURNED', '%41 GERİ DÖNÜŞ'),
    ('1 558 клиентов вернулись в воронку', '1,558 buyers returned to funnel', '1.558 müşteri huniye geri döndü'),
    ('ВЫРУЧКА С АРХИВА', 'ARCHIVE REVENUE', 'ARŞİV GELİRİ'),
    ('+6.8M ₽', '+$75,000', '+$75.000'),
    ('Прямая выручка с закрытых сделок', 'Direct closed revenue from deals', 'Kapanan anlaşmalardan net ciro'),
    ('ОКУПАЕМОСТЬ AI', 'AI PAYBACK', 'AI GERİ DÖNÜŞÜ'),
    ('СО 2-Й СДЕЛКИ', '2ND CLOSED DEAL', '2. ANLAŞMADA'),
    ('Полный возврат инвестиций', '100% full return on investment', 'Yatırımın %100 geri dönüşü'),
    ('С АРХИВНОЙ БАЗЫ ЗА 30 ДНЕЙ', 'FROM DORMANT ARCHIVE IN 30 DAYS', '30 GÜNDE ATIL VERİTABANINDAN'),
    ('ВРЕМЯ ОТКЛИКА', 'RESPONSE SPEED', 'YANIT HIZI'),
    ('1.2 СЕКУНДЫ', '1.2 SECONDS', '1.2 SANİYE'),
    ('В ночные часы и выходные', 'During nights and weekends', 'Gece ve hafta sonlarında'),
    ('ВЫРУЧКА В МЕСЯЦ', 'MONTHLY UPLIFT', 'AYLIK EK CİRO'),
    ('+8.2M ₽', '+$90,000', '+$90.000'),
    ('Дополнительные продажи с ночного трафика', 'Incremental revenue from night leads', 'Gece gelen taleplerden ek satış'),
    ('КОНВЕРСИЯ В ТЕСТ-ДРАЙВ', 'TEST-DRIVE RATE', 'TEST SÜRÜŞÜ ORANI'),
    ('38%', '38%', '%38'),
    ('Из холодного запроса с площадки', 'From cold marketplace inquiries', 'Pazar yeri taleplerinden'),
    ('14 ДНЕЙ', '14 DAYS', '14 GÜN'),
    ('С первой отгрузки 2 тягачей', 'With first 2 trucks delivered', 'İlk 2 araç teslimatında'),
    ('ВРЕМЯ ДО ВСТРЕЧИ', 'TIME TO MEETING', 'TOPLANTIYA KALAN'),
    ('4 ЧАСА', '4 HOURS', '4 SAAT'),
    ('Вместо 7 дней до первой встречи', 'Down from 7 days wait previously', 'Önceki 7 günlük bekleme yerine'),
    ('РУТИНА ЭКСПЕРТОВ', 'EXPERT ROUTINE', 'UZMAN RUTİNİ'),
    ('0 МИНУТ', '0 MINUTES', '0 DAKİKA'),
    ('На нецелевые первичные звонки', 'Wasted on unqualified inquiries', 'Niteliksiz ön görüşmelere harcanan'),
    ('9 ДНЕЙ', '9 DAYS', '9 GÜN'),
    ('С первого закрытого договора аудита', 'From the first signed corporate contract', 'İmzalanan ilk kurumsal sözleşmeyle'),
    ('ЧИСТАЯ ВЫГОДА', 'NET REVENUE', 'NET KAZANÇ'),
    ('+4.6M ₽', '+$50,000', '+$50.000'),
    ('Выручка за первые 2 месяца работы', 'Direct revenue in first 2 months', 'İlk 2 aydaki doğrudan ciro'),
    ('WhatsApp & Voice AI • Диалог с клиентом', 'WhatsApp & Voice AI • Buyer Conversation', 'WhatsApp & Sesli AI • Müşteri Görüşmesi'),
    ('Avito Chat & 1C • Автоматический расчет лизинга', 'Marketplace Chat & ERP • Automated Lease Quote', 'Pazar Yeri & ERP • Otomatik Leasing Teklifi'),
    ('Instagram Direct & Telegram • Scoring лида', 'Instagram Direct & Telegram • Lead Scoring', 'Instagram Direct & Telegram • Müşteri Skorlama'),
]

hero_switcher_ru = """<div class="flex items-center rounded-full bg-slate-950/40 border border-white/20 p-0.5 backdrop-blur-md text-[10px] font-bold font-mono text-white/80 shrink-0">
            <span class="px-1.5 sm:px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-xs">RU</span>
            <a href="en.html" class="px-1.5 sm:px-2 py-0.5 rounded-full hover:text-white transition">EN</a>
            <a href="tr.html" class="px-1.5 sm:px-2 py-0.5 rounded-full hover:text-white transition">TR</a>
          </div>"""

hero_switcher_en = """<div class="flex items-center rounded-full bg-slate-950/40 border border-white/20 p-0.5 backdrop-blur-md text-[10px] font-bold font-mono text-white/80 shrink-0">
            <a href="index.html" class="px-1.5 sm:px-2 py-0.5 rounded-full hover:text-white transition">RU</a>
            <span class="px-1.5 sm:px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-xs">EN</span>
            <a href="tr.html" class="px-1.5 sm:px-2 py-0.5 rounded-full hover:text-white transition">TR</a>
          </div>"""

hero_switcher_tr = """<div class="flex items-center rounded-full bg-slate-950/40 border border-white/20 p-0.5 backdrop-blur-md text-[10px] font-bold font-mono text-white/80 shrink-0">
            <a href="index.html" class="px-1.5 sm:px-2 py-0.5 rounded-full hover:text-white transition">RU</a>
            <a href="en.html" class="px-1.5 sm:px-2 py-0.5 rounded-full hover:text-white transition">EN</a>
            <span class="px-1.5 sm:px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-xs">TR</span>
          </div>"""

sticky_switcher_ru = """<div class="flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold font-mono">
          <span class="px-2 py-0.5 rounded-full bg-sky-600 text-white shadow-2xs">RU</span>
          <a href="en.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">EN</a>
          <a href="tr.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">TR</a>
        </div>"""

sticky_switcher_en = """<div class="flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold font-mono">
          <a href="index.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">RU</a>
          <span class="px-2 py-0.5 rounded-full bg-sky-600 text-white shadow-2xs">EN</span>
          <a href="tr.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">TR</a>
        </div>"""

sticky_switcher_tr = """<div class="flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold font-mono">
          <a href="index.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">RU</a>
          <a href="en.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">EN</a>
          <span class="px-2 py-0.5 rounded-full bg-sky-600 text-white shadow-2xs">TR</span>
        </div>"""

all_translations = base_trans.translations + additional_translations
translations_sorted = sorted(all_translations, key=lambda x: len(x[0]), reverse=True)

# Generate EN
en_res = source_ru
en_res = en_res.replace(hero_switcher_ru, hero_switcher_en)
en_res = en_res.replace(sticky_switcher_ru, sticky_switcher_en)
en_res = re.sub(r'<html[^>]*lang=["\']ru["\']', '<html lang="en"', en_res)

for ru, en, tr in translations_sorted:
    en_res = en_res.replace(ru, en)
en_res = clean_comments_and_scripts(en_res)

with open('en.html', 'w', encoding='utf-8') as f:
    f.write(en_res)

# Generate TR
tr_res = source_ru
tr_res = tr_res.replace(hero_switcher_ru, hero_switcher_tr)
tr_res = tr_res.replace(sticky_switcher_ru, sticky_switcher_tr)
tr_res = re.sub(r'<html[^>]*lang=["\']ru["\']', '<html lang="tr"', tr_res)

for ru, en, tr in translations_sorted:
    tr_res = tr_res.replace(ru, tr)
tr_res = clean_comments_and_scripts(tr_res)

with open('tr.html', 'w', encoding='utf-8') as f:
    f.write(tr_res)

print("Generated en.html and tr.html successfully.")
