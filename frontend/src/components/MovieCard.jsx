import React from "react";

const MovieCard = ({ movie, onWatchClick }) => {
	const handleWatchClick = () => {
		if (onWatchClick) {
			onWatchClick(movie);
		}
	};

	return (
		<div
			className="group relative overflow-hidden rounded-xl bg-base-100 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-2"
			onClick={handleWatchClick}
		>
			{/* The Full Poster Image */}
			<figure className="h-[450px] w-full">
				<img
					src={
						movie.poster_url ||
						"https://via.placeholder.com/300x450?text=No+Image"
					}
					alt={movie.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
					onError={(e) => {
						e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
					}}
				/>
			</figure>

			{/* Hover Details Overlay */}
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
					{movie.title}
				</h2>

				<p className="text-sm text-gray-300 line-clamp-4 mb-4">
					{movie.description}
				</p>

				<div className="flex flex-wrap gap-1 mb-4">
					{movie.genres.slice(0, 3).map((genre, index) => (
						<span key={index} className="badge badge-accent badge-sm">
							{genre}
						</span>
					))}
				</div>

				<div className="flex justify-between items-center text-xs font-semibold text-gray-400 border-t border-white/10 pt-4">
					<span className="flex items-center gap-1">
						📅 {movie.release_year}
					</span>
					<span className="flex items-center gap-1">
						⏱️ {movie.duration_minutes} min
					</span>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
