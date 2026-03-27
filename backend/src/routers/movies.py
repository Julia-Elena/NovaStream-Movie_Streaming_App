from fastapi import APIRouter
from routers.genres import get_genres
from clients.supabase import supabase_admin
from models.Movies import MovieRequest, MovieResponse, MovieSchema
from service.content import add_content_service
from service.genres import get_genres_service
from models.Content import ContentRequest

movies=APIRouter()

@movies.post("/movies/add")
async def add_movie(movie_data: MovieRequest):
    

    # Create content entry for the movie
    content_data = ContentRequest(
        is_movie=movie_data.is_movie,
        title=movie_data.title,
        description=movie_data.description,
        release_year=movie_data.release_year,
        poster_url=movie_data.poster_url
    )
    try:
        content = await add_content_service(content_data)
    except Exception as e:
        return {"error": f"Failed to add content: {str(e)}"}
    print(content)
    movie_data_schema = MovieSchema(
        id=content.id,
        duration_minutes=movie_data.duration_minutes,
        video_url=movie_data.video_url
    )


    all_genres = await get_genres_service()
    
    movie_genres_names = movie_data.genres
    movie_genres_ids = []


    # Map genre names to their corresponding IDs
    for genre_name in movie_genres_names:
        genre = next((g for g in all_genres if g['name'] == genre_name), None)
        if genre:
            movie_genres_ids.append(genre['id'])
        else:
            return {"error": f"Genre '{genre_name}' not found"}


    # Associate the movie with its genres in the "Content_Genres" table
    content_genres_data = [{"content_id": content.id, "genre_id": genre_id} for genre_id in movie_genres_ids]
    try:
        supabase_admin.table("Content_Genres").insert(content_genres_data).execute()
    except Exception as e:
        return {"error": f"Failed to associate genres with content: {str(e)}"}


    # Insert the movie data into the "Movies" table
    try:
        movie = supabase_admin.table("Movies").insert(movie_data_schema.model_dump()).execute()
    except Exception as e:
        return {"error": f"Failed to add movie: {str(e)}"}
    
    
    return MovieSchema(**movie.data[0])



@movies.get("/movies")
async def get_movies():
    try:
        movies = supabase_admin.table("Movies").select("*").execute()
    except Exception as e:
        return {"error": f"Failed to fetch movies: {str(e)}"}
    
    try:
        content = supabase_admin.table("Content").select("*").execute()
    except Exception as e:
        return {"error": f"Failed to fetch content: {str(e)}"}
    
    all_genres = await get_genres_service()

    content_dict = {item['id']: item for item in content.data}
    movies_with_content = []
    for movie in movies.data:
        content_info = content_dict.get(movie['id'])
        if content_info:
            movie_genres_names = []
            content_genres = supabase_admin.table("Content_Genres").select("*").eq("content_id", movie['id']).execute()

            for genre in content_genres.data:
                genre_info = next((g for g in all_genres if g['id'] == genre['genre_id']), None)
                if genre_info:
                    movie_genres_names.append(genre_info['name'])

            movies_with_content.append(MovieResponse(
                id=movie['id'],
                is_movie=content_info['is_movie'],
                title=content_info['title'],
                description=content_info['description'],
                genres=movie_genres_names,
                release_year=content_info['release_year'],
                created_at=content_info['created_at'],
                poster_url=content_info['poster_url'],
                duration_minutes=movie['duration_minutes'],
                video_url=movie['video_url']
            ))
    return movies_with_content

