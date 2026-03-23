import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext"

const Signup = () => {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState("")

const {session, signUpNewUser} = UserAuth();
const navigate = useNavigate();
console.log(session);
//console.log(username, email, password, confirmPassword);

const handleSignUp = async (e) => {
	e.preventDefault();

	if(password !== confirmPassword) {
		setError("Passwords do not match");
		return;
	}

	setLoading(true);

	try {
		const result = await signUpNewUser({ username, email, password });
		if (result.success) {
			navigate('/dashboard');
		}
	} catch (error) {
		setError("Error occured");
	} finally {
		setLoading(false);
	}
};

	return (
		<div>
			<form onSubmit={handleSignUp} className="max-w-lg m-auto pt-5">
				<h2 className="font-bold text-center pb-6">Sign Up</h2>
				<div className="flex flex-col justify-center items-center  gap-4 mb-4">
					<label className="floating-label w-[60%]">
						<span>Username</span>
						<input
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							placeholder="Username"
							className="input input-md w-full"
						/>
					</label>
					<label className="floating-label w-[60%]">
						<span>Email</span>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
							className="input input-md w-full "
						/>
					</label>
					<label className="floating-label w-[60%]">
						<span>Password</span>
						<input
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
							className="input input-md w-full"
						/>
					</label>
					<label className="floating-label w-[60%]">
						<span>Confirm password</span>
						<input
							onChange={(e) => setConfirmPassword(e.target.value)}
							type="password"
							placeholder="Confirm password"
							className="input input-md w-full"
						/>
					</label>
					{error && <p className="text-xs text-error text-center">{error}</p>}
					<button type="submit" disabled={ loading } className="btn rounded-lg btn-outline btn-primary w-[50%] ">Create account</button>
					
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
