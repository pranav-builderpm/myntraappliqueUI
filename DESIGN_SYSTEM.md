# Appliqué Design System (Myntra UIKit) — extracted reference

Extracted from this repo (`@applique-ui/uikit` v0.0.74, React + TypeScript + SCSS, pnpm monorepo). Sources are cited per section.

## Architecture

| Layer | Location | Role |
|---|---|---|
| Theme tokens | `themes/nuclei/src/tokens.yml` (default, **SCM Purple**), `themes/unity/src/tokens.yml` (**SCM Blue**) | Source of truth for colors, text styles, shadows, sizes, grid. Compiled to `tokens.scss` / `tokens.js` |
| Token engine | `packages/accoutrement` | SCSS functions/maps: `color()`, `font-size()`, `font-family()`, spacing/radius/border/z-index/shadow configs |
| Base design | `packages/uikit-design` (`_color`, `_typography`, `_size`, `_shadow`, `_z-index`, …) | Defaults merged with theme tokens |
| Global styles | `packages/uikit/design.scss` | normalize.css + html/body base (Roboto, 1.5 line-height, `box-sizing: border-box`, `border-color: currentColor`) |
| Components | `components/*` (53 packages) | One package per component, re-exported by `packages/uikit` as `window.Applique`/`@applique-ui/uikit` |
| Icons | `@applique-ui/uikit-icons` | Icons are components passed to `icon` props: `<Button icon={Bell}>` |

Class names are scoped `aui-<component>-<name>` and are **not** public API. Styling is prop-driven (no utility classes, no CSS custom properties).

## Design tokens (Nuclei theme — default)

### Color
Each hue has a 5-step ramp: `darker / dark / base / light / lighter`.

| Role | darker | dark | **base** | light | lighter |
|---|---|---|---|---|---|
| primary (SCM Purple) | hsl(244,53%,22%) | hsl(244,54%,36%) | **hsl(244,54%,53%)** | hsl(244,54%,73%) | hsl(251,100%,93%); lightest hsl(253,100%,96%) |
| success | hsl(138,54%,22%) | hsl(138,54%,36%) | **hsl(138,53%,53%)** | hsl(138,54%,73%) | hsl(138,53%,85%) |
| warning | hsl(40,86%,28%) | hsl(40,87%,44%) | **hsl(40,87%,53%)** | hsl(40,87%,73%) | hsl(40,87%,85%) |
| danger | hsl(0,54%,22%) | hsl(0,54%,36%) | **hsl(0,54%,53%)** | hsl(0,54%,73%) | hsl(0,53%,85%) |
| gray | hsl(0,0%,83%) | hsl(0,0%,90%) | **hsl(0,0%,93%)** | hsl(210,22%,96%) | hsl(0,0%,95%) |

`*-text` variants = base at 0.87 alpha. Note `packages/uikit-design/_color.scss` defines a second, softer set of defaults (primary `hsl(244,53.5%,52.7%)`, green `hsl(138,38%,55%)`, red `hsl(2,55%,62%)`, yellow `hsl(40,84%,64%)`, gray `#e6e6e6`) which the theme overrides.

Unity theme differs mainly in primary: **SCM Blue** `hsl(185,68%,30/40/50/69/85%)`, plus nav-bar/top-bar tokens (nav-bar bg `hsl(270,21%,15%)`, active `hsl(185,64%,51%)`).

### Text colors
- dark: 0.87 (high emphasis) · 0.54 (mid) · 0.27 (disabled) on `rgb(0,0,0)`
- light: same alphas on white

### Typography — Roboto, sans-serif (Noto Sans Devanagari/Bengali added in the synced bundle)
| Style | Size | Weight | Notes |
|---|---|---|---|
| title | 28px | 700 | |
| h1 | 24px | 400 | |
| h2 | 20px | 500 | |
| h3 | 16px | 400 | |
| h4 | 14px | 700 | |
| body | 14px | 400 | root/body default |
| p / paragraph | 12px | 400 | |
| caption | 10px | 400 | |
| button | 12px | 500 | uppercase |
| text-link | 12px | 500 | uppercase |

