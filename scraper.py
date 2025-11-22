import requests
import pandas
from bs4 import BeautifulSoup
from requests_html import HTMLSession
headers = {"User-Agent": "Mozilla/5.0"}
delay = 1000 # 1 second in  ms
jb_core_url = "https://www.jbhifi.com.au/collections/computers-tablets/laptops?hitsPerPage=400"
# Class fo url links class="page-identifier"
# class again- ProductCard _10ipotx28 _10ipotx27 _10ipotx2b
# Spec sheet class = _14wuv360
def jb_map_scrape(url):
    page = requests.get(url,headers=headers)
    soup = BeautifulSoup(page.content, "html.parser")
    links = []
    print(soup)
    print("test")
    for val in soup.find_all('div', class_='ProductCard _10ipotx28 _10ipotx27 _10ipotx2b'):
        print("card found")
        links.append("https://www.jbhifi.com.au" + val["href"])
    return links
def product_scrape(links):
    for link in links:
        print()
def main():
    print()
    
print(jb_map_scrape(jb_core_url))