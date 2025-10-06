import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/lab/checklist');

    await expect(page.getByTestId("title")).toHaveText("Progress Checklist");
});

test('checkbox item', async ({page}) => {
    await page.goto('http://localhost:5173/lab/checklist');

    let counterAmount:number = Number(await page.getByTestId("counter").innerText());

    await page.waitForTimeout(500)

    await page.getByTestId("checkboxItem").check();
    await expect(page.getByTestId("checkboxItem")).toBeChecked();

    let expectedAmount:number = counterAmount + 1;
    await expect(page.getByTestId("counter")).toHaveText(expectedAmount.toString());
})