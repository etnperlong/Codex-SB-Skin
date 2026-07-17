#!/bin/bash

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd -P)"
NODE="${NODE:-/Applications/ChatGPT.app/Contents/Resources/cua_node/bin/node}"
[ -x "$NODE" ] || { printf 'Codex bundled Node.js was not found: %s\n' "$NODE" >&2; exit 1; }

while IFS= read -r file; do /bin/bash -n "$file"; done < <(
  /usr/bin/find "$ROOT" -type f \( -name '*.sh' -o -name '*.command' \) \
    ! -path '*/release/*' -print
)
while IFS= read -r file; do "$NODE" --check "$file" >/dev/null; done < <(
  /usr/bin/find "$ROOT/scripts" "$ROOT/assets" -type f \( -name '*.mjs' -o -name '*.js' \) -print
)

if /usr/bin/grep -R -n -E 'dream-skin-skin|DREAM_SKIN_SKIN|1\.0\.0-rc2' \
  "$ROOT/scripts" "$ROOT/assets" >/dev/null; then
  printf 'Legacy release-candidate identifiers remain in runtime files.\n' >&2
  exit 1
fi
if /usr/bin/grep -R -n -E '(writeFile|rename|copyFile|rm).*app\.asar' "$ROOT/scripts" >/dev/null; then
  printf 'A runtime script appears to mutate app.asar.\n' >&2
  exit 1
fi
if /usr/bin/grep -n -E '/usr/bin/python3|(^|[[:space:]])eval([[:space:]]|$)' \
  "$ROOT/scripts/common-macos.sh" >/dev/null; then
  printf 'The shared macOS runtime must parse state with the bundled Node.js, without python3 or eval.\n' >&2
  exit 1
fi

