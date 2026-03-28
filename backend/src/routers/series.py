from fastapi import APIRouter
from clients.supabase import supabase_admin
from models.Series import SeriesRequest, SeriesResponse, SeriesSchema, Season
from models.Episodes import EpisodesSchema, Episode
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
        series_id=content.id,
        season_number=series_data.season_number
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


    # Insert the data into the "Series_Seasons" table
    try:
        series_seasons_resp = supabase_admin.table("Series_Seasons").insert(series_data_schema.model_dump(mode="json")).execute()
        series_season=series_seasons_resp.data[0]
    except Exception as e:
        return {"error": f"Failed to add series season: {str(e)}"}

    
    episodes_data_schema = EpisodesSchema(
        season_id=series_season["id"],
        title=series_data.episode_title,
        episode_number=series_data.episode_number,
        duration_minutes=series_data.duration_minutes,
        video_url=series_data.video_url
    )


    # Insert the data into the "Episodes" table
    try:
        episodes = supabase_admin.table("Episodes").insert(episodes_data_schema.model_dump(mode="json")).execute()
    except Exception as e:
        return {"error": f"Failed to add episode: {str(e)}"}
    

    return series_data

@series.get("/series")
async def get_series():
    try:
        series_seasons = supabase_admin.table("Series_Seasons").select("*").execute()
    except Exception as e:
        return {"error": f"Failed to fetch series: {str(e)}"}
    
    try:
        episodes = supabase_admin.table("Episodes").select("*").execute()
    except Exception as e:
        return {"error": f"Failed to fetch episodes: {str(e)}"}
    
    try:
        content = supabase_admin.table("Content").select("*").execute()
    except Exception as e:
        return {"error": f"Failed to fetch content: {str(e)}"}
    
    all_genres = await get_genres_service()

    content_dict = {item['id']: item for item in content.data}
    episodes_by_season = {}
    for ep in episodes.data:
        season_id = ep.get('season_id')
        if season_id is None:
            continue
        episodes_by_season.setdefault(season_id, []).append(Episode(**ep))

    series_complete_response = []

    for season in series_seasons.data:
        series_id = season.get('series_id')
        content_info = content_dict.get(series_id)
        if not content_info:
            continue

        # Build genre names for this series
        series_genres_names = []
        content_genres = supabase_admin.table("Content_Genres").select("*").eq("content_id", series_id).execute()
        for genre in content_genres.data:
            genre_info = next((g for g in all_genres if g['id'] == genre['genre_id']), None)
            if genre_info:
                series_genres_names.append(genre_info['name'])

        # Build season object
        season_episodes = episodes_by_season.get(season['id'], [])
        season_obj = Season(
            id=season['id'],
            series_id=series_id,
            season_number=season.get('season_number'),
            episodes=season_episodes
        )

        # Find or create existing series response entry
        existing = next((item for item in series_complete_response if item.id == content_info['id']), None)
        if existing:
            existing.seasons.append(season_obj)
            continue

        is_movie = content_info.get('is_movie', not content_info.get('is_movie', False))
        duration_minutes = content_info.get('duration_minutes', 0)
        video_url = content_info.get('video_url', "")

        series_complete_response.append(SeriesResponse(
            id=content_info['id'],
            is_movie=is_movie,
            title=content_info.get('title', ""),
            description=content_info.get('description', ""),
            genres=series_genres_names,
            release_year=content_info.get('release_year', 0),
            created_at=content_info.get('created_at'),
            poster_url=content_info.get('poster_url', ""),
            duration_minutes=duration_minutes,
            video_url=video_url,
            seasons=[season_obj]
        ))

    return series_complete_response