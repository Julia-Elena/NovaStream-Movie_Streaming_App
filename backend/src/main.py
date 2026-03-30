import uvicorn
from fastapi import FastAPI
from routers.health import health
from routers.users import users
from routers.movies import movies
from routers.content import content
from routers.genres import genres
from routers.series import series
from routers.watchlists import watchlists
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI( title="FastAPI NovaStream Application",
    description="A FastAPI application for NovaStream backend services.",
    version="v1")

# Allow your frontend origin
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://localhost:5173/addcontent"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health,tags=["Health"])
app.include_router(users,tags=["Users"])
app.include_router(movies,tags=["Movies"])
app.include_router(content,tags=["Content"])
app.include_router(genres,tags=["Genres"])
app.include_router(series, tags=["Series"])
app.include_router(watchlists, tags=["Watchlists"])


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)