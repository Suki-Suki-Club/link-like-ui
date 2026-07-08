import { useState } from "react";
import { AudioIcon, Toggle } from "../../../../src/System/Toggle";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function ToggleCatalog() {
	const [pressed, setPressed] = useState<boolean>(false);

	return (
		<CatalogPage
			title="Toggle"
			description="Round on/off toggle button. Gradient when on, gray when off."
		>
			<VariantBlock
				label="Audio toggle"
				code={`import { AudioIcon, Toggle } from "@suki-suki-club/link-like-ui/System/Toggle";\n\n<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle audio">\n  <AudioIcon />\n</Toggle>`}
			>
				<Toggle
					pressed={pressed}
					onPressedChange={setPressed}
					aria-label="Toggle audio"
				>
					<AudioIcon />
				</Toggle>
			</VariantBlock>
		</CatalogPage>
	);
}
