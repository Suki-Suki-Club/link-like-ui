import { TapEffect } from "../../../../src/System/TapEffect";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function TapEffectCatalog() {
	return (
		<CatalogPage
			title="Tap Effect"
			description="Wrapper that renders a rippling ring effect following pointer press and drag."
		>
			<VariantBlock
				label="Press & drag"
				code={`import { TapEffect } from "@suki-suki-club/link-like-ui/System/TapEffect";\n\n<TapEffect>\n  <div>Press & drag inside</div>\n</TapEffect>`}
			>
				<TapEffect>
					<div className="grid h-40 w-72 place-items-center rounded-xl bg-linear-to-br from-ll-system-left to-ll-system-right text-ll-white">
						Press &amp; drag anywhere
					</div>
				</TapEffect>
			</VariantBlock>
		</CatalogPage>
	);
}
