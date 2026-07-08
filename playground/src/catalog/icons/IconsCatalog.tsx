import {
	AudioIcon,
	BackIcon,
	HomeIcon,
} from "../../../../src/assets/icons";
import { CatalogPage } from "../kit/CatalogPage";

const icons = [
	{ name: "AudioIcon", Icon: AudioIcon },
	{ name: "BackIcon", Icon: BackIcon },
	{ name: "HomeIcon", Icon: HomeIcon },
];

const importPath = "@suki-suki-club/link-like-ui/assets/icons";

export function IconsCatalog() {
	return (
		<CatalogPage
			title="Icons"
			description="The three SVG asset icon components in src/assets/icons. Distinct from the System/Icon component."
		>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
				{icons.map(({ name, Icon }) => (
					<div
						key={name}
						className="flex flex-col items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-ll-avatar-border)_75%,transparent)] bg-[color-mix(in_srgb,var(--color-ll-white)_94%,transparent)] p-4 shadow-[0_0.5rem_1.5rem_color-mix(in_srgb,var(--color-ll-card-shadow)_30%,transparent)]"
					>
						<Icon className="h-8 w-8 text-ll-label" />
						<span className="text-sm font-semibold text-[color-mix(in_srgb,var(--color-ll-gray)_88%,black)]">
							{name}
						</span>
						<code className="text-[0.65rem] text-ll-gray">{importPath}</code>
					</div>
				))}
			</div>
		</CatalogPage>
	);
}
