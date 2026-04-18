import {
	type ButtonHTMLAttributes,
	type ElementRef,
	forwardRef,
	type HTMLAttributes,
} from "react";

export const FooterPanelRootBase = forwardRef<
	ElementRef<"div">,
	HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} {...props} />);

FooterPanelRootBase.displayName = "FooterPanelRootBase";

export const FooterPanelBarBase = forwardRef<
	ElementRef<"nav">,
	HTMLAttributes<HTMLElement>
>((props, ref) => <nav ref={ref} {...props} />);

FooterPanelBarBase.displayName = "FooterPanelBarBase";

export const FooterPanelButtonBase = forwardRef<
	ElementRef<"button">,
	ButtonHTMLAttributes<HTMLButtonElement>
>(({ type = "button", ...props }, ref) => (
	<button ref={ref} type={type} {...props} />
));

FooterPanelButtonBase.displayName = "FooterPanelButtonBase";

export const FooterPanelMenuBase = forwardRef<
	ElementRef<"div">,
	HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} {...props} />);

FooterPanelMenuBase.displayName = "FooterPanelMenuBase";
