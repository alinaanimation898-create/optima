# -*- coding: utf-8 -*-
# EN
with open('en.html', 'r', encoding='utf-8') as f:
    en = f.read()

en = en.replace('<span>ВЫБЕРИТЕ СФЕРУ ДЛЯ ИЗУЧЕНИЯ:</span>', '<span>SELECT AN INDUSTRY TO EXPLORE:</span>')
en = en.replace('4 ГОТОВЫХ СЦЕНАРИЯ', '4 LIVE SCENARIOS')

with open('en.html', 'w', encoding='utf-8') as f:
    f.write(en)

# TR
with open('tr.html', 'r', encoding='utf-8') as f:
    tr = f.read()

tr = tr.replace('<span>ВЫБЕРИТЕ СФЕРУ ДЛЯ ИЗУЧЕНИЯ:</span>', '<span>İNCELEMEK İÇİN BİR SEKTÖR SEÇİN:</span>')
tr = tr.replace('4 ГОТОВЫХ СЦЕНАРИЯ', '4 HAZIR SENARYO')

with open('tr.html', 'w', encoding='utf-8') as f:
    f.write(tr)

print("Cases labels localized for EN and TR")
