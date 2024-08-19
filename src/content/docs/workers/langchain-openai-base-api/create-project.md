---
title: プロジェクトの準備
sidebar:
  order: 2
draft: false
---

## プロジェクトの作成

任意の場所に適当なディレクトリを作成して移動します。  
今回はディレクトリ名を`langchain-openai-base-api`とします。

```sh
mkdir langchain-openai-base-api
cd langchain-openai-base-api
```

ディレクトリ内でプロジェクトを作成するには、以下のコマンドを使用します。

```sh
bun create cloudflare@latest ./
```

質問には、以下のように答えます。

まず、`What would you like to start with?`と聞かれるので、`Hello World example`を選択します。

```sh
What would you like to start with?
● Hello World example
○ Framework Starter
○ Demo application
○ Template from a Github repo
```

`Which template would you like to use?`と聞かれるので、`Hello World Worker`を選択します。

```sh
Which template would you like to use?
● Hello World Worker
○ Hello World Worker Using Durable Objects
```

`Which language do you want to use?`と聞かれるので、`TypeScript`を選択します。

```sh
Which language do you want to use?
● TypeScript
○ JavaScript
○ Python
```

`Do you want to use git for version control?`と聞かれるので、`yes`を選択します。

```sh
Do you want to use git for version control?
Yes
```

最後に、`Do you want to deploy your application?`と聞かれるので、`no`を選択します。

```sh
Do you want to deploy your application?
No
```

成功すると、以下のように出力されます。

```sh
APPLICATION CREATED  Deploy your application with bun run deploy

Run the development server bun run start
Deploy your application bun run deploy
Read the documentation https://developers.cloudflare.com/workers
Stuck? Join us at https://discord.cloudflare.com
```

## 不要なコードを削除

`index.ts`を開いて、コメントを削除します。

次に、`test`ディレクトリにはテストコードが用意されています。  
今回はテストはしないので削除します。

続けて、`.editorconfig`と`.prettierrc`を削除します。  
削除した2つのファイルはコードのスタイルやフォーマットを管理しています。
