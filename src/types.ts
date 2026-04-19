export interface Yarn {
	id: number;
	brand: string;
	name: string;
	color: Color;
	weight: Weight;
	fiber: string;
	created_at: string;
	user_id: string;
}

export type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "black" | "white" | "gray" | "brown" | "multi";

export type Weight = "lace" | "fingering" | "sport" | "dk" | "worsted" | "aran" | "bulky" | "super bulky";
