import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
admin_key: str = os.environ.get("SUPABASE_ADMIN_KEY")

supabase: Client = create_client(url, key)
supabase_admin: Client = create_client(url, admin_key)