---
title: パッケージを導入
sidebar:
  order: 4
draft: true
---

## LangChain

LangChainをインストールするには、以下のコマンドを実行します。

```sh
bun add langchain
```

また、LangChainのcoreパッケージもインストールします。

```sh
bun add @langchain/core
```

## OpenAI API

LangChainが提供するOpenAI APIに対応したパッケージをインストールする必要があります。  
以下のコマンドを実行します。

```bash
bun add @langchain/openai
```

## 環境変数を設定

LangChainでOPENAI APIを使用する際には、サービスで発行されるAPIキーが必要になります。  
ただ、API KEYの扱いは注意が必要で、もし他人に知られると悪用されてしまいます。  
そこで、環境変数が必要になります。  
環境変数は、APIキーなどの機密情報をコードに直接書き込むことなく、アプリケーションに渡すために使用されます。  
Cloudflare Workersでは、`.dev.vars`ファイルに環境変数を保存します。

プロジェクトのルートディレクトリに`.dev.vars`ファイルを作成し、環境変数を追加します。

```sh title=".dev.vars"
OPENAI_API_KEY="your-api-key"
```
