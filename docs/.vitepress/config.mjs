import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../package.json"), "utf8")
);

export default defineConfig({
  title: "whispercom",
  description: "Professional AI-powered git CLI for conventional commits",
  base: "/",

  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    ["meta", { name: "theme-color", content: "#8b5cf6" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "whispercom — AI Git CLI" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Professional AI-powered git CLI for conventional commits",
      },
    ],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    ],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
    ],
  ],

  themeConfig: {
    logo: { src: "/logo.svg", alt: "whispercom" },

    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Reference", link: "/reference/commands" },
      { text: "Providers", link: "/guide/providers" },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: "Changelog",
            link: "https://github.com/badalkr2004/whispercom/releases",
          },
          {
            text: "npm",
            link: "https://www.npmjs.com/package/whispercom",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          { text: "Installation", link: "/guide/getting-started" },
          { text: "Providers & API Keys", link: "/guide/providers" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Commands", link: "/reference/commands" },
          { text: "TUI Controls", link: "/reference/tui-controls" },
          { text: "Configuration File", link: "/reference/configuration" },
        ],
      },
      {
        text: "Contributing",
        items: [{ text: "Contributing Guide", link: "/contributing" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/badalkr2004/whispercom" },
      { icon: "npm", link: "https://www.npmjs.com/package/whispercom" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 badalkr2004",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/badalkr2004/whispercom/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
  },

  markdown: {
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    lineNumbers: true,
  },
});
