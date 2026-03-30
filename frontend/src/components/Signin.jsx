import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavbarSigning from "./navbar/NavbarSigning";

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");

	const { session, signInUser } = UserAuth();
	const navigate = useNavigate();
	console.log(session);

	const handleSignIn = async (e) => {
		e.preventDefault();

		if (!email.trim()) {
			setError("Email is required");
			return;
		}

		if (!password) {
			setError("Password is required");
			return;
		}

		setLoading(true);

		try {
			const result = await signInUser({ email, password });
			if (result.success) {
				navigate("/");
			} else {
				setError(result.error || "Failed to sign in");
			}
		} catch (error) {
			setError(error.message || "An error occurred during sign in");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-base-300 min-h-screen">
			<NavbarSigning />
			<form onSubmit={handleSignIn} className="max-w-lg m-auto pt-6">
				<h2 className="font-bold text-center pb-6">Sign In</h2>
				<div className="flex flex-col justify-center items-center  gap-4 mb-4">
					<label className="floating-label w-[60%]">
						<span className="bg-base-300">Email</span>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
							className="input input-md w-full bg-base-200"
						/>
					</label>
					<label className="floating-label w-[60%]">
						<span className="bg-base-300">Password</span>
						<input
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
							className="input input-md w-full bg-base-200"
						/>
					</label>
					{error && <p className="text-error text-xs text-center">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="btn rounded-lg btn-outline btn-primary w-[50%] "
					>
						Sign in
					</button>
				</div>
				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<Link to="/signup" className="text-accent hover:underline">
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signin;
