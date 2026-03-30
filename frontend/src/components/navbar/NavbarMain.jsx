import React, { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

function NavbarMain() {
	const { session, signOut, user } = UserAuth();
	const navigate = useNavigate();

	console.log(session);

	const handleSignOut = async (e) => {
		e.preventDefault();

		try {
			await signOut();
			navigate("/");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};
	console.log(user);

	const displayPfpUrl =
		user?.profile_picture_url ||
		"https://ndemrncbyerjauindwze.supabase.co/storage/v1/object/public/User_images/Default/default_pfp.png";
	const displayBannerUrl =
		user?.banner_picture_url ||
		"https://ndemrncbyerjauindwze.supabase.co/storage/v1/object/public/User_images/Default/default_banner_picture.jpg";

	const fullLogoUrl =
		"https://ndemrncbyerjauindwze.supabase.co/storage/v1/object/public/Posters/NovaStream_FullLogo.png";

	return (
		<div className='navbar bg-base-200 border-b border-primary shadow-sm'>
			<div className='navbar-start'>
				<a href='/' className='hover:cursor-pointer ml-4 text-xl text-center'>
					<img
						src={fullLogoUrl}
						alt='NovaStream Logo'
						className='h-10 w-auto object-contain pb-1'
					/>
				</a>
			</div>
			<div className='navbar-center lg:flex'>
				<label className='input rounded-full flex items-center gap-2 w-80'>
					<svg
						className='h-[1em] opacity-50'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
					>
						<g
							strokeLinejoin='round'
							strokeLinecap='round'
							strokeWidth='2.5'
							fill='none'
							stroke='currentColor'
						>
							<circle cx='11' cy='11' r='8'></circle>
							<path d='m21 21-4.3-4.3'></path>
						</g>
					</svg>
					<input type='search' className='grow' placeholder='Search' />
				</label>
			</div>
			<div className='navbar-end'>
				{session ? (
					<div className='flex gap-3 items-center'>
						{user?.is_admin ? (
							<div className='dropdown dropdown-end'>
								<div
									tabIndex={0}
									role='button'
									className='btn btn-ghost btn-circle'
								>
									<button className='text-neutral flex gap-1'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											class='size-6'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
											/>
										</svg>
									</button>
								</div>
								<ul
									tabIndex='-1'
									className='menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-5 w-55 p-4 shadow'
								>
									<li className='border-b border-primary flex gap-1'>
										<div className='text-neutral'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='size-5'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M12 4.5v15m7.5-7.5h-15'
												/>
											</svg>

											<NavLink to='/addcontent'>Create Content</NavLink>
										</div>
									</li>
									<li className='border-b border-primary flex gap-1'>
										<div className='text-neutral'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='size-6'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
												/>
											</svg>

											<NavLink to='/addcontent'>Edit Content</NavLink>
										</div>
									</li>
									<li className='border-b border-primary flex gap-1'>
										<div className='text-neutral'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='size-6'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M5 12h14'
												/>
											</svg>

											<NavLink to='/addcontent'>Delete Content</NavLink>
										</div>
									</li>
								</ul>
							</div>
						) : null}
						<div className='dropdown dropdown-end mr-4'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-circle avatar'
							>
								<div className='w-10 rounded-full'>
									<img
										alt='Tailwind CSS Navbar component'
										src={displayPfpUrl}
									/>
								</div>
							</div>
							<ul
								tabIndex='-1'
								className='menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-5 w-55 p-4 shadow'
							>
								<figure className='h-10 relative overflow-visible mb-11'>
									<div className='mb-2'>
										<img
											src={displayBannerUrl}
											alt='User Banner'
											className='w-full h-16 object-cover rounded-lg'
										/>
										<div className='absolute inset-x-0 -bottom-12 flex justify-center'>
											<li className='pb-1'>
												<NavLink to='/dashboard'>
													<div className='w-12 rounded-full flex gap-3 '>
														<img
															className='rounded-full'
															alt='Tailwind CSS Navbar component'
															src={displayPfpUrl}
														/>
													</div>
												</NavLink>
											</li>
										</div>
									</div>
								</figure>
								<div className='flex justify-center text-center border-b border-primary pb-2'>
									<p className='text-lg font-medium'>{user?.username}</p>
								</div>
								<li className='pt-1 flex gap-1'>
									<div className='text-neutral'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											class='size-5'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
											/>
										</svg>

										<NavLink to='/watchlist'>Watchlist</NavLink>
									</div>
								</li>
								<li className='border-b border-primary pb-1'>
									<div className='text-neutral'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											class='bi bi-clock-history size-4.5'
											viewBox='0 0 16 16'
										>
											<path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z' />
											<path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z' />
											<path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5' />
										</svg>

										<NavLink to='/history' className='ml-1'>
											History
										</NavLink>
									</div>
								</li>
								<li className='border-b border-primary pb-1 pt-1'>
									<div className='text-neutral'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											class='size-5'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
											/>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
											/>
										</svg>

										<NavLink to='/settings' c>
											Settings
										</NavLink>
									</div>
								</li>
								<li className='pt-1'>
									<div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											class='size-5 text-error'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9'
											/>
										</svg>

										<a onClick={handleSignOut} className='text-error'>
											Log out
										</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<>
						<a href='/signin' className='btn rounded-full btn-outline'>
							Sign in
						</a>
						<a href='/signup' className='btn rounded-full btn-primary ml-2'>
							Sign up
						</a>
					</>
				)}
			</div>
		</div>
	);
}

export default NavbarMain;
