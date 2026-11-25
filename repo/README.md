# SoraOS package mirror

This directory is the static `[soraos]` pacman repository served at:

```
https://mochi-sora.github.io/SoraOfficialWebsite/repo/$arch
```

It is generated from `SoraOS/repo/x86_64` by `scripts/publish-mirror.sh`. The
files are dereferenced copies (GitHub Pages does not follow symlinks), and the
database plus every package has a detached OpenPGP signature.

The current mirror is signed with the **SoraOS Test Repository (M2a)** key. It
is for development and live-image testing, not a production release. Replace
the key with the offline release key and move the repository to a dedicated
host before publishing SoraOS to users.

Do not edit files here by hand. Run the SoraOS publishing script, verify the
signatures, then commit the refreshed directory.
