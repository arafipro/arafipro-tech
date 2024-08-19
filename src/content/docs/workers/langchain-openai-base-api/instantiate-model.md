---
title: OpenAIモデルをインスタンス化
sidebar:
  order: 5
draft: false
---

## 環境変数を呼び出し

```ts title="index.ts"
type Bindings = {
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();
```

まず、型名を`Bindings`で、`OPENAI_API_KEY`に`string`型を指定しています。  
また、Honoアプリケーションのインスタンスに、`Bindings`プロパティに型`Bindings`を指定しています。

バインディングについて、ドキュメントに次のように説明があります。  
バインディングは、Cloudflare WorkersからCloudflare Developer Platform上のリソースへのアクセスを可能にする仕組みです。  
たとえば、R2バケットへのファイルの読み書き、KV名前空間へのデータの保存、Durable Objectsとのやり取りなどが可能です。  
バインディングは、権限とAPIを一体化したものと考えることができます。  
ワーカーにバインディングを宣言すると、Cloudflareアカウント上のリソースにアクセスするための特定の権限が付与されます。  
重要な点は、ワーカーのコードにシークレットキーやトークンを追加する必要がなく、権限はAPI自体に埋め込まれていることです。  
基盤となるシークレットはワーカーのコードに公開されないため、誤って漏洩する可能性はありません。

つまり、ここでは、`OPENAI_API_KEY`に`string`型を指定することで、`.dev.vars`にアクセスして安全に環境変数の`OPENAI_API_KEY`を取得できます。

## 環境変数を取得

```ts title="index.ts"
const apiKey = c.env.OPENAI_API_KEY;
```

環境変数からOpenAI APIキーを取得して、定数`apiKey`に代入します。

## OpenAIモデルをインスタンス化

最初に`@langchain/openai`から`ChatOpenAI`をインポートします。

```ts title="index.ts"
import { ChatOpenAI } from "@langchain/openai";
```

`new ChatOpenAI()` で`ChatOpenAI`クラスのインスタンスを作成します。  
また、`apiKey`プロパティに定数`apiKey`を渡します。  
そして、`model`プロパティに`"gpt-4o-mini"`を指定します。  
ここでは、GPT-4o miniモデルを使用します。

```ts title="index.ts"
const model = new ChatOpenAI({ apiKey: apiKey, model: "gpt-4o-mini" });
```

## ここまでのコード

ここまでのコードは以下の通りです。

```ts title="index.ts"
import { zValidator } from "@hono/zod-validator";
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
  const model = new ChatOpenAI({ model: "gpt-4o-mini", apiKey: apiKey });
  const body = await c.req.valid("json");
  return c.json(body);
});

export default app;
```
