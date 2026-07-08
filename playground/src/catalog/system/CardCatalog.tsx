import { Button } from "../../../../src/System/Button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardIcon,
	CardTitle,
} from "../../../../src/System/Card";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function CardCatalog() {
	return (
		<CatalogPage
			title="Card"
			description="Composable white card: header/icon/title, body/description, footer actions."
		>
			<VariantBlock
				label="Full card"
				code={`import {\n  Card, CardBody, CardDescription, CardFooter, CardHeader, CardIcon, CardTitle,\n} from "@suki-suki-club/link-like-ui/System/Card";\n\n<Card>\n  <CardHeader>\n    <CardIcon />\n    <CardTitle>Card title</CardTitle>\n  </CardHeader>\n  <CardBody>\n    <CardDescription>Supporting text.</CardDescription>\n  </CardBody>\n  <CardFooter>\n    <Button size="sm">OK</Button>\n  </CardFooter>\n</Card>`}
			>
				<Card className="w-72">
					<CardHeader>
						<CardIcon />
						<CardTitle>Card title</CardTitle>
					</CardHeader>
					<CardBody>
						<CardDescription>
							Short supporting description text for the card body.
						</CardDescription>
					</CardBody>
					<CardFooter>
						<Button size="sm" onClick={() => {}}>
							OK
						</Button>
					</CardFooter>
				</Card>
			</VariantBlock>
		</CatalogPage>
	);
}
