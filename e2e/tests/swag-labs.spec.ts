import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Env } from '../helpers/Env';
import { SUCCESS_MESSAGES } from '../constants/Messages';

test.describe('Swag Labs E2E Scenarios', () => {
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
  });

  test('Scenario 1: Login', async ({ page }) => {
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    await inventoryPage.waitForAjax();
    await expect(page).toHaveURL(inventoryPage.url);
    await expect(inventoryPage.headerTitle()).toHaveText('Products');
  });

  test('Scenario 2: Purchase Product', async ({ page }) => {
    // Login
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    await inventoryPage.waitForAjax();
    
    // Add product to cart
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.goToCart();
    await cartPage.waitForAjax();
    
    // Cart page
    await expect(page).toHaveURL(cartPage.url);
    await expect(cartPage.headerTitle()).toHaveText('Your Cart');
    await cartPage.proceedToCheckout();
    await checkoutPage.waitForAjax();
    
    // Checkout step one
    await expect(page).toHaveURL(checkoutPage.urlStepOne);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Your Information');
    await checkoutPage.fillInformation('John', 'Doe', '123-4567');
    await checkoutPage.waitForAjax();
    
    // Checkout step two
    await expect(page).toHaveURL(checkoutPage.urlStepTwo);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Overview');
    await checkoutPage.finishCheckout();
    await checkoutPage.waitForAjax();
    
    // Checkout complete
    await expect(page).toHaveURL(checkoutPage.urlComplete);
    await expect(checkoutPage.headerTitle()).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader()).toHaveText(SUCCESS_MESSAGES.CHECKOUT_COMPLETE);
  });

  test('Scenario 3: Logout', async ({ page }) => {
    // Login
    await loginPage.login(Env.STANDARD_USER, Env.PASSWORD);
    await inventoryPage.waitForAjax();
    
    // Logout
    await inventoryPage.logout();
    await loginPage.waitForAjax();
    
    // Verify redirection to login page
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginButton()).toBeVisible();
  });
});
