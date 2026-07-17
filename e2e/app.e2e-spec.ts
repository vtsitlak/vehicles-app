import { test, expect } from '@playwright/test';
import { AppPage } from './app.po';

test.describe('Vehicles App', () => {
  let pageObject: AppPage;

  test.beforeEach(async ({ page }) => {
    pageObject = new AppPage(page);
    await pageObject.navigateTo();
  });

  test('should display the app title in the toolbar', async () => {
    await expect.poll(async () => pageObject.getTitleText()).toBe('Vehicles application');
  });

  test('should redirect to /vehicles and show the filter form', async ({ page }) => {
    await expect(page).toHaveURL(/\/vehicles/);
    await expect(pageObject.filterForm()).toBeVisible();
  });

  test('should load and display vehicle items', async () => {
    await pageObject.waitForVehiclesLoaded();
    await expect(pageObject.vehiclesList()).not.toHaveCount(0);
  });
});
