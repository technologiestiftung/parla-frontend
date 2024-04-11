import { test } from "@/mock/test";
import { expect } from "@playwright/test";

test("copy answer", async ({ page, browserName }) => {
	test.skip(
		browserName === "webkit",
		`This test fails in safari due to safari's security measures regarding clipboard interactions.
		Related github issue: https://github.com/microsoft/playwright/issues/13037`,
	);

	await page.goto("http://localhost:3000/");
	await page.getByRole("button", { name: "Close" }).click();
	await page.getByTestId("example-prompt-0").click();

	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 200;
	});

	await page.waitForResponse(async (resp) => {
		return resp.url().includes("generate-answer") && resp.status() === 200;
	});

	// Before clicking, only clipboard icon should be visible
	await expect(page.getByTestId("clipboard-icon")).toBeVisible();
	await expect(page.getByTestId("check-icon")).not.toBeVisible();

	await page.getByTestId("copy-answer-to-clipboard").click();

	// After clicking, only check icon should be visible
	await expect(page.getByTestId("clipboard-icon")).not.toBeVisible();
	await expect(page.getByTestId("check-icon")).toBeVisible();

	await new Promise((resolve) => setTimeout(resolve, 2000));

	// After 2 seconds, only clipboard icon should be visible again
	await expect(page.getByTestId("clipboard-icon")).toBeVisible();
	await expect(page.getByTestId("check-icon")).not.toBeVisible();

	const clipboard = await page.evaluate(() => navigator.clipboard.readText());
	expect(clipboard).toStrictEqual(
		"This is a AI-generate answer which is always correct.",
	);
});
