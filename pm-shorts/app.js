(function () {
  'use strict'
  var DATA = window.PMDATA
  var TOPICS = DATA.TOPICS
  var SOURCES = DATA.SOURCES
  var CARDS = DATA.CARDS
  var TOPIC = {}
  TOPICS.forEach(function (t) { TOPIC[t.id] = t })
  var CARD = {}
  CARDS.forEach(function (c) { CARD[c.id] = c })

  /* ---------------- onboarding config ---------------- */
  var STAGES = [
    { id: 'explorer', e: '👀', t: 'Just curious about product', d: 'I want to understand what PMs do', level: 1 },
    { id: 'aspiring', e: '🚀', t: 'Aspiring PM', d: 'I want my first PM role', level: 1 },
    { id: 'junior', e: '🌱', t: 'Associate / junior PM', d: '0–2 years in product', level: 1.5 },
    { id: 'pm', e: '🧩', t: 'Product manager', d: '2–6 years in product', level: 2 },
    { id: 'senior', e: '🏔️', t: 'Senior / group PM', d: 'I lead PMs or big areas', level: 2.5 },
    { id: 'leader', e: '🧭', t: 'Product leader', d: 'Director, VP, CPO or founder', level: 3 }
  ]
  var GOALS = [
    { id: 'job', e: '💼', t: 'Land a PM job', d: 'Interviews, portfolio, transition', topics: ['careers', 'sense', 'execution'] },
    { id: 'craft', e: '🛠️', t: 'Get better at the craft', d: 'Metrics, prioritization, discovery', topics: ['metrics', 'prioritization', 'discovery', 'sense'] },
    { id: 'ai', e: '🤖', t: 'Learn AI product management', d: 'Evals, AI product sense, AI roadmaps', topics: ['ai'] },
    { id: 'strategy', e: '🏔️', t: 'Think more strategically', d: 'Vision, strategy, PMF', topics: ['strategy', 'growth', 'leadership'] },
    { id: 'current', e: '⚡', t: 'Stay current in minutes a day', d: 'Signal from top PM voices', topics: ['ai', 'leadership', 'strategy'] }
  ]
  var BACKGROUNDS = [
    { id: 'eng', e: '💻', t: 'Engineering / tech', hint: ['discovery', 'strategy'] },
    { id: 'design', e: '🎨', t: 'Design / research', hint: ['metrics', 'strategy'] },
    { id: 'marketing', e: '📣', t: 'Marketing / growth', hint: ['metrics', 'execution'] },
    { id: 'business', e: '📋', t: 'Business / ops / consulting', hint: ['execution', 'sense'] },
    { id: 'student', e: '🎓', t: 'Student / fresher', hint: ['careers', 'sense'] },
    { id: 'other', e: '✨', t: 'Something else', hint: [] }
  ]
  var MINUTES = [
    { id: 2, e: '☕', t: '2 minutes', d: '3 shorts a day', goal: 3 },
    { id: 5, e: '🚶', t: '5 minutes', d: '5 shorts a day', goal: 5 },
    { id: 10, e: '🏃', t: '10 minutes', d: '8 shorts a day', goal: 8 }
  ]
  var FORMATS = [
    { id: 'read', e: '📖', t: 'Articles' },
    { id: 'listen', e: '🎧', t: 'Podcasts' },
    { id: 'watch', e: '▶️', t: 'Replays & talks' }
  ]
  var LEVELS = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' }
  var FORMAT_ICON = { read: '📖 Article', listen: '🎧 Podcast', watch: '▶️ Replay' }

  /* ---------------- state ---------------- */
  var KEY = 'pmshorts:v1'
  function defaults() {
    return {
      onboarded: false,
      profile: { stage: null, goal: null, background: null, topics: [], minutes: 5, formats: ['read'] },
      weights: {}, relevance: {}, saved: [], everRead: {}, days: {}, opens: 0, theme: 'auto'
    }
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY)
      if (raw) {
        var s = JSON.parse(raw)
        var d = defaults()
        for (var k in d) if (s[k] === undefined) s[k] = d[k]
        return s
      }
    } catch (e) {}
    return defaults()
  }
  var S = load()
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch (e) {} }

  /* ---------------- helpers ---------------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel) }
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)) }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  function dstr(d) {
    d = d || new Date()
    var m = d.getMonth() + 1, day = d.getDate()
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day
  }
  function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return d }
  function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0; return Math.abs(h % 1000) / 1000 }
  function wc(s) { return s.trim().split(/\s+/).length }
  function goalN() { var m = MINUTES.filter(function (x) { return x.id === S.profile.minutes })[0]; return m ? m.goal : 5 }
  function dayRec(k) { return S.days[k] || (S.days[k] = { ids: [], met: false }) }
  function todayCount() { return (S.days[dstr()] || { ids: [] }).ids.length }
  function streak() {
    var n = 0, i = 0
    if (!(S.days[dstr()] && S.days[dstr()].met)) i = 1
    for (; i < 400; i++) { var r = S.days[dstr(daysAgo(i))]; if (r && r.met) n++; else break }
    return n
  }
  function bestStreak() {
    var keys = Object.keys(S.days).filter(function (k) { return S.days[k].met }).sort()
    var best = 0, cur = 0, prev = null
    keys.forEach(function (k) {
      var t = new Date(k + 'T00:00:00').getTime()
      cur = prev !== null && Math.round((t - prev) / 86400000) === 1 ? cur + 1 : 1
      prev = t; if (cur > best) best = cur
    })
    return best
  }
  var toastTimer
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show')
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show') }, 2400)
  }
  function applyTheme() {
    var r = document.documentElement
    if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.theme)
  }

  /* ---------------- ranking ---------------- */
  function stageLevel() { var s = STAGES.filter(function (x) { return x.id === S.profile.stage })[0]; return s ? s.level : 1.5 }
  function scoreCard(c) {
    var p = S.profile, sc = 0
    if (p.topics.indexOf(c.topic) > -1) sc += 3
    var g = GOALS.filter(function (x) { return x.id === p.goal })[0]
    if (g && g.topics.indexOf(c.topic) > -1) sc += 1.5
    var b = BACKGROUNDS.filter(function (x) { return x.id === p.background })[0]
    if (b && b.hint.indexOf(c.topic) > -1) sc += 0.7
    sc += Math.min(2, S.weights[c.topic] || 0)
    sc += Math.max(0, 2 - Math.abs(c.level - stageLevel())) * 1.2
    if (p.formats.length) sc += p.formats.indexOf(c.format) > -1 ? 1 : -0.5
    if (c.core) sc += 0.5
    sc += S.everRead[c.id] ? -3 : 2
    sc += hash(c.id + dstr()) * 0.8
    return sc
  }
  var filter = null // {type:'topic'|'source'|'saved'|'q', value}
  var feed = []
  function buildFeed() {
    var list = CARDS.slice()
    if (filter) {
      list = list.filter(function (c) {
        if (filter.type === 'topic') return c.topic === filter.value
        if (filter.type === 'source') return c.source === filter.value
        if (filter.type === 'saved') return S.saved.indexOf(c.id) > -1
        if (filter.type === 'q') {
          var q = filter.value.toLowerCase()
          return (c.headline + ' ' + c.summary + ' ' + c.from + ' ' + TOPIC[c.topic].name + ' ' + SOURCES[c.source].name).toLowerCase().indexOf(q) > -1
        }
        return true
      })
    } else {
      list = list.filter(function (c) {
        var r = S.relevance[c.topic] || 'all'
        if (r === 'none') return false
        if (r === 'major') return !!c.core
        return true
      })
    }
    var scored = list.map(function (c) { return { c: c, s: scoreCard(c) } })
    scored.sort(function (a, b) { return b.s - a.s })
    feed = scored.map(function (x) { return x.c })
  }

  /* ---------------- feed rendering ---------------- */
  function srcBadge(c) { var s = SOURCES[c.source]; return '<span class="tag src" style="background:' + s.color + '">' + esc(s.short) + '</span>' }
  function cardHTML(c, i) {
    var t = TOPIC[c.topic], s = SOURCES[c.source]
    var saved = S.saved.indexOf(c.id) > -1
    var n = wc(c.summary)
    var cta = c.format === 'listen' ? 'Listen to the episode' : c.format === 'watch' ? 'Open the replay' : 'Read the full article'
    return '<section class="card" data-id="' + c.id + '" aria-label="Short ' + (i + 1) + ' of ' + feed.length + '">' +
      '<div class="card-in">' +
      '<div class="hero" style="background:linear-gradient(135deg,hsl(' + t.hue + ',68%,52%),hsl(' + (t.hue + 35) + ',62%,38%))"><span class="big" aria-hidden="true">' + t.emoji + '</span><span class="topic">' + esc(t.name) + '</span></div>' +
      '<div class="body">' +
      '<div class="meta">' + srcBadge(c) + '<span class="tag">' + LEVELS[c.level] + '</span><span class="tag">' + FORMAT_ICON[c.format] + '</span>' + (c.core ? '<span class="tag" title="Essential">⭐ Essential</span>' : '') + '</div>' +
      '<h2 class="headline">' + esc(c.headline) + '</h2>' +
      '<p class="summary">' + esc(c.summary) + '</p>' +
      '<div class="from"><i>From:</i> ' + esc(c.from) + (c.paywall ? ' · <i>may be partly paywalled</i>' : '') + '</div>' +
      '</div>' +
      '<div class="actions">' +
      '<button class="iconbtn" data-act="save" aria-pressed="' + saved + '" aria-label="Save">' + (saved ? '★ Saved' : '☆ Save') + '</button>' +
      '<button class="iconbtn" data-act="share" aria-label="Share">↗ Share</button>' +
      '<span class="count">' + n + ' words · ' + Math.max(15, Math.round(n / 3.3)) + 's</span>' +
      '</div>' +
      '<a class="cta" data-act="open" href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer"><span>' + cta + '<small>on ' + esc(s.name) + '</small></span><span class="arrow" aria-hidden="true">↗</span></a>' +
      '<div class="hint">Summary by PM Shorts from the source\'s public description · swipe up for next ↑</div>' +
      '</div></section>'
  }
  var obs, timers = {}
  function renderFeed(startId) {
    buildFeed()
    var el = $('#feed')
    if (!feed.length) {
      el.innerHTML = '<section class="card endcard"><div class="emoji">🫥</div><h2>Nothing here yet</h2><p class="muted">' +
        (filter && filter.type === 'saved' ? 'Save a short with ☆ and it will show up here.' : filter ? 'No shorts match this filter.' : 'All your topics are muted. Unmute some in You → Relevance.') +
        '</p><button class="btn ghost" data-go="discover">Browse topics</button></section>'
    } else {
      var caught = feed.every(function (c) { return S.everRead[c.id] })
      el.innerHTML = feed.map(cardHTML).join('') +
        '<section class="card endcard"><div class="emoji">' + (caught ? '🎉' : '🏁') + '</div><h2>' + (caught ? "You're all caught up" : "That's the end of this feed") + '</h2>' +
        '<p class="muted">' + (caught ? 'You have read everything in this feed. Check back tomorrow, or explore another topic.' : 'Switch topics or check your daily Ritual.') + '</p>' +
        '<button class="btn" data-go="discover">Explore topics</button><button class="btn ghost" data-go="ritual">See my Ritual</button></section>'
    }
    el.scrollTop = 0
    if (startId) { var tgt = $('[data-id="' + startId + '"]', el); if (tgt) el.scrollTo({ top: tgt.offsetTop, behavior: 'auto' }) }
    renderFilterBar()
    observe()
    markScrollable()
  }
  function markScrollable() {
    $$('#feed .body').forEach(function (b) {
      b.classList.remove('scrolls')
      if (b.scrollHeight - b.clientHeight > 2) b.classList.add('scrolls')
    })
  }
  window.addEventListener('resize', markScrollable)
  function renderFilterBar() {
    var b = $('#filterbar')
    if (!filter) { b.hidden = true; b.innerHTML = ''; return }
    var label = filter.type === 'topic' ? TOPIC[filter.value].emoji + ' ' + TOPIC[filter.value].name : filter.type === 'source' ? SOURCES[filter.value].name : filter.type === 'saved' ? '★ Saved' : '🔎 “' + filter.value + '”'
    b.hidden = false
    b.innerHTML = '<button class="chip on" data-act="clearfilter" aria-label="Clear filter">' + esc(label) + ' &nbsp;✕</button>'
  }
  function observe() {
    if (obs) obs.disconnect()
    Object.keys(timers).forEach(function (k) { clearTimeout(timers[k].a); clearTimeout(timers[k].b) })
    timers = {}
    obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.getAttribute('data-id')
        if (!id) return
        if (en.isIntersecting && en.intersectionRatio >= 0.6) {
          var idx = feed.findIndex(function (c) { return c.id === id })
          $('#pos').textContent = (idx + 1) + ' / ' + feed.length
          timers[id] = {
            a: setTimeout(function () { markRead(id) }, 3000),
            b: setTimeout(function () { var c = CARD[id]; S.weights[c.topic] = Math.min(3, (S.weights[c.topic] || 0) + 0.3); save() }, 6000)
          }
        } else if (timers[id]) { clearTimeout(timers[id].a); clearTimeout(timers[id].b); delete timers[id] }
      })
    }, { root: $('#feed'), threshold: [0.6] })
    $$('#feed .card[data-id]').forEach(function (n) { obs.observe(n) })
    if (!feed.length) $('#pos').textContent = ''
  }
  function markRead(id) {
    var rec = dayRec(dstr())
    S.everRead[id] = S.everRead[id] || dstr()
    if (rec.ids.indexOf(id) === -1) rec.ids.push(id)
    var before = rec.met
    if (!rec.met && rec.ids.length >= goalN()) { rec.met = true }
    save(); updateHeader()
    if (rec.met && !before) toast('🔥 Daily goal reached · ' + streak() + '-day streak')
  }

  /* ---------------- header ---------------- */
  function updateHeader() {
    var g = goalN(), n = Math.min(todayCount(), g), c = 2 * Math.PI * 11
    $('#ringfg').setAttribute('stroke-dasharray', c.toFixed(1))
    $('#ringfg').setAttribute('stroke-dashoffset', (c * (1 - n / g)).toFixed(1))
    $('#goaltxt').textContent = n + '/' + g
    $('#streaktxt').textContent = streak()
  }

  /* ---------------- views ---------------- */
  var current = 'feed'
  function go(view) {
    current = view
    $$('.view').forEach(function (v) { v.hidden = v.id !== 'v-' + view })
    $$('nav button').forEach(function (b) { if (b.dataset.go === view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current') })
    $('#pos').hidden = view !== 'feed'
    if (view === 'feed') { if (!feed.length || !$('#feed .card')) renderFeed(); $('#feed').focus({ preventScroll: true }) }
    if (view === 'discover') renderDiscover()
    if (view === 'saved') renderSaved()
    if (view === 'ritual') renderRitual()
    if (view === 'you') renderYou()
  }
  function openFeed(f, startId) { filter = f; go('feed'); renderFeed(startId) }

  function renderDiscover() {
    var counts = {}
    CARDS.forEach(function (c) { counts[c.topic] = (counts[c.topic] || 0) + 1 })
    var bySrc = {}
    CARDS.forEach(function (c) { bySrc[c.source] = (bySrc[c.source] || 0) + 1 })
    $('#v-discover').innerHTML =
      '<h2 class="title">Discover</h2>' +
      '<input id="q" class="search" type="search" placeholder="Search shorts: RICE, evals, North Star…" aria-label="Search shorts" autocomplete="off">' +
      '<div id="results"></div>' +
      '<div id="browse"><h3 class="sec">Topics</h3><div class="grid">' +
      TOPICS.map(function (t) { return '<button class="tile" data-topic="' + t.id + '"><span class="e">' + t.emoji + '</span><b>' + esc(t.name) + '</b><span class="n">' + (counts[t.id] || 0) + ' shorts' + ((S.relevance[t.id] || 'all') !== 'all' ? ' · ' + (S.relevance[t.id] === 'none' ? 'muted' : 'essentials') : '') + '</span></button>' }).join('') +
      '</div><h3 class="sec">Sources</h3><div class="filterbar" style="padding:0;flex-wrap:wrap">' +
      Object.keys(SOURCES).map(function (k) { return '<button class="chip" data-source="' + k + '">' + esc(SOURCES[k].name) + ' · ' + (bySrc[k] || 0) + '</button>' }).join('') +
      '</div></div>'
    var q = $('#q')
    q.addEventListener('input', function () {
      var v = q.value.trim()
      $('#browse').hidden = !!v
      if (!v) { $('#results').innerHTML = ''; return }
      var hits = CARDS.filter(function (c) { return (c.headline + ' ' + c.summary + ' ' + c.from + ' ' + TOPIC[c.topic].name).toLowerCase().indexOf(v.toLowerCase()) > -1 })
      $('#results').innerHTML = hits.length
        ? '<div class="list">' + hits.map(function (c) { return '<button class="row" data-open="' + c.id + '" style="text-align:left;width:100%"><span class="e">' + TOPIC[c.topic].emoji + '</span><span class="t"><b>' + esc(c.headline) + '</b><span>' + esc(SOURCES[c.source].short) + ' · ' + LEVELS[c.level] + '</span></span></button>' }).join('') + '</div>'
        : '<div class="empty"><div class="emoji">🔎</div><p>No shorts match “' + esc(v) + '”.</p></div>'
    })
  }
  function renderSaved() {
    var items = S.saved.map(function (id) { return CARD[id] }).filter(Boolean)
    $('#v-saved').innerHTML = '<h2 class="title">Saved</h2>' + (items.length
      ? '<div class="list">' + items.map(function (c) {
        return '<div class="row"><span class="e">' + TOPIC[c.topic].emoji + '</span><div class="t"><b>' + esc(c.headline) + '</b><span>' + esc(SOURCES[c.source].short) + ' · ' + esc(c.from) + '</span><div class="links"><button data-viewsaved="' + c.id + '">View short</button><a href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer" data-act="open">Read ↗</a><button data-unsave="' + c.id + '">Remove</button></div></div></div>'
      }).join('') + '</div>'
      : '<div class="empty"><div class="emoji">☆</div><p>Nothing saved yet.<br>Tap <b>☆ Save</b> on any short to keep it for later.</p></div>')
  }
  var BADGES = [
    { id: 'first', e: '🌟', t: 'First short', ok: function () { return Object.keys(S.everRead).length >= 1 } },
    { id: 'goal', e: '🎯', t: 'Goal hit', ok: function () { return Object.keys(S.days).some(function (k) { return S.days[k].met }) } },
    { id: 's3', e: '🔥', t: '3-day streak', ok: function () { return bestStreak() >= 3 } },
    { id: 's7', e: '🏆', t: '7-day streak', ok: function () { return bestStreak() >= 7 } },
    { id: 'explorer', e: '🧭', t: '5 topics read', ok: function () { var s = {}; Object.keys(S.everRead).forEach(function (id) { if (CARD[id]) s[CARD[id].topic] = 1 }); return Object.keys(s).length >= 5 } },
    { id: 'saver', e: '🔖', t: '5 saved', ok: function () { return S.saved.length >= 5 } },
    { id: 'clicker', e: '↗️', t: 'Went to source ×3', ok: function () { return S.opens >= 3 } },
    { id: 'ten', e: '📚', t: '10 shorts read', ok: function () { return Object.keys(S.everRead).length >= 10 } },
    { id: 'all', e: '🎓', t: 'Read them all', ok: function () { return Object.keys(S.everRead).length >= CARDS.length } }
  ]
  function renderRitual() {
    var g = goalN(), n = Math.min(todayCount(), g), c = 2 * Math.PI * 40
    var cells = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(function (x) { return '<div class="dow">' + x + '</div>' }).join('')
    var lead = (daysAgo(27).getDay() + 6) % 7 // Monday-first offset
    for (var b = 0; b < lead; b++) cells += '<div class="blank"></div>'
    for (var i = 27; i >= 0; i--) {
      var d = daysAgo(i), k = dstr(d), r = S.days[k]
      var cls = r ? (r.met ? 'met' : r.ids.length ? 'part' : '') : ''
      cells += '<div class="' + cls + (i === 0 ? ' today' : '') + '" title="' + k + '">' + d.getDate() + '</div>'
    }
    var perTopic = {}
    Object.keys(S.everRead).forEach(function (id) { if (CARD[id]) perTopic[CARD[id].topic] = (perTopic[CARD[id].topic] || 0) + 1 })
    var tot = {}
    CARDS.forEach(function (x) { tot[x.topic] = (tot[x.topic] || 0) + 1 })
    $('#v-ritual').innerHTML =
      '<h2 class="title">Daily Ritual</h2>' +
      '<div class="hero-ritual"><svg class="bigring" viewBox="0 0 100 100" role="img" aria-label="' + n + ' of ' + g + ' shorts read today"><circle class="bg" cx="50" cy="50" r="40"/><circle class="fg" cx="50" cy="50" r="40" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - n / g)).toFixed(1) + '"/><text x="50" y="50">' + n + '/' + g + '</text></svg>' +
      '<div><b style="font-size:18px">' + (n >= g ? 'Goal reached today 🎉' : (g - n) + ' more to hit today’s goal') + '</b><div style="opacity:.85;font-size:13px;margin-top:4px">Small and steady beats long and rare. A streak day is just ' + g + ' shorts.</div></div></div>' +
      '<div class="stats"><div class="stat"><b>🔥 ' + streak() + '</b><span>Current streak</span></div><div class="stat"><b>🏅 ' + bestStreak() + '</b><span>Best streak</span></div><div class="stat"><b>📚 ' + Object.keys(S.everRead).length + '</b><span>Shorts read</span></div></div>' +
      '<h3 class="sec">Last 4 weeks</h3><div class="cal">' + cells + '</div>' +
      '<h3 class="sec">Badges</h3><div class="badges">' + BADGES.map(function (b) { var ok = b.ok(); return '<div class="badge' + (ok ? '' : ' locked') + '"><span class="e">' + b.e + '</span>' + b.t + '</div>' }).join('') + '</div>' +
      '<h3 class="sec">Topic progress</h3>' + TOPICS.map(function (t) { var a = perTopic[t.id] || 0, b = tot[t.id] || 1; return '<div style="margin:8px 0"><div class="small">' + t.emoji + ' ' + esc(t.name) + ' <span class="muted">· ' + a + '/' + b + '</span></div><div class="bar"><i style="width:' + Math.round(a / b * 100) + '%"></i></div></div>' }).join('')
  }
  function seg(name, opts, val) {
    return '<span class="seg" role="group">' + opts.map(function (o) { return '<button data-seg="' + name + '" data-val="' + o[0] + '" aria-pressed="' + (String(val) === String(o[0])) + '">' + o[1] + '</button>' }).join('') + '</span>'
  }
  function renderYou() {
    var p = S.profile
    var st = STAGES.filter(function (x) { return x.id === p.stage })[0], go_ = GOALS.filter(function (x) { return x.id === p.goal })[0]
    $('#v-you').innerHTML =
      '<h2 class="title">You</h2>' +
      '<div class="box"><div class="set"><span>Stage</span><b>' + (st ? esc(st.t) : '—') + '</b></div><div class="set"><span>Goal</span><b>' + (go_ ? esc(go_.t) : '—') + '</b></div>' +
      '<div class="set"><span>Topics</span><b style="text-align:right">' + (p.topics.map(function (id) { return TOPIC[id].emoji }).join(' ') || '—') + '</b></div></div>' +
      '<div style="margin:10px 0"><button class="btn ghost" data-act="redo">Edit my answers</button></div>' +
      '<h3 class="sec">Daily goal</h3><div class="box"><div class="set"><span>Shorts per day</span>' + seg('minutes', MINUTES.map(function (m) { return [m.id, m.goal] }), p.minutes) + '</div></div>' +
      '<h3 class="sec">Relevance control</h3><p class="muted small" style="margin:0 0 6px">Like Inshorts’ All / Major / No news: <b>Essentials</b> shows only ⭐ must-reads for that topic.</p>' +
      '<div class="box">' + TOPICS.map(function (t) { return '<div class="set"><span>' + t.emoji + ' ' + esc(t.name) + '</span>' + seg('rel:' + t.id, [['all', 'All'], ['major', 'Essentials'], ['none', 'Mute']], S.relevance[t.id] || 'all') + '</div>' }).join('') + '</div>' +
      '<h3 class="sec">Appearance</h3><div class="box"><div class="set"><span>Theme</span>' + seg('theme', [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']], S.theme) + '</div></div>' +
      '<div class="note"><b>About the content.</b> Each short is a 60-word-or-less summary written by PM Shorts from the public description of an article, episode or replay by Lenny’s Newsletter, Product Growth, HelloPM, Product School, SVPG and Deepstash. Summaries can miss nuance and some originals are paywalled. Always read the source via the button on each card. Your progress is stored only on this device.</div>' +
      '<div style="margin:14px 0 4px"><button class="btn danger" data-act="reset">Reset progress &amp; answers</button></div>'
  }

  /* ---------------- onboarding ---------------- */
  var step = 0, draft = null
  var TOTAL = 7 // welcome + 6 questions (recap is separate)
  function opt(o, pressed, extra) {
    return '<button class="opt' + (extra || '') + '" data-pick="' + o.id + '" aria-pressed="' + pressed + '"><span class="e">' + o.e + '</span><span>' + esc(o.t) + (o.d ? '<small>' + esc(o.d) + '</small>' : '') + '</span></button>'
  }
  function prog(i) { var h = ''; for (var k = 0; k < TOTAL; k++) h += '<i class="' + (k <= i ? 'on' : '') + '"></i>'; return '<div class="prog">' + h + '</div>' }
  function renderOnb() {
    var el = $('#onb'); el.hidden = false
    var d = draft, h = ''
    var back = '<div class="navrow">' + (step > 0 ? '<button data-onb="back" aria-label="Back">← Back</button>' : '<span></span>') + '<span class="small muted">' + (step > 0 ? step + ' of 6' : '') + '</span></div>'
    if (step === 0) {
      h = '<div class="navrow"><span class="brand"><b>PM</b>Shorts</span></div>' +
        '<h1 style="margin-top:18px">Learn product management in 60 words at a time.</h1>' +
        '<p class="sub">Bite-sized lessons from the best PM writers, podcasts and courses, each with a link to the full thing.</p>' +
        '<div class="welcome-card"><div class="h">🔍 Discovery · Intermediate</div><div class="b"><b>Discovery is figuring out what to build</b>Before delivery, learn who the user is and what problem they have. Swipe up for the next short. Tap through to read the original…</div></div>' +
        '<div class="foot"><button class="btn" data-onb="next">Personalise my feed →</button><div class="why">6 quick questions · takes under a minute</div></div>'
    } else if (step === 1) {
      h = back + prog(1) + '<h1>Where are you on your product journey?</h1><p class="sub">We match the depth of each short to your stage.</p><div class="opts">' + STAGES.map(function (o) { return opt(o, d.stage === o.id) }).join('') + '</div>' +
        '<div class="foot"><button class="btn" data-onb="next" ' + (d.stage ? '' : 'disabled') + '>Continue</button></div>'
    } else if (step === 2) {
      h = back + prog(2) + '<h1>What’s your main goal right now?</h1><p class="sub">Pick one. You can change it any time.</p><div class="opts">' + GOALS.map(function (o) { return opt(o, d.goal === o.id) }).join('') + '</div>' +
        '<div class="foot"><button class="btn" data-onb="next" ' + (d.goal ? '' : 'disabled') + '>Continue</button></div>'
    } else if (step === 3) {
      h = back + prog(3) + '<h1>What’s your background?</h1><p class="sub">So we can nudge you toward the skills people from your field usually need.</p><div class="opts two">' + BACKGROUNDS.map(function (o) { return opt(o, d.background === o.id, ' compact') }).join('') + '</div>' +
        '<div class="foot"><button class="btn" data-onb="next" ' + (d.background ? '' : 'disabled') + '>Continue</button></div>'
    } else if (step === 4) {
      h = back + prog(4) + '<h1>What do you want to learn?</h1><p class="sub">Pick up to 4 topics. <b>' + d.topics.length + '/4</b> selected</p><div class="opts two">' + TOPICS.map(function (t) { return opt({ id: t.id, e: t.emoji, t: t.name }, d.topics.indexOf(t.id) > -1, ' compact') }).join('') + '</div>' +
        '<div class="foot"><button class="btn" data-onb="next" ' + (d.topics.length ? '' : 'disabled') + '>Continue</button></div>'
    } else if (step === 5) {
      h = back + prog(5) + '<h1>How much time can you give daily?</h1><p class="sub">We set a small daily goal. Missing a day is fine.</p><div class="opts">' + MINUTES.map(function (o) { return opt(o, d.minutes === o.id) }).join('') + '</div>' +
        '<div class="foot"><button class="btn" data-onb="next">Continue</button></div>'
    } else if (step === 6) {
      h = back + prog(6) + '<h1>How do you like to learn?</h1><p class="sub">Pick all that apply. We’ll show more of these first.</p><div class="opts">' + FORMATS.map(function (o) { return opt(o, d.formats.indexOf(o.id) > -1) }).join('') + '</div>' +
        '<div class="foot"><button class="btn" data-onb="finish" ' + (d.formats.length ? '' : 'disabled') + '>Build my feed</button></div>'
    }
    el.innerHTML = h
    el.scrollTop = 0
  }
  function finishOnb() {
    S.profile = JSON.parse(JSON.stringify(draft))
    S.onboarded = true; save()
    var st = STAGES.filter(function (x) { return x.id === S.profile.stage })[0]
    var go_ = GOALS.filter(function (x) { return x.id === S.profile.goal })[0]
    var el = $('#onb')
    var lines = ['Matching depth to ' + st.t.toLowerCase(), 'Prioritising “' + go_.t.toLowerCase() + '”', 'Boosting ' + S.profile.topics.map(function (id) { return TOPIC[id].name }).join(', '), 'Setting a goal of ' + goalN() + ' shorts a day']
    el.innerHTML = '<div class="navrow"><span class="brand"><b>PM</b>Shorts</span></div><h1 style="margin-top:24px">Building your feed…</h1><p class="sub">Tuning it to your answers.</p>' +
      lines.map(function (l, i) { return '<div class="check" id="ck' + i + '"><span class="dot">✓</span>' + esc(l) + '</div>' }).join('') +
      '<div class="foot" id="onbfoot" style="visibility:hidden"><button class="btn" data-onb="enter">Start reading →</button><div class="why">Tip: swipe up for the next short. Tap “Read the full article” for the original.</div></div>'
    lines.forEach(function (_, i) { setTimeout(function () { var n = $('#ck' + i); if (n) n.classList.add('done') }, 350 * (i + 1)) })
    setTimeout(function () { var f = $('#onbfoot'); if (f) f.style.visibility = 'visible' }, 350 * (lines.length + 1))
  }
  function startOnb() {
    draft = JSON.parse(JSON.stringify(S.profile)); step = S.onboarded ? 1 : 0; renderOnb()
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-onb],[data-pick],[data-go],[data-act],[data-topic],[data-source],[data-open],[data-viewsaved],[data-unsave],[data-seg]')
    if (!t) return
    var ds = t.dataset
    if (ds.onb) {
      if (ds.onb === 'next') { step++; renderOnb() }
      else if (ds.onb === 'back') { step--; renderOnb() }
      else if (ds.onb === 'finish') finishOnb()
      else if (ds.onb === 'enter') { $('#onb').hidden = true; filter = null; $('#app-main').hidden = false; updateHeader(); go('feed'); renderFeed() }
      return
    }
    if (ds.pick !== undefined && $('#onb') && !$('#onb').hidden) {
      var id = ds.pick
      if (step === 1) draft.stage = id
      else if (step === 2) draft.goal = id
      else if (step === 3) draft.background = id
      else if (step === 4) {
        var i = draft.topics.indexOf(id)
        if (i > -1) draft.topics.splice(i, 1); else if (draft.topics.length < 4) draft.topics.push(id); else toast('Pick up to 4 topics')
      } else if (step === 5) draft.minutes = Number(id)
      else if (step === 6) { var j = draft.formats.indexOf(id); if (j > -1) draft.formats.splice(j, 1); else draft.formats.push(id) }
      renderOnb(); return
    }
    if (ds.go) { go(ds.go); return }
    if (ds.topic) { openFeed({ type: 'topic', value: ds.topic }); return }
    if (ds.source) { openFeed({ type: 'source', value: ds.source }); return }
    if (ds.open) { openFeed({ type: 'q', value: $('#q').value.trim() }, ds.open); return }
    if (ds.viewsaved) { openFeed({ type: 'saved' }, ds.viewsaved); return }
    if (ds.unsave) { S.saved = S.saved.filter(function (x) { return x !== ds.unsave }); save(); renderSaved(); return }
    if (ds.seg) {
      var n = ds.seg, v = ds.val
      if (n === 'minutes') { S.profile.minutes = Number(v); updateHeader() }
      else if (n === 'theme') { S.theme = v; applyTheme() }
      else if (n.indexOf('rel:') === 0) { S.relevance[n.slice(4)] = v; if (v === 'all') delete S.relevance[n.slice(4)]; feed = [] }
      save(); renderYou(); return
    }
    switch (ds.act) {
      case 'save': {
        var cid = t.closest('.card').dataset.id, k = S.saved.indexOf(cid)
        if (k > -1) { S.saved.splice(k, 1); t.setAttribute('aria-pressed', 'false'); t.textContent = '☆ Save'; toast('Removed from Saved') }
        else { S.saved.unshift(cid); t.setAttribute('aria-pressed', 'true'); t.textContent = '★ Saved'; toast('Saved') }
        save(); break
      }
      case 'share': {
        var c = CARD[t.closest('.card').dataset.id]
        var text = c.headline + '\n' + c.summary + '\n' + c.url
        var copy = function () {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { toast('Copied to clipboard') }, function () { toast('Could not copy') })
          else toast('Sharing is not supported here')
        }
        if (navigator.share) navigator.share({ title: c.headline, text: c.summary, url: c.url }).catch(function (err) { if (!err || err.name !== 'AbortError') copy() })
        else copy()
        break
      }
      case 'open': S.opens++; save(); break // let the link open
      case 'clearfilter': filter = null; renderFeed(); break
      case 'redo': startOnb(); break
      case 'reset':
        // In-page two-tap confirmation (window.confirm is unavailable in some hosts).
        if (t.dataset.armed !== '1') {
          t.dataset.armed = '1'; t.textContent = 'Tap again to erase everything'
          setTimeout(function () { t.dataset.armed = ''; t.innerHTML = 'Reset progress &amp; answers' }, 4000)
        } else {
          try { localStorage.removeItem(KEY) } catch (x) {}
          S = defaults(); applyTheme(); filter = null; feed = []; startOnb(); $('#app-main').hidden = true
        }
        break
    }
  })
  document.addEventListener('keydown', function (e) {
    if (current !== 'feed' || !$('#onb').hidden) return
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return
    var f = $('#feed')
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); f.scrollBy({ top: f.clientHeight }) }
    if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); f.scrollBy({ top: -f.clientHeight }) }
  })

  /* ---------------- boot ---------------- */
  applyTheme()
  if (!S.onboarded) { $('#app-main').hidden = true; startOnb() }
  else { $('#onb').hidden = true; updateHeader(); go('feed'); renderFeed() }
})()
