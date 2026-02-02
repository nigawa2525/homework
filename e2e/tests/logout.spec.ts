import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Env } from '../helpers/Env';

test.describe('Logout Scenario', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // ログイン済みの状態で商品一覧ページから開始
    await loginPage.load(loginPage.url);
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
  });

  test('Scenario 3: Logout', async ({ page }) => {
    // Logout
    await inventoryPage.logout();
    
    // Verify redirection to login page
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginButton()).toBeVisible();
  });
});
