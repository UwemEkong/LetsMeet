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
            return {"error": "group with specified url not found"}, 400

        return group.to_dict()
    elif all(arg in request.args for arg in ("category", "zip", "radius")):
        category = request.args["category"]
        zip = request.args["zip"]
        radius = request.args["radius"]

        try:
            zip = int(zip)
        except (ValueError, TypeError):
            return {"error": "zip code must be an integer"}, 400

        if radius not in ("2", "5", "10", "25", "50", "100", "any"):
            return {"error": "radius must be one of (2, 5, 10, 25, 50, 100, any)"}, 400

        if category not in ("environment", "mental_health", "lgbtq", "diversity_inclusion"):
            return {"error": "category must be one of (environment, mental_health, lgbtq, diversity_inclusion)"}, 400

        category = GroupCategory[category]

        groups = await Group.search(category, zip, radius)
        return [g.to_dict() for g in groups], 200
    else:
        return {"error": "invalid arguments"}, 400


@app.route("/api/events", methods=["GET"])
async def events_api():
    if "url" in request.args:
        url = request.args["url"]
        event = await Event.from_url(url)
        if event is None:
            return {"error": "event with specified url not found"}, 400

        return event.to_dict()
    elif all(arg in request.args for arg in ("category", "zip", "radius")):
        category = request.args["category"]
        zip = request.args["zip"]
        radius = request.args["radius"]

        try:
            zip = int(zip)
        except (ValueError, TypeError):
            return {"error": "zip code must be an integer"}, 400

        if radius not in ("2", "5", "10", "25", "50", "100", "any"):
            return {"error": "radius must be one of (2, 5, 10, 25, 50, 100, any)"}, 400

        if category not in ("environment", "mental_health", "lgbtq", "diversity_inclusion"):
            return {"error": "category must be one of (environment, mental_health, lgbtq, diversity_inclusion)"}, 400

        category = GroupCategory[category]

        events = await Event.search(category, zip, radius)
        return json.dumps([e.to_dict() for e in events])
    else:
        return {"error": "invalid arguments"}, 400
