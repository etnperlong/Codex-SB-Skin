export const THEME_SCHEMA_VERSION = 2;

export const DEFAULT_THEME_TOKENS = {
  shared: {
    typography: {
      uiFont: '"Microsoft YaHei UI", "Microsoft YaHei", "Segoe UI", system-ui, sans-serif',
      displayFont: '"SF Pro Display", "PingFang SC", "Microsoft YaHei UI", system-ui, sans-serif',
      monoFont: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
      quoteFont: '"Segoe Print", "Comic Sans MS", cursive',
      bodySize: "14px",
      smallSize: "12px",
      titleSize: "27px",
      labelSize: "12px",
      bodyLineHeight: "1.5",
      headingWeight: "760",
      labelWeight: "750",
      letterSpacing: ".03em",
      sidebarItemWeight: "445",
      sidebarSelectedWeight: "600",
      sidebarSectionSize: "12px",
      sidebarBrandSize: "17px",
      sidebarBrandWeight: "800",
    },
    shape: {
      sidebarRadius: "0 18px 18px 0",
      mainRadius: "18px 0 0 0",
      heroRadius: "24px",
      cardRadius: "21px",
      composerRadius: "23px",
      messageRadius: "18px",
      popoverRadius: "14px",
      controlRadius: "10px",
      pillRadius: "999px",
      avatarRadius: "50%",
      borderWidth: "1px",
      focusWidth: "2px",
    },
    layout: {
      contentMaxWidth: "950px",
      heroHeight: "252px",
      heroInset: "44px",
      heroTextWidth: "55%",
      heroTextPadding: "36px",
      homeLeadHeight: "430px",
      cardMinHeight: "126px",
      cardPadding: "14px 13px 12px",
      cardGap: "10px",
      cardIconSize: "38px",
      cardDirection: "column",
      cardAlign: "stretch",
      cardTextAlign: "center",
      cardCopyAlign: "center",
      cardIconMargin: "0 auto",
      composerMaxWidth: "860px",
      composerMarkerSize: "27px",
      selectedIndicatorWidth: "3px",
      sidebarRowHeight: "30px",
      sidebarRowRadius: "10px",
      sidebarRowPaddingX: "8px",
      sidebarRowGap: "8px",
      sidebarListGap: "1px",
      sidebarIconSize: "13px",
      sidebarHeaderHeight: "46px",
    },
    motion: {
      fast: "160ms",
      normal: "180ms",
      slow: "260ms",
      easing: "ease",
      hoverLift: "-4px",
      decorationDuration: "4.6s",
    },
    blur: {
      content: "8px",
      composer: "18px",
      popover: "12px",
    },
  },
  dark: {
    color: {
      canvas: "#071116",
      canvasAlt: "#0b151a",
      canvasPatternPrimary: "rgba(184, 255, 61, .72)",
      canvasPatternSecondary: "rgba(54, 215, 232, .52)",
      sidebar: "rgba(7, 20, 25, .98)",
      sidebarAlt: "rgba(8, 29, 31, .96)",
      sidebarBorder: "rgba(54, 215, 232, .20)",
      sidebarText: "#d9f7e3",
      sidebarMuted: "#9ebdb3",
      sidebarIcon: "#9ebdb3",
      sidebarHover: "rgba(124, 255, 70, .15)",
      sidebarSelected: "rgba(124, 255, 70, .20)",
      sidebarSelectedBorder: "rgba(124, 255, 70, .24)",
      sidebarSelectedText: "#e9fff1",
      main: "#08151b",
      mainAlt: "#071116",
      mainBorder: "rgba(54, 215, 232, .18)",
      header: "rgba(8, 21, 27, .98)",
      headerAlt: "rgba(31, 18, 46, .94)",
      headerBorder: "rgba(124, 255, 70, .14)",
      text: "#e9fff1",
      textMuted: "#9ebdb3",
      textSoft: "#dff8e7",
      textOnMedia: "#e9fff1",
      textOnMediaMuted: "rgba(233, 255, 241, .82)",
      accent: "#7cff46",
      accentHover: "#8fff5f",
      accentActive: "#68e83a",
      accentSecondary: "#36d7e8",
      accentTertiary: "#642a8c",
      accentContrast: "#061014",
      accentSoft: "rgba(124, 255, 70, .10)",
      focusRing: "rgba(124, 255, 70, .52)",
      surface: "#0b1a20",
      surfaceElevated: "#10272c",
      surfaceTranslucent: "rgba(7, 20, 27, .88)",
      code: "#10272c",
      codeText: "#e9fff1",
      codeBorder: "rgba(124, 255, 70, .14)",
      card: "rgba(13, 34, 38, .98)",
      cardAlt: "rgba(9, 23, 30, .98)",
      cardBorder: "rgba(54, 215, 232, .26)",
      cardHoverBorder: "rgba(124, 255, 70, .52)",
      cardText: "#dff8e7",
      cardIcon: "#b8ff3d",
      cardIconText: "#061014",
      message: "rgba(7, 20, 27, .34)",
      messageBorder: "rgba(54, 215, 232, .10)",
      messageUser: "rgba(16, 45, 43, .94)",
      messageUserText: "#e9fff1",
      messageAssistant: "rgba(7, 20, 27, .34)",
      messageAssistantText: "#e9fff1",
      composer: "rgba(11, 29, 34, .91)",
      composerAlt: "rgba(7, 20, 27, .88)",
      composerBorder: "rgba(124, 255, 70, .32)",
      composerText: "#e9fff1",
      composerPlaceholder: "#9ebdb3",
      control: "rgba(16, 45, 43, .94)",
      controlHover: "rgba(124, 255, 70, .15)",
      controlSelected: "rgba(124, 255, 70, .20)",
      controlText: "#e9fff1",
      controlPrimary: "#7cff46",
      controlPrimaryHover: "#8fff5f",
      controlPrimaryText: "#061014",
      project: "rgba(16, 45, 43, .94)",
      projectAlt: "rgba(22, 23, 49, .90)",
      projectBorder: "rgba(124, 255, 70, .30)",
      hero: "#08101c",
      heroBorder: "rgba(124, 255, 70, .62)",
      heroOverlay: "rgba(5, 9, 20, .98)",
      heroOverlaySoft: "rgba(21, 19, 51, .62)",
      popover: "rgba(9, 23, 30, .98)",
      popoverBorder: "rgba(54, 215, 232, .20)",
      popoverText: "#e9fff1",
      tooltip: "#10272c",
      tooltipText: "#e9fff1",
      backdrop: "rgba(0, 0, 0, .38)",
      divider: "rgba(124, 255, 70, .14)",
      scrollbar: "rgba(124, 255, 70, .40)",
      selection: "rgba(124, 255, 70, .24)",
      success: "#7cff46",
      warning: "#f5b942",
      danger: "#ff6b6b",
      info: "#36d7e8",
      decorationPrimary: "#7cff46",
      decorationSecondary: "#36d7e8",
      quote: "rgba(184, 255, 61, .72)",
    },
    effect: {
      canvasPatternOpacity: ".42",
      decorationOpacity: ".62",
      chromeOpacity: "1",
      composerMarkerOpacity: "1",
      taskMediaStartOpacity: "95%",
      taskMediaMiddleOpacity: "86%",
      taskMediaEndOpacity: "64%",
      sidebarShadow: "12px 0 34px rgba(0, 0, 0, .30)",
      mainShadow: "-10px 0 34px rgba(0, 0, 0, .22)",
      heroShadow: "0 16px 38px rgba(0, 0, 0, .38)",
      cardShadow: "0 9px 22px rgba(0, 0, 0, .28)",
      cardHoverShadow: "0 14px 28px rgba(0, 0, 0, .34)",
      messageShadow: "0 10px 28px rgba(0, 0, 0, .12)",
      composerShadow: "0 11px 28px rgba(0, 0, 0, .34)",
      popoverShadow: "0 14px 36px rgba(0, 0, 0, .32)",
      mediaTextShadow: "0 2px 14px rgba(0, 0, 0, .72)",
      accentGlow: "0 0 14px rgba(124, 255, 70, .30)",
    },
  },
  light: {
    color: {
      canvas: "#f6f2f3",
      canvasAlt: "#f3eef0",
      canvasPatternPrimary: "rgba(226, 85, 99, .35)",
      canvasPatternSecondary: "rgba(243, 168, 175, .28)",
      sidebar: "#ffffff",
      sidebarAlt: "#fbf7f8",
      sidebarBorder: "rgba(40, 30, 32, .08)",
      sidebarText: "#2a2325",
      sidebarMuted: "#6b5f62",
      sidebarIcon: "#5a5053",
      sidebarHover: "rgba(217, 72, 86, .08)",
      sidebarSelected: "rgba(217, 72, 86, .10)",
      sidebarSelectedBorder: "rgba(217, 72, 86, .14)",
      sidebarSelectedText: "#2a2325",
      main: "rgba(252, 250, 251, .82)",
      mainAlt: "rgba(247, 242, 243, .90)",
      mainBorder: "rgba(40, 30, 32, .07)",
      header: "rgba(255, 255, 255, .88)",
      headerAlt: "rgba(255, 255, 255, .88)",
      headerBorder: "rgba(40, 30, 32, .06)",
      text: "#1f1a1b",
      textMuted: "#6b5f62",
      textSoft: "#3d3437",
      textOnMedia: "#fffaf9",
      textOnMediaMuted: "rgba(255, 245, 247, .90)",
      accent: "#e25563",
      accentHover: "#f07a86",
      accentActive: "#c93d4c",
      accentSecondary: "#f3a8af",
      accentTertiary: "#c93d4c",
      accentContrast: "#ffffff",
      accentSoft: "rgba(217, 72, 86, .10)",
      focusRing: "rgba(226, 85, 99, .35)",
      surface: "#ffffff",
      surfaceElevated: "#fff7f8",
      surfaceTranslucent: "rgba(255, 255, 255, .86)",
      code: "#fff7f8",
      codeText: "#1f1a1b",
      codeBorder: "rgba(40, 30, 32, .08)",
      card: "rgba(255, 255, 255, .78)",
      cardAlt: "rgba(255, 255, 255, .94)",
      cardBorder: "rgba(255, 255, 255, .55)",
      cardHoverBorder: "rgba(226, 85, 99, .35)",
      cardText: "#1f1a1b",
      cardIcon: "#f07a86",
      cardIconText: "#ffffff",
      message: "rgba(255, 255, 255, .86)",
      messageBorder: "rgba(40, 30, 32, .06)",
      messageUser: "#95ec69",
      messageUserText: "#111111",
      messageAssistant: "rgba(255, 255, 255, .94)",
      messageAssistantText: "#1f1a1b",
      composer: "rgba(255, 255, 255, .94)",
      composerAlt: "rgba(255, 255, 255, .94)",
      composerBorder: "rgba(40, 30, 32, .08)",
      composerText: "#1f1a1b",
      composerPlaceholder: "#8a7a7d",
      control: "#ffffff",
      controlHover: "rgba(217, 72, 86, .08)",
      controlSelected: "rgba(217, 72, 86, .10)",
      controlText: "#1f1a1b",
      controlPrimary: "#e25563",
      controlPrimaryHover: "#f07a86",
      controlPrimaryText: "#ffffff",
      project: "rgba(255, 255, 255, .88)",
      projectAlt: "rgba(255, 255, 255, .94)",
      projectBorder: "rgba(226, 85, 99, .28)",
      hero: "#1c1214",
      heroBorder: "rgba(40, 30, 32, .10)",
      heroOverlay: "rgba(12, 8, 10, .38)",
      heroOverlaySoft: "rgba(12, 8, 10, .03)",
      popover: "rgba(255, 255, 255, .98)",
      popoverBorder: "rgba(40, 30, 32, .10)",
      popoverText: "#1f1a1b",
      tooltip: "#2a2325",
      tooltipText: "#ffffff",
      backdrop: "rgba(40, 20, 24, .20)",
      divider: "rgba(40, 30, 32, .08)",
      scrollbar: "rgba(217, 72, 86, .35)",
      selection: "rgba(217, 72, 86, .16)",
      success: "#2aae67",
      warning: "#c88200",
      danger: "#d94856",
      info: "#2786c4",
      decorationPrimary: "#e25563",
      decorationSecondary: "#f3a8af",
      quote: "rgba(40, 30, 32, .45)",
    },
    effect: {
      canvasPatternOpacity: ".12",
      decorationOpacity: ".20",
      chromeOpacity: "1",
      composerMarkerOpacity: "1",
      taskMediaStartOpacity: "95%",
      taskMediaMiddleOpacity: "86%",
      taskMediaEndOpacity: "64%",
      sidebarShadow: "8px 0 24px rgba(40, 20, 24, .05)",
      mainShadow: "inset 0 1px rgba(255, 255, 255, .85)",
      heroShadow: "0 16px 36px rgba(40, 16, 22, .14)",
      cardShadow: "0 10px 22px rgba(40, 16, 22, .08)",
      cardHoverShadow: "0 14px 28px rgba(40, 16, 22, .10)",
      messageShadow: "0 8px 20px rgba(40, 20, 24, .05)",
      composerShadow: "0 10px 28px rgba(40, 20, 24, .07)",
      popoverShadow: "0 14px 36px rgba(40, 20, 24, .12)",
      mediaTextShadow: "0 2px 12px rgba(0, 0, 0, .32)",
      accentGlow: "0 0 14px rgba(226, 85, 99, .24)",
    },
  },
};

