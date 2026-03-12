import { test, expect } from '@playwright/test';

interface LoginTestData {
  email: string;
  password: string;
  expectedEmail?: string;
  expectedPassword?: string;
}

test('Email Validations', async ({ page }) => {
  await page.goto('https://sit.b-merchant.ph/en');
  await page.getByRole('link', { name: 'Sign In' }).first().click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  const testData: LoginTestData[] = [ 
    { email: '', password: '', expectedEmail: 'Email is required', expectedPassword: 'Password is required'}, 
    { email: '', password: 'P@ssw0rd', expectedEmail: 'Email is required'}, 
    { email: 'lei@vomoto.com', password: '', expectedPassword: 'Password is required'}, 
    { email: 'lea@vomoto.com', password: 'P$4!jbfkdhfdbfd', expectedEmail: 'These credentials do not match our records.'}, 
    { email: 'lea@vomoto.com', password: 'P@ssw0rd', expectedEmail: 'These credentials do not match our records.'}, 
    { email: 'lei@vomoto.com', password: 'Pas$w0rd', expectedEmail: 'These credentials do not match our records.'}, 
    { email: 'lei@.com', password: 'P@ssw0rd', expectedEmail: 'Please enter a valid email address'},
    { email: 'lei', password: 'P@ssw0rd', expectedEmail: 'Please enter a valid email address'}, 
    { email: 'lei!vomoto.com', password: 'P@ssw0rd', expectedEmail: 'Please enter a valid email address'}, 
    { email: 'lei@vomoto.com', password: 'P@ssw0rd'}, 
  ];

  for (const { email, password, expectedEmail, expectedPassword } of testData) {
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    if (expectedEmail) {
      await expect(page.locator('#email-error')).toContainText(expectedEmail);
    }

    if (expectedPassword) {
      await expect(page.locator('#password-error')).toContainText(expectedPassword);
    }
  }
  await page.goto('https://sit.b-merchant.ph/en/dashboard');
  await expect(page.getByRole('main')).toContainText('Welcome to your Dashboard');
});
