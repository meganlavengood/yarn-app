import { useState } from "react";
import { type Yarn, Color, Weight } from "../types";

interface YarnFormProps {
	// If editing, pass the existing yarn. If adding, pass null.
	yarn: Yarn | null;
	onSave: (data: Partial<Yarn>) => void;
	onCancel: () => void;
}

const weights: Weight[] = ["lace", "fingering", "sport", "dk", "worsted", "aran", "bulky", "super bulky"];
const colors: Color[] = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "gray", "brown", "multi"];

function YarnForm({ yarn, onSave, onCancel }: YarnFormProps) {
	// If editing (yarn is not null), initialize with the existing values.
	// If adding (yarn is null), initialize with empty/default values.
	const [brand, setBrand] = useState(yarn?.brand ?? "");
	const [name, setName] = useState(yarn?.name ?? "");
	const [color, setColor] = useState<Color>(yarn?.color ?? "white");
	const [weight, setWeight] = useState<Weight>(yarn?.weight ?? "worsted");
	const [fiber, setFiber] = useState(yarn?.fiber ?? "");

	const [error, setError] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");

		if (!name.trim()) {
			setError("Name is required");
			return;
		}
		if (!fiber.trim()) {
			setError("Fiber is required");
			return;
		}
		if (!brand.trim()) {
			setError("Brand is required");
			return;
		}
		if (!color.trim()) {
			setError("Color is required");
			return;
		}
		if (!weight.trim()) {
			setError("Weight is required");
			return;
		}

		onSave({ brand, name, color, weight, fiber });
	}

	return (
		<div className="form-container max-w-lg my-8">
			{error && <p className="error-message">{error}</p>}

			<form onSubmit={handleSubmit}>
				<div className="flex gap-2 mb-2 flex-col justify-center items-center md:flex-row md:justify-start">
					<div className="form-group flex flex-col">
						<label htmlFor="brand">Brand</label>
						<input className="form-input rounded-sm border-gray-300" id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
					</div>
					<div className="form-group flex flex-col">
						<label htmlFor="name">Yarn Name</label>
						<input className="form-input rounded-sm border-gray-300" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
					</div>
					<div className="form-group flex flex-col">
						<label htmlFor="fiber">Primary Fiber</label>
						<input className="form-input rounded-sm border-gray-300" id="fiber" type="text" value={fiber} onChange={(e) => setFiber(e.target.value)} required />
					</div>
				</div>
				<div className="flex gap-5 flex-col justify-center items-center md:flex-row md:justify-start">
					<div className="form-group">
						<label htmlFor="weight">Weight</label>
						<select className="form-select border-gray-300 rounded-sm ml-1" id="weight" value={weight} onChange={(e) => setWeight(e.target.value as Weight)}>
							{weights.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="colors">Color</label>
						<select className="form-select border-gray-300 rounded-sm ml-1" id="colors" value={color} onChange={(e) => setColor(e.target.value as Color)}>
							{colors.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="form-actions flex gap-3 mt-4 flex-row justify-center md:justify-start">
					<button type="submit" className="btn btn-primary btn-lg">
						{yarn ? "Save Changes" : "Add Yarn"}
					</button>
					<button type="button" onClick={onCancel} className="btn btn-secondary btn-lg">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default YarnForm;
