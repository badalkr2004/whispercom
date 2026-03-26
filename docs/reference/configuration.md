# Configuration File

whispercom stores your provider and model preference in a JSON file:

```
~/.config/whispercom/config.json
```

## Schema

```json
{
  "provider": "custom",
  "model": "openai/gpt-4o",
  "apiKey": "sk-or-v1-...",
  "baseUrl": "https://openrouter.ai/api/v1"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `provider` | `string` | One of: `anthropic`, `openai`, `google`, `mistral`, `groq`, `custom` |
| `model` | `string` | A model ID valid for the selected provider |
| `apiKey` | `string` | *(Optional)* The API key for the provider. If omitted, the environment variable is used. |
| `baseUrl` | `string` | *(Optional)* The base URL, only used if the `provider` is set to `custom`. |

## Editing Manually

You can edit the file directly in any text editor instead of using `whis configure`.

```bash
# macOS / Linux
nano ~/.config/whispercom/config.json

# Windows
notepad $env:USERPROFILE\.config\whispercom\config.json
```

## Resetting Configuration

Delete the config file to force a fresh setup on the next `whis` run:

```bash
rm ~/.config/whispercom/config.json
```

## Valid Provider / Model Combinations

| `provider` | Valid `model` values |
|------------|---------------------|
| `anthropic` | `claude-opus-4-5`, `claude-sonnet-4-5`, `claude-haiku-4-5`, *or any typed ID* |
| `openai` | `gpt-4o`, `gpt-4o-mini`, `o3-mini`, *or any typed ID* |
| `google` | `gemini-2.5-pro-exp-03-25`, `gemini-2.0-flash`, `gemini-2.0-flash-thinking-exp`, *or any typed ID* |
| `mistral` | `mistral-large-latest`, `mistral-small-latest`, `codestral-latest`, *or any typed ID* |
| `groq` | `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `deepseek-r1-distill-llama-70b`, *or any typed ID* |
| `custom` | *Any OpenAI-compatible model ID (no presets)* |

::: warning
If you specify an invalid model ID, whispercom will pass it directly to the provider API and you'll see an error from the provider. Run `whis configure` to pick a valid model from the list.
:::
