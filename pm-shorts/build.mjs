// Bundles index.html + style.css + cards.js + app.js into one file: pm-shorts/dist/pm-shorts.html
// Run: node pm-shorts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dir = dirname(fileURLToPath(import.meta.url))
const read = (f) => readFileSync(join(dir, f), 'utf8')
// Guard against "</script>" inside inlined JS terminating the tag early.
const safe = (js) => js.replace(/<\/script>/gi, '<\\/script>')

const html = read('index.html')
  .replace('<link rel="stylesheet" href="style.css">', () => `<style>\n${read('style.css')}\n</style>`)
  .replace('<script src="cards.js"></script>', () => `<script>\n${safe(read('cards.js'))}\n</script>`)
  .replace('<script src="app.js"></script>', () => `<script>\n${safe(read('app.js'))}\n</script>`)

mkdirSync(join(dir, 'dist'), { recursive: true })
writeFileSync(join(dir, 'dist', 'pm-shorts.html'), html)
console.log('wrote pm-shorts/dist/pm-shorts.html', (html.length / 1024).toFixed(1) + ' KB')

// Variant for hosts that wrap the page in their own <html>/<head>/<body> skeleton (e.g. Claude artifacts):
// keep only <title>, <style>, the <body> content and the scripts; size the app to the host frame.
const title = html.match(/<title>[\s\S]*?<\/title>/)[0]
const style = html.match(/<style>[\s\S]*?<\/style>/)[0]
const body = html.match(/<body>([\s\S]*)<\/body>/)[1]
const hostFit =
  '<style>\nhtml, body { height: 100%; }\n.app { height: 100%; max-height: none; }\n@media (min-width: 500px) { .app { height: min(100%, 880px); } }\n</style>'
const artifact = `${title}\n${style}\n${hostFit}\n${body.trim()}\n`
writeFileSync(join(dir, 'dist', 'pm-shorts.artifact.html'), artifact)
console.log('wrote pm-shorts/dist/pm-shorts.artifact.html', (artifact.length / 1024).toFixed(1) + ' KB')
