---
title: 認証に必要なデータベースの準備
sidebar:
  order: 3
draft: false
---

## データベースを作成

```sh
npx wrangler d1 create lucia-auth-base-db
```

## `wrangler.toml`

データベースを作成時に出力されたD1の設定を追加します。  
`<unique-ID-for-your-database>`はデータベースを作成したときに出力されるIDです。

```diff toml title="wrangler.toml"
  name = "lucia-auth-base-app"
  compatibility_date = "2024-08-21"
  compatibility_flags = ["nodejs_compat"]
  pages_build_output_dir = ".vercel/output/static"

+ [[d1_databases]]
+ binding = "DB"
+ database_name = "lucia-auth-base-db"
  # <unique-ID-for-your-database>はデータベースを作成したときに出力されるID
+ database_id = "<unique-ID-for-your-database>"
+ migrations_dir = "./drizzle/migrations"
```

## `drizzle.config.ts`

```ts drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "sqlite",
  out: "./drizzle/migrations",
});
```

## テーブルスキーマを作成

https://lucia-auth.com/database/drizzle

コードをコピーした後、不要なコードを削除して、usernameとpassword_hashを追加します。

```diff ts title="drizzle/schema.ts"
- import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

- import sqlite from "better-sqlite3";
  import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
- import { drizzle } from "drizzle-orm/better-sqlite3";

- const sqliteDB = sqlite(":memory:");
- const db = drizzle(sqliteDB);

- const userTable = sqliteTable("user", {
+ export const userTable = sqliteTable("users", {
    id: text("id").notNull().primaryKey(),
+ 	username: text("username").unique().notNull(),
+   password_hash: text("password_hash").notNull(),
  });

- const sessionTable = sqliteTable("session", {
+ export const sessionTable = sqliteTable("sessions", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    expiresAt: integer("expires_at").notNull(),
  });

- const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
```

## ローカルデータベースにテーブルを作成

```sh
npx drizzle-kit generate
npx wrangler d1 migrations apply lucia-auth-base-db --local
```

## Bindingsの型を定義

[参考サイト：Cloudflare Docs / TypeScript type declarations for bindings](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/bindings/#typescript-type-declarations-for-bindings)

BindingsのD1 Datebaseの型を定義します。

```ts env.d.ts
interface CloudflareEnv {
  DB: D1Database;
}
```

## drizzle/db.ts

[参考サイト：Cloudflare Docs / Other Cloudflare APIs (cf, ctx)](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/bindings/#other-cloudflare-apis-cf-ctx)

BindingsのD1 Datebaseの型定義を取得します。  
そして、drizzleにD1の型定義を渡します。

```ts drizzle/db.ts
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";

// Bindingsの型を定義を取得
export const { env } = getRequestContext();
// drizzleにBindingsのDBを渡す
export const D1 = env.DB;
export const db = drizzle(D1);
```
