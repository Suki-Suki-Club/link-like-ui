import { tv } from "tailwind-variants";
import { NavLink } from "react-router-dom";
import { CATALOG } from "./registry";
import type { CatalogCategory } from "./types";

const CATEGORY_ORDER: readonly CatalogCategory[] = [
	"System",
	"Layout",
	"Data",
	"Icons",
];

const navItemVariants = tv({
	base: "block rounded-md px-2 py-1 text-sm transition-colors",
	variants: {
		active: {
			false: "text-ll-gray hover:bg-[color-mix(in_srgb,var(--color-ll-avatar-border)_45%,transparent)]",
			true: "bg-[linear-gradient(135deg,var(--color-ll-system-left),var(--color-ll-system-right))] text-ll-white shadow-[0_0.35rem_1rem_color-mix(in_srgb,var(--color-ll-card-shadow)_35%,transparent)]",
		},
	},
});

export function Sidebar() {
	return (
		<nav className="ll-catalog-sidebar">
			<span className="ll-catalog-brand">Link-Like UI</span>
			{CATEGORY_ORDER.map((category) => {
				const entries = CATALOG.filter((entry) => entry.category === category);

				if (entries.length === 0) {
					return null;
				}

				return (
					<div key={category}>
						<p className="ll-catalog-section-label">{category}</p>
						<ul className="space-y-0.5">
							{entries.map((entry) => (
								<li key={entry.slug}>
									<NavLink
										to={entry.path}
										className={({ isActive }) =>
											navItemVariants({ active: isActive })
										}
									>
										{entry.title}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</nav>
	);
}
