# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-03-27

### Added
- `--version` / `-v` flag — prints `whis vX.Y.Z` and exits
- Commit body editing in the commit picker — press `b` to edit the body, `e` for the subject
- Branch paging in `BranchSwitcher` — `Tab` toggles between filter mode and navigate mode (`j`/`k`); `PgUp`/`PgDn` pages through results
- `.gitattributes` — enforces LF line endings across the repo
- `.editorconfig` — standardises indent (2 spaces), charset, and line endings for all editors

### Fixed
- Version string in `--help` was hardcoded as `v1.0.0`; now read dynamically from `package.json`
- `git status --short` XY code parsed with `.trim()`, breaking two-character codes like `MM` and `??`
- Commit diff view made two `git show` calls per commit; now a single `--stat --patch` call
- Large diffs silently truncated at 10 000 chars with no user feedback; a warning now appears in the status bar
- Corrupted `~/.config/whispercom/config.json` silently swallowed — now prints a `⚠` warning before falling through to the configure wizard
- `whis configure` called `process.exit()` directly, bypassing Ink's terminal teardown and potentially leaving the terminal in raw mode; now uses `useApp().exit()`
- `isGitRepo()` guard was checked inside the React component in `commit` but before `render()` in `log`/`branch`; now consistent across all commands

### Changed
- `build.mjs` filter for `index.js` uses `path.resolve()` instead of a hardcoded `\\` separator (cross-platform fix)
- Invalid `--count` value now prints a `⚠` warning and falls back to `3` instead of silently doing so
- `branchColor()` utility in `theme.js` is now used by both `CommitGraph` and `BranchSwitcher` instead of duplicated inline expressions

### Removed
- Dead `GRAPH_CHARS` export from `theme.js` (was defined but never imported)
- `bun.lock` — standardised on npm (`package-lock.json`)

## [1.0.0] - 2026-03-18

### Added
- Initial public release
- AI-powered commit message generation (Anthropic, OpenAI, Google Gemini, Mistral, Groq)
- Interactive commit picker with subject editing and reasoning display
- Commit graph browser (`whis log`) with commit detail view
- Fuzzy branch switcher (`whis branch`)
- Interactive file staging UI (`whis commit --stage`)
- Provider + model configuration wizard (`whis configure`)
- Conventional Commits format enforced by AI prompt

[Unreleased]: https://github.com/badalkr2004/whispercom/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/badalkr2004/whispercom/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/badalkr2004/whispercom/releases/tag/v1.0.0
