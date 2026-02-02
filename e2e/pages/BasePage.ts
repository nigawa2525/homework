import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * ページをロードし、読み込み完了を待機する
   */
  async load(url: string) {
    await this.page.goto(url);
    await this.waitForAjax();
  }

  /**
   * Ajaxの完了を待機する
   */
  async waitForAjax() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * ページのタイトルを取得する
   */
  async getTitle() {
    return await this.page.title();
  }
}
