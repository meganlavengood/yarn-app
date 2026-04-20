import { useState, useEffect } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import { type Yarn, Weight, Color } from "../types";
import YarnForm from "../components/YarnForm";
// import YarnItem from "../components/YarnItem";

interface YarnsProps {
	user: User | null;
}

const weightFilters: ("all" | Weight)[] = ["all", "lace", "fingering", "sport", "dk", "worsted", "aran", "bulky", "super bulky"];

function Yarns({ user }: YarnsProps) {
	const [yarns, setYarns] = useState<Yarn[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [editingYarn, setEditingYarn] = useState<Yarn | null>(null);

	const colorClasses: Record<Color, string> = {
		red: "yarn-red",
		orange: "yarn-orange",
		yellow: "yarn-yellow",
		green: "yarn-green",
		blue: "yarn-blue",
		purple: "yarn-purple",
		pink: "yarn-pink",
		black: "yarn-black",
		white: "yarn-white",
		gray: "yarn-gray",
		brown: "yarn-brown",
		multi: "yarn-multi",
	};

	const weightNumbers: Record<Weight, string> = {
		lace: "0",
		fingering: "1",
		sport: "2",
		dk: "3",
		worsted: "4",
		aran: "5",
		bulky: "6",
		"super bulky": "7",
	};

	const weightFilterPrefixes: Record<"all" | Weight, string> = {
		all: "",
		lace: "🄌 ",
		fingering: "➊ ",
		sport: "➋ ",
		dk: "➌ ",
		worsted: "➍ ",
		aran: "➎ ",
		bulky: "➏ ",
		"super bulky": "➐ ",
	};

	// Fetch yarns on component mount
	useEffect(() => {
		fetchYarns();
	}, []);

	async function fetchYarns() {
		setLoading(true);
		setError("");

		// fetch yarns and sort by updated_at
		const { data, error } = await supabase.from("yarns").select("*").order("updated_at", { ascending: false });

		if (error) {
			setError("Failed to load yarns: " + error.message);
		} else {
			setYarns(data ?? []);
		}

		setLoading(false);
	}

	async function handleAdd(data: Partial<Yarn>) {
		// add new yarn to the database
		const { error } = await supabase.from("yarns").insert([{ ...data, user_id: user?.id }]);

		if (error) {
			alert("Failed to add yarn: " + error.message);
			return;
		}

		// hide form
		setShowForm(false);
		// Refresh the list
		fetchYarns();

		console.log("Add yarn:", data);
	}

	async function handleEdit(data: Partial<Yarn>) {
		if (!editingYarn) return;

		// set updated_at date and add to yarn data
		const d = new Date(Date.now());
		const updata = { ...data, updated_at: d.toISOString() };

		const { error } = await supabase.from("yarns").update(updata).eq("id", editingYarn.id);

		if (error) {
			alert("Failed to update yarn: " + error.message);
			return;
		}

		setEditingYarn(null);
		fetchYarns(); // Refresh the list

		console.log("Edit yarn:", editingYarn.id, data);
	}

	async function handleDelete(id: number) {
		// confirm dialog
		if (!window.confirm("Are you sure you want to delete this item?")) {
			return;
		}

		// delete yarn
		const { error } = await supabase.from("yarns").delete().eq("id", id);

		if (error) {
			alert("Failed to delete yarn: " + error.message);
			return;
		}

		fetchYarns(); // Refresh the list

		console.log("Delete yarn:", id);
	}

	const [activeFilter, setActiveFilter] = useState<"all" | Weight>("all");
	// If "all" is selected, show full array. Otherwise, .filter() array with only yarns whose weight matches the active filter.
	const filteredYarns = activeFilter === "all" ? yarns : yarns.filter((t) => t.weight === activeFilter);

	if (loading) {
		return <p className="loading">Loading yarns...</p>;
	}

	if (error) {
		return <p className="error-message">{error}</p>;
	}

	return (
		<div className="yarns-page">
			<div className="yarns-header">
				<h1>Yarn Inventory</h1>

				{/* Only show Add button if user is signed in and not currently editing */}
				{user && !(showForm || editingYarn) && (
					<button onClick={() => setShowForm(true)} className="btn btn-primary btn-lg block mx-auto">
						+ Add New
					</button>
				)}
			</div>

			{/* show form if in edit mode */}
			{(showForm || editingYarn) && (
				<YarnForm
					yarn={editingYarn}
					onSave={editingYarn ? handleEdit : handleAdd}
					onCancel={() => {
						setShowForm(false);
						setEditingYarn(null);
					}}
				/>
			)}

			{/* filter bar */}
			<div className="filter-bar flex md:flex-row flex-col justify-between items-center gap-3 my-4 mx-auto card px-4 py-2">
				<div className="font-bold">Filter</div>
				<div className="flex flex-row gap-2 justify-center flex-wrap sm:flex-nowrap">
					{weightFilters.map((filter) => (
						<button key={filter} className={`text-base btn btn-filter ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>
							{weightFilterPrefixes[filter]}
							{filter}
						</button>
					))}
				</div>
			</div>

			{/* if no yarns are added, show message confirming empty */}
			{filteredYarns.length === 0 ? (
				<p className="empty-state">No yarns yet.</p>
			) : (
				<div className="yarn-list flex flex-col gap-2">
					{/* display each yarn as follows */}
					{filteredYarns.map((yarn) => (
						<div key={yarn.id} className="yarn-item flex items-center justify-between card">
							<div className="yarn-info flex items-center gap-5">
								{
									// color/weight icon
									<div title={`${yarn.weight} weight, ${yarn.color}`} className={`min-w-9 yarn-icon ${colorClasses[yarn.color]}`}>
										{weightNumbers[yarn.weight]}
									</div>
								}
								<div className="yarn-details">
									<div className="yarn-name text-xl">
										{yarn.brand} {yarn.name}
									</div>
									<div className="yarn-meta text-gray-500 flex gap-2 justify-between">
										<span>fiber content: {yarn.fiber}</span>
									</div>
								</div>
							</div>

							{/* Only show Edit/Delete if user is signed in */}
							{user && (
								<div className="yarn-actions flex gap-2">
									<button onClick={() => setEditingYarn(yarn)} className="btn btn-small" title="Edit yarn">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
											<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
										</svg>
									</button>
									<button onClick={() => handleDelete(yarn.id)} className="btn btn-small btn-danger" title="Delete yarn">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Yarns;
