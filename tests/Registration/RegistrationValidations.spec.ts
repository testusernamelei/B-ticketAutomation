import { test, expect, Page } from '@playwright/test';

const testValues = {
  empty: '',
  min: 'A',
  validMin: 'Ab',
  max: 'A'.repeat(256),
  special: "'-",
  letters: 'abc',
  numbers: '12345',
  maxPass: 'P@ssw0rd'.repeat(9),
};

const registrationFields = [
  
  
  { name: 'firstName', label: 'First Name', required: true, min: 2, max: 255, noSpecial: true, noNumbers: false},
  { name: 'lastName', label: 'Last Name' , required: true, min: 2, max: 255, noSpecial: true, noNumbers: false},
  { name: 'email', label: 'Email', max: 255, required: true },
  { name: 'phone_no', label: 'Phone Number ', required: true  },
  { name: 'business_name', label: 'Business Name', max: 255, required: true},
  { name: 'representative_name', label: 'Representative Name', required: true,  max: 255},
  { name: 'city', label: 'City',required: true },
  { name: 'postal_code', label: 'Postal Code', max: 10  },
  { name: 'landmark', label: 'Landmark', required: true,  max: 255 },
  { name: 'storeLocation', label: 'Address',required: true },
  { name: 'Password', label: 'Password', required: true,  max: 64, min: 8, mustUpper: true, mustLower: true,
    mustNumber: true, mustSpecial: true},
  { name: 'Confirm_Password', label: 'Confirm Password', required: true,  max: 64 },

];




test.describe('Registration Validations', () => {
  test.beforeEach(async ({ page }) => {
  await page.goto('https://sit.b-merchant.ph/en');
  await page.getByRole('link', { name: 'Sign Up' }).click();
   });

   for (const field of registrationFields) {
    const currentField = field;

    //Required Fields
    test(`Field "${currentField.label || currentField.name}" - Required validation`, async ({ page }) => {
    await page.getByRole('button', { name: 'Create Account' }).click();
    
    await expect(page.getByText(`${currentField.label || currentField.name} is required`,{ exact: true })).toBeVisible();
  });

    //Max length
    
  }
});


