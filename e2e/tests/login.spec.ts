import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Env } from '../helpers/Env';

test.describe('Login Scenario', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // ログインページから開始
    await loginPage.load(loginPage.url);
  });

  test('Scenario 1: Login', async ({ page }) => {
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    await expect(page).toHaveURL(inventoryPage.url);
    await expect(inventoryPage.headerTitle()).toHaveText('Products');
  });
});
