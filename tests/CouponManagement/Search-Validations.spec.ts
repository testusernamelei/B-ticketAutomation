import { test, expect } from '@playwright/test';
import { LoginPage } from '../helpers/Login';



test('Search bar', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  await page.getByRole('link', { name: 'Coupon Management' }).click();

  const testSearch = ['Not Existing', 'J@12', '12345', '!@#$%^&', '@12A', 'All day', 'Test automate'];
  const noResult = page.getByText('No Data');
  const rows = page.locator('tbody tr');
  const rowCount = await rows.count();

  for (const search of testSearch) {

    await page.getByRole('textbox', { name: 'Search...' }).click();
    await page.getByRole('textbox', { name: 'Search...' }).fill(search);

    for (let i = 0; i < rowCount; i++) {
        const rowText = await rows.nth(i).innerText();
        expect(rowText).toContain(testSearch);
    }

    if (noResult) {
        await page.getByText('No coupons available.').click(); 
    }
  }
});

