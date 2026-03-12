import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://sit.b-merchant.ph/en');
    await this.page.getByRole('link', { name: 'Sign In' }).first().click();
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async login() {
    await this.page.getByRole('textbox', { name: 'Email' }).fill('lei@vomoto.com');
    await this.page.getByRole('textbox', { name: 'Password' }).fill('P@ssw0rd');
    await this.page.getByRole('button', { name: 'Sign In' }).click();
   // await this.page.getByRole('button', { name: 'Authorize' }).click();
   console.log(`Successfully Login`);
  }
}