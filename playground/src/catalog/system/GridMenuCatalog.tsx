import {
	GridMenu,
	GridMenuItem,
	GridMenuItemIcon,
	GridMenuItemLabel,
} from "../../../../src/System/GridMenu";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const items = ["Section A", "Section B", "Section C", "Section D"];

export function GridMenuCatalog() {
	return (
		<CatalogPage
			title="Grid Menu"
			description="Two-column grid of tappable menu tiles with a label and trailing icon."
		>
			<VariantBlock
				label="Grid of items"
				code={`import {\n  GridMenu, GridMenuItem, GridMenuItemIcon, GridMenuItemLabel,\n} from "@suki-suki-club/link-like-ui/System/GridMenu";\n\n<GridMenu>\n  <GridMenuItem>\n    <GridMenuItemLabel>Section A</GridMenuItemLabel>\n    <GridMenuItemIcon>★</GridMenuItemIcon>\n  </GridMenuItem>\n</GridMenu>`}
			>
				<GridMenu className="w-80">
					{items.map((label) => (
						<GridMenuItem key={label}>
							<GridMenuItemLabel>{label}</GridMenuItemLabel>
							<GridMenuItemIcon>★</GridMenuItemIcon>
						</GridMenuItem>
					))}
				</GridMenu>
			</VariantBlock>
		</CatalogPage>
	);
}
