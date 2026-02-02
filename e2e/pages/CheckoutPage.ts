import { BasePage } from './BasePage';
import { Env } from '../helpers/Env';

export class CheckoutPage extends BasePage {
  readonly urlStepOne = `${Env.BASE_URL}/checkout-step-one.html`;
  readonly urlStepTwo = `${Env.BASE_URL}/checkout-step-two.html`;
  readonly urlComplete = `${Env.BASE_URL}/checkout-complete.html`;

  readonly headerTitle = () => this.page.locator('.header_secondary_container .title');
  readonly firstNameInput = () => this.page.getByPlaceholder('First Name');
  readonly lastNameInput = () => this.page.getByPlaceholder('Last Name');
  readonly postalCodeInput = () => this.page.getByPlaceholder('Zip/Postal Code');
  readonly continueButton = () => this.page.getByRole('button', { name: 'Continue' });
  readonly finishButton = () => this.page.getByRole('button', { name: 'Finish' });
  readonly completeHeader = () => this.page.locator('.complete-header');

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
    await this.continueButton().click();
  }

  async finishCheckout() {
    await this.finishButton().click();
  }
}
