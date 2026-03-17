import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { PROVIDERS, saveConfig, hasApiKey } from "../core/config.js";
import { SYMBOLS } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

const PROVIDER_KEYS = Object.keys(PROVIDERS);

export function ConfigWizard({ currentCfg, onDone, onQuit }) {
  const [step, setStep] = useState("provider"); // "provider" | "model" | "done"
  const [provKey, setProvKey] = useState(
    currentCfg?.provider ?? PROVIDER_KEYS[0],
  );
  const [selIdx, setSelIdx] = useState(0);

  const providerList = PROVIDER_KEYS;
  const modelList = PROVIDERS[provKey]?.models ?? [];

  useInput((input, key) => {
    const list = step === "provider" ? providerList : modelList;

    if (key.upArrow || input === "k") {
      setSelIdx((i) => Math.max(0, i - 1));
    } else if (key.downArrow || input === "j") {
      setSelIdx((i) => Math.min(list.length - 1, i + 1));
    } else if (key.return) {
      if (step === "provider") {
        setProvKey(providerList[selIdx]);
        setSelIdx(0);
        setStep("model");
      } else {
        const model = modelList[selIdx].id;
        const cfg = { provider: provKey, model };
        saveConfig(cfg);
        onDone(cfg);
      }
    } else if (key.escape || input === "q") {
      if (step === "model") {
        setStep("provider");
        setSelIdx(0);
      } else onQuit();
    }
  });

  return (
    <Box flexDirection="column">
      <StatusBar message="configure provider" />

      <Box flexDirection="column" paddingX={1} paddingY={1}>
        {step === "provider" && (
          <>
            <Text color="cyan" bold dimColor>
              {" "}
              select a provider
            </Text>
            <Box height={1} />
            {providerList.map((key, i) => {
              const p = PROVIDERS[key];
              const haKey = hasApiKey(key);
              const isSel = i === selIdx;
              return (
                <Box key={key} gap={2}>
                  <Text color={isSel ? "cyan" : "gray"}>
                    {isSel ? SYMBOLS.selected : " "}
                  </Text>
                  <Text color={isSel ? "white" : "gray"} bold={isSel}>
                    {p.label.padEnd(16)}
                  </Text>
                  <Text color="gray" dimColor>
                    {p.envKey}
                  </Text>
                  {haKey ? (
                    <Text color="green"> {SYMBOLS.check}</Text>
                  ) : (
                    <Text color="red" dimColor>
                      {" "}
                      {SYMBOLS.warn} key missing
                    </Text>
                  )}
                </Box>
              );
            })}
          </>
        )}

        {step === "model" && (
          <>
            <Text color="cyan" bold dimColor>
              {"  select a model for "}
              <Text color="white">{PROVIDERS[provKey].label}</Text>
            </Text>
            <Box height={1} />
            {modelList.map((m, i) => {
              const isSel = i === selIdx;
              return (
                <Box key={m.id} gap={2}>
                  <Text color={isSel ? "cyan" : "gray"}>
                    {isSel ? SYMBOLS.selected : " "}
                  </Text>
                  <Text color={isSel ? "white" : "gray"} bold={isSel}>
                    {m.label.padEnd(22)}
                  </Text>
                  <Text color="gray" dimColor>
                    {m.note}
                  </Text>
                </Box>
              );
            })}
          </>
        )}
      </Box>

      <KeyHint
        keys={[
          { key: "↑↓", label: "navigate" },
          { key: "enter", label: step === "provider" ? "next" : "save" },
          { key: "esc", label: step === "model" ? "back" : "cancel" },
        ]}
      />
    </Box>
  );
}
