import { BasePage } from './BasePage';
import { Env } from '../helpers/Env';

export class LoginPage extends BasePage {
  readonly url = `${Env.BASE_URL}/`;

  readonly usernameInput = () => this.page.getByPlaceholder('Username');
  readonly passwordInput = () => this.page.getByPlaceholder('Password');
  readonly loginButton = () => this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = () => this.page.locator('[data-test="error"]');

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}
