# -*- coding: utf-8 -*-
# Patch localized JS objects (branches, casesData, personasData, updateCalc) in en.html and tr.html

# ----------------- EN.HTML PATCH -----------------
with open('en.html', 'r', encoding='utf-8') as f:
    en = f.read()

# Update currency in calculator updateCalc for EN ($ instead of ₽)
en = en.replace("cL.textContent = c.toLocaleString('ru-RU') + ' ₽';", "cL.textContent = '$' + c.toLocaleString('en-US');")
en = en.replace("mV.textContent = month.toLocaleString('ru-RU') + ' ₽';", "mV.textContent = '+$' + month.toLocaleString('en-US');")
en = en.replace("yV.textContent = year.toLocaleString('ru-RU') + ' ₽';", "yV.textContent = '+$' + year.toLocaleString('en-US');")
en = en.replace("coin.textContent = '₽';", "coin.textContent = '$';")
en = en.replace('<span class="btn-optic-arrow font-sans font-black text-lg">₽</span>', '<span class="btn-optic-arrow font-sans font-black text-lg">$</span>')

# Update English Dialogue branches
en_branches = '''
    const branches = {
      full_deal: [
        { 
          sender: 'user', 
          author: 'Alex (Buyer)', 
          text: 'Hello! Looking for rebar A500C 12mm — 45 tons, beam 20B1 — 18 tons. Can you deliver to the facility by Friday?', 
          time: '11:40' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Alex, good day! Checking our Podolsk and Chekhov stock reserves right now ⚡<br><br>Both items are reserved: <strong>A500C 12mm (45t)</strong> and <strong>Beam 20B1 (18t)</strong>.<br>Total order: <strong>$46,200</strong> with VAT and freight included.<br><br>Friday 09:00 delivery is confirmed. Should I issue the invoice and reserve the stock for your company?', 
          time: '11:40' 
        },
        { 
          sender: 'user', 
          author: 'Alex (Buyer)', 
          text: 'Yes, please issue the invoice to PromStroy LLC.', 
          time: '11:41' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Invoice #4892 and specification sent to your email and Telegram. The stock is officially reserved. 📄✨', 
          time: '11:41' 
        }
      ],
      qualification: [
        { 
          sender: 'user', 
          author: 'Alexander (Telegram)', 
          text: 'Hi, we are building a logistics warehouse (8,000 sqm). Need industrial HVAC equipment.', 
          time: '15:12' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Alexander, excellent project! To tailor the optimal HVAC capacity, what is the ceiling height and power limit at the facility?', 
          time: '15:12' 
        },
        { 
          sender: 'user', 
          author: 'Alexander (Telegram)', 
          text: 'Ceiling height is 12m, power limit 350 kW. Budget around $120,000.', 
          time: '15:13' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Noted! 3 engineering options matched to your budget. Booking an online briefing with our chief design engineer for tomorrow at 11:00 AM?', 
          time: '15:13' 
        }
      ],
      objection_price: [
        { 
          sender: 'user', 
          author: 'Dmitry (WhatsApp)', 
          text: 'Got your quote for $32,000. Your competitor quoted $28,500. Can you match their price?', 
          time: '16:05' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Dmitry, I understand the price comparison. Our quote includes factory GOST certification, delivery insurance, and 3-year warranty with on-site service.<br><br>Buying cheaper often incurs $5,000+ in hidden freight and replacement costs. Shall we keep the certified batch with guaranteed Friday delivery?', 
          time: '16:05' 
        },
        { 
          sender: 'user', 
          author: 'Dmitry (WhatsApp)', 
          text: 'Makes sense. Warranty and fast delivery are critical. Let us proceed with your contract.', 
          time: '16:06' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Contract and invoice forwarded to your WhatsApp. Deal is locked in! 🤝', 
          time: '16:06' 
        }
      ],
      marketplace: [
        { 
          sender: 'user', 
          author: 'Anastasia (Direct)', 
          text: 'Hello! Could you please let me know the price and sizing for this jacket?', 
          time: '14:30' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Anastasia, hello! Thanks for reaching out ✨<br><br>The jacket is $120. We have courier fitting delivery available.<br><br>May I assist you with sizing or book your express delivery right now?', 
          time: '14:30' 
        },
        { 
          sender: 'user', 
          author: 'Anastasia (Direct)', 
          text: 'Yes! For measurements 88-64-92, is size S best?', 
          time: '14:31' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Size S will fit you perfectly! Shall I book courier delivery for tomorrow?', 
          time: '14:31' 
        }
      ]
    };
'''

# Replace branches definition
en = en.replace(en[en.find('const branches = {'):en.find('let currentKey = \'full_deal\';')], en_branches + '\n    ')

with open('en.html', 'w', encoding='utf-8') as f:
    f.write(en)
print("en.html JS patched")


# ----------------- TR.HTML PATCH -----------------
with open('tr.html', 'r', encoding='utf-8') as f:
    tr = f.read()

