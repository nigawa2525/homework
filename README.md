# Swag Labs E2E Test Project

このリポジトリは、[Swag Labs](https://www.saucedemo.com/) を対象とした E2E テスト自動化プロジェクトです。

## 1. フォルダ構成

プロジェクトは以下の構成で整理されています。

```text
.
├── .cursor/rules/          # Cursor AI 用のコーディングルール定義
├── .github/workflows/      # CI/CD (GitHub Actions) 設定
├── e2e/
│   ├── constants/          # 共通定数 (メッセージなど)
│   ├── helpers/            # 共通ユーティリティ (環境変数など)
│   ├── pages/              # Page Object Model (画面操作ロジック)
│   └── tests/              # テストシナリオ (.spec.ts)
├── playwright.config.ts    # Playwright 設定ファイル
└── package.json            # 依存関係管理
```

## 2. 実装ルール（設計指針）

本プロジェクトでは、AI アシスタントが遵守すべきコーディングルールを定義しています。詳細は以下のファイルを参照してください。
- [`.cursor/rules/cording-rule.mdc`](.cursor/rules/cording-rule.mdc)

### 主な指針
- **Page Object Model の徹底**: すべての Page Object は `BasePage` を継承し、要素定義にはアロー関数を使用することで最新の DOM 状態を保証します。
- **検証の分離**: Page Object 内に `expect` は記述せず、テストファイル側でアサーションを行います。
- **環境管理**: `process.env` を直接参照せず、`Env.ts` ヘルパーを経由します。
- **セレクター選定**: `data-testid` に頼らず、`getByRole` や `getByLabel` などのアクセシビリティ属性を優先的に使用します。

## 3. 手動テストケース

### テストケース 1: ログイン
- **前提条件**: ブラウザで `https://www.saucedemo.com/` にアクセスしていること。
- **手順**:
  1. ユーザー名に `standard_user` を入力する。
  2. パスワードに `secret_sauce` を入力する。
  3. 「Login」ボタンをクリックする。
- **期待結果**: 商品一覧ページ（Inventory Page）が表示されること。

### テストケース 2: 商品の購入フロー
- **前提条件**: `standard_user` でログイン済みであること。
- **手順**:
  1. 「Sauce Labs Backpack」の「Add to cart」ボタンをクリックする。
  2. 右上のカートアイコンをクリックする。
  3. カートページで「Checkout」ボタンをクリックする。
  4. 配送先情報（姓名、郵便番号）を入力し、「Continue」をクリックする。
  5. 確認ページで「Finish」をクリックする。
- **期待結果**: 「Thank you for your order!」というメッセージが表示されること。

### テストケース 3: ログアウト
- **前提条件**: ログイン済みであること。
- **手順**:
  1. 左上のハンバーガーメニューをクリックする。
  2. メニュー内の「Logout」をクリックする。
- **期待結果**: ログインページに遷移すること。

## 2. 技術スタック
- **言語**: TypeScript
- **テストフレームワーク**: Playwright
- **デザインパターン**: Page Object Model (POM)
- **CI/CD**: GitHub Actions

## 3. セットアップと実行方法

### ローカル実行
```bash
# 依存関係のインストール
npm install

# ブラウザのインストール
npx playwright install chromium

# テストの実行
npx playwright test
```

## 5. CI Pipeline (GitHub Actions)

GitHub Actions により、プルリクエストおよびメインブランチへのプッシュ時に自動的にテストが実行されます。

### 手動実行方法
GitHub リポジトリの **Actions** タブから、`Playwright Tests` ワークフローを選択し、**Run workflow** ボタンをクリックすることで、任意のタイミングでテストを手動実行できます（`workflow_dispatch` イベントにより有効化されています）。

テスト結果（レポート）は Artifacts として保存されます。
