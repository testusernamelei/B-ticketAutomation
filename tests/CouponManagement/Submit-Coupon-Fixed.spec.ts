import { test, expect } from '@playwright/test';
import { LoginPage } from '../helpers/Login';
import path from 'path';

test('Submit_Coupon_Free', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  const filePath = path.resolve(__dirname, '../assets/27e3e92a-a674-4206-81e2-658d56b64fc1.jpg'); //file path
  await page.getByRole('link', { name: 'Coupon Management' }).click();
  await page.getByRole('button', { name: 'Create Coupon' }).click();
  await page.getByRole('textbox', { name: 'Coupon Name*' }).click();
  await page.getByRole('textbox', { name: 'Coupon Name*' }).fill('Delete automate'); //coupon name
  await page.locator('.w-5.h-5.rounded-full.border-2').first().click();
  await page.locator('input[name="max_uses_per_coupon"]').click();
  await page.locator('input[name="max_uses_per_coupon"]').fill('5');

  await page.getByRole('button', { name: 'Upload File' }).click();
  await page.locator('input[type="file"]').setInputFiles(filePath);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('label:nth-child(2) > .relative > .w-5 > .w-2').first().click();
  await page.locator('input[name="validity_days"]').click();
  await page.locator('input[name="validity_days"]').fill('1');
  await page.getByRole('combobox').filter({ hasText: 'Buy X Get Y' }).click();
  await page.getByLabel('Fixed Amount').getByText('Fixed Amount').click();

  await page.locator('input[name="discount_value"]').click();
  await page.locator('input[name="discount_value"]').fill('50');
  await page.getByRole('button', { name: 'Select' }).click();
 
// 1. Define the locator for the "No content" message
const noContentMessage = page.getByText('No content available.');
// 2. Get all category buttons dynamically
const categoryButtons = page.locator('button').filter({ has: page.locator('text=/Kakanin|New Menu|Pastries|Rice Meal|Sinabawan|TEST|Menthol/') });
// 3. Get the count of category buttons
const buttonCount = await page.locator('button.w-full.py-5.px-4').count();
// 4. Loop dynamically through each category
let hasContent = false;
for (let i = 0; i < buttonCount && !hasContent; i++) {
  const button = page.locator('button.w-full.py-5.px-4').nth(i);
  const categoryName = await button.textContent();
  
  // Click the category button
  await button.click();
  await page.waitForTimeout(500);
  
  // Check if the category has content
  if (await noContentMessage.isVisible()) {
    console.log(`${categoryName} is empty. Proceeding to next category...`);
    continue;
  } else {
    console.log(`Content found in ${categoryName}. Proceeding with selection...`);
    // 5. Proceed with selection if content exists
    await page.locator('.absolute.top-1 button').click();
    await page.getByRole('button', { name: 'Apply on selection' }).click();
    await page.getByText('service selected');
    hasContent = true;
  }
}



  await page.getByRole('checkbox').nth(1).click();
  await page.locator('input[name="min_spend"]').click();
  await page.locator('input[name="min_spend"]').fill('100');
  await page.getByTitle('Add another day').click();
  await page.getByRole('combobox').filter({ hasText: 'Select Day' }).click();
  await page.getByLabel('Tuesday').getByText('Tuesday').click();
  await page.getByRole('button', { name: '+' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Enter additional detail...' }).click();
  await page.getByRole('textbox', { name: 'Enter additional detail...' }).fill('test');
  await page.getByRole('button', { name: 'Submit Coupon' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Back to list' }).click();
  await page.waitForSelector('tbody');

  //Validation if draft coupon is successfully on the table list
  const row = page.locator('tbody tr', { hasText: 'Delete automate' });
  await expect(row.locator('td').nth(8)).toHaveText('Pending');
});


