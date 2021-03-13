from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional, Tuple


EVENT_URL = "https://www.meetup.com/find/events/{}/?allMeetups=true&userFreeform={}&radius={}"


@dataclass
class Event:
    name: str
    time: int
    description: Optional[str]
    group_url: str
    url: str
    location: str
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
    async def search(cls, category, zip: int, radius: str, when: Tuple[int, int, int]) -> List[Event]:
        pass
