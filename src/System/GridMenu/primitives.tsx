import type { ComponentPropsWithoutRef } from "react";

export function GridMenuBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}

export function GridMenuItemBase(props: ComponentPropsWithoutRef<"button">) {
	return <button type="button" {...props} />;
}
