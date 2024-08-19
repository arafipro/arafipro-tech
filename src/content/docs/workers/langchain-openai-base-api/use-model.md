---
title: OpenAIモデルの使用
sidebar:
  order: 6
draft: false
---

インスタンス化したOpenAIモデル`model`を使用して、`invoke`メソッドにメッセージのリストを渡します。  
たとえば、以下のようにして、モデルにメッセージのリストを渡し、その応答を受け取ることができます。

まずは、`@langchain/core/messages`から`HumanMessage`と`SystemMessage`をインポートします。

```ts
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
```

次に、`messages`という配列を用意します。  
配列には、`SystemMessage`ではシステムのメッセージを定義します。  
また、`HumanMessage`ではユーザーのメッセージを定義します。  
そして、`model`から`invoke`メソッドを呼び出して、`messages`を渡します。  
そうすることで、モデルに対して翻訳の指示と翻訳対象のテキストを送信しています。   
この`invoke`メソッドの戻り値は、`AIMessage`オブジェクトとなります。  
これには、文字列の応答と応答に関するその他のメタデータが含まれます。  
また、出力された結果を定数`res`に格納します。  
最後に、`json`メソッドに定数`res`を渡して、結果をJSON形式で返します。

```ts
const messages = [
  new SystemMessage("次の文章を英語から日本語に翻訳してください。"),
  new HumanMessage("hi!"),
];
const res = await model.invoke(messages);
// const body = await c.req.valid("json"); いったんコメントアウト
return c.json(res);
```

ただ、多くの場合、文字列の応答のみを使用したい場合があります。  
その場合は、単純な出力パーサーを使用して、文字列の応答のみを抽出できます。

## これまでのコード

```ts title="index.ts"
import { zValidator } from "@hono/zod-validator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { Hono } from "hono";
import { z } from "zod";

type Bindings = {
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const schema = z.object({
  prompt: z.string(),
});

app.post("/", zValidator("json", schema), async (c) => {
  const apiKey = c.env.OPENAI_API_KEY;
  const model = new ChatOpenAI({ apiKey: apiKey, model: "gpt-4o-mini" });
  const messages = [
    new SystemMessage("次の文章を英語から日本語に翻訳してください"),
    new HumanMessage("hi!"),
  ];
  const res = await model.invoke(messages);
  // const body = await c.req.valid("json"); いったんコメントアウト
  return c.json(res);
});

export default app;
```
