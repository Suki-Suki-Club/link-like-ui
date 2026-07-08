import { Button } from "../../../../src/System/Button";
import {
	SystemModal,
	SystemModalActions,
	SystemModalBody,
	SystemModalClose,
	SystemModalContent,
	SystemModalHeader,
	SystemModalMessage,
	SystemModalTitle,
	SystemModalTrigger,
	SystemModalWarning,
} from "../../../../src/System/SystemModal";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function SystemModalCatalog() {
	return (
		<CatalogPage
			title="System Modal"
			description="The system dialog frame: trigger, header/title, body with message + warning, and a close action."
		>
			<VariantBlock
				label="Info modal"
				code={`import {\n  SystemModal, SystemModalActions, SystemModalBody, SystemModalClose,\n  SystemModalContent, SystemModalHeader, SystemModalMessage, SystemModalTitle,\n  SystemModalTrigger, SystemModalWarning,\n} from "@suki-suki-club/link-like-ui/System/SystemModal";\n\n<SystemModal>\n  <SystemModalTrigger asChild><Button size="lg">Open Modal</Button></SystemModalTrigger>\n  <SystemModalContent width="md">...</SystemModalContent>\n</SystemModal>`}
			>
				<SystemModal>
					<SystemModalTrigger asChild>
						<Button size="lg">Open Modal</Button>
					</SystemModalTrigger>
					<SystemModalContent width="md">
						<SystemModalHeader>
							<SystemModalTitle>Info</SystemModalTitle>
						</SystemModalHeader>
						<SystemModalBody padding="comfortable">
							<SystemModalMessage>
								<p>NOTICE</p>
								<p>Sample text for UI preview.</p>
							</SystemModalMessage>
							<SystemModalWarning>
								This is a warning message for layout verification only.
							</SystemModalWarning>
							<SystemModalActions spacing="compact">
								<SystemModalClose asChild>
									<Button
										variant="secondary"
										size="lg"
										radius="dialog"
										width="dialog"
									>
										Close
									</Button>
								</SystemModalClose>
							</SystemModalActions>
						</SystemModalBody>
					</SystemModalContent>
				</SystemModal>
			</VariantBlock>
		</CatalogPage>
	);
}
