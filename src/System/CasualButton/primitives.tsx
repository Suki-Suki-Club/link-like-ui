import { type ButtonHTMLAttributes, type ElementRef, forwardRef } from "react";

export const CasualButtonBase = forwardRef<
	ElementRef<"button">,
	ButtonHTMLAttributes<HTMLButtonElement>
>(({ type = "button", ...props }, ref) => (
	<button ref={ref} type={type} {...props} />
));

CasualButtonBase.displayName = "CasualButtonBase";
