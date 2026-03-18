import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import { SYMBOLS, BRANCH_COLORS } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

const PAGE = 20;

function RefBadge({ name }) {
  const isHead = name === "HEAD" || name.startsWith("HEAD ->");
  const isRemote = name.startsWith("origin/") || name.startsWith("upstream/");
  const isTag = name.startsWith("tag:");
  const color = isHead ? "cyan" : isRemote ? "red" : isTag ? "yellow" : "green";
  const display = name.replace(/^tag:\s*/, "");
  return (
    <Box marginRight={1}>
      <Text color={color} bold>
        {" "}
        {display}{" "}
      </Text>
    </Box>
  );
}

function GraphCommitRow({ line, isSelected }) {
  // Parse the raw --graph --oneline --decorate line
  // Format: [graph chars] [hash] ([refs]) subject
  const graphMatch = line.match(/^([*|\/ ]+)\s+/);
  const graphPart = graphMatch ? graphMatch[1] : "";
  const rest = line.slice(graphPart.length);

  const hashMatch = rest.match(/^([0-9a-f]{6,8})\s*/i);
  const hash = hashMatch ? hashMatch[1] : "";
  const afterHash = rest.slice((hashMatch?.[0] ?? "").length);

  // Extract refs
  const refsMatch = afterHash.match(/^\(([^)]+)\)\s*/);
  const refs = refsMatch ? refsMatch[1].split(",").map((r) => r.trim()) : [];
  const subject = afterHash.slice((refsMatch?.[0] ?? "").length);

  // Color graph characters by column
  const coloredGraph = graphPart.split("").map((ch, ci) => {
    const colorIdx = Math.floor(ci / 2) % BRANCH_COLORS.length;
    const color = BRANCH_COLORS[colorIdx];
    return (
      <Text key={ci} color={color}>
        {ch}
      </Text>
    );
  });

  return (
    <Box>
      <Text color={isSelected ? "cyan" : "gray"}>
        {isSelected ? SYMBOLS.selected : " "}
      </Text>
      <Box>{coloredGraph}</Box>
      {hash && (
        <Text color="yellow" dimColor>
          {" "}
          {hash}{" "}
        </Text>
      )}
      {refs.map((r, i) => (
        <RefBadge key={i} name={r} />
      ))}
      <Text color={isSelected ? "white" : "gray"} bold={isSelected}>
        {subject}
      </Text>
    </Box>
  );
}

function CommitDetail({ commit, diff }) {
  return (
    <Box
      flexDirection="column"
      borderStyle="single"
      borderColor="gray"
      padding={1}
    >
      <Box gap={2} marginBottom={1}>
        <Text color="yellow" bold>
          {commit.short}
        </Text>
        <Text bold>{commit.subject}</Text>
      </Box>
      <Box gap={4}>
        <Box gap={1}>
          <Text color="gray" dimColor>
            author
          </Text>
          <Text color="cyan">{commit.author}</Text>
        </Box>
        <Box gap={1}>
          <Text color="gray" dimColor>
            date
          </Text>
          <Text color="green">{commit.date}</Text>
          <Text color="gray" dimColor>
            ({commit.rel})
          </Text>
        </Box>
      </Box>
      {commit.parents?.length > 1 && (
        <Box marginTop={1} gap={1}>
          <Text color="magenta" dimColor>
            merge
          </Text>
          <Text color="gray" dimColor>
            {commit.parents.join(" ← ")}
          </Text>
        </Box>
      )}
      {diff && (
        <Box flexDirection="column" marginTop={1}>
          <Box gap={1}>
            <Text color="gray" dimColor>
              ──────
            </Text>
            <Text color="gray">stat</Text>
          </Box>
          {diff
            .split("\n")
            .slice(0, 12)
            .map((l, i) => (
              <Text key={i} color="gray" dimColor>
                {l}
              </Text>
            ))}
        </Box>
      )}
    </Box>
  );
}

