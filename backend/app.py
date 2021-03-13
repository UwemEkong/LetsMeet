import json

from quart import Quart, request

from .meetup import Group, GroupCategory


app = Quart(__name__)


@app.route("/", methods=["GET"])
async def index():
    groups = await Group.search(
        GroupCategory.lgbtq,
        60532,
        "25"
    )
    link = groups[0].url

    group = await Group.from_url(link)

    print(group.events[0].time)
    return json.dumps(group.events[0].url)


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
            return json.dumps({"error": "radius must be (2, 5, 10, 25, 50, 100, any)"})

        if category not in ("environment", "mental_health", "lgbtq", "diversity_inclusion"):
            return json.dumps({"error": "category must be (environment, mental_health, lgbtq, diversity_inclusion)"})

        category = GroupCategory[category]

        groups = await Group.search(category, zip, radius)
        return json.dumps([g.to_dict() for g in groups])
    else:
        return json.dumps({"error": "invalid arguments"})
