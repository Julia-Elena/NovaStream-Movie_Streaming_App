import React from "react";
import NavbarMain from "./navbar/NavbarMain";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
	const { session } = UserAuth();

	return (
		<>
			<NavbarMain />
			<div className=''>
				<header className='text-white text-2xl text-center font-bold py-5'>
					Profile
				</header>

				<div className='card bg-base-100 w-150 shadow-sm mx-auto h-150'>
					{/* Banner Container */}
					<figure className='h-40 relative overflow-visible'>
						{/* The 'overflow-visible' allows the cat to pop out of the bottom */}
						<img
							src='https://images.pexels.com/photos/4908652/pexels-photo-4908652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
							alt='Banner Landscape'
							className='object-cover w-full h-full rounded-t-2xl'
						/>
						{/* Profile image centered and overlapping the bottom border */}
						<div className='absolute inset-x-0 -bottom-12 flex justify-center'>
							<div className='avatar'>
								<div className='w-32 h-32 rounded-full border-4 border-base-100 shadow-xl'>
									<img
										src='https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'
										alt='Cat Profile'
									/>
								</div>
							</div>
						</div>
					</figure>

					<div className='card-body pt-12 pb-4 ml-4 text-left justify-start gap-2'>
						<div className='mb-2'>
							<div className='text-xs text-gray-500'>Username</div>
							<p className='text-lg text-white font-medium'>
								{session.user.user_metadata.username}
							</p>
						</div>

						<div className='mb-2'>
							<div className='text-xs text-gray-500'>Email</div>
							<p className='text-lg font-medium'>{session.user.email}</p>
						</div>

						<div className='mb-2'>
							<div className='text-xs text-gray-500'>Member since</div>
							<p className='text-lg font-medium'>
								{new Date(session.user.created_at).toLocaleDateString()}
							</p>
						</div>
					</div>

					<a className='text-error absolute left-11 bottom-10'>Delete account</a>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
