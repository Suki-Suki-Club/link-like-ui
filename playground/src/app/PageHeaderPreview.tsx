import { PageHeader, PageHeaderTitle } from "../../../src/System/PageHeader";

export function PageHeaderPreview() {
	return (
		<section className="flex w-full max-w-md flex-col items-center gap-3">
			<h2 className="text-sm font-bold text-ll-gray">PageHeader</h2>
			<PageHeader>
				<PageHeaderTitle>Page Title</PageHeaderTitle>
			</PageHeader>
		</section>
	);
}
