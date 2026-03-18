

const HELP = `
\x1b[36m\x1b[1mwhis\x1b[0m v1.0.0  —  professional AI git CLI

\x1b[1mCommands:\x1b[0m
  \x1b[33mcommit\x1b[0m             Generate AI commit message (default)
  \x1b[33mlog\x1b[0m                Browse commit history + graph
  \x1b[33mbranch\x1b[0m             Fuzzy branch switcher
  \x1b[33mconfigure\x1b[0m          Set provider + model

\x1b[1mCommit flags:\x1b[0m
  \x1b[33m--stage\x1b[0m / \x1b[33m-s\x1b[0m        Interactive file staging before commit
  \x1b[33m--head\x1b[0m             Diff against HEAD (includes staged)
  \x1b[33m--count\x1b[0m \x1b[90m<n>\x1b[0m        Number of suggestions \x1b[90m(default: 3)\x1b[0m

\x1b[1mLog flags:\x1b[0m
  \x1b[33m--limit\x1b[0m \x1b[90m<n>\x1b[0m        Max commits to load \x1b[90m(default: 80)\x1b[0m

\x1b[1mProviders:\x1b[0m
  Anthropic · OpenAI · Google Gemini · Mistral AI · Groq

\x1b[1mFirst run:\x1b[0m
  whis configure
`;

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    command: "commit",
    stage: false,
    head: false,
    count: 3,
    limit: 80,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "commit") opts.command = "commit";
    else if (a === "log") opts.command = "log";
    else if (a === "branch") opts.command = "branch";
    else if (a === "configure" || a === "config") opts.command = "configure";
    else if (a === "--stage" || a === "-s") opts.stage = true;
    else if (a === "--head") opts.head = true;
    else if (a === "--count" || a === "-n")
      opts.count = parseInt(args[++i], 10) || 3;
    else if (a === "--limit") opts.limit = parseInt(args[++i], 10) || 80;
    else if (a === "--help" || a === "-h") opts.help = true;
  }

  return opts;
}

async function main() {
  const opts = parseArgs(process.argv);

  if (opts.help) {
    process.stdout.write(HELP + "\n");
    process.exit(0);
  }

  switch (opts.command) {
    case "commit": {
      const { runCommit } = await import("./commands/commit.js");
      await runCommit(opts);
      break;
    }
    case "log": {
      const { runLog } = await import("./commands/log.js");
      await runLog(opts);
      break;
    }
    case "branch": {
      const { runBranch } = await import("./commands/branch.js");
      await runBranch();
      break;
    }
    case "configure": {
      const { runConfig } = await import("./commands/config.js");
      await runConfig();
      break;
    }
    default:
      process.stdout.write(HELP + "\n");
  }
}

main().catch((err) => {
  process.stderr.write(
    "\x1b[31m✖  " + (err.message || String(err)) + "\x1b[0m\n",
  );
  process.exit(1);
});
