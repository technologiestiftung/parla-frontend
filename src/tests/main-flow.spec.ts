import { test } from "../mock/test";
import { expect } from "@playwright/test";

test("main flow", async ({ page }) => {
	await page.goto("http://localhost:3000");

	// wait for initial request
	await page.waitForResponse(
		(resp) =>
			resp.url().includes("processed_documents/count") && resp.status() === 200,
	);
	const dialogElement = await page.waitForSelector('div[role="dialog"]', {
		state: "attached",
	});

	// wait for and close dialog
	expect(dialogElement).not.toBeNull();
	const isDialogVisible = await dialogElement.isVisible();
	expect(isDialogVisible).toBe(true);
	await page.getByRole("button", { name: "Close" }).click();
	await dialogElement.waitForElementState("hidden");
	const isDialogHidden = !(await dialogElement.isVisible());
	expect(isDialogHidden).toBe(true);

	await page.locator('[data-test-id="example-prompt-0"]').click();

	await expect(
		page.locator('[data-test-id="documents-loading-skeleton"]'),
	).toBeVisible();

	await expect(
		page.locator('[data-test-id="answer-loading-skeleton"]'),
	).toBeVisible();

	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 200;
	});

	await expect(
		page.locator('[data-test-id="documents-loading-skeleton"]'),
	).toBeHidden();

	await expect(
		page.locator('[data-test-id="answer-loading-skeleton"]'),
	).toBeVisible();

	await expect(
		page.locator('[data-test-id="document-references"]'),
	).toBeVisible();

	await page.waitForResponse(async (resp) => {
		return resp.url().includes("generate-answer") && resp.status() === 200;
	});

	await expect(
		page.locator('[data-test-id="answer-loading-skeleton"]'),
	).toBeHidden();

	await expect(page.locator('[data-test-id="generated-answer"]')).toBeVisible();

	await expect(
		page.locator('[data-test-id="generated-answer-disclaimer"]'),
	).toBeVisible();
});
