# Adisakshya's space on the web 🌌

Production version of my website is deployed using GitHub Pages and can be found at [adisakshya.github.io](https://adisakshya.github.io)

Development version of my website is deployed using Netlify and can be found at [adisakshya.netlify.app](https://adisakshya.netlify.app)

## What this is

A single, calm, typography-led screen that introduces Adi and points visitors to LinkedIn, GitHub, the [Blog](https://adisakshya.github.io/weblog/) and X. No header masthead, About section, résumé, project gallery, post feed, portrait or contact form — those live elsewhere (or were redundant with the Hindi-name heading).

## File map

```
index.html              The whole page. Head holds the pre-paint theme snippet,
                         metadata, favicons and font links.
static/css/main.css      The one stylesheet: theme tokens, the jetpack loader,
                         and the page layout.
static/js/main.js        The one script: loader lifecycle, the typewriter
                         headline, and live system-theme updates.
static/images/favicons/  The आदि brand favicon set, kept in sync with
                         adisakshya/weblog (same files, same <link> pattern).
static/images/adisakshya-profile.png  Kept only as the og:image / twitter:image
                         share preview — no longer shown on the page itself.
robots.txt, sitemap.xml, sitemap.txt  Point at https://adisakshya.github.io/.
```

## Preview locally

```
python3 -m http.server
```

then open `http://localhost:8000/`.

## Theme contract

The homepage has no theme switcher of its own — it inherits whatever theme a reader already chose on the Web Journal (`adisakshya/weblog`), since both sites share the origin `https://adisakshya.github.io` and therefore `localStorage`.

- Key: `journal-prefs` → JSON `{ theme, size, width }`. Only `theme` is read; `size` and `width` are ignored.
- `theme: "system"` (or a missing/empty value) resolves to `dark-modern` when `prefers-color-scheme: dark`, otherwise `original` — matching the weblog's own resolution exactly.
- All 11 of the weblog's themes are supported (ported from `adisakshya/weblog`'s `src/styles/journal.css`, confirmed against the deployed repo rather than guessed): `original` (Daylight), `paper` (Parchment), `sepia` (Amber), `solarized-light` (Dune), `dark-modern` (Graphite), `solarized-dark` (Deep Sea), `space` (Cosmos), `spiderman` (Spider-Man), `batman` (Batman), `superman` (Superman), `ironman` (Iron Man).
- The theme is applied before first paint by an inline script in `<head>`, to avoid a flash of the wrong theme. `static/js/main.js` keeps it live afterwards if the reader's choice is `system` and the OS theme changes.

## Credits

- **Loader animation** — the "jetpack person" preloader is Mr. Alien's CodePen ["speeder"](https://codepen.io/mr_alien/pen/FDLjg), re-themed with CSS variables. Reuse confirmed by the site owner.
- **Icons** — [Font Awesome 6 Free](https://fontawesome.com) (Brands + Solid), inlined as SVG. Icons are CC BY 4.0; see the [Font Awesome Free licence](https://fontawesome.com/license/free).
- **Fonts** — Tiro Devanagari Hindi, Source Serif 4 and IBM Plex Sans via Google Fonts (SIL OFL).
- **Favicon** — the आदि brand mark, sourced from `adisakshya/weblog`'s `docs/brand/assets/` (checksums verified against that repo's own `SHA256SUMS`).
