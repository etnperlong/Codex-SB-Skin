# Repository map and verification reference

## Architecture

```text
theme.json / prepared image
        ↓
theme-schema.mjs normalization and validation
        ↓
injector.mjs payload construction over loopback CDP
        ↓
renderer-inject.js CSS variables and decorative DOM
        ↓
dream-skin.css styling of live native Codex DOM
```

The skin must remain an overlay on the official UI, not a replacement UI or a
raster screenshot impersonating controls.

## Source map

| Concern | Path |
| --- | --- |
| Complete editable theme | `macos/assets/theme.json` |
| Token defaults, validation, v1 migration | `macos/scripts/theme-schema.mjs` |
| Semantic CSS and selectors | `macos/assets/dream-skin.css` |
| Renderer lifecycle and cleanup | `macos/assets/renderer-inject.js` |
| CDP loading, verification, screenshots | `macos/scripts/injector.mjs` |
| Custom theme generation | `macos/scripts/write-theme.mjs` |
| macOS regression suite | `macos/tests/run-tests.sh` |
| Visual acceptance rules | `macos/references/qa-inventory.md` |
| Schema documentation | `macos/references/theme-schema-v2.md` |
| Platform parity notes | `docs/platforms.md` |
| Windows assets and injector | `windows/assets/`, `windows/scripts/` |

## Static commands

From the repository root:

```bash
git diff --check
cd macos && npm test
```

For Windows changes:

```powershell
powershell -File windows/tests/run-tests.ps1
```

Release packaging, only when requested:

```bash
macos/scripts/build-release.sh
macos/scripts/build-client-release.sh <output.zip>
```

## Install and start the current checkout

Install the current checkout without restarting Codex:

```bash
cd macos
./scripts/install-dream-skin-macos.sh --no-launchers --no-launch
```

After Codex is closed, start it with verified CDP:

```bash
~/.codex/codex-dream-skin-studio/scripts/start-dream-skin-macos.sh --port 9341
```

If Codex is still running, use `--prompt-restart` only after restart authority
has been given. The script may choose another free port and records it for
later commands.

## Live verification commands

```bash
~/.codex/codex-dream-skin-studio/scripts/doctor-macos.sh --require-live

~/.codex/codex-dream-skin-studio/scripts/verify-dream-skin-macos.sh \
  --reload \
  --screenshot /tmp/codex-theme-home.png

~/.codex/codex-dream-skin-studio/scripts/verify-dream-skin-macos.sh \
  --screenshot /tmp/codex-theme-task.png
```

Navigate to Home before the first screenshot and a real task before the second.
Use the saved state port by omitting `--port` from verification commands.

Pause without restoring base appearance settings:

```bash
~/.codex/codex-dream-skin-studio/scripts/pause-dream-skin-macos.sh
```

## Acceptance matrix

### Every live run

- Injector version matches the checkout.
- Official signature remains valid and `app.asar` is unchanged.
- Decoration is non-interactive.
- Sidebar and composer are visible.
- Document has no horizontal overflow.

### Home

- Hero is visible and its text does not collide with the project selector.
- One to six native suggestion cards remain visible and interactive.
- Project selector and composer remain reachable.
- Image crop supports readable live text.

### Task

- Background does not overpower primary or secondary text.
- User, assistant, tool, approval, and running states remain distinguishable.
- Code, attachments, menus, dialogs, scrollbars, and focus outlines remain
  readable.
- Composer stays visible and reachable at the bottom of the viewport.

### Modes and size

- Verify Light and Dark when mode-specific tokens or selectors change.
- Verify a narrower window when layout, hero, cards, sidebar, or composer
  geometry changes.

## Git and release

- Preserve user changes and use a dedicated branch for substantial work.
- Prefer `feat(macos): ...`, `fix(windows): ...`, or another matching
  `type(scope): summary` commit.
- Update `macos/CHANGELOG.md` for user-visible macOS changes.
- Bump `macos/VERSION`, `macos/package.json`, and runtime version constants
  together for release-worthy changes.
- Maintain the Windows changelog when parity work ships.
- Never commit API keys, `auth.json`, private chats, or customer screenshots.
