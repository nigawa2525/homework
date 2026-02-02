import { BasePage } from './BasePage';
import { Env } from '../helpers/Env';

export class InventoryPage extends BasePage {
  readonly url = `${Env.BASE_URL}/inventory.html`;

  readonly headerTitle = () => this.page.locator('.header_secondary_container .title');
  readonly menuButton = () => this.page.getByRole('button', { name: 'Open Menu' });
  readonly logoutLink = () => this.page.getByRole('link', { name: 'Logout' });
  readonly cartLink = () => this.page.locator('.shopping_cart_link');
  
  // 商品追加ボタン（テキストベースで特定）
  readonly addToCartButton = (productName: string) => 
    this.page.locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' });

  readonly sortSelect = () => this.page.locator('[data-test="product-sort-container"]');
  readonly inventoryItemName = () => this.page.locator('.inventory_item_name');
  readonly inventoryItemPrice = () => this.page.locator('.inventory_item_price');

  async logout() {
    await this.menuButton().click();
    await this.logoutLink().click();
  }

  async addProductToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  async goToCart() {
    await this.cartLink().click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect().selectOption(option);
    await this.waitForAjax();
  }

  async getProductNames(): Promise<string[]> {
    return await this.inventoryItemName().allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.inventoryItemPrice().allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}
