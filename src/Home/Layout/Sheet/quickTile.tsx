import type { ReactNode } from "react";
import { cn } from "../../../utils";
import { LayoutTile, LayoutTileBadge, type LayoutTileProps } from "./structure";

export interface LayoutQuickTileProps
	extends Omit<LayoutTileProps, "children"> {
	badge?: string;
	illustration?: ReactNode;
	label: string;
}

export function LayoutQuickTile({
	badge,
	className,
	illustration,
	label,
	...props
}: LayoutQuickTileProps) {
	return (
		<LayoutTile
			className={cn(
				"aspect-square min-h-0 w-full max-w-39 justify-self-center self-center p-1.25 text-center",
				className,
			)}
			{...props}
		>
			{badge ? (
				<LayoutTileBadge
					className="absolute -top-1 -right-1 z-10"
					variant="circle"
				>
					{badge}
				</LayoutTileBadge>
			) : null}
			<div className="grid h-full content-center justify-items-center gap-[0.35rem]">
				{illustration ? (
					<div className="grid size-[clamp(1.4rem,5.2vw,1.72rem)] place-items-center leading-none text-ll-label transform-[translateY(0.02em)] [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:shrink-0">
						{illustration}
					</div>
				) : null}
				<p className="w-full truncate text-center bg-linear-to-r from-ll-system-left to-ll-system-right bg-clip-text text-[0.75em] leading-none font-medium text-transparent">
					{label}
				</p>
			</div>
		</LayoutTile>
	);
}
