import { Link } from "react-router-dom";
import { type User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

interface FooterProps {
	user: User | null;
}

function Footer({ user }: FooterProps) {
	async function handleSignOut() {
		await supabase.auth.signOut();
	}

	return (
		<div className="footer py-8 flex justify-end text-gray-600">
			{user ? (
				<p>
					Currently logged in as {`${user.email}`}
					<a className="ml-5" onClick={handleSignOut}>
						Sign Out
					</a>
				</p>
			) : (
				<p>
					Not logged in. Sign in to access admin features.
					<Link to="/signin" className="ml-5">
						Sign In
					</Link>
					<Link to="/signup" className="ml-5">
						Sign Up
					</Link>
				</p>
			)}
		</div>
	);
}

export default Footer;
