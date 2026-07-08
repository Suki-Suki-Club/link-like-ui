import { useState } from "react";
import { RadioField, RadioFieldRow } from "../../../../src/System/Radio";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const options = [
	{ label: "Option A", value: "a" },
	{ label: "Option B", value: "b" },
	{ label: "Option C", value: "c" },
];

const rowOptions = [
	{ label: "All", value: "all" },
	{ label: "Show", value: "show" },
	{ label: "Hide", value: "hide" },
];

export function RadioCatalog() {
	const [value, setValue] = useState<string>("a");
	const [rowValue, setRowValue] = useState<string>("all");

	return (
		<CatalogPage
			title="Radio"
			description="Radio group field, stacked (RadioField) or inline with a leading label (RadioFieldRow)."
		>
			<VariantBlock
				label="RadioField (stacked)"
				code={`import { RadioField } from "@suki-suki-club/link-like-ui/System/Radio";\n\n<RadioField\n  label="Category"\n  groupProps={{ value, onValueChange: setValue }}\n  options={options}\n/>`}
			>
				<div className="w-80">
					<RadioField
						label="Category"
						groupProps={{ value, onValueChange: setValue }}
						options={options}
					/>
				</div>
			</VariantBlock>

			<VariantBlock
				label="RadioFieldRow (inline)"
				code={`import { RadioFieldRow } from "@suki-suki-club/link-like-ui/System/Radio";\n\n<RadioFieldRow\n  label="Filter"\n  groupProps={{ value: rowValue, onValueChange: setRowValue }}\n  options={rowOptions}\n/>`}
			>
				<div className="w-80">
					<RadioFieldRow
						label="Filter"
						groupProps={{ value: rowValue, onValueChange: setRowValue }}
						options={rowOptions}
					/>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
