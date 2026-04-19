import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function SignIn() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		// TODO: Sign in with Supabase Auth.
		// This code is ready to go — just make sure your Supabase project
		// has email auth enabled (it is by default).

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
			setLoading(false);
		} else {
			// Redirect to yarns page after successful sign-in
			navigate("/yarns");
		}
	}

	return (
		<div className="auth-page">
			<h1>Sign In</h1>

			{error && <p className="error-message">{error}</p>}

			<form onSubmit={handleSubmit} className="auth-form max-w-lg mx-auto">
				<div className="form-group flex flex-col">
					<label htmlFor="email">Email</label>
					<input className="form-input rounded-sm border-gray-300" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>

				<div className="form-group flex flex-col">
					<label htmlFor="password">Password</label>
					<input className="form-input rounded-sm border-gray-300" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>

				<div className="form-actions flex gap-3 mt-4 justify-between items-start">
					<button type="submit" className="btn btn-primary" disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</button>
					<div className="flex flex-col md:flex-row md:gap-2 text-right">
						<p className="auth-switch">Don't have an account?</p>
						<Link to="/signup">Sign Up</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
