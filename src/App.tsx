import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { type User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Yarns from "./pages/Yarns";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";

function App() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Check for existing session on page load
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
		});

		// Listen for auth state changes (sign in, sign out)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		// Cleanup subscription on unmount
		return () => subscription.unsubscribe();
	}, []);

	return (
		<div className="px-4">
			<Navbar user={user} />
			<main className="container mx-auto max-w-3xl">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/yarns" element={<Yarns user={user} />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</main>
			<Footer user={user} />
		</div>
	);
}

export default App;
