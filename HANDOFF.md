# Wahidul Alam Nahid — Portfolio Rebuild — Handoff

Continuity doc for resuming this project in a new Claude Code session. Read this first.

## Status: live, iterating

**Live site:** https://wahiding.github.io
**Repo:** https://github.com/wahiding/wahiding.github.io (branch `main`)
**Local path:** `C:\Source\WahidPortfolio`
**Stack:** Astro (static site), deployed via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`. GitHub Pages is set to build_type `workflow` (not the legacy branch-deploy — don't let it get reset to legacy).

Dev server: `npm run dev` (localhost:4321). Build: `npm run build`. Always run a production build before pushing — dev server passing doesn't guarantee `astro build` succeeds.

## How this came to be

Started from a zip (`polymath-dispatch-handoff.zip`) containing a prior "Polymath Dispatch" newspaper-themed redesign concept for an even older site. User rejected that direction, went through several rounds of exploration (themewagon.com/monica, a "vibrant retro" flat-color phase), and the site has since gone through a full color-system rebuild. See "Design system" below for the current, approved state — don't resurrect the earlier "vibrant retro rust/mustard/avocado" description if you see it referenced in old context; it's superseded.

- **Structure**: single flowing homepage (hero → about/Polymath → Craft carousel → Personas → contact CTA → dispatches) plus separate deep-dive pages per persona, not a pure one-pager
- **Fonts**: Urbanist (display), Onest (body), Space Mono (labels) — chosen as free look-alikes after the user's actual requested fonts (Uni Neue, Altone) turned out to be a personal-use-only font and a paid commercial font respectively

Old dispatch-concept files are archived in `legacy-dispatch-site/` (not deleted, just out of the way). Design comparison mockups from the exploration phase are in `mockups/` — notably `vangogh-professional-fusion.html`, which is the **approved reference** for the current live palette (kept in sync manually; if they ever diverge, the live site's `global.css` is the source of truth, not the mockup).

## Design system (current, approved)

**"Van Gogh × Professional Fusion"** — user did a deep-dive on Van Gogh's actual pigments (Ultramarine PB29, Cobalt Blue PB28, Prussian Blue PB27, Viridian PG18, Cadmium Yellow PY35, Yellow Ochre PY43, Burnt Umber PBr7), we tested a literal palette swap, user found it "not professional enough" for a job-hunting site, and we fused it toward corporate-blue-forward:

- `--rust` (repurposed as the **primary brand/CTA color**, not literally "rust" anymore): deep Ultramarine Blue `#17108C` — drives every button, hover state, focus outline, eyebrow badge, CTA band background
- `--teal`: vibrant turquoise `#0FADC7` — used sparingly (hero highlight word, Psychology persona accent, one hero disc, Facebook hover)
- `--maroon`: very dark navy `#12153A` — CTA-band-adjacent uses, Filmmaker persona accent. **Known issue**: this is close in tone to `--ink` (`#15232F`) — they can look similar side by side. Flagged to user, not yet fixed, don't fix without asking.
- `--mustard`: muted gold `#C79A3D` (Yellow Ochre-derived) — used sparingly, NOT as a full-saturation block
- `--avocado`: muted Viridian `#3E6F60`
- `--plum`: muted dusty purple `#4A4570` (kept from the earlier "vibrant retro" phase, not literally Van Gogh)
- `--bg`: soft warm ivory `#F7F2E6` (not a strong ochre parchment — reads premium/clean, not "painted")
- CTA band button is a **hardcoded** vibrant Cadmium Yellow `#FDC500` (not a token) — a deliberate one-off, not meant to become a reusable token
- Hero decorative discs are low-opacity tints (14–18%), not solid flat blocks like the earlier "vibrant retro" phase

**Gotcha for future palette work**: several rules use hardcoded hex instead of tokens (`.cta-band p` color, `.cta-band .btn-primary` background, `carousel-arrow` box-shadow tint) — if you swap the palette again, grep for stray hex codes in `global.css`, don't assume changing `:root` alone covers everything.

