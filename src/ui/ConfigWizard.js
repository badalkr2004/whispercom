import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { PROVIDERS, saveConfig, hasApiKey, getApiKey } from "../core/config.js";
import { SYMBOLS } from "../core/theme.js";
import { KeyHint, StatusBar } from "./StatusBar.js";

const PROVIDER_KEYS = Object.keys(PROVIDERS);
const CUSTOM_MODEL_SENTINEL = "__custom__";

export function ConfigWizard({ currentCfg, onDone, onQuit }) {
  // Steps: "provider" → "model" → "modelInput" → "apiKey" → "baseUrl" → done
  const [step, setStep] = useState("provider");
  const [provKey, setProvKey] = useState(currentCfg?.provider ?? PROVIDER_KEYS[0]);
  const [selIdx, setSelIdx] = useState(0);
  const [modelId, setModelId] = useState(currentCfg?.model ?? "");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState(currentCfg?.baseUrl ?? "");
  // text input buffer used for modelInput, apiKey, baseUrl steps
  const [inputBuf, setInputBuf] = useState("");

  const provider = PROVIDERS[provKey];
  const providerList = PROVIDER_KEYS;
  // Model list always ends with a "manual entry" sentinel
  const modelList = [
    ...(provider?.models ?? []),
    { id: CUSTOM_MODEL_SENTINEL, label: "Enter model ID manually…", note: "" },
  ];

  function handleSave(finalModelId, finalApiKey, finalBaseUrl) {
    const cfg = {
      provider: provKey,
      model: finalModelId,
      ...(finalApiKey ? { apiKey: finalApiKey } : {}),
      ...(provKey === "custom" ? { baseUrl: finalBaseUrl } : {}),
    };
    saveConfig(cfg);
    onDone(cfg);
  }

  useInput((input, key) => {
    // ── Text input steps ─────────────────────────────────
    if (step === "modelInput" || step === "apiKey" || step === "baseUrl") {
      if (key.return) {
        if (step === "modelInput") {
          const id = inputBuf.trim() || modelId;
          setModelId(id);
          setInputBuf("");
          setStep("apiKey");
        } else if (step === "apiKey") {
          const key_ = inputBuf.trim();
          setApiKey(key_);
          setInputBuf("");
          if (provKey === "custom") {
            setStep("baseUrl");
          } else {
            handleSave(modelId, key_, baseUrl);
          }
        } else if (step === "baseUrl") {
          const url = inputBuf.trim() || "https://openrouter.ai/api/v1";
          setBaseUrl(url);
          handleSave(modelId, apiKey, url);
        }
      } else if (key.escape) {
        // Go back
        if (step === "modelInput") { setInputBuf(""); setStep("model"); }
        else if (step === "apiKey") { setInputBuf(""); setStep("modelInput"); }
        else if (step === "baseUrl") { setInputBuf(""); setStep("apiKey"); }
      } else if (key.backspace || key.delete) {
        setInputBuf((b) => b.slice(0, -1));
      } else if (input && !key.ctrl && !key.meta) {
        setInputBuf((b) => b + input);
      }
      return;
    }

    // ── List selection steps ──────────────────────────────
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
      } else if (step === "model") {
        const chosen = modelList[selIdx];
        if (chosen.id === CUSTOM_MODEL_SENTINEL) {
          // Switch to free-text model input
          setInputBuf(modelId);
          setStep("modelInput");
        } else {
          setModelId(chosen.id);
          setInputBuf("");
          setStep("apiKey");
        }
      }
    } else if (key.escape || input === "q") {
      if (step === "model") { setSelIdx(0); setStep("provider"); }
      else onQuit();
    }
  });

  // ── Render helpers ──────────────────────────────────────

  function keyStatus(pKey) {
    const fromEnv = !!process.env[PROVIDERS[pKey]?.envKey];
    const fromCfg = !!(pKey === provKey && currentCfg?.apiKey);
    if (fromEnv) return <Text color="green"> {SYMBOLS.check} env</Text>;
    if (fromCfg) return <Text color="cyan"> {SYMBOLS.check} stored</Text>;
    return <Text color="red" dimColor> {SYMBOLS.warn} missing</Text>;
  }

  if (step === "provider") {
    return (
      <Box flexDirection="column">
        <StatusBar message="configure › provider" />
        <Box flexDirection="column" paddingX={1} paddingY={1}>
          <Text color="cyan" bold dimColor> select a provider</Text>
          <Box height={1} />
          {providerList.map((key, i) => {
            const p = PROVIDERS[key];
            const isSel = i === selIdx;
            return (
              <Box key={key} gap={2}>
                <Text color={isSel ? "cyan" : "gray"}>{isSel ? SYMBOLS.selected : " "}</Text>
                <Text color={isSel ? "white" : "gray"} bold={isSel}>{p.label.padEnd(26)}</Text>
                <Text color="gray" dimColor>{p.envKey || "—"}</Text>
                {keyStatus(key)}
              </Box>
            );
          })}
        </Box>
        <KeyHint keys={[{ key: "↑↓", label: "navigate" }, { key: "enter", label: "select" }, { key: "q", label: "quit" }]} />
      </Box>
    );
  }

  if (step === "model") {
    return (
      <Box flexDirection="column">
        <StatusBar message={`configure › ${provider?.label} › model`} />
        <Box flexDirection="column" paddingX={1} paddingY={1}>
          <Text color="cyan" bold dimColor>  select a model for <Text color="white">{provider?.label}</Text></Text>
          <Box height={1} />
          {modelList.map((m, i) => {
            const isSel = i === selIdx;
            const isCustom = m.id === CUSTOM_MODEL_SENTINEL;
            return (
              <Box key={m.id} gap={2}>
                <Text color={isSel ? "cyan" : "gray"}>{isSel ? SYMBOLS.selected : " "}</Text>
                <Text color={isSel ? (isCustom ? "yellow" : "white") : "gray"} bold={isSel}>
                  {m.label.padEnd(30)}
                </Text>
                {m.note && <Text color="gray" dimColor>{m.note}</Text>}
              </Box>
            );
          })}
        </Box>
        <KeyHint keys={[{ key: "↑↓", label: "navigate" }, { key: "enter", label: "select" }, { key: "esc", label: "back" }]} />
      </Box>
    );
  }

  if (step === "modelInput") {
    return (
      <Box flexDirection="column">
        <StatusBar message={`configure › ${provider?.label} › custom model`} />
        <Box flexDirection="column" paddingX={1} paddingY={1}>
          <Text color="cyan" bold dimColor> enter model ID for <Text color="white">{provider?.label}</Text></Text>
          <Box height={1} />
          <Box gap={1}>
            <Text color="yellow" bold>Model ID: </Text>
            <Text>{inputBuf}</Text>
            <Text color="yellow">▋</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="gray" dimColor>e.g. claude-opus-4-7, gpt-4.5, llama-3.3-70b-specdec</Text>
          </Box>
        </Box>
        <KeyHint keys={[{ key: "enter", label: "confirm" }, { key: "esc", label: "back" }]} />
      </Box>
    );
  }

  if (step === "apiKey") {
    const envName = provider?.envKey ?? "API_KEY";
    const envSet = !!process.env[envName];
    const storedSet = !!(currentCfg?.apiKey);
    return (
      <Box flexDirection="column">
        <StatusBar message={`configure › ${provider?.label} › API key`} />
        <Box flexDirection="column" paddingX={1} paddingY={1}>
          <Text color="cyan" bold dimColor> enter API key</Text>
          <Box height={1} />
          {envSet && (
            <Text color="green" dimColor>  {SYMBOLS.check} {envName} is set in your environment — leave blank to use it</Text>
          )}
          {!envSet && storedSet && (
            <Text color="cyan" dimColor>  {SYMBOLS.check} A key is already stored — leave blank to keep it</Text>
          )}
          {!envSet && !storedSet && (
            <Text color="yellow" dimColor>  {SYMBOLS.warn} No key found. Enter one below or set {envName} in your shell.</Text>
          )}
          <Box height={1} />
          <Box gap={1}>
            <Text color="yellow" bold>Key: </Text>
            <Text>{inputBuf ? "•".repeat(inputBuf.length) : ""}</Text>
            <Text color="yellow">▋</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="gray" dimColor>Leave blank to use existing env var or stored key</Text>
          </Box>
        </Box>
        <KeyHint keys={[{ key: "enter", label: "confirm / skip" }, { key: "esc", label: "back" }]} />
      </Box>
    );
  }

  if (step === "baseUrl") {
    return (
      <Box flexDirection="column">
        <StatusBar message="configure › Custom › base URL" />
        <Box flexDirection="column" paddingX={1} paddingY={1}>
          <Text color="cyan" bold dimColor> enter base URL</Text>
          <Box height={1} />
          <Box gap={1}>
            <Text color="yellow" bold>URL: </Text>
            <Text>{inputBuf || <Text dimColor>https://openrouter.ai/api/v1</Text>}</Text>
            <Text color="yellow">▋</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="gray" dimColor>OpenRouter · Nebius · LM Studio · any OpenAI-compatible endpoint</Text>
          </Box>
        </Box>
        <KeyHint keys={[{ key: "enter", label: "confirm" }, { key: "esc", label: "back" }]} />
      </Box>
    );
  }

  return null;
}
