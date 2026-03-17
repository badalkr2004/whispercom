import React, { useState, useEffect } from "react";
import { render, Box, Text, useApp } from "ink";
import {
  getAllBranches,
  getCurrentBranch,
  switchBranch,
  isGitRepo,
} from "../core/git.js";
import { BranchSwitcher } from "../ui/BranchSwitcher.js";

function BranchApp({ branches, current }) {
  const { exit } = useApp();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result !== null) {
      exit();
    }
  }, [result]);

  if (result !== null) {
    return (
      <Box paddingX={1} paddingY={1}>
        {result.ok ? (
          <Text color="green">✔ Switched to {result.name}</Text>
        ) : (
          <Text color="red">✖ {result.error}</Text>
        )}
      </Box>
    );
  }

  return (
    <BranchSwitcher
      branches={branches}
      currentBranch={current}
      onSwitch={(name) => {
        const r = switchBranch(name);
        setResult({ ok: r.ok, name, error: r.error });
      }}
      onQuit={() => exit()}
    />
  );
}

export async function runBranch() {
  if (!isGitRepo()) {
    console.error("✖  Not inside a git repository.");
    process.exit(1);
  }

  const branches = getAllBranches();
  const current = getCurrentBranch();

  const { waitUntilExit } = render(
    <BranchApp branches={branches} current={current} />,
  );

  await waitUntilExit();
}
