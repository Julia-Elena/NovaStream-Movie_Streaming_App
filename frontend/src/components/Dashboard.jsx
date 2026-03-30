import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import NavbarMain from "./navbar/NavbarMain";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
	const { session, setSession, user } = UserAuth();
	const pfpInputRef = useRef(null);
	const bannerInputRef = useRef(null);

	const [editableUsername, setEditableUsername] = useState("");
	const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
	const [updating, setUpdating] = useState(false);

	const [profilePictureUrl, setProfilePictureUrl] = useState(null);
	const [bannerPictureUrl, setBannerPictureUrl] = useState(null);

	useEffect(() => {
		if (user) {
			setEditableUsername(user.username || "");
			setProfilePictureUrl(user.profile_picture_url || null);
			setBannerPictureUrl(user.banner_picture_url || null);
		}
	}, [user]);

	// Helper: Upload file to Supabase and return Public URL
	const uploadImage = async (file, bucketPath) => {
		const fileName = `${session.user.id}/${Date.now()}-${file.name}`;

		const { error: uploadError } = await supabase.storage
			.from("User_images")
			.upload(fileName, file, { upsert: true });

		if (uploadError) throw uploadError;

		const { data } = supabase.storage
			.from("User_images")
			.getPublicUrl(fileName);
		return data.publicUrl;
	};

	const handleUpdateProfile = async () => {
		setUpdating(true);
		setStatusMessage({ type: "", text: "" });

		try {
			let finalPfp = profilePictureUrl;
			let finalBanner = bannerPictureUrl;

			// Update Backend
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/users/${session.user.id}`,
				{
					method: "PATCH", // Matches your users.patch endpoint
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: editableUsername,
						profile_picture_url: finalPfp,
						banner_picture_url: finalBanner,
					}),
				},
			);

			if (!response.ok) throw new Error("Failed to update backend");

			setStatusMessage({
				type: "success",
				text: "Profile updated successfully!",
			});
		} catch (err) {
			setStatusMessage({ type: "error", text: err.message });
		} finally {
			setUpdating(false);
		}
	};

	const onFileChange = async (e, type) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			setUpdating(true);
			const publicUrl = await uploadImage(file, type);
			if (type === "pfp") setProfilePictureUrl(publicUrl);
			else setBannerPictureUrl(publicUrl);
		} catch (err) {
			setStatusMessage({ type: "error", text: "Upload failed" });
		} finally {
			setUpdating(false);
		}
	};

	const displayPfpUrl =
		profilePictureUrl ||
		"https://ndemrncbyerjauindwze.supabase.co/storage/v1/object/public/User_images/Default/default_pfp.png";
	const displayBannerUrl =
		bannerPictureUrl ||
		"https://ndemrncbyerjauindwze.supabase.co/storage/v1/object/public/User_images/Default/default_banner_picture.jpg";

	return (
		<>
			<NavbarMain />
			<div className="min-h-screen bg-base-300 pb-10">
				<header className="text-white text-2xl text-center font-bold py-8">
					Profile Settings
				</header>

				<div className="card bg-base-100 w-[600px] shadow-2xl mx-auto overflow-hidden">
					{/* Banner Section */}
					<div
						className="h-48 relative group cursor-pointer overflow-hidden"
						onClick={() => bannerInputRef.current.click()}
					>
						<img
							src={displayBannerUrl}
							className="object-cover w-full h-full transition duration-300 group-hover:brightness-50"
							alt="Banner"
						/>
						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
								/>
							</svg>
						</div>
						<input
							type="file"
							hidden
							ref={bannerInputRef}
							onChange={(e) => onFileChange(e, "banner")}
						/>
					</div>

					{/* PFP Section */}
					<div className="relative flex justify-center -mt-16">
						<div
							className="avatar group cursor-pointer relative"
							onClick={() => pfpInputRef.current.click()}
						>
							<div className="w-32 h-32 rounded-full border-4 border-base-100 shadow-2xl overflow-hidden bg-base-200">
								<img
									src={displayPfpUrl}
									className="group-hover:brightness-50 transition duration-300"
									alt="PFP"
								/>
							</div>
							<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
									/>
								</svg>
							</div>
							<input
								type="file"
								hidden
								ref={pfpInputRef}
								onChange={(e) => onFileChange(e, "pfp")}
							/>
						</div>
					</div>

					<div className="card-body gap-4 px-10">
						{/* Status Alert */}
						{statusMessage.text && (
							<div
								className={`alert ${statusMessage.type === "error" ? "alert-error" : "alert-success"} text-xs py-2`}
							>
								{statusMessage.text}
							</div>
						)}

						{/* Editable Fields */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-bold text-gray-500 mb-2">
									Username
								</span>
							</label>
							<div className="relative flex justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="size-6 mt-2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
									/>
								</svg>
								<input
									type="text"
									className="input input-bordered w-[50%] ml-2 bg-base-200 focus:input-primary"
									value={editableUsername}
									onChange={(e) => setEditableUsername(e.target.value)}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 mt-2">
							<div>
								<label className="label-text font-bold text-gray-500">
									Email Address
								</label>
								<p className="font-medium text-white px-1">{user?.email}</p>
							</div>
							<div>
								<label className="label-text font-bold text-gray-500">
									Member Since
								</label>
								<p className="font-medium text-white px-1">
									{new Date(user?.created_at).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="card-actions justify-center mt-6 border-t border-base-300 pt-6">
							<button
								className={`btn btn-outline btn-primary rounded-lg w-[67%] ${updating && "loading"}`}
								onClick={handleUpdateProfile}
								disabled={updating}
							>
								{updating ? "Saving Changes..." : "Update Profile"}
							</button>
						</div>
						<div className="card-actions justify-center">
							<button className="btn btn-ghost btn-sm text-error mt-4 opacity-50 hover:opacity-100">
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
