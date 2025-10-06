import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/lab/checklist');

    await expect(page.getByTestId("title")).toHaveText("Progress Checklist");
});

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

test('progress submission change', async ({page}) => {
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

    await page.waitForTimeout(500);

    await page.getByTestId("checklistItem-1").uncheck();
    await expect(page.getByTestId("checklistItem-1")).not.toBeChecked();

    await page.getByTestId("checklistItem-2").check();
    await expect(page.getByTestId("checklistItem-2")).toBeChecked();

    await page.getByTestId("checklistItem-3").check();
    await expect(page.getByTestId("checklistItem-3")).toBeChecked();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("2/5 (40%)");

    await page.getByTestId("submit").click();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("3/5 (60%)");

    await page.getByTestId("checklistItem-0").check();
    await expect(page.getByTestId("checklistItem-0")).toBeChecked();

    await page.getByTestId("checklistItem-1").check();
    await expect(page.getByTestId("checklistItem-1")).toBeChecked();

    await expect(page.getByTestId("progress")).toHaveText("3/5 (60%)");

    await page.getByTestId("submit").click();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("5/5 (100%)");

    await page.waitForTimeout(500);

    await page.getByTestId("checklistItem-0").uncheck();
    await expect(page.getByTestId("checklistItem-0")).not.toBeChecked();

    await page.getByTestId("checklistItem-1").uncheck();
    await expect(page.getByTestId("checklistItem-1")).not.toBeChecked();

    await page.getByTestId("checklistItem-2").uncheck();
    await expect(page.getByTestId("checklistItem-2")).not.toBeChecked();

    await page.getByTestId("checklistItem-3").uncheck();
    await expect(page.getByTestId("checklistItem-3")).not.toBeChecked();

    await page.getByTestId("checklistItem-4").uncheck();
    await expect(page.getByTestId("checklistItem-4")).not.toBeChecked();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("5/5 (100%)");

    await page.getByTestId("submit").click();

    await page.waitForTimeout(500);

    await expect(page.getByTestId("progress")).toHaveText("0/5 (0%)");

})