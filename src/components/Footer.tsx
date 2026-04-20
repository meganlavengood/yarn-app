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
		<div className="footer py-8 flex flex-col md:flex-row md:gap-2 justify-center text-center text-sm text-gray-500">
			{/* if logged in, show sign-out link; otherwise, show sign in and sign up */}
			{user ? (
				<>
					<p>Currently logged in as {`${user.email}`}</p>
					<a onClick={handleSignOut}>Sign Out</a>
				</>
			) : (
				<>
					<p>Not logged in.</p>
					<p>
						<Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link> to access admin features.
					</p>
				</>
			)}
		</div>
	);
}

export default Footer;
