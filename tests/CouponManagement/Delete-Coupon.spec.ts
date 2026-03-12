import { test, expect } from '@playwright/test';
import { LoginPage } from '../helpers/Login';

test('Delete Coupon', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  await page.getByRole('link', { name: 'Coupon Management' }).click();

  const statuses = ["Draft", "Under Review", "Scheduled", "Expired", "Pending", "Rejected"];

    for (const status of statuses) {
        // Get the first row
        const firstRow = page.locator('table tbody tr').first();
        const rows = page.locator("table tbody tr");
        const statusText = (await firstRow.locator('td').nth(8).innerText()).trim();

        // Compare with your status
        if (statusText === status) {
        // The first row matches the status
        await page.getByRole('button', { name: 'Translation.label_open_menu' }).first().click();
        await page.getByRole('menuitem', { name: 'Delete' }).click();
        await page.getByRole('textbox').press('CapsLock');
        await page.getByRole('textbox').fill('D-E-L-E-T-E');
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByText('Success', { exact: true }).click();
        console.log(`🗑 Delete feature is available for status: ${status}`);
        } else if(statusText  === 'Live') {
        console.log(`❌ The Live status cannot be deleted `);
            return;
        } else{
            console.log(`Testing Passed`);
            return;
        }
    }
});