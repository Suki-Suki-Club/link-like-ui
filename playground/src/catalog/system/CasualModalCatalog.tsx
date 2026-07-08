import { Button } from "../../../../src/System/Button";
import { CasualButton } from "../../../../src/System/CasualButton";
import {
	CasualModal,
	CasualModalBody,
	CasualModalClose,
	CasualModalContent,
	CasualModalFooter,
	CasualModalHeader,
	CasualModalLead,
	CasualModalTitle,
	CasualModalTrigger,
} from "../../../../src/System/CasualModal";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function CasualModalCatalog() {
	return (
		<CatalogPage
			title="Casual Modal"
			description="Dialog with the casual double-outline frame. Opens via its trigger."
		>
			<VariantBlock
				label="Trigger + content"
				code={`import {\n  CasualModal, CasualModalBody, CasualModalClose, CasualModalContent,\n  CasualModalFooter, CasualModalHeader, CasualModalLead, CasualModalTitle, CasualModalTrigger,\n} from "@suki-suki-club/link-like-ui/System/CasualModal";\n\n<CasualModal>\n  <CasualModalTrigger asChild><Button variant="secondary">Open</Button></CasualModalTrigger>\n  <CasualModalContent aria-describedby={undefined}>...</CasualModalContent>\n</CasualModal>`}
			>
				<CasualModal>
					<CasualModalTrigger asChild>
						<Button variant="secondary">Open Casual Modal</Button>
					</CasualModalTrigger>
					<CasualModalContent aria-describedby={undefined}>
						<CasualModalHeader>
							<CasualModalTitle>Sample Details</CasualModalTitle>
						</CasualModalHeader>
						<CasualModalBody>
							<CasualModalLead>
								The next items appear in this layout sample.
							</CasualModalLead>
							<p className="mt-3 font-bold">
								This is neutral text for checking spacing and emphasis.
							</p>
						</CasualModalBody>
						<CasualModalFooter>
							<CasualModalClose asChild>
								<CasualButton variant="secondary">Back</CasualButton>
							</CasualModalClose>
						</CasualModalFooter>
					</CasualModalContent>
				</CasualModal>
			</VariantBlock>
		</CatalogPage>
	);
}
