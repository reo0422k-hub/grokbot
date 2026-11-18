# Grok Bot 導入支援 サイト

株式会社プレミアムヒューマンのGrok Bot導入支援サービスを、参照FVの白・赤・淡いピンクと3Dマスコットで統一したローカル制作版です。Next.js App Router / TypeScript / Tailwind CSS 4 / npm。デプロイは行っていません。

2026-11-18の追加デザイン：スマホは新しい参照画像に合わせた白背景・大見出し・キャラクター画像・画像下CTAの構成へ変更。9種類のミニキャラクターをページごとの目印やカード、フッターに展開しました。デスクトップは元の構造を保ち、小さなキャラクターと差し色を加えています。本文・検索・FAQ・リンク・ボタンはHTMLで実装しています。

全ページのボタン、カード、メニュー、入力欄を直角で統一しました。見出し上の装飾番号・英語ラベルを取り除き、共通ロゴ、ファビコン、業務と操作のアイコン、PC・スマホのトップ画像にImageGen素材を採用しています。

## 作業の再開・プレビュー

- 編集しながら確認する開発プレビューは `http://127.0.0.1:3007/` です。`src/` の変更は保存すると反映されます。
- `http://127.0.0.1:3008/` は最終ビルドの検証用です。更新するときは `npm run build` の後に検証用サーバーを再起動します。
- トップは `src/app/page.tsx`、下層ページの本文は `src/content/pages.json`、共通の表示は `src/components/` から編集できます。前回の検証結果は `design/qa-notes.md` にあります。

初回はリポジトリのルートで依存関係をインストールし、開発サーバーを起動します。

```sh
npm ci
npm run dev
```

最終ビルドを3008番ポートで表示する場合は、同じディレクトリで次を実行します。

```sh
npm run build
./node_modules/.bin/next start --hostname 127.0.0.1 --port 3008
```

## 実装範囲

2026-11-17に公開サイトのサイトマップと内部リンクを確認。公開26ページのURLをすべて再構成し、導入支援・PoC・導入の流れ・FAQ・相談案内を独立ページとして追加しました。トップを含む31ページです。

- トップ：`/`
- 活用例一覧：`/use-cases/`
- 6部門：`/use-cases/sales/`、`recruiting/`、`marketing/`、`procurement/`、`customer-success/`、`engineering/`
- 製品ガイド：`/grok-bot/` と `features/`、`getting-started/`、`vs-chat-ai/`、`enterprise/`、`security/`、`pricing/`、`galaxy/`
- ブログ一覧：`/news/` と公開サイトにある6記事の同一パス
- 法人導入：`/support/`、`/poc/`、`/flow/`、`/faq/`、`/contact/`
- 会社・ポリシー：`/company/`、`/privacy/`、`/editorial-policy/`
- `sitemap.xml`、`robots.txt`、404ページ

全ページに共通ヘッダー・全ページメニュー・フッターを配置。パンくず、関連記事、無料相談導線を実装しています。活用例と記事の検索・カテゴリ絞り込み、検索0件表示、FAQ検索・開閉、キーボード操作に対応しています。

検索は全角・半角の英数字、大文字・小文字、前後の空白を吸収します。FAQの検索0件時も絞り込みを解除できます。スマホのヘッダー相談ボタンは高さ48px以上、本文スキップリンクは固定ヘッダーの高さを考慮しています。

公開サイトの内容を業務の判断に必要な説明へ再編集しています。旧プラン・過去の試用条件を現在の案内として掲載せず、確認できない価格や支援実績の数字は追加していません。

## ファイル

- `src/app/page.tsx`：トップページ。右側はユーザー指定によりマスコットと業務パネルを1枚にした生成画像。
- `src/app/[...slug]/page.tsx`：下層ページの静的生成、個別メタ情報。
- `src/content/pages.json`：30の下層ページ本文。
- `src/content/site.ts`：メニュー、ラベル、FAQ。
- `src/components/`：共通ヘッダー・フッター、記事・ガイド・活用例、検索、絞り込み、関連リンク。
- `src/app/globals.css`、`hero-reference.css`、`site.css`：基本・FV・サイト全体のスタイル。
- `src/app/layout.tsx`：共通レイアウトとローカルフォント。
- `src/app/color-family.css`：新しいスマホ構成、9キャラクターの表示、色アクセント。
- `src/components/bot-family.tsx`、`src/content/characters.ts`：キャラクターとページ別配色、端末別イラスト。
- `design/source-pages.json`：確認した公開ページと参照情報。
- `design/validation.json`：全ページのHTTP・リンク・見出し・メタ情報・代替テキスト・URL網羅性の検証結果。

## ImageGen素材

Built-in ImageGenを使用しています。画像はすべてプロジェクト内へ保存しています。

- `public/images/brand/`：共通のロゴマーク、ワードマーク、業務アイコン12点、操作アイコン6点。
- `src/app/icon.png`：共通ロゴマークから書き出した48pxファビコン。
- `public/images/hero-desktop-square.webp`、`hero-mobile-square.webp`：直角の業務パネルに更新したトップのPC・スマホ画像。
- `design/brand-imagegen-prompts.md`：共通ロゴ、アイコン、トップ画像に使用したプロンプト。

- `public/images/hero-bot-composite.png`：トップFVのマスコット＋業務パネル。
- `public/images/work-guide.png`：業務整理・製品ガイド・活用例。
- `public/images/security-guide.png`：権限・承認・情報管理。
- `public/images/support-team.png`：導入支援・相談・研修。
- `public/images/hero-color-mobile.png`：新しいスマホFV。黒いBot、業務パネル、緑と青のミニBot。
- `public/images/bot-family-atlas.png`：黒・緑・紫・青・オレンジ・黄・ピンク・灰・茶の9種類。
- `public/images/crew-work.png`、`crew-security.png`、`crew-support.png`：スマホ向けの業務整理・承認設計・相談イラスト。

プロンプト：`design/imagegen-composite-prompt.txt`、`design/site-imagegen-prompts.md`。以前のマスコット単体素材は履歴用に残しています。

新しい5素材のプロンプト：`design/color-family-imagegen-prompts.md`。すべてbuilt-in ImageGenで生成し、透過を保持しています。

## フォームと個人情報

実装内に送信バックエンドがないため、相談CTAは `https://grokbotjp.com/#contact-form` へ接続しています。公開フォームの無料相談が初期選択されることを確認済みです。ローカルサイトで入力フォームや送信成功画面は新設していません。

外部フォームの受信・送信処理はこのプロジェクトの管理範囲外です。実運用へのテスト送信はしていません。プライバシーページは、この制作版で実際に行うこと（ローカルフォント、解析なし、個人情報入力なし）に合わせた説明にしています。

## 検証

```sh
npm run build
npm run lint
npm run typecheck
# 最終ビルドを3008番ポートで起動してから：
python3 scripts/check-site.py
```

- 31ページすべてHTTP 200。公開26ページのURLをすべて網羅。
- 内部リンク・ページ内アンカー・H1が1つ・タイトル・description・画像altを確認。
- 画像・サイトマップ・robotsの配信、未知のURLが404となることを確認。
- Safariで375pxの活用例・承認表、768pxのブログ記事、1440pxの導入支援を目視確認。
- 活用例フィルター、検索0件表示、解除で6件に戻る動作、全ページメニューの開閉とEscape後のフォーカスを確認。
- 375pxのトップ・ブログ一覧を追加確認。ブログカテゴリで2件へ絞り込み、FAQの全角英字検索とキーボードでの解除を確認。
- build / lint / TypeScriptのチェックを実施。詳しい機能・表示の検証記録は `design/qa-notes.md`。

iOS / Android実機、外部フォーム送信、デプロイは未実施です。
