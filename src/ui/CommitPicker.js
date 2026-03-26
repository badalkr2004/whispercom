import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { SYMBOLS, typeColor } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

function colorizeSubject(subject) {
  const m = subject.match(/^(\w+)(\([^)]+\))?(!)?:\s*/);
  if (!m) return <Text>{subject}</Text>;
  const [full, type, scope, bang] = m;
  const rest = subject.slice(full.length);
  return (
    <>
      <Text color={typeColor(type)} bold>
        {type}
      </Text>
      {scope && <Text color="gray">{scope}</Text>}
      {bang && <Text color="red">!</Text>}
      <Text color="gray">: </Text>
      <Text>{rest}</Text>
    </>
  );
}

export function CommitPicker({
  suggestions: initial,
  branch,
  provider,
  model,
  onConfirm,
  onConfigure,
  onQuit,
}) {
  const [suggestions, setSuggestions] = useState(initial);
  const [selected, setSelected] = useState(0);
  // editField: null | "subject" | "body"
  const [editField, setEditField] = useState(null);
  const [editBuf, setEditBuf] = useState("");

  useInput((input, key) => {
    if (editField) {
      if (key.return) {
        const updated = suggestions.map((s, i) => {
          if (i !== selected) return s;
          return editField === "subject"
            ? { ...s, subject: editBuf }
            : { ...s, body: editBuf };
        });
        setSuggestions(updated);
        setEditField(null);
      } else if (key.escape) {
        setEditField(null);
      } else if (key.backspace || key.delete) {
        setEditBuf((b) => b.slice(0, -1));
      } else if (input && !key.ctrl && !key.meta) {
        setEditBuf((b) => b + input);
      }
      return;
    }

    if (key.upArrow || input === "k") {
      const next = (selected - 1 + suggestions.length) % suggestions.length;
      setSelected(next);
    } else if (key.downArrow || input === "j") {
      const next = (selected + 1) % suggestions.length;
      setSelected(next);
    } else if (key.return) {
      const s = suggestions[selected];
      const msg = s.body ? `${s.subject}\n\n${s.body}` : s.subject;
      onConfirm(msg);
    } else if (input === "e") {
      setEditField("subject");
      setEditBuf(suggestions[selected].subject);
    } else if (input === "b") {
      setEditField("body");
      setEditBuf(suggestions[selected].body ?? "");
    } else if (input === "c") {
      onConfigure?.();
    } else if (input === "q" || (key.ctrl && input === "c")) {
      onQuit();
    } else if (/^[1-9]$/.test(input)) {
      const idx = parseInt(input, 10) - 1;
      if (idx < suggestions.length) {
        setSelected(idx);
      }
    }
  });

  return (
    <Box flexDirection="column">
      <StatusBar branch={branch} provider={provider} model={model} />

      <Box flexDirection="column" paddingX={1} paddingY={1}>
        {suggestions.map((s, i) => {
          const isSel = i === selected;
          return (
            <Box key={i} flexDirection="column" marginBottom={isSel ? 1 : 0}>
              <Box gap={1}>
                <Text color={isSel ? "cyan" : "gray"}>
                  {isSel ? SYMBOLS.selected : " "}
                </Text>
                <Text color="gray" dimColor>
                  {i + 1}.
                </Text>
                {isSel ? (
                  <Text bold>{colorizeSubject(s.subject)}</Text>
                ) : (
                  <Text dimColor>{colorizeSubject(s.subject)}</Text>
                )}
              </Box>
              {isSel && (
                <Box flexDirection="column" marginLeft={4} marginTop={0}>
                  {s.body &&
                    s.body.split("\n").map((l, li) => (
                      <Text key={li} dimColor>
                        {l}
                      </Text>
                    ))}
                  <Text color="gray" dimColor>
                    {SYMBOLS.info} {s.reasoning}
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {editField && (
        <Box paddingX={1} gap={1}>
          <Text color="yellow" bold>
            Edit {editField}:{" "}
          </Text>
          <Text>{editBuf}</Text>
          <Text color="yellow">▋</Text>
        </Box>
      )}

      <KeyHint
        keys={[
          { key: "↑↓", label: "navigate" },
          { key: "enter", label: "confirm" },
          { key: "e", label: "edit subject" },
          { key: "b", label: "edit body" },
          { key: "1-9", label: "jump" },
          { key: "c", label: "configure" },
          { key: "q", label: "quit" },
        ]}
      />
    </Box>
  );
}
