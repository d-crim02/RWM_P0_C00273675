import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/lab/checklist');

    await expect(page.getByTestId("title")).toHaveText("Progress Checklist");
});

test('checkbox item', async ({page}) => {
    await page.goto('http://localhost:5173/lab/checklist');

    let counterAmount:number = Number(await page.getByTestId("counter").innerText());

    await page.waitForTimeout(500);

    await page.getByTestId("checklistItem-0").check();
    await expect(page.getByTestId("checklistItem-0")).toBeChecked();

    let expectedAmount:number = counterAmount + 1;
    await expect(page.getByTestId("counter")).toHaveText(expectedAmount.toString());
})

test('progress submission', async ({page}) => {
    await page.goto('http://localhost:5173/lab/checklist');

    await expect(page.getByTestId("progress")).toHaveText("0/5 (0%)");

    await page.waitForTimeout(500);

    await page.getByTestId("checklistItem-1").check();
    await expect(page.getByTestId("checklistItem-1")).toBeChecked();

    await page.getByTestId("checklistItem-4").check();
    await expect(page.getByTestId("checklistItem-4")).toBeChecked();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("0/5 (0%)");

    await page.getByTestId("submit").click();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("2/5 (40%)");
})