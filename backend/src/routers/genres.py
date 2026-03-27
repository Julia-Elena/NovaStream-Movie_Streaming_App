from fastapi import APIRouter
from clients.supabase import supabase_admin
from service.genres import get_genres_service

genres=APIRouter()

@genres.get("/genres")
async def get_genres():
    response = await get_genres_service()
    return response

@genres.post("/genres/add")
async def add_genre(name: str):
    try:
        genre = supabase_admin.table("Genres").insert({"name": name}).execute()
        return genre.data[0]
    except Exception as e:
        return {"error": f"Failed to add genre: {str(e)}"}