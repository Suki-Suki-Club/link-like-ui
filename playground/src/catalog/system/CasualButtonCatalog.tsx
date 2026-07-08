import { CasualButton } from "../../../../src/System/CasualButton";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function CasualButtonCatalog() {
	return (
		<CatalogPage
			title="Casual Button"
			description="Playful outlined button. Variants primary / secondary, sizes md / lg."
		>
			<VariantBlock
				label="Variants & sizes"
				code={`import { CasualButton } from "@suki-suki-club/link-like-ui/System/CasualButton";\n\n<CasualButton variant="primary">OK</CasualButton>\n<CasualButton variant="secondary">Back</CasualButton>\n<CasualButton size="lg">OK</CasualButton>`}
			>
				<CasualButton variant="primary" onClick={() => {}}>
					OK
				</CasualButton>
				<CasualButton variant="secondary" onClick={() => {}}>
					Back
				</CasualButton>
				<CasualButton size="lg" onClick={() => {}}>
					OK
				</CasualButton>
			</VariantBlock>

			<VariantBlock
				label="Disabled"
				code={`<CasualButton disabled>OK</CasualButton>`}
			>
				<CasualButton disabled>OK</CasualButton>
			</VariantBlock>
		</CatalogPage>
	);
}