const COLOR_PATTERN = /^(?:transparent|#[0-9a-f]{3,8}|rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(?:\s*,\s*[\d.]+%?)?\s*\)|hsla?\(\s*[\d.]+(?:deg)?\s*,\s*[\d.]+%\s*,\s*[\d.]+%(?:\s*,\s*[\d.]+%?)?\s*\))$/i;
const SAFE_CSS_PATTERN = /^[#(),.%\-\s\dA-Za-z"']+$/;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function text(value, fallback, max) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : fallback;
}

function tokenValue(value, fallback, path) {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Theme token ${path} must be a string or number.`);
  }
  const normalized = String(value).trim();
  if (!normalized || normalized.length > 280 || /[;{}<>`\\]/.test(normalized)) {
    throw new Error(`Theme token ${path} contains an unsafe CSS value.`);
  }
  if (path.includes(".color.") && !COLOR_PATTERN.test(normalized)) {
    throw new Error(`Theme token ${path} must be a CSS color.`);
  }
  if (!path.includes(".color.") && !SAFE_CSS_PATTERN.test(normalized)) {
    throw new Error(`Theme token ${path} contains unsupported characters.`);
  }
  return normalized || fallback;
}

function mergeTokens(defaults, overrides, path = "tokens") {
  const result = {};
  const source = overrides && typeof overrides === "object" && !Array.isArray(overrides) ? overrides : {};
  for (const [key, fallback] of Object.entries(defaults)) {
    const nextPath = `${path}.${key}`;
    if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) {
      result[key] = mergeTokens(fallback, source[key], nextPath);
    } else if (Object.hasOwn(source, key)) {
      result[key] = tokenValue(source[key], fallback, nextPath);
    } else {
      result[key] = fallback;
    }
  }
  return result;
}

