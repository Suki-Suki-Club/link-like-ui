import { Button } from "../../../../src/System/Button";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function ButtonCatalog() {
	return (
		<CatalogPage
			title="Button"
			description="Primary tappable action button. Varies by variant, size, radius, width, and disabled state."
		>
			<VariantBlock
				label="Variants"
				code={`import { Button } from "@suki-suki-club/link-like-ui/System/Button";\n\n<Button variant="gradient">Gradient</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="danger">Danger</Button>`}
			>
				<Button variant="gradient" onClick={() => {}}>
					Gradient
				</Button>
				<Button variant="secondary" onClick={() => {}}>
					Secondary
				</Button>
				<Button variant="danger" onClick={() => {}}>
					Danger
				</Button>
			</VariantBlock>

			<VariantBlock
				label="Sizes"
				code={`<Button size="sm">sm</Button>\n<Button size="md">md</Button>\n<Button size="lg">lg</Button>\n<Button size="modal">modal</Button>`}
			>
				<Button size="sm" onClick={() => {}}>
					sm
				</Button>
				<Button size="md" onClick={() => {}}>
					md
				</Button>
				<Button size="lg" onClick={() => {}}>
					lg
				</Button>
				<Button size="modal" onClick={() => {}}>
					modal
				</Button>
			</VariantBlock>

			<VariantBlock
				label="Dialog radius + width"
				code={`<Button radius="dialog" width="dialog">OK</Button>`}
			>
				<Button radius="dialog" width="dialog" onClick={() => {}}>
					OK
				</Button>
			</VariantBlock>

			<VariantBlock
				label="Disabled"
				code={`<Button disabled>Gradient</Button>\n<Button variant="secondary" disabled>Secondary</Button>`}
			>
				<Button disabled>Gradient</Button>
				<Button variant="secondary" disabled>
					Secondary
				</Button>
			</VariantBlock>
		</CatalogPage>
	);
}
