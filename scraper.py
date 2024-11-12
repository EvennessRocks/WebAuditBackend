# scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_webpage(url):
    """
    Scrapes the given URL and returns the HTML markup and CSS (if needed).
    """
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            html_markup = str(soup)  # Get the full HTML content
            css = []  # Add logic to extract CSS if necessary
            return html_markup, css
        else:
            return None, None
    except Exception as e:
        return None, None