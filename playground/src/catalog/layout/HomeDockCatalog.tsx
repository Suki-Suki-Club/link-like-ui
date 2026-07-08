import { useState } from "react";
import { HomeLayoutDock } from "../../../../src/Home/Dock";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function HomeDockCatalog() {
	const [canGoBack, setCanGoBack] = useState<boolean>(true);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [hasMenuNotification, setHasMenuNotification] = useState<boolean>(true);

	return (
		<CatalogPage
			title="Home Dock"
			description="Bottom dock for the Home screen: Back, menu toggle with notification badge, and Home. Fully props-driven — the menu glyph morphs and the badge fades as the menu opens."
		>
			<VariantBlock
				label="Interactive dock"
				code={`import { HomeLayoutDock } from "@suki-suki-club/link-like-ui/Home/Dock";\n\n<HomeLayoutDock\n  canGoBack={canGoBack}\n  isMenuOpen={isMenuOpen}\n  hasMenuNotification={hasMenuNotification}\n  onBack={() => {}}\n  onToggleMenu={() => setIsMenuOpen((o) => !o)}\n  homeAction={{ ariaLabel: "Home", label: "Home", onClick: () => {} }}\n/>`}
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-wrap items-center gap-4 text-sm text-ll-label">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={canGoBack}
								onChange={(event) => setCanGoBack(event.target.checked)}
							/>
							canGoBack
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={hasMenuNotification}
								onChange={(event) =>
									setHasMenuNotification(event.target.checked)
								}
							/>
							hasMenuNotification
						</label>
						<button
							type="button"
							className="rounded-md border border-ll-label/30 px-3 py-1"
							onClick={() => setIsMenuOpen((open) => !open)}
						>
							Toggle menu ({isMenuOpen ? "open" : "closed"})
						</button>
					</div>
					<div className="relative h-40 w-full max-w-sm overflow-hidden rounded-xl border border-ll-label/15 bg-ll-page-bg">
						<HomeLayoutDock
							canGoBack={canGoBack}
							isMenuOpen={isMenuOpen}
							hasMenuNotification={hasMenuNotification}
							onBack={() => {}}
							onToggleMenu={() => setIsMenuOpen((open) => !open)}
							homeAction={{
								ariaLabel: "Home",
								label: "Home",
								onClick: () => {},
							}}
						/>
					</div>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
