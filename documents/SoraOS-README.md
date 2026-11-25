<p align="center">
  <img src="branding/sora-mark.svg" alt="SoraOS" width="112">
</p>

<h1 align="center">SoraOS</h1>

<p align="center"><strong>An Arch-based KDE Plasma desktop that stays Arch underneath.</strong></p>

<p align="center">
  <a href="#status"><img src="https://img.shields.io/badge/status-M2b%20implemented-7aa2f7" alt="Status M2b implemented"></a>
  <a href="https://archlinux.org/"><img src="https://img.shields.io/badge/base-Arch%20Linux-1793d1" alt="Arch Linux"></a>
  <a href="https://archlinux.org/packages/core/x86_64/linux-lts/"><img src="https://img.shields.io/badge/kernel-linux--lts-333" alt="linux-lts"></a>
  <a href="https://kde.org/plasma-desktop/"><img src="https://img.shields.io/badge/desktop-KDE%20Plasma-1d99f3" alt="KDE Plasma"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0--only-2ea44f" alt="AGPL-3.0-only"></a>
</p>

<p align="center">
  <a href="https://mochi-sora.github.io/SoraOfficialWebsite/">Website</a> ·
  <a href="https://github.com/Mochi-Sora">SoraPlatform</a> ·
  <a href="https://github.com/Mochi-Sora/SoraAgent">SoraAgent</a> ·
  <a href="https://github.com/Mochi-Sora/SoraDesk">SoraDesk</a> ·
  <a href="docs/testing.md">Testing</a> ·
  <a href="https://discord.gg/s8W6JfBSMH">Discord</a>
</p>

**SoraOS is the SoraPlatform desktop operating system: an Arch-based KDE Plasma system built as an archiso layer on the official Arch repositories and the `linux-lts` kernel.** It is not a fork. `sudo pacman -Syu` keeps working exactly as on Arch, while SoraPlatform adds branding, defaults, a signed `[soraos]` repository, SoraAgent and SoraDesk, and later the Calamares installer.

## At a glance

**It is**

- an archiso profile plus a thin product layer over Arch, not a rebuilt distro;
- Arch official repositories for the base, `linux-lts`, the graphics stack, and KDE Plasma 6;
- nine packages served from the signed `[soraos]` repository: branding, release, keyring,
  mirrorlist, desktop meta, SoraAgent, the SoraDesk bridge, SoraDesk, and one Python dependency;
- a live desktop with Plasma Login Manager autologin, NetworkManager, PipeWire, Bluetooth,
  Firefox, the core KDE apps, and a working SoraAgent → bridge → SoraDesk local stack;
- BIOS and UEFI, x86_64, with a separate accessibility/speech boot entry;
- rebuildable from one checkout: `make check`, `make repo`, `make iso`, checksummed output.

**It is not**

- a fork of Arch or a pinned snapshot of its packages;
- a custom kernel, a second updater, or a parallel repository for core packages;
- installable yet — Calamares and the installed-system path are M3;
- production-signed yet — the hosted mirror uses a development test key;
- Secure Boot ready yet — the ISO is unsigned until M4, and package signing is not boot signing.

**Best for**

- people who want an Arch/KDE live desktop with SoraOS defaults and branding;
- testing the SoraAgent and SoraDesk stack on a controlled, repairable live image;
- anyone who wants to audit, rebuild, or remix the ISO and package repository from one checkout.

## Start here

