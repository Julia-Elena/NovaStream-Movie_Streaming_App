from pydantic import BaseModel
from datetime import datetime
from models.Episodes import Episode

class SeriesRequest(BaseModel):
    genres: list[str]
    is_movie: bool
    title: str
    description: str
    release_year: int
    duration_minutes: int
    poster_url: str
    video_url: str
    season_number: int
    episode_number: int
    episode_title: str


class Season(BaseModel):
    id:int
    series_id:int
    season_number:int
    episodes:list[Episode]


class SeriesResponse(BaseModel):
    id: int
    is_movie: bool
    title: str
    description: str
    genres: list[str]
    release_year: int
    created_at: datetime
    duration_minutes: int
    poster_url: str
    video_url: str
    seasons:list[Season]

class SeriesSchema(BaseModel):
    series_id: int
    season_number: int