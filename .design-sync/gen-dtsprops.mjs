// Generates cfg.dtsPropsFor from each component's built dist/*.d.ts.
// Why: the umbrella @applique-ui/uikit re-exports sibling workspace packages whose Props
// extend an ambient global `BaseProps`, so the converter's own extraction emits empty bodies.
// Usage (repo root, after the build): node .design-sync/gen-dtsprops.mjs
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const require = createRequire(resolve('.ds-sync/package.json'));
const { Project, ts, Node } = require('ts-morph');

const ROOT = resolve('.');
const cfgPath = join(ROOT, '.design-sync/config.json');
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));

// Name -> package dir, from the umbrella's own re-exports.
const map = {};
for (const f of ['components.d.ts', 'index.d.ts']) {
  const txt = readFileSync(join(ROOT, 'packages/uikit/dist', f), 'utf8');
  for (const m of txt.matchAll(/export \{ default as (\w+) \} from ['"]@applique-ui\/([\w-]+)['"]/g)) map[m[1]] = m[2];
}

const project = new Project({
  skipAddingFilesFromTsConfig: true,
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX, skipLibCheck: true, strict: false },
});
project.addSourceFileAtPath(join(ROOT, 'packages/uikit/dist/global-baseprops.d.ts'));
project.addSourceFileAtPath(join(ROOT, '.design-sync/.cache/nm18/node_modules/@types/react/index.d.ts'));

const SKIP = new Set(['ref', 'key']);
const out = {};
const report = [];

for (const [name, dir] of Object.entries(map)) {
  const idx = join(ROOT, 'components', dir, 'dist/index.d.ts');
  if (!existsSync(idx)) { report.push(`${name}: no dist/index.d.ts`); continue; }
  const sf = project.addSourceFileAtPath(idx);
  project.addSourceFilesAtPaths(join(ROOT, 'components', dir, 'dist/**/*.d.ts'));
  const decl = sf.getExportedDeclarations().get('default')?.[0];
  if (!decl) { report.push(`${name}: no default export`); continue; }
  const checker = project.getTypeChecker();
  // Props type: first type arg of the class heritage, or first parameter of the function/const.
  let propsType;
  if (Node.isClassDeclaration(decl)) {
    const arg = decl.getExtends()?.getTypeArguments()[0];
    propsType = arg?.getType();
  } else {
    const t = decl.getType();
    const sig = t.getCallSignatures()[0] ?? t.getConstructSignatures()[0];
    const p = sig?.getParameters()[0];
    propsType = p ? checker.getTypeOfSymbolAtLocation(p, decl) : undefined;
    if (!propsType && t.getCallSignatures()[0] == null) {
      // ForwardRef/memo/ComponentType<P>: take P from the first type argument.
      propsType = t.getTypeArguments()[0] ?? t.getAliasTypeArguments()[0];
    }
  }
  if (!propsType) { report.push(`${name}: props type not found`); continue; }
  const lines = [];
  for (const prop of propsType.getProperties()) {
    const pn = prop.getName();
    if (SKIP.has(pn)) continue;
    const d = prop.getDeclarations()[0];
    if (!d) continue;
    const text = d.getText().replace(/\s+/g, ' ');
    const docs = Node.isJSDocable(d) ? d.getJsDocs().map((j) => j.getDescription().trim()).filter(Boolean).join(' ') : '';
    const t = prop.getTypeAtLocation(decl).getText(decl, ts.TypeFormatFlags.NoTruncation).replace(/import\("[^"]*"\)\./g, '');
    const opt = prop.isOptional() || /\?/.test(text.split(':')[0]) ? '?' : '';
    const typ = (t.length > 200 ? 'unknown' : t)
      .replace(/\bIconName\b/g, 'string')
      .replace(/(?<![.\w])(ReactNode|ReactElement|CSSProperties)\b/g, 'React.$1');
    if (docs) lines.push(`/** ${docs.replace(/\*\//g, '')} */`);
    lines.push(`${/^[A-Za-z_$][\w$]*$/.test(pn) ? pn : JSON.stringify(pn)}${opt}: ${typ};`);
  }
  if (!lines.length) { report.push(`${name}: 0 props`); continue; }
  out[name] = lines.join('\n');
}

cfg.dtsPropsFor = out;
writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
console.log(`dtsPropsFor: ${Object.keys(out).length}/${Object.keys(map).length}`);
for (const r of report) console.log('  ! ' + r);
