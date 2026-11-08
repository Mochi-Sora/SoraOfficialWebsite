# Mochi-Sora — Official Website

The official website of **Tam Kuan Hou** (譚君浩 / Marco Tam), known online as
**Mochi-Sora** — independent software developer and creator of
**SoraPlatform**.

The site is a static, no-build-step project: plain HTML, CSS, and JavaScript.
It can be served from any static host or opened through a local HTTP server.

## Preview locally

From this directory:

```bash
python3 -m http.server 8765
```

Then open <http://127.0.0.1:8765/>.

Any equivalent static server works, for example:

```bash
npx serve .
# or
php -S 127.0.0.1:8765
```

Opening `index.html` directly from the filesystem also works, though a local
server is recommended so fonts and relative paths behave consistently.

## Deploy

Upload the entire folder to any static host — GitHub Pages, Netlify, Cloudflare
Pages, Vercel, or a plain web server. There is no build command and no
dependency installation step.

For GitHub Pages, publish the repository root (or this folder) and keep
`index.html` and `404.html` at the top level. The `404.html` page uses the same
relative asset paths as the main site.

## Structure

```text
SoraOfficialWebsite/
├── index.html                 # The single-page site
├── 404.html                   # Not-found page
├── assets/
│   ├── css/styles.css         # All styling and responsive rules
│   ├── js/main.js             # Navigation, tabs, copy, reveal
│   ├── fonts/                 # Self-hosted Sora, Inter, Instrument Serif
│   └── img/                   # Avatar, favicon, social preview
├── documents/                 # Local copies of the official documents
│   ├── SoraAgent-README.md
│   ├── SoraAgent-LICENSE.txt
│   ├── SoraAgent-pyproject.toml
│   ├── SoraAgent-install.sh
│   ├── SoraAgent-install.ps1
│   └── SoraPlatform-Roadmap.md
└── README.md
```

## Content sources

- **Profile and public identity** — the
  [Mochi-Sora GitHub profile](https://github.com/Mochi-Sora) and the
  [Agensi creator page](https://www.agensi.io/creators/mochi-sora).
- **SoraAgent** — the official
  [README](https://github.com/Mochi-Sora/SoraAgent/blob/main/README.md),
  [LICENSE](https://github.com/Mochi-Sora/SoraAgent/blob/main/LICENSE), and
  [pyproject.toml](https://github.com/Mochi-Sora/SoraAgent/blob/main/pyproject.toml).
- **SoraPlatform roadmap** — the official SoraPlatform roadmap document,
  covering all ten products.
- **SoraSkills** — the [Agensi creator page](https://www.agensi.io/creators/mochi-sora).
- **Community** — the [SoraPlatform Discord server](https://discord.gg/s8W6JfBSMH).

The local files in `documents/` are provided for convenience. The versions in
the GitHub repositories are canonical.

## Scope

The site covers the ten SoraPlatform products — SoraAgent, SoraDesk,
SoraSkills, SoraPlugins, SoraOS, SoraOffice, SoraCreate, SoraBrowser,
SoraMusic, and SoraSocials. MasonAgent appears once in the profile milestones
as the predecessor to SoraAgent; there are no separate archive cards.

The unrelated `undertale-game-for-no-reason-at-all` repository is intentionally
excluded.

## Notes

- The site is responsive down to small mobile widths and respects
  `prefers-reduced-motion`.
- The install tabs, copy buttons, mobile navigation, and scroll-reveal effects
  are implemented in `assets/js/main.js`.
- The page is intentionally consolidated: the hero introduces the person and links
  to his main profiles, the profile adds biography and milestones, the roadmap
  is the single product list, SoraAgent gets the technical detail, and the
  documents section is the reference. External links live in the header, the
  hero card, and the footer instead of a separate contact section.
- The hero card is a compact profile card: avatar, name, and direct GitHub,
  Agensi, and Discord links.
- Fonts are self-hosted under `assets/fonts/`; Sora, Inter, and Instrument Serif
  are licensed under the SIL Open Font License.
- The social preview image is at `assets/img/og-cover.png` (1200 × 630). After
  deploying, replace the relative `og:image` and `twitter:image` paths in
  `index.html` with absolute URLs for the most reliable link previews.
- SoraAgent is licensed **AGPL-3.0-only**. Website copy and branding are
  © 2026 Tam Kuan Hou (譚君浩 / Marco Tam).
