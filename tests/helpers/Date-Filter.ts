import { Page } from '@playwright/test';

export class FilterDate {
  constructor(private page: Page) {}

  getDate(offsetDays: number = 0): Date {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d;
  }

  formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }
  
}

