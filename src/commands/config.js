import React from "react";
import { render } from "ink";
import { loadConfig } from "../core/config.js";
import { ConfigWizard } from "../ui/ConfigWizard.js";

export async function runConfig() {
  const current = loadConfig();

  const { waitUntilExit } = render(
    <ConfigWizard
      currentCfg={current}
      onDone={(cfg) => {
        process.stdout.write(`\n✔  Saved: ${cfg.provider} / ${cfg.model}\n`);
        process.exit(0);
      }}
      onQuit={() => process.exit(0)}
    />,
  );

  await waitUntilExit();
}
