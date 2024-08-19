---
title: OutputParserの使用
sidebar:
  order: 7
draft: true
---

OutputParserは、言語モデルからの応答から文字列型の応答のみを抽出するために使用されます。

まず、`@langchain/core/output_parsers`から`StringOutputParser`をインポートします。

```ts
import { StringOutputParser } from "@langchain/core/output_parsers";
```

`new StringOutputParser()` で`StringOutputParser`クラスのインスタンスを作成します。  

```ts
const parser = new StringOutputParser();
```

次に、言語モデル呼び出しの結果をパーサーに渡すことで文字列の応答のみを抽出できます。  
インスタンス化した`parser`を使用して、`invoke`メソッドを呼び出します。  
そして、`invoke`メソッドの引数に定数`res`を渡します。  
すると、`res`（`AIMessage` オブジェクト）から翻訳された日本語のみが出力されます。

```ts
const res = await model.invoke(messages);
await parser.invoke(res); 
```

また、`pipe()`メソッドを使用して、モデルと出力パーサーを"チェーン"することもできます。  
これは、モデルの出力が自動的に出力パーサーに渡されることを意味します。

```ts
const chain = model.pipe(parser);
const res = await chain.invoke(message);
```

このコードでは、`model.pipe(parser)`によって、モデルと出力パーサーがチェーン化されます。  
そして、`chain.invoke(messages)`のように、`chain`に対して`invoke`メソッドを呼び出すだけで、モデルの呼び出しと応答の解析が連続して実行されます。  
その結果、「こんにちは！」と出力されます。 

これは、LangChain Expression Language (LCEL) を使用してLangChainモジュールをチェーンする簡単な例です。  
このアプローチには、最適化されたストリーミングやトレースのサポートなど、いくつかの利点があります。 

## ここまでのコード

```ts title="index.ts"
import { zValidator } from "@hono/zod-validator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
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
  const message = [
    new SystemMessage("次の文章を英語から日本語に翻訳してください。"),
    new HumanMessage("hi!"),
  ];
  const parser = new StringOutputParser();
  const chain = model.pipe(parser);
  const res = await chain.invoke(message);
  // const body = await c.req.valid("json"); いったんコメントアウト
  return c.json(res);
});

export default app;
```
