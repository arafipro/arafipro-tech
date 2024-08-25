---
title: サインインページを作成
sidebar:
  order: 3
draft: true
---

まずは、サインインのページを作成します。

`auth.ts`を開いて、`providers`プロパティの下に`pages`プロパティを追加します。
`pages`プロパティには、`signIn`プロパティを追加して、パス`signin`を指定します。
これで、`signIn`を実行すると、用意されているボタンは表示されずに、`signin/page.tsx`が呼び出されます。

```diff ts title="auth.ts"
  import NextAuth from "next-auth";
  import GitHub from "next-auth/providers/github";
  
  export const { handlers, signIn, signOut, auth } = NextAuth({
  	providers: [GitHub],
+ 	pages: {
+ 		signIn: "/signin",
+ 	}
  });
```

次は、実際に`signin/page.tsx`を作成します。
`rfc`と入力して、スニペットを呼び出して、`<div>`内の`page`を`signin page`に変更します。

```ts title="signin/page.tsx"
export default function page() {
  return <div>signin page</div>;
}
```

それでは、`Sign In`ボタンをクリックします。
すると、`signin page`と表示されました。
`signin/page.tsx`が呼び出されたことがわかります。
次は、`signin`の機能を`signin/page.tsx`に移行します。
`app/(main)/_components/signin-button.tsx`を開いて、`signIn`の`import`と`<form>`の部分をコピーします。

```ts title="app/(main)/_components/signin-button.tsx" {1,2,6-16}
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SigninButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit" variant={"outline"}>
        Sign in
      </Button>
    </form>
  );
}
```

`signin/page.tsx`にコピーしたコードを作成します。

```diff ts title="signin/page.tsx"
+ import { signIn } from "@/auth";
+ import { Button } from "@/components/ui/button";
  
  export default function page() {
-   return <div>signin page</div>;
+   return (
+     <form
+       action={async () => {
+         "use server";
+         await signIn();
+       }}
+     >
+       <Button type="submit" variant={"outline"}>
+         Sign in
+       </Button>
+     </form>
+   );
  }
```

また、`signIn`関数に2つの引数を渡します。
第1引数には、`provider`を指定します。
ここでは、`github`を指定して、`github`のサインイン機能を呼び出すように明示的に指定します。
第2引数には、`redirectTo`プロパティを追加して、リダイレクト先のパスを指定します。
ここでは、`/dashboard`を指定して、サインインができたら、ダッシュボードを開きます。

```diff ts title="signin/page.tsx"
  import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
  
  export default function page() {
    return (
      <form
        action={async () => {
          "use server";
-         await signIn();
+         await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" variant={"outline"}>
          Sign in
        </Button>
      </form>
    );
  }
```

`app/(main)/_components/signin-button.tsx`に戻って、`signin/page.tsx`を開くように変更します。

```diff ts title="app/(main)/_components/signin-button.tsx"
- import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
+ import Link from "next/link";

+ export default function SigninButton() {
+   return (
-     <form
-       className="flex justify-center items-center h-full"
-       action={async () => {
-         "use server";
-         await signIn();
-       }}
-     >
-       <Button type="submit" variant={"outline"}>
+       <Button type="submit" variant={"outline"} asChild>
-         Sign in
+         <Link href="/signin">Sign in</Link>
        </Button>
-     </form>
    );
  }
```
