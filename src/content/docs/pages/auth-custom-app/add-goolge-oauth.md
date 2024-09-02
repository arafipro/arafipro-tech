---
title: Goolge認証を追加
sidebar:
  order: 4
prev: false
draft: true
---

## auth.ts

```diff ts title="auth.ts"
  import NextAuth from "next-auth";
  import GitHub from "next-auth/providers/github";
+ import Google from "next-auth/providers/google";
  
  export const { handlers, signIn, signOut, auth } = NextAuth({
-   providers: [GitHub],
+   providers: [GitHub, Google],
    pages: {
      signIn: "/signin",
    },
  });
```

## next.config.mjs

```diff js title="next.config.mjs"
  import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
  
  // Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
  // (when running the application with `next dev`), for more information see:
  // https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
  if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
  }
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "avatars.githubusercontent.com",
          protocol: "https",
        },
+       {
+         hostname: "lh3.googleusercontent.com",
+         protocol: "https",
+       },
      ],
    },
  };
  
  export default nextConfig;
```
