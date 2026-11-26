# Architecture & Modeling Decisions

## ADR-001: 3D Asset Format (`.glb` Binary glTF 2.0)
- **Decision:** Use `.glb` (Binary glTF 2.0) for web and mobile Lovelace performance.
- **Handling:** `SceneManager` normalizes any loaded model's world bounding box (centering XZ at `(0, 0)`, resting floor at `Y = 0`, normalizing longest horizontal span to a standard scene radius) and auto-detects Z-up vs. Y-up orientation so camera framing, zoom limits, and area bounding boxes behave consistently across CAD/3D exporters.

## ADR-002: Area Selection Strategy (Mesh Targets + Footprint Bounds)
- **Decision:** Each configured area in `areas` supports:
  1. `mesh_names`: matching one or more glTF node/mesh names (including automatic discovery of `area_*` and `zone_*` prefixes).
  2. `bounds`: normalized `[minX, minZ, maxX, maxZ]` (`0..1` across the model footprint) creating an interactive floor zone hitbox + subtle highlight pad for open-plan spaces.

## ADR-003: Area Detail Presentation (`panel_mode`)
- **Decision:** Support `panel_mode: "slide-over"` (default) and `panel_mode: "fullscreen"` in Lovelace YAML and the visual card editor.

## ADR-004: Public HACS Card Distribution
- **Decision:** Keep `home-3d-card` user-agnostic and public on GitHub with `hacs.json` and tagged GitHub Releases (`dist/home-3d-card.js`), while users keep their personal `.glb` floorplan files privately on their Home Assistant host (`/config/www/home-3d/`).
