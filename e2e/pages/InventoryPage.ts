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
}