"$NODE" "$ROOT/scripts/injector.mjs" --check-payload >/dev/null
"$NODE" --input-type=module -e '
  import fs from "node:fs";
  import { pathToFileURL } from "node:url";
  const root = process.argv[1];
  const { normalizeTheme } = await import(pathToFileURL(`${root}/scripts/theme-schema.mjs`));
  const theme = normalizeTheme(JSON.parse(fs.readFileSync(`${root}/assets/theme.json`, "utf8")));
  if (theme.id !== "xiao-er-mei" || theme.name !== "小而美" ||
      theme.tokens.light.color.accent !== "#07c160" ||
      theme.tokens.light.color.messageUser !== "#95ec69" ||
      theme.tokens.light.color.sidebarSelected !== "#07c160" ||
      theme.tokens.light.color.sidebarSelectedText !== "#ffffff" ||
      theme.tokens.shared.layout.cardDirection !== "row" ||
      theme.tokens.shared.layout.composerMaxWidth !== "820px" ||
      theme.tokens.shared.layout.sidebarRowHeight !== "44px" ||
      theme.tokens.shared.layout.sidebarRowPaddingX !== "12px" ||
      theme.tokens.shared.typography.sidebarItemWeight !== "400" ||
      theme.tokens.shared.typography.sidebarBrandSize !== "15px" ||
      theme.tokens.shared.shape.messageRadius !== "6px" ||
      theme.tokens.light.effect.chromeOpacity !== "0" ||
      theme.tokens.dark.effect.taskMediaEndOpacity !== "76%") {
    throw new Error("Bundled 小而美 semantic contract is incomplete.");
  }
  const css = fs.readFileSync(`${root}/assets/dream-skin.css`, "utf8");
  if (!css.includes(`html.codex-dream-skin [role="tooltip"] *`)) {
    throw new Error("Tooltip descendants must inherit the semantic tooltip foreground.");
  }
  if (!css.includes(`[aria-label="更新"]`) ||
      !css.includes(`var(--ds-color-sidebar-selected-text)`) ||
      !css.includes(`var(--ds-layout-composer-max-width)`) ||
      !css.includes(`var(--ds-layout-sidebar-row-height)`)) {
    throw new Error("小而美 interaction and Home layout overrides are incomplete.");
  }
  const references = new Set([...css.matchAll(/var\((--ds-[a-z0-9-]+)/g)].map((match) => match[1]));
  const supplied = new Set([
    ...Object.keys(theme.cssVariables.shared),
    ...Object.keys(theme.cssVariables.dark),
    ...Object.keys(theme.cssVariables.light),
  ]);
  const aliases = new Set([...css.matchAll(/^\s*(--ds-[a-z0-9-]+):/gm)].map((match) => match[1]));
  const missing = [...references].filter((name) => !supplied.has(name) && !aliases.has(name));
  if (missing.length) throw new Error(`Missing semantic theme variables: ${missing.join(", ")}`);
' "$ROOT"

TMP="$(/usr/bin/mktemp -d /tmp/codex-dream-skin-tests.XXXXXX)"
trap '/bin/rm -rf "$TMP"' EXIT

RUNTIME_HOME="$TMP/runtime-home"
RUNTIME_STATE_ROOT="$RUNTIME_HOME/Library/Application Support/CodexDreamSkinStudio"
RUNTIME_STATE="$RUNTIME_STATE_ROOT/state.json"
STATE_EVAL_MARKER="$TMP/state-eval-marker"
EXPECTED_BUNDLE="/Applications/Codex \$(touch \"$STATE_EVAL_MARKER\").app"
EXPECTED_EXE="$EXPECTED_BUNDLE/Contents/MacOS/ChatGPT; touch \"$STATE_EVAL_MARKER\""
EXPECTED_VERSION='1.1.2 "nightly"'
EXPECTED_TEAM_ID="TEAM'ID"
/bin/mkdir -p "$RUNTIME_STATE_ROOT"
"$NODE" -e '
  const fs = require("node:fs");
  const [file, codexBundle, codexExe, codexVersion, codexTeamId] = process.argv.slice(1);
  fs.writeFileSync(file, `${JSON.stringify({ codexBundle, codexExe, codexVersion, codexTeamId })}\n`);
' "$RUNTIME_STATE" "$EXPECTED_BUNDLE" "$EXPECTED_EXE" "$EXPECTED_VERSION" "$EXPECTED_TEAM_ID"
/usr/bin/env -u NODE -u NODE_VERSION HOME="$RUNTIME_HOME" /bin/bash -c '
  . "$1/scripts/common-macos.sh"
  ensure_node_runtime
  [ "$CODEX_BUNDLE" = "$2" ]
  [ "$CODEX_EXE" = "$3" ]
  [ "$CODEX_VERSION" = "$4" ]
  [ "$CODEX_TEAM_ID" = "$5" ]
' _ "$ROOT" "$EXPECTED_BUNDLE" "$EXPECTED_EXE" "$EXPECTED_VERSION" "$EXPECTED_TEAM_ID"
[ ! -e "$STATE_EVAL_MARKER" ] || {
  printf 'Runtime state values were evaluated as shell code.\n' >&2
  exit 1
}

ACTIVE_THEME_DIR="$(HOME="$RUNTIME_HOME" /bin/bash -c '. "$1/scripts/common-macos.sh"; active_theme_dir' _ "$ROOT")"
[ "$ACTIVE_THEME_DIR" = "$ROOT/assets" ] || {
  printf 'Missing user theme did not fall back to bundled assets.\n' >&2
  exit 1
}
/bin/mkdir -p "$RUNTIME_STATE_ROOT/theme"
if BROKEN_THEME_OUTPUT="$(
  HOME="$RUNTIME_HOME" /bin/bash -c '. "$1/scripts/common-macos.sh"; active_theme_dir' _ "$ROOT" 2>&1
)"; then
  printf 'Incomplete user theme directory unexpectedly fell back to bundled assets.\n' >&2
  exit 1
fi
/usr/bin/printf '%s\n' "$BROKEN_THEME_OUTPUT" | /usr/bin/grep -F -q \
  "User theme directory exists but theme.json is missing: $RUNTIME_STATE_ROOT/theme/theme.json"
