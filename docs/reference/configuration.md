# Configuration File

whispercom stores your provider and model preference in a JSON file:

```
~/.config/whispercom/config.json
```

## Schema

```json
{
  "provider": "groq",
  "model": "llama-3.3-70b-versatile"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `provider` | `string` | One of: `anthropic`, `openai`, `google`, `mistral`, `groq` |
| `model` | `string` | A model ID valid for the selected provider |

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
| `anthropic` | `claude-opus-4-5`, `claude-sonnet-4-5`, `claude-haiku-4-5` |
| `openai` | `gpt-4o`, `gpt-4o-mini`, `o3-mini` |
| `google` | `gemini-2.0-flash`, `gemini-2.0-flash-thinking-exp`, `gemini-1.5-pro` |
| `mistral` | `mistral-large-latest`, `mistral-small-latest`, `codestral-latest` |
| `groq` | `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `deepseek-r1-distill-llama-70b` |

::: warning
If you specify an invalid model ID, whispercom will pass it directly to the provider API and you'll see an error from the provider. Run `whis configure` to pick a valid model from the list.
:::
