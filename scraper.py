# Imports
import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.service import Service
import random
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
# Setting up info
jb_core_url = "https://www.jbhifi.com.au/collections/computers-tablets/laptops?hitsPerPage=400"

def jb_map_scrape(url):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get(url)
    driver.implicitly_wait(30)
    links = []
    # Scroll once to trigger lazy load
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    driver.implicitly_wait(30)
    cards = driver.find_elements(By.CSS_SELECTOR, "a[href^='/products/']")
    for card in cards:
        href = card.get_attribute("href")
        links.append(href)
    time.sleep(5)
    driver.quit()
    # It finds 2 or more of the same link so this is the solution to remove duplicates
    unique_links = list(dict.fromkeys(links))
    print(f"{len(unique_links)} Products found")
    return unique_links

def product_scrape(links):
    specs_db = []
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    for link in links:
        driver.get(link)  
        driver.implicitly_wait(20)
        # Scroll once to trigger lazy load
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        print("attempting search")
        try:
            product_name = driver.find_element(By.CSS_SELECTOR, "._12mtftw9").text
            print(product_name)
            price = driver.find_element(By.CSS_SELECTOR, "[data-testid='ticket-price']").text
            print(price)
            # Finding specs
            spec_keys = driver.find_elements(By.CSS_SELECTOR, "dt._14wuv362")
            spec_vals = driver.find_elements(By.CSS_SELECTOR, "dd._14wuv363")
            specs = {}
            # Ai built this "for" loop
            for k, v in zip(spec_keys, spec_vals):
                key = k.get_attribute("textContent").strip()
                val = v.get_attribute("textContent").strip()
                specs[key] = val

            final_specs = {"Product_Name": product_name, "Price_AUD": price,"Link":link}
            final_specs.update(specs)
            specs_db.append(final_specs)
            print(final_specs)
        except:
            print(f"Error scraping {link}. Skipping this product.")
            continue
        # To ensure I dont break terms of service and be a good web scraper
        time.sleep(0.5)
    driver.quit()
    df = pd.DataFrame(specs_db)
    df.to_csv("data/scraped_data.csv", index=False)
    print(f"Saved {len(df)} products")
    # Function is over an done


def main(jb_core_url):
    links = jb_map_scrape(jb_core_url)
    product_scrape(links)

main(jb_core_url)