/bin/rm -rf "$RUNTIME_STATE_ROOT/theme"

/bin/mkdir -p "$TMP/theme"
/bin/cp "$ROOT/assets/portal-hero.png" "$TMP/theme/background.png"
"$NODE" "$ROOT/scripts/write-theme.mjs" custom --output-dir "$TMP/theme" \
  --image background.png --name '测试主题' --tagline '测试口号' --quote 'TEST' \
  --accent '#11aa55' --secondary '#22bbcc' --highlight '#663399' >/dev/null
PAYLOAD_JSON="$("$NODE" "$ROOT/scripts/injector.mjs" --check-payload --theme-dir "$TMP/theme")"
"$NODE" -e '
  const value = JSON.parse(process.argv[1]);
  if (!value.pass || value.themeName !== "测试主题" || value.themeSchemaVersion !== 2 ||
      value.sourceSchemaVersion !== 2 || value.themeVariableCount < 120 || value.imageBytes < 1) process.exit(1);
' "$PAYLOAD_JSON"
"$NODE" -e '
  const fs = require("node:fs");
  const theme = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  if (theme.schemaVersion !== 2 || !theme.tokens?.shared?.typography?.uiFont ||
      !theme.tokens?.dark?.color?.messageUser || !theme.tokens?.light?.color?.popover ||
      theme.tokens.dark.color.accent !== "#11aa55" ||
      theme.tokens.light.color.accentSecondary !== "#22bbcc") process.exit(1);
' "$TMP/theme/theme.json"

LEGACY_THEME="$TMP/legacy-theme"
/bin/mkdir -p "$LEGACY_THEME"
/bin/cp "$ROOT/assets/portal-hero.png" "$LEGACY_THEME/background.png"
"$NODE" -e '
  const fs = require("node:fs");
  const file = process.argv[1];
  fs.writeFileSync(file, `${JSON.stringify({
    schemaVersion: 1,
    id: "legacy",
    name: "旧版中文主题",
    image: "background.png",
    colors: { accent: "#11aa55", secondary: "#22bbcc", highlight: "#663399" },
  }, null, 2)}\n`);
' "$LEGACY_THEME/theme.json"
LEGACY_PAYLOAD_JSON="$("$NODE" "$ROOT/scripts/injector.mjs" --check-payload --theme-dir "$LEGACY_THEME")"
"$NODE" -e '
  const value = JSON.parse(process.argv[1]);
  if (!value.pass || value.themeName !== "旧版中文主题" || value.themeSchemaVersion !== 2 ||
      value.sourceSchemaVersion !== 1 || value.themeVariableCount < 120) process.exit(1);
' "$LEGACY_PAYLOAD_JSON"

INVALID_THEME="$TMP/invalid-semantic-theme"
/bin/mkdir -p "$INVALID_THEME"
/bin/cp "$ROOT/assets/portal-hero.png" "$INVALID_THEME/background.png"
"$NODE" -e '
  const fs = require("node:fs");
  const source = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  source.image = "background.png";
  source.tokens.dark.effect.cardShadow = "0 0 1px red; display:none";
  fs.writeFileSync(process.argv[2], `${JSON.stringify(source, null, 2)}\n`);
' "$ROOT/assets/theme.json" "$INVALID_THEME/theme.json"
if INVALID_TOKEN_OUTPUT="$(
  "$NODE" "$ROOT/scripts/injector.mjs" --check-payload --theme-dir "$INVALID_THEME" 2>&1
)"; then
  printf 'Unsafe semantic theme token unexpectedly passed.\n' >&2
  exit 1
fi
/usr/bin/printf '%s\n' "$INVALID_TOKEN_OUTPUT" | /usr/bin/grep -F -q \
  "Theme token tokens.dark.effect.cardShadow contains an unsafe CSS value."
/bin/mkdir -p "$TMP/missing-theme"
if MISSING_THEME_OUTPUT="$(
  "$NODE" "$ROOT/scripts/injector.mjs" --check-payload --theme-dir "$TMP/missing-theme" 2>&1
)"; then
  printf 'Explicit theme directory without theme.json unexpectedly passed.\n' >&2
  exit 1
