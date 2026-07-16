# Theme schema v2

`assets/theme.json` is the editable design-token source for the macOS skin. The
runtime accepts schema v1 themes for compatibility, but all newly generated
themes use schema v2.

## Structure

```json
{
  "schemaVersion": 2,
  "image": "portal-hero.png",
  "tokens": {
    "shared": {
      "typography": {},
      "shape": {},
      "layout": {},
      "motion": {},
      "blur": {}
    },
    "dark": {
      "color": {},
      "effect": {}
    },
    "light": {
      "color": {},
      "effect": {}
    }
  }
}
```

The bundled `assets/theme.json` contains every supported token and is the
canonical editable template. Keep token names unchanged; unknown fields are
ignored and invalid values fail payload construction.

## Token groups

- `typography`: UI, display, monospace and quote font stacks; sizes, weights,
  line height and letter spacing.
- `shape`: radii and border/focus widths for the shell, cards, messages,
  composer, controls and popovers.
- `layout`: content width, banner geometry, card height and selected-item
  indicator dimensions.
- `motion`: transition durations, easing, hover lift and decoration timing.
- `blur`: content, composer and popover backdrop blur.
- `color`: canvas, sidebar, header, surfaces, text, accent states, cards,
  messages, composer, controls, project selector, hero, popovers, selection,
  scrollbars, status colors and decorative elements.
- `effect`: per-mode opacity, shadows, text shadow and accent glow.

## Pencil mapping

Pencil variables should use the same semantic names where practical. Map
Pencil Light variables to `tokens.light`, Dark variables to `tokens.dark`, and
mode-independent dimensions or type choices to `tokens.shared`. The injector
normalizes the theme and exposes the values as `--ds-<group>-<token>` CSS
variables, for example:

```text
tokens.light.color.messageUser  -> --ds-color-message-user
tokens.dark.effect.cardShadow   -> --ds-effect-card-shadow
tokens.shared.shape.cardRadius  -> --ds-shape-card-radius
```

## Safety and compatibility

- Colors must be hex, `rgb(a)`, `hsl(a)`, or `transparent`.
- Other token values allow only a conservative CSS-value character set and
  reject declaration separators, braces, markup, backticks, and backslashes.
- Theme images must remain inside their theme directory and use PNG, JPEG, or
  WebP.
- Schema v1 `colors` values are migrated to the closest v2 semantic roles at
  load time; the original file is not rewritten.
