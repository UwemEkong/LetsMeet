from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
import re
from typing import List, Optional

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright


GROUP_URL = "https://www.meetup.com/find/{}/?allMeetups=true&userFreeform={}&radius={}"


class GroupCategory(str, Enum):
    environment = "outdoors-adventure"
    mental_health = "health-wellness"
    lgbtq = "lgbtq"
    diversity_inclusion = "language"


@dataclass
class Group:
    name: str
    url: str
    image_url: Optional[str]
    members: int

    def __repr__(self):
        return f"<Group name={self.name}>"

    @staticmethod
    def _extract_name(card) -> Optional[str]:
        name = card.find("h3")
        if not name:
            return

        name = name.text.strip()
        return re.sub(r" +", " ", name)

    @staticmethod
    def _extract_url(card) -> Optional[str]:
        url = card.find("a", class_="display-none")
        if not url or not url.get("href"):
            return

        return url["href"]

    @staticmethod
    def _extract_image_url(card) -> Optional[str]:
        image_elem = card.find("a", class_="groupCard--photo")
        if not image_elem or not image_elem.get("style"):
            return

        image_re = re.search(r"background-image: url\((.+)\)", image_elem["style"])
        if image_re is None:
            return

        return image_re.group(1)

    @staticmethod
    def _extract_members(card) -> Optional[int]:
        member_elem = card.find("p", class_="small")
        if not member_elem:
            return

        number_part, *_ = member_elem.text.strip().split(" ")
        number_part = number_part.replace(",", "")
        if not number_part.isdigit():
            return

        return int(number_part)


    @classmethod
    async def search(cls, category: GroupCategory, zip: int, radius: str) -> List[Group]:
        """
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(GROUP_URL.format(category, zip, radius))
            content = await page.content()
            await browser.close()

        soup = BeautifulSoup(content, "html.parser")
        group_cards = soup.find_all("li", class_="groupCard")
        groups = []

        for card in group_cards:
            name = Group._extract_name(card)
            if not name:
                continue

            url = Group._extract_url(card)
            if not url:
                continue

            image_url = Group._extract_image_url(card)
            if not image_url:
                continue

            members = Group._extract_members(card)
            if not members:
                continue

            groups.append(cls(
                name=name,
                url=url,
                image_url=image_url,
                members=members
            ))

        return groups

