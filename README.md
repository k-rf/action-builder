# Action Builder

Action Builder は、GitHub Actions のカスタムアクションを TypeScript で開発するためのツールです。

## 使用方法

### インストール

```bash
pnpm add @k-rf/action-builder @actions/core
pnpm add -D ts-node @vercel/ncc
```

### .npmrc の設定

.npmrc を作成し、以下の内容を記述する。

```ini
@k-rf:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### アクションの作成

次のコマンドを実行し、表示される画面にしたがって情報を入力する。

```bash
pnpm ab add
```

実行すると、 `.github/actions` ディレクトリにアクションのテンプレートが作成される。

### アクションのビルド

次のコマンドを実行する。

```bash
pnpm ab build
```

実行すると、 `.github/actions/<作成したアクション>` 配下に以下のものが作成される。

- `dist/index.js`
- `action.yaml`
