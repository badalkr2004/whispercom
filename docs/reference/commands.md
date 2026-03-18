# Commands

## Overview

```bash
whis [command] [flags]
```

The default command (when no argument is given) is `commit`.

## `whis commit`

Generate AI commit messages from your staged diff.

```bash
whis commit
# or just:
whis
```

**Flags**

| Flag | Alias | Default | Description |
|------|-------|---------|-------------|
| `--stage` | `-s` | — | Open the interactive file staging UI before generating |
| `--head` | — | — | Diff against HEAD (includes both staged and unstaged changes) |
| `--count` | `-n` | `3` | Number of AI suggestions to generate |

**Examples**

```bash
# Generate 3 suggestions from staged diff
whis

# Stage files interactively, then generate
whis --stage
whis -s

# Analyze all uncommitted work (staged + unstaged)
whis --head

# Get 5 suggestions instead of 3
whis --count 5
whis -n 5
```

**Flow**

1. whispercom checks you are inside a git repo
2. Gets the staged diff (or HEAD diff with `--head`)
3. Calls your configured AI provider with the diff
4. Presents the [Commit Picker TUI](/reference/tui-controls#commit-picker)
5. You navigate, optionally edit, and press `Enter` to commit

---

## `whis log`

Browse the full commit history with a colored ASCII graph.

```bash
whis log
```

**Flags**

| Flag | Default | Description |
|------|---------|-------------|
| `--limit` | `80` | Maximum number of commits to load |

**Example**

```bash
# Browse last 200 commits
whis log --limit 200
```

Press `Enter` on any commit to view its full diff. Use `PgUp`/`PgDn` to page through history.

---

## `whis branch`

Fuzzy branch switcher.

```bash
whis branch
```

Start typing to filter. Highlights the current branch. Press `Enter` to switch.

---

## `whis configure`

Interactive provider and model setup wizard.

```bash
whis configure
```

Saves your choice to [`~/.config/whispercom/config.json`](/reference/configuration). You can also press `c` inside the commit picker to reconfigure without restarting.

---

## `whis --help`

Print the help text.

```bash
whis --help
whis -h
```
