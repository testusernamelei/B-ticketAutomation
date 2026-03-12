import { test, expect } from '@playwright/test';
import { LoginPage } from '../helpers/Login';

test('Status Filter', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  await page.getByRole('link', { name: 'Coupon Management' }).click();

  const selectedStatuses = ['Draft', 'Under Review', 'Scheduled', 'Live', 
    'Expired', 'Pending', 'Rejected', 'Generating Coupon'];

  for (const status of selectedStatuses) {
  console.log(`\n🔍 Testing status: ${status}`);

  // Open filter menu
  const filterButton = page.locator('button:has(svg.lucide-list-filter)');
  await filterButton.click();

  // Modal
  const statusModal = page.locator('div.grid.grid-cols-2.gap-2');
  await expect(statusModal).toBeVisible();


  // STEP 1 — Uncheck ALL checkboxes (to avoid mixing filters)
  
  const allCheckboxes = statusModal.locator('div.flex.items-center button[role="checkbox"]');
  const count = await allCheckboxes.count();

  for (let i = 0; i < count; i++) {
    const cb = allCheckboxes.nth(i);
    const isChecked = await cb.getAttribute("data-state") === "checked";
    if (isChecked) await cb.click(); // uncheck
  }

  // STEP 2 — Check only the correct status
  const statusCheckbox = statusModal.locator('div.flex.items-center', { hasText: status }).locator('button[role="checkbox"]');
  await statusCheckbox.click();

  // STEP 3 — Apply
  await page.getByRole('button', { name: 'Apply Filter' }).click();

  const rows = page.locator('tbody tr');
  await page.waitForTimeout(1500);
  const totalRows = await rows.count();

  // STEP 4 — Validate each row matches the status
  

    if (totalRows === 0) {
    const emptyState = page.getByText(/No coupons available./i);
    await expect(emptyState).toBeVisible();
    console.log(`⚠ No rows found for status: ${status}`);
    continue;

      for (let i = 0; i < totalRows; i++) {
      const statusText = (await rows.nth(i).locator('td').nth(8).innerText()).trim();
      expect(statusText).toBe(status);

      }

    }
  console.log(`✔ Status '${status}' validated`);
}
});