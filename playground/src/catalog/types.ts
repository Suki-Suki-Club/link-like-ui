import type { ComponentType } from "react";

export type CatalogCategory = "System" | "Layout" | "Data" | "Icons";

export type CatalogEntry = {
	/** URL path segment, unique, kebab-case, e.g. "button" or "members" */
	slug: string;
	/** full route path, e.g. "/system/button" */
	path: string;
	/** sidebar label and page <h1>, e.g. "Button" */
	title: string;
	category: CatalogCategory;
	/** the page component to render for this route */
	Page: ComponentType;
};