### Spacing / size scale
`2xs 4 · xs 8 · s 12 · r 16 · m 20 · l 24 · xl 32 · 2xl 40` px; vertical grid unit **16px**.
Accoutrement named sizes (multiples of a base unit derived from the 16px root; exact px not verified): `small 1x · medium 2x · large 4x · xl 6x · xxl 8x · xxxl 10x`. Fixed sizes: nav-bar width 56–252px, top-bar height 56px, notification width 600px.

### Radius, border, shadow, z-index
- Radius: default 0; button/banner/list/tooltip `#1x`; circle button `#5x`; nav-bar item `#8x` (unit multiples; px value not verified); checkbox 2px; breadcrumb 2px.
- Borders: default `1px solid`; keyboard-focus `1px dashed primary`; input states (default/hovered/focused/filled/disabled/error) each have their own color token.
- Shadow: `flat: none`, `raised: 0 3px 11px 0 rgba(0,0,0,.21)`.
- Z-index order (low→high): dropdown, top-bar, nav-bar, top-bar.dropdown, modal, modal.dropdown, checkbox, fab, notification. (`uikit-design` also exposes nav 1000 / modal 1100 / pop-over 1200.)

## Components (53)

Grouped as in `.design-sync/docs/`:

- **Actions:** Button, ButtonGroup, Fab, Dropdown
- **Forms:** Field, Form, SchemaForm, Input, InputText, InputTextArea, InputNumber, InputMasked, InputSelect, InputDate, InputMonth, InputFile, InputRadio, InputCheckbox, InputSwitch
- **Layout:** Grid, Layout, Page, Section
- **Navigation:** BreadCrumb, NavBar, TopBar, TopNav, Tabs, Stepper, Pagination
- **Feedback:** Alert/Banner, Loader, Modal, Progress, Tooltip, ErrorBoundary
- **Data display:** Accordion, Avatar, Badge/Tag, Icon, Image, List, Table, Text/T, VirtualGrid, VirtualList
- **Utilities:** ClickAway, Measure, Portal, ThemeProvider

Key prop vocabularies:
- `Button type` primary | secondary | tertiary | link | text; `size` xs | small | regular | large; also `icon`, `secondaryIcon`, `loading`, `disabled`, `notifications`.
- `Text color` primary | success | warning | error | dark | light | gray; `emphasis` high | medium | disabled.
- `Badge/Banner type` info | success | warning | error.
- `Grid gap` none | xx-small | x-small | small | base | large; `Layout gutter` none | small … xxxl.
- Compound members: `Accordion.Item`, `Form.Text/Select/Date/Number/Checkbox/Masked/Radio/TextArea/File/Action`, `Grid.Column`, `Modal.Layout`, `NavBar.Group/Item`, `Progress.Bar/Circle`, `Stepper.Step`, `Table.Column/Row/Filter`, `Tabs.Tab`, `Text.Title/H1–H4/Body/P/Caption`, `TopBar.Item`.

Full typed props: `.design-sync/config.json` (`dtsPropsFor`), per-component docs in `components/<name>/docs/` (`Api.mdx`, `Guidelines.mdx`, `Overview.mdx`), and authored previews in `.design-sync/previews/*.tsx`.

## Existing design-sync setup
`.design-sync/` already contains a Claude Design sync config (`projectId` in `config.json`, notes in `NOTES.md`, usage conventions in `conventions.md`). I did **not** push anything to claude.ai/design; that is an outward-facing write and was not requested.

## Running locally
```bash
npm i -g pnpm@8          # lockfile is v6; pnpm 9+/10 rejects it
pnpm install --frozen-lockfile
npm run docs:prepare     # generates components/*/docs/data.js (needed by the docs site)
BROWSER=none PORT=8082 node tools/start-dev-server button   # one component at a time
```
