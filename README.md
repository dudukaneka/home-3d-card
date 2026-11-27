# Home 3D Dashboard Card (`home-3d-card`)

Interactive, user-agnostic 3D floorplan custom Lovelace card for **Home Assistant**, built with **Three.js**, **Lit**, and **TypeScript**, installable directly via Home Assistant's **Marketplace** (2026.11+).

Point it at **any** `.glb` 3D home model (exported from SolidCraft, Blender, Fusion, SketchUp, Sweet Home 3D, etc.), click rooms or exterior zones to zoom in, and view/control each area's sensors and appliances.

## Features
- **1-Click Marketplace Installs & Updates:** Installs natively through **Settings → Marketplace** with automatic resource management and cache-busting.
- **Any `.glb` Model:** Auto-detects Z-up vs. Y-up orientation and normalizes scale and ground placement automatically.
- **Drag-and-Drop / Upload `.glb`:** Upload any `.glb` directly inside the card onboarding view or Lovelace visual editor (`idb://<filename>`, persisted in browser IndexedDB), or host in `/config/www/` (`/local/...`) for automatic multi-device sync.
- **Visual Mesh & Area Mapper:** Inspect any `.glb` right inside the Lovelace Card Editor (`Upload .glb` or `Inspect URL`), auto-create areas, click mesh chips, and bind each area to a Home Assistant Area (`hass.areas`) without writing YAML.
- **Convention Auto-Mapping:** Name meshes/nodes `area_<ha_area_id>` or `zone_<ha_area_id>` in your CAD/3D software (e.g. `area_kitchen`, `zone_patio`) and the card maps them automatically (`auto_map_area_meshes: true`).
- **Remember First-Load Camera View:** Orbit, pan, and zoom to your ideal overview and click **⌖ Set Default** on the card toolbar to remember it across reloads (and sync into `default_view` in the card config for all devices).
- **Slide-over & Fullscreen HUD Modes:** Defaults to `slide-over` beside the zoomed 3D area, with `fullscreen` configurable in Lovelace card settings (`panel_mode`).
- **Built-in Debug Coordinate Picker:** Enable `debug_picker: true` to click anywhere on the floorplan and read normalized `[normX, normZ]` coordinates for open-plan zones.

---

## Installation via Home Assistant Marketplace (Recommended)

1. Open **Settings → Marketplace** (accept the community disclaimer and link your GitHub account if prompted).
2. Click **⋮ (top-right) → Custom repositories**.
3. Add `https://github.com/dudukaneka/home-3d-card` with category **Dashboard** (or **Lovelace**), then click **Download**.
4. Reload your browser when prompted.
4. *(For multi-device `.glb` hosting)* Copy your personal `.glb` model into Home Assistant's default 3D folder:
   ```text
   /config/www/home-3d/home.glb
   ```
   *(New cards default to `/local/home-3d/home.glb`, and entering just a filename like `my-home.glb` automatically resolves to `/local/home-3d/my-home.glb`.)*
5. Add **Home 3D Dashboard Card** to any dashboard and configure your areas visually or via YAML:

```yaml
type: custom:home-3d-card
title: My 3D Home
model_url: /local/home-3d/my-home.glb
panel_mode: slide-over # or 'fullscreen'
up_axis: auto
card_height: 560
dim_unselected: true
show_labels: true
show_zone_overlay: true
auto_map_area_meshes: true
areas:
  - id: living_room
    name: Living Room
    ha_area_id: living_room
    mesh_names: ["area_living_room"]
  - id: kitchen
    name: Kitchen
    ha_area_id: kitchen
    bounds: [0.55, 0.20, 0.90, 0.55]
```

See [examples/sample-home/areas.json](examples/sample-home/areas.json) for a full sample configuration.

---

## Development & Verification

```bash
npm install
npm run typecheck
npm test
npm run validate:model
npm run build
npm run dev
```
