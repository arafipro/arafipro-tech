---
title: トップページを変更
sidebar:
  order: 8
next: false
draft: false
---

## トップページに各ボタンを配置

```ts title="app/page.tsx"
import { validateRequest } from "@/auth";
import Link from "next/link";

export const runtime = "edge";
export default async function Home() {
	const { user } = await validateRequest();
  return (
		<main className="flex flex-col items-center gap-4">
      <h1>{user ? user.username : "No Login User"}</h1>
      <Link href="/sign-up">Sign Up</Link>
      <Link href="/sign-in">Login</Link>
      <Link href="/sign-out">Sign Out</Link>
    </main>
  );
}
```

## CSSを整理

```css title="app/globals.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```
