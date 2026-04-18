declare module "*.svg" {
	import type { FC, SVGProps } from "react";

	const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

declare module "*.png" {
	const src: string;
	export default src;
}
