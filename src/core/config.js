import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export const CONFIG_DIR = path.join(os.homedir(), ".config", "whispercom");
export const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export const PROVIDERS = {
  anthropic: {
    label: "Anthropic",
    envKey: "ANTHROPIC_API_KEY",
    models: [
      { id: "claude-opus-4-5", label: "Claude Opus 4.5", note: "most capable" },
      { id: "claude-sonnet-4-5", label: "Claude Sonnet 4.5", note: "balanced" },
      { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", note: "fastest" },
    ],
    async getModel(id, cfg) {
      const { anthropic } = await import("@ai-sdk/anthropic");
      return anthropic(id);
    },
  },
  openai: {
    label: "OpenAI",
    envKey: "OPENAI_API_KEY",
    models: [
      { id: "gpt-4o", label: "GPT-4o", note: "most capable" },
      { id: "gpt-4o-mini", label: "GPT-4o mini", note: "balanced" },
      { id: "o3-mini", label: "o3-mini", note: "reasoning" },
    ],
    async getModel(id, cfg) {
      const { openai } = await import("@ai-sdk/openai");
      return openai(id);
    },
  },
  google: {
    label: "Google Gemini",
    envKey: "GOOGLE_GENERATIVE_AI_API_KEY",
    models: [
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", note: "fast" },
      { id: "gemini-2.5-pro-exp-03-25", label: "Gemini 2.5 Pro", note: "most capable" },
      { id: "gemini-2.0-flash-thinking-exp", label: "Gemini 2.0 Thinking", note: "reasoning" },
    ],
    async getModel(id, cfg) {
      const { google } = await import("@ai-sdk/google");
      return google(id);
    },
  },
  mistral: {
    label: "Mistral AI",
    envKey: "MISTRAL_API_KEY",
    models: [
      { id: "mistral-large-latest", label: "Mistral Large", note: "most capable" },
      { id: "mistral-small-latest", label: "Mistral Small", note: "balanced" },
      { id: "codestral-latest", label: "Codestral", note: "code-optimized" },
    ],
    async getModel(id, cfg) {
      const { mistral } = await import("@ai-sdk/mistral");
      return mistral(id);
    },
  },
  groq: {
    label: "Groq",
    envKey: "GROQ_API_KEY",
    models: [
      { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B", note: "versatile" },
      { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B", note: "fastest" },
      { id: "deepseek-r1-distill-llama-70b", label: "DeepSeek R1 70B", note: "reasoning" },
    ],
    async getModel(id, cfg) {
      const { groq } = await import("@ai-sdk/groq");
      return groq(id);
    },
  },
  custom: {
    label: "Custom (OpenAI-compatible)",
    envKey: "OPENAI_API_KEY",
    // No preset models — user always enters model ID manually
    models: [],
    async getModel(id, cfg) {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const client = createOpenAI({
        baseURL: cfg.baseUrl || "https://openrouter.ai/api/v1",
        apiKey: getApiKey("custom", cfg),
      });
      return client(id);
    },
  },
};

export function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE))
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch (err) {
    process.stderr.write(
      `\x1b[33m⚠  Could not parse config file (${CONFIG_FILE}): ${err.message}\n   Re-run \`whis configure\` to reset it.\x1b[0m\n`,
    );
  }
  return null;
}

export function saveConfig(cfg) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
}

/**
 * Resolve API key: env var takes priority over stored config key.
 * @param {string} providerKey
 * @param {object} [cfg]
 * @returns {string|null}
 */
export function getApiKey(providerKey, cfg) {
  const p = PROVIDERS[providerKey];
  if (!p) return null;
  return process.env[p.envKey] || cfg?.apiKey || null;
}

/**
 * Returns true if a key is available from either the env or the stored config.
 */
export function hasApiKey(providerKey, cfg) {
  return !!getApiKey(providerKey, cfg);
}
