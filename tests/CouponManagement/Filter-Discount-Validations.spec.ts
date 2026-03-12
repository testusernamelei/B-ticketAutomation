import { test, expect } from '@playwright/test';
import { LoginPage } from '../helpers/Login';

test('Discount Type Filter', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  await page.getByRole('link', { name: 'Coupon Management' }).click();

  const selectedDiscount = ['Buy X Get Y', 'Percentage', 'Fixed Amount'];

  for (const discount of selectedDiscount) {
  console.log(`\n🔍 Testing discount type: ${discount}`);

  // Open filter menu
  const filterButton = page.locator('button:has(svg.lucide-list-filter)');
  await filterButton.click();

  // Modal
  const discountModal = page.locator('div.grid.grid-cols-1.gap-2');
  await expect(discountModal).toBeVisible();


  // STEP 1 — Uncheck ALL checkboxes (to avoid mixing filters)
  
  const allCheckboxes = discountModal.locator('div.flex.items-center >> button[role="checkbox"]');
  const count = await allCheckboxes.count();

  for (let i = 0; i < count; i++) {
    const cb = allCheckboxes.nth(i);
    const isChecked = await cb.getAttribute("data-state") === "checked";
    if (isChecked) await cb.click(); // uncheck
  }

  // STEP 2 — Check only the correct discount type
  const discountCheckbox = discountModal.locator(`div.flex.items-center:has-text("${discount}") >> button[role="checkbox"]`);
  await discountCheckbox.click({ force: true });
  // STEP 3 — Apply
  await page.getByRole('button', { name: 'Apply Filter' }).click();

  const rows = page.locator('tbody tr');
  await page.waitForTimeout(1500);
  const totalRows = await rows.count();

  // STEP 4 — Validate each row matches the discount type
  

    if (totalRows === 0) {
    const emptyState = page.getByText(/No coupons available./i);
    await expect(emptyState).toBeVisible();
    console.log(`⚠ No rows found for status: ${discount}`);
    continue;

      for (let i = 0; i < totalRows; i++) {
      const statusText = (await rows.nth(i).locator('td').nth(1).innerText()).trim();
      expect(statusText).toBe(discount);

      }

    }
  console.log(`✔ Status '${discount}' validated`);
}
});