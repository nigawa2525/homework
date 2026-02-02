import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Env } from '../helpers/Env';
import { SUCCESS_MESSAGES } from '../constants/Messages';

test.describe('商品購入シナリオ', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // 準備: ログイン済みの状態で商品一覧ページから開始
    await loginPage.load(loginPage.url);
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
  });

  test('シナリオ 2: 商品購入フロー', async ({ page }) => {
    // 商品をカートに追加
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.goToCart();
    
    // カートページ
    await expect(page).toHaveURL(cartPage.url);
    await expect(cartPage.headerTitle()).toHaveText('Your Cart');
    await cartPage.proceedToCheckout();
    
    // チェックアウト情報入力
    await expect(page).toHaveURL(checkoutPage.urlStepOne);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Your Information');
    await checkoutPage.fillInformation('John', 'Doe', '123-4567');
    
    // チェックアウト確認
    await expect(page).toHaveURL(checkoutPage.urlStepTwo);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Overview');
    await checkoutPage.finishCheckout();
    
    // チェックアウト完了
    await expect(page).toHaveURL(checkoutPage.urlComplete);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader()).toHaveText(SUCCESS_MESSAGES.CHECKOUT_COMPLETE);
  });

  test('シナリオ 5: 3つの商品を購入し合計金額を確認する', async ({ page }) => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];

    // 3つの商品をカートに追加
    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }
    await inventoryPage.goToCart();
    
    // カートページ
    await expect(page).toHaveURL(cartPage.url);
    await cartPage.proceedToCheckout();
    
    // チェックアウト情報入力
    await checkoutPage.fillInformation('John', 'Doe', '123-4567');
    
    // チェックアウト確認画面で合計金額を確認
    await expect(page).toHaveURL(checkoutPage.urlStepTwo);
    const totalPrice = await checkoutPage.getTotalPrice();
    
    // 合計金額が0より大きいことを確認
    expect(totalPrice).toBeGreaterThan(0);
    
    // 注文完了
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(checkoutPage.urlComplete);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader()).toHaveText(SUCCESS_MESSAGES.CHECKOUT_COMPLETE);
  });
});
