import json

import aiohttp
from quart import Quart, request, render_template

from .meetup import Category, Group, Event

app = Quart(__name__)


@app.before_serving
async def setup_session():
    app.session = aiohttp.ClientSession()


@app.errorhandler(404)
async def not_found(err):
    return await render_template("index.html")


@app.route("/test/<string:zip>")
async def test(zip: str):
    return json.dumps(await Group.search(Category.environment, zip, "25"))



@app.route("/api/groups", methods=["GET"])
async def groups_api():
    if all(arg in request.args for arg in ("category", "zip", "radius")):
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

        category = Category[category]

        groups = await Group.search(category, zip, radius)
        return json.dumps([g.to_dict() for g in groups]), 200
    else:
        return {"error": "invalid arguments"}, 400


@app.route("/api/events", methods=["GET"])
async def events_api():
    if all(arg in request.args for arg in ("category", "zip", "radius")):
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

        category = Category[category]

        events = await Event.search(category, zip, radius)
        return json.dumps([e.to_dict() for e in events])
    else:
        return {"error": "invalid arguments"}, 400
