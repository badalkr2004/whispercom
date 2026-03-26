import React, { useState, useMemo } from "react";
import { Box, Text, useInput } from "ink";
import { SYMBOLS, branchColor } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

const PAGE = 15;

function fuzzy(query, str) {
  if (!query) return true;
  const q = query.toLowerCase();
  const s = str.toLowerCase();
  let qi = 0;
  for (let si = 0; si < s.length && qi < q.length; si++) {
    if (s[si] === q[qi]) qi++;
  }
  return qi === q.length;
}

function BranchRow({ name, isCurrent, isSelected, colorIdx }) {
  const color = branchColor(colorIdx);
  return (
    <Box gap={1}>
      <Text color={isSelected ? "cyan" : "gray"}>
        {isSelected ? SYMBOLS.selected : " "}
      </Text>
      <Text color={isCurrent ? "green" : color}>
        {isCurrent ? SYMBOLS.check : SYMBOLS.circle}
      </Text>
      <Text
        color={isSelected ? "white" : isCurrent ? "green" : "gray"}
        bold={isCurrent || isSelected}
      >
        {name}
      </Text>
      {isCurrent && (
        <Text color="green" dimColor>
          {" "}
          (current)
        </Text>
      )}
    </Box>
  );
}

export function BranchSwitcher({ branches, currentBranch, onSwitch, onQuit }) {
  const [query, setQuery] = useState("");
  const [selIdx, setSelIdx] = useState(0);
  const [page, setPage] = useState(0);
  // navMode: when true j/k move selection; when false printable keys type into filter
  const [navMode, setNavMode] = useState(false);

  const filtered = useMemo(
    () => branches.filter((b) => fuzzy(query, b)),
    [branches, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const visibleBranches = filtered.slice(page * PAGE, (page + 1) * PAGE);
  // adjusted selection index within the visible slice
  const visibleSelIdx = selIdx - page * PAGE;

  useInput((input, key) => {
    if (key.tab) {
      // Toggle between filter mode and navigate mode
      setNavMode((m) => !m);
      return;
    }

    if (navMode) {
      // Navigate mode: j/k / arrows move selection; printable char re-enters filter mode
      if (key.upArrow || input === "k") {
        const next = Math.max(0, selIdx - 1);
        setSelIdx(next);
        setPage(Math.floor(next / PAGE));
      } else if (key.downArrow || input === "j") {
        const next = Math.min(filtered.length - 1, selIdx + 1);
        setSelIdx(next);
        setPage(Math.floor(next / PAGE));
      } else if (key.pageUp) {
        const newPage = Math.max(0, page - 1);
        setPage(newPage);
        setSelIdx(newPage * PAGE);
      } else if (key.pageDown) {
        const newPage = Math.min(totalPages - 1, page + 1);
        setPage(newPage);
        setSelIdx(newPage * PAGE);
      } else if (key.return) {
        const branch = filtered[selIdx];
        if (branch && branch !== currentBranch) onSwitch(branch);
        else onQuit();
      } else if (key.escape) {
        onQuit();
      } else if (input && !key.ctrl && !key.meta) {
        // Any printable char → re-enter filter mode and start new query
        setNavMode(false);
        setQuery(input);
        setSelIdx(0);
        setPage(0);
      }
    } else {
      // Filter mode: type to search
      if (key.upArrow) {
        const next = Math.max(0, selIdx - 1);
        setSelIdx(next);
        setPage(Math.floor(next / PAGE));
      } else if (key.downArrow) {
        const next = Math.min(filtered.length - 1, selIdx + 1);
        setSelIdx(next);
        setPage(Math.floor(next / PAGE));
      } else if (key.return) {
        const branch = filtered[selIdx];
        if (branch && branch !== currentBranch) onSwitch(branch);
        else onQuit();
      } else if (key.escape && !query) {
        onQuit();
      } else if (key.escape) {
        setQuery("");
        setSelIdx(0);
        setPage(0);
      } else if (input === "q" && !query) {
        onQuit();
      } else if (key.backspace || key.delete) {
        setQuery((q) => q.slice(0, -1));
        setSelIdx(0);
        setPage(0);
      } else if (input && !key.ctrl && !key.meta) {
        setQuery((q) => q + input);
        setSelIdx(0);
        setPage(0);
      }
    }
  });

  return (
    <Box flexDirection="column">
      <StatusBar
        branch={currentBranch}
        message={`${filtered.length} branches  ·  page ${page + 1}/${totalPages}  ·  ${navMode ? "NAV" : "FILTER"} mode`}
      />

      <Box paddingX={1} paddingY={1} gap={1}>
        <Text color={navMode ? "gray" : "cyan"}>filter: </Text>
        <Text>{query}</Text>
        {!navMode && <Text color="cyan">▋</Text>}
      </Box>

      <Box flexDirection="column" paddingX={1}>
        {visibleBranches.map((b, i) => (
          <BranchRow
            key={b}
            name={b}
            isCurrent={b === currentBranch}
            isSelected={i === visibleSelIdx}
            colorIdx={page * PAGE + i}
          />
        ))}
      </Box>

      <KeyHint
        keys={[
          { key: "↑↓", label: "navigate" },
          { key: "type", label: "filter" },
          { key: "Tab", label: navMode ? "→ filter mode" : "→ nav mode (j/k)" },
          { key: "PgUp/Dn", label: "page" },
          { key: "enter", label: "switch" },
          { key: "esc", label: "cancel" },
        ]}
      />
    </Box>
  );
}
