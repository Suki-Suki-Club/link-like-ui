import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MEMBERS } from "../../../../src/Data/Members";
import { CatalogPage } from "../kit/CatalogPage";
import { MemberCard } from "./MemberCard";

export function MembersCatalog() {
	const [searchParams] = useSearchParams();
	const focusId = searchParams.get("focus");
	const [expandedId, setExpandedId] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (focusId === null) {
			return;
		}

		const id = Number(focusId);

		if (Number.isNaN(id)) {
			return;
		}

		setExpandedId(id);
		containerRef.current
			?.querySelector<HTMLElement>(`[data-member-id="${id}"]`)
			?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, [focusId]);

	return (
		<CatalogPage
			title="Members"
			description="All members. Click a card to expand full name splits, kana/en, voice actor, and unit cross-links."
		>
			<div ref={containerRef} className="ll-catalog-member-grid">
				{MEMBERS.map((member) => (
					<div key={member.id} data-member-id={member.id}>
						<MemberCard
							member={member}
							expanded={expandedId === member.id}
							onToggle={() =>
								setExpandedId((previousId) =>
									previousId === member.id ? null : member.id,
								)
							}
						/>
					</div>
				))}
			</div>
		</CatalogPage>
	);
}
