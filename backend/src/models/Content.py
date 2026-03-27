from pydantic import BaseModel
from datetime import datetime

class ContentRequest(BaseModel):
    is_movie: bool
    title: str
    description: str
    release_year: int
    poster_url: str

class ContentResponse(BaseModel):
    id: int
    is_movie: bool
    title: str
    description: str
    release_year: int
    created_at: datetime
    poster_url: str