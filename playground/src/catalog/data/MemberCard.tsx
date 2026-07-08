import { Link } from "react-router-dom";
import { GENERATIONS } from "../../../../src/Data/Generations";
import type { Member } from "../../../../src/Data/Members";
import { UNITS, UNIT_ROSTERS } from "../../../../src/Data/Units";

function generationLabel(generationId: Member["generationId"]) {
	return (
		GENERATIONS.find((generation) => generation.id === generationId)?.label ??
		String(generationId)
	);
}

function unitsForMember(memberId: Member["id"]) {
	const unitIds = new Set(
		UNIT_ROSTERS.filter((roster) => roster.memberIds.includes(memberId)).map(
			(roster) => roster.unitId,
		),
	);

	return UNITS.filter((unit) => unitIds.has(unit.id));
}

export interface MemberCardProps {
	member: Member;
	expanded: boolean;
	onToggle: () => void;
}

export function MemberCard({
	member,
	expanded,
	onToggle,
}: MemberCardProps) {
	const units = unitsForMember(member.id);

	return (
		<div className="ll-catalog-member-card">
			<button
				type="button"
				onClick={onToggle}
				className="ll-catalog-member-card-trigger"
				aria-expanded={expanded}
			>
				<img
					src={member.iconUrl}
					alt={member.name}
					className="ll-catalog-member-avatar"
				/>
				<span className="min-w-0 flex-1">
					<span className="ll-catalog-member-name">{member.name}</span>
					<span className="ll-catalog-member-generation">
						{generationLabel(member.generationId)}
					</span>
				</span>
				<span
					className="ll-catalog-member-swatch"
					style={{ backgroundColor: member.themeColor }}
					aria-hidden="true"
				/>
			</button>
			{expanded ? (
				<dl className="ll-catalog-member-details">
					<div>
						<dt className="ll-catalog-member-term">Family:</dt>
						<dd className="inline">
							{member.familyName} / {member.familyNameKana} / {member.familyNameEn}
						</dd>
					</div>
					<div>
						<dt className="ll-catalog-member-term">Given:</dt>
						<dd className="inline">
							{member.givenName} / {member.givenNameKana} / {member.givenNameEn}
						</dd>
					</div>
					{member.middleName ? (
						<div>
							<dt className="ll-catalog-member-term">Middle:</dt>
							<dd className="inline">
								{member.middleName} / {member.middleNameKana} /{" "}
								{member.middleNameEn}
							</dd>
						</div>
					) : null}
					<div>
						<dt className="ll-catalog-member-term">CV:</dt>
						<dd className="inline">
							{member.voiceActor} ({member.voiceActorFamilyNameEn}{" "}
							{member.voiceActorGivenNameEn})
						</dd>
					</div>
					{units.length > 0 ? (
						<div className="pt-1">
							<dt className="ll-catalog-member-term block">Units:</dt>
							<dd className="ll-catalog-member-chip-list">
								{units.map((unit) => (
									<Link
										key={unit.id}
										to={`/data/units?focus=${unit.id}`}
										className="ll-catalog-member-chip"
									>
										{unit.name}
									</Link>
								))}
							</dd>
						</div>
					) : null}
				</dl>
			) : null}
		</div>
	);
}
