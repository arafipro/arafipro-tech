---
title: ログアウト機能
sidebar:
  order: 7
draft: false
---

## ログアウトボタン

```ts title="app/sign-out/page.tsx"
import { initializeLucia, validateRequest } from "@/auth";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page() {
  return (
    <form action={logout}>
      <button>Sign out</button>
    </form>
  );
}
```

## サーバーアクション

```ts title="app/sign-out/action.ts"
"use server";

import { initializeLucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await initializeLucia().invalidateSession(session.id);

  const sessionCookie = initializeLucia().createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/sign-in");
}
```
