# slack_notification

GAS を用いて Google フォームから Slack 通知させるスクリプト

## 利用方法

1. 予め本プログラムを使いたい Google アカウントでログインをしておく
1. プログラム上部の、Webhook URL 、名前、メンション先などを必要に応じて書き換える
1. `開発資料` に従って gs ファイルを作成し、AppsScript にアップロードする
1. Slack で通知を受けるチャンネルを作成する
1. 「アプリを追加する」→Incoming Webhook を検索して追加する
1. Webhook URL をメモに残しておく
1. Google フォームの作成（既にある場合は省く）
1. Google フォームから「スクリプトエディタ」を開く
1. 中央のプログラムが書かれている場所の記載 `function myFunction(){}` をすべて gs ファイルの中身に置き換える
1. `プロジェクトを保存` ボタンを押す
1. 実行ボタンを押す
   - 承認が必要です、と表示されたら、画面指示に従い承認を行う
1. 画面下部の実行ログの箇所に エラー が表示されていないことを確認する
1. 画面左の `トリガー` ボタンを押し、右下の `トリガーを追加` ボタンを押す
1. `onFormSubmit` 関数を選択し、イベントをフォーム送信時に設定する
1. 設定完了

## 開発資料

### 環境構築

本プログラムでは clasp を利用して開発を行っています。

まず、[G Suite ユーザー設定画面](https://script.google.com/home/usersettings)から Google Apps Script API をオンにして下さい。

必要なパッケージをインストールし、 clasp に Google アカウントでログインする

```
$ npm install -g @google/clasp
$ clasp login
$ npm install
$ npm run generate
```

※この際、.clasp.json がルートディレクトリにあることを確認する。

### コマンド

ブラウザ上で Apps Script エディタを開く

```
$ clasp open
```

実装した ts ファイルを元に gs ファイルを作成し、AppsScript にアップロードする

```
$ clasp push
```
