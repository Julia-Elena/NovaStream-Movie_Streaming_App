from fastapi import APIRouter
from clients.supabase import supabase_admin

user=APIRouter()

@user.get("/users")
async def get_users():
    return supabase_admin.table("Users").select("*").execute().data

