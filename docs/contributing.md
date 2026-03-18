# Contributing

Thank you for wanting to contribute to whispercom! The project is intentionally small — a few core modules and a set of Ink UI components.

## Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/badalkr2004/whispercom.git
cd whispercom

# 2. Install dependencies
bun install

# 3. Build (compiles JSX → dist/)
bun run build

# 4. Test locally
node dist/index.js --help
```

## Project Structure

```
whispercom/
├── src/
│   ├── index.js          ← CLI entry point + arg parser
│   ├── commands/
│   │   ├── commit.js     ← whis commit
│   │   ├── branch.js     ← whis branch
│   │   ├── config.js     ← whis configure
│   │   └── log.js        ← whis log
│   ├── core/
│   │   ├── ai.js         ← AI SDK integration + prompt
│   │   ├── config.js     ← config file read/write + PROVIDERS map
│   │   ├── git.js        ← git command wrappers
│   │   └── theme.js      ← colors, symbols, shared constants
│   └── ui/
│       ├── BranchSwitcher.js
│       ├── CommitGraph.js
│       ├── CommitPicker.js
│       ├── ConfigWizard.js
│       ├── FileStagingUI.js
│       └── StatusBar.js
├── docs/                 ← this documentation site (VitePress)
├── build.mjs             ← esbuild JSX transpiler script
└── package.json
```

## Adding a New AI Provider

1. **Add a new entry** to the `PROVIDERS` object in `src/core/config.js`:

```js
mynewprovider: {
  label: "My Provider",
  envKey: "MY_PROVIDER_API_KEY",
  models: [
    { id: "model-id", label: "Model Name", note: "fast" },
  ],
  async getModel(id) {
    const { myProvider } = await import("@ai-sdk/my-provider");
    return myProvider(id);
  },
},
```

2. **Install the AI SDK adapter**:

```bash
bun add @ai-sdk/my-provider
```

3. **Rebuild**:

```bash
bun run build
```

The new provider will automatically appear in `whis configure` — no other changes needed.

## Conventional Commits

whispercom follows Conventional Commits for its own commit history (naturally!). Use `whis` to generate your own commit messages when contributing.

## Opening a PR

- Fork the repo and create a feature branch
- Make your changes in `src/`
- Run `bun run build` and test with `node dist/index.js`
- Open a PR with a clear description of what changed and why

## Reporting Issues

Use [GitHub Issues](https://github.com/badalkr2004/whispercom/issues) for bug reports and feature requests.
