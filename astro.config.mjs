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
      ],
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
