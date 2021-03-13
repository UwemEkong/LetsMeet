from .group import Group, GroupCategory


class MeetUp:
    async def get_groups(self, category: GroupCategory, zip: int, radius: str):
        """
        """
        return await Group.search(category, zip, radius)
