import {
	FooterPanel,
	FooterPanelBar,
	FooterPanelCenterTrigger,
	FooterPanelGridIcon,
	FooterPanelHomeIcon,
	FooterPanelItem,
	FooterPanelItemIcon,
	FooterPanelItemLabel,
} from "../../../../src/System/FooterPanel";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function FooterPanelCatalog() {
	return (
		<CatalogPage
			title="Footer Panel"
			description="Bottom navigation bar with a center toggle. The center trigger opens/closes its menu region."
		>
			<VariantBlock
				label="Footer bar"
				code={`import {\n  FooterPanel, FooterPanelBar, FooterPanelCenterTrigger, FooterPanelItem,\n  FooterPanelItemIcon, FooterPanelItemLabel, FooterPanelHomeIcon, FooterPanelGridIcon,\n} from "@suki-suki-club/link-like-ui/System/FooterPanel";\n\n<FooterPanel>\n  <FooterPanelBar columns={3}>\n    <FooterPanelItem active>...</FooterPanelItem>\n    <FooterPanelCenterTrigger label="Menu" />\n    <FooterPanelItem>...</FooterPanelItem>\n  </FooterPanelBar>\n</FooterPanel>`}
			>
				<div className="w-80">
					<FooterPanel>
						<FooterPanelBar columns={3}>
							<FooterPanelItem active>
								<FooterPanelItemIcon>
									<FooterPanelHomeIcon />
								</FooterPanelItemIcon>
								<FooterPanelItemLabel>Home</FooterPanelItemLabel>
							</FooterPanelItem>
							<FooterPanelCenterTrigger label="Menu" />
							<FooterPanelItem>
								<FooterPanelItemIcon>
									<FooterPanelGridIcon />
								</FooterPanelItemIcon>
								<FooterPanelItemLabel>Grid</FooterPanelItemLabel>
							</FooterPanelItem>
						</FooterPanelBar>
					</FooterPanel>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
