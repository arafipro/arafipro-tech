import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import starlightBlog from "starlight-blog";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "TypeScriptでフルスタックエンジニア",
      plugins: [starlightBlog()],
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-M9Y1L3NSGP",
            async: true,
          },
        },
        {
          tag: "script",
          content: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-M9Y1L3NSGP');
`,
        },
        {
          tag: "script",
          attrs: {
            src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054344840815103",
            async: true,
            crossorigin: "anonymous",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "google-adsense-account",
            content: "ca-pub-2054344840815103",
          },
        },
      ],
      defaultLocale: "root",
      locales: {
        root: {
          label: "Japanese",
          lang: "ja",
        },
      },
      social: {
        github: "https://github.com/arafipro",
        "x.com": "https://x.com/arafipro",
        youtube: "https://youtube.com/@arafipro",
      },
      sidebar: [
        {
          label: "Auth.js(NextAuth)を学ぶロードマップ",
          link: "loadmap/auth",
        },
        {
          label: "Luciaを使って最低限の機能を実装する",
          autogenerate: {
            directory: "pages/lucia-auth-base-app",
          },
        },
        {
          label: "Auth.jsを使って実装した認証ボタンをカスタマイズする",
          autogenerate: {
            directory: "pages/auth-custom-app",
          },
        },
        {
          label: "OpenAI API+LangChainを使ったAPIを作る",
          autogenerate: {
            directory: "workers/langchain-openai-base-api",
          },
        },
        // {
        //   label: "プロンプトサンプル",
        //   autogenerate: {
        //     directory: "prompt-samples",
        //   },
        // },
      ],
      components: {
        Footer: "./src/components/ConditionalFooter.astro",
      },
      customCss: ["./src/tailwind.css", "./src/default.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
