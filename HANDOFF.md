# Wahidul Alam Nahid — Portfolio Rebuild — Handoff

Continuity doc for resuming this project in a new Claude Code session. Read this first.

## Status: live, iterating

**Live site:** https://wahiding.github.io
**Repo:** https://github.com/wahiding/wahiding.github.io (branch `main`)
**Local path:** `C:\Source\WahidPortfolio`
**Stack:** Astro (static site), deployed via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`. GitHub Pages is set to build_type `workflow` (not the legacy branch-deploy — don't let it get reset to legacy).

Dev server: `npm run dev` (localhost:4321). Build: `npm run build`. Always run a production build before pushing — dev server passing doesn't guarantee `astro build` succeeds.

## How this came to be

Started from a zip (`polymath-dispatch-handoff.zip`) containing a prior "Polymath Dispatch" newspaper-themed redesign concept for an even older site. User rejected that direction, referenced themewagon.com/monica (turned out to be the template the *original* site was built on) and then a Google Images search for "vibrant retro portfolio," landing on the current direction:

- **Design**: flat colors, no gradients, "vibrant retro" — cream/rust/mustard/avocado/maroon/teal/plum, all as CSS vars in `src/styles/global.css`
- **Fonts**: Urbanist (display), Onest (body), Space Mono (labels) — chosen as free look-alikes after the user's actual requested fonts (Uni Neue, Altone) turned out to be a personal-use-only font and a paid commercial font respectively
- **Structure**: single flowing homepage (hero → about → expertise → selected work → contact CTA → dispatches) plus separate deep-dive pages per persona, not a pure one-pager

Old dispatch-concept files are archived in `legacy-dispatch-site/` (not deleted, just out of the way). Design comparison mockups from the exploration phase are in `mockups/`.

## Site structure

```
src/layouts/Layout.astro   — shared nav (incl. Personas dropdown), footer, fonts
src/styles/global.css      — design tokens + all component styles
src/pages/index.astro      — homepage
src/pages/qa-engineer.astro — REAL content, sourced from actual résumé
src/pages/writer.astro     — mostly draft, but the Avyantar novel callout is real
src/pages/artist.astro     — draft prose, but REAL painting gallery (11 real works)
src/pages/filmmaker.astro  — full draft/placeholder (⚠ banner shown)
src/pages/psychology.astro — full draft/placeholder (⚠ banner shown)
src/pages/collector.astro  — full draft/placeholder (⚠ banner shown)
src/pages/avyantar-ch1.astro — real Chapter 1 text (Bengali), pulled byte-exact from
                                the user's original live site (SQA1.html-style pages)
src/pages/blog/*.astro     — two real QA blog posts, full text pulled from the
                                original live site (wahidulalamnahid.github.io/Wahid_Portfolio)
public/images/             — real photos + paintings, sourced from Resources/ (gitignored)
public/resume.pdf          — real résumé
Resources/                 — raw source photos/resume (gitignored, not pushed —
                                already copied into public/ where needed)
```

Nav has a **Personas** dropdown (hover on desktop, click-toggle on mobile) linking to all 6 persona pages — added because there was no direct way to reach them before.

## Known gaps / next steps

1. **"Payments" wording is wrong and still needs fixing.** User flagged that describing Ding and/or his team as being about "payments" is inaccurate, but hasn't yet given the correct description. Current (incorrect) instances are in `src/pages/index.astro` (hero lede, tag-float badge, about paragraph) and `src/pages/qa-engineer.astro` (lede). **Do not guess again — wait for the user's exact wording**, then find/replace across those files.
2. **Filmmaker, Psychology, Collector pages** are still fully placeholder/draft (visible mustard warning banner on each). Task: interview the user per page and rewrite in his real voice, same way QA Engineer and Writer got real content.
3. **`work-qa.jpg` and `work-film.jpg`** referenced on the homepage "Selected Work" section have no matching photos — currently fail gracefully (`onerror` hides broken image icon). Need real photos for these.
4. **No favicon, no Open Graph meta tags** for social share previews.
5. Resume/social links are real (LinkedIn: linkedin.com/in/wahidulnahid, GitHub: wahidulalamnahid, email: wahidulalam.nahid@gmail.com) — confirmed correct with the user, don't second-guess these.

## Things learned the hard way (don't repeat)

- **LinkedIn cannot be fetched directly** — returns a bot-block status to WebFetch, no authenticated LinkedIn tool available in this environment. Use the résumé PDF (`public/resume.pdf`) as the source of truth for work history instead, or ask the user to paste specific LinkedIn content.
- **Never publish personal contact info found in source documents** without it being explicitly the intended public contact — the résumé includes a home address, phone number, and references' names/emails; none of that should ever go on the public site.
- **The `gh` CLI here is authenticated as `wahiding`**, a different account from `wahidulalamnahid` (the name used across the actual site content/socials). `wahidulalamnahid` is the user's personal GitHub account; `wahiding` is tied to his work email (Ding) and is what's authenticated on this work PC. He deliberately chose to host under `wahiding.github.io` rather than switch accounts — don't try to "fix" this to match the personal name.
- **Pushing `.github/workflows/*.yml` requires the `workflow` OAuth scope** — if a push is rejected for this reason, the fix is `gh auth refresh -h github.com -s workflow` (user must run this themselves, it's an interactive browser flow).
- When GitHub auto-enables Pages on first push, it defaults to the **legacy branch-deploy build type**, which conflicts with an Actions-based deploy. Must explicitly set `gh api -X PUT repos/{owner}/{repo}/pages -f build_type=workflow`.
- Content accuracy matters a lot here since this is a job-hunting site — always cross-check invented/placeholder copy against real source documents (résumé, old live site) when they become available, rather than leaving contradictions in place. Already caught and fixed: an inflated "3+ yrs" experience claim, and an "abstract painting" description that didn't match the real (representational watercolor/ink) artwork once real photos arrived.
