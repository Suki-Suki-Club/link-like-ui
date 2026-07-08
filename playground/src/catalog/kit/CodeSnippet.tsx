export interface CodeSnippetProps {
	code: string;
}

export function CodeSnippet({ code }: CodeSnippetProps) {
	return (
		<pre className="ll-catalog-code-snippet">
			<code>{code}</code>
		</pre>
	);
}
