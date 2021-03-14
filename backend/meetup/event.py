from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional

import pytz
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

EVENT_URL = "https://www.meetup.com/find/events/{}/?allMeetups=true&userFreeform={}&radius={}"


@dataclass
class Event:
    name: str
    time: int
    description: Optional[str]
    group_url: str
    url: str
    location: Optional[str]
    attendees: int

    def to_dict(self):
        return {
            "name": self.name,
            "time": self.time,
            "description": self.description,
            "group_url": self.group_url,
            "url": self.url,
            "location": self.location,
            "attendees": self.attendees
        }

    @classmethod
    def from_group_page(cls, page) -> List[Event]:
        event_list = page.find("div", class_="groupHome-eventsList-upcomingEvents")
        events = []

        # Extracts the group URL
        group_link = page.find("a", class_="groupHomeHeader-groupNameLink")
        if group_link:
            group_link = f"https://meetup.com{group_link['href']}"

        # Iterate through the 'Upcoming events' on the group page
        for chunk in event_list.find_all("div", class_="chunk"):
            # Extracts the URL
            url_elem = chunk.find("a", class_="eventCard--link")
            if not url_elem or not url_elem.get("href"):
                continue

            url = f"https://meetup.com{url_elem['href']}"

            # Extracts the name
            name_elem = url_elem.find("span")
            if not name_elem:
                continue
            name = name_elem.text.strip()

            # Extracts the time
            time_elem = chunk.find("time")
            if not time_elem or not time_elem.get("datetime"):
                continue

            time = int(time_elem["datetime"])

            # Extracts the location
            location_elem = chunk.find("address")
            if location_elem:
                location_p = location_elem.find("p")
                if not location_p:
                    continue
                location = location_p.text.strip()
            else:
                location = "Only visible to group members"

            # Extracts the description
            desc = None
            for p_elem in page.find_all("p", class_="text--small padding--top margin--halfBottom"):
                text = p_elem.text.strip()
                if text:
                    desc = text
                    break
            if desc is None:
                desc = ""

            # Extracts the attendee count
            attendee_elem = page.find("li", class_="avatarRow--attendingCount")
            if not attendee_elem:
                continue
            attendee_span = attendee_elem.find("span")
            number_part, *_ = attendee_span.text.strip().split(" ")
            if not number_part.isdigit():
                continue
            attendees = int(number_part)

            events.append(cls(
                name=name,
                time=time,
                description=desc,
                url=url,
                group_url=group_link,
                location=location,
                attendees=attendees
            ))

        return events

    @classmethod
    async def from_url(cls, url: str) -> Event:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(url)
            content = await page.content()
            await browser.close()

        soup = BeautifulSoup(content, "html.parser")

        title_elem = soup.find("h1", class_="pageHead-headline")
        title = title_elem.text.strip()

        desc_element = soup.find("div", class_="event-description")
        desc = None
        if desc_element:
            p_elem = desc_element.find("p")
            if p_elem:
                desc = p_elem.text.strip()

        time = soup.find("time")
        time = int(time["datetime"])

        location_elem = soup.find("address")
        location = None
        if location_elem:
            p_elem = location_elem.find("p")
            if p_elem:
                location = p_elem.text.strip()

        group_url_elem = soup.find("a", class_="event-group")
        group_url = f"https://meetup.com{group_url_elem['href']}"

        attendee_header = soup.find("h3", class_="attendees-sample-total").find("span")
        attendee_re = re.search(r"Attendees \((\d+)\)", attendee_header.text.strip())
        attendees = attendee_re.group(1)

        return cls(
            name=title,
            description=desc,
            time=time,
            url=url,
            group_url=group_url,
            attendees=attendees,
            location=location
        )

    @classmethod
    async def search(cls, category, zip: int, radius: str) -> List[Event]:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(EVENT_URL.format(category, zip, radius))
            content = await page.content()
            await browser.close()

        soup = BeautifulSoup(content, "html.parser")

        events = []
        for chunk in soup.find_all("li", class_="event-listing"):
            # Extract name of event
            name_elem = chunk.find("span", itemprop="name")
            if not name_elem:
                continue
            name = name_elem.text.strip()

            # Extract time of event
            dt = chunk.find("time", itemprop="startDate")
            dt = datetime.strptime(dt["datetime"], r"%Y-%m-%dT%H:%M:%S%z")
            utc_dt = dt.astimezone(pytz.utc)
            time = utc_dt.timestamp() * 1000

            # Extract link to group
            group_link_label = chunk.find("div", class_="text--labelSecondary")
            if not group_link_label:
                continue
            link_elem = group_link_label.find("a")
            if not link_elem or not link_elem.get("href"):
                continue
            group_url = link_elem["href"]

            # Extract link to event
            event_link_elem = chunk.find("a", itemprop="url")
            if not event_link_elem or not event_link_elem.get("href"):
                continue
            url = event_link_elem["href"]

            # Extract attendee count
            attendee_elem = chunk.find("div", class_="attendee-count")
            if not attendee_elem:
                continue
            number_part, *_ = attendee_elem.text.strip().split(" ")
            if not number_part.isdigit():
                continue
            attendees = int(number_part)

            events.append(cls(
                name=name,
                description=None,
                time=time,
                group_url=group_url,
                url=url,
                location=None,
                attendees=attendees
            ))

        return events
