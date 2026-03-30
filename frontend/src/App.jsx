import { useState, useEffect } from "react";
import "./App.css";
import NavbarMain from "./components/navbar/NavbarMain";
import MovieRow from "./components/MovieRow";

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

	// --- Categorization Logic ---
	// In a real app, these would be separate API calls or filtered by genre
	const topPicks = movies.slice(0, 10);
	const newlyAdded = [...movies].sort((a, b) => b.id - a.id).slice(0, 10);
	const actionAdventureMovies = movies.filter(
		(m) => m.genres?.includes("Action") && m.genres?.includes("Adventure"),
	);
	const animatedMovies = movies.filter((m) => m.genres?.includes("Animation"));

	return (
		<div className="bg-base-300 min-h-screen">
			<NavbarMain />

			<div className="w-full py-8">
				{loading && (
					<div className="flex justify-center items-center min-h-64">
						<div className="loading loading-spinner loading-lg text-accent"></div>
					</div>
				)}

				{error && (
					<div className="flex justify-center items-center px-6">
						<div className="alert alert-error shadow-lg">
							<span>Error loading movies: {error}</span>
						</div>
					</div>
				)}

				{!loading && !error && movies.length === 0 && (
					<div className="text-center text-gray-400 mt-20">
						<p className="text-xl">No movies available</p>
						<p className="text-sm mt-2">Check back later for new content!</p>
					</div>
				)}

				{/* --- Row-Based Display --- */}
				{!loading && !error && movies.length > 0 && (
					<div className="flex flex-col gap-2">
						{/* Featured Hero (Optional: You could put a Hero component here) */}

						<MovieRow
							title="Top Picks for You"
							movies={topPicks}
							onWatchClick={handleWatchMovie}
						/>

						<MovieRow
							title="Newly Added"
							movies={newlyAdded}
							onWatchClick={handleWatchMovie}
						/>

						{animatedMovies.length > 0 && (
							<MovieRow
								title="Animated"
								movies={animatedMovies}
								onWatchClick={handleWatchMovie}
							/>
						)}

						{actionAdventureMovies.length > 0 && (
							<MovieRow
								title="Action & Adventure"
								movies={actionAdventureMovies}
								onWatchClick={handleWatchMovie}
							/>
						)}
					</div>
				)}
			</div>

			{/* Video Player Modal */}
			{selectedMovie && (
				<div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
					<div className="bg-base-100 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
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
						<div className="p-2 bg-black">
							{selectedMovie.video_url ? (
								<video
									controls
									autoPlay
									className="w-full max-h-[70vh] rounded-sm"
									src={selectedMovie.video_url}
								>
									Your browser does not support the video tag.
								</video>
							) : (
								<div className="flex items-center justify-center h-96 bg-base-200">
									<p className="text-gray-400">Video source not found.</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