**Typography**: all `<p>` elements are `text-align: justify` site-wide (`hyphens: none` — user explicitly does not want words split across lines; `text-align-last: left` so the last line of a paragraph doesn't stretch weirdly). Exceptions where centered/left alignment was intentionally restored: `.cta-band p` (forced back to `text-align:center` since the global justify rule silently overrode the inherited center-alignment from its parent — inheritance always loses to *any* explicit rule on the child, regardless of specificity, which is why this broke in the first place). `#expertise .section-head` has `max-width:100%` (not the shared 56ch) so its intro paragraphs stretch to fill the same width as the 4-card carousel below, per user request — this is scoped to that one section, not applied to the shared `.section-head` class globally.

## Site structure

```
src/layouts/Layout.astro   — shared nav (Polymath, Expertise, Personas▾, Dispatches, Contact),
                                footer, fonts. Personas dropdown: hover-reveal on desktop with an
                                invisible ::after bridge (prevents the pointer losing hover across
                                the visual gap to the floating menu), click-toggle for touch —
                                absorbed the old standalone "Work" nav item into itself (Personas
                                is now a real link to /#work AND a hover dropdown).
src/styles/global.css      — design tokens + all component styles (see Design system above)
src/pages/index.astro      — homepage
src/pages/qa-engineer.astro — REAL content, sourced from actual résumé, incl. real career timeline
src/pages/writer.astro     — mostly draft, but the Avyantar novel callout is real
src/pages/artist.astro     — draft prose, but REAL painting gallery (11 real works, masonry layout)
src/pages/filmmaker.astro  — full draft/placeholder (⚠ banner shown)
src/pages/psychology.astro — full draft/placeholder (⚠ banner shown)
src/pages/collector.astro  — full draft/placeholder (⚠ banner shown)
src/pages/avyantar-ch1.astro — real Chapter 1 text (Bengali), pulled byte-exact from
                                the user's original live site (SQA1.html-style pages)
src/pages/blog/*.astro     — two real QA blog posts, full text pulled from the original live
                                site, now with real header images (public/images/blog/)
public/images/             — real photos + paintings, sourced from Resources/ (gitignored)
public/images/icons/       — UNUSED leftover from an abandoned real-icon experiment (reverted to
                                text-initial social badges per user preference) — not referenced
                                anywhere, not committed to git, safe to delete or ignore
public/resume.pdf          — real résumé (kept in sync with Resources/Resume/ — check timestamps
                                when the user says "update the resume")
Resources/                 — raw source photos/resume (gitignored, not pushed —
                                already copied into public/ where needed)
```

The homepage's "Personas" section (id `work`) now shows 3 real photo cards: QA, Artist, Writer (Filmmaker was swapped out per user request — the Craft carousel above still covers all 6 personas).

## Known gaps / next steps

1. **Filmmaker, Psychology, Collector pages** are still fully placeholder/draft (visible mustard warning banner on each). Task: interview the user per page and rewrite in his real voice, same way QA Engineer and Writer got real content.
2. **No favicon, no Open Graph meta tags** for social share previews.
3. **`--maroon` vs `--ink` are visually close** (see Design system note above) — user is aware, hasn't asked for a fix yet.
4. Resume/social links are real and confirmed: LinkedIn `linkedin.com/in/wahidulnahid`, GitHub `wahidulalamnahid`, email `wahidulalam.nahid@gmail.com`, plus Facebook/Instagram/Pinterest/YouTube (all in `src/pages/index.astro` About section and the footer) — don't second-guess these.
5. ~~"Payments" wording~~ — **resolved**. User confirmed Ding should be described as a "fintech platform/company," not "payments." Already applied everywhere (`index.astro` hero lede/tag-float, `qa-engineer.astro` lede, craft-card body). If new copy gets added later, keep using "fintech," not "payments."

## Things learned the hard way (don't repeat)

- **LinkedIn cannot be fetched directly** — returns a bot-block status to WebFetch, no authenticated LinkedIn tool available in this environment. Use the résumé PDF (`public/resume.pdf`) as the source of truth for work history instead, or ask the user to paste specific LinkedIn content.
- **Never publish personal contact info found in source documents** without it being explicitly the intended public contact — the résumé includes a home address, phone number, and references' names/emails; none of that should ever go on the public site.
- **The `gh` CLI here is authenticated as `wahiding`**, a different account from `wahidulalamnahid` (the name used across the actual site content/socials). `wahidulalamnahid` is the user's personal GitHub account; `wahiding` is tied to his work email (Ding) and is what's authenticated on this work PC. He deliberately chose to host under `wahiding.github.io` rather than switch accounts — don't try to "fix" this to match the personal name.
- **Pushing `.github/workflows/*.yml` requires the `workflow` OAuth scope** — if a push is rejected for this reason, the fix is `gh auth refresh -h github.com -s workflow` (user must run this themselves, it's an interactive browser flow).
- When GitHub auto-enables Pages on first push, it defaults to the **legacy branch-deploy build type**, which conflicts with an Actions-based deploy. Must explicitly set `gh api -X PUT repos/{owner}/{repo}/pages -f build_type=workflow`.
- Content accuracy matters a lot here since this is a job-hunting site — always cross-check invented/placeholder copy against real source documents (résumé, old live site) when they become available, rather than leaving contradictions in place. Already caught and fixed: an inflated "3+ yrs" experience claim, an "abstract painting" description that didn't match the real (representational watercolor/ink) artwork once real photos arrived, and the "payments" vs "fintech" framing.
- **CSS inheritance vs. specificity**: a broad rule directly targeting an element (e.g. `p{text-align:justify}`) always beats an *inherited* value from a parent (e.g. `.cta-band{text-align:center}`), no matter how "obviously" the parent's intent should apply — inheritance has zero specificity and loses to literally any matching rule on the child. When adding global element-level rules, grep for parents that set that same property via inheritance and add explicit exceptions.
- **Image icons with unknown transparency are risky**: applying `filter:brightness(0)` to "recolor" an icon assumes a transparent background — if the source actually has an opaque background (common even when a preview tool shows a checkered pattern, which some viewers render as a generic canvas backdrop rather than proof of real alpha), the whole image turns into a solid color block. Confirmed the hard way; ended up reverting to text-initial badges per user preference rather than debugging further without a way to visually inspect renders directly.
- **Don't set `overflow-x` on `html`/`body`** — it silently breaks `position:sticky` on descendants in most browsers. Learned this after adding it as a mobile-safety measure and it killed the sticky nav.
- When doing a full color-token swap, **grep for hardcoded hex values** in the stylesheet before declaring it done — several one-off overrides (CTA band text/button, decorative shadow tints) don't live in `:root` and won't update automatically.
