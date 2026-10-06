# AIRY77 再現サイト

https://www.airy77.com/ を基準にした、ビルド不要の静的HTML/CSS/JavaScriptサイトです。

## 起動

このフォルダで `python3 -m http.server 8766` を実行し、ブラウザで `http://127.0.0.1:8766/` を開きます。

## 素材

- ロゴ、キャッチコピー、講師5名の写真、スケジュール、スタジオ写真、背景動画は、指定されたGoogle Driveフォルダの素材を使用しています。
- 区切りのスケートボード写真は、参考サイトの公開画像を使用しています。
- 背景動画は720p・約23MBに変換し、ネットワーク再生向けに最適化しました。
- 画像のEXIF、XMP、コメントなどの付随メタデータを除去しています。
- YouTube動画5本とGoogle Mapsは外部埋め込みです。
- `.DS_Store`、未使用フォルダ、元の大容量動画は配布に含めていません。

## Cloudflare Pages

- Framework preset: None
- Build command: 空欄
- Build output directory: `.`
- このフォルダの `index.html` がリポジトリのルートに来るよう配置します。

既存のポートフォリオのリポジトリ・Cloudflare Pagesプロジェクトとは独立したサイトとして作成しています。公開先の作成・接続はまだ行っていません。
