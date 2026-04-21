import { Badge } from "../../../src/System/Badge";

export function BadgePreview() {
	return (
		<section className="flex flex-col items-center gap-3">
			<h2 className="text-sm font-bold text-ll-gray">Badge</h2>
			<div className="flex flex-wrap items-center justify-center gap-2">
				<Badge>Default</Badge>
				<Badge variant="muted">Muted</Badge>
				<Badge variant="accent">Accent</Badge>
				<Badge variant="mutual">Mutual</Badge>
			</div>
		</section>
	);
}
