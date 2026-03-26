import { generateText } from "ai";
import { PROVIDERS, getApiKey } from "./config.js";
import fs from 'fs'

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
  fs.appendFileSync('debug.txt', `API Key is: ${apiKey}\n`);
  if (!apiKey) {
    const envName = provider.envKey;
    throw new Error(
      `No API key found for ${provider.label}.\n` +
      `  • Set the ${envName} environment variable, or\n` +
      `  • Run \`whis configure\` to store a key in your config file.`,
    );
  }

  const model = await provider.getModel(cfg.model, cfg);
  fs.appendFileSync('debug.txt', `model: ${JSON.stringify(model)}\n`);

  let text;
  try {
    ({ text } = await generateText({
      model,
      maxTokens: 1024,
      system: `You write git commit messages following Conventional Commits.
Format: <type>(<optional scope>): <description>
Types: ${CONV_TYPES.join(", ")}
Rules:
- Subject line ≤50 chars, imperative mood ("add" not "added")
- Scope: lowercase, one word or hyphenated
- Body: only when genuinely needed, ≤72 chars per line, explains WHAT and WHY`,
      prompt: `Analyze this diff. Return ONLY a raw JSON array, no markdown, no commentary:
[{"subject":"feat(scope): description","body":"optional body or empty string","reasoning":"one sentence why"}]

Generate exactly ${count} suggestions. Vary them:
- one high-level/impact-focused
- one specific (mentions files/functions)  
- one scope-focused

\`\`\`diff
${diff}
\`\`\``,
    }));

    fs.appendFileSync('debug.txt', `Ai response: ${text}\n`);

  } catch (e) {
    const msg = e?.message ?? String(e);
    // Surface API-level errors (wrong model ID, quota exceeded, bad base URL, etc.)
    throw new Error(
      `API error from ${provider.label}: ${msg}\n` +
      `  Check that the model ID "${cfg.model}" is correct for this provider.\n` +
      `  Run \`whis configure\` to change provider or model.`,
    );
  }

  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `AI returned unparseable output. Try again or switch to a different model.`,
    );
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(
      "AI returned an empty or invalid suggestion list. Try again.",
    );
  }

  return parsed.map((s) => ({ ...s, body: s.body || "" }));
}
