import { defineConfig } from "cypress";

export default defineConfig({
	projectId: "wvdh9h",
	chromeWebSecurity: false,
	e2e: {
		baseUrl: "http://localhost:5173/",
		testIsolation: false,
		viewportHeight: 768,
		viewportWidth: 1366,
	},
});
