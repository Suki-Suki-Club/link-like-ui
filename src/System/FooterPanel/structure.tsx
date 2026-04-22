import {
	type ButtonHTMLAttributes,
	createContext,
	type HTMLAttributes,
	type ReactNode,
	useContext,
	useId,
	useState,
} from "react";
import { cn } from "../../utils";
import { FooterPanelToggleIcon } from "./content";
import {
	FooterPanelBarBase,
	FooterPanelButtonBase,
	FooterPanelMenuBase,
	FooterPanelRootBase,
} from "./primitives";

type FooterPanelContextValue = {
	menuId: string;
	open: boolean;
	setOpen: (nextOpen: boolean) => void;
	toggleOpen: () => void;
	triggerId: string;
};

const FooterPanelContext = createContext<FooterPanelContextValue | null>(null);

function useFooterPanelContext(componentName: string) {
	const context = useContext(FooterPanelContext);

	if (!context) {
		throw new Error(`${componentName} must be used within FooterPanel.`);
	}

	return context;
}

export interface FooterPanelProps extends HTMLAttributes<HTMLDivElement> {
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
}

export function FooterPanel({
	children,
	className,
	defaultOpen = false,
	onOpenChange,
	open,
	...props
}: FooterPanelProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const menuId = useId();
	const triggerId = useId();
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : uncontrolledOpen;

	function setOpen(nextOpen: boolean) {
		if (!isControlled) {
			setUncontrolledOpen(nextOpen);
		}

		onOpenChange?.(nextOpen);
	}

	function toggleOpen() {
		setOpen(!isOpen);
	}

	return (
		<FooterPanelContext.Provider
			value={{ menuId, open: isOpen, setOpen, toggleOpen, triggerId }}
		>
			<FooterPanelRootBase
				className={cn("relative isolate w-full", className)}
				{...props}
			>
				{children}
			</FooterPanelRootBase>
		</FooterPanelContext.Provider>
	);
}

export function FooterPanelBar({
	children,
	className,
	columns = 3,
	style,
	...props
}: HTMLAttributes<HTMLElement> & { columns?: number }) {
	return (
		<FooterPanelBarBase
			className={cn(
				"relative grid min-h-[4.9rem] w-full overflow-hidden rounded-t-3xl border border-[color-mix(in_srgb,var(--color-ll-avatar-border)_72%,transparent)] bg-ll-white shadow-[0_0.4rem_1.15rem_color-mix(in_srgb,var(--color-ll-card-shadow)_52%,transparent)]",
				className,
			)}
			style={{
				gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				...style,
			}}
			{...props}
		>
			{children}
		</FooterPanelBarBase>
	);
}

export interface FooterPanelItemProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	badge?: ReactNode;
}

export function FooterPanelItem({
	active = false,
	badge,
	children,
	className,
	...props
}: FooterPanelItemProps) {
	return (
		<FooterPanelButtonBase
			className={cn(
				"relative flex min-h-[4.9rem] items-center justify-center gap-1.5 border-r border-[color-mix(in_srgb,var(--color-ll-avatar-border)_72%,transparent)] px-3 py-3 text-ll-label transition-[filter,color] duration-150 ease-out last:border-r-0 hover:brightness-95 focus-visible:z-1 focus-visible:outline-3 focus-visible:outline-ll-label disabled:text-ll-disabled disabled:hover:brightness-100",
				active && "text-ll-system-right",
				className,
			)}
			{...props}
		>
			{badge}
			{children}
		</FooterPanelButtonBase>
	);
}

export function FooterPanelItemIcon({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex h-6 w-6 shrink-0 items-center justify-center text-current",
				className,
			)}
			{...props}
		/>
	);
}

export function FooterPanelItemLabel({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"text-[0.72rem] font-semibold leading-none tracking-[0.02em] text-current",
				className,
			)}
			{...props}
		/>
	);
}

