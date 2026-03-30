import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const MovieCard = ({ movie, onWatchClick }) => {
	const { user } = UserAuth();
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	const handleWatchClick = (e) => {
		if (onWatchClick) {
			onWatchClick(movie);
		}
	};

	const handleWatchlistToggle = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!user) return alert("Please log in to use the watchlist");

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/watchlist/toggle?user_id=${user.id}&content_id=${movie.id}`,
				{
					method: "POST",
				},
			);
			const result = await response.json();

			setIsInWatchlist(result.status === "added");
		} catch (err) {
			console.error("Watchlist error:", err);
		}
	};

	return (
		<div
			className="group relative overflow-hidden rounded-xl bg-base-100 shadow-xl cursor-pointer transition-all duration-300"
			onClick={handleWatchClick}
		>
			{/* The Full Poster Image */}
			<figure className="aspect-[2/3] w-full overflow-hidden rounded-xl">
				<img
					src={movie.poster_url}
					className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-110"
					alt={movie.title}
				/>
			</figure>
			{/* Hover Details Overlay */}
			<div className="absolute inset-0 rounded-xl flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
					{movie.title}
				</h2>

				<p className="text-sm text-gray-300 line-clamp-4 mb-4">
					{movie.description}
				</p>

				<div className="flex flex-wrap gap-1 mb-4">
					{movie.genres.slice(0, 4).map((genre, index) => (
						<span key={index} className="badge badge-secondary badge-sm p-2">
							{genre}
						</span>
					))}
				</div>

				<div className="flex justify-between items-center text-xs font-semibold text-gray-400 border-t border-white/10 pt-4">
					<span className="flex items-center gap-1">{movie.release_year}</span>
					<div className="items=right flex gap-2 justify-between items-center">
						{/* Fake play button */}
						<button
							onClick={(e) => {
								e.stopPropagation();
							}}
							className="btn btn-circle btn-sm top-2 right-2 bg-black/50 border-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								class="size-7"
							>
								<path
									strokeLinecap="round"
									strokelinejoin="round"
									d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
								/>
							</svg>
						</button>

						{/* Watchlist button */}
						<button
							onClick={handleWatchlistToggle}
							className="btn btn-circle btn-xs top-2 right-2 bg-black/50 border-none z-10"
						>
							{isInWatchlist ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-6"
								>
									<path
										fill-rule="evenodd"
										d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
										clip-rule="evenodd"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									class="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
