import { Link } from "react-router-dom";
import { MEMBERS } from "../../../../src/Data/Members";
import type { Unit } from "../../../../src/Data/Units";
import { UNIT_ROSTERS } from "../../../../src/Data/Units";

function memberName(memberId: number) {
	return MEMBERS.find((member) => member.id === memberId)?.name ?? String(memberId);
}

export interface UnitCardProps {
	unit: Unit;
	expanded: boolean;
	onToggle: () => void;
}

export function UnitCard({ unit, expanded, onToggle }: UnitCardProps) {
	const rosters = UNIT_ROSTERS.filter((roster) => roster.unitId === unit.id);

	return (
		<div className="ll-catalog-unit-card">
			<button
				type="button"
				onClick={onToggle}
				className="ll-catalog-unit-card-trigger"
				aria-expanded={expanded}
			>
				{unit.iconUrl ? (
					<img
						src={unit.iconUrl}
						alt={unit.name}
						className="ll-catalog-unit-icon"
					/>
				) : (
					<span className="ll-catalog-unit-icon-placeholder">N/A</span>
				)}
				<span className="min-w-0 flex-1">
					<span className="ll-catalog-unit-name">{unit.name}</span>
					<span className="ll-catalog-unit-category">{unit.category}</span>
				</span>
			</button>
			{expanded ? (
				<div className="ll-catalog-unit-details">
					{rosters.map((roster) => (
						<div key={`${roster.unitId}-${roster.period}`}>
							<p className="ll-catalog-unit-period">{roster.period}</p>
							<div className="ll-catalog-unit-chip-list">
								{roster.memberIds.map((memberId) => (
									<Link
										key={memberId}
										to={`/data/members?focus=${memberId}`}
										className="ll-catalog-unit-chip"
									>
										{memberName(memberId)}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
