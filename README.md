<p align="center">
  <img src="https://raw.githubusercontent.com/Mochi-Sora/SoraOfficialWebsite/main/assets/img/mochi-sora-avatar.png" alt="Mochi-Sora" width="112">
</p>

<h1 align="center">Mochi-Sora — Official Website</h1>

<p align="center"><strong>The home of Tam Kuan Hou, SoraPlatform, and the products built in the open.</strong></p>

<p align="center">
  <a href="https://mochi-sora.github.io/SoraOfficialWebsite/"><img src="https://img.shields.io/badge/live-mochi--sora.github.io-1f6feb" alt="Live site"></a>
  <a href="https://github.com/Mochi-Sora/SoraOfficialWebsite"><img src="https://img.shields.io/badge/static-HTML%20%7C%20CSS%20%7C%20JS-2ea44f" alt="Static HTML, CSS, and JavaScript"></a>
  <a href="https://github.com/Mochi-Sora/SoraAgent-Benchmarks"><img src="https://img.shields.io/badge/live%20benchmark-86.3%2F100-6f42c1" alt="Live benchmark 86.3/100"></a>
</p>

<p align="center">
  <a href="https://discord.gg/s8W6JfBSMH">Discord</a> ·
  <a href="https://github.com/Mochi-Sora">GitHub</a> ·
  <a href="https://www.agensi.io/creators/mochi-sora">Agensi</a> ·
  <a href="https://github.com/Mochi-Sora/SoraAgent">SoraAgent</a> ·
  <a href="https://github.com/Mochi-Sora/SoraDesk">SoraDesk</a> ·
  <a href="https://github.com/Mochi-Sora/SoraOS">SoraOS</a>
</p>

This is the official website of **Tam Kuan Hou** (譚君浩 / Marco Tam), known online as **Mochi-Sora** — an independent software developer and the creator of **SoraPlatform**. It is also the public front door for SoraAgent, SoraDesk, SoraOS, SoraSkills, the product roadmap, and the live benchmark.

The site is deliberately **static**: plain HTML, CSS, and JavaScript with no build step, no framework, and no analytics. It can be served from GitHub Pages or any static host.

## What is on the site

- **Start here** — four simple ways in: the desktop app, the agent, the OS, or a portable skill.
- **SoraDesk** — the native desktop client, download buttons, and a product preview.
- **SoraAgent** — what the engine does, the installer, and links to the README.
- **SoraOS** — the Arch-based KDE Plasma live image, its M2b status, and links to the source and documentation.
- **SoraSkills** — the two live Agensi skills and direct listings.
- **Benchmarks** — the public SoraAgent scoreboard, loaded from the benchmark repository on page load.
- **Roadmap** — all ten SoraPlatform products, honestly marked live, built, or in development.
- **In development**, **Purpose**, and **Contact** — what is next, why it exists, and where to find the community.

## Start here

| You want to… | Go to |
| --- | --- |
| View the live site | <https://mochi-sora.github.io/SoraOfficialWebsite/> |
| Preview locally | [Preview](#preview-locally) |
| Change page copy or sections | [`index.html`](index.html) |
| Change styling | [`assets/css/styles.css`](assets/css/styles.css) |
| Update the benchmark snapshot | [`index.html`](index.html) (snapshot values), [`assets/js/scoreboard.js`](assets/js/scoreboard.js) (fetch logic), and the SoraAgent-Benchmarks repo |
| Update product documents | [`documents/`](documents/) |
| Join the community | [Discord](https://discord.gg/s8W6JfBSMH) |

## Preview locally

From this directory:

```bash
python3 -m http.server 8765
```

Then open <http://127.0.0.1:8765/>.

Any static server works:

```bash
npx serve .
# or
php -S 127.0.0.1:8765
```

Opening `index.html` directly also works, but a local server is recommended so fonts and relative paths behave consistently.

## Deploy

Upload the entire folder to any static host — GitHub Pages, Netlify, Cloudflare Pages, Vercel, or a plain web server. There is no build command and no dependency installation.

For GitHub Pages, publish the repository root and keep `index.html` and `404.html` at the top level. The 404 page uses the same relative assets as the main site.

## Structure

```text
SoraOfficialWebsite/
├── index.html                 # the single-page site
├── 404.html                   # not-found page
├── assets/
│   ├── css/styles.css         # all styling and responsive rules
│   ├── js/main.js             # navigation, tabs, copy, reveal
│   ├── js/scoreboard.js       # fetches and renders the live benchmark data
│   ├── fonts/                 # self-hosted Sora, Inter, Instrument Serif
│   └── img/                   # avatar, favicon, social preview, SoraOS screenshot
├── documents/                 # mirrors of official product documents
└── README.md
```

## Benchmark data

The Benchmarks section ships with a snapshot of the latest run, then [`assets/js/scoreboard.js`](assets/js/scoreboard.js) fetches the public [SoraAgent live scoreboard](https://github.com/Mochi-Sora/SoraAgent-Benchmarks/blob/main/SoraAgent-live-scoreboard.md) on load and replaces the snapshot values in place. If the fetch fails, the snapshot stays and the status label switches to **Snapshot**.

To update it, publish a new `SoraAgent-live-scoreboard.md` in [SoraAgent-Benchmarks](https://github.com/Mochi-Sora/SoraAgent-Benchmarks). No website deploy is needed for the numbers; the next page load picks them up. The request is a plain GET to GitHub's raw CDN — no cookies, no analytics, and no other runtime network calls.

## Notes

- Responsive down to small mobile widths and respects `prefers-reduced-motion`.
- The install tabs, copy buttons, mobile navigation, and scroll-reveal effects live in [`assets/js/main.js`](assets/js/main.js).
- Local documents under [`documents/`](documents/) are convenience mirrors. The GitHub repository versions are canonical.
- Fonts are self-hosted under `assets/fonts/`; Sora, Inter, and Instrument Serif are licensed under the SIL Open Font License.
- The social preview image is `assets/img/og-cover.png` (1200 × 630). `og:image` and `twitter:image` use absolute URLs so previews work reliably after deployment.
- SoraAgent, SoraDesk, and SoraOS are licensed **AGPL-3.0-only**. The SoraAgent benchmark harness is **MIT-licensed**. Website copy and branding are © 2026 Tam Kuan Hou (譚君浩 / Marco Tam).
