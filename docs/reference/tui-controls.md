# TUI Controls

whispercom uses a full terminal UI built with [Ink](https://github.com/vadimdemedes/ink). Each screen has its own key bindings, shown in the hint bar at the bottom.

## Commit Picker

Shown after AI generates suggestions. Navigate and confirm your commit.

| Key | Action |
|-----|--------|
| `↑` / `k` | Move selection up |
| `↓` / `j` | Move selection down |
| `1` – `9` | Jump directly to suggestion number |
| `Enter` | Confirm and commit the selected message |
| `e` | Edit the subject line of the selected suggestion |
| `b` | Edit the body text of the selected suggestion |
| `c` | Open the configure wizard to switch provider/model |
| `q` | Quit without committing |

### Editing a message

Press `e` to enter edit mode for the subject, or `b` to edit the body. A text buffer will appear:

| Key | Action |
|-----|--------|
| Any characters | Appends to the buffer |
| `Backspace` | Deletes last character |
| `Enter` | Saves the edit and exits edit mode |
| `Esc` | Cancels the edit |

---

## File Staging UI

Shown when you run `whis --stage`. Stage/unstage files before committing.

| Key | Action |
|-----|--------|
| `↑` / `k` | Move selection up |
| `↓` / `j` | Move selection down |
| `Space` | Toggle staged/unstaged for the selected file |
| `Enter` | Toggle staged/unstaged for the selected file |
| `a` | Toggle **all** files (stage all or unstage all) |
| `c` | Confirm staged files and proceed to commit generation |
| `q` / `Esc` | Quit without staging |

Files are shown in two groups: **staged** (green) and **unstaged** (gray).

---

## Commit Graph Browser

Shown when you run `whis log`.

| Key | Action |
|-----|--------|
| `↑` / `k` | Move selection up one commit |
| `↓` / `j` | Move selection down one commit |
| `PgUp` | Go to previous page |
| `PgDn` | Go to next page |
| `Enter` / `d` | Show diff for the selected commit |
| `Esc` / `b` | Go back to graph from diff view |
| `q` | Quit |

Graph lines are colored by branch column. Ref badges (HEAD, remote branches, tags) are highlighted in distinct colors.

---

## Branch Switcher

Shown when you run `whis branch`. The switcher has two modes: **Filter Mode** (default) and **Navigate Mode**.

**Filter Mode** (typing updates the search query):
| Key | Action |
|-----|--------|
| Any characters | Filter branches (fuzzy match) |
| `Backspace` | Remove last filter character |
| `Tab` | Switch to Navigate Mode |
| `Enter` | Switch to the selected branch |
| `Esc` / `q` | Cancel |

**Navigate Mode** (`j`/`k` move the cursor instead of typing):
| Key | Action |
|-----|--------|
| `Tab` / Any char | Switch back to Filter Mode |
| `↑` / `k` | Move selection up |
| `↓` / `j` | Move selection down |
| `PgUp` / `PgDn` | Page branches (15 at a time) |
| `Enter` | Switch to the selected branch |
| `Esc` | Cancel |

The current branch is marked with a ✔ and highlighted. Filtered results are paginated so you can reach any branch.

---

## Configure Wizard

Shown when you run `whis configure` or press `c` in the commit picker.

| Key | Action |
|-----|--------|
| `↑` / `k` | Move up |
| `↓` / `j` | Move down |
| `Enter` | Confirm selection / advance to next step |
| `Esc` / `q` | Go back or cancel |
| Any characters | Type input (when on text-entry steps) |

**Steps in the wizard:**
1. **Provider**: Select your AI provider. (Shows a ✔ if a key is already detected in env or config).
2. **Model**: Select a preset model, or choose `[ + Enter model ID manually ]` to type an ID.
3. **API Key**: Type your key to save it, or leave blank to keep using an environment variable.
4. **Base URL**: (*Only for the Custom provider*) Type the base URL for the OpenAI-compatible endpoint.
