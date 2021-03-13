from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
import re
from typing import List, Optional

from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

from .event import Event


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
    image_url: str
    members: int

    description: Optional[str]
    events: Optional[List[Event]]

    def to_dict(self):
        ret = {
            "name": self.name,
            "url": self.url,
            "image_url": self.image_url,
            "members": self.members,
            "description": self.description
        }
        ret["events"] = [e.to_dict() for e in self.events] if self.events is not None else None
        return ret

    @staticmethod
    def _extract_name_from_card(card) -> Optional[str]:
        name = card.find("h3")
        if not name:
            return

        name = name.text.strip()
        return re.sub(r" +", " ", name)

    @staticmethod
    def _extract_url_from_card(card) -> Optional[str]:
        url = card.find("a", class_="display-none")
        if not url or not url.get("href"):
            return

        return url["href"]

    @staticmethod
    def _extract_image_url_from_card(card) -> Optional[str]:
        image_elem = card.find("a", class_="groupCard--photo")
        if not image_elem or not image_elem.get("style"):
            return

        image_re = re.search(r"background-image: url\((.+)\)", image_elem["style"])
        if image_re is None:
            return

        return image_re.group(1)

    @staticmethod
    def _extract_members_from_card(card) -> Optional[int]:
        member_elem = card.find("p", class_="small")
        if not member_elem:
            return

        number_part, *_ = member_elem.text.strip().split(" ")
        number_part = number_part.replace(",", "")
        if not number_part.isdigit():
            return

        return int(number_part)

    @staticmethod
    def _extract_name_from_page(page) -> Optional[str]:
        title_elem = page.find("a", class_="groupHomeHeader-groupNameLink")
        if not title_elem or not title_elem.get("href"):
            return

        return title_elem.text.strip()

    @staticmethod
    def _extract_image_url_from_page(page) -> Optional[str]:
        image_elem = page.find("div", class_="groupHomeHeader-banner")
        if not image_elem or not image_elem.get("style"):
            return

        image_re = re.search(r"background-image: url\((.+)\)", image_elem["style"])
        if image_re is None:
            return

        return image_re.group(1)

    @staticmethod
    def _extract_members_from_page(page) -> Optional[str]:
        member_elem = page.find("a", class_="groupHomeHeaderInfo-memberLink").find("span")
        if not member_elem:
            return

        number_part, *_ = member_elem.text.strip().split(" ")
        number_part = number_part.replace(",", "")
        if not number_part.isdigit():
            return

        return int(number_part)

    @staticmethod
    def _extract_desc_from_page(page) -> Optional[str]:
        elems = page.find_all("p", class_="group-description")
        desc = None
        for elem in elems:
            text = elem.text.strip()
            if text:
                desc = text
                break

        return desc

    @classmethod
    async def from_url(cls, url: str) -> Optional[Group]:
        """
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(url)
            content = await page.content()
            await browser.close()

        soup = BeautifulSoup(content, "html.parser")

        name = Group._extract_name_from_page(soup)
        if not name:
            return

        image_url = Group._extract_image_url_from_page(soup)
        if not image_url:
            return

        members = Group._extract_members_from_page(soup)
        if not members:
            return

        desc = Group._extract_desc_from_page(soup)
        if not desc:
            return

        return Group(
            name=name,
            url=url,
            image_url=image_url,
            members=members,
            description=desc,
            events=Event.from_group_page(soup)
        )

    @classmethod
    async def search(cls, category: GroupCategory, zip: int, radius: str) -> List[Group]:
        """
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(GROUP_URL.format(category, zip, radius))
            exists = await page.query_selector("text=Show more")
            while exists:
                await page.click("text=Show more")
                exists = await page.query_selector("text=Show more")
            content = await page.content()
            await browser.close()

        soup = BeautifulSoup(content, "html.parser")
        group_cards = soup.find_all("li", class_="groupCard")
        groups = []

        for card in group_cards:
            name = Group._extract_name_from_card(card)
            if not name:
                continue

            url = Group._extract_url_from_card(card)
            if not url:
                continue

            image_url = Group._extract_image_url_from_card(card)
            if not image_url:
                continue

            members = Group._extract_members_from_card(card)
            if not members:
                continue

            groups.append(cls(
                name=name,
                url=url,
                image_url=image_url,
                members=members,
                description=None,
                events=None
            ))

        return groups

