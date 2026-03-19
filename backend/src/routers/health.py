
from fastapi import APIRouter



health=APIRouter()

@health.get("/health")
async def health_check():
    return {"status": "UP"}