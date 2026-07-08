import { GENERATIONS } from "../../../../src/Data/Generations";
import { CatalogPage } from "../kit/CatalogPage";

export function GenerationsCatalog() {
	return (
		<CatalogPage
			title="Generations"
			description="The four generations (期) as { id, label }."
		>
			<div className="ll-catalog-generation-grid">
				{GENERATIONS.map((generation) => (
					<div key={generation.id} className="ll-catalog-generation-card">
						<p className="ll-catalog-generation-label">{generation.label}</p>
						<p className="ll-catalog-generation-id">id: {generation.id}</p>
					</div>
				))}
			</div>
		</CatalogPage>
	);
}
