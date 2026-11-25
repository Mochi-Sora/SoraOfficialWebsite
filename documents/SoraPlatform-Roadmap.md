**Project SoraPlatform**

SoraPlatform aims to bring open source and independent products for the mass tech community. Big tech nowadays forces AI features and clunky products down users' throats. SoraPlatform stands opposed to that philosophy: we believe that the true value of software lies in its efficiency, individual control, and broadability.

So that's why SoraPlatform is created -> To stand opposed to the telemetry and bloat of mainstream big tech, on the same line as the tech community.

**Status legend**
- **Live** — available now.
- **Built** — implemented in the repository; not yet released.
- **WIP** — in development.

**What SoraPlatform will bring**
  1. SoraAgent as the main engine of the entire project -> https://github.com/Mochi-Sora/SoraAgent — **Live** (v0.4.0)
  2. SoraDesk (Tauri v2) as the main direct connection channel to SoraAgent -> https://github.com/Mochi-Sora/SoraDesk — **Live** (v0.2.3)
  3. SoraSkills as the broad term for framework-agnostic skills -> https://www.agensi.io/creators/mochi-sora — **Live** (State First Backend, context handoff)
  4. SoraPlugins as the broad term for SoraAgent dedicated plugins -> WIP
  5. SoraOS as an Arch-based KDE Plasma desktop layer -> https://github.com/Mochi-Sora/SoraOS — **Built** (M1 live image, validated in QEMU)
  6. SoraOffice as a direct candidate for office work -> WIP
  7. SoraCreate as a direct candidate for creative work -> WIP
  8. SoraBrowser as a direct candidate for browsing work -> WIP
  9. SoraMusic as a direct candidate for music listening -> WIP
  10. SoraSocials as a direct candidate for unified social media access without the telemetry and ads -> WIP

**Current milestones**

SoraAgent v0.4.0 is live: persistent specialists (delegation agents), the document conversion pipeline (PDF, Office, ODF, EPUB, EML, RTF, and archives), the hardened tool pack, session state, and graph-aware long-term memory. Setup now configures all ten chat channels plus the SoraDesk desktop channel.

SoraDesk v0.2.3 is live: the Tauri v2 client, the local `sora_desktop` bridge, and signed-updater packaging are implemented against the frozen v1 protocol. Chat, sessions, Specialists, calendar, memories, attachments, and settings work over local, SSH, or direct-IP connections. It requires SoraAgent 0.3.0+ and the matching bridge. The latest release ships a universal macOS `.dmg`, a Windows NSIS installer, and Linux `.AppImage`, `.deb`, and `.rpm` packages. Updater artifacts are signed; the macOS and Windows installers are not yet code-signed. It also ships an interface polish pass: long session and profile names truncate cleanly at the 900 px minimum width, approval cards stay scoped to the active turn, and the Memories card grid stays balanced.

SoraSkills is live on Agensi with two framework-agnostic skills: **State First Backend** (durable working state and curated knowledge for long-running agents) and **context handoff** (compact, structured handoffs that preserve task context across sessions).

SoraOS M1 is built: an archiso 92 profile on `linux-lts` with KDE Plasma 6, Plasma Login Manager autologin, the SoraOS look-and-feel and color scheme, BIOS and UEFI boot, and a speech/accessibility entry. The live image passes the UEFI/BIOS boot matrix and the live-session checklist in QEMU; real-hardware validation is next. It is not yet an installable release: M2 adds the signed `[soraos]` repository and keyring, and M3 adds the Calamares installer.
