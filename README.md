# commit-ai v3

Professional AI-powered git CLI built with **Ink** (React for terminals) and the **Vercel AI SDK**.

## Features

| Command                    | What it does                                         |
| -------------------------- | ---------------------------------------------------- |
| `commit-ai commit`         | AI commit message picker with Ink TUI                |
| `commit-ai commit --stage` | Interactive file staging → commit                    |
| `commit-ai log`            | Full commit history browser with colored ASCII graph |
| `commit-ai branch`         | Fuzzy branch switcher                                |
| `commit-ai configure`      | Provider + model setup wizard                        |

## Supported AI providers

| Provider      | Env key                        |
| ------------- | ------------------------------ |
| Anthropic     | `ANTHROPIC_API_KEY`            |
| OpenAI        | `OPENAI_API_KEY`               |
| Google Gemini | `GOOGLE_GENERATIVE_AI_API_KEY` |
| Mistral AI    | `MISTRAL_API_KEY`              |
| Groq          | `GROQ_API_KEY`                 |

## Install

```bash
npm install whispercom
npm install -g whispercom
```

## Setup

```bash
# Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# Configure provider + model (saved to ~/.config/commit-ai/config.json)
commit-ai configure
```

## Usage

```bash
# Generate AI commit message for staged changes
git add -p
commit-ai

# Stage files interactively, then generate
commit-ai --stage

# Diff against HEAD instead
commit-ai --head

# Get 5 suggestions
commit-ai --count 5

# Browse commit graph
commit-ai log

# Switch branches
commit-ai branch
```

## TUI Controls

### Commit picker

| Key            | Action                |
| -------------- | --------------------- |
| `↑↓` / `j` `k` | Navigate              |
| `1`–`9`        | Jump to suggestion    |
| `enter`        | Confirm + commit      |
| `e`            | Edit selected message |
| `c`            | Switch provider/model |
| `q`            | Quit                  |

### Log / graph browser

| Key             | Action           |
| --------------- | ---------------- |
| `↑↓`            | Navigate commits |
| `enter`         | Show diff        |
| `PgUp` / `PgDn` | Page             |
| `esc` / `b`     | Back             |
| `q`             | Quit             |

### File staging

| Key     | Action            |
| ------- | ----------------- |
| `space` | Toggle file       |
| `a`     | Toggle all        |
| `c`     | Proceed to commit |
| `q`     | Cancel            |

### Branch switcher

| Key     | Action        |
| ------- | ------------- |
| type    | Fuzzy filter  |
| `↑↓`    | Navigate      |
| `enter` | Switch branch |
| `esc`   | Cancel        |
