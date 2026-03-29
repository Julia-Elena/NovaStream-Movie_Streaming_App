from fastapi import APIRouter
from clients.supabase import supabase_admin
from models.Users import UpdateableUser

users=APIRouter()

# Get all users
@users.get("/users")
async def get_users():
    return supabase_admin.table("Users").select("*").execute().data

# Get specific user by id
@users.get("/users/{user_id}")
async def get_user(user_id: str):
    return supabase_admin.table("Users").select("*").eq("id", user_id).execute().data

# Update user
@users.patch("/users/{user_id}")
async def update_user(user_id: str, user_update:UpdateableUser):
    return supabase_admin.table("Users").update(user_update.model_dump(mode="json", exclude_none=True)).eq("id", user_id).execute().data
