// Post-build step: compile packages/uikit/design.scss -> design.css, then prepend the Google Fonts
// import for the families DESIGN.md specifies (Roboto + Noto Sans Devanagari/Bengali; all OFL).
// design.css is a generated artifact; re-run this after every build.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const css = 'packages/uikit/design.css';
execSync('pnpm run build', { cwd: 'packages/uikit', stdio: 'inherit' });
const FONTS =
  '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;500;700&family=Noto+Sans+Bengali:wght@400;500;700&display=swap");\n';
const body = readFileSync(css, 'utf8');
if (!body.includes('fonts.googleapis.com')) writeFileSync(css, FONTS + body);

// dist/ stubs (rebuilds wipe dist, so recreate): an empty tsconfig.json per dist/ so esbuild ignores
// the root tsconfig's `@applique-ui/*` -> src paths, and the ambient BaseProps the .d.ts files extend.
import { readdirSync, existsSync } from 'node:fs';
for (const root of ['components', 'packages', 'themes']) {
  for (const d of readdirSync(root)) {
    const dist = `${root}/${d}/dist`;
    if (existsSync(dist)) writeFileSync(`${dist}/tsconfig.json`, '{}\n');
  }
}
writeFileSync(
  'packages/uikit/dist/global-baseprops.d.ts',
  "import { ReactNode } from 'react';\ndeclare global {\n  interface BaseProps {\n    /** CSS class name. */\n    className?: string;\n    children?: ReactNode;\n  }\n}\n",
);
