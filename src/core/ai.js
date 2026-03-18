import { generateText } from "ai";
import { PROVIDERS } from "./config.js";

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

  const apiKey = process.env[provider.envKey];
  if (!apiKey)
    throw new Error(`${provider.envKey} is not set in your environment.`);

  const model = await provider.getModel(cfg.model);

  const { text } = await generateText({
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
  });

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
      "AI returned unparseable output. Try again or switch to a different model."
    );
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(
      "AI returned an empty or invalid suggestion list. Try again."
    );
  }

  return parsed.map((s) => ({ ...s, body: s.body || "" }));
}
