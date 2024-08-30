---
title: ユーザー登録機能
sidebar:
  order: 5
draft: false
---

## ユーザー登録フォーム

```ts title="app/sign-up/page.tsx"
import { initializeLucia } from "@/auth";
import { userTable } from "@/drizzle/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { generateIdFromEntropySize, Scrypt } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Page() {
  return (
    <>
      <h1>Create an account</h1>
      <form action={signup}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}
```

## サーバーアクション

```ts title="app/sign-up/action.ts"
"use server";

import { initializeLucia } from "@/auth";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { generateIdFromEntropySize, Scrypt } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await new Scrypt().hash(password);
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  await db.insert(userTable).values({
    id: userId,
    username: username,
    password_hash: passwordHash,
  });

  const session = await initializeLucia().createSession(userId, {});
  const sessionCookie = initializeLucia().createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
```
