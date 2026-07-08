import { Avatar } from "../../../../src/System/Avatar";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const sampleSrc = "https://sukisuki.club/icons/1021.png";

export function AvatarCatalog() {
	return (
		<CatalogPage
			title="Avatar"
			description="Circular avatar image with a silhouette state. Sizes sm / md / lg."
		>
			<VariantBlock
				label="With image (sizes)"
				code={`import { Avatar } from "@suki-suki-club/link-like-ui/System/Avatar";\n\n<Avatar size="sm" src={src} alt="Sample" />\n<Avatar size="md" src={src} alt="Sample" />\n<Avatar size="lg" src={src} alt="Sample" />`}
			>
				<Avatar size="sm" src={sampleSrc} alt="Sample" />
				<Avatar size="md" src={sampleSrc} alt="Sample" />
				<Avatar size="lg" src={sampleSrc} alt="Sample" />
			</VariantBlock>

			<VariantBlock label="Silhouette only" code={`<Avatar size="lg" />`}>
				<Avatar size="lg" />
			</VariantBlock>
		</CatalogPage>
	);
}
