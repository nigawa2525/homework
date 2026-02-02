import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Env } from '../helpers/Env';

test.describe('ログアウトシナリオ', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // 準備: ログイン済みの状態で商品一覧ページから開始
    await loginPage.load(loginPage.url);
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
  });

  test('シナリオ 3: ログアウト', async ({ page }) => {
    // ログアウト実行
    await inventoryPage.logout();
    
    // ログインページへのリダイレクトを確認
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginButton()).toBeVisible();
  });
});
