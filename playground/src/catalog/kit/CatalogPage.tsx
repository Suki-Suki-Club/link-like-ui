import type { ReactNode } from "react";

export interface CatalogPageProps {
	title: string;
	description: string;
	children: ReactNode;
}

export function CatalogPage({
	title,
	description,
	children,
}: CatalogPageProps) {
	return (
		<div className="ll-catalog-page">
			<h1 className="ll-catalog-page-title">{title}</h1>
			<p className="ll-catalog-page-description">{description}</p>
			<div className="ll-catalog-page-content">{children}</div>
		</div>
	);
}
