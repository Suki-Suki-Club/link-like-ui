import { Avatar } from "../../../src/System/Avatar";

export function AvatarPreview() {
	return (
		<section className="flex flex-col items-center gap-3">
			<h2 className="text-sm font-bold text-ll-gray">Avatar</h2>
			<div className="flex items-center gap-4">
				<Avatar size="sm" />
				<Avatar size="md" />
				<Avatar size="lg" />
			</div>
		</section>
	);
}
