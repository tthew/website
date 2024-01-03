import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: "https://tthew.berlin",
  integrations: [
    mdx(),
    sitemap(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
  },

  // experimental: { assets: true },
});
