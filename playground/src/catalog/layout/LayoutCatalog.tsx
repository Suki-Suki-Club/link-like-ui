import { FaAward } from "react-icons/fa";
import { LuGift, LuNewspaper, LuShoppingCart } from "react-icons/lu";
import type {
	HomeScreenBannerInput,
	HomeScreenMenuItemInput,
} from "../../../../src/Home/Layout";
import { HomeScreen } from "../../../../src/Home/Layout";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const menuItems: HomeScreenMenuItemInput[] = [
	{
		label: "Mission",
		illustration: {
			kind: "single",
			icon: { icon: FaAward, title: "Mission" },
		},
	},
	{
		label: "Present",
		badge: "7",
		illustration: {
			kind: "single",
			icon: { icon: LuGift, title: "Present" },
		},
	},
	{
		label: "Shop",
		illustration: {
			kind: "single",
			icon: { icon: LuShoppingCart, title: "Shop" },
		},
	},
	{
		label: "News",
		badge: "1",
		illustration: {
			kind: "single",
			icon: { icon: LuNewspaper, title: "News" },
		},
	},
];

const banners: HomeScreenBannerInput[] = [
	{ src: "/assets/images/600x150.png", alt: "Banner sample 01", badge: "New" },
	{ src: "/assets/images/600x150.png", alt: "Banner sample 02" },
];

export function LayoutCatalog() {
	return (
		<CatalogPage
			title="Home Layout"
			description="The full HomeScreen composition: header, banner sheet, menu tiles, and dock. Framed to a phone-sized viewport here."
		>
			<VariantBlock
				label="HomeScreen"
				code={`import { HomeScreen } from "@suki-suki-club/link-like-ui/Home/Layout";\n\n<HomeScreen\n  banners={banners}\n  menuItems={menuItems}\n  defaultMenuOpen\n  menuNotificationCount={1}\n/>`}
			>
				<div className="relative h-[780px] w-full max-w-[430px] overflow-hidden rounded-2xl border border-ll-white/70 shadow-[0_0.5rem_1.5rem_color-mix(in_srgb,var(--color-ll-card-shadow)_30%,transparent)]">
					<HomeScreen
						banners={banners}
						menuItems={menuItems}
						defaultMenuOpen
						menuNotificationCount={1}
					/>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
