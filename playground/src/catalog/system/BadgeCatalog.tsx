import { Badge } from "../../../../src/System/Badge";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function BadgeCatalog() {
	return (
		<CatalogPage
			title="Badge"
			description="Small status label. Variants: default / muted / accent / mutual."
		>
			<VariantBlock
				label="Variants"
				code={`import { Badge } from "@suki-suki-club/link-like-ui/System/Badge";\n\n<Badge variant="default">NEW</Badge>\n<Badge variant="muted">END</Badge>\n<Badge variant="accent">UP</Badge>\n<Badge variant="mutual">相互</Badge>`}
			>
				<Badge variant="default">NEW</Badge>
				<Badge variant="muted">END</Badge>
				<Badge variant="accent">UP</Badge>
				<Badge variant="mutual">相互</Badge>
			</VariantBlock>
		</CatalogPage>
	);
}
