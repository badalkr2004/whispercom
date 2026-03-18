# Introduction

**whispercom** (`whis`) is a professional AI-powered git CLI built with [Ink](https://github.com/vadimdemedes/ink) (React for terminals) and the [Vercel AI SDK](https://sdk.vercel.ai/).

It eliminates the friction of writing good commit messages by analyzing your staged diff and generating [Conventional Commits](https://www.conventionalcommits.org/)-formatted suggestions — all inside a polished terminal UI.

## Why whispercom?

Writing good commit messages is important but tedious. Common approaches:
- **Write manually** — easy to forget scope, type, or body when rushing
- **Use a template** — still requires you to fill it in correctly
- **Skip it** — `fix stuff` commits that haunt you during code review

whispercom analyzes *what actually changed* in your diff and suggests semantically accurate, well-formatted messages. You pick, edit if needed, and commit — in seconds.

## Key Features

| Feature | Details |
|---------|---------|
| AI commit picker | 3 varied suggestions (high-level, specific, scope-focused) |
| Interactive staging | Stage/unstage files before committing |
| Commit graph browser | Colored ASCII graph with paginated history and diff preview |
| Fuzzy branch switcher | Live fuzzy filter across all local and remote branches |
| Provider wizard | Interactive setup that saves config to `~/.config/whispercom/config.json` |

## Tech Stack

- **[Ink](https://github.com/vadimdemedes/ink)** — React renderer for the terminal
- **[Vercel AI SDK](https://sdk.vercel.ai/)** — unified interface to 5 AI providers
- **[esbuild](https://esbuild.github.io/)** — transpiles JSX source to plain Node.js ESM

## Next Steps

- [Install whispercom →](/guide/getting-started)
- [Set up your AI provider →](/guide/providers)
- [Browse all commands →](/reference/commands)
