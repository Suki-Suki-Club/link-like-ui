import { Button } from "../../../src/System/Button";
import { CasualButton } from "../../../src/System/CasualButton";

interface PreviewToolbarProps {
	isLoadingVisible: boolean;
	onToggleLoading: () => void;
}

export function PreviewToolbar({
	isLoadingVisible,
	onToggleLoading,
}: PreviewToolbarProps) {
	return (
		<div className="mb-4 flex flex-wrap items-start gap-3">
			<Button>Gradient</Button>
			<Button variant="secondary">Secondary</Button>
			<Button disabled>Gradient Disabled</Button>
			<Button variant="secondary" disabled>
				Secondary Disabled
			</Button>
			<Button variant="secondary" onClick={onToggleLoading}>
				{isLoadingVisible ? "Hide Loading" : "Toggle Loading"}
			</Button>
			<CasualButton>OK</CasualButton>
			<CasualButton variant="secondary">もどる</CasualButton>
			<CasualButton disabled>OK</CasualButton>
		</div>
	);
}
