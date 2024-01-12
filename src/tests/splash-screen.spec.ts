import { test, expect } from "@playwright/test";

test("shows info screen", async ({ page }) => {
	await page.goto("http://localhost:3000");
	const dialogElement = await page.waitForSelector('div[role="dialog"]', {
		state: "attached",
	});
	expect(dialogElement).not.toBeNull();
	const isDialogVisible = await dialogElement.isVisible();
	expect(isDialogVisible).toBe(true);

	const cityLabLogo = page.getByRole("link", {
		name: "Logo CityLAB Berlin",
	});
	expect(cityLabLogo).toBeVisible();

	const tsbLogo = page.getByRole("link", {
		name: "Logo der Technologiestiftung Berlin",
	});
	expect(tsbLogo).toBeVisible();

	const majorLogo = page.getByRole("link", {
		name: "Logo des Regierenden Bürgermeisters von Berlin und der Senatskanzlei",
	});
	expect(majorLogo).toBeVisible();

	await page.getByRole("button", { name: "Close" }).click();
	await dialogElement.waitForElementState("hidden");
	const isDialogHidden = !(await dialogElement.isVisible());
	expect(isDialogHidden).toBe(true);
});
