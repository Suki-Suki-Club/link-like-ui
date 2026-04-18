import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
} from "react";
import { cn } from "../../utils";
import { GridMenuBase, GridMenuItemBase } from "./primitives";

export function GridMenu({
	className,
	...props
}: ComponentPropsWithoutRef<typeof GridMenuBase>) {
	return (
		<GridMenuBase
			className={cn("grid grid-cols-2 gap-3 p-4", className)}
			{...props}
		/>
	);
}

export function GridMenuItem({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<GridMenuItemBase
			className={cn(
				"flex items-center justify-between rounded-[0.75rem] bg-ll-white p-4 shadow-[0_1px_8px_color-mix(in_srgb,var(--color-ll-card-shadow)_50%,transparent)] transition-[filter] duration-150 ease-out hover:brightness-95",
				className,
			)}
			{...props}
		/>
	);
}

export function GridMenuItemLabel({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"text-[0.82rem] font-bold leading-tight text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function GridMenuItemIcon({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex h-10 w-10 shrink-0 items-center justify-center",
				className,
			)}
			{...props}
		/>
	);
}
