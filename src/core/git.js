import { execSync } from "child_process";

function run(cmd, fallback = "") {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return fallback;
  }
}

export function isGitRepo() {
  try {
    execSync("git rev-parse --git-dir", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export function getStagedDiff() {
  return run("git diff --staged");
}

export function getHeadDiff() {
  return run("git diff HEAD");
}

export function getCurrentBranch() {
  return run("git branch --show-current", "HEAD");
}

export function getAllBranches() {
  const raw = run("git branch -a");
  return raw
    .split("\n")
    .map((b) =>
      b
        .replace(/^\*?\s+/, "")
        .replace(/^remotes\//, "")
        .trim(),
    )
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);
}

export function switchBranch(name) {
  try {
    execSync(`git checkout ${JSON.stringify(name)}`, { stdio: "pipe" });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.stderr?.toString() || e.message };
  }
}

export function getUnstagedFiles() {
  const raw = run("git status --short");
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => ({
      status: line.slice(0, 2).trim(),
      path: line.slice(3).trim(),
      staged: line[0] !== " " && line[0] !== "?",
    }));
}

export function stageFile(filePath) {
  try {
    execSync(`git add ${JSON.stringify(filePath)}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

export function unstageFile(filePath) {
  try {
    // git restore --staged replaces the deprecated `git reset HEAD <file>`
    execSync(`git restore --staged ${JSON.stringify(filePath)}`, {
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

export function doCommit(message) {
  try {
    execSync(`git commit -m ${JSON.stringify(message)}`, { stdio: "pipe" });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.stderr?.toString() || e.message };
  }
}

export function getLog(limit = 50) {
  const SEP = "\x1f"; // ASCII unit separator - never appears in git output
  const fmt = ["%H", "%h", "%s", "%an", "%ae", "%ar", "%ad", "%P"].join(SEP);
  const raw = run(`git log --pretty=format:${fmt} --date=short -n ${limit}`);
  if (!raw) return [];
  return raw.split("\n").map((line) => {
    const [hash, short, subject, author, email, rel, date, parents] =
      line.split(SEP);
    return {
      hash,
      short,
      subject,
      author,
      email,
      rel,
      date,
      parents: parents ? parents.split(" ") : [],
    };
  });
}

export function getCommitDiff(hash) {
  return (
    run(`git show --stat ${hash}`) +
    "\n\n" +
    run(`git show ${hash} -- ":(exclude)*.lock"`)
  );
}

export function getGraphLines(limit = 40) {
  return run(`git log --graph --oneline --decorate --all -n ${limit}`);
}

export function getRefs() {
  const raw = run("git log --oneline --decorate --all -n 1 --format=%D");
  return raw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
}

export function getStashes() {
  return run("git stash list").split("\n").filter(Boolean);
}
