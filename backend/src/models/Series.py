from pydantic import BaseModel
from datetime import datetime

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
    season_number: int
    episode_number: int