export function CommitGraph({
  graphLines,
  commits,
  branch,
  onQuit,
  onGetDiff,
}) {
  const [selIdx, setSelIdx] = useState(0);
  const [page, setPage] = useState(0);
  const [diff, setDiff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("graph"); // "graph" | "detail"
  const [loadDiff, setLoadDiff] = useState(null); // hash to load, or null

  const filteredLines = graphLines.filter((l) => l.trim());
  const visibleLines = filteredLines.slice(page * PAGE, (page + 1) * PAGE);
  const totalPages = Math.ceil(filteredLines.length / PAGE);

  // Match selected graph line to a commit
  const getSelectedCommit = useCallback(() => {
    const line = filteredLines[page * PAGE + selIdx] ?? "";
    const m = line.match(/\b([0-9a-f]{6,8})\b/i);
    if (!m) return null;
    return commits.find((c) => c.short === m[1] || c.hash.startsWith(m[1])) ?? null;
  }, [selIdx, page, filteredLines, commits]);

  const selectedCommit = getSelectedCommit();

  // Load diff via useEffect so the input handler stays synchronous
  useEffect(() => {
    if (!loadDiff) return;
    let cancelled = false;
    setLoading(true);
    onGetDiff(loadDiff).then((d) => {
      if (!cancelled) {
        setDiff(d);
        setLoading(false);
        setMode("detail");
        setLoadDiff(null);
      }
    });
    return () => { cancelled = true; };
  }, [loadDiff, onGetDiff]);

  useInput((input, key) => {
    if (key.upArrow || input === "k") {
      if (selIdx > 0) setSelIdx((s) => s - 1);
      else if (page > 0) {
        setPage((p) => p - 1);
        setSelIdx(PAGE - 1);
      }
      setDiff(null);
      setMode("graph");
    } else if (key.downArrow || input === "j") {
      if (selIdx < visibleLines.length - 1) setSelIdx((s) => s + 1);
      else if (page < totalPages - 1) {
        setPage((p) => p + 1);
        setSelIdx(0);
      }
      setDiff(null);
      setMode("graph");
    } else if (key.return || input === "d") {
      if (!selectedCommit) return;
      if (mode === "detail") {
        setMode("graph");
        return;
      }
      // Trigger async diff load via state — keeps input handler sync
      setLoadDiff(selectedCommit.hash);
    } else if (key.escape || input === "b") {
      if (mode === "detail") {
        setMode("graph");
        setDiff(null);
      } else onQuit();
    } else if (input === "q") {
      onQuit();
    } else if (key.pageUp) {
      if (page > 0) {
        setPage((p) => p - 1);
        setSelIdx(0);
        setDiff(null);
      }
    } else if (key.pageDown) {
      if (page < totalPages - 1) {
        setPage((p) => p + 1);
        setSelIdx(0);
        setDiff(null);
      }
    }
  });

  return (
    <Box flexDirection="column">
      <StatusBar
        branch={branch}
        message={`${filteredLines.length} commits  ·  page ${page + 1}/${totalPages}`}
      />

      {mode === "graph" && (
        <Box flexDirection="column" paddingX={1} paddingY={1}>
          {visibleLines.map((line, i) => (
            <GraphCommitRow key={i} line={line} isSelected={i === selIdx} />
          ))}
        </Box>
      )}

      {mode === "detail" && selectedCommit && (
        <Box paddingX={1} paddingY={1}>
          <CommitDetail commit={selectedCommit} diff={diff} />
        </Box>
      )}

      {loading && (
        <Box paddingX={1}>
          <Text color="cyan" dimColor>
            loading diff…
          </Text>
        </Box>
      )}

      <KeyHint
        keys={
          mode === "graph"
            ? [
                { key: "↑↓", label: "navigate" },
                { key: "enter", label: "show diff" },
                { key: "PgUp/Dn", label: "page" },
                { key: "q", label: "quit" },
              ]
            : [
                { key: "esc/b", label: "back to graph" },
                { key: "q", label: "quit" },
              ]
        }
      />
    </Box>
  );
}
