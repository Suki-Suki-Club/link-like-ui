import { useState } from "react";
import {
	ModalTabList,
	ModalTabPanel,
	ModalTabRoot,
	ModalTabTrigger,
} from "../../../../src/System/ModalTab";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function ModalTabCatalog() {
	const [tab, setTab] = useState<string>("tab-01");

	return (
		<CatalogPage
			title="Modal Tab"
			description="Underlined tab strip used inside modals. Controlled via value / onValueChange."
		>
			<VariantBlock
				label="Two tabs"
				code={`import {\n  ModalTabList, ModalTabPanel, ModalTabRoot, ModalTabTrigger,\n} from "@suki-suki-club/link-like-ui/System/ModalTab";\n\n<ModalTabRoot value={tab} onValueChange={setTab}>\n  <ModalTabList>\n    <ModalTabTrigger value="tab-01">First</ModalTabTrigger>\n    <ModalTabTrigger value="tab-02">Second</ModalTabTrigger>\n  </ModalTabList>\n  <ModalTabPanel value="tab-01">First panel</ModalTabPanel>\n  <ModalTabPanel value="tab-02">Second panel</ModalTabPanel>\n</ModalTabRoot>`}
			>
				<div className="w-80 overflow-hidden rounded-lg border border-ll-table bg-ll-white">
					<ModalTabRoot value={tab} onValueChange={setTab}>
						<ModalTabList>
							<ModalTabTrigger value="tab-01">First</ModalTabTrigger>
							<ModalTabTrigger value="tab-02">Second</ModalTabTrigger>
						</ModalTabList>
						<ModalTabPanel value="tab-01">
							<div className="p-4 text-sm text-ll-gray">First panel</div>
						</ModalTabPanel>
						<ModalTabPanel value="tab-02">
							<div className="p-4 text-sm text-ll-gray">Second panel</div>
						</ModalTabPanel>
					</ModalTabRoot>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
