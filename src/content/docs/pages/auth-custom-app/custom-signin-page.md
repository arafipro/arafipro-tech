---
title: サインインページをカスタマイズ
sidebar:
  order: 4
draft: true
---

サインインのページをカスタマイズします。
具体的には、GitHubのアイコンをボタンに追加して、視覚的にわかりやすくします。

## アイコンをダウンロード

GitHubのアイコンは以下のリンクから取得できます。
[https://github.com/logos](https://github.com/logos)
リンクからzipファイルをダウンロードして、`github-mark.svg`を`public`ディレクトリに保存します。

## アイコンを準備

アイコンを使えるように準備します。
Next.jsでは`<img>`の代わりに`Image`コンポーネントを使って画像を表示します。
そこで、`Image`をインポートしておきます。
また、`github-mark.svg`はローカルにあるので、`githubIcon`という名前でインポートします。

```diff ts title="signin/page.tsx"
  import { signIn } from "@/auth";
  import { Button } from "@/components/ui/button";
+ import githubIcon from "../../../public/github-mark.svg";
+ import Image from "next/image";
  
  export default function page() {
    return (
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
    );
  }
```

## アイコンを設置

アイコンを設置します。
`Sign In`の前に、`Image`コンポーネントを追加します。
`Image`コンポーネントには以下の4つのプロパティを追加します。

| プロパティ名 | 値              | 用途       |
| ------------ | --------------- | ---------- |
| `src`        | `{githubIcon}`  | ソース     |
| `alt`        | `"github icon"` | alt 属性   |
| `width`      | `{20}`          | 画像の幅   |
| `height`     | `{20}`          | 画像の高さ |

`src`プロパティには、`{githubIcon}`を指定します。
これは、ソースを指定します。
`alt`プロパティには、`"github icon"`を指定します。
これは、alt属性を指定します。
`width`プロパティには、`{20}`を指定します。
これは、画像の幅を指定します。
`height`プロパティには、`{20}`を指定します。
これは、画像の高さを指定します。

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
-       <Button type="submit" variant={"outline"}>
+       <Button type="submit" variant={"outline"} className="gap-2">
+ 				<Image
+ 					src={githubIcon}
+ 					alt="github icon"
+ 					width={20}
+ 					height={20}
+ 				/>
					Sign In
				</Button>
      </form>
    );
  }
```
