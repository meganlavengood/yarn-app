import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setError(error.message);
			setLoading(false);
		} else {
			// Redirect to yarns page after successful sign-up
			navigate("/yarns");
		}
	}

	return (
		<div className="auth-page">
			<h1>Sign Up</h1>

			{error && <p className="error-message">{error}</p>}

			<form onSubmit={handleSubmit} className="auth-form max-w-lg mx-auto">
				<div className="form-group flex flex-col">
					<label htmlFor="email">Email</label>
					<input className="form-input rounded-sm border-gray-300" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>

				<div className="flex gap-5 mt-5">
					<div className="form-group flex flex-col">
						<label htmlFor="password">Password</label>
						<input className="form-input rounded-sm border-gray-300" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
					</div>
					<div className="form-group flex flex-col">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input className="form-input rounded-sm border-gray-300" id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
					</div>
				</div>
				<div className="form-actions flex gap-3 mt-4 justify-between">
					<button type="submit" className="btn btn-primary" disabled={loading}>
						{loading ? "Creating account..." : "Sign Up"}
					</button>
					<p className="auth-switch">
						Already have an account? <Link to="/signin">Sign In</Link>
					</p>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
