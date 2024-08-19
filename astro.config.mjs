import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "TypeScriptでフルスタックエンジニア",
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
          label: "フルスタックエンジニアになるために",
          autogenerate: {
            directory: "fullstack",
          },
        },
        {
          label: "Cloudflare Workers",
          items: [
            {
              label: "OpenAI API+LangChainを使ったAPI作成の基礎",
              autogenerate: {
                directory: "workers/langchain-openai-base-api",
              },
            },
          ],
        },
      ],
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
