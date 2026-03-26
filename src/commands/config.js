import React from "react";
import { render, useApp } from "ink";
import { loadConfig } from "../core/config.js";
import { ConfigWizard } from "../ui/ConfigWizard.js";

function ConfigApp({ current }) {
  const { exit } = useApp();
  return (
    <ConfigWizard
      currentCfg={current}
      onDone={(cfg) => {
        // Write success above the TUI, then let Ink clean up normally
        process.stdout.write(`\n\u2714  Saved: ${cfg.provider} / ${cfg.model}\n`);
        exit();
      }}
      onQuit={() => exit()}
    />
  );
}

export async function runConfig() {
  const current = loadConfig();
  const { waitUntilExit } = render(<ConfigApp current={current} />);
  await waitUntilExit();
}
