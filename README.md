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

## Install

```bash
npm install -g whispercom
```

## Setup

```bash
# Set your API key (example: Anthropic)
export ANTHROPIC_API_KEY=sk-ant-...

# Configure provider + model (saved to ~/.config/whispercom/config.json)
whis configure
```

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
| `↑↓`    | Navigate          |
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

## Configuration file

Settings are stored in `~/.config/whispercom/config.json`:

```json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-5"
}
```

Run `whis configure` at any time to change provider or model.

## Contributing

1. Clone the repo  
2. Run `npm install`  
3. Run locally: `node src/index.js --help`  

To add a new AI provider, add an entry to the `PROVIDERS` map in `src/core/config.js`.

## License

MIT
