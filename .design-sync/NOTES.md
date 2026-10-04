# design-sync notes — Appliqué UIKit fork

Project: **The Doctor OS - Appliqué** (`projectId` in `config.json`). Shape: `package`, entry `packages/uikit/dist/uikit.esm.js`, global `window.Applique`. Authored previews: all 53 components, every cell graded good.

## Rebuild recipe (Windows, pnpm 8, Node 24)
1. `npm i -g pnpm@8` (the lockfile is v6; pnpm 9+ rejects it). `pnpm i --frozen-lockfile`.
2. `FORCE=1 node scripts/build.js` (all packages; ~40 min on this machine, rollup runs in parallel). It aborts on the first rollup error, leaving some packages stale — check every `components/*/dist/*.esm.js` and `packages/uikit/dist/` exist. `node scripts/build.js <target>` builds one package.
3. `node .design-sync/prepare-css.mjs` — compiles `packages/uikit/design.scss` -> `design.css`, prepends the Google Fonts import, writes the per-`dist/` `tsconfig.json` stubs and `packages/uikit/dist/global-baseprops.d.ts`. **Re-run after every build** (builds wipe `dist/`).
4. `node .design-sync/gen-dtsprops.mjs` — regenerates `cfg.dtsPropsFor` from each component's built `.d.ts`.
5. Converter: `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./.design-sync/.cache/nm18/node_modules --entry ./packages/uikit/dist/uikit.esm.js --out ./ds-bundle` (stage `.ds-sync/` first; see the skill). `DS_CHROMIUM_PATH` must point at a Chrome/Edge (Playwright's CDN download timed out here): `C:/Program Files/Google/Chrome/Application/chrome.exe`.

## Why the odd setup (do not "fix")
- **`rollup.config.js` was patched** (2 lines in `generateScopedName`): the upstream code assumes POSIX paths; on Windows every CSS class became `aui-D:\The Doctor OS\...` and no selector matched (all components unstyled). The patch normalizes backslashes, producing the same `aui-<component>-<name>` names as a Linux build. Offer it upstream.
- **`.design-sync/.cache/nm18/node_modules`** is a scratch dir with React 18.3.1 + react-dom + @types/react 18 + a junction to `@applique-ui/uikit-icons`. The preview harness mounts with `ReactDOM.createRoot`, which React 16.14 (the repo's version) lacks; `--node-modules` points here only so the vendored React is 18. Recreate: `npm i react@18.3.1 react-dom@18.3.1 @types/react@18` there, then junction `node_modules/@applique-ui/uikit-icons` -> repo `node_modules/@applique-ui/uikit-icons`. Do NOT copy newer `@types/react` into the repo root `node_modules` (it broke the TypeScript build of `field`/`page`).
- **Per-`dist/` `tsconfig.json` stubs (`{}`)**: esbuild auto-discovers the repo-root `tsconfig.json`, whose `paths` map `@applique-ui/*` to `src/` (no SCSS loader) — the stubs make it use the built `dist/`. `cfg.tsconfig` points at `.design-sync/tsconfig.dist.json` for the converter's own resolution.
- **`dtsPropsFor` is generated**, because the umbrella re-exports sibling packages whose props extend an ambient global `BaseProps`, so the converter's own extraction emitted empty bodies. Sub-component props (`Table.Column`, `Grid.Column`, ...) are NOT in the contracts; the previews and `conventions.md` cover them.
- `pagination` resolved `uikit-icons@1.0.55` from the lockfile (lacks `ChevronSkip*`). Local fix, not committed: repoint `components/pagination/node_modules/uikit-icons` at the `1.0.56` store entry (`node_modules/.pnpm/@applique-ui+uikit-icons@1.0.56/...`).
- `DropDown` and `InputCheckBox` (deprecated aliases) are excluded via `componentSrcMap`: they collide with `Dropdown`/`InputCheckbox` on case-insensitive filesystems. Groups come from stub docs in `.design-sync/docs/` via `docsMap` (the repo's own `.mdx` docs import other mdx and are not synced).
- Fonts: Roboto + Noto Sans Devanagari/Bengali load from Google Fonts via an `@import` at the top of `design.css` (user-approved; OFL). Designs need internet for fonts.

## Component facts learned while authoring
- Date inputs take `Date` objects; custom format strings use date-fns tokens (`yyyy`, `dd`) and throw otherwise. A `displayFormat` like `dd MMM yyyy` renders as a mask with literal `MMM yyyy` placeholders — use the default.
- `Fab` opens on hover/click (previews click the trigger on mount). `Modal` renders in a Portal (previews show `Modal.Layout` standalone). `NavBar` Dark vs Light look identical and show a hard-coded Myntra logo. `InputSwitch` is just a checkbox. `VirtualList direction="horizontal"` never paints in the capture (cells exist in the DOM), so the preview uses `fixedItemCountFromStart` instead. `Text color="gray"` is near-invisible; `Layout type="stack"` is inline, `type="row"` is one-per-row.

## Known render warns (triaged, expected)
- `[RENDER_ERRORS] ErrorBoundary`: the `WithFallback` story throws on purpose; React reports the caught error as a page error.
- `[RENDER_THIN] Tooltip`: "variants render identically" — Tooltip content renders in a portal/container so the cells look alike in the grid check.

## Re-sync risks
- `dtsPropsFor` and every authored preview mirror today's prop names; a prop rename upstream silently breaks previews (re-run `gen-dtsprops.mjs` and recapture).
- Previews run on React 18 while the library targets React 16: a library move to React 18 would let `nm18` go away.
- The rollup patch lives only in this fork; re-basing onto upstream would reintroduce the unstyled build on Windows.
- Only a subset of states is verified (no hover/drag/focus). Compound sub-component props are undocumented in the `.d.ts` contracts.
- Fonts come from a live Google Fonts URL; offline renders fall back to system sans-serif.
- `DESIGN.md` (Doctor OS spec, one folder above the repo) was used as context for `conventions.md`; its product tokens (`--text-body`, `--font-family`, ...) are NOT part of this bundle, so the conventions tell the agent not to use `var(--...)`. Add them as a themed CSS entry later if wanted.
