# whispercom

![npm](https://img.shields.io/npm/v/whispercom)
![license](https://img.shields.io/npm/l/whispercom)
![node](https://img.shields.io/node/v/whispercom)

Professional AI-powered git CLI built with **Ink** (React for terminals) and the **Vercel AI SDK**.

## Features

| Command               | What it does                                         |
| --------------------- | ---------------------------------------------------- |
| `whis commit`         | AI commit message picker with Ink TUI                |
| `whis commit --stage` | Interactive file staging → commit                    |
| `whis log`            | Full commit history browser with colored ASCII graph |
| `whis branch`         | Fuzzy branch switcher                                |
| `whis configure`      | Provider + model setup wizard                        |

## Supported AI providers

| Provider      | Env key                        |
| ------------- | ------------------------------ |
| Anthropic     | `ANTHROPIC_API_KEY`            |
| OpenAI        | `OPENAI_API_KEY`               |
| Google Gemini | `GOOGLE_GENERATIVE_AI_API_KEY` |
| Mistral AI    | `MISTRAL_API_KEY`              |
| Groq          | `GROQ_API_KEY`                 |
| Custom        | Configured via `whis configure`|

## Install

```bash
npm install -g whispercom
```

## Setup

```bash
# Configure your AI provider, model, and API key
# (Key safely stored in ~/.config/whispercom/config.json)
whis configure
```

Alternatively, set your API key as an environment variable (e.g., `export GROQ_API_KEY=gsk_...`). Environment variables always override stored keys.

## Usage

```bash
# Generate AI commit message for staged changes
git add -p
whis

# Stage files interactively, then generate
whis --stage

# Diff against HEAD instead
whis --head

# Get 5 suggestions
whis --count 5

# Browse commit graph
whis log

# Switch branches
whis branch

# Check version
whis --version
```

## TUI Controls

### Commit picker

| Key            | Action                |
| -------------- | --------------------- |
| `↑↓` / `j` `k` | Navigate              |
| `1`–`9`        | Jump to suggestion    |
| `enter`        | Confirm + commit      |
| `e`            | Edit selected subject |
| `b`            | Edit selected body    |
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
| `↑↓`    | Navigate          |
| `space` | Toggle file       |
| `a`     | Toggle all        |
| `c`     | Proceed to commit |
| `q`     | Cancel            |

### Branch switcher

| Key       | Action                       |
| --------- | ---------------------------- |
| type      | Fuzzy filter (Filter mode)   |
| `Tab`     | Toggle Navigate/Filter mode  |
| `j` / `k` | Navigate (Navigate mode)     |
| `enter`   | Switch branch                |
| `PgUp/Dn` | Page branches                |
| `esc`     | Cancel                       |

## Configuration file

Settings are stored in `~/.config/whispercom/config.json`:

```json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-5",
  "apiKey": "sk-ant-...",
  "baseUrl": "https://openrouter.ai/api/v1" 
}
```

- **`apiKey`** is optional (you can use environment variables instead).
- **`baseUrl`** is only used when the "Custom (OpenAI-compatible)" provider is selected.
- **`model`** can be any valid model ID (you can type it manually in `whis configure`).

Run `whis configure` at any time to safely update these settings.

## Contributing

1. Clone the repo  
2. Run `npm install`  
3. Run locally: `node src/index.js --help`  

To add a new AI provider, add an entry to the `PROVIDERS` map in `src/core/config.js`.

## License

MIT
