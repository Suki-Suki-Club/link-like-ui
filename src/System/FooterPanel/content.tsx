import type { SVGProps } from "react";
import { useId } from "react";

function useIconGradient() {
	const id = useId();
	const gradId = `footer-icon-grad-${id.replace(/:/g, "")}`;
	const gradUrl = `url(#${gradId})`;
	const GradientDef = () => (
		<defs>
			<linearGradient
				id={gradId}
				gradientUnits="userSpaceOnUse"
				x1="0"
				y1="0"
				x2="24"
				y2="24"
			>
				<stop offset="0%" stopColor="#43B6E9" />
				<stop offset="100%" stopColor="#967DF4" />
			</linearGradient>
		</defs>
	);
	return { GradientDef, gradUrl };
}

export function FooterPanelToggleIcon({
	open = false,
	...props
}: SVGProps<SVGSVGElement> & { open?: boolean }) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			{open ? (
				<>
					<path
						d="M8 8L16 16"
						stroke={gradUrl}
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M16 8L8 16"
						stroke={gradUrl}
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</>
			) : (
				<>
					<path
						d="M6 10H14"
						stroke={gradUrl}
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M6 14H18"
						stroke={gradUrl}
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</>
			)}
		</svg>
	);
}

export function FooterPanelBackIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<path
				d="M9 10L6 13L9 16"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6 13H14C16.2091 13 18 14.7909 18 17"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function FooterPanelHomeIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<path
				d="M5 11L12 5L19 11V18C19 18.5523 18.5523 19 18 19H14V13H10V19H6C5.44772 19 5 18.5523 5 18V11Z"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function FooterPanelNoticeIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<path
				d="M6 9V10C6 13.866 3.269 17 3 18H21C20.731 17 18 13.866 18 10V9C18 6.239 16.657 4 15 4C15 4.552 14.552 5 14 5H10C9.448 5 9 4.552 9 4C7.343 4 6 6.239 6 9Z"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10 19H14"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function FooterPanelGiftIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<path
				d="M5 9H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V9Z"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 5V9"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 9H19V12H5V9Z"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 9C14.2091 9 16 7.20914 16 5C16 5 14.5 5.5 12 5.5C9.5 5.5 8 5 8 5C8 7.20914 9.79086 9 12 9Z"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function FooterPanelGridIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<rect
				x="4"
				y="4"
				width="6"
				height="6"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="14"
				y="4"
				width="6"
				height="6"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="4"
				y="14"
				width="6"
				height="6"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="14"
				y="14"
				width="6"
				height="6"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function FooterPanelCardsIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<rect
				x="4"
				y="5"
				width="16"
				height="3"
				rx="0.5"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="4"
				y="11"
				width="16"
				height="3"
				rx="0.5"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="4"
				y="17"
				width="16"
				height="3"
				rx="0.5"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function FooterPanelTeamIcon(props: SVGProps<SVGSVGElement>) {
	const { GradientDef, gradUrl } = useIconGradient();
	return (
		<svg
			viewBox="0 0 24 24"
			width="32"
			height="32"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<GradientDef />
			<circle
				cx="8"
				cy="7"
				r="2"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="16"
				cy="7"
				r="2"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="12"
				cy="5"
				r="1.5"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 18C5 15.239 6.344 13 8 13C8.552 13 9 13.448 9 14H15C15 13.448 15.448 13 16 13C17.656 13 19 15.239 19 18"
				stroke={gradUrl}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
