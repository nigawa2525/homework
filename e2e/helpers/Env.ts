export class Env {
  static readonly BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';
  static readonly STANDARD_USER = process.env.STANDARD_USER || 'standard_user';
  static readonly PASSWORD = process.env.PASSWORD || 'secret_sauce';
}
