from fastapi import APIRouter
from clients.supabase import supabase_admin

users=APIRouter()

# Get all users
@users.get("/users")
async def get_users():
    return supabase_admin.table("Users").select("*").execute().data

# Get specific user by id
@users.get("/users/{user_id}")
async def get_user(user_id: str):
    return supabase_admin.table("Users").select("*").eq("id", user_id).execute().data


