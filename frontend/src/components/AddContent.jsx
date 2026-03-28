import React, { useState, useEffect } from "react";
import NavbarMain from "./navbar/NavbarMain";

const AddContent = () => {
	const [allGenres, setAllGenres] = useState([]);
	const [error, setError] = useState(null);
	const [selectedGenreTags, setSelectedGenreTags] = useState([]);
	const [currentDropdownValue, setCurrentDropdownValue] =
		useState("Select genres");
	const [contentType, setContentType] = useState("Movie");

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await fetch("http://localhost:8080/genres");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const genresData = await response.json();
				setAllGenres(genresData);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchGenres();
	}, []);

	const handleGenreAdd = (event) => {
		const selectedId = parseInt(event.target.value);

		const genreToAdd = allGenres.find((g) => g.id === selectedId);

		// Prevent duplicates !
		if (
			genreToAdd &&
			!selectedGenreTags.some((tag) => tag.id === genreToAdd.id)
		) {
			setSelectedGenreTags((prevTags) => [...prevTags, genreToAdd]);
		}
		setCurrentDropdownValue("Select genres");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const baseData = {
			title: formData.title,
			description: formData.description,
			release_year: formData.release_year,
			poster_url: formData.poster_url,
			genres: selectedGenreTags.map((tag) => tag.name),
		};

		try {
			if (contentType === "movie") {
				// Call Add Movie Endpoint
				const response = await fetch("http://localhost:8000/movies/add", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...baseData,
						is_movie: true,
						duration_minutes: formData.duration_minutes,
						video_url: formData.video_url,
					}),
				});
				const result = await response.json();
				console.log("Movie Added:", result);
			} else {
				//Call Add Series Endpoint
				const response = await fetch("http://localhost:8000/series/add", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...baseData,
						is_movie: false,
						season_number: formData.season_number,
						episode_number: formData.episode_number,
					}),
				});
				const result = await response.json();
				console.log("Series Added:", result);
			}

			alert("Content added successfully!");
		} catch (error) {
			console.error("Submission failed:", error);
		}
	};

	return (
		<>
			<NavbarMain />
			<div className="">
				<header className="text-white text-2xl text-center font-bold py-5">
					Add Content
				</header>

				<div className="card bg-base-100 w-150 shadow-sm mx-auto h-auto">
					<div className="card-body pt-12 pb-4 ml-4 text-left justify-start gap-2">
						<div className="flex flex-col gap-3">
							<div className="text-sm font-medium text-gray-400">
								Content type
							</div>
							<div className="flex gap-4">
								{/* Movie Option */}
								<label className="flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl border-2 border-transparent has-[:checked]:border-accent transition-all">
									<input
										type="radio"
										name="content"
										className="radio radio-accent"
										defaultChecked
										checked={contentType === "Movie"}
										onChange={() => setContentType("Movie")}
									/>
									<span className="text-sm font-medium text-white">Movie</span>
								</label>

								{/* Series Option */}
								<label className="flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl border-2 border-transparent has-[:checked]:border-accent transition-all">
									<input
										type="radio"
										name="content"
										className="radio radio-accent"
										checked={contentType === "Series"}
										onChange={() => setContentType("Series")}
									/>
									<span className="text-sm font-medium text-white">Series</span>
								</label>
							</div>

							{/* Title */}
							<div className="flex flex-col gap-1 mb-4 pt-1">
								<label className="text-sm font-medium text-gray-400">
									Title
								</label>
								<input
									type="text"
									placeholder="Enter title"
									className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%]"
								/>
							</div>

							{/* Conditional Fields for Series */}
							{contentType === "Series" && (
								<div className="flex gap-4 mb-4 w-[96%]">
									<div className="flex-1">
										<label className="text-sm font-medium text-gray-400">
											Season Number
										</label>
										<input
											type="number"
											placeholder="e.g. 1"
											className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-full"
										/>
									</div>
									<div className="flex-1">
										<label className="text-sm font-medium text-gray-400 mb-1">
											Episode Title
										</label>
										<input
											type="text"
											placeholder="Enter episode title"
											className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%]"
										/>
									</div>
									<div className="flex-1">
										<label className="text-sm font-medium text-gray-400">
											Episode Number
										</label>
										<input
											type="number"
											placeholder="e.g. 5"
											className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-full"
										/>
									</div>
								</div>
							)}

							{/* Description */}
							<div className="flex flex-col gap-1 mb-4">
								<label className="text-sm font-medium text-gray-400">
									Description
								</label>
								<textarea
									placeholder="Enter a description..."
									className="textarea textarea-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%] h-24"
								></textarea>
							</div>

							{/* Duration (minutes) */}
							<div className="flex flex-col gap-1 mb-4">
								<label className="text-sm font-medium text-gray-400">
									Duration (minutes)
								</label>
								<input
									type="number"
									placeholder="e.g. 120"
									className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%]"
								/>
							</div>

							{/* Release Year Field */}
							<div className="flex flex-col gap-1 mb-6">
								{" "}
								{/* Slightly more margin here before the files */}
								<label className="text-sm font-medium text-gray-400">
									Release year
								</label>
								<input
									type="number"
									placeholder="e.g. 2024"
									className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%]"
								/>
							</div>

							{/* Genres selection */}
							<div className="flex flex-col gap-1 mb-6">
								<label className="text-sm font-medium text-gray-400">
									Genres
								</label>

								<select
									value={currentDropdownValue}
									onChange={handleGenreAdd}
									className="select bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%] mb-2"
									// We will add the onChange handler in Phase 2
								>
									<option disabled={true}>Select genres</option>

									{allGenres.map((genre) => (
										<option key={genre.id} value={genre.id}>
											{genre.name}
										</option>
									))}
								</select>

								{/* Display error if fetching failed */}
								{error && (
									<div className="text-error text-xs">
										Error loading genres: {error}
									</div>
								)}

								{/* Selected Tags Display (Phase 2 replacement) */}
								<div className="flex flex-wrap gap-2 mt-2">
									{selectedGenreTags.map((tag) => (
										<div
											key={tag.id}
											className="flex items-center gap-1.5 label bg-base-200 py-2 px-4 rounded-lg border-2 border-accent text-sm font-medium text-white transition-all cursor-pointer hover:bg-neutral"
											onClick={() => {
												setSelectedGenreTags((prev) =>
													prev.filter((t) => t.id !== tag.id),
												);
											}}
										>
											<span>{tag.name}</span>
											<span className="text-xs text-gray-400 hover:text-white">
												✕
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Poster */}
							<div className="text-sm font-medium text-gray-400">Poster</div>
							<label className="flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl transition-all w-[97%]">
								<input
									type="file"
									className="file-input file-input-accent w-full"
								/>
							</label>

							{/* Content file */}
							<div className="text-sm font-medium text-gray-400 pt-1">
								Content file
							</div>
							<label className="flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl transition-all w-[97%]">
								<input
									type="file"
									className="file-input file-input-accent w-full"
								/>
							</label>

							<div className="flex items-center justify-center">
								<button className="btn btn-accent btn-outline rounded-lg mt-4.5 mb-4 w-[30%] ">
									Add content
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddContent;
