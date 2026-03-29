from pydantic import BaseModel

class UpdateableUser(BaseModel):
    username: str | None = None
    profile_picture_url: str | None = None
    banner_picture_url: str | None = None