---
title: サインインページを作成
sidebar:
  order: 3
draft: true
---

新たに、サインインページを作成します。

## `auth.ts`を変更

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

## サインインページを作成

`app`ディレクトリに`signin/page.tsx`を作成します。  
`rfc`と入力して、スニペットを呼び出して、`<div>`内の`page`を`signin page`に変更します。

```ts title="app/signin/page.tsx"
export default function page() {
	return <div>signin page</div>;
}
```

それでは、`Sign In`ボタンをクリックします。  
すると、`signin page`と表示されました。  
`signin/page.tsx`が呼び出されたことがわかります。

## サインインページに機能を移行

`signin`の機能を`signin/page.tsx`に移行します。  
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
        Sign In
      </Button>
    </form>
  );
}
```

`signin/page.tsx`に戻って、`<div>`を選択して、コピーしたコードを貼り付けます。

```diff ts title="app/signin/page.tsx"
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

次に、`signIn`関数に2つの引数を渡します。  
第1引数には、`provider`を指定します。  
ここでは、`github`を指定して、`github`のサインイン機能を呼び出すように明示的に指定します。  
第2引数には、`redirectTo`プロパティを追加して、リダイレクト先のパスを指定します。  
ここでは、`/dashboard`を指定して、サインインができたら、ダッシュボードを開きます。

```diff ts title="app/signin/page.tsx"
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

## SigninButtonコンポーネントを修正

`app/(main)/_components/signin-button.tsx`に戻って、`signin/page.tsx`を開くように変更します。

```diff ts title="app/(main)/_components/signin-button.tsx"
- import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
+ import Link from "next/link";

+ export default function SigninButton() {
+   return (
-     <form
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

## アイコンの位置を画面中央に移動

```diff ts title="signin/page.tsx"
  import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
  
  export default function page() {
    return (
+ 		<div className="flex justify-center items-center h-screen">
        <form								
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <Button type="submit" variant={"outline"}>
			  		Sign In
			  	</Button>
        </form>
+     </div>
    );
  }
```

## React Iconsを導入

React Iconsをインストールします。
ターミナルを開いて、以下のコマンドを実行します。

```
bun add react-icons
```

## アイコンを設置

アイコンを設置します。
`Sign In`の前に、`FaGithub`コンポーネントを追加します。
`FaGithub`コンポーネントに`size`プロパティを追加します。
`size`プロパティには、`20`を指定します。

```diff ts title="signin/page.tsx"
  import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
+ import { FaGithub } from "react-icons/fa";
  
  export default function page() {
    return (
　 		<div className="flex justify-center items-center h-screen">
        <form								
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
-         <Button type="submit" variant={"outline"}>
+         <Button type="submit" variant={"outline"} className="gap-2">
+           <FaGithub size={20} />
			  		Sign In
			  	</Button>
        </form>
      </div>
    );
  }
```
