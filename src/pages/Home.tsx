import { Link } from "react-router-dom";
import sheepImg from "../assets/sheep.png";

function Home() {
	return (
		<div className="home-page text-center">
			<h1>Welcome</h1>
			<p>We have a large collection of yarns with varying weights, colors, and fiber contents.</p>
			<div className="my-5">
				<Link to="/yarns" className="btn btn-primary text-lg">
					Browse Yarns
				</Link>
			</div>
			<img className="h-40 md:h-96 mx-auto" src={`${sheepImg}`} />
		</div>
	);
}

export default Home;
