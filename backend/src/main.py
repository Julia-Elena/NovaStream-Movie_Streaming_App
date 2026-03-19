from fastapi import FastAPI
from routers.health import health
import uvicorn

app = FastAPI( title="My FastAPI Application",
    description="This is a sample FastAPI application.",
    version="v1")

app.include_router(health)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)