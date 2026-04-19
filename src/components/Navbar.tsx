import { Link } from "react-router-dom";
import { type User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import headerImg from "../assets/ball.svg";

interface NavbarProps {
	user: User | null;
}

function Navbar({ user }: NavbarProps) {
	async function handleSignOut() {
		await supabase.auth.signOut();
	}

	return (
		<div className="header py-8">
			<nav className="navbar flex items-end justify-between">
				<Link to="/">
					<div className="nav-brand flex items-end flex-nowrap">
						<img src={`${headerImg}`} className="size-1/8" />
						<h1 className="text-2xl md:text-5xl">The Yarn Store</h1>
					</div>
				</Link>
				<div className="nav-links flex flex-row items-end gap-3 font-bold max-[350px]:flex-col max-[350px]:gap-0">
					<Link to="/">Home</Link>
					<Link to="/yarns">Yarns</Link>
					{user ? (
						<>
							<a className="whitespace-nowrap" onClick={handleSignOut}>
								Sign Out
							</a>
						</>
					) : (
						<>
							<Link className="whitespace-nowrap max-[375px]:hidden" to="/signin">
								Sign In
							</Link>
							<Link className="whitespace-nowrap max-[375px]:hidden" to="/signup">
								Sign Up
							</Link>
						</>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
