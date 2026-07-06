import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { CasualButtonBase } from "./primitives";

type CasualButtonVariant = "primary" | "secondary";
type CasualButtonSize = "md" | "lg";

const casualButtonVariants = tv({
	base: "ll-font-ja ll-casual-outline-text ll-shadow-casual-button relative mb-[5px] inline-flex items-center justify-center rounded-[5px] font-bold leading-none text-ll-true-white transition-[filter,transform,background-color,color,border-color] duration-150 ease-out after:pointer-events-none after:absolute after:inset-[3px] after:rounded-[3px] after:border after:border-ll-true-white/90 after:content-[''] hover:brightness-90 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ll-label disabled:cursor-not-allowed disabled:grayscale disabled:hover:brightness-100",
	variants: {
		variant: {
			primary:
				"bg-ll-casual-blue [--ll-casual-outline:var(--color-ll-casual-blue-edge)] [--ll-casual-shade:var(--color-ll-casual-blue-shade)]",
			secondary:
				"bg-ll-casual-yellow [--ll-casual-outline:var(--color-ll-casual-yellow-edge)] [--ll-casual-shade:var(--color-ll-casual-yellow-shade)]",
		},
		size: {
			md: "h-[2.55rem] min-w-[7rem] px-6 text-[0.875rem] tracking-[0.2em]",
			lg: "h-[2.85rem] min-w-[9rem] px-7 text-[1rem] tracking-[0.2em]",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

export interface CasualButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: CasualButtonVariant;
	size?: CasualButtonSize;
}

export const CasualButton = forwardRef<HTMLButtonElement, CasualButtonProps>(
	({ className, size = "md", variant = "primary", ...props }, ref) => {
		return (
			<CasualButtonBase
				ref={ref}
				className={cn(casualButtonVariants({ size, variant }), className)}
				{...props}
			/>
		);
	},
);

CasualButton.displayName = "CasualButton";
