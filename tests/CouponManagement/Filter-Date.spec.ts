import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../helpers/Login';
import { FilterDate } from '../helpers/Date-Filter';

async function pickDate(page: Page, date: Date) {
    
  const day = date.getDate();
  const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' }); // e.g., "December 2025"


  const dateDialog = page.locator('div[role="dialog"]');
  await expect(dateDialog).toBeVisible({ timeout: 5000 });

  // Pick the correct day within the visible month
  const startDateButton = dateDialog.locator(`button[role="gridcell"]:has-text("${day}")`).first();
  await expect(startDateButton).toBeVisible({ timeout: 5000 });
  const endDateButton = dateDialog.locator(`button[role="gridcell"]:has-text("${day}")`).first();
  await expect(endDateButton).toBeVisible({ timeout: 5000 });
// await dayButton.click();
}

function normalize(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


test('Date Filter', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  await page.getByRole('link', { name: 'Coupon Management' }).click();
  
  const filterDate = new FilterDate(page);

  const dateFilters = [
    {
      name: "Today",
      start: filterDate.getDate(0),
      end: filterDate.getDate(0),
    },
    {
      name: "Yesterday",
      start: filterDate.getDate(-1),
      end: filterDate.getDate(-1),
    },
    {
      name: "Last 7 Days",
      start: filterDate.getDate(-7),
      end: filterDate.getDate(0),
    },
    {
      name: "Last 30 Days",
      start: filterDate.getDate(-30),
      end: filterDate.getDate(0),
    },
    {
      name: "Custom Range",
      start: filterDate.getDate(-15),
      end: filterDate.getDate(-5),
    }
  ];

  console.log(dateFilters);

   for (const filter of dateFilters) {
  console.log(`\n🗓 Testing date filter: ${filter.name}`);

  // Open date picker
  await page.locator('#date').click();
  await pickDate(page, filter.start);
  await page.locator('#date').click();
    await pickDate(page, filter.end);

    // Wait for table to auto-refresh
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();

    if (rowCount === 0) {
      console.log(`⚠ No data found for range: ${filter.start.toDateString()} - ${filter.end.toDateString()}`);
      continue;
    }

    // Validate each row's date
    for (let i = 0; i < rowCount; i++) {
      const dateText = (await rows.nth(i).locator('td').nth(3).nth(4).innerText()).trim();
      const rowDate = new Date(dateText);

      const startNorm = normalize(filter.start);
      const endNorm = normalize(filter.end);
      const rowNorm = normalize(rowDate);

      expect(rowNorm >= startNorm && rowNorm <= endNorm).toBeTruthy();
    }

    console.log(`✔ Successfully validated: ${filter.name}`);
  }
});
