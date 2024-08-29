---
title: 初期化ファイルを作成
sidebar:
  order: 4
draft: true
---

## `auth.ts`を作成

https://lucia-auth.com/database/sqlite

```ts title="auth.ts"
import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

export function initializeLucia() {
  const adapter = new D1Adapter(D1, {
    user: "user",
    session: "session",
  });
  return new Lucia(adapter);
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
  }
}
```

## `D1Adapter`から`DrizzleSQLiteAdapter`に変更

`D1Adapter`から`DrizzleSQLiteAdapter`に変更します。

```diff ts title="auth.ts"
- import { D1Adapter } from "@lucia-auth/adapter-sqlite";
+ import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
+ import { drizzle } from "drizzle-orm/d1";
  import { Lucia } from "lucia";
+ import { db } from "./drizzle/db";
+ import { sessionTable, userTable } from "./db/schema";

  export function initializeLucia() {
-   const adapter = new D1Adapter(D1, {
-     user: "user",
-     session: "session",
-   });
+ 	const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
    return new Lucia(adapter);
  }

  declare module "lucia" {
    interface Register {
      Lucia: ReturnType<typeof initializeLucia>;
    }
  }
```

### 07

https://lucia-auth.com/tutorials/username-and-password/nextjs-app

サンプルコードを参考に、必要なコードを追加

```diff ts title="auth.ts"
  import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
  import { drizzle } from "drizzle-orm/d1";
  import { Lucia } from "lucia";
	import { db } from "./drizzle/db";
  import { sessionTable, userTable } from "./db/schema";

  export function initializeLucia() {
  	const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
-   return new Lucia(adapter);
+   return new Lucia(adapter, {
+     sessionCookie: {
+       expires: false,
+       attributes: {
+         secure: process.env.NODE_ENV === "production",
+       },
+     },
+     getUserAttributes: (attributes) => {
+       return {
+         // attributes has the type of DatabaseUserAttributes
+         username: attributes.username,
+       };
+     },
+   });
  }

  declare module "lucia" {
    interface Register {
      Lucia: ReturnType<typeof initializeLucia>;
+     DatabaseUserAttributes: DatabaseUserAttributes;
    }
  }
```

```ts title="types.ts"
type DatabaseUserAttributes = {
  username: string;
};
```

# 14

```diff ts title="auth.ts"
  import { getRequestContext } from "@cloudflare/next-on-pages";
  import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
  import { Lucia } from "lucia";
  import { cookies } from "next/headers";
  import { cache } from "react";
  import { db } from "./drizzle/db";
  import { sessionTable, userTable } from "./drizzle/schema";

  import type { Session, User } from "lucia";

  export function initializeLucia() {
    const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
    return new Lucia(adapter, {
      sessionCookie: {
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
      getUserAttributes: (attributes) => {
        return {
          // attributes has the type of DatabaseUserAttributes
          username: attributes.username,
        };
      },
    });
  }

+ export const validateRequest = cache(
+   async (): Promise<
+     { user: User; session: Session } | { user: null; session: null }
+   > => {
+     const { env } = getRequestContext();
+     const sessionId =
+       cookies().get(initializeLucia().sessionCookieName)?.value ?? null;
+     if (!sessionId) {
+       return {
+         user: null,
+         session: null,
+       };
+     }
+
+     const result = await initializeLucia().validateSession(sessionId);
+     // next.js throws when you attempt to set cookie when rendering page
+     try {
+       if (result.session && result.session.fresh) {
+         const sessionCookie = initializeLucia().createSessionCookie(
+           result.session.id
+         );
+         cookies().set(
+           sessionCookie.name,
+           sessionCookie.value,
+           sessionCookie.attributes
+         );
+       }
+       if (!result.session) {
+         const sessionCookie = initializeLucia().createBlankSessionCookie();
+         cookies().set(
+           sessionCookie.name,
+           sessionCookie.value,
+           sessionCookie.attributes
+         );
+       }
+     } catch {}
+     return result;
+   }
+ );

  declare module "lucia" {
    interface Register {
      Lucia: ReturnType<typeof initializeLucia>;
      DatabaseUserAttributes: DatabaseUserAttributes;
    }
  }
```
