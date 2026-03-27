from fastapi import APIRouter
from service.content import add_content_service
from models.Content import ContentRequest


content=APIRouter()

@content.post("/content/add")
async def add_content(content_data: ContentRequest):
    response= await add_content_service(content_data)
    return response