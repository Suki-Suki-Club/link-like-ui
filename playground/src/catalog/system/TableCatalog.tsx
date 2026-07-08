import {
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
} from "../../../../src/System/Table";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const rows = [
	{ rarity: "SSR", ratio: "3%" },
	{ rarity: "SR", ratio: "12%" },
	{ rarity: "R", ratio: "85%" },
];

export function TableCatalog() {
	return (
		<CatalogPage
			title="Table"
			description="Compact data table with header cells and per-cell alignment."
		>
			<VariantBlock
				label="Rate table"
				code={`import {\n  TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow,\n} from "@suki-suki-club/link-like-ui/System/Table";\n\n<TableRoot>\n  <TableHead><TableRow><TableHeaderCell>Type</TableHeaderCell><TableHeaderCell>Rate</TableHeaderCell></TableRow></TableHead>\n  <TableBody><TableRow><TableCell align="center">SSR</TableCell><TableCell align="right">3%</TableCell></TableRow></TableBody>\n</TableRoot>`}
			>
				<div className="w-80">
					<TableRoot>
						<TableHead>
							<TableRow>
								<TableHeaderCell>Type</TableHeaderCell>
								<TableHeaderCell>Rate</TableHeaderCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.rarity}>
									<TableCell align="center">{row.rarity}</TableCell>
									<TableCell align="right">{row.ratio}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</TableRoot>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
