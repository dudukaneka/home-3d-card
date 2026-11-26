# Changelog & Project Log

## [0.5.0] - 2026-11-26 (Default Camera Position & Zoom)
- **Remember First-Load Camera View (`default_view`):** Added **⌖ Set Default** and **↺ Auto** buttons in the card toolbar, `SceneManager.getCameraPose()` / `setDefaultView()`, browser `localStorage` persistence (`saveDefaultView` / `loadDefaultView`), and live sync into `default_view` in the Lovelace visual editor (`home-3d-editor.ts`) so your preferred starting angle and zoom persist across reloads and devices.

## [0.4.1] - 2026-11-26 (Home Assistant Marketplace Standard)
- **Marketplace Documentation:** Updated README, CI workflow labels, and decision logs from HACS to Home Assistant 2026.11's native **Marketplace** standard (`Settings → Marketplace`).

## [0.4.0] - 2026-11-26 (Public Marketplace Distribution)
- **Public Marketplace Packaging:** Removed personal floorplan assets from the repository (replaced with synthetic [examples/sample-home/sample-home.glb](examples/sample-home/sample-home.glb) for CI validation and standalone dev preview) so `home-3d-card` can be installed and updated natively via Home Assistant Marketplace with automatic cache-busting.

## [0.3.1] - 2026-11-26 (HA Terminal Scripts)
- Added POSIX `sh` install and update helper scripts (`scripts/ha-install.sh`, `scripts/ha-update.sh`) and `.gitattributes` `LF` normalization.

## [0.3.0] - 2026-11-26 (In-Browser GLB Upload)
- **Persistent `.glb` Upload (`model-storage.ts`):** Added IndexedDB storage (`idb://<filename>`) with binary `.glb` validation (`parseGlbMetadata`) so uploaded models persist across page reloads.
- **Card & Visual Editor Drag-and-Drop Upload:** Added **Upload .glb** and drag-and-drop zones to both the card onboarding state (`home-3d-card.ts`) and the Lovelace visual editor (`home-3d-editor.ts`).

## [0.2.0] - 2026-11-25 (User-Agnostic Refactor)
- Removed hardcoded starter stub defaults, added onboarding state, added visual GLB inspector & `hass.areas` mapper, and added `area_*` / `zone_*` convention auto-mapping.

## [0.1.0] - 2026-11-25 (Initial MVP)
- Built custom TypeScript + Three.js + Lit Lovelace card (`home-3d-card.js`) with Z-up/Y-up auto-normalization, click-to-maximize camera transitions, and `slide-over` / `fullscreen` sensor & appliance HUD.
