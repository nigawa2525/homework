import { BasePage } from './BasePage';
import { Env } from '../helpers/Env';

export class CartPage extends BasePage {
  readonly url = `${Env.BASE_URL}/cart.html`;

  readonly headerTitle = () => this.page.locator('.header_secondary_container .title');
  readonly checkoutButton = () => this.page.getByRole('button', { name: 'Checkout' });

  async proceedToCheckout() {
    await this.checkoutButton().click();
  }
}
