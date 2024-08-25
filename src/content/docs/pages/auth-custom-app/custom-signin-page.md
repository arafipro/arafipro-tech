---
title: サインインページをカスタマイズ
sidebar:
  order: 4
draft: true
---

まずは、サインインのページをカスタマイズします。

`signin/page.tsx`にコピーしたコードを作成します。

```diff ts title="signin/page.tsx"
  import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
  
  export default function page() {
    return (
      <form
        action={async () => {
          "use server";
　         await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" variant={"outline"}>
          Sign in
        </Button>
      </form>
    );
  }
```
