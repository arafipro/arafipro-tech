---
title: レイアウトの変更
sidebar:
  order: 5
draft: true
---

TODO
- レイアウトの変更
- signin/page.tsxからヘッダーの表示を無くす

このままでは、ログイン画面にもヘッダーが表示されます。
そこで、アプリ全体のレイアウトを修正します。

現状、`(main)`ディレクトリの`layout.tsx`でヘッダーコンポーネントを配置しています。
よって、`signin`ディレクトリ配下のページにも、ヘッダーが表示されるのようになります。

```ts title="app/(main)/layout.tsx"
import Header from "./_components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container mx-auto">{children}</main>;
}
```

そこで、ヘッダーを表示するページと表示しないページをグループ分けして、それぞれに`layout.tsx`を作成してレイアウトを設定します。
具体的には、新たにグループを作成して、`signin`ディレクトリとそれ以外のディレクトリとファイルを分けます。

まずは、`(main)`ディレクトリの中に、新たに`(home)`ディレクトリを作成します。
そして、`signin`ディレクトリ以外の他のディレクトリとファイルを`(home)`ディレクトリに格納します。
また、`layout.tsx`の`MainLayout`を`HomeLayout`に変更します。

```diff ts title="app/(home)/layout.tsx"
  import Header from "./_components/header";

- export default function MainLayout({
+ export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <Header />
        <main className="container mx-auto">{children}</main>
      </>
    );
  }
```

次に、`signin`ディレクトリの中に、`(home)`ディレクトリに格納した`layout.tsx`をコピペします。

コピペした`layout.tsx`を編集します。
まずは、`HomeLayout`を`AdminLayout`に変更します。
次に、`<Header />`とインポートを削除します。
最後に、`<main>`の`className`を変更します。

```diff ts title="app/signin/layout.tsx"
- import Header from "./_components/header";

- export default function HomeLayout({
+ export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
-   <>
-     <Header />
-     <main className="container mx-auto">
+     <main className="flex justify-center items-center h-screen">
				{children}
  		</main>
-   </>
  }
```

これで、ヘッダーがなくなり、ボタンが画面中央に配置されます。
