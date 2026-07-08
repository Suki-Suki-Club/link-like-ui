import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UNITS } from "../../../../src/Data/Units";
import { CatalogPage } from "../kit/CatalogPage";
import { UnitCard } from "./UnitCard";

export function UnitsCatalog() {
	const [searchParams] = useSearchParams();
	const focusId = searchParams.get("focus");
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (focusId === null) {
			return;
		}

		setExpandedId(focusId);
		containerRef.current
			?.querySelector<HTMLElement>(`[data-unit-id="${focusId}"]`)
			?.scrollIntoView({ behavior: "smooth", block: "center" });
	}, [focusId]);

	return (
		<CatalogPage
			title="Units"
			description="All units. Click a card to expand its rosters; each member chip links to that member."
		>
			<div ref={containerRef} className="ll-catalog-unit-grid">
				{UNITS.map((unit) => (
					<div key={unit.id} data-unit-id={unit.id}>
						<UnitCard
							unit={unit}
							expanded={expandedId === unit.id}
							onToggle={() =>
								setExpandedId((previousId) =>
									previousId === unit.id ? null : unit.id,
								)
							}
						/>
					</div>
				))}
			</div>
		</CatalogPage>
	);
}
