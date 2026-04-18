import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils";
import { PageHeaderBase } from "./primitives";

export function PageHeader({
	className,
	...props
}: ComponentPropsWithoutRef<typeof PageHeaderBase>) {
	return (
		<PageHeaderBase
			className={cn(
				"flex w-full items-center bg-linear-to-r from-ll-system-left to-ll-system-right px-4 py-2.5",
				className,
			)}
			{...props}
		/>
	);
}

export function PageHeaderTitle({
	className,
	...props
}: ComponentPropsWithoutRef<"h1">) {
	return (
		<h1
			className={cn(
				"text-[1rem] font-bold tracking-[0.08em] text-ll-white",
				className,
			)}
			{...props}
		/>
	);
}
