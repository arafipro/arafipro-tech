---
title: Honoを導入
sidebar:
  order: 3
draft: false
---

## Honoをインストール

Honoをインストールするには、以下のコマンドを実行します。

```sh
bun add hono
```

## 動作確認

次に簡単なコードを作成します。  
POSTメソッドで、json形式のデータを受け取ります。  
そして、そのまま出力するようにします。

```ts title="src/index.ts"
import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json();
  return c.json(body);
});

export default app;
```

適当にJSONを送信してみましょう。

```json
{
  "aaa": "aaa"
}
```

送信したJSONが出力されました。  
JSONを変更して、もう1度送信してみましょう。

```json
{
  "bbb": "bbbb"
}
```

また、送信したJSONが出力されました。  
ただ、このままではどんなJSONも受け取るようになっています。  
これを、決まったJSONを受け取るようにします。  
それには、zodを使用して、バリデーションスキーマを作成します。

## zodを使用したバリデーション

Honoには、zodを利用するためのミドルウェアが用意されています。  
ターミナルで、以下のコマンドを実行します。  
すると、zValidatorがインストールされます。

```sh
bun add @hono/zod-validator
```

次に、zValidatorを使うためにコードを変更します。  
ハイライトしているコードが変更箇所です。

```ts title="src/index.ts" {1,3,7-9,11,12}
import { zValidator } from "@hono/zod-validator";         // 追加
import { Hono } from "hono";
import { z } from "zod";                                  // 追加

const app = new Hono();

const schema = z.object({
  prompt: z.string(),
});

app.post("/", zValidator("json", schema), async (c) => {  // 変更
  const body = await c.req.valid("json");                 // 変更
  return c.json(body);
});

export default app;
```

## バリデーションの動作確認

JSONをそのまま、送信してみましょう。

```json
{
  "bbb": "bbbb"
}
```

今度は、エラーが発生しました。  
そこで、bbbをスキーマで設定したpromptに変更します。

```json
{
  "prompt": "bbbb"
}
```

もう1度実行すると、次は表示されました。
