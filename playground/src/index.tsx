import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import "./playground.css";

const app = document.querySelector("#app");

if (!app) {
	throw new Error('Root element "#app" not found.');
}

createRoot(app).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
