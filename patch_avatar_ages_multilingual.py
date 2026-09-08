# -*- coding: utf-8 -*-
# EN
with open('en.html', 'r', encoding='utf-8') as f:
    en = f.read()

en = en.replace('35 лет', '35 yo')
en = en.replace('38 лет', '38 yo')
en = en.replace('29 лет', '29 yo')
en = en.replace('42 года', '42 yo')
en = en.replace('31 год', '31 yo')
en = en.replace('45 лет', '45 yo')
en = en.replace('27 лет', '27 yo')
en = en.replace('30 лет', '30 yo')
en = en.replace('34 года', '34 yo')
en = en.replace('46 лет', '46 yo')

with open('en.html', 'w', encoding='utf-8') as f:
    f.write(en)

# TR
with open('tr.html', 'r', encoding='utf-8') as f:
    tr = f.read()

tr = tr.replace('35 лет', '35 yaş')
tr = tr.replace('38 лет', '38 yaş')
tr = tr.replace('29 лет', '29 yaş')
tr = tr.replace('42 года', '42 yaş')
tr = tr.replace('31 год', '31 yaş')
tr = tr.replace('45 лет', '45 yaş')
tr = tr.replace('27 лет', '27 yaş')
tr = tr.replace('30 лет', '30 yaş')
tr = tr.replace('34 года', '34 yaş')
tr = tr.replace('46 лет', '46 yaş')

with open('tr.html', 'w', encoding='utf-8') as f:
    f.write(tr)

print("Ages localized for EN and TR")
