import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="home-page text-center">
			{/* TODO: Customize your home page.
          Tell visitors what your app is about and
          what kind of yarns they can browse. */}
			<h1>Welcome</h1>
			<p>Browse our collection of yarns</p>
			<div className="my-5">
				<Link to="/yarns" className="btn btn-primary">
					Browse Yarns
				</Link>
			</div>
		</div>
	);
}

export default Home;
