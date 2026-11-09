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
│   ├── SoraDesk-README.md
│   ├── SoraDesk-LICENSE.txt
│   ├── SoraDesk-protocol.md
│   ├── SoraDesk-connections.md
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
- **SoraDesk** — the official
  [README](https://github.com/Mochi-Sora/SoraDesk/blob/main/README.md),
  [protocol](https://github.com/Mochi-Sora/SoraDesk/blob/main/docs/protocol.md),
  [connection modes](https://github.com/Mochi-Sora/SoraDesk/blob/main/docs/connections.md),
  and [LICENSE](https://github.com/Mochi-Sora/SoraDesk/blob/main/LICENSE).
- **SoraPlatform roadmap** — the official SoraPlatform roadmap document,
  covering all ten products and their current status.
- **SoraSkills** — the [Agensi creator page](https://www.agensi.io/creators/mochi-sora).
- **Community** — the [SoraPlatform Discord server](https://discord.gg/s8W6JfBSMH).

The local files in `documents/` are provided for convenience. The versions in
the GitHub repositories are canonical.

## Scope

The single page is organised into seven sections: the hero profile card, the
purpose of SoraPlatform, the ten-product roadmap, SoraAgent, the newly built
SoraDesk, the products still in development, and contact information. The site
covers all ten SoraPlatform products — SoraAgent, SoraDesk, SoraSkills,
SoraPlugins, SoraOS, SoraOffice, SoraCreate, SoraBrowser, SoraMusic, and
SoraSocials. MasonAgent appears only as historical context in the profile copy;
there are no separate archive cards.

SoraAgent, SoraDesk, and SoraSkills are marked live. SoraDesk v0.1.0 is published:
the Tauri v2 client, the local Python bridge, and signed updater packaging are
implemented against the frozen v1 protocol. The macOS and Windows installers are
unsigned for now; the updater artifacts are signed. The remaining seven products are
marked in development.

The unrelated `undertale-game-for-no-reason-at-all` repository is intentionally
excluded.

## Notes

- The site is responsive down to small mobile widths and respects
  `prefers-reduced-motion`.
- The install tabs, copy buttons, mobile navigation, and scroll-reveal effects
  are implemented in `assets/js/main.js`.
- The page is intentionally consolidated: the hero introduces the person and links
  to his main profiles; the purpose section states the mission; the roadmap is the
  single product list; SoraAgent and SoraDesk get the technical detail; the
  in-development section covers the remaining products; and contact links close
  the page. External links also live in the header, the hero card, and the footer.
- The hero card is a compact profile card: avatar, name, and direct GitHub,
  Agensi, and Discord links.
- The SoraDesk section includes an HTML/CSS preview of the app shell rather than a
  screenshot, so it stays sharp at any size and needs no image asset.
- Local document mirrors are linked from the relevant product sections. The
  GitHub versions are canonical.
- Fonts are self-hosted under `assets/fonts/`; Sora, Inter, and Instrument Serif
  are licensed under the SIL Open Font License.
- The social preview image is at `assets/img/og-cover.png` (1200 × 630). After
  deploying, replace the relative `og:image` and `twitter:image` paths in
  `index.html` with absolute URLs for the most reliable link previews.
- SoraAgent and SoraDesk are licensed **AGPL-3.0-only**. Website copy and
  branding are © 2026 Tam Kuan Hou (譚君浩 / Marco Tam).
