import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "TypeScriptでフルスタックエンジニア",
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
