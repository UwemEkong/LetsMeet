from enum import Enum
import re

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright


class MeetUpCategory(str, Enum):
    environment = "outdoors-adventure"
    mental_health = "health-wellness"
    lgbtq = "lgbtq"
    diversity_inclusion = "language"


class MeetUp:
    def __init__(self):
        self.GROUP_URL = "https://www.meetup.com/find/{}/?allMeetups=true&userFreeform={}&radius={}"

    async def get_groups(self, category: MeetUpCategory, zip: int, radius: str):
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(self.GROUP_URL.format(category, zip, radius))
            content = await page.content()
            await browser.close()

        soup = BeautifulSoup(content, "html.parser")
        group_cards = soup.find_all("li", class_="groupCard")

        group_names = []
        for card in group_cards:
            name = card.find("h3")
            if name:
                name = name.text.strip()
                name = re.sub(" +", " ", name)
                group_names.append(name)

        return group_names
