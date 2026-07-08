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
import { IconCatalog } from "./system/IconCatalog";
import { ListCatalog } from "./system/ListCatalog";
import { LoadingCatalog } from "./system/LoadingCatalog";
import { ModalTabCatalog } from "./system/ModalTabCatalog";

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
	{
		slug: "icon",
		path: "/system/icon",
		title: "Icon",
		category: "System",
		Page: IconCatalog,
	},
	{
		slug: "list",
		path: "/system/list",
		title: "List",
		category: "System",
		Page: ListCatalog,
	},
	{
		slug: "loading",
		path: "/system/loading",
		title: "Loading",
		category: "System",
		Page: LoadingCatalog,
	},
	{
		slug: "modal-tab",
		path: "/system/modal-tab",
		title: "Modal Tab",
		category: "System",
		Page: ModalTabCatalog,
	},
];
