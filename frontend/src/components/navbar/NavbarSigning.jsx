import React from "react";

function NavbarSigning() {
	const fullLogoUrl =
		"https://ndemrncbyerjauindwze.supabase.co/storage/v1/object/public/Posters/NovaStream_FullLogo.png";

	return (
		<>
			<div className="navbar bg-base-200 border-b border-primary shadow-sm">
				<div className="navbar-start">
					<a href="/" className="hover:cursor-pointer ml-4 text-xl text-center">
						<img
							src={fullLogoUrl}
							alt="NovaStream Logo"
							className="h-10 w-auto object-contain pb-1"
						/>
					</a>
				</div>
			</div>
		</>
	);
}

export default NavbarSigning;
