import { expect } from "@playwright/test";
import { test } from "../mock/test";

test("has title", async ({ page }) => {
	await page.goto("http://localhost:3000");
	await expect(page).toHaveTitle("Parla");
});
