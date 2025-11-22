# Imports
import pandas as pd
import time 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
# Setting up info
jb_core_url = "https://www.jbhifi.com.au/collections/computers-tablets/laptops?hitsPerPage=400"
delay = 1000 # 1 second in  ms

def jb_map_scrape(url,delay):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get(url)
    driver.implicitly_wait(delay)
    links = []
    cards = driver.find_elements(By.CSS_SELECTOR, "a[href^='/products/']")
    for card in cards:
        href = card.get_attribute("href")
        links.append(href)
    driver.quit()
    print(f"{len(links)} Products found")
    return links

def product_scrape(links,delay):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    for link in links:
        driver.get(link)  
        driver.implicitly_wait(delay)
        try:
            print("trying to find stuff")
            specs = driver.find_elements(By.CSS_SELECTOR, "div._14wuv360")
        except:
            print("Error, spec not found ")
            pass
        # To ensure I dont break terms of service and be a good web scraper
        time.sleep(3)


def main(jb_core_url,delay):
    links = jb_map_scrape(jb_core_url,delay)
    scraped_specs = product_scrape(links,delay)
    df = pd.DataFrame(scraped_specs)

main(jb_core_url,delay)