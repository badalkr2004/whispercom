import React, { useState, useEffect } from "react";
import { render, Box, Text, useApp } from "ink";
import Spinner from "ink-spinner";

import { loadConfig, PROVIDERS } from "../core/config.js";
import { generateCommitMessages } from "../core/ai.js";
import {
  getStagedDiff,
  getHeadDiff,
  doCommit,
  getCurrentBranch,
  isGitRepo,
  getUnstagedFiles,
  stageFile,
  unstageFile,
} from "../core/git.js";
import { CommitPicker } from "../ui/CommitPicker.js";
import { ConfigWizard } from "../ui/ConfigWizard.js";
import { FileStagingUI } from "../ui/FileStagingUI.js";

function App({ opts }) {
  const { exit } = useApp();
  const [phase, setPhase] = useState("init");
  const [cfg, setCfg] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [branch, setBranch] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function init() {
      if (!isGitRepo()) {
        setError("Not inside a git repository.");
        setPhase("error");
        return;
      }
      setBranch(getCurrentBranch());

      if (opts.stage) {
        const f = getUnstagedFiles();
        setFiles(f);
        setPhase("staging");
        return;
      }

      let config = loadConfig();
      if (!config) {
        setPhase("configure");
        return;
      }
      setCfg(config);
      await generate(config, opts);
    }
    init();
  }, []);

  // Auto-exit after rendering the error
  useEffect(() => {
    if (phase === "error") {
      exit();
    }
  }, [phase, exit]);

  // Auto-exit after rendering success message
  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(() => exit(), 80);
      return () => clearTimeout(t);
    }
  }, [phase, exit]);

  async function generate(config, options) {
    setPhase("loading");
    setStatusMsg(
      "Analyzing diff with " + PROVIDERS[config.provider]?.label + "…",
    );
    try {
      const diff = options.head
        ? getHeadDiff().slice(0, 10000)
        : getStagedDiff().slice(0, 10000);

      if (!diff.trim()) {
        setError(
          options.head
            ? "No HEAD diff found."
            : "No staged changes. Run `git add` first, or use --head flag.",
        );
        setPhase("error");
        return;
      }
      const suggestions = await generateCommitMessages(
        diff,
        options.count ?? 3,
        config,
      );
      setSuggestions(suggestions);
      setPhase("pick");
    } catch (e) {
      setError(e.message);
      setPhase("error");
    }
  }

  function handleConfigure() {
    setPhase("configure");
  }

  function handleConfigDone(newCfg) {
    setCfg(newCfg);
    generate(newCfg, opts);
  }

  function handleConfirm(message) {
    setPhase("committing");
    const result = doCommit(message);
    if (result.ok) {
      setStatusMsg("Committed: " + message.split("\n")[0]);
      setPhase("done");
    } else {
      setError(result.error);
      setPhase("error");
    }
  }

  function handleStagingDone(stagedPaths) {
    // Use the current files state — do NOT re-fetch to avoid race conditions
    files.forEach((f) => {
      if (stagedPaths.includes(f.path) && !f.staged) stageFile(f.path);
      if (!stagedPaths.includes(f.path) && f.staged) unstageFile(f.path);
    });
    let config = loadConfig();
    if (!config) {
      setPhase("configure");
      return;
    }
    setCfg(config);
    generate(config, opts);
  }

  if (phase === "init" || phase === "loading") {
    return (
      <Box paddingX={1} paddingY={1} gap={2}>
        <Text color="cyan">
          <Spinner type="dots" />
        </Text>
        <Text dimColor>{statusMsg || "Initializing…"}</Text>
      </Box>
    );
  }

  if (phase === "error") {
    return (
      <Box paddingX={1} paddingY={1} flexDirection="column" gap={1}>
        <Text color="red">✖ {error}</Text>
        <Text dimColor>Run whis --help for usage.</Text>
      </Box>
    );
  }

  if (phase === "committing") {
    return (
      <Box paddingX={1} paddingY={1} gap={2}>
        <Text color="cyan">
          <Spinner type="dots" />
        </Text>
        <Text dimColor>Committing…</Text>
      </Box>
    );
  }

  if (phase === "done") {
    return (
      <Box paddingX={1} paddingY={1}>
        <Text color="green">✔ {statusMsg}</Text>
      </Box>
    );
  }

  if (phase === "configure") {
    return (
      <ConfigWizard
        currentCfg={cfg}
        onDone={handleConfigDone}
        onQuit={() => exit()}
      />
    );
  }

  if (phase === "staging") {
    return (
      <FileStagingUI
        files={files}
        branch={branch}
        onDone={handleStagingDone}
        onQuit={() => exit()}
      />
    );
  }

  if (phase === "pick") {
    return (
      <CommitPicker
        suggestions={suggestions}
        branch={branch}
        provider={PROVIDERS[cfg?.provider]?.label}
        model={cfg?.model}
        onConfirm={handleConfirm}
        onConfigure={handleConfigure}
        onQuit={() => exit()}
      />
    );
  }

  return null;
}

export async function runCommit(opts) {
  const { waitUntilExit } = render(<App opts={opts} />);
  await waitUntilExit();
}
