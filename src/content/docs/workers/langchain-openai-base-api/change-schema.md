---
title: スキーマを変更
sidebar:
  order: 10
draft: false
---

次は、`language`プロパティと、`text`プロパティに引数から値を渡すようにします。

## スキーマを変更

`schema`のバリデーションルールを変更します。
`language`プロパティと`text`プロパティは、`string`型を指定します。

```diff ts
  const schema = z.object({
-   prompt: z.string(),
+   language: z.string(),
+   text: z.string(),
  });
```

## POSTメソッドのリクエストから値を取得

POSTメソッドのリクエストから`language`と`text`の値を取得します。

```diff ts
- const body = await c.req.valid("json");
+ const { language, text } = await c.req.valid("json");
```

定数`body`を定数`language`と`text`に変更します。
