---
name: develop-codex-themes
description: Develop Codex Dream Skin themes in this repository. Use when designing from screenshots or Pencil, changing schema v2 semantic tokens, editing injected CSS or renderer DOM, running macOS CDP visual verification, maintaining light/dark or Windows parity, or preparing theme work for handoff and release.
---

# Develop Codex Themes

Run a tight design-to-live loop around the official Codex Desktop UI. Preserve
native interaction and the repository's rollback boundary throughout.

Read [references/repo-map.md](references/repo-map.md) before implementation,
live verification, or release work. It is the source of truth for paths,
commands, and the acceptance matrix.

## Choose the branch

- **Design**: create or refine Pencil screens and a semantic-token map. Stop
  before repository changes unless implementation is requested.
- **Implement**: complete the whole loop from baseline through static tests.
- **Validate**: inspect and report evidence; change code only when the request
  includes a fix.
- **Release**: complete implementation and validation before packaging or Git
  integration.

## 1. Establish the baseline

1. Read root `AGENTS.md` and the relevant platform guidance.
2. Inspect Git status and preserve unrelated user changes.
3. Identify affected routes, modes, platforms, and reference screenshots.
4. For Pencil work, call `get_editor_state(include_schema: true)` first and
   access `.pen` files only through Pencil MCP tools.

Complete when the target screens and modes are explicit, the current visual
baseline is captured, and every pre-existing worktree change is accounted for.

## 2. Design the semantic contract

1. Model repeated UI as reusable Pencil components.
2. Map mode-independent choices to `tokens.shared`; map visual values to
   `tokens.light` and `tokens.dark`.
3. Prefer an existing semantic token over a new token, and a new token over a
   hardcoded CSS value.
4. Keep layout rules structural; keep brand, color, type, shape, shadow, blur,
   and motion choices configurable.

Complete when every changed visual role maps to a semantic token or a justified
structural rule, and both Light and Dark behavior are accounted for.

## 3. Implement inside the injection boundary

1. Normalize and validate theme configuration before renderer injection.
2. Apply theme values as CSS custom properties; keep schema v1 compatibility
   unless a migration explicitly removes it.
3. Reuse native Codex sidebar, messages, cards, project selector, composer,
   menus, focus, and keyboard behavior.
4. Keep decorative DOM `aria-hidden` and `pointer-events: none`.
5. Keep CDP loopback-only and leave the official app, `app.asar`, signature,
   API keys, and Base URLs unchanged.

Complete when the payload builds, cleanup removes every injected artifact, and
all modified native controls remain interactive.

## 4. Close the static loop

1. Run `git diff --check`.
2. Run the platform test command from the reference.
3. Add regression coverage for changed configuration, payload, install,
   restore, or verification behavior.
4. Resolve failures; record genuine platform-only blockers instead of
   bypassing checks.

Complete when every required check passes and every CSS semantic variable used
by the renderer is supplied by the normalized theme.

## 5. Close the live loop

1. Obtain explicit authority before restarting an already-running Codex app.
2. Launch Codex through the theme start script so the verified loopback CDP
   endpoint exists.
3. Run doctor with live verification required.
4. Capture and inspect the Home route and a real Task route.
5. Check normal and narrower windows; check both appearance modes when the
   change can differ by mode.
6. Compare screenshots with the Pencil/reference design and record concrete
   discrepancies before iterating.

Complete when required routes pass structural verification and screenshots
show readable contrast, intact native controls, no clipping or horizontal
overflow, and reachable composer/focus states.

## 6. Hand off cleanly

1. Update the appropriate changelog and bump the macOS version for
   release-worthy work.
2. Keep verification screenshots outside the repository unless explicitly
   approved and privacy-safe.
3. Use `type(scope): summary` for commits. Push, open a PR, or merge only when
   requested.
4. Report the branch, commit, tests, live routes inspected, remaining visual
   issues, and any unverified platform or mode.

Complete only when the worktree state and every remaining limitation are clear
enough for the next agent to continue without rediscovery.
