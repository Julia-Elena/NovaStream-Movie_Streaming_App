import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, onWatchClick }) => {
	const scrollRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);

	const onScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft } = scrollRef.current;
			setShowLeftArrow(scrollLeft > 10);
		}
	};

	const scroll = (direction) => {
		if (scrollRef.current) {
			const { clientWidth } = scrollRef.current;
			const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	return (
		<div className="mb-6 px-6 lg:px-12">
			<h2 className="text-xl font-bold text-white mb-4 text-left hover:text-accent cursor-pointer transition-colors duration-200">
				{title}
			</h2>
			<div className="relative group/row flex items-center">
				{/* Left Arrow */}
				{showLeftArrow && (
					<button
						onClick={() => scroll("left")}
						className="absolute left-[-50px] z-10 p-2 m-2 rounded-full bg-black/60 text-white hover:bg-accent transition-all duration-300 opacity-0 group-hover/row:opacity-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
				)}

				<div
					ref={scrollRef}
					onScroll={onScroll}
					className="carousel carousel-center bg-transparent rounded-box w-full space-x-4 p-4"
				>
					{movies.map((movie) => (
						<div key={movie.id} className="w-56 carousel-item flex-shrink-0">
							<MovieCard movie={movie} onWatchClick={onWatchClick} />
						</div>
					))}
				</div>

				{/* Right Arrow */}
				<button
					onClick={() => scroll("right")}
					className="absolute right-[-50px] z-10 p-2 m-2 rounded-full bg-black/60 text-white hover:bg-accent transition-all duration-300 opacity-0 group-hover/row:opacity-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m8.25 4.5 7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default MovieRow;
