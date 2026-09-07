# -*- coding: utf-8 -*-
# Translate the quote in en.html and tr.html

# EN
with open('en.html', 'r', encoding='utf-8') as f:
    en = f.read()

en = en.replace('<span>Горы ваших задач нам по колено</span>', '<span>No mountain of tasks is too high for us</span>')
en = en.replace('«У нас нет проблем — есть задачи, которые нужно решить»', '“We don’t have problems — only challenges ready to be solved.”')
en = en.replace('— Команда Altai', '— Altai Team')

with open('en.html', 'w', encoding='utf-8') as f:
    f.write(en)

# TR
with open('tr.html', 'r', encoding='utf-8') as f:
    tr = f.read()

tr = tr.replace('<span>Горы ваших задач нам по колено</span>', '<span>Görevlerinizin dağları bize vız gelir</span>')
tr = tr.replace('«У нас нет проблем — есть задачи, которые нужно решить»', '“Bizim için sorun yoktur — çözülecek hedefler vardır.”')
tr = tr.replace('— Команда Altai', '— Altai Ekibi')

with open('tr.html', 'w', encoding='utf-8') as f:
    f.write(tr)

print("Quotes localized for EN and TR")
