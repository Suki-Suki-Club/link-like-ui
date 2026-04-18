import type { ComponentPropsWithoutRef } from "react";

export function BadgeBase(props: ComponentPropsWithoutRef<"span">) {
	return <span {...props} />;
}
