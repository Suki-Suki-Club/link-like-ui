const fs = require("fs");

const content = `import type { SVGProps } from "react";

const LinearGradientDef = () => (
<defs>
<linearGradient id="footer-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stopColor="#43B6E9" />
<stop offset="100%" stopColor="#967DF4" />
</linearGradient>
</defs>
);

export function FooterPanelToggleIcon({
open = false,
...props
}: SVGProps<SVGSVGElement> & { open?: boolean }) {
return (
<svg
viewBox="0 0 24 24"
width="32"
height="32"
fill="none"
aria-hidden="true"
{...props}
>
<LinearGradientDef />
{open ? (
<>
<path
d="M8 8L16 16"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
/>
<path
d="M16 8L8 16"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
/>
</>
) : (
<>
<path
d="M6 10H14"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
/>
<path
d="M6 14H18"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
/>
</>
)}
</svg>
);
}

export function FooterPanelBackIcon(props: SVGProps<SVGSVGElement>) {
return (
<svg
viewBox="0 0 24 24"
width="32"
height="32"
fill="none"
aria-hidden="true"
{...props}
>
<LinearGradientDef />
<path
d="M9 10L6 13L9 16"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
strokeLinejoin="round"
/>
<path
d="M6 13H14C16.2091 13 18 14.7909 18 17"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
/>
</svg>
);
}

export function FooterPanelHomeIcon(props: SVGProps<SVGSVGElement>) {
return (
<svg
viewBox="0 0 24 24"
width="32"
height="32"
fill="none"
aria-hidden="true"
{...props}
>
<LinearGradientDef />
<path
d="M5 11L12 5L19 11V18C19 18.5523 18.5523 19 18 19H14V13H10V19H6C5.44772 19 5 18.5523 5 18V11Z"
stroke="url(#footer-icon-grad)"
strokeWidth="1.5"
strokeLinecap="round"
strokeLinejoin="round"
/>
</svg>
);
}
`;
fs.writeFileSync("src/System/FooterPanel/content.tsx", content);

const structure = fs.readFileSync(
	"src/System/FooterPanel/structure.tsx",
	"utf-8",
);
const newStructure = structure
	.replace(/rounded-\[1\.6rem\]/g, "rounded-t-[1.5rem]")
	.replace(
		/bg-theme-surface/g,
		"bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]",
	)
	.replace(/border border-transparent/g, "")
	.replace(/border-r-theme-surface-active/g, "border-r-neutral-200");

fs.writeFileSync("src/System/FooterPanel/structure.tsx", newStructure);
