import React from "react";
import { render, useApp } from "ink";
import {
  getLog,
  getGraphLines,
  getCommitDiff,
  getCurrentBranch,
  isGitRepo,
} from "../core/git.js";
import { CommitGraph } from "../ui/CommitGraph.js";

function LogApp({ lines, commits, branch }) {
  const { exit } = useApp();
  return (
    <CommitGraph
      graphLines={lines}
      commits={commits}
      branch={branch}
      onQuit={() => exit()}
      onGetDiff={(hash) => Promise.resolve(getCommitDiff(hash))}
    />
  );
}

export async function runLog(opts) {
  if (!isGitRepo()) {
    process.stderr.write("✖  Not inside a git repository.\n");
    process.exit(1);
  }

  const limit = opts.limit ?? 80;
  const branch = getCurrentBranch();
  const lines = getGraphLines(limit).split("\n").filter(Boolean);
  const commits = getLog(limit);

  const { waitUntilExit } = render(
    <LogApp lines={lines} commits={commits} branch={branch} />,
  );

  await waitUntilExit();
}
