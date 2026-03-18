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
      {
        id: "claude-opus-4-5",
        label: "Claude Opus 4.5",
        note: "most capable",
      },
      {
        id: "claude-sonnet-4-5",
        label: "Claude Sonnet 4.5",
        note: "balanced",
      },
      {
        id: "claude-haiku-4-5",
        label: "Claude Haiku 4.5",
        note: "fastest",
      },
    ],
    async getModel(id) {
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
    async getModel(id) {
      const { openai } = await import("@ai-sdk/openai");
      return openai(id);
    },
  },
  google: {
    label: "Google Gemini",
    envKey: "GOOGLE_GENERATIVE_AI_API_KEY",
    models: [
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", note: "fast" },
      {
        id: "gemini-2.0-flash-thinking-exp",
        label: "Gemini 2.0 Thinking",
        note: "reasoning",
      },
      { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", note: "capable" },
    ],
    async getModel(id) {
      const { google } = await import("@ai-sdk/google");
      return google(id);
    },
  },
  mistral: {
    label: "Mistral AI",
    envKey: "MISTRAL_API_KEY",
    models: [
      {
        id: "mistral-large-latest",
        label: "Mistral Large",
        note: "most capable",
      },
      { id: "mistral-small-latest", label: "Mistral Small", note: "balanced" },
      { id: "codestral-latest", label: "Codestral", note: "code-optimized" },
    ],
    async getModel(id) {
      const { mistral } = await import("@ai-sdk/mistral");
      return mistral(id);
    },
  },
  groq: {
    label: "Groq",
    envKey: "GROQ_API_KEY",
    models: [
      {
        id: "llama-3.3-70b-versatile",
        label: "Llama 3.3 70B",
        note: "versatile",
      },
      { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B", note: "fastest" },
      {
        id: "deepseek-r1-distill-llama-70b",
        label: "DeepSeek R1 70B",
        note: "reasoning",
      },
    ],
    async getModel(id) {
      const { groq } = await import("@ai-sdk/groq");
      return groq(id);
    },
  },
};

export function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE))
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {}
  return null;
}

export function saveConfig(cfg) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
}

export function hasApiKey(providerKey) {
  const p = PROVIDERS[providerKey];
  return p ? !!process.env[p.envKey] : false;
}
