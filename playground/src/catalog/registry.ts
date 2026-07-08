import type { CatalogEntry } from "./types";
import { AvatarCatalog } from "./system/AvatarCatalog";
import { BadgeCatalog } from "./system/BadgeCatalog";
import { ButtonCatalog } from "./system/ButtonCatalog";
import { CasualButtonCatalog } from "./system/CasualButtonCatalog";
import { CasualModalCatalog } from "./system/CasualModalCatalog";
import { CardCatalog } from "./system/CardCatalog";
import { FormCatalog } from "./system/FormCatalog";
import { FooterPanelCatalog } from "./system/FooterPanelCatalog";
import { GridMenuCatalog } from "./system/GridMenuCatalog";

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
	{
		slug: "casual-modal",
		path: "/system/casual-modal",
		title: "Casual Modal",
		category: "System",
		Page: CasualModalCatalog,
	},
	{
		slug: "footer-panel",
		path: "/system/footer-panel",
		title: "Footer Panel",
		category: "System",
		Page: FooterPanelCatalog,
	},
	{
		slug: "form",
		path: "/system/form",
		title: "Form",
		category: "System",
		Page: FormCatalog,
	},
	{
		slug: "grid-menu",
		path: "/system/grid-menu",
		title: "Grid Menu",
		category: "System",
		Page: GridMenuCatalog,
	},
];
