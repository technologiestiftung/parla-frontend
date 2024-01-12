import { test } from "../mock/test";

test("requests document count", async ({ page }) => {
	await page.goto("http://localhost:3000");
	await page.waitForResponse(
		(resp) =>
			resp.url().includes("processed_documents/count") && resp.status() === 200,
	);
});
