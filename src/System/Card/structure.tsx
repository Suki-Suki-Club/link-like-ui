import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { cn } from "../../utils";
import { CardBase } from "./primitives";

export function Card({
	className,
	...props
}: ComponentPropsWithoutRef<typeof CardBase>) {
	return (
		<CardBase
			className={cn(
				"rounded-xl bg-ll-white p-4 shadow-[0_1px_8px_color-mix(in_srgb,var(--color-ll-card-shadow)_50%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex items-center justify-between gap-3", className)}
			{...props}
		/>
	);
}

export function CardBody({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("mt-2", className)} {...props} />;
}

export function CardTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn(
				"text-[0.9rem] font-bold leading-tight text-ll-gray",
				className,
			)}
			{...props}
		/>
	);
}

export function CardDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn("text-[0.78rem] leading-[1.4] text-ll-gray", className)}
			{...props}
		/>
	);
}

export function CardFooter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mt-3 flex items-center justify-end gap-2", className)}
			{...props}
		/>
	);
}

export function CardIcon({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ll-modal-content-gray",
				className,
			)}
			{...props}
		/>
	);
}
