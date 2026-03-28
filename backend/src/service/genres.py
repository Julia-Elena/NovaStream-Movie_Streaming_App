from models.Content import ContentRequest, ContentResponse
from clients.supabase import supabase_admin


async def get_genres_service():
    try:
        genres = supabase_admin.table("Genres").select("*").execute()
        return genres.data
    except Exception as e:
        return {"error": f"Failed to fetch genres: {str(e)}"}
    