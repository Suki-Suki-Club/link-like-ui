import { useState } from "react";
import {
	PageTabList,
	PageTabTrigger,
	TabList,
	TabPanel,
	TabRoot,
	TabTrigger,
} from "../../../../src/System/Tab";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

export function TabCatalog() {
	const [tab, setTab] = useState<string>("tab-01");
	const [pageTab, setPageTab] = useState<string>("page-01");

	return (
		<CatalogPage
			title="Tab"
			description="Segmented tabs (TabList/TabTrigger) and underlined page tabs (PageTabList/PageTabTrigger)."
		>
			<VariantBlock
				label="Tab (segmented)"
				code={`import { TabList, TabPanel, TabRoot, TabTrigger } from "@suki-suki-club/link-like-ui/System/Tab";\n\n<TabRoot value={tab} onValueChange={setTab}>\n  <TabList>\n    <TabTrigger value="tab-01">One</TabTrigger>\n    <TabTrigger value="tab-02">Two</TabTrigger>\n  </TabList>\n  <TabPanel value="tab-01" tone="surface">First</TabPanel>\n  <TabPanel value="tab-02" tone="surface">Second</TabPanel>\n</TabRoot>`}
			>
				<div className="w-80">
					<TabRoot value={tab} onValueChange={setTab}>
						<TabList>
							<TabTrigger value="tab-01">One</TabTrigger>
							<TabTrigger value="tab-02">Two</TabTrigger>
						</TabList>
						<TabPanel value="tab-01" tone="surface">
							First panel
						</TabPanel>
						<TabPanel value="tab-02" tone="surface">
							Second panel
						</TabPanel>
					</TabRoot>
				</div>
			</VariantBlock>

			<VariantBlock
				label="PageTab (underlined)"
				code={`import { PageTabList, PageTabTrigger, TabPanel, TabRoot } from "@suki-suki-club/link-like-ui/System/Tab";\n\n<TabRoot value={pageTab} onValueChange={setPageTab}>\n  <PageTabList>\n    <PageTabTrigger value="page-01">Overview</PageTabTrigger>\n    <PageTabTrigger value="page-02">Detail</PageTabTrigger>\n  </PageTabList>\n  <TabPanel value="page-01">Overview</TabPanel>\n  <TabPanel value="page-02">Detail</TabPanel>\n</TabRoot>`}
			>
				<div className="w-80">
					<TabRoot value={pageTab} onValueChange={setPageTab}>
						<PageTabList>
							<PageTabTrigger value="page-01">Overview</PageTabTrigger>
							<PageTabTrigger value="page-02">Detail</PageTabTrigger>
						</PageTabList>
						<TabPanel value="page-01">Overview panel</TabPanel>
						<TabPanel value="page-02">Detail panel</TabPanel>
					</TabRoot>
				</div>
			</VariantBlock>
		</CatalogPage>
	);
}
