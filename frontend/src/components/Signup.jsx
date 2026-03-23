import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext"

const Signup = () => {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState("")

const {session} = UserAuth();
console.log(session);

	return (
		<div>
			<form className="max-w-lg m-auto pt-24">
				<h2 className="font-bold text-center pb-6">Sign Up</h2>
				<div className="flex flex-col justify-center items-center  gap-4 mb-4">
					<label className="floating-label w-[60%]">
						<span>Username</span>
						<input
							type="text"
							placeholder="Username"
							className="input input-md w-full"
						/>
					</label>
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
					<label className="floating-label w-[60%]">
						<span>Confirm password</span>
						<input
							type="password"
							placeholder="Confirm password"
							className="input input-md w-full"
						/>
					</label>
					<button type="submit" disabled={ loading } className="btn rounded-lg mt-4 btn-outline btn-primary w-[50%] ">Create account</button>
				</div>
				<p className="text-sm text-gray-600">
					Already have an account?{" "}
					<Link to="/signin" className="text-info hover:underline">
						Sign in
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signup;