fi
/usr/bin/printf '%s\n' "$MISSING_THEME_OUTPUT" | /usr/bin/grep -F -q \
  "Explicit theme directory is missing theme.json: $TMP/missing-theme/theme.json"
"$NODE" "$ROOT/scripts/write-theme.mjs" reset-demo --output-dir "$TMP/theme" >/dev/null
[ ! -e "$TMP/theme" ]

CONFIG="$TMP/config.toml"
BACKUP="$TMP/theme-backup.json"
/usr/bin/printf '%s\n' \
  'model = "gpt-5"' \
  '' \
  '[desktop]' \
  'appearanceTheme = "system"' \
  'appearanceDarkCodeThemeId = "vscode-dark"' \
  'keepMe = true' > "$CONFIG"
/bin/cp "$CONFIG" "$TMP/original.toml"
"$NODE" "$ROOT/scripts/theme-config.mjs" install "$CONFIG" "$BACKUP" >/dev/null
/usr/bin/cmp -s "$CONFIG" "$TMP/original.toml"
"$NODE" -e '
  const backup = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
  if (backup.values.appearanceTheme !== `appearanceTheme = "system"`) process.exit(1);
  if (backup.values.appearanceDarkCodeThemeId !== `appearanceDarkCodeThemeId = "vscode-dark"`) process.exit(1);
' "$BACKUP"
"$NODE" "$ROOT/scripts/theme-config.mjs" restore "$CONFIG" "$BACKUP" >/dev/null
/usr/bin/cmp -s "$CONFIG" "$TMP/original.toml"

NO_DESKTOP_CONFIG="$TMP/config-without-desktop.toml"
NO_DESKTOP_BACKUP="$TMP/theme-backup-without-desktop.json"
/usr/bin/printf '%s\n' 'model = "gpt-5"' 'keepMe = true' > "$NO_DESKTOP_CONFIG"
/bin/cp "$NO_DESKTOP_CONFIG" "$TMP/original-without-desktop.toml"
"$NODE" "$ROOT/scripts/theme-config.mjs" install "$NO_DESKTOP_CONFIG" "$NO_DESKTOP_BACKUP" >/dev/null
"$NODE" "$ROOT/scripts/theme-config.mjs" restore "$NO_DESKTOP_CONFIG" "$NO_DESKTOP_BACKUP" >/dev/null
/usr/bin/cmp -s "$NO_DESKTOP_CONFIG" "$TMP/original-without-desktop.toml"

INSTALL_HOME="$TMP/install-home"
/bin/mkdir -p "$INSTALL_HOME/.codex"
/usr/bin/printf '%s\n' \
  'model = "gpt-5"' \
  'project_name = "中文测试"' > "$INSTALL_HOME/.codex/config.toml"
/bin/cp "$INSTALL_HOME/.codex/config.toml" "$TMP/install-original.toml"
HOME="$INSTALL_HOME" "$ROOT/scripts/install-dream-skin-macos.sh" \
  --in-place --no-launchers --no-launch >/dev/null
/usr/bin/cmp -s "$INSTALL_HOME/.codex/config.toml" "$TMP/install-original.toml"
[ -f "$INSTALL_HOME/Library/Application Support/CodexDreamSkinStudio/theme-backup.json" ]
[ ! -e "$INSTALL_HOME/Library/Application Support/CodexDreamSkinStudio/theme" ]

/usr/bin/env -u HOME /bin/bash -c '. "$1/scripts/common-macos.sh"; [ -n "$HOME" ] && [ "$SKIN_VERSION" = "1.3.0" ]' _ "$ROOT"
"$ROOT/scripts/doctor-macos.sh" >/dev/null

printf 'PASS: syntax, payload, theme fallback, fresh install, runtime-state safety, custom-theme, config round-trips, HOME recovery, signature, and doctor checks.\n'
