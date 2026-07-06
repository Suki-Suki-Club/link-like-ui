import type { HTMLAttributes } from "react";
import { cn } from "../../utils";

export function CasualModalLead({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"text-center text-[0.75rem] font-bold tracking-[0.2em]",
				className,
			)}
			{...props}
		/>
	);
}
