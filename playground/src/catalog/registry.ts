import type { CatalogEntry } from "./types";
import { MembersCatalog } from "./data/MembersCatalog";
import { LayoutCatalog } from "./layout/LayoutCatalog";
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
import { PageHeaderCatalog } from "./system/PageHeaderCatalog";
import { RadioCatalog } from "./system/RadioCatalog";
import { SeparatorCatalog } from "./system/SeparatorCatalog";
import { SliderCatalog } from "./system/SliderCatalog";
import { SystemModalCatalog } from "./system/SystemModalCatalog";
import { TabCatalog } from "./system/TabCatalog";
import { TapEffectCatalog } from "./system/TapEffectCatalog";
import { TableCatalog } from "./system/TableCatalog";
import { ToggleCatalog } from "./system/ToggleCatalog";

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
	{
		slug: "page-header",
		path: "/system/page-header",
		title: "Page Header",
		category: "System",
		Page: PageHeaderCatalog,
	},
	{
		slug: "radio",
		path: "/system/radio",
		title: "Radio",
		category: "System",
		Page: RadioCatalog,
	},
	{
		slug: "separator",
		path: "/system/separator",
		title: "Separator",
		category: "System",
		Page: SeparatorCatalog,
	},
	{
		slug: "slider",
		path: "/system/slider",
		title: "Slider",
		category: "System",
		Page: SliderCatalog,
	},
	{
		slug: "system-modal",
		path: "/system/system-modal",
		title: "System Modal",
		category: "System",
		Page: SystemModalCatalog,
	},
	{
		slug: "tab",
		path: "/system/tab",
		title: "Tab",
		category: "System",
		Page: TabCatalog,
	},
	{
		slug: "table",
		path: "/system/table",
		title: "Table",
		category: "System",
		Page: TableCatalog,
	},
	{
		slug: "tap-effect",
		path: "/system/tap-effect",
		title: "Tap Effect",
		category: "System",
		Page: TapEffectCatalog,
	},
	{
		slug: "toggle",
		path: "/system/toggle",
		title: "Toggle",
		category: "System",
		Page: ToggleCatalog,
	},
	{
		slug: "layout",
		path: "/layout",
		title: "Home Layout",
		category: "Layout",
		Page: LayoutCatalog,
	},
	{
		slug: "members",
		path: "/data/members",
		title: "Members",
		category: "Data",
		Page: MembersCatalog,
	},
];
