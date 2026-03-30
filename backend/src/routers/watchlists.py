from fastapi import APIRouter, HTTPException
from clients.supabase import supabase_admin

watchlists = APIRouter()

@watchlists.post("/watchlist/toggle")
async def toggle_watchlist(user_id: str, content_id: int):
    # Check if it already exists
    existing = supabase_admin.table("Watchlists")\
        .select("*")\
        .eq("user_id", user_id)\
        .eq("content_id", content_id)\
        .execute()
    
    if existing.data:
        # If exists, remove it (Unlike/Unsave)
        supabase_admin.table("Watchlists")\
            .delete()\
            .eq("user_id", user_id)\
            .eq("content_id", content_id)\
            .execute()
        return {"status": "removed"}
    else:
        # If not, add it
        supabase_admin.table("Watchlists")\
            .insert({"user_id": user_id, "content_id": content_id})\
            .execute()
        return {"status": "added"}