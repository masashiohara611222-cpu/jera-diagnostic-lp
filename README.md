# JERA簡易診断LP

JERA簡易診断LPの静的実装です。5問の診断、4言語表示、診断中の言語切替、Messenger導線、Meta Pixel向けイベント送信、UTM保持に対応しています。

## 4言語の構成

対応言語は `ja`、`en`、`my`、`id` です。初期表示言語は次の優先順位で決まります。

1. URLの `?lang=ja|en|my|id`
2. 過去に選択した言語の `localStorage`
3. ブラウザ言語
4. 日本語

言語切替はヘッダーのセレクトから行います。診断の途中や結果画面で切り替えても、回答、進捗、結果、UTM情報は保持されます。

## 翻訳文言の変更方法

翻訳は `src/config/locales/` に言語別ファイルとして分けています。

- 日本語: `src/config/locales/ja.js`
- 英語: `src/config/locales/en.js`
- ミャンマー語: `src/config/locales/my.js`
- インドネシア語: `src/config/locales/id.js`

各言語で同じキー構造を使っています。翻訳が不足した場合は日本語にフォールバックし、画面に翻訳キーがそのまま出ないようにしています。

正式公開前に、英語、ミャンマー語、インドネシア語の文言はネイティブまたは実務翻訳者による確認を推奨します。現状の多言語文言はLPとして自然に読めることを優先した仮翻訳です。

## 新しい翻訳キーの追加方法

1. `src/config/locales/ja.js` に新しいキーと日本語文言を追加します。
2. `en.js`、`my.js`、`id.js` に同じキーを追加します。
3. HTML上の固定文言は `data-i18n="hero.title"` のようにキーを指定します。
4. JavaScript内では `translate("result.instruction", { level: "LV2" })` のように呼び出します。

## 新しい言語を追加する方法

1. `src/config/locales/xx.js` を追加します。
2. `src/config/locales/index.js` に import と `locales` 登録を追加します。
3. `src/config/settings.js` の `SUPPORTED_LANGUAGES` に言語コードを追加します。
4. `index.html` の言語セレクトに `<option value="xx">...</option>` を追加します。
5. Messenger参照コードとMeta Pixelイベントに新しい言語コードが含まれることを確認します。

## URLの `lang` パラメータ

広告やSNSから言語別に流入させる場合は、URLに `lang` を付けます。

- 日本語: `/?lang=ja`
- 英語: `/?lang=en`
- ミャンマー語: `/?lang=my`
- インドネシア語: `/?lang=id`

未対応の言語コードが指定された場合は日本語にフォールバックします。

## Messenger参照コード

Messenger URLは `src/config/settings.js` の `MESSENGER_BASE_URL` で変更できます。参照コードは `src/app.js` の `getReferralCode()` で生成しています。

形式は次の通りです。

```text
jera_{language}_{level}
```

例:

```text
jera_ja_lv1
jera_en_lv2
jera_my_lv3
jera_id_lv2
```

## Meta Pixel計測

`window.fbq` が存在する場合、次のイベントを `trackCustom` で送信します。`fbq` がない環境でも `window.dataLayer` に同じイベントをpushするため、確認やGTM連携ができます。

- `PageView`
- `StartDiagnostic`
- `DiagnosticStep`
- `CompleteDiagnostic`
- `JERAResultView`
- `MessengerClick`
- `LanguageChanged`

イベントには `language`、`landingLanguage`、`currentLanguage`、`currentStep`、`utmCampaign` などを含めています。個人情報は送信していません。

## UTM保持

次の値を読み取り、診断状態と一緒に保持します。

- `lang`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

広告の流入言語とLP内の選択言語を比較できるように、`landingLanguage` と `currentLanguage` を分けています。

## 正式公開前チェックリスト

- 4言語すべてでファーストビュー、質問、結果、Messenger導線、フッターが表示される
- 診断途中で言語を切り替えても回答と進捗が保持される
- 結果画面で言語を切り替えても結果レベルが保持される
- `?lang=ja`、`?lang=en`、`?lang=my`、`?lang=id` で初期言語が切り替わる
- 320px、375px、390px、430pxのスマートフォン幅で横スクロールや文字切れが起きない
- Messenger参照コードが言語とレベルに応じて変わる
- Meta PixelまたはGTM側で各イベントと言語コードを確認できる
- 仮翻訳がネイティブまたは実務翻訳者に確認されている
