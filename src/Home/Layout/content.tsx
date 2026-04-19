import {
	type ButtonHTMLAttributes,
	type ReactNode,
	useEffect,
	useState,
} from "react";
import { HomeLayoutDock } from "./Dock/content";
import { HomeLayoutHeader } from "./Header/content";
import { formatLocalClock } from "./Header/helpers";
import { useBatteryState } from "./Header/useBatteryState";
import {
	HomeLayoutSheet,
	type LayoutBannerDefinition,
	type LayoutTileDefinition,
} from "./Sheet/content";
import {
	LayoutBackground,
	LayoutRoot,
	LayoutScenery,
	LayoutScrim,
} from "./structure";

export interface LayoutAction {
	ariaLabel: string;
	label: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export type LayoutVariant = "home";
export type {
	LayoutBannerDefinition,
	LayoutTileDefinition,
} from "./Sheet/content";

export interface LayoutProps {
	actions?: LayoutAction[];
	backAction?: LayoutAction;
	centerContent?: ReactNode;
	children?: ReactNode;
	dateLabel?: string;
	defaultMenuOpen?: boolean;
	homeAction?: LayoutAction;
	menuTiles: LayoutTileDefinition[];
	sheetBottomContent?: ReactNode;
	topBanners: LayoutBannerDefinition[];
	rightContent?: ReactNode;
	statusLabel?: string;
	timeLabel?: string;
	variant?: LayoutVariant;
}

const layoutMenuAnimationDurationMs = 220;

function HomeLayout({
	backAction = {
		ariaLabel: "Back",
		label: "Back",
		onClick: () => {
			if (globalThis.history.length > 1) {
				globalThis.history.back();
			}
		},
	},
	centerContent,
	children,
	defaultMenuOpen = false,
	homeAction = { ariaLabel: "Home", label: "Home" },
	menuTiles,
	rightContent,
	sheetBottomContent,
	topBanners,
}: Omit<LayoutProps, "variant">) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(defaultMenuOpen);
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(defaultMenuOpen);
	const [clock, setClock] = useState(() => formatLocalClock(new Date()));
	const battery = useBatteryState();

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const createNavigationHandler = (
		handler?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"],
	) => {
		if (!handler) {
			return undefined;
		}

		return (event: Parameters<NonNullable<typeof handler>>[0]) => {
			handler(event);
			if (!event.defaultPrevented) {
				closeMenu();
			}
		};
	};

	const handleBackButtonClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] =
		(event) => {
			if (isMenuOpen) {
				event.preventDefault();
				closeMenu();
				return;
			}

			backAction.onClick?.(event);
		};

	const dockBackAction = {
		...backAction,
		onClick: handleBackButtonClick,
	};

	const dockHomeAction = {
		...homeAction,
		onClick: createNavigationHandler(homeAction.onClick),
	};

	const closableMenuTiles = menuTiles.map((tile) => ({
		...tile,
		onClick: createNavigationHandler(tile.onClick),
	}));

	const closableTopBanners = topBanners.map((banner) => ({
		...banner,
		onClick: createNavigationHandler(banner.onClick),
	}));

	useEffect(() => {
		const timerId = globalThis.setInterval(() => {
			setClock(formatLocalClock(new Date()));
		}, 1000);

		return () => {
			globalThis.clearInterval(timerId);
		};
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuVisible(true);
			return;
		}

		const timeoutId = globalThis.setTimeout(() => {
			setIsMenuVisible(false);
		}, layoutMenuAnimationDurationMs);

		return () => {
			globalThis.clearTimeout(timeoutId);
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMenuOpen(false);
			}
		};

		globalThis.addEventListener("keydown", handleKeyDown);

		return () => {
			globalThis.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMenuOpen]);

	return (
		<LayoutRoot>
			<LayoutBackground />
			<LayoutScenery aria-hidden="true">
				<div className="absolute inset-0 bg-linear-to-b from-ll-system-left/10 via-ll-white/6 to-ll-orange/18" />
			</LayoutScenery>
			<HomeLayoutHeader
				battery={battery}
				centerContent={centerContent}
				clock={clock}
				hideClock={children != null}
				rightContent={rightContent}
			/>
			{children != null && (
				<div className="absolute inset-x-0 top-[3.05rem] bottom-[var(--ll-home-dock-height)] overflow-auto z-[1] bg-ll-page-bg">
					{children}
				</div>
			)}
			{isMenuVisible ? (
				<LayoutScrim
					aria-label="Close menu"
					className={
						isMenuOpen
							? "animate-[llHomeMenuScrimIn_220ms_ease-out_both]"
							: "animate-[llHomeMenuScrimOut_220ms_ease-out_both]"
					}
					onClick={() => {
						closeMenu();
					}}
				/>
			) : null}
			<HomeLayoutSheet
				bottomContent={sheetBottomContent}
				isMenuOpen={isMenuOpen}
				isMenuVisible={isMenuVisible}
				menuTiles={closableMenuTiles}
				topBanners={closableTopBanners}
			/>
			<HomeLayoutDock
				backAction={dockBackAction}
				homeAction={dockHomeAction}
				isMenuOpen={isMenuOpen}
				onToggleMenu={() => {
					setIsMenuOpen((currentValue) => !currentValue);
				}}
			/>
		</LayoutRoot>
	);
}

export function Layout(props: LayoutProps) {
	if ((props.variant ?? "home") === "home") {
		return <HomeLayout {...props} />;
	}

	return null;
}
