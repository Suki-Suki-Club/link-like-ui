import { Button } from "../../../src/System/Button";

export function ButtonPreview() {
	return (
		<section className="flex flex-col items-center gap-3">
			<h2 className="text-sm font-bold text-ll-gray">Button</h2>
			<div className="flex items-center gap-4">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="danger">Danger</Button>
			</div>
		</section>
	);
}
