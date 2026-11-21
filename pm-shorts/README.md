# PM Shorts

An Inshorts-style mobile web app for people learning product management: **60-word shorts**, each linking to the original article, podcast or replay.

## Run it
```bash
cd pm-shorts && python3 -m http.server 8090   # then open http://localhost:8090 (use a phone-sized viewport)
node check.mjs                                 # validates content: ≤60 words, valid https URLs, host matches source
node build.mjs                                 # → dist/pm-shorts.html (single self-contained file)
```
No dependencies, no build step needed to run. State lives in `localStorage` only.

## What's in it
- **Onboarding (6 questions):** stage, goal, background, up to 4 topics, daily time, preferred format. Every answer is used by the ranking.
- **Feed:** vertical snap-scroll cards (swipe / ↑↓ / j k). Each card: topic, source, level, 60-word summary, "from" title, Save, Share, and a **Read the full article ↗** button.
- **Personalisation:** transparent scoring (topic + goal + background + level fit + format + dwell time) and a per-topic **All / Essentials / Mute** override (cf. Inshorts' All / Major / No news).
- **Discover:** search + topics + sources. **Saved:** your bookmarks. **Daily Ritual:** goal ring, streak, 4-week calendar, badges, topic progress. **You:** edit answers, relevance, theme.

## Content & honesty notes
- 56 shorts from Lenny's Newsletter, Product Growth (Aakash Gupta), HelloPM, Product School, SVPG and Deepstash.
- The build sandbox could not fetch those sites directly (network allowlist), so **no page was scraped or read in full.** Summaries are written in our own words from each page's public search description/title, and kept conservative. Links come from search results and were **not click-tested**. Verify before publishing.
- No LinkedIn content (scraping it is against its terms). No YouTube videos are listed because none could be verified; podcasts/replays link to the Lenny's Newsletter and HelloPM pages.
- Paywalled posts are tagged "may be partly paywalled".
- To refresh/extend content, edit `cards.js` and run `node check.mjs`.

`PRODUCT_LEADER_DIALOGUE.md` records the builder ⇄ Product Leader persona review that shaped the product (the persona's answers are simulated, not real user research).
