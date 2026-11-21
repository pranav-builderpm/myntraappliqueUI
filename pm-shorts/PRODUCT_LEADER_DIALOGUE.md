# PM Shorts — Builder ⇄ Product Leader dialogue

> **Read this first.** You asked me not to ask you questions, and to play two roles: the builder, and a Product Leader who challenges my assumptions. **Every answer below is written by me in the Product Leader persona ("Meera", a fictional CPO). It is not real user research and not your opinion.** Treat it as a structured self-review that shaped the build. Replace it with real interviews before betting on it.

**Persona:** Meera, CPO of a Series-C consumer-fintech. Hired ~40 PMs, mentors APMs, reads Lenny / Aakash / SVPG. Skeptical of "AI summarizer" products.

---

### 1. Who is this for? My assumption: "aspiring and working PMs, one persona."
**Meera:** Wrong. Three jobs-to-be-done that need different feeds: (a) *Break in* — "what is a PM, how do I get hired"; (b) *Level up* — a 2–6 yr PM wants sharper craft (metrics, prioritization, strategy); (c) *Stay current* — leaders want AI-PM and org-design signal in 2 minutes. If you serve all with one feed, the aspirant drowns in strategy and the leader sees "What is a PM?" forever.
**Decision:** Onboarding asks **stage** (6 levels) + **goal**; both feed ranking. Cards carry a `level` tag.

### 2. My assumption: "60 words is enough to teach."
**Meera:** 60 words *informs*, it doesn't *teach*. Don't pretend. The card's job is: one idea worth knowing + a reason to click. And never put words in an author's mouth.
**Decision:** Each card = one idea in ≤60 words (enforced by `check.mjs`) + a prominent "Read the full article ↗" link. Summaries are written only from what the public page/description states. A footer on every card says it's a summary, not the original.

### 3. Content: "I'll scrape Lenny, Aakash, Hello PM, Product School, LinkedIn, Deepstash."
**Meera:** Two problems. Legal: don't republish their paywalled writing; summarize and link. Trust: if one summary is wrong, PMs will screenshot it. Also LinkedIn scraping violates their terms — skip it.
**Decision / reality check:** The build sandbox blocks those hosts for direct fetching (proxy 403 / DNS), so I did **not** scrape. I used web search results (titles, URLs, public descriptions) only. No LinkedIn. Paywalled posts are tagged "May be paywalled". Video: I could not verify any specific Product School / Hello PM YouTube video, so none is listed — only replay/podcast pages I could verify.

### 4. Onboarding: "Ask lots of questions to personalise."
**Meera:** Every extra question costs ~10–15% of users. Which answers *change what I see*? Ask only those, and show a reason ("so we can show you…").
**Decision:** 6 questions, each used by ranking: stage → level fit; goal → topic boost; background → starter topic hints; topics (multi, pick up to 4); daily time → daily goal (3/5/8 cards); format (read/listen/watch). Progress bar + back + skip-free. Ends with a visible "your feed is tuned to…" recap.

### 5. Personalisation: "Collaborative filtering / ML."
**Meera:** You have ~45 cards and zero users. ML is theatre. But Inshorts' best idea — implicit signals plus a manual override — is cheap.
**Decision:** Transparent scoring (topic + level + format + goal) plus **dwell time** (>6 s on a card nudges that topic up). Manual override per topic: **All / Essentials only / Mute** (Inshorts' All / Major / No News).

### 6. Habit: "Streaks and badges like Inshorts Daily Ritual."
**Meera:** Streaks punish the busy. A missed day shouldn't feel like failure; and a day shouldn't require 20 cards.
**Decision:** Goal is small (3/5/8 cards). A streak day = goal met. Badges are celebratory, not punitive; no streak-loss guilt copy. No notifications in v1 (not possible in a static web build).

### 7. What would make this fail?
**Meera:** (1) Stale/dead links. (2) Content skew — all Lenny/Aakash, India context missing. (3) Looks like Inshorts-for-PMs with no PM-specific value.
**Decision / honest gaps:** Links are verified from search results, not click-tested from here. Content skews to the sources you named. **Differentiators kept:** topic × level ranking, "Essentials" tier, learning-path style recap. **Parked for v2:** Hindi edition, polls/quizzes ("what would you prioritise?"), backend + real analytics, notifications, user-submitted cards, an editorial QA pass on every summary.

### 8. Success metric?
**Meera:** North Star: **weekly learners who read ≥ 5 cards on ≥ 3 days**. Guardrail: outbound "Read full article" CTR (the card must earn the click, not replace it). Watch: onboarding completion, D7 retention.
