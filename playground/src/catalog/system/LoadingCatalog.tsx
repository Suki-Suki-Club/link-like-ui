import { useState } from "react";
import { Button } from "../../../../src/System/Button";
import { LoadingOverlay } from "../../../../src/System/Loading";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function LoadingCatalog() {
	const [visible, setVisible] = useState<boolean>(false);

	function show() {
		setVisible(true);
		globalThis.setTimeout(() => setVisible(false), 2000);
	}

	return (
		<CatalogPage
			title="Loading"
			description="Full-screen loading overlay with a spinner and label. Auto-hides after 2s in this demo."
		>
			<VariantBlock
				label="Loading overlay"
				code={`import { LoadingOverlay } from "@suki-suki-club/link-like-ui/System/Loading";\n\n{isLoading ? <LoadingOverlay text="Now Loading..." /> : null}`}
			>
				<Button variant="secondary" onClick={show}>
					Show Loading (2s)
				</Button>
				{visible ? <LoadingOverlay text="Now Loading..." /> : null}
			</VariantBlock>
		</CatalogPage>
	);
}
