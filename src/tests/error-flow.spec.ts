import { testWithErrors } from "../mock/test";
import { expect } from "@playwright/test";

testWithErrors("error flow", async ({ page }) => {
	await page.goto("http://localhost:3000");

	await page.waitForResponse(
		(resp) =>
			resp.url().includes("processed_documents/count") && resp.status() === 200,
	);
	const dialogElement = await page.waitForSelector('div[role="dialog"]', {
		state: "attached",
	});

	expect(dialogElement).not.toBeNull();
	const isDialogVisible = await dialogElement.isVisible();
	expect(isDialogVisible).toBe(true);
	await page.getByRole("button", { name: "Close" }).click();
	await dialogElement.waitForElementState("hidden");
	const isDialogHidden = !(await dialogElement.isVisible());
	expect(isDialogHidden).toBe(true);

	await page.getByTestId("prompt-textarea").click();
	await page
		.locator('[data-testid="prompt-textarea"]')
		.fill("Was macht das CityLab Berlin?");
	await page.locator("[type=submit]").click();

	await expect(page.getByTestId("documents-loading-skeleton")).toBeVisible();

	await expect(page.getByTestId("answer-loading-skeleton")).toBeVisible();

	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 500;
	});

	await expect(page.getByTestId("error-alert")).toBeVisible();
	await expect(page.getByTestId("reload-icon")).toBeVisible();

	await page.getByTestId("reload-icon").click();

	await expect(page.getByTestId("error-alert")).toBeHidden();
	await expect(page.getByTestId("reload-icon")).toBeHidden();

	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 500;
	});

	await expect(page.getByTestId("error-alert")).toBeVisible();
	await expect(page.getByTestId("reload-icon")).toBeVisible();
});
