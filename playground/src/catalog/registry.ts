import type { CatalogEntry } from "./types";
import { AvatarCatalog } from "./system/AvatarCatalog";

export const CATALOG: readonly CatalogEntry[] = [
	{
		slug: "avatar",
		path: "/system/avatar",
		title: "Avatar",
		category: "System",
		Page: AvatarCatalog,
	},
];
