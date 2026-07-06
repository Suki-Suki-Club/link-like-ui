import * as Dialog from "@radix-ui/react-dialog";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";

export const CasualModal = Dialog.Root;
export const CasualModalTrigger = Dialog.Trigger;
export const CasualModalClose = Dialog.Close;
export const CasualModalPortalPrimitive = Dialog.Portal;

export const CasualModalOverlayPrimitive = forwardRef<
	ElementRef<typeof Dialog.Overlay>,
	ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ ...props }, ref) => <Dialog.Overlay ref={ref} {...props} />);

CasualModalOverlayPrimitive.displayName = "CasualModalOverlayPrimitive";

export const CasualModalContentPrimitive = forwardRef<
	ElementRef<typeof Dialog.Content>,
	ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ ...props }, ref) => <Dialog.Content ref={ref} {...props} />);

CasualModalContentPrimitive.displayName = "CasualModalContentPrimitive";

export const CasualModalTitlePrimitive = Dialog.Title;
export const CasualModalDescriptionPrimitive = Dialog.Description;
