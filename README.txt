This folder is intentionally empty.

Dura Tech's typefaces (Fraunces, IBM Plex Sans, IBM Plex Mono) are loaded from
Google Fonts via CDN rather than self-hosted, for two reasons:

1. Caching — visitors who've loaded these fonts on any other Google Fonts
   site already have them cached, so the site often pays nothing for them.
2. Maintenance — no font files to version, license-track, or update here.

If you'd rather self-host the fonts (common for stricter CSP/privacy policies,
or to drop the third-party request entirely), download the .woff2 files for:
  - Fraunces (weights 400/500/600)
  - IBM Plex Sans (weights 400/500/600/700)
  - IBM Plex Mono (weights 400/500)
place them in this folder, and swap the Google Fonts <link> tags in each
page's <head> for local @font-face declarations in assets/css/style.css.
