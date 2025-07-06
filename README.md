# Community Platform - 日本版コミュニティ＆コンテンツ販売プラットフォーム

日本人クリエイター向けのコミュニティ運営とコンテンツ販売をワンストップで行えるプラットフォームです。

## 🚀 特徴

- **簡単セットアップ**: 30分でコミュニティをローンチ
- **テンプレート機能**: ファンクラブ型、講座型、サロン型
- **認証システム**: Google・LINEログイン対応
- **決済連携**: Stripe決済システム
- **日本法令対応**: 消費税、インボイス制度対応

## 🛠️ 技術スタック

- **Frontend**: React 18 + Vite
- **Backend**: Supabase
- **認証**: Supabase Auth
- **決済**: Stripe
- **UI**: Tailwind CSS + Framer Motion
- **アイコン**: React Icons

## 📦 セットアップ手順

### 1. プロジェクトのクローン

```bash
git clone <repository-url>
cd community-platform
npm install
```

### 2. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセス
2. 新しいプロジェクトを作成
3. Settings → API から以下を取得:
   - Project URL
   - Anon Key

### 3. 環境変数の設定

`.env.example` を `.env` にコピーして設定:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. アプリケーションの起動

```bash
npm run dev
```

アプリケーションが起動すると、自動的にSupabaseセットアップ画面が表示されます。

## 🔧 自動セットアップ機能

初回起動時に以下が自動で実行されます：

1. **データベーステーブル作成**
   - Communities テーブル
   - Community Members テーブル
   - Content テーブル
   - Payments テーブル

2. **セキュリティ設定**
   - Row Level Security (RLS) 有効化
   - 適切なポリシー設定

3. **初期データ投入**
   - サンプルコミュニティ
   - テンプレートデータ

## 📱 主要機能

### 🏠 ランディングページ
- ヒーローセクション
- 機能紹介
- 料金プラン
- コミュニティ一覧

### 🔐 認証システム
- メール・パスワード認証
- Google OAuth連携
- LINEログイン（設定により）

### 📊 ダッシュボード
- コミュニティ統計
- 収益レポート
- メンバー管理
- コンテンツ管理

### 🎨 コミュニティテンプレート
- **ファンクラブ型**: 有名人・インフルエンサー向け
- **講座型**: オンライン教育・スキルアップ
- **サロン型**: 専門家・起業家向け

## 🔒 セキュリティ

- Row Level Security (RLS) による安全なデータアクセス
- JWT認証による安全な通信
- CSRF保護機能
- 適切な権限管理

## 💳 決済機能

- Stripe連携による安全な決済
- サブスクリプション管理
- 単発決済対応
- 自動領収書発行

## 🌐 日本対応

- 日本語UI
- 日本の法令対応
- 円建て決済
- 日本時間対応

## 📚 開発者向け

### プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── auth/           # 認証関連
│   ├── dashboard/      # ダッシュボード
│   ├── landing/        # ランディングページ
│   ├── community/      # コミュニティ機能
│   └── ui/             # UIコンポーネント
├── lib/                # ライブラリ設定
├── utils/              # ユーティリティ関数
└── App.jsx             # メインアプリケーション
```

### 重要なファイル

- `src/lib/supabase.js`: Supabase設定
- `src/utils/supabaseSetup.js`: 自動セットアップ機能
- `src/components/auth/AuthProvider.jsx`: 認証プロバイダー
- `src/components/setup/SupabaseSetup.jsx`: セットアップUI

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🆘 サポート

問題が発生した場合は、以下を確認してください：

1. Supabaseプロジェクトが正しく設定されているか
2. 環境変数が正しく設定されているか
3. 必要な権限が付与されているか

## 🔗 リンク

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)