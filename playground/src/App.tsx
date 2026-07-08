import { Navigate, Route, Routes } from "react-router-dom";
import { CatalogLayout } from "./catalog/CatalogLayout";
import { CATALOG } from "./catalog/registry";

const firstSystemEntry = CATALOG.find((entry) => entry.category === "System");
const homePath = firstSystemEntry?.path ?? "/system";

export function App() {
	return (
		<Routes>
			<Route element={<CatalogLayout />}>
				<Route index element={<Navigate to={homePath} replace />} />
				{CATALOG.map((entry) => (
					<Route key={entry.slug} path={entry.path} element={<entry.Page />} />
				))}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
