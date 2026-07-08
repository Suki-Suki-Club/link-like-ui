import { Separator } from "../../../../src/System/Separator";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function SeparatorCatalog() {
	return (
		<CatalogPage
			title="Separator"
			description="Thin 1px horizontal rule used between rows and sections."
		>
			<VariantBlock
				label="Horizontal rule"
				code={`import { Separator } from "@suki-suki-club/link-like-ui/System/Separator";\n\n<p>Above</p>\n<Separator />\n<p>Below</p>`}
			>
				<div className="w-80 space-y-3 text-sm text-ll-gray">
					<p>Above</p>
					<Separator />
					<p>Below</p>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
