# JCI Cables (India) — Website

Static marketing website for **JCI Cables (India)**, a Delhi-based manufacturer and supplier of coaxial cables, RF connectors, CCTV cables, Cat 6 cable, antennas, PoE switches, and cable connectors.

**Live site:** https://divisht08.github.io/jci-cables/

## Structure

Plain HTML/CSS/JS, no build step — deployed directly via GitHub Pages from the `main` branch root.

```
index.html                 Homepage
contact.html                Contact page
coaxial-cables.html         Product category page
rf-connectors.html          Product category page
cctv-cable.html              Product category page
cat-6-cable.html             Product category page
antennas.html                 Product category page
poe-switches.html           Product category page
cable-connectors.html    Product category page
connectors.html               Product category page
products/                        Individual product detail pages
images/                          Product images
```

### `-v2` pages

Files suffixed `-v2` (e.g. `index-v2.html`, `coaxial-cables-v2.html`) are redesigned versions of the corresponding page, built to a consistent schema: hero → key specs → full product catalog (with images, prices, and an "Add to Enquiry" button) → why-choose-us → common applications → CTA. They exist alongside the live pages and are **not yet linked into navigation** — nothing changes on the live site until a `-v2` file is promoted to replace its original (e.g. renaming `index-v2.html` → `index.html`).

## Enquiry cart

Product cards use a shared "Add to Enquiry" widget (bottom-right floating button) backed by `localStorage` (key `jci_wishlist`). Selected items can be sent as a pre-filled WhatsApp message to the business number.

## Deployment

GitHub Pages is configured to build from `main` / `/(root)`. Pushing to `main` redeploys the site automatically — there is no separate build or CI step.
