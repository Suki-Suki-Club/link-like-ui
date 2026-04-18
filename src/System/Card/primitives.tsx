import type { ComponentPropsWithoutRef } from "react";

export function CardBase(props: ComponentPropsWithoutRef<"div">) {
	return <div {...props} />;
}