| You want to… | Go to |
| --- | --- |
| Build and boot the live ISO | [Build and test](#build-and-test) |
| See what M1, M2a, and M2b include | [Status](#status) |
| Run the acceptance checklist | [docs/testing.md](docs/testing.md) |
| Understand the design | [docs/architecture.md](docs/architecture.md) |
| Plan Secure Boot | [docs/secureboot.md](docs/secureboot.md) |
| Use the agent runtime | [SoraAgent](https://github.com/Mochi-Sora/SoraAgent) |
| Use the desktop client | [SoraDesk](https://github.com/Mochi-Sora/SoraDesk) |
| Ask a question | [Discord](https://discord.gg/s8W6JfBSMH) |

## Why SoraOS

- **Arch underneath, no fork.** Official packages and `pacman -Syu` remain the update path.
- **One product layer, real packages.** Branding and defaults ship through packages, not a pile of copied root files.
- **The products are in the OS.** SoraAgent, its bridge, and SoraDesk are installed and connected locally on the live image.
- **One protocol, one update path.** SoraDesk talks to SoraAgent over the bridge; SoraOS updates itself through pacman.
- **LTS kernel, no kernel build.** `linux-lts` comes from `core`; SoraOS never compiles a kernel.
- **A product layer, not a walled garden.** Branding and packages are additive, and every file is inspectable.

## Status

| Milestone | Scope | State |
|---|---|---|
| M0 | Repo skeleton, archiso 92 profile, build/test scripts | Done |
| M1 | Branded KDE Plasma live ISO on linux-lts | Done — UEFI, BIOS, and speech entry validated in QEMU |
| M2a | Signed local `[soraos]` repo, keyring, release, branding, desktop meta | Done — boot-validated in QEMU |
| M2b | SoraAgent/SoraDesk packages and a hosted signed mirror | Implemented — development mirror; production key pending |
| M3 | Calamares installer and installable system | Planned |
| M4 | Secure Boot signing chain (optional), CI, release automation | Planned |

### What M1 delivers

- `linux-lts` only, with the archiso initramfs hooks intact and no custom kernel.
- KDE Plasma 6 with Plasma Login Manager and autologin to a live `sora` user.
- SoraOS branding: `os-release`, boot menus, the SoraOS Plasma color scheme, look-and-feel, wallpaper, icon, MOTD, and greeter wallpaper.
- NetworkManager, PipeWire, Bluetooth, Firefox, Dolphin, Konsole, Kate, Ark, Gwenview, Okular, and Flatpak.
- Live-medium behavior: 4 GiB CoW space, volatile journal, no suspend on lid close, pacman keyring initialized at boot, mirrors ready.
- BIOS and UEFI boot, including a separate speech/accessibility entry.

### What M2a adds

- Five package sources under `packages/`: `soraos-keyring`, `soraos-mirrorlist`,
  `soraos-release`, `soraos-branding`, and `soraos-desktop-meta`.
- `scripts/build-repo.sh` builds every package, signs each package and the
  repository database, refreshes `repo/x86_64`, and verifies the signatures.
- A live `[soraos]` repository at `file:///opt/soraos/repo/$arch`, trusted by
  `pacman-key` through `soraos-keyring`, with `SigLevel = Required DatabaseOptional`.
- `soraos-release` owns the identity files and the repository helpers. Its
  post-install hooks reapply `/etc/os-release`, `/etc/issue`, and `[soraos]`
  after filesystem or pacman upgrades.
- Branding and user defaults moved out of the airootfs overlay into
  `soraos-branding`; the live setup hook now only creates the live account and
  enables live services.

### What M2b adds

- `sora-agent` 0.4.0, built from the upstream release source, with the OpenAI,
  CLI, PDF, and questionary dependencies supplied by Arch packages.
- `sora-desk` 0.2.3, built natively from the Tauri source with
  `tauri build --no-bundle`, so the binary embeds the production frontend and
  links against the Arch WebKitGTK stack. The package's check phase runs the
  69-check protocol smoke suite.
- `sora-desk-bridge` 0.2.3, the `sora-desktop` bridge, built against Arch's
  `websockets` 17 after the upstream `<17` guard was verified against the full
  bridge smoke suite.
- `python-questionary` 2.1.1, because the interactive `sora setup` wizard needs
  it and it is not in the official repositories.
- A hosted, signed mirror at
  `https://mochi-sora.github.io/SoraOfficialWebsite/repo/$arch`, published by
  `scripts/publish-mirror.sh`. The live system uses the HTTPS mirror first and
  the on-medium repository as an offline fallback.
- A `soraos-desktop-meta` package set that includes the products, plus pinned
  provider choices so the ISO build is non-interactive.
- Build hardening: non-interactive pacstrap, stale cached local packages are
  discarded, and unshare-owned stale work directories are cleaned safely.

### Known limitations in M2b

- **The mirror is signed with a test key.** The public key is committed; the
  private key stays in `repo/keys/` and is ignored by git. Replace both with an
  offline production key before calling the repository public.
- **The hosted mirror is a development host.** It lives under the official
  website's GitHub Pages site for bootstrap convenience. Move it to a dedicated
  static host with release automation before a stable release.
- **Package signing is not Secure Boot signing.** It authenticates `[soraos]`
  packages to pacman; it does not make the ISO boot under Secure Boot.
- **SoraDesk's in-app updater is not the SoraOS update path.** Use
  `sudo pacman -Syu`; the packaged client is rebuilt from source for each
  package release.
- **Validated in QEMU only so far.** The UEFI/BIOS boot matrix, the live-session
  checklist, SoraAgent, the bridge, and SoraDesk have been exercised in QEMU;
  real hardware is the next validation step.
- **The ISO is unsigned.** Secure Boot must stay off until the signing pipeline
  in [docs/secureboot.md](docs/secureboot.md) lands — the same situation as the
  official Arch ISO.
- **No installer yet.** Calamares is an AUR package in 2026, not an official
  Arch package, so M3 must build and ship it from `[soraos]`.
- **The live session is passwordless.** `sora` has an empty password and
  NOPASSWD sudo; root is locked. Do not use the live image as a secure
  installed system.
- **NVIDIA proprietary drivers are not preinstalled.** Nouveau/Mesa works;
  users can install `nvidia-lts` after installation.

## Build and test

Requirements: an Arch-based host (EndeavourOS is fine), `archiso` 92+, and the
package/build toolchain. SoraDesk is compiled from source, so Rust, Node.js,
npm, WebKitGTK, and GTK 3 are required. archiso 92 can build unprivileged
through user namespaces, so the build itself does not need sudo.

```bash
sudo pacman -S --needed archiso qemu-desktop edk2-ovmf librsvg base-devel gnupg \
  rust nodejs npm python-build python-installer python-wheel python-setuptools \
  webkit2gtk-4.1 gtk3

make deps                   # report what is installed
./scripts/gen-test-key.sh   # once: create the local TEST signing key
make check                  # static validation of the profile and packages
make repo                   # build, sign, and verify repo/x86_64
make iso                    # build out/soraos-YYYY.MM.DD-x86_64.iso
make run                    # boot the newest ISO in UEFI QEMU
make run-bios               # boot the newest ISO in BIOS QEMU
make publish                # sync the signed repo to the website mirror
```

`make iso` calls `scripts/build-repo.sh` automatically, stages the signed
repository into the profile for the build, and removes the staged copy on exit.
Use `SORAOS_SKIP_REPO=1 make iso` to rebuild only the ISO while iterating.
`make clean` removes `work/`, `out/`, and the generated `repo/x86_64`, but keeps
the test key so the next build can reuse it.

SoraDesk's source build is the slowest step (roughly two minutes on a modern
machine) and needs network access for npm and crates.io. The package check runs
the client protocol smoke suite before the package is produced.

The build host does not trust the test key, so the build-only pacman config uses
`SigLevel = Never` for `[soraos]`; `build-repo.sh` verifies every signature
separately. The live system uses `SigLevel = Required DatabaseOptional` and
trusts `soraos-keyring`.

`make iso` uses the host `mkarchiso`. If `archiso` is not installed, it can use
a privileged `archlinux` container instead:

```bash
./scripts/build.sh --container
```

Build artifacts are written to `out/`; `work/` is removed after a successful
build. The generated ISO is checksummed automatically. The live-session
acceptance checklist is in [docs/testing.md](docs/testing.md).

## Repository and mirror

The `[soraos]` mirror is a static directory containing only signed artifacts:

```
repo/x86_64/
├── soraos.db, soraos.db.sig          # pacman database (dereferenced for HTTP)
├── soraos.files, soraos.files.sig
├── sora-agent-*.pkg.tar.zst(.sig)
├── sora-desk-*.pkg.tar.zst(.sig)
├── sora-desk-bridge-*.pkg.tar.zst(.sig)
├── python-questionary-*.pkg.tar.zst(.sig)
└── soraos-*.pkg.tar.zst(.sig)
```

`scripts/publish-mirror.sh` verifies every signature before and after copying,
dereferences the `repo-add` symlinks, and writes into
`../SoraOfficialWebsite/repo/x86_64` by default. Set `SORAOS_MIRROR_DIR` to
publish to another static host checkout. Commit and push the website repository
afterward.

## Layout

```
SoraOS/
├── LICENSE                     # AGPL-3.0-only
├── README.md
├── Makefile                    # deps, check, repo, iso, publish, run, clean
├── branding/                   # SVG logo, wallpaper, and splash sources
├── docs/
│   ├── architecture.md         # layers, update model, package and mirror flow
│   ├── secureboot.md           # signing chain and key custody plan
│   └── testing.md              # boot matrix, repository checks, live checklist
├── packages/
│   ├── python-questionary/     # setup-wizard dependency not in [extra]
│   ├── sora-agent/             # SoraAgent runtime and CLI
│   ├── sora-desk/              # native Tauri client, built from source
│   ├── sora-desk-bridge/       # sora-desktop WebSocket bridge
│   ├── soraos-branding/        # Plasma defaults, wallpapers, icons, MOTD
│   ├── soraos-desktop-meta/    # the KDE/desktop/product dependency set
│   ├── soraos-keyring/         # committed public repository key
│   ├── soraos-mirrorlist/      # hosted + on-medium [soraos] servers
│   └── soraos-release/         # identity, pacman helpers, and hooks
├── repo/                       # generated repository and keys (gitignored)
├── iso/                        # the archiso profile
│   ├── airootfs/               # live-only files overlaid onto the root
│   ├── efiboot/                # systemd-boot entries and loader config
│   ├── syslinux/               # BIOS boot menu and splash
│   ├── packages.x86_64         # live image package set
│   ├── pacman.conf             # build-time pacman config
│   └── profiledef.sh           # ISO identity, bootmodes, permissions
└── scripts/
    ├── build.sh                # build the repo, then the ISO
    ├── build-branding.sh       # regenerate PNGs from SVG sources
    ├── build-repo.sh           # build, sign, and verify all packages
    ├── check-profile.sh        # static validation before a build
    ├── deps.sh                 # report build/test dependencies
    ├── gen-test-key.sh         # create the local TEST signing key
    ├── publish-mirror.sh       # stage the signed repository for the website
    └── test-qemu.sh            # boot the newest ISO in QEMU
```

## Design rules

1. **Never fork core Arch packages.** SoraOS packages are additive.
2. **Never pin individual packages.** Either follow the official rolling repos or move the whole system to a tested snapshot. Partial upgrades break Arch.
3. **The ISO and the installed system share one package/repo definition.** The live image is not the installation source.
4. **The live image is a demo/rescue environment.** User data belongs on the installed system, not the CoW overlay.
5. **Build-time secrets never enter the image.** Package and Secure Boot private keys stay outside the profile and outside git; only the public keyring is committed.
6. **Package signing and boot signing are separate.** A signed `[soraos]` repository gives pacman authenticity; Secure Boot trust for the boot chain is a separate, optional milestone.
7. **Build the products from source for Arch.** Do not repackage a foreign distro binary into a rolling Arch system.
8. **The package manager owns updates.** Application self-updaters are not the supported path on SoraOS.

## SoraPlatform

SoraOS is product 05 of [SoraPlatform](https://github.com/Mochi-Sora), an umbrella
of open-source, independent products built against telemetry and bloat. It is the
platform's operating-system layer. [SoraAgent](https://github.com/Mochi-Sora/SoraAgent)
is the agent runtime; [SoraDesk](https://github.com/Mochi-Sora/SoraDesk) is its native
desktop client; [SoraSkills](https://www.agensi.io/creators/mochi-sora) packages
framework-agnostic agent skills on Agensi; and the official site lives at
[SoraOfficialWebsite](https://github.com/Mochi-Sora/SoraOfficialWebsite).

## License

GNU Affero General Public License v3.0 only (`AGPL-3.0-only`).

Copyright (C) 2026 Tam Kuan Hou (譚君浩 / Marco Tam) — GitHub:
[Mochi-Sora](https://github.com/Mochi-Sora).

Files copied from archiso (for example `livecd-sound`) keep their original
`GPL-3.0-or-later` headers.
