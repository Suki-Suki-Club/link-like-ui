import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function CatalogLayout() {
	return (
		<div className="ll-catalog-layout">
			<Sidebar />
			<main className="ll-catalog-main">
				<Outlet />
			</main>
		</div>
	);
}
