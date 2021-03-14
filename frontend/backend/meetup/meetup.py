from __future__ import annotations

from datetime import datetime
from enum import Enum
import re
from typing import List
import pytz

from dataclasses import dataclass
from quart import current_app as app


class Category(int, Enum):
    environment = 242
    mental_health = 302
    lgbtq = 585
    diversity_inclusion = 212


class GraphQL:
    URL = "https://api.meetup.com/gql"

    @staticmethod
    async def request(gql_query: str, **variables: dict):
        operation_re = re.search(r"query (\w+)+\(", gql_query)
        operation = operation_re.group(1)

        payload = {
            "operationName": operation,
            "query": gql_query,
            "variables": variables
        }

        try:
            async with app.session.post(GraphQL.URL, json=payload) as resp:
                data = await resp.json()

            return data["data"]
        except Exception:
            return

    @staticmethod
    async def get_lat_long(zip: str):
        gql_query = """
        query locationWithInput($query: String!) {
        searchedLocations: findLocation(query: $query) {
            lat
            lon
            }
        }
        """
        resp = await GraphQL.request(gql_query, query=str(zip))
        if not resp:
            return

        location = resp["searchedLocations"]

        if location:
            return location[0]["lat"], location[0]["lon"]

    @staticmethod
    async def get_category(category: Category, zip: int, radius: str):
        gql_query = """
query categorySearch($lat: Float!, $lon: Float!, $categoryId: Int, $startDateRange: ZonedDateTime, $endDateRange: ZonedDateTime, $first: Int, $after: String, $eventType: EventType, $radius: Int, $isHappeningNow: Boolean) {
  results: rankedEvents(filter: {lat: $lat, lon: $lon, categoryId: $categoryId, startDateRange: $startDateRange, endDateRange: $endDateRange, eventType: $eventType, radius: $radius, isHappeningNow: $isHappeningNow}, input: {first: $first, after: $after}) {
    count
    edges {
      node {
        ...CategorySearchNode
        __typename
      }
      recommendationSource
      recommendationId
      __typename
    }
    __typename
  }
}

fragment CategorySearchNode on Event {
  id
  description
  slug
  slugId
  title
  dateTime
  endTime
  timezone
  eventType
  images {
    ...PhotoDetails
    preview
    __typename
  }
  isSaved
  eventUrl
  venue {
    id
    address
    neighborhood
    city
    state
    country
    lat
    lng
    zoom
    name
    radius
    __typename
  }
  group {
    id
    slug
    description
    isPrivate
    stats {
        memberCounts {
            all
        }
    }
    chapstickGroup {
      id
      name
      urlname
      timezone
      link
      city
      state
      country
      groupPhoto {
        ...PhotoDetails
        __typename
      }
      __typename
    }
    __typename
  }
  going
  maxTickets
  __typename
}

fragment PhotoDetails on Image {
  id
  baseUrl
  __typename
}
        """

        lat, lon = await GraphQL.get_lat_long(zip)

        kwargs = {
            "categoryId": category.value,
            "first": 100,
            "lat": lat,
            "lon": lon
        }

        if radius != "any":
            kwargs["radius"] = int(radius)

        resp = await GraphQL.request(
            gql_query,
            **kwargs
        )

        return resp


@dataclass
class Group:
    name: str
    description: str
    url: str
    location: str
    image_url: str
    members: int

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "url": self.url,
            "location": self.location,
            "image_url": self.image_url,
            "members": self.members
        }

    @classmethod
    async def search(cls, category: Category, zip: int, radius: str) -> List[Group]:
        data = await GraphQL.get_category(category, zip, radius)
        data = data["results"]

        if data["count"] == 0:
            return []

        done_ids = set()
        groups = []

        for node in data["edges"]:
            node = node["node"]
            group = node["group"]
            if group["id"] in done_ids:
                continue

            chap = group["chapstickGroup"]

            groups.append(cls(
                name=chap["name"],
                description=group.get("description", ""),
                url=chap["link"],
                location=f"{chap['city'], {chap['state']}}",
                image_url=chap["groupPhoto"]["baseUrl"],
                members=group["stats"]["memberCounts"]["all"]
            ))

            done_ids.add(group["id"])

        return groups


@dataclass
class Event:
    name: str
    time: int
    description: str
    group_url: str
    url: str
    location: str
    attendees: int
    image_url: str

    def to_dict(self):
        return {
            "name": self.name,
            "time": self.time,
            "description": self.description,
            "group_url": self.group_url,
            "url": self.url,
            "location": self.location,
            "attendees": self.attendees,
            "image_url": self.image_url
        }

    @classmethod
    async def search(cls, category: Category, zip: int, radius: str) -> List[Event]:
        data = await GraphQL.get_category(category, zip, radius)
        data = data["results"]

        if data["count"] == 0:
            return []

        done_ids = set()
        events = []

        for node in data["edges"]:
            node = node["node"]
            if node["id"] in done_ids:
                continue

            image_url = None
            if node["images"]:
                image_url = node["images"][0]["baseUrl"]

            if node["eventType"] == "online":
                location = "Online"
            else:
                location = f"{node['venue']['city']}, {node['venue']['state']}"

            start = datetime.strptime(node["dateTime"], r"%Y-%m-%dT%H:%M%z")
            utc_dt = start.astimezone(pytz.utc)
            time = int(utc_dt.timestamp() * 100)

            events.append(cls(
                name=node["title"],
                description=node["description"],
                image_url=image_url,
                url=node["eventUrl"],
                group_url=node["group"]["chapstickGroup"]["link"],
                attendees=node["going"],
                location=location,
                time=time
            ))

            done_ids.add(node["id"])

        return events