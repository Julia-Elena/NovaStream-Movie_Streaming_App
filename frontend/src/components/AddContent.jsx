import React, { useState, useEffect } from "react";
import NavbarMain from "./navbar/NavbarMain";
import { supabase } from "../supabaseClient";

const AddContent = () => {
	const [allGenres, setAllGenres] = useState([]);
	const [error, setError] = useState(null);
	const [selectedGenreTags, setSelectedGenreTags] = useState([]);
	const [currentDropdownValue, setCurrentDropdownValue] =
		useState("Select genres");
	const [contentType, setContentType] = useState("Movie");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		release_year: "",
		poster_url: "",
		duration_minutes: "",
		video_url: "",
		season_number: "",
		episode_number: "",
		episode_title: "",
	});
	const [posterFile, setPosterFile] = useState(null);
	const [videoFile, setVideoFile] = useState(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/genres`,
				);
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePosterFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPosterFile(file);
		}
	};

	const handleVideoFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setVideoFile(file);
		}
	};

	const uploadFile = async (file, bucket, fileName) => {
		// Note: Make sure to create 'images' and 'videos' buckets in Supabase dashboard
		// and set them to public for file access
		const { data, error } = await supabase.storage
			.from(bucket)
			.upload(fileName, file);

		if (error) {
			console.error(`Error uploading to ${bucket}:`, error);
			throw new Error(`Failed to upload file to ${bucket}: ${error.message}`);
		}

		const {
			data: { publicUrl },
		} = supabase.storage.from(bucket).getPublicUrl(fileName);

		return publicUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (!posterFile) {
			alert("Please select a poster image.");
			return;
		}
		if (!videoFile) {
			alert("Please select a video file.");
			return;
		}
		if (!formData.title.trim()) {
			alert("Please enter a title.");
			return;
		}
		if (!formData.description.trim()) {
			alert("Please enter a description.");
			return;
		}
		if (!formData.release_year) {
			alert("Please enter a release year.");
			return;
		}
		if (selectedGenreTags.length === 0) {
			alert("Please select at least one genre.");
			return;
		}
		if (
			contentType === "Series" &&
			(!formData.season_number || !formData.episode_number)
		) {
			alert("Please enter season and episode numbers for series.");
			return;
		}

		setUploading(true);

		try {
			let posterUrl = "";
			let videoUrl = "";

			// Upload poster if selected
			if (posterFile) {
				const posterFileName = `${formData.title}/${Date.now()}-${posterFile.name}`;
				posterUrl = await uploadFile(posterFile, "Movies", posterFileName);
			}

			// Upload video if selected
			if (videoFile) {
				const videoFileName = `${formData.title}/${Date.now()}-${videoFile.name}`;
				videoUrl = await uploadFile(videoFile, "Movies", videoFileName);
			}

			const baseData = {
				title: formData.title,
				description: formData.description,
				release_year: parseInt(formData.release_year),
				poster_url: posterUrl,
				genres: selectedGenreTags.map((tag) => tag.name),
			};

			if (contentType === "Movie") {
				// Call Add Movie Endpoint
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/movies/add`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							...baseData,
							is_movie: true,
							duration_minutes: parseInt(formData.duration_minutes),
							video_url: videoUrl,
						}),
					},
				);
				const result = await response.json();
				console.log("Movie Added:", result);
			} else {
				//Call Add Series Endpoint
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/series/add`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							...baseData,
							is_movie: false,
							duration_minutes: parseInt(formData.duration_minutes),
							video_url: videoUrl,
							season_number: parseInt(formData.season_number),
							episode_number: parseInt(formData.episode_number),
						}),
					},
				);
				const result = await response.json();
				console.log("Series Added:", result);
			}

			alert("Content added successfully!");
			// Reset form
			setFormData({
				title: "",
				description: "",
				release_year: "",
				poster_url: "",
				duration_minutes: "",
				video_url: "",
				season_number: "",
				episode_number: "",
				episode_title: "",
			});
			setPosterFile(null);
			setVideoFile(null);
			setSelectedGenreTags([]);
		} catch (error) {
			console.error("Submission failed:", error);
			alert("Failed to add content. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			<NavbarMain />
			<div>
				<header className="text-white text-2xl text-center font-bold py-5">
					Add Content
				</header>

				<div className="card bg-base-100 w-150 shadow-sm mx-auto h-auto">
					<form onSubmit={handleSubmit}>
						<div className="card-body pt-12 pb-4 ml-4 text-left justify-start gap-2">
							<div className="flex flex-col gap-3">
								<div className="text-sm font-medium text-gray-400">
									Content type
								</div>
								<div className="flex gap-4">
									<label
										className={`flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl border-2 transition-all ${contentType === "Movie" ? "border-accent" : "border-transparent"}`}
									>
										<input
											type="radio"
											name="content"
											className="radio radio-accent"
											checked={contentType === "Movie"}
											onChange={() => setContentType("Movie")}
										/>
										<span className="text-sm font-medium text-white">
											Movie
										</span>
									</label>

									<label
										className={`flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl border-2 transition-all ${contentType === "Series" ? "border-accent" : "border-transparent"}`}
									>
										<input
											type="radio"
											name="content"
											className="radio radio-accent"
											checked={contentType === "Series"}
											onChange={() => setContentType("Series")}
										/>
										<span className="text-sm font-medium text-white">
											Series
										</span>
									</label>
								</div>
							</div>

							{/* Title */}
							<div className="flex flex-col gap-1 mb-4 pt-1">
								<label className="text-sm font-medium text-gray-400">
									Title
								</label>
								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
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
											name="season_number"
											value={formData.season_number}
											onChange={handleInputChange}
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
											name="episode_title"
											value={formData.episode_title}
											onChange={handleInputChange}
											placeholder="Enter episode title"
											className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-full"
										/>
									</div>
									<div className="flex-1">
										<label className="text-sm font-medium text-gray-400">
											Episode Number
										</label>
										<input
											type="number"
											name="episode_number"
											value={formData.episode_number}
											onChange={handleInputChange}
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
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									placeholder="Enter a description..."
									className="textarea textarea-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%] h-24"
								></textarea>
							</div>

							<div className="flex flex-col gap-1 mb-4">
								<label className="text-sm font-medium text-gray-400">
									Duration (minutes)
								</label>
								<input
									type="number"
									name="duration_minutes"
									value={formData.duration_minutes}
									onChange={handleInputChange}
									placeholder="e.g. 120"
									className="input input-bordered bg-base-200 border-none focus:ring-1 focus:ring-accent w-[96%]"
								/>
							</div>

							<div className="flex flex-col gap-1 mb-6">
								<label className="text-sm font-medium text-gray-400">
									Release year
								</label>
								<input
									type="number"
									name="release_year"
									value={formData.release_year}
									onChange={handleInputChange}
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
								>
									<option disabled>Select genres</option>
									{allGenres.map((genre) => (
										<option key={genre.id} value={genre.id}>
											{genre.name}
										</option>
									))}
								</select>
								<div className="flex flex-wrap gap-2 mt-2">
									{selectedGenreTags.map((tag) => (
										<div
											key={tag.id}
											className="flex items-center gap-1.5 label bg-base-200 py-2 px-4 rounded-lg border-2 border-accent text-sm font-medium text-white transition-all cursor-pointer hover:bg-neutral"
											onClick={() =>
												setSelectedGenreTags((prev) =>
													prev.filter((t) => t.id !== tag.id),
												)
											}
										>
											<span>{tag.name}</span>
											<span className="text-xs text-gray-400">✕</span>
										</div>
									))}
								</div>
							</div>

							{/* Poster */}
							<div className="text-sm font-medium text-gray-400">Poster</div>
							<label className="flex items-center gap-3 cursor-pointer bg-base-200 py-3 px-5 rounded-xl transition-all w-[97%]">
								<input
									type="file"
									accept="image/*"
									onChange={handlePosterFileChange}
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
									accept="video/*"
									onChange={handleVideoFileChange}
									className="file-input file-input-accent w-full"
								/>
							</label>

							<div className="flex items-center justify-center">
								<button
									type="submit"
									className="btn btn-accent btn-outline rounded-lg mt-4.5 mb-4 w-[30%]"
									disabled={uploading}
								>
									{uploading ? "Uploading..." : "Add content"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddContent;
