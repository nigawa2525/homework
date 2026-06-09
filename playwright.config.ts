import { defineConfig } from '@playwright/test';

// 自動テスト基盤（Automated Testing Platform）の Playwright 設定。
// - CI ではリトライを有効化し、「リトライで合格 = Flaky」を自動修復ワークフローが検出できるようにする。
// - json レポーター（results.json）を出力し、assess ジョブが失敗/Flaky を判定する根拠に使う。
// - trace / video / screenshot を常時記録し、Claude が失敗原因を解析できるようにする。
export default defineConfig({
  testDir: './e2e/tests',

  // 同一ホスト（saucedemo）への並列アクセスを抑えるため CI では直列寄りに。
  fullyParallel: false,
  // CI で test.only の置き忘れをエラー化する。
  forbidOnly: !!process.env.CI,
  // CI のみリトライ。Flaky 検出のために 0 より大きくしておく。
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'results.json' }],
    ['list'],
  ],

  use: {
    // Dev 等への切り替えは BASE_URL 環境変数で行う（Env.ts と整合）。
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    // アクションごとのスナップショットを確実に記録
    actionTimeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
