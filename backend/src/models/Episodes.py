from pydantic import BaseModel

class EpisodesSchema(BaseModel):
    season_id: int
    title: str
    episode_number: int
    duration_minutes: int
    video_url: str

class Episode(EpisodesSchema):
    id: int