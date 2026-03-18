import { defineConfig } from "vitepress";

export default defineConfig({
  title: "whispercom",
  description: "Professional AI-powered git CLI for conventional commits",
  base: "/whispercom/",

  head: [
    ["link", { rel: "icon", href: "/whispercom/favicon.svg", type: "image/svg+xml" }],
    ["meta", { name: "theme-color", content: "#7c3aed" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "whispercom — AI Git CLI" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Professional AI-powered git CLI for conventional commits",
      },
    ],
  ],

  themeConfig: {
    logo: { src: "/logo.svg", alt: "whispercom" },

    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Reference", link: "/reference/commands" },
      { text: "Providers", link: "/guide/providers" },
      {
        text: "v1.0.0",
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
      pattern:
        "https://github.com/badalkr2004/whispercom/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "one-dark-pro",
    },
  },
});
