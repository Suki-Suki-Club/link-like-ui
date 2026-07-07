export const GENERATIONS = [
	{ id: 102, label: "102期" },
	{ id: 103, label: "103期" },
	{ id: 104, label: "104期" },
	{ id: 105, label: "105期" },
] as const satisfies readonly { id: number; label: string }[];

export type Generation = (typeof GENERATIONS)[number];
export type GenerationId = Generation["id"];
