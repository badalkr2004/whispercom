import React, { useState, useMemo } from "react";
import { Box, Text, useInput } from "ink";
import { SYMBOLS, BRANCH_COLORS } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

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
  const color = BRANCH_COLORS[colorIdx % BRANCH_COLORS.length];
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

  const filtered = useMemo(
    () => branches.filter((b) => fuzzy(query, b)),
    [branches, query],
  );

  useInput((input, key) => {
    if (key.upArrow || (key.ctrl && input === "k")) {
      setSelIdx((i) => Math.max(0, i - 1));
    } else if (key.downArrow || (key.ctrl && input === "j")) {
      setSelIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (key.return) {
      const branch = filtered[selIdx];
      if (branch && branch !== currentBranch) onSwitch(branch);
      else onQuit();
    } else if (key.escape || input === "q") {
      onQuit();
    } else if (key.backspace || key.delete) {
      setQuery((q) => q.slice(0, -1));
      setSelIdx(0);
    } else if (input && !key.ctrl && !key.meta) {
      setQuery((q) => q + input);
      setSelIdx(0);
    }
  });

  return (
    <Box flexDirection="column">
      <StatusBar
        branch={currentBranch}
        message={`${filtered.length} branches`}
      />

      <Box paddingX={1} paddingY={1} gap={1}>
        <Text color="cyan">filter: </Text>
        <Text>{query}</Text>
        <Text color="cyan">▋</Text>
      </Box>

      <Box flexDirection="column" paddingX={1}>
        {filtered.slice(0, 20).map((b, i) => (
          <BranchRow
            key={b}
            name={b}
            isCurrent={b === currentBranch}
            isSelected={i === selIdx}
            colorIdx={i}
          />
        ))}
        {filtered.length > 20 && (
          <Text color="gray" dimColor>
            {" "}
            … {filtered.length - 20} more
          </Text>
        )}
      </Box>

      <KeyHint
        keys={[
          { key: "↑↓", label: "navigate" },
          { key: "type", label: "filter" },
          { key: "enter", label: "switch" },
          { key: "esc", label: "cancel" },
        ]}
      />
    </Box>
  );
}
