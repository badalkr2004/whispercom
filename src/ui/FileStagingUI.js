import React, { useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import { SYMBOLS, STATUS_COLORS } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

function FileRow({ file, isSelected, isChecked }) {
  const statusColor = STATUS_COLORS[file.status[0]] ?? "gray";
  return (
    <Box gap={1}>
      <Text color={isSelected ? "cyan" : "gray"}>
        {isSelected ? SYMBOLS.selected : " "}
      </Text>
      <Text color={isChecked ? "green" : "gray"}>
        {isChecked ? SYMBOLS.check : SYMBOLS.circle}
      </Text>
      <Text color={statusColor} bold>
        {(file.status || "?").padEnd(2)}
      </Text>
      <Text color={isSelected ? "white" : isChecked ? "green" : "gray"}>
        {file.path}
      </Text>
    </Box>
  );
}

export function FileStagingUI({ files: initialFiles, branch, onDone, onQuit }) {
  const [files, setFiles] = useState(initialFiles);
  const [selIdx, setSelIdx] = useState(0);

  const staged = files.filter((f) => f.staged);
  const unstaged = files.filter((f) => !f.staged);

  const allFiles = [...staged, ...unstaged];
  const selected = allFiles[selIdx];

  useInput((input, key) => {
    if (key.upArrow || input === "k") {
      setSelIdx((i) => Math.max(0, i - 1));
    } else if (key.downArrow || input === "j") {
      setSelIdx((i) => Math.min(allFiles.length - 1, i + 1));
    } else if (input === " " || key.return) {
      if (!selected) return;
      setFiles((prev) =>
        prev.map((f) =>
          f.path === selected.path ? { ...f, staged: !f.staged } : f,
        ),
      );
    } else if (input === "a") {
      // Toggle all
      const allStaged = allFiles.every((f) => f.staged);
      setFiles((prev) => prev.map((f) => ({ ...f, staged: !allStaged })));
    } else if (input === "c") {
      const stagedPaths = files.filter((f) => f.staged).map((f) => f.path);
      onDone(stagedPaths);
    } else if (input === "q" || key.escape) {
      onQuit();
    }
  });

  return (
    <Box flexDirection="column">
      <StatusBar
        branch={branch}
        message={`${staged.length} staged  ·  ${unstaged.length} unstaged`}
      />

      <Box flexDirection="column" paddingX={1} paddingY={1}>
        {staged.length > 0 && (
          <>
            <Text color="green" bold dimColor>
              {" "}
              staged
            </Text>
            {staged.map((f, i) => (
              <FileRow
                key={f.path}
                file={f}
                isSelected={allFiles.indexOf(f) === selIdx}
                isChecked={true}
              />
            ))}
            <Box height={1} />
          </>
        )}

        {unstaged.length > 0 && (
          <>
            <Text color="gray" dimColor>
              {" "}
              unstaged
            </Text>
            {unstaged.map((f) => (
              <FileRow
                key={f.path}
                file={f}
                isSelected={allFiles.indexOf(f) === selIdx}
                isChecked={false}
              />
            ))}
          </>
        )}
      </Box>

      <KeyHint
        keys={[
          { key: "↑↓", label: "navigate" },
          { key: "space", label: "toggle" },
          { key: "a", label: "toggle all" },
          { key: "c", label: "commit staged" },
          { key: "q", label: "quit" },
        ]}
      />
    </Box>
  );
}
