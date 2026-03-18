# Getting Started

## Requirements

- **Node.js** ≥ 18.0.0
- **Git** installed and available in your `PATH`
- An API key for at least one [supported provider](/guide/providers)

## Installation

Install whispercom globally from npm:

```bash
npm install -g whispercom
```

Verify the install:

```bash
whis --help
```

## First-Time Setup

Run the interactive configuration wizard to choose your AI provider and model:

```bash
whis configure
```

The wizard will show all supported providers and highlight which ones have an API key already set in your environment. Select your provider, then select a model — your choice is saved to `~/.config/whispercom/config.json`.

::: tip Setting your API key
Before running `whis configure`, export your API key so the wizard can detect it:

```bash
# Bash / Zsh
export ANTHROPIC_API_KEY=sk-ant-...

# PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

See [Providers & API Keys](/guide/providers) for all supported keys.
:::

## Your First Commit

```bash
# Stage your changes as usual
git add -p

# Let whispercom generate commit messages from the diff
whis
```

whispercom analyzes your staged diff, calls the AI, and presents a commit picker TUI. Navigate with arrow keys (or `j`/`k`), press `Enter` to commit.

## Next Steps

- [Providers & API Keys →](/guide/providers)
- [All Commands →](/reference/commands)
- [TUI Controls →](/reference/tui-controls)
