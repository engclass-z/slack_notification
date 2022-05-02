# slack_notification

GAS を用いて Google フォームから Slack 通知させるスクリプト

## 利用方法

後日追加

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
$ yarn open
```

実装した ts ファイルを元に gs ファイルを作成し、AppsScript にアップロードする

```
$ yarn push
```
