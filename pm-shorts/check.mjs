// Validates pm-shorts content. Run: node pm-shorts/check.mjs
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { TOPICS, SOURCES, CARDS } = require('./cards.js')

const MAX_WORDS = 60
const problems = []
const ids = new Set()
const urls = new Set()
const topicIds = new Set(TOPICS.map((t) => t.id))
const hosts = {
  lenny: 'www.lennysnewsletter.com',
  aakash: 'www.news.aakashg.com',
  hellopm: ['hellopm.co', 'thehellopm.substack.com'],
  productschool: 'productschool.com',
  svpg: 'www.svpg.com',
  deepstash: 'deepstash.com',
}

for (const c of CARDS) {
  const words = c.summary.trim().split(/\s+/).length
  if (words > MAX_WORDS) problems.push(`${c.id}: ${words} words (max ${MAX_WORDS})`)
  if (words < 35) problems.push(`${c.id}: only ${words} words — too thin`)
  if (ids.has(c.id)) problems.push(`${c.id}: duplicate id`)
  ids.add(c.id)
  if (!topicIds.has(c.topic)) problems.push(`${c.id}: unknown topic ${c.topic}`)
  if (!SOURCES[c.source]) problems.push(`${c.id}: unknown source ${c.source}`)
  if (![1, 2, 3].includes(c.level)) problems.push(`${c.id}: bad level`)
  if (!['read', 'listen', 'watch'].includes(c.format)) problems.push(`${c.id}: bad format`)
  try {
    const u = new URL(c.url)
    const allowed = [].concat(hosts[c.source])
    if (u.protocol !== 'https:') problems.push(`${c.id}: not https`)
    if (!allowed.includes(u.hostname)) problems.push(`${c.id}: host ${u.hostname} doesn't match source ${c.source}`)
    if (u.search) problems.push(`${c.id}: url has tracking/query params`)
  } catch {
    problems.push(`${c.id}: invalid url ${c.url}`)
  }
  if (urls.has(c.url)) problems.push(`${c.id}: duplicate url`)
  urls.add(c.url)
}

const byTopic = {}
for (const c of CARDS) byTopic[c.topic] = (byTopic[c.topic] || 0) + 1
for (const t of TOPICS) if (!byTopic[t.id]) problems.push(`topic ${t.id} has no cards`)

console.log(`${CARDS.length} cards, ${CARDS.filter((c) => c.core).length} essentials`)
console.log('per topic:', byTopic)
console.log(
  'longest summary:',
  Math.max(...CARDS.map((c) => c.summary.trim().split(/\s+/).length)),
  'words'
)
if (problems.length) {
  console.error('\nPROBLEMS:\n' + problems.join('\n'))
  process.exit(1)
}
console.log('OK')
