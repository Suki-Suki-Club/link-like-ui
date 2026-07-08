import type { CatalogEntry } from "./types";
import { AvatarCatalog } from "./system/AvatarCatalog";
import { BadgeCatalog } from "./system/BadgeCatalog";

export const CATALOG: readonly CatalogEntry[] = [
	{
		slug: "avatar",
		path: "/system/avatar",
		title: "Avatar",
		category: "System",
		Page: AvatarCatalog,
	},
	{
		slug: "badge",
		path: "/system/badge",
		title: "Badge",
		category: "System",
		Page: BadgeCatalog,
	},
];
