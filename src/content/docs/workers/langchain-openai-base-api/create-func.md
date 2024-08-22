---
title: ファイルを分割
sidebar:
  order: 11
next: false
draft: true
---

コードが肥大化してきたので、これまで実装したコードを新たに関数にします。

## 関数`translateText`を作成

まずは、`app.post`の上に非同期関数`translateText`を作成します。
引数には、`apiKey`、`language`、`text`を用意します。
引数の型は、すべて`string`型にします。

```diff ts title="index.ts"
.
.
.
+ async function translateText({
+   apiKey,
+   language,
+   text,
+ }: {
+   apiKey: string;
+   language: string;
+   text: string;
+ }) {}

 app.post("/", zValidator("json", schema), async (c) => {
.
.
.
```

`model`インスタンスから、定数`res`まで選択してコピーします。
そして、関数`translateText`に貼り付けます。
最後に、定数`res`を`return`で返します。

```diff ts title="index.ts"
  async function translateText({
    apiKey,
    language,
    text,
  }: {
    apiKey: string;
    language: string;
    text: string;
  }) {
+   const model = new ChatOpenAI({
+     apiKey: apiKey,
+     model: "gpt-4o-mini",
+   }) as unknown as Runnable;
+   const systemTemplate = "次の文章を英語から{language}に翻訳してください。";
+   const promptTemplate = ChatPromptTemplate.fromMessages([
+     ["system", systemTemplate],
+     ["user", "{text}"],
+   ]);
+   const parser = new StringOutputParser();
+   const chain = promptTemplate.pipe(model).pipe(parser);
+   const res = await chain.invoke({ language: language, text: text });
+   return res;
  }
```

## ファイル`translate-text.ts`を作成

ファイル`translate-text.ts`を作成します。
作成したら、`index.ts`から関数`translateText`を切り取って、貼り付けます。
また、必要なインポートもコピーします。
そして、`export`を追加して、他のファイルで関数`translateText`を使えるようにします。

```ts title="translate-text.ts"
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Runnable } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai"  

export async function translateText({
  apiKey,
  language,
  text,
}: {
  apiKey: string;
  language: string;
  text: string;
}) {
  const model = new ChatOpenAI({
    apiKey: apiKey,
    model: "gpt-4o-mini",
  }) as unknown as Runnable;
  const systemTemplate = "次の文章を英語から{language}に翻訳してください。";
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);
  const parser = new StringOutputParser();
  const chain = promptTemplate.pipe(model).pipe(parser);
  const res = await chain.invoke({ language: language, text: text });
  return res;
}
```



```json
{
  "language": "日本語",
  "text": "hello, world"
}
```


次は、POSTメソッドに関数translateTextを呼び出します。
定数resを用意します。
関数translateTextを呼び出して、各引数を渡します。
03
サンダークライアントを開いて、動作を確認します。
実行するとバリデーションが効いているので、エラーになります。
そこで、JSONを変更します。
promptをlanguageに変更して、bbbbを日本語に変更します。
また、textを追加して、hello, worldを渡します。
もう一度実行すると、エラーになってしまいました。
コードを確認します。
04
すいません、languageのスペルが違っていました。
修正します。
サンダークライアントに戻って、もう一度実行します。
次は、ちゃんと「こんにちは、世界」と出力されました。
05
あとは、関数translateTextを別のファイルに移動します。
関数translateTextを切り取ります。
次に、srcディレクトリにファイルtranslate-text.tsを作成します。
そして、はりつけます。
あとは、必要なインポートを追加します。
最後に、asyncの前にexportを追加します。
index.tsに戻って、translateTextをインポートします。
06
念の為、サンダークライアントを開いて、動作を確認します。
worldをjapanに変更して、実行します。
「こんにちは、日本」と出力されました。
07
コードを見ると、すっきりしましたね。
ただ、眺めると、schemaも別にファイルに分けることができますね。
こちらは、皆さん各自で試してみてください。
