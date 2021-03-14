import json

from quart import Quart, request

from backend.meetup.event import Event

from .meetup import Group, GroupCategory

app = Quart(__name__)


@app.route("/api/groups", methods=["GET"])
async def groups_api():
    if "url" in request.args:
        url = request.args["url"]
        group = await Group.from_url(url)
        if group is None:
            return json.dumps({"error": "group with specified url not found"})

        return json.dumps(group.to_dict())
    elif all(arg in request.args for arg in ("category", "zip", "radius")):
        category = request.args["category"]
        zip = request.args["zip"]
        radius = request.args["radius"]

        try:
            zip = int(zip)
        except (ValueError, TypeError):
            return json.dumps({"error": "zip code must be an integer"})

        if radius not in ("2", "5", "10", "25", "50", "100", "any"):
            return json.dumps({"error": "radius must be one of (2, 5, 10, 25, 50, 100, any)"})

        if category not in ("environment", "mental_health", "lgbtq", "diversity_inclusion"):
            return json.dumps({"error": "category must be one of (environment, mental_health, lgbtq, diversity_inclusion)"})

        category = GroupCategory[category]

        groups = await Group.search(category, zip, radius)
        return json.dumps([g.to_dict() for g in groups])
    else:
        return json.dumps({"error": "invalid arguments"})


@app.route("/api/events", methods=["GET"])
async def events_api():
    if "url" in request.args:
        url = request.args["url"]
        event = await Event.from_url(url)
        if event is None:
            return json.dumps({"error": "event with specified url not found"})

        return json.dumps(event.to_dict())
    elif all(arg in request.args for arg in ("category", "zip", "radius")):
        category = request.args["category"]
        zip = request.args["zip"]
        radius = request.args["radius"]

        try:
            zip = int(zip)
        except (ValueError, TypeError):
            return json.dumps({"error": "zip code must be an integer"})

        if radius not in ("2", "5", "10", "25", "50", "100", "any"):
            return json.dumps({"error": "radius must be one of (2, 5, 10, 25, 50, 100, any)"})

        if category not in ("environment", "mental_health", "lgbtq", "diversity_inclusion"):
            return json.dumps({"error": "category must be one of (environment, mental_health, lgbtq, diversity_inclusion)"})

        category = GroupCategory[category]

        events = await Event.search(category, zip, radius)
        return json.dumps([e.to_dict() for e in events])
    else:
        return json.dumps({"error": "invalid arguments"})
