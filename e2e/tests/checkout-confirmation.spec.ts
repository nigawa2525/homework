import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Env } from '../helpers/Env';

test.describe('チェックアウト完了メッセージ', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.load(loginPage.url);
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
  });

  test('注文完了時に完了メッセージが表示される', async ({ page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '123-4567');
    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(checkoutPage.urlComplete);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Complete!');
    // 完了メッセージの検証
    await expect(checkoutPage.completeHeader()).toHaveText('Thank you for your order!!');
  });
});
