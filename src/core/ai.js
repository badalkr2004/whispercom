import { generateText } from "ai";
import { PROVIDERS, getApiKey } from "./config.js";


const CONV_TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "chore",
  "ci",
  "build",
  "revert",
];

export async function generateCommitMessages(diff, count, cfg) {
  const provider = PROVIDERS[cfg.provider];
  if (!provider) throw new Error(`Unknown provider: ${cfg.provider}`);

  const apiKey = getApiKey(cfg.provider, cfg);
  if (!apiKey) {
    const envName = provider.envKey;
    throw new Error(
      `No API key found for ${provider.label}.\n` +
      `  • Set the ${envName} environment variable, or\n` +
      `  • Run \`whis configure\` to store a key in your config file.`,
    );
  }

  // Inject the api key into environment variables so SDK providers pick it up
  process.env[provider.envKey] = apiKey;

  const model = await provider.getModel(cfg.model, cfg);
  let text;
  try {
    ({ text } = await generateText({
      model,
      maxTokens: 2048,
      system: `You write git commit messages following Conventional Commits.
Format: <type>(<optional scope>): <description>
Types: ${CONV_TYPES.join(", ")}
Rules:
- Subject line ≤50 chars, imperative mood ("add" not "added")
- Scope: lowercase, one word or hyphenated
- Body: only when genuinely needed, ≤72 chars per line, explains WHAT and WHY
- You MUST only output a raw, valid JSON array of objects.`,
      prompt: `Analyze this diff. Return ONLY a valid JSON array. Do not include markdown codeblocks. Every object MUST have exactly these 3 string keys: "subject", "body", "reasoning".

Example format required:
[
  {
    "subject": "feat(scope): description here",
    "body": "optional body explaining why",
    "reasoning": "one sentence why"
  }
]

Generate exactly ${count} suggestions. Vary them:
- one high-level/impact-focused
- one specific (mentions files/functions)  
- one scope-focused

\`\`\`diff
${diff}
\`\`\``,
    }));

  } catch (e) {
    const msg = e?.message ?? String(e);
    // Surface API-level errors (wrong model ID, quota exceeded, bad base URL, etc.)
    throw new Error(
      `API error from ${provider.label}: ${msg}\n` +
      `  Check that the model ID "${cfg.model}" is correct for this provider.\n` +
      `  Run \`whis configure\` to change provider or model.`,
    );
  }

  // Robustly extract the JSON array, ignoring `<think>` blocks or markdown formatting
  const match = text.match(/\[[\s\S]*\]/);
  const jsonString = match ? match[0] : text;

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    throw new Error(
      `AI returned unparseable output. Try again or switch to a different model.\n\nRaw output:\n${text}`,
    );
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(
      "AI returned an empty or invalid suggestion list. Try again.",
    );
  }

  return parsed.map((s) => ({ ...s, body: s.body || "" }));
}
