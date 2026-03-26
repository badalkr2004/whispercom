// Centralized theme — all UI components import from here

export const BRANCH_COLORS = [
  "cyan",
  "magenta",
  "yellow",
  "green",
  "blue",
  "red",
  "white",
];

export const COMMIT_TYPE_COLORS = {
  feat: "green",
  fix: "red",
  docs: "cyan",
  style: "magenta",
  refactor: "yellow",
  perf: "magenta",
  test: "cyan",
  chore: "gray",
  ci: "blueBright",
  build: "yellow",
  revert: "red",
};

export const STATUS_COLORS = {
  M: "yellow", // modified
  A: "green", // added
  D: "red", // deleted
  R: "cyan", // renamed
  C: "blue", // copied
  U: "magenta", // unmerged
  "?": "gray", // untracked
};

export const SYMBOLS = {
  dot: "●",
  circle: "○",
  diamond: "◆",
  arrow: "›",
  check: "✔",
  cross: "✖",
  info: "ℹ",
  warn: "⚠",
  selected: "❯",
  branch: "",
  commit: "◉",
  merge: "⑃",
  tag: "⊛",
  star: "★",
  pipe: "│",
  tee: "├",
  elbow: "└",
  horiz: "─",
};


export function typeColor(type) {
  return COMMIT_TYPE_COLORS[type] || "white";
}

export function branchColor(index) {
  return BRANCH_COLORS[index % BRANCH_COLORS.length];
}
