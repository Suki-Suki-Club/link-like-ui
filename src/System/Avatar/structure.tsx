import type { ComponentPropsWithoutRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import { AvatarBase } from "./primitives";

type AvatarSize = "sm" | "md" | "lg";

const avatarSizeVariants = tv({
	base: "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-ll-avatar-border bg-ll-modal-content-gray",
	variants: {
		size: {
			sm: "h-8 w-8",
			md: "h-10 w-10",
			lg: "h-14 w-14",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export interface AvatarProps
	extends ComponentPropsWithoutRef<typeof AvatarBase> {
	size?: AvatarSize;
	src?: string | undefined;
	alt?: string;
}

export function Avatar({
	className,
	size = "md",
	src,
	alt = "",
	...props
}: AvatarProps) {
	return (
		<AvatarBase
			className={cn(avatarSizeVariants({ size }), className)}
			{...props}
		>
			{src ? (
				<img src={src} alt={alt} className="h-full w-full object-cover" />
			) : (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					className="h-[60%] w-[60%] text-ll-disabled"
					aria-hidden="true"
				>
					<circle cx="12" cy="8" r="4" fill="currentColor" />
					<path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" fill="currentColor" />
				</svg>
			)}
		</AvatarBase>
	);
}