export function FooterPanelNotificationDot({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"absolute top-[0.7rem] right-4 h-3.5 w-3.5 rounded-full border-[0.18rem] border-ll-white bg-ll-red shadow-[0_0.2rem_0.45rem_color-mix(in_srgb,var(--color-ll-red)_35%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export interface FooterPanelCenterTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	badge?: ReactNode;
	label?: string;
}

export function FooterPanelCenterTrigger({
	badge,
	className,
	label,
	onClick,
	...props
}: FooterPanelCenterTriggerProps) {
	const { menuId, open, toggleOpen, triggerId } = useFooterPanelContext(
		"FooterPanelCenterTrigger",
	);

	return (
		<FooterPanelButtonBase
			aria-controls={menuId}
			aria-expanded={open}
			aria-haspopup="menu"
			className={cn(
				"relative flex min-h-[4.9rem] items-center justify-center gap-1.5 border-r border-[color-mix(in_srgb,var(--color-ll-avatar-border)_72%,transparent)] px-3 py-3 text-ll-label transition-[filter,color] duration-150 ease-out last:border-r-0 hover:brightness-95 focus-visible:z-1 focus-visible:outline-3 focus-visible:outline-ll-label",
				open && "text-ll-system-right",
				className,
			)}
			id={triggerId}
			onClick={(event) => {
				onClick?.(event);

				if (!event.defaultPrevented) {
					toggleOpen();
				}
			}}
			{...props}
		>
			{badge}
			<FooterPanelItemIcon>
				<FooterPanelToggleIcon open={open} />
			</FooterPanelItemIcon>
			{label ? <FooterPanelItemLabel>{label}</FooterPanelItemLabel> : null}
		</FooterPanelButtonBase>
	);
}

export function FooterPanelMenu({
	children,
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const { menuId, open, triggerId } = useFooterPanelContext("FooterPanelMenu");

	return (
		<FooterPanelMenuBase
			aria-hidden={!open}
			aria-labelledby={triggerId}
			className={cn(
				"pointer-events-none absolute inset-x-0 bottom-[calc(100%+0.85rem)] z-20 flex justify-center px-3 transition-[opacity,transform,visibility] duration-180 ease-out",
				open
					? "visible translate-y-0 opacity-100"
					: "invisible translate-y-3 opacity-0",
				className,
			)}
			id={menuId}
			role="menu"
			{...props}
		>
			<div className="pointer-events-auto w-full max-w-88 rounded-3xl border border-[color-mix(in_srgb,var(--color-ll-avatar-border)_76%,transparent)] bg-[color-mix(in_srgb,var(--color-ll-white)_94%,transparent)] p-3 shadow-[0_0.75rem_1.6rem_color-mix(in_srgb,var(--color-ll-card-shadow)_42%,transparent)] backdrop-blur-[6px]">
				{children}
			</div>
		</FooterPanelMenuBase>
	);
}

export function FooterPanelMenuGrid({
	children,
	className,
	columns = 5,
	style,
	...props
}: HTMLAttributes<HTMLDivElement> & { columns?: number }) {
	return (
		<div
			className={cn("grid gap-2.5", className)}
			style={{
				gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}

export interface FooterPanelMenuItemProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	closeOnSelect?: boolean;
	badge?: ReactNode;
}

export function FooterPanelMenuItem({
	badge,
	children,
	className,
	closeOnSelect = true,
	onClick,
	...props
}: FooterPanelMenuItemProps) {
	const { setOpen } = useFooterPanelContext("FooterPanelMenuItem");

	return (
		<FooterPanelButtonBase
			className={cn(
				"relative flex min-h-[5.55rem] flex-col items-center justify-center gap-1.5 rounded-2xl bg-ll-white px-2 py-2 text-ll-label shadow-[0_0.35rem_0.85rem_color-mix(in_srgb,var(--color-ll-card-shadow)_35%,transparent)] transition-[filter,transform] duration-150 ease-out hover:-translate-y-px hover:brightness-95 focus-visible:outline-3 focus-visible:outline-ll-label disabled:text-ll-disabled disabled:hover:translate-y-0 disabled:hover:brightness-100",
				className,
			)}
			onClick={(event) => {
				onClick?.(event);

				if (!event.defaultPrevented && closeOnSelect) {
					setOpen(false);
				}
			}}
			role="menuitem"
			{...props}
		>
			{badge}
			{children}
		</FooterPanelButtonBase>
	);
}

export function FooterPanelMenuItemIcon({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex h-6 w-6 items-center justify-center text-current",
				className,
			)}
			{...props}
		/>
	);
}

export function FooterPanelMenuItemLabel({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				"text-center text-[0.67rem] font-semibold leading-tight tracking-[0.02em] text-current",
				className,
			)}
			{...props}
		/>
	);
}
