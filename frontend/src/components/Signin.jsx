import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
	return (
		<div>
			<form className="max-w-lg m-auto pt-24">
				<h2 className="font-bold text-center pb-6">Sign In</h2>
				<div className="flex flex-col justify-center items-center  gap-4 mb-4">
					<label className="floating-label w-[50%]">
						<span>Your Email</span>
						<input
							type="text"
							placeholder="mail@site.com"
							className="input input-md w-full "
						/>
					</label>{" "}
					<label className="floating-label w-[50%]">
						<span>Your Password</span>
						<input
							type="password"
							placeholder="password"
							className="input input-md w-full"
						/>
					</label>
				</div>
				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<Link to="/signup" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signin;
