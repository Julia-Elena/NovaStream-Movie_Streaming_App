from fastapi import APIRouter
from clients.supabase import supabase_admin
from models.Series import SeriesRequest, SeriesSchema
from models.Content import ContentRequest
from service.content import add_content_service
from service.genres import get_genres_service

series=APIRouter()

@series.post("/series/add")
async def add_series(series_data: SeriesRequest):
    # Create content entry for the series
    content_data = ContentRequest(
        is_movie=series_data.is_movie,
        title=series_data.title,
        description=series_data.description,
        release_year=series_data.release_year,
        poster_url=series_data.poster_url
    )
    try:
        content = await add_content_service(content_data)
    except Exception as e:
        return {"error": f"Failed to add content: {str(e)}"}
    print(content)
    series_data_schema = SeriesSchema(
        id=content.id,
        duration_minutes=series_data.duration_minutes,
        video_url=series_data.video_url
    )


    all_genres = await get_genres_service()
    
    series_genres_names = series_data.genres
    series_genres_ids = []


    # Map genre names to their corresponding IDs
    for genre_name in series_genres_names:
        genre = next((g for g in all_genres if g['name'] == genre_name), None)
        if genre:
            series_genres_ids.append(genre['id'])
        else:
            return {"error": f"Genre '{genre_name}' not found"}


    # Associate the series with its genres in the "Content_Genres" table
    content_genres_data = [{"content_id": content.id, "genre_id": genre_id} for genre_id in series_genres_ids]
    try:
        supabase_admin.table("Content_Genres").insert(content_genres_data).execute()
    except Exception as e:
        return {"error": f"Failed to associate genres with content: {str(e)}"}


    # Insert the series data into the "Series" table
