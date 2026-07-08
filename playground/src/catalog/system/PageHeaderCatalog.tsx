import {
	PageHeader,
	PageHeaderTitle,
} from "../../../../src/System/PageHeader";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function PageHeaderCatalog() {
	return (
		<CatalogPage
			title="Page Header"
			description="Gradient page header bar with the prism motif and a title."
		>
			<VariantBlock
				label="Header bar"
				code={`import { PageHeader, PageHeaderTitle } from "@suki-suki-club/link-like-ui/System/PageHeader";\n\n<PageHeader>\n  <PageHeaderTitle>Page Title</PageHeaderTitle>\n</PageHeader>`}
			>
				<div className="w-80">
					<PageHeader>
						<PageHeaderTitle>Page Title</PageHeaderTitle>
					</PageHeader>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
