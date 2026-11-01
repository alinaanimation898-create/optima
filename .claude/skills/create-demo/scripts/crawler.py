#!/usr/bin/env python3
"""
Web Crawler & Information Extractor for Tenant Onboarding in ALTAI Optima.
Extracts clean structured text, metadata, contacts, and pricing from target company websites.
Zero third-party dependencies (uses Python standard library).
"""

import sys
import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from typing import List, Dict, Set, Optional

DEFAULT_PROBE_PATHS = [
    '', '/ru', '/pricing', '/about', '/contacts', '/docs', '/documentation',
    '/api', '/faq', '/snippet', '/how-it-works', '/terms', '/privacy'
]

class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self.skip = False
        self.title = ""
        self.in_title = False
        self.links = set()
        self.meta_desc = ""

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag in ('script', 'style', 'svg', 'noscript', 'canvas'):
            self.skip = True
        elif tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            name = attr_dict.get('name', '').lower() or attr_dict.get('property', '').lower()
            if name in ('description', 'og:description'):
                self.meta_desc = attr_dict.get('content', '').strip()
        elif tag == 'a':
            href = attr_dict.get('href')
            if href:
                self.links.add(href)

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'svg', 'noscript', 'canvas'):
            self.skip = False
        elif tag == 'title':
            self.in_title = False
        elif tag in ('p', 'h1', 'h2', 'h3', 'h4', 'li', 'div', 'tr', 'td', 'br', 'header', 'footer', 'section', 'article'):
            self.result.append('\n')

    def handle_data(self, data):
        if self.in_title:
            self.title += data.strip() + " "
        elif not self.skip:
            s = data.strip()
            if s:
                self.result.append(s + " ")

    def get_clean_text(self) -> str:
        raw = "".join(self.result)
        lines = [l.strip() for l in raw.split("\n") if l.strip()]
        return "\n".join(lines)


def fetch_url(url: str, timeout: int = 10) -> Optional[Dict]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            content_type = resp.headers.get("Content-Type", "")
            if "text/html" not in content_type and "text/plain" not in content_type:
                return None
            html = resp.read().decode("utf-8", errors="ignore")
            
            parser = HTMLTextExtractor()
            parser.feed(html)
            text = parser.get_clean_text()
            
            return {
                "url": url,
                "status": resp.status,
                "title": parser.title.strip(),
                "description": parser.meta_desc.strip(),
                "text": text,
                "text_length": len(text),
                "links": list(parser.links)
            }
    except Exception as e:
        return None


def extract_contacts(text: str) -> Dict[str, List[str]]:
    emails = list(set(re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)))
    phones = list(set(re.findall(r'(?:\+7|8)[\s\-\(]*\d{3}[\s\-\)]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}', text)))
    inns = list(set(re.findall(r'ИНН[:\s]*(\d{10}|\d{12})', text, re.IGNORECASE)))
    
    # Filter out common file extensions mistakenly parsed as emails
    clean_emails = [e for e in emails if not re.search(r'\.(png|jpg|jpeg|svg|webp|gif|css|js)$', e, re.I)]
    
    return {
        "emails": clean_emails,
        "phones": phones,
        "inns": inns
    }


def crawl_site(seed_urls: List[str], max_pages: int = 15) -> Dict:
    visited = set()
    pages = []
    
    # Identify base domain from first url
    parsed_seed = urllib.parse.urlparse(seed_urls[0])
    base_scheme = parsed_seed.scheme or "https"
    base_netloc = parsed_seed.netloc
    base_url = f"{base_scheme}://{base_netloc}"
    
    queue = list(seed_urls)
    
    # Add common probe paths to queue
    for p in DEFAULT_PROBE_PATHS:
        full = urllib.parse.urljoin(base_url, p)
        if full not in queue:
            queue.append(full)
            
    for url in queue:
        if len(pages) >= max_pages:
            break
        # Normalize
        norm_url = url.split('#')[0]
        if norm_url in visited:
            continue
        visited.add(norm_url)
        
        # Ensure domain matches base domain
        curr_netloc = urllib.parse.urlparse(norm_url).netloc
        if curr_netloc and curr_netloc != base_netloc and not curr_netloc.endswith("." + base_netloc):
            continue
            
        page_data = fetch_url(norm_url)
        if page_data and page_data["text_length"] > 150:
            pages.append(page_data)
            
    # Combine texts and extract contacts
    combined_text = "\n\n=== NEW PAGE ===\n\n".join([f"URL: {p['url']}\nTITLE: {p['title']}\n{p['text']}" for p in pages])
    contacts = extract_contacts(combined_text)
    
    return {
        "base_url": base_url,
        "domain": base_netloc,
        "pages_scraped": len(pages),
        "contacts": contacts,
        "pages": pages,
        "combined_text": combined_text
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 crawler.py <url1> [url2] ...")
        sys.exit(1)
        
    urls = sys.argv[1:]
    res = crawl_site(urls)
    print(f"Scraped {res['pages_scraped']} pages from {res['base_url']}")
    print(f"Contacts: {res['contacts']}")
    print(f"Total content length: {len(res['combined_text'])} characters")
