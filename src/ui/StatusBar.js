import React from "react";
import { Box, Text } from "ink";
import { SYMBOLS } from "../core/theme.js";

export function StatusBar({ branch, provider, model, message }) {
  return (
    <Box
      borderStyle="single"
      borderColor="gray"
      paddingX={1}
      justifyContent="space-between"
    >
      <Box gap={2}>
        <Text color="cyan" bold>
          commit-ai
        </Text>
        {branch && (
          <Box gap={1}>
            <Text color="gray">{SYMBOLS.branch}</Text>
            <Text color="yellow">{branch}</Text>
          </Box>
        )}
      </Box>
      <Box gap={2}>
        {message && <Text color="gray">{message}</Text>}
        {provider && model && (
          <Text color="gray" dimColor>
            {provider} / {model}
          </Text>
        )}
      </Box>
    </Box>
  );
}

export function KeyHint({ keys }) {
  return (
    <Box gap={3} paddingX={1} paddingY={0}>
      {keys.map(({ key, label }) => (
        <Box key={key} gap={1}>
          <Text color="cyan" bold>
            {key}
          </Text>
          <Text color="gray" dimColor>
            {label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
