import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
	type HTMLAttributes,
} from "react";
import SimpleBar from "simplebar-react";
import { tv } from "tailwind-variants";
import { cn } from "../../utils";
import {
	CasualModalContentPrimitive,
	CasualModalDescriptionPrimitive,
	CasualModalOverlayPrimitive,
	CasualModalPortalPrimitive,
	CasualModalTitlePrimitive,
} from "./primitives";

const casualModalOverlayClassName = tv({
	base: "fixed inset-0 bg-ll-white/55 transition-opacity duration-180 ease-out data-[state=closed]:duration-160 data-[state=closed]:ease-in data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
});

const casualModalContentClassName = tv({
	base: "fixed top-1/2 left-1/2 max-h-[84dvh] w-[calc(100vw-2.5rem)] -translate-x-1/2 -translate-y-1/2 origin-center drop-shadow-[0_3px_5px_color-mix(in_srgb,var(--color-ll-gray)_35%,transparent)] data-[state=open]:animate-[ll-system-modal-open_100ms_cubic-bezier(.93,.23,.71,.94)_both] data-[state=closed]:animate-[ll-system-modal-close_100ms_cubic-bezier(.93,.23,.71,.94)_both] focus-visible:outline-none",
	variants: {
		width: {
			sm: "max-w-87",
			md: "max-w-[24rem]",
			lg: "max-w-104",
		},
	},
	defaultVariants: {
		width: "lg",
	},
});

export const CasualModalOverlay = forwardRef<
	ElementRef<typeof CasualModalOverlayPrimitive>,
	ComponentPropsWithoutRef<typeof CasualModalOverlayPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<CasualModalOverlayPrimitive
			ref={ref}
			className={cn(casualModalOverlayClassName(), className)}
			{...props}
		/>
	);
});

CasualModalOverlay.displayName = "CasualModalOverlay";

export interface CasualModalContentProps
	extends ComponentPropsWithoutRef<typeof CasualModalContentPrimitive> {
	width?: "sm" | "md" | "lg";
}

export const CasualModalContent = forwardRef<
	ElementRef<typeof CasualModalContentPrimitive>,
	CasualModalContentProps
>(({ children, className, width = "lg", ...props }, ref) => {
	return (
		<CasualModalPortalPrimitive>
			<CasualModalOverlay />
			<CasualModalContentPrimitive
				ref={ref}
				className={cn(casualModalContentClassName({ width }), className)}
				{...props}
			>
				<span
					className="absolute inset-x-[13px] inset-y-0 rounded-[10px] bg-ll-white"
					aria-hidden="true"
				/>
				<span
					className="absolute inset-x-0 inset-y-[13px] rounded-[10px] bg-ll-white"
					aria-hidden="true"
				/>
				<div className="relative flex max-h-[84dvh] flex-col">{children}</div>
			</CasualModalContentPrimitive>
		</CasualModalPortalPrimitive>
	);
});

CasualModalContent.displayName = "CasualModalContent";

export function CasualModalDivider({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("ll-casual-dashed-line", className)}
			aria-hidden="true"
			{...props}
		/>
	);
}

export function CasualModalHeader({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("px-5 pt-2.5", className)} {...props}>
			{children}
			<CasualModalDivider className="mt-2.5" />
		</div>
	);
}

export function CasualModalBody({
	className,
	children,
	style,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<SimpleBar
			autoHide={false}
			className="ll-system-modal-scrollbar ll-font-ja text-[0.625rem] leading-[1.45] text-ll-casual-ink"
			style={{ maxHeight: "min(58dvh, 33rem)", ...style }}
			{...props}
		>
			<div className={cn("px-5 pt-4 pb-4", className)}>{children}</div>
		</SimpleBar>
	);
}

export function CasualModalFooter({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("px-5 pb-3.5", className)} {...props}>
			<CasualModalDivider />
			<div className="flex justify-center pt-2">{children}</div>
		</div>
	);
}

export const CasualModalTitle = forwardRef<
	ElementRef<typeof CasualModalTitlePrimitive>,
	ComponentPropsWithoutRef<typeof CasualModalTitlePrimitive>
>(({ className, ...props }, ref) => {
	return (
		<CasualModalTitlePrimitive
			ref={ref}
			className={cn(
				"ll-font-ja ll-casual-title-text text-center text-[1.25rem] leading-none font-bold tracking-[0.05em] text-ll-true-white",
				className,
			)}
			{...props}
		/>
	);
});

CasualModalTitle.displayName = "CasualModalTitle";

export const CasualModalDescription = forwardRef<
	ElementRef<typeof CasualModalDescriptionPrimitive>,
	ComponentPropsWithoutRef<typeof CasualModalDescriptionPrimitive>
>(({ className, ...props }, ref) => {
	return (
		<CasualModalDescriptionPrimitive
			ref={ref}
			className={cn("text-inherit [font:inherit]", className)}
			{...props}
		/>
	);
});

CasualModalDescription.displayName = "CasualModalDescription";
