import { createContext, useEffect, useState, useContext, use } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [session, setSession] = useState(undefined);
	const [user, setUser] = useState(null); // Full profile from backend
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		const fetchUserProfile = async () => {
			if (session?.user) {
				try {
					const response = await fetch(
						`${import.meta.env.VITE_BACKEND_URL}/users/${session.user.id}`,
					);
					if (response.ok) {
						const userData = await response.json();
						setUser(userData[0]);
					}
				} catch (error) {
					console.error("Error fetching backend user:", error);
				} finally {
					setLoadingUser(false);
				}
			} else {
				setUser(null);
				setLoadingUser(false);
			}
		};

		fetchUserProfile();
	}, [session]);

	// Sign up
	const signUpNewUser = async ({ username, email, password }) => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: { data: { username: username } },
		});

		if (error) {
			console.error("Error signing up:", error);
			return { success: false, error };
		}
		return { success: true, data };
	};

	// Sign in
	const signInUser = async ({ email, password }) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});

			if (error) {
				console.error("Error signing in:", error);
				return { success: false, error: error.message };
			}

			console.log("Sign-in successful:", data);
			return { success: true, data };
		} catch (error) {
			console.error("Error occured:", error);
		}
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	//Sign out
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ session, signUpNewUser, signInUser, signOut, loadingUser, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
