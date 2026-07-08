import {
	ListItems,
	ListNoticeCard,
	ListRoot,
} from "../../../../src/System/List";
import { CatalogPage } from "../kit/CatalogPage";
import { VariantBlock } from "../kit/VariantBlock";

const notices = [
	{
		id: "n1",
		heading: "お知らせ",
		meta: "2026/07/01",
		text: "Sample notice text for layout preview.",
	},
	{
		id: "n2",
		heading: "更新",
		meta: "2026/07/02",
		text: "Another notice item for the list.",
	},
];

export function ListCatalog() {
	return (
		<CatalogPage
			title="List"
			description="Muted panel of notice cards. Each card is actionable via onAction."
		>
			<VariantBlock
				label="Notice list"
				code={`import { ListItems, ListNoticeCard, ListRoot } from "@suki-suki-club/link-like-ui/System/List";\n\n<ListRoot>\n  <ListItems>\n    <ListNoticeCard heading="お知らせ" meta="2026/07/01" text="..." onAction={() => {}} />\n  </ListItems>\n</ListRoot>`}
			>
				<ListRoot className="w-80">
					<ListItems>
						{notices.map((notice) => (
							<ListNoticeCard
								key={notice.id}
								heading={notice.heading}
								meta={notice.meta}
								text={notice.text}
								onAction={() => {}}
							/>
						))}
					</ListItems>
				</ListRoot>
			</VariantBlock>
		</CatalogPage>
	);
}
