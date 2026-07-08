import type { CatalogEntry } from "./types";
import { AvatarCatalog } from "./system/AvatarCatalog";
import { BadgeCatalog } from "./system/BadgeCatalog";
import { ButtonCatalog } from "./system/ButtonCatalog";
import { CasualButtonCatalog } from "./system/CasualButtonCatalog";
import { CardCatalog } from "./system/CardCatalog";

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
	{
		slug: "button",
		path: "/system/button",
		title: "Button",
		category: "System",
		Page: ButtonCatalog,
	},
	{
		slug: "card",
		path: "/system/card",
		title: "Card",
		category: "System",
		Page: CardCatalog,
	},
	{
		slug: "casual-button",
		path: "/system/casual-button",
		title: "Casual Button",
		category: "System",
		Page: CasualButtonCatalog,
	},
];