function setLegacyColor(tokens, mode, key, value) {
  if (typeof value !== "string" || !COLOR_PATTERN.test(value.trim())) return;
  tokens[mode].color[key] = value.trim();
}

function migrateLegacyColors(raw, tokens) {
  const colors = raw.colors && typeof raw.colors === "object" ? raw.colors : {};
  setLegacyColor(tokens, "dark", "canvas", colors.background);
  setLegacyColor(tokens, "dark", "mainAlt", colors.background);
  setLegacyColor(tokens, "dark", "surface", colors.panel);
  setLegacyColor(tokens, "dark", "sidebar", colors.panel);
  setLegacyColor(tokens, "dark", "surfaceElevated", colors.panelAlt);
  setLegacyColor(tokens, "dark", "accent", colors.accent);
  setLegacyColor(tokens, "light", "accent", colors.accent);
  setLegacyColor(tokens, "dark", "cardIcon", colors.accentAlt);
  setLegacyColor(tokens, "light", "cardIcon", colors.accentAlt);
  setLegacyColor(tokens, "dark", "accentSecondary", colors.secondary);
  setLegacyColor(tokens, "light", "accentSecondary", colors.secondary);
  setLegacyColor(tokens, "dark", "accentTertiary", colors.highlight);
  setLegacyColor(tokens, "light", "accentTertiary", colors.highlight);
  setLegacyColor(tokens, "dark", "text", colors.text);
  setLegacyColor(tokens, "dark", "textMuted", colors.muted);
  setLegacyColor(tokens, "dark", "divider", colors.line);
}

