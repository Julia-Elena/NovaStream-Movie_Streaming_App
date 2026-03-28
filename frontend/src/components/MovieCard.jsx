import React from "react";

const MovieCard = ({ movie, onWatchClick }) => {
	const handleWatchClick = () => {
		if (onWatchClick) {
			onWatchClick(movie);
		}
	};

	return (
		<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
			<figure className="px-4 pt-4">
				<img
					src={
						movie.poster_url ||
						"https://via.placeholder.com/300x450?text=No+Image"
					}
					alt={movie.title}
					className="rounded-xl w-full h-64 object-cover cursor-pointer"
					onError={(e) => {
						e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
					}}
					onClick={handleWatchClick}
				/>
			</figure>
			<div className="card-body p-4">
				<h2 className="card-title text-lg font-bold text-white line-clamp-2">
					{movie.title}
				</h2>
				<p className="text-sm text-gray-400 line-clamp-3">
					{movie.description}
				</p>
				<div className="flex flex-wrap gap-1 mt-2">
					{movie.genres.slice(0, 3).map((genre, index) => (
						<span key={index} className="badge badge-primary badge-sm">
							{genre}
						</span>
					))}
					{movie.genres.length > 3 && (
						<span className="badge badge-outline badge-sm">
							+{movie.genres.length - 3}
						</span>
					)}
				</div>
				<div className="flex justify-between items-center mt-3 text-sm text-gray-400">
					<span>{movie.release_year}</span>
					<span>{movie.duration_minutes} min</span>
				</div>
				<div className="card-actions justify-end mt-4">
					<button className="btn btn-primary btn-sm" onClick={handleWatchClick}>
						Watch Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
