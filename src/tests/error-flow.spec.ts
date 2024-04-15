import { test, testWithErrors } from "../mock/test";
import { expect } from "@playwright/test";
import { delay } from "msw";

testWithErrors("error flow when all API calls fail", async ({ page }) => {
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

test("error flow when vector-search API call succeeds but generate-answer API call fails", async ({
	page,
}) => {
	await page.goto("http://localhost:3000/");
	await page.getByRole("button", { name: "Close" }).click();

	// Mock the generate-answer API call to fail
	await page.route("http://localhost:8080/generate-answer", async (route) => {
		await delay(2000);
		await route.fulfill({ status: 500 });
	});

	// Click on the first example
	await page.getByTestId("example-prompt-0").click();

	// Should show loading skeletons
	await expect(page.getByTestId("documents-loading-skeleton")).toBeVisible();
	await expect(page.getByTestId("answer-loading-skeleton")).toBeVisible();

	// Wait for the API call to finish
	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 200;
	});

	// Wait for the API call to finish
	await page.waitForResponse(async (resp) => {
		return resp.url().includes("generate-answer") && resp.status() === 500;
	});

	// Should show error alert + found documents
	await expect(page.getByTestId("error-alert")).toBeVisible();
	await expect(page.getByTestId("document-references")).toBeVisible();

	// Remove mocked generate-answer API call
	await page.unroute("http://localhost:8080/generate-answer");

	// Retry to generate the answer
	await page.getByTestId("reload-icon").click();

	// Should hide error alert and reload icon
	await expect(page.getByTestId("error-alert")).toBeHidden();
	await expect(page.getByTestId("reload-icon")).toBeHidden();

	// Wait for the API call to finish
	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 200;
	});

	// Wait for the API call to finish
	await page.waitForResponse(async (resp) => {
		return resp.url().includes("generate-answer") && resp.status() === 200;
	});

	// Should show the generated answer
	await expect(page.getByTestId("generated-answer")).toBeVisible();
});
