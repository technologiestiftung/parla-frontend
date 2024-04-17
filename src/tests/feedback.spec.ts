import { test } from "@/mock/test";
import { expect } from "@playwright/test";
import { delay } from "msw";

test("feedback", async ({ page }) => {
	// navigate to the home page
	await page.goto("http://localhost:3000/");

	// close the splash screen
	await page.getByRole("button", { name: "Close" }).click();

	// open the first example
	await page.getByTestId("example-prompt-0").click();

	// wait for API call to finish
	await page.waitForResponse(async (resp) => {
		return resp.url().includes("vector-search") && resp.status() === 200;
	});

	// wait for API call to finish
	await page.waitForResponse(async (resp) => {
		return resp.url().includes("generate-answer") && resp.status() === 200;
	});

	// thumbs-up-icon (outline) should be visible
	await expect(page.getByTestId("thumbs-up-icon")).toBeVisible();
	// thumbs down (outline) icon should be visible
	await expect(page.getByTestId("thumbs-down-icon")).toBeVisible();

	// click on thumb up button
	await page
		.locator("div")
		.filter({ hasText: /^War diese Zusammenfassung hilfreich\?$/ })
		.getByRole("button")
		.first()
		.click();

	// click on thumb up button should replace the icon with a solid one
	await expect(page.getByTestId("thumbs-up-icon")).not.toBeVisible();
	await expect(page.getByTestId("thumbs-up-solid-icon")).toBeVisible();

	// click on thumb up button also show a "thank you" message which should disappear after 2 seconds
	await expect(page.getByText("Danke für Ihr Feedback!")).toBeVisible();
	await delay(2000);
	await expect(page.getByText("Danke für Ihr Feedback!")).not.toBeVisible();

	// click on thumb down button
	await page
		.locator("div")
		.filter({ hasText: /^War diese Zusammenfassung hilfreich\?$/ })
		.getByRole("button")
		.nth(1)
		.click();

	// click on thumb down button should replace the thumb down icon with a solid one,
	// and replace the thumb up icon with the outline one
	await expect(page.getByTestId("thumbs-down-icon")).not.toBeVisible();
	await expect(page.getByTestId("thumbs-down-solid-icon")).toBeVisible();
	await expect(page.getByTestId("thumbs-up-icon")).toBeVisible();
	await expect(page.getByTestId("thumbs-up-solid-icon")).not.toBeVisible();

	// click on thumb down button should show a list of feedback options
	await expect(page.getByText("Antwort inhaltlich falsch")).toBeVisible();
	await expect(page.getByText("Es gab einen Fehler")).toBeVisible();
	await expect(page.getByText("Antwort nicht ausführlich")).toBeVisible();
	await expect(page.getByText("Dokumente unpassend")).toBeVisible();

	// click on an option should show a "thank you" message after 1 second,
	// which should disappear after 2 seconds
	await page.getByText("Antwort inhaltlich falsch").click();
	await delay(1000);
	await expect(page.getByText("Danke für Ihr Feedback!")).toBeVisible();
	await delay(2000);
	await expect(page.getByText("Danke für Ihr Feedback!")).not.toBeVisible();

	// now, if we click on the thumb up button again,
	// the outline thumb up icon should be replaced with a solid one,
	// and the solid thumb down icon back with the outline one
	await page
		.locator("div")
		.filter({ hasText: /^War diese Zusammenfassung hilfreich\?$/ })
		.getByRole("button")
		.first()
		.click();

	await expect(page.getByTestId("thumbs-up-icon")).not.toBeVisible();
	await expect(page.getByTestId("thumbs-up-solid-icon")).toBeVisible();
});
