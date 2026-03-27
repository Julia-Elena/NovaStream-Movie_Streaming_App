from models.Content import ContentRequest, ContentResponse
from clients.supabase import supabase_admin


async def add_content_service(content_data: ContentRequest):
    # Insert the content data into the "Content" table
    response = supabase_admin.table("Content").insert(content_data.model_dump()).execute()
    return ContentResponse(**response.data[0])