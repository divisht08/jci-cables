# JCI Cables (India) — Website

Static marketing website for **JCI Cables (India)**, a Delhi-based manufacturer and supplier of coaxial cables, RF connectors, CCTV cables, Cat 6 cable, antennas, PoE switches, cable connectors, load cell cables, and instrumentation cables.

**Live site:** https://jcicables.com/

## Structure

Plain HTML/CSS/JS, no build step — deployed directly via GitHub Pages from the `main` branch root.

```
index.html Homepage
contact.html Contact page
coaxial-cables.html Product category page
rf-connectors.html Product category page
cctv-cable.html Product category page
cat-6-cable.html Product category page
antennas.html Product category page
poe-switches.html Product category page
cable-connectors.html Product category page
connectors.html Product category page
load-cell-cables.html Product category page (added 2026-09-19)
instrumentation-cables.html Product category page (added 2026-09-19)
products/ Individual product detail pages (109 pages)
site.css Shared header, footer and search styles (loaded on every page)
site.js Shared header behaviour: mobile menu, Products dropdown, product search
favicon.svg Site icon
images/ Product images
products-index.json Search index consumed by site.js — update when adding/removing a product
sitemap.xml Sitemap for search engines & AI crawlers — update when adding/removing a page
robots.txt Crawler rules (standard + AI/answer-engine bots)
```

### `-v2` pages

Files suffixed `-v2` (e.g. `index-v2.html`, `coaxial-cables-v2.html`) are redesigned versions of the corresponding page, built to a consistent schema: hero → key specs → full product catalog (with images, prices, and an "Add to Enquiry" button) → why-choose-us → common applications → CTA. They exist alongside the live pages and are **not yet linked into navigation** — nothing changes on the live site until a `-v2` file is promoted to replace its original (e.g. renaming `index-v2.html` → `index.html`).

## Shared header and footer (added 2026-11-12)

Every live page (homepage, contact, 10 category pages, 109 product pages) carries the same header and footer markup, styled by `site.css` and driven by `site.js`. Classes are prefixed `jh-` (header) and `jf-` (footer) so they never collide with the older per-page inline styles.

- Header: top strip (GST, call, WhatsApp), logo, Home / Products dropdown (all 10 categories) / Why JCI / Contact, product search, "Get a Quote" button. Collapses to a hamburger menu below 1060px.
- Footer: all 10 categories, company links, call / WhatsApp / email / address / hours, GST and MSME badges.
- Search works on every page, including product pages (it resolves paths from the location of `site.js`). It matches all typed words against product name and category, and supports arrow keys and Enter.
- To change the header or footer, edit the markup on every page with a script (see `header()` / `footer()` in the project notes), not by hand on one page. Adding a category means adding it to that list, the homepage grid, `sitemap.xml` and `products-index.json`.
- `search.js` is the old search script and is no longer referenced by any live page.

## Contact details and claims (single source of truth)

- Email: ksjaiswal@jcicables.com
- Hours: Mon to Sat, 10 AM to 7 PM IST
- The contact form does not post to a server. On submit it opens WhatsApp with the enquiry pre-filled.
- Only state what is true: established 1996, GST registered, MSME registered. Do not add ISO or ISI certification claims, customer counts, delivery percentages or 24/7 support.

## Enquiry cart

Product cards use a shared "Add to Enquiry" widget (bottom-right floating button) backed by `localStorage` (key `jci_wishlist`). Selected items can be sent as a pre-filled WhatsApp message to the business number.

- **WhatsApp number:** 7290830908 (`wa.me/91...` links, `WA` JS variable) — used only for WhatsApp.
- **Calling number:** 9350044165 (`tel:` links, 📞 display text) — deliberately different from the WhatsApp number; do not conflate the two.

## SEO / AEO

Every page carries a canonical tag, Open Graph + Twitter Card meta tags, and JSON-LD structured data (`Organization`/`WebSite`/`FAQPage` on the homepage, `BreadcrumbList`+`CollectionPage` on category pages, `Product`+`BreadcrumbList` on product pages). `robots.txt` and `sitemap.xml` at the site root explicitly allow standard and AI/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).

**When adding or removing a page, update:** `sitemap.xml`, `products-index.json` (if it's a product), and the shared header and footer category lists on every page.

## Product categories

| Category | Page | Products |
|---|---|---|
| Coaxial Cables | `coaxial-cables.html` | 18 |
| RF Connectors | `rf-connectors.html` | — |
| CCTV Cable | `cctv-cable.html` | — |
| Cat 6 Cable | `cat-6-cable.html` | — |
| Antennas | `antennas.html` | — |
| PoE Switches | `poe-switches.html` | — |
| Cable Connectors | `cable-connectors.html` | — |
| Connectors | `connectors.html` | — |
| **Load Cell Cables** *(new, 2026-09-19)* | `load-cell-cables.html` | 3 |
| **Instrumentation Cables** *(new, 2026-09-19)* | `instrumentation-cables.html` | 4 |

Load Cell Cables and Instrumentation Cables were added because JCI can manufacture these to order as well, even though they weren't part of the original 8 categories. Their product images are original SVG-based cross-section illustrations (not stock photography) since no real product photos exist yet for these lines; two products ("Multi-Pair Instrumentation Cable" and "24 Pair Instrumentation Cable") are priced "on request" since their cost varies by core count.

## Pricing

Prices are indicative and change with copper/alloy commodity rates — every product card and detail page carries a small disclaimer near the price asking visitors to confirm via enquiry. Divisht updates prices in bulk via an Excel template; see the project's `jci-price-update-workflow.md` doc for the full process.

## Deployment

GitHub Pages is configured to build from `main` / `/(root)`. Pushing to `main` redeploys the site automatically — there is no separate build or CI step.

No local git push access from the Claude session sandbox — all deploys go through GitHub's web upload UI (`github.com/divisht08/jci-cables/upload/main`) via browser automation. GitHub's uploader silently drops files beyond ~100 per commit, and uploading a mixed batch of root + `products/` + `images/` files in one request flattens subfolder files into the wrong place — uploads are batched under 100 files and done one target folder at a time (navigate to `.../upload/main/<folder>` first).

**Keep this README current:** whenever a significant change ships (a new product category, a structural change, a new file convention like `sitemap.xml`/`products-index.json`), update this file alongside the deploy — not just the internal project notes.
