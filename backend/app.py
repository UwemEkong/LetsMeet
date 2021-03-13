import json

from quart import Quart

from .meetup import MeetUp, GroupCategory


app = Quart(__name__)


@app.before_serving
async def setup_meetup():
    app.meetup = MeetUp()


@app.route("/", methods=["GET"])
async def index():
    groups = await app.meetup.get_groups(
        GroupCategory.lgbtq,
        60532,
        "25"
    )
    return json.dumps(groups[0].members)
