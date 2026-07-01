# Dura Tech Website

A static, multi-page marketing website for Dura Tech, a government technology
vendor. Built as plain HTML/CSS/JS — no build step, no framework, no server
required. Deploys as-is to any static host (Netlify, Vercel, S3 + CloudFront,
GitHub Pages, etc.).

## Folder structure

```
dura-tech-website/
│
├── index.html              Home
├── about.html               About Dura Tech
├── solutions.html           Delivery programs (Citizen Services, Compliance, etc.)
├── services.html            Individual service capabilities
├── industries.html          Sectors served (federal, state, municipal, ...)
├── leadership.html          Leadership team
├── contact.html             Contact form + procurement info
├── privacy.html             Privacy policy
│
├── assets/
│   ├── css/
│   │   └── style.css        Single shared stylesheet for every page (minified)
│   ├── js/
│   │   └── script.js        Shared nav/scroll/reveal behavior (minified)
│   ├── images/
│   │   ├── dura-tech-mark.png        Shield icon only (nav, favicon source)
│   │   ├── dura-tech-logo-full.png   Full logo lockup (footer)
│   │   └── og-image.png              Social share image (Open Graph/Twitter)
│   ├── icons/
│   │   ├── favicon-16.png, favicon-32.png, favicon-48.png
│   │   └── apple-touch-icon.png
│   └── fonts/                See assets/fonts/README.txt — fonts are
│                              CDN-loaded by default, this folder is a hook
│                              for self-hosting them later if you want to.
│
├── favicon.ico               Root-level favicon (legacy browser fallback)
├── sitemap.xml
├── robots.txt
├── _headers                  Netlify: caching + security headers
├── _redirects                Netlify: redirect rules (currently inert defaults)
├── vercel.json                Vercel: equivalent caching + security headers
├── .gitignore
└── README.md                 This file
```

Every HTML page references `assets/css/style.css` and `assets/js/script.js` —
edit those two files once and the change applies sitewide. There is
intentionally no per-page CSS/JS to keep in sync.

## Deploying

This is a zero-build static site — there is no `npm install`, no build
command, and no publish-directory override needed on any platform. The
repository root *is* the deployable output.

**Push to GitHub first:**
```
cd dura-tech-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

**Deploy on Netlify:**
1. New site from Git → pick the repo.
2. Build command: leave blank. Publish directory: `/` (repo root).
3. Deploy. `_headers` and `_redirects` are picked up automatically — no
   extra configuration needed.
   (Or skip Git entirely: drag the `dura-tech-website/` folder onto
   Netlify's manual-deploy UI.)

**Deploy on Vercel:**
1. New Project → import the same GitHub repo.
2. Framework preset: "Other" (or leave auto-detected as a static site).
   Build command: blank. Output directory: leave default (repo root).
3. Deploy. `vercel.json` supplies the equivalent caching and security
   headers Netlify gets from `_headers` — Vercel does not read `_headers`/
   `_redirects` directly, which is why both config files are included.

**Any other static host** (S3 + CloudFront, GitHub Pages, Cloudflare
Pages, etc.): upload the contents of `dura-tech-website/` as-is. The
Netlify- and Vercel-specific config files are simply inert on other hosts;
replicate the header rules in whatever config format that host expects if
you want equivalent caching/security behavior.

## Before this goes live — placeholder data to replace

A few things in this site are realistic-looking placeholders, not verified
real data. Don't launch without addressing these:

- **Domain.** All canonical URLs, Open Graph tags, the sitemap, and
  `robots.txt` use `https://www.duratech.com` as a placeholder. Swap in the
  real production domain everywhere (a project-wide find/replace for
  `duratech.com` across the HTML files plus `sitemap.xml` and `robots.txt`).
- **Procurement identifiers.** The CAGE code, UEI, and NAICS codes shown on
  the Contact page and in the footer are fabricated placeholders that
  demonstrate the pattern. Replace with your actual SAM.gov registration
  data — publishing fake federal registration identifiers is a real
  compliance problem with this audience, not just a content gap.
- **Compliance/certification badges.** FedRAMP, FISMA, SOC 2, Section 508,
  and NIST 800-53 are referenced as claims (homepage trust bar, footer,
  Solutions page). Confirm with legal/compliance which of these you
  actually hold before publishing — this is exactly the audience that
  checks.
- **Contact details.** Phone number, address, and email addresses
  (`contact@`, `security@`, `privacy@duratech.com`) are placeholders.
- **Privacy policy.** The text on `privacy.html` is a reasonable boilerplate
  starting point, not reviewed legal copy. Have counsel check it before
  launch.
- **Leadership names/bios.** The people listed on `leadership.html` are
  placeholder personas, not real staff.
- **Social links.** Footer LinkedIn/X icons currently link to `#`.

## Notes on the logo

The official Dura Tech logo was supplied as a flattened JPG with a white
background. It's been processed into transparent PNGs (background removed,
cropped, color-quantized for smaller file size) in two forms: the shield
mark alone (used in the nav and favicons) and the full lockup with wordmark
and tagline (used in the footer, where there's room for it).

No vector (SVG) source was supplied, so these are optimized PNGs rather than
SVG. If you get the logo as vector artwork later, swapping it in is a
one-line change in `assets/css/style.css` (the `.logo-chip img` rules) plus
updating the `src` attributes in the header/footer of each HTML file — no
layout changes needed.

Because the logo's navy shield has very low contrast against the site's dark
navigation and footer backgrounds, it's displayed inside a small white
"chip" in those locations rather than recolored — this preserves the
original artwork exactly while keeping it legible.

## Making sitewide changes

This is static HTML, not a templated build — there's no build step to run.
If you need to change something that appears on every page (nav links,
footer, a global style), you'll need to edit each HTML file's `<header>`/
`<footer>` markup individually, or move to a static site generator /
templating tool if that becomes a frequent need. `assets/css/style.css` and
`assets/js/script.js`, by contrast, are shared single files — those changes
apply everywhere automatically.
