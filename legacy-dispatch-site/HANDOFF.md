# The Polymath Dispatch — Site Rebuild Handoff

Context dump for continuing this in Claude Code CLI. This covers what was decided,
what was built, what's still placeholder, and what's left to do.

## Background

Original site: https://wahidulalamnahid.github.io/Wahid_Portfolio/
("The Polymath's Canvas") — a multi-persona portfolio (QA Engineer, Writer, Artist,
Filmmaker, Psychology Enthusiast, Collector, Seeker) for Wahidul Alam Nahid, a QA
Engineer at Ding (international payments platform) based in Dhaka, Bangladesh.

Goal: full redesign/rebuild from scratch, hosted on GitHub Pages (`.github.io`).
Purpose is threefold — job hunting (QA/tech), personal brand (the full polymath),
and creative portfolio. Visual direction requested: **warm & editorial** (magazine feel).

## Design concept

Framed the whole site as an ongoing "dispatch" — a magazine/newspaper metaphor —
because it ties together the QA identity (marking up what's broken) and the writer
identity (marking up prose). The signature visual element is **editorial proofreading
marks**: strikethrough, insert carets, circled text, used as literal UI accents.

**Design tokens (in `styles.css` as CSS variables):**
- `--paper: #EDE6D6` (aged paper background)
- `--paper-deep: #E4DBC7` (slightly deeper paper, used for nav bar / footer)
- `--ink: #1F2421` (primary text)
- `--ink-soft: #4A4842` (secondary text)
- `--redline: #B23A2E` (brick red — editorial marks, active nav state, hover)
- `--ochre: #C98A2B` (section numbers/labels)
- `--teal: #2B4A47` (QA/tag accent)

**Typography:**
- Display: **Fraunces** (literary serif, headlines)
- Body: **Newsreader** (serif body text)
- Utility/mono: **JetBrains Mono** (bylines, nav labels, tags, section numbers)
- Loaded via Google Fonts CDN link in every page `<head>`

**Layout conventions:**
- Masthead nameplate at top (like a magazine cover) with issue/edition line
- Section nav styled as a magazine "contents strip" with numbered entries (00–09)
- Hero sections use a two-column grid: main headline + a `.margin-note` aside
  (styled like an editor's marginal annotation, red left border)
- Feature sections use `.dropcap` (first letter styled large/red) + a `.col-rule`
  sidebar with `.expertise-item` blocks
- `.divider-mark` — a dashed-rule divider with a "§ label" used between sections
- `.dispatch` — blog/article list item style (tag + headline + excerpt)
- `.sections-grid` / `.section-card` — grid of persona cards on the hub page
- `.colophon` — footer styled like a magazine colophon/masthead block

All of this lives in the single shared `styles.css` — no per-page CSS.

## Site structure / nav

Nav is **flat** (per explicit user request — not a dropdown), same 10 links on
every page, in this order:

```
00 Front Page   → index.html
01 QA Engineer  → qa-engineer.html
02 Writer       → writer.html
03 Artist       → artist.html
04 Filmmaker    → filmmaker.html
05 Psychology   → psychology.html
06 Collector    → collector.html
07 Dispatches   → blog.html
08 About        → about.html
09 Contact      → contact.html
```

`persona-hub.html` still exists as a "table of contents" style overview page
(grid of all 6 persona cards) but is **not** in the main nav anymore since nav
went flat. It's still linked from the "← All sections" link at the bottom of
each persona page and from the footer colophon.

## Files in this folder

| File | Status |
|---|---|
| `styles.css` | Complete — full design system |
| `index.html` | Complete — front page |
| `persona-hub.html` | Complete — persona overview grid |
| `qa-engineer.html` | Complete — real content, written from memory context about Wahid's actual role |
| `writer.html` | **First draft — placeholder copy, needs Wahid's real voice** |
| `artist.html` | **First draft — placeholder copy, needs Wahid's real voice** |
| `filmmaker.html` | **First draft — placeholder copy, needs Wahid's real voice** |
| `psychology.html` | **First draft — placeholder copy, needs Wahid's real voice** |
| `collector.html` | **First draft — placeholder copy, needs Wahid's real voice** |
| `blog.html` | Complete structurally, but only has the 2 articles from the old site as list items (no actual full article pages built — links currently point to `#`) |
| `about.html` | Complete |
| `contact.html` | Structurally complete, **but has a placeholder email `hello@example.com` — must be replaced before publishing** |

## Known gaps / TODO

1. **Placeholder email** in `contact.html` — replace `hello@example.com` with
   Wahid's real contact info, and consider adding LinkedIn/GitHub links (the
   old site had social icons that pointed to `#`, i.e. never linked anywhere —
   worth fixing this time).
2. **Five persona pages have invented copy** (writer, artist, filmmaker,
   psychology, collector) — these were drafted by Claude to match tone/structure
   but should be rewritten in Wahid's actual voice/details.
3. **Blog article pages don't exist yet** — `blog.html` lists two articles
   (from the old site: "The Celdon Shooper Principle" and "Of Bugs, Buttons,
   and Broken Dreams") but they link to `#`. Need actual article pages (e.g.
   `blog-celdon-shooper.html`) if the full text should be ported over from the
   old site's `SQA1.html` / `single.html`.
3. **No images** — the whole design is currently type/color/layout only, no
   photography or illustration. The old site had `images/logo.svg`,
   `images/intro-bg.jpg`, `images/geometric_shape.svg` — none of that was
   ported over. Worth deciding whether to add a photo, logo mark, or keep it
   type-driven.
4. **Social links removed** — old site had Facebook/Twitter/Instagram/Dribbble
   icons in header/footer, all pointing to `#` (never actually configured).
   Not included in the rebuild; add real ones if wanted.
5. **No favicon, no `robots.txt`/sitemap, no meta Open Graph tags** for social
   sharing previews — worth adding before final publish.
6. **Not yet pushed to GitHub** — these files need to replace the contents of
   the `Wahid_Portfolio` repo (or a new repo) and be committed/pushed for
   GitHub Pages to pick them up.

## Suggested next steps in Claude Code CLI

1. Clone the `Wahid_Portfolio` repo locally.
2. Copy all files from this folder into the repo root (or wherever
   `index.html` needs to live for GitHub Pages — check current repo settings
   for whether Pages serves from `/root` or `/docs`).
3. Rewrite the five draft persona pages with real content.
4. Decide on and add real contact info + social links.
5. Optionally port the two blog articles into real standalone pages.
6. Add a favicon + basic Open Graph meta tags for link previews.
7. Commit and push — GitHub Pages will auto-deploy.

## Reference: old site content (for porting into new persona pages)

Original tagline: "I break things on purpose so your users don't have to."

Original expertise blurbs (used as source material for `qa-engineer.html`
and `index.html`):
- **QA & Systems Analysis** — manual exploratory testing to CI/CD automation
  (Jenkins, pipelines, reporting); how systems break, why, how to make stronger.
- **Writing & Knowledge Documentation** — defect reports/test cases to
  reflective essays/blogs.
- **Creative Storytelling (Film & Art)** — mood-driven storytelling, imagery,
  silence, rhythm; short films, abstract paintings.
- **Research & Psychology** — personal journaling project *23 er Diary*;
  identity, memory, healing, self-awareness; psychology of users/teams/audiences.

Original blog posts (full text not yet ported, only summarized):
1. "The Celdon Shooper Principle: Why Edge Cases Aren't Optional" — original
   URL: `SQA1.html`
2. "Of Bugs, Buttons, and Broken Dreams: A QA Tale" — original URL: `single.html`
