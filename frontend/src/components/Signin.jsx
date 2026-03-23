import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
	return (
		<div>
			<form className="max-w-lg m-auto pt-24">
				<h2 className="font-bold text-center pb-6">Sign In</h2>
				<div className="flex flex-col justify-center items-center  gap-4 mb-4">
					<label className="floating-label w-[60%]">
						<span>Email</span>
						<input
							type="email"
							placeholder="Email"
							className="input input-md w-full "
						/>
					</label>
					<label className="floating-label w-[60%]">
						<span>Password</span>
						<input
							type="password"
							placeholder="Password"
							className="input input-md w-full"
						/>
					</label>
					<button class="btn rounded-lg mt-4 btn-outline btn-primary w-[50%] ">Sign in</button>
				</div>
				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<Link to="/signup" className="text-info hover:underline">
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signin;
