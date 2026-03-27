import uvicorn
from fastapi import FastAPI
from routers.health import health
from routers.users import users
from routers.movies import movies
from routers.content import content
from routers.genres import genres

app = FastAPI( title="FastAPI NovaStream Application",
    description="A FastAPI application for NovaStream backend services.",
    version="v1")

app.include_router(health,tags=["Health"])
app.include_router(users,tags=["Users"])
app.include_router(movies,tags=["Movies"])
app.include_router(content,tags=["Content"])
app.include_router(genres,tags=["Genres"])

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)