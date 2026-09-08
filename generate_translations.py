# -*- coding: utf-8 -*-
import re

with open('index.html', 'r', encoding='utf-8') as f:
    ru_html = f.read()

# Add language selector to index.html if not already present
if '<!-- ЯЗЫКОВОЙ ПЕРЕКЛЮЧАТЕЛЬ -->' not in ru_html:
    # 1. In stickyNavDock
    ru_sticky_lang = '''
        <!-- ЯЗЫКОВОЙ ПЕРЕКЛЮЧАТЕЛЬ (Sticky) -->
        <div class="flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold font-mono">
          <span class="px-2 py-0.5 rounded-full bg-sky-600 text-white shadow-2xs">RU</span>
          <a href="en.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">EN</a>
          <a href="tr.html" class="px-2 py-0.5 rounded-full text-slate-600 hover:text-sky-600 transition">TR</a>
        </div>
'''
    ru_html = ru_html.replace('<!-- КНОПКА НАВЕРХ -->', ru_sticky_lang + '        <!-- КНОПКА НАВЕРХ -->')
    
    # 2. In Hero header
    ru_hero_lang = '''
          <!-- ЯЗЫКОВОЙ ПЕРЕКЛЮЧАТЕЛЬ -->
          <div class="flex items-center rounded-full bg-slate-950/40 border border-white/20 p-0.5 backdrop-blur-md text-[10px] font-bold font-mono text-white/80">
            <span class="px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-xs">RU</span>
            <a href="en.html" class="px-2 py-0.5 rounded-full hover:text-white transition">EN</a>
            <a href="tr.html" class="px-2 py-0.5 rounded-full hover:text-white transition">TR</a>
          </div>
'''
    ru_html = ru_html.replace('<!-- КНОПКА ЗАЯВКИ / ТЕСТА -->', ru_hero_lang + '          <!-- КНОПКА ЗАЯВКИ / ТЕСТА -->')

    # 3. In mobile sticky menu
    ru_mob_lang = '''
      <div class="pt-2 pb-1 flex items-center justify-center gap-2 text-xs font-mono font-bold">
        <span class="px-3 py-1 rounded-full bg-sky-600 text-white">RU</span>
        <a href="en.html" class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-sky-50">EN</a>
        <a href="tr.html" class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-sky-50">TR</a>
      </div>
'''
    ru_html = ru_html.replace('<div class="pt-2 flex items-center gap-2">', ru_mob_lang + '      <div class="pt-2 flex items-center gap-2">')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(ru_html)
    print("Updated index.html with language switchers")

print("index.html ready")
