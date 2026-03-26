# Providers & API Keys

whispercom supports 5 AI providers via the [Vercel AI SDK](https://sdk.vercel.ai/). You only need **one** provider set up to use whispercom.

## Supported Providers

| Provider | Env Variable | Best For |
|----------|-------------|----------|
| Anthropic     | `ANTHROPIC_API_KEY`            | Quality, instruction-following    |
| OpenAI        | `OPENAI_API_KEY`               | General purpose                   |
| Google Gemini | `GOOGLE_GENERATIVE_AI_API_KEY` | Fast, free tier available         |
| Mistral AI    | `MISTRAL_API_KEY`              | European users, Codestral for code|
| Groq          | `GROQ_API_KEY`                 | Fastest inference (free tier)     |
| Custom        | Configured via `whis configure`| OpenRouter, Nebius, LM Studio     |

## Setting Your API Key

The easiest way to set your API key is by running:

```bash
whis configure
```

The wizard will prompt you for your API key and securely save it to `~/.config/whispercom/config.json`.

::: tip Environment Variables
If you prefer not to store keys in the config file, you can use environment variables. These will **always override** stored keys:

::: code-group

```bash [Bash / Zsh]
export ANTHROPIC_API_KEY=sk-ant-...
# Add to ~/.bashrc or ~/.zshrc to persist
```

```powershell [PowerShell]
$env:ANTHROPIC_API_KEY = "sk-ant-..."
# To persist: add to your $PROFILE
```

```bash [Fish]
set -x ANTHROPIC_API_KEY sk-ant-...
# To persist: set -Ux ANTHROPIC_API_KEY sk-ant-...
```

:::
:::

## Available Models

All providers include a **preset list** of recommended models. 

If the model you want to use isn't in the list (or a newer version was just released), simply select **`[ + Enter model ID manually ]`** at the bottom of the list in `whis configure` to type in the exact model ID.

### Anthropic

| Model | ID | Note |
|-------|----|------|
| Claude Opus 4.5 | `claude-opus-4-5` | Most capable |
| Claude Sonnet 4.5 | `claude-sonnet-4-5` | Balanced ✨ recommended |
| Claude Haiku 4.5 | `claude-haiku-4-5` | Fastest |

### OpenAI

| Model | ID | Note |
|-------|----|------|
| GPT-4o | `gpt-4o` | Most capable |
| GPT-4o mini | `gpt-4o-mini` | Balanced |
| o3-mini | `o3-mini` | Reasoning |

### Google Gemini

| Model | ID | Note |
|-------|----|------|
| Gemini 2.5 Pro | `gemini-2.5-pro-exp-03-25` | Most capable |
| Gemini 2.0 Flash | `gemini-2.0-flash` | Fast ✨ recommended |
| Gemini 2.0 Thinking | `gemini-2.0-flash-thinking-exp` | Reasoning |

### Mistral AI

| Model | ID | Note |
|-------|----|------|
| Mistral Large | `mistral-large-latest` | Most capable |
| Mistral Small | `mistral-small-latest` | Balanced |
| Codestral | `codestral-latest` | Code-optimized |

### Groq

| Model | ID | Note |
|-------|----|------|
| Llama 3.3 70B | `llama-3.3-70b-versatile` | Versatile ✨ recommended |
| Llama 3.1 8B | `llama-3.1-8b-instant` | Fastest |
| DeepSeek R1 70B | `deepseek-r1-distill-llama-70b` | Reasoning |

### Custom (OpenAI-compatible)

You can use third-party API providers that are compatible with the OpenAI API format (like OpenRouter, Nebius, or LM Studio).

1. Run `whis configure`
2. Select **Custom (OpenAI-compatible)**
3. Type the **Model ID** (e.g. `anthropic/claude-3.5-sonnet`)
4. Paste your **API Key**
5. Enter the **Base URL** (e.g. `https://openrouter.ai/api/v1`)

## Switching Providers

Run the configure wizard at any time to switch provider or model:

```bash
whis configure
```

Or press `c` inside the commit picker to reconfigure without leaving the flow.

## Getting API Keys

| Provider | Sign-up page |
|----------|-------------|
| Anthropic | [console.anthropic.com](https://console.anthropic.com/) |
| OpenAI | [platform.openai.com](https://platform.openai.com/) |
| Google | [aistudio.google.com](https://aistudio.google.com/) |
| Mistral | [console.mistral.ai](https://console.mistral.ai/) |
| Groq | [console.groq.com](https://console.groq.com/) |
