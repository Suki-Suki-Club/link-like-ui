import type { ComponentPropsWithoutRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { BadgeBase } from "./primitives";

type BadgeVariant = "default" | "muted" | "accent" | "mutual";

const badgeVariants = tv({
	base: "inline-flex items-center justify-center rounded-sm px-2 py-0.5 text-[0.65rem] font-bold leading-none",
	variants: {
		variant: {
			default:
				"bg-linear-to-r from-ll-system-left to-ll-system-right text-ll-white",
			muted: "bg-ll-badge-gray text-ll-white",
			accent: "bg-ll-badge-accent text-ll-white",
			mutual:
				"border border-ll-mutual-text bg-ll-mutual-bg text-ll-mutual-text",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface BadgeProps extends ComponentPropsWithoutRef<typeof BadgeBase> {
	variant?: BadgeVariant;
}

export function Badge({
	className,
	variant = "default",
	...props
}: BadgeProps) {
	return (
		<BadgeBase
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}
