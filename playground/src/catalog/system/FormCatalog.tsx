import { useState } from "react";
import {
	FormInputField,
	FormSelectField,
	FormStack,
	FormTextareaField,
} from "../../../../src/System/Form";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const categoryOptions = [
	{ label: "Option A", value: "a" },
	{ label: "Option B", value: "b" },
	{ label: "Option C", value: "c" },
];

export function FormCatalog() {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	return (
		<CatalogPage
			title="Form"
			description="Labelled form fields: text input, select, and textarea, with required + error-text support."
		>
			<VariantBlock
				label="Field stack"
				code={`import {\n  FormInputField, FormSelectField, FormStack, FormTextareaField,\n} from "@suki-suki-club/link-like-ui/System/Form";\n\n<FormStack>\n  <FormInputField label="Name" required value={name} onChange={...} />\n  <FormSelectField label="Category" value={category} onChange={...} options={options} placeholder="Select" />\n  <FormTextareaField label="Message" errorText="Required" value={message} onChange={...} />\n</FormStack>`}
			>
				<div className="w-80">
					<FormStack>
						<FormInputField
							label="Name"
							required
							value={name}
							onChange={(event) => setName(event.currentTarget.value)}
							placeholder="Enter name"
						/>
						<FormSelectField
							label="Category"
							value={category}
							onChange={(event) => setCategory(event.currentTarget.value)}
							placeholder="Select"
							options={categoryOptions}
						/>
						<FormTextareaField
							label="Message"
							errorText="Required"
							value={message}
							onChange={(event) => setMessage(event.currentTarget.value)}
							placeholder="Enter message"
						/>
					</FormStack>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
