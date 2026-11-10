**Project SoraPlatform**

SoraPlatform aims to bring open source and independent products for the mass tech community. Big tech nowadays forces AI features and clunky products down users' throats. SoraPlatform stands opposed to that philosophy: we believe that the true value of software lies in its efficiency, individual control, and broadability.

So that's why SoraPlatform is created -> To stand opposed to the telemetry and bloat of mainstream big tech, on the same line as the tech community.

**Status legend**
- **Live** — available now.
- **Built** — implemented in the repository; not yet released.
- **WIP** — in development.

**What SoraPlatform will bring**
  1. SoraAgent as the main engine of the entire project -> https://github.com/Mochi-Sora/SoraAgent — **Live** (v0.1.0)
  2. SoraDesk (Tauri v2) as the main direct connection channel to SoraAgent -> https://github.com/Mochi-Sora/SoraDesk — **Live** (v0.1.0)
  3. SoraSkills as the broad term for framework-agnostic skills -> https://www.agensi.io/creators/mochi-sora — **Live** (State First Backend, context handoff)
  4. SoraPlugins as the broad term for SoraAgent dedicated plugins -> WIP
  5. SoraOS as a Linux distro developed on top of the Arch Linux base -> WIP
  6. SoraOffice as a direct candidate for office work -> WIP
  7. SoraCreate as a direct candidate for creative work -> WIP
  8. SoraBrowser as a direct candidate for browsing work -> WIP
  9. SoraMusic as a direct candidate for music listening -> WIP
  10. SoraSocials as a direct candidate for unified social media access without the telemetry and ads -> WIP

**Current milestones**

SoraDesk v0.1.0 is live: the Tauri v2 client, the local `sora_desktop` bridge, and signed-updater packaging are implemented against the frozen v1 protocol. Chat, sessions, calendar, memories, and settings work over local, SSH, or direct-IP connections. The first public release is available on GitHub Releases. The updater artifacts are signed; the macOS and Windows installers are not yet code-signed.

SoraSkills is live on Agensi with two framework-agnostic skills: **State First Backend** (durable working state and curated knowledge for long-running agents) and **context handoff** (compact, structured handoffs that preserve task context across sessions).
