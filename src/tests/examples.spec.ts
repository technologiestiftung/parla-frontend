import { expect } from "@playwright/test";
import { test } from "../mock/test";

test("three examples should be available", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByRole("button", { name: "Close" }).click();

	const exampleHeader = page.getByRole("heading", { name: "Beispiele" });
	expect(exampleHeader).toBeVisible();

	const countElementsWithPrefix = async (prefix: string) => {
		const elementCount = await page.evaluate((prefix) => {
			const elements = document.querySelectorAll(`[data-testid^='${prefix}']`);
			return elements.length;
		}, prefix);

		return elementCount;
	};

	const prefixToCount = "example-prompt-";
	const elementCount = await countElementsWithPrefix(prefixToCount);
	expect(elementCount).toBe(3);
});
