import { Page, expect } from '@playwright/test';

export class AppPage {
  constructor(private readonly page: Page) {}

  async navigateTo(): Promise<void> {
    await this.page.goto('/');
  }

  async getTitleText(): Promise<string> {
    return (await this.page.locator('app-root mat-toolbar .title').textContent())?.trim() ?? '';
  }

  vehiclesList() {
    return this.page.locator('.vehicles-list app-vehicle-item');
  }

  filterForm() {
    return this.page.locator('app-filter-form');
  }

  async waitForVehiclesLoaded(): Promise<void> {
    await expect(this.page.locator('mat-spinner')).toHaveCount(0, { timeout: 15_000 });
    await expect(this.vehiclesList().first()).toBeVisible({ timeout: 15_000 });
  }
}
