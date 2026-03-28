import { useState, useEffect } from "react";
import "./App.css";
import NavbarMain from "./components/navbar/NavbarMain";
import MovieCard from "./components/MovieCard";

function App() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/movies`,
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const moviesData = await response.json();
				setMovies(moviesData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	const handleWatchMovie = (movie) => {
		setSelectedMovie(movie);
	};

	const closeVideoPlayer = () => {
		setSelectedMovie(null);
	};

	return (
		<>
			<NavbarMain />
			<div className="container mx-auto px-4 py-8">
				<header className="text-white text-3xl text-center font-bold py-5 mb-8">
					Movies
				</header>

				{loading && (
					<div className="flex justify-center items-center min-h-64">
						<div className="loading loading-spinner loading-lg"></div>
					</div>
				)}

				{error && (
					<div className="flex justify-center items-center min-h-64">
						<div className="alert alert-error">
							<span>Error loading movies: {error}</span>
						</div>
					</div>
				)}

				{!loading && !error && movies.length === 0 && (
					<div className="text-center text-gray-400">
						<p className="text-xl">No movies available</p>
						<p className="text-sm mt-2">Add some movies to get started!</p>
					</div>
				)}

				{!loading && !error && movies.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{movies.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								onWatchClick={handleWatchMovie}
							/>
						))}
					</div>
				)}
			</div>

			{/* Video Player Modal */}
			{selectedMovie && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
					<div className="bg-base-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
						<div className="flex justify-between items-center p-4 border-b border-base-300">
							<h3 className="text-xl font-bold text-white">
								{selectedMovie.title}
							</h3>
							<button
								onClick={closeVideoPlayer}
								className="btn btn-sm btn-circle btn-ghost"
							>
								✕
							</button>
						</div>
						<div className="p-4">
							{selectedMovie.video_url ? (
								<video
									controls
									autoPlay
									className="w-full max-h-[70vh] rounded-lg"
									src={selectedMovie.video_url}
									onError={(e) => {
										console.error(
											"Video failed to load:",
											selectedMovie.video_url,
										);
									}}
								>
									Your browser does not support the video tag.
								</video>
							) : (
								<div className="flex items-center justify-center h-64 bg-base-200 rounded-lg">
									<p className="text-gray-400">Video not available</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
