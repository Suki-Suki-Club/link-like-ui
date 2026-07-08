import type { ReactNode } from "react";
import { CodeSnippet } from "./CodeSnippet";

export interface VariantBlockProps {
	label: string;
	code: string;
	children: ReactNode;
}

export function VariantBlock({ label, code, children }: VariantBlockProps) {
	return (
		<section className="ll-catalog-card">
			<h3 className="ll-catalog-block-title">{label}</h3>
			<div className="ll-catalog-preview-surface">{children}</div>
			<CodeSnippet code={code} />
		</section>
	);
}
