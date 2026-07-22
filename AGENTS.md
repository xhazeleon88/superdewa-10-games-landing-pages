# AGENTS.md

## Cursor Cloud specific instructions

### Repository state

This repository is currently a placeholder. It contains only `README.md` and has
**no application code, no dependency manifest, no build system, and no tests yet**.
The name (`superdewa-10-games-landing-pages`) indicates it is intended to host
landing pages for games, but that code has not been added.

Because there is nothing to install, there is currently:

- nothing to lint,
- nothing to test,
- nothing to build,
- and no application/service to run.

### Environment baseline

The base VM already provides the common runtimes (verified during setup):

- Node.js `v22.14.0` / npm `10.9.7`
- Python `3.12.3`

### Update script

The configured startup update script is guarded and idempotent:

```
if [ -f package.json ]; then npm install; fi
```

It is a no-op today (no `package.json` exists) and will automatically install
Node dependencies once a manifest is added. When the actual landing-page project
is introduced, revisit this file and the update script to add the real
install/lint/test/build/run commands (and update this section to point at them).