# Update currency in calculator updateCalc for TR (₺ instead of ₽)
tr = tr.replace("cL.textContent = c.toLocaleString('ru-RU') + ' ₽';", "cL.textContent = c.toLocaleString('tr-TR') + ' ₺';")
tr = tr.replace("mV.textContent = month.toLocaleString('ru-RU') + ' ₽';", "mV.textContent = '+' + month.toLocaleString('tr-TR') + ' ₺';")
tr = tr.replace("yV.textContent = year.toLocaleString('ru-RU') + ' ₽';", "yV.textContent = '+' + year.toLocaleString('tr-TR') + ' ₺';")
tr = tr.replace("coin.textContent = '₽';", "coin.textContent = '₺';")
tr = tr.replace('<span class="btn-optic-arrow font-sans font-black text-lg">₽</span>', '<span class="btn-optic-arrow font-sans font-black text-lg">₺</span>')

# Update Turkish Dialogue branches
tr_branches = '''
    const branches = {
      full_deal: [
        { 
          sender: 'user', 
          author: 'Ahmet (Müşteri)', 
          text: 'Merhaba! A500C 12mm inşaat demiri (45 ton) ve 20B1 profil (18 ton) arıyoruz. Cuma gününe şantiyeye teslim edebilir misiniz?', 
          time: '11:40' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Ahmet Bey, iyi günler! Depo stoklarımızı anında kontrol ettim ⚡<br><br>Her iki ürün de rezerve edildi: <strong>A500C 12mm (45t)</strong> ve <strong>20B1 Profil (18t)</strong>.<br>Toplam tutar: KDV ve nakliye dahil <strong>1.480.000 ₺</strong>.<br><br>Cuma 09:00 şantiye teslimatı onaylandı. Şirketiniz adına faturayı kesip stoğu kilitleyeyim mi?', 
          time: '11:40' 
        },
        { 
          sender: 'user', 
          author: 'Ahmet (Müşteri)', 
          text: 'Evet lütfen, fatura bilgilerimizi iletiyorum.', 
          time: '11:41' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Teklif ve fatura e-posta ve WhatsApp hattınıza gönderildi. Ürünler şantiyeniz için rezerve edildi. 📄✨', 
          time: '11:41' 
        }
      ],
      qualification: [
        { 
          sender: 'user', 
          author: 'Mehmet (Telegram)', 
          text: 'Merhaba, 8.000 m2 lojistik deposu inşa ediyoruz. Endüstriyel havalandırma ve iklimlendirme ihtiyacımız var.', 
          time: '15:12' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Mehmet Bey, harika bir proje! En verimli sistemi hesaplayabilmemiz için tavan yüksekliği ve mevcut elektrik gücü nedir?', 
          time: '15:12' 
        },
        { 
          sender: 'user', 
          author: 'Mehmet (Telegram)', 
          text: 'Tavan 12 metre, tahsis edilen güç 350 kW. Bütçemiz yaklaşık 4.5 milyon TL.', 
          time: '15:13' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Kaydettim! Bütçenize uygun 3 mühendislik çözümü hazır. Yarın saat 11:00 için baş mühendisimizle online toplantı planlayalım mı?', 
          time: '15:13' 
        }
      ],
      objection_price: [
        { 
          sender: 'user', 
          author: 'Kemal (WhatsApp)', 
          text: 'Teklifinizi aldım (1.200.000 TL). Rakip firma 1.050.000 TL fiyat verdi. Aynı fiyata inebilir misiniz?', 
          time: '16:05' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Kemal Bey, fiyat kıyaslamanızı anlıyorum. Teklifimiz orijinal fabrika sertifikası, sevkiyat sigortası ve 3 yıl yerinde teknik servis garantisi içerir.<br><br>Daha ucuz ürünlerde genelde sonradan 200.000 TL üzeri ek masraf çıkar. Garantili ve Cuma teslimli partiyi onaylayalım mı?', 
          time: '16:05' 
        },
        { 
          sender: 'user', 
          author: 'Kemal (WhatsApp)', 
          text: 'Çok haklısınız. Garanti ve hızlı teslimat bizim için kritik. Sözleşmeyi başlatalım.', 
          time: '16:06' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Sözleşme ve proforma faturanız WhatsApp hattınıza iletildi. İş birliğimiz hayırlı olsun! 🤝', 
          time: '16:06' 
        }
      ],
      marketplace: [
        { 
          sender: 'user', 
          author: 'Zeynep (Direct)', 
          text: 'Merhaba! Bu elbisenin fiyatını ve beden bilgisini öğrenebilir miyim?', 
          time: '14:30' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Zeynep Hanım, merhaba! İlginiz için teşekkürler ✨<br><br>Ürün fiyatı 2.450 TL\'dir. Şehir içi kurye ile denemeli teslimatımız mevcuttur.<br><br>Beden seçimi konusunda yardımcı olayım mı veya siparişi hemen oluşturalım mı?', 
          time: '14:30' 
        },
        { 
          sender: 'user', 
          author: 'Zeynep (Direct)', 
          text: 'Evet, 88-64-92 ölçülerim için S beden uygun olur mu?', 
          time: '14:31' 
        },
        { 
          sender: 'ai', 
          author: 'Eva // Altai Optima', 
          text: 'Ölçülerinize S beden kusursuz uyum sağlayacaktır! Yarın için kurye teslimatınızı oluşturalım mı?', 
          time: '14:31' 
        }
      ]
    };
'''

# Replace branches definition
tr = tr.replace(tr[tr.find('const branches = {'):tr.find('let currentKey = \'full_deal\';')], tr_branches + '\n    ')

with open('tr.html', 'w', encoding='utf-8') as f:
    f.write(tr)
print("tr.html JS patched")