function kebab(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function flattenVariables(groups) {
  const variables = {};
  for (const [group, values] of Object.entries(groups)) {
    for (const [name, value] of Object.entries(values)) {
      variables[`--ds-${kebab(group)}-${kebab(name)}`] = String(value);
    }
  }
  return variables;
}

export function normalizeTheme(raw) {
  if (!raw || typeof raw !== "object" || ![1, THEME_SCHEMA_VERSION].includes(raw.schemaVersion)) {
    throw new Error("Theme config has an unsupported schemaVersion.");
  }
  if (typeof raw.image !== "string" || !raw.image) throw new Error("Theme config image is required.");

  let tokens;
  if (raw.schemaVersion === 1) {
    tokens = clone(DEFAULT_THEME_TOKENS);
    migrateLegacyColors(raw, tokens);
  } else {
    tokens = mergeTokens(DEFAULT_THEME_TOKENS, raw.tokens);
  }

  return {
    schemaVersion: THEME_SCHEMA_VERSION,
    sourceSchemaVersion: raw.schemaVersion,
    id: text(raw.id, "custom", 80),
    name: text(raw.name, "Codex Dream Skin", 80),
    brandSubtitle: text(raw.brandSubtitle, "CODEX DREAM SKIN", 80),
    tagline: text(raw.tagline, "Make something wonderful.", 160),
    projectPrefix: text(raw.projectPrefix, "选择项目 · ", 80),
    projectLabel: text(raw.projectLabel, "◉  选择项目", 80),
    statusText: text(raw.statusText, "DREAM SKIN ONLINE", 80),
    quote: text(raw.quote, "MAKE SOMETHING WONDERFUL", 80),
    image: raw.image,
    tokens,
    cssVariables: {
      shared: flattenVariables(tokens.shared),
      dark: flattenVariables(tokens.dark),
      light: flattenVariables(tokens.light),
    },
  };
}

export function createThemeTokens(overrides = {}) {
  return mergeTokens(DEFAULT_THEME_TOKENS, overrides);
}
