from pydantic import BaseModel
from datetime import datetime

class MovieRequest(BaseModel):
    genres: list[str]
    is_movie: bool
    title: str
    description: str
    release_year: int
    duration_minutes: int
    poster_url: str
    video_url: str

class MovieResponse(BaseModel):
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

class MovieSchema(BaseModel):
    id: int
    duration_minutes: int
    video_url: str