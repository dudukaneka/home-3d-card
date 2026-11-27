import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  clearDefaultView,
  deleteUploadedModel,
  isIdbModelUrl,
  listUploadedModels,
  loadDefaultView,
  loadUploadedModel,
  saveUploadedModel,
  type UploadedModelMeta,
} from './model-storage';
import {
  autoDiscoverAreasFromMeshes,
  DEFAULT_MODEL_URL,
  parseGlbMetadata,
  resolveModelUrl,
} from './model-utils';
import type {
  AreaConfig,
  CameraPoseConfig,
  Home3DCardConfig,
  HomeAssistant,
  PanelMode,
  UpAxisMode,
} from './types';

const PALETTE = ['#38bdf8', '#34d399', '#fbbf24', '#a78bfa', '#fb7185', '#2dd4bf'];

@customElement('home-3d-card-editor')
export class Home3DCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: Home3DCardConfig;
  @state() private _discoveredMeshes: string[] = [];
  @state() private _uploadedModels: UploadedModelMeta[] = [];
  @state() private _inspectStatus: string | null = null;
  @state() private _inspectError: string | null = null;
  @state() private _dragActive = false;
  @state() private _capturedView: CameraPoseConfig | null = null;

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('home-3d-default-view-changed', this.handleViewChangedEvent);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('home-3d-default-view-changed', this.handleViewChangedEvent);
  }

  private handleViewChangedEvent = (ev: Event): void => {
    const detail = (ev as CustomEvent<{ modelUrl: string; pose: CameraPoseConfig | null }>).detail;
    if (!detail || detail.modelUrl !== resolveModelUrl(this._config?.model_url)) return;
    this._capturedView = detail.pose;
    if (detail.pose) {
      this.updateField('default_view', detail.pose);
    } else if (this._config?.default_view) {
      const next = { ...this._config };
      delete next.default_view;
      this.emitConfig(next);
    }
  };

  public setConfig(config: Home3DCardConfig): void {
    this._config = { ...config };
    this._capturedView = loadDefaultView(resolveModelUrl(config.model_url));
    void this.refreshUploadedModels();
  }

  private async refreshUploadedModels(): Promise<void> {
    try {
      this._uploadedModels = await listUploadedModels();
    } catch {
      this._uploadedModels = [];
    }
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 0;
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
      color: var(--primary-text-color, #f8fafc);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    label.field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 0.84rem;
      font-weight: 600;
    }

    input[type='text'],
    input[type='number'],
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #475569);
      background: var(--card-background-color, #1e293b);
      color: var(--primary-text-color, #f8fafc);
      font-size: 0.88rem;
    }

    .model-bar {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-wrap: wrap;
    }

    .model-bar label.field {
      flex: 1 1 220px;
    }

    .dropzone {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1.5px dashed rgba(148, 163, 184, 0.4);
      background: rgba(148, 163, 184, 0.06);
      font-size: 0.82rem;
    }

    .dropzone.active {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
    }

    .saved-models {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      font-size: 0.78rem;
    }

    .saved-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.35);
      background: rgba(148, 163, 184, 0.12);
    }

    .saved-pill.active {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.35);
    }

    .saved-pill button {
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0 2px;
      font-size: 0.78rem;
      font-weight: 600;
    }

    button.btn,
    label.btn {
      appearance: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: rgba(148, 163, 184, 0.14);
      color: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }

    button.btn:hover,
    label.btn:hover {
      background: rgba(148, 163, 184, 0.24);
    }

    button.btn.primary,
    label.btn.primary {
      background: #0284c7;
      border-color: transparent;
      color: #f8fafc;
    }

    button.btn.danger {
      color: #fda4af;
      border-color: rgba(251, 113, 133, 0.35);
    }

    label.btn input {
      display: none;
    }

    .toggles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    label.check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.84rem;
      cursor: pointer;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
    }

    .section-header h4 {
      margin: 0;
      font-size: 0.94rem;
    }

    .area-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.22);
      background: rgba(148, 163, 184, 0.06);
    }

    .area-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .mesh-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      padding: 4px 8px;
      border-radius: 999px;
      font-size: 0.75rem;
      border: 1px solid rgba(148, 163, 184, 0.32);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    .chip.selected {
      background: #0284c7;
      border-color: #7dd3fc;
      color: #f8fafc;
    }

    .status {
      font-size: 0.78rem;
      opacity: 0.84;
    }

    .status.error {
      color: #fda4af;
    }
  `;

  private emitConfig(next: Home3DCardConfig): void {
    this._config = next;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private updateField<K extends keyof Home3DCardConfig>(
    key: K,
    value: Home3DCardConfig[K],
  ): void {
    if (!this._config) return;
    this.emitConfig({ ...this._config, [key]: value });
  }

  private inspectBuffer(buffer: ArrayBuffer, label: string): void {
    const meta = parseGlbMetadata(buffer);
    const combined = [...new Set([...meta.meshNames, ...meta.nodeNames])];
    this._discoveredMeshes = combined;
    this._inspectError = null;
    this._inspectStatus = `Inspected ${label}: ${combined.length} node/mesh name(s)${
      meta.generator ? ` · ${meta.generator}` : ''
    }`;
  }

  private handleInspectUrl = async (): Promise<void> => {
    const url = resolveModelUrl(this._config?.model_url);
    if (!url) {
      this._inspectError = 'Enter a filename/URL or upload a .glb file first.';
      return;
    }
    try {
      this._inspectStatus = 'Inspecting .glb…';
      this._inspectError = null;
      if (isIdbModelUrl(url)) {
        const buf = await loadUploadedModel(url);
        if (!buf) throw new Error('Uploaded model not found in this browser');
        this.inspectBuffer(buf, url);
        return;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      this.inspectBuffer(buf, url);
    } catch (err) {
      this._inspectStatus = null;
      this._inspectError = `Could not inspect GLB: ${err instanceof Error ? err.message : String(err)}`;
    }
  };

  private async handleUploadGlbFile(file: File): Promise<void> {
    try {
      this._inspectStatus = `Uploading ${file.name}…`;
      this._inspectError = null;
      const buf = await file.arrayBuffer();
      const { url, meta } = await saveUploadedModel(file.name, buf);
      const combined = [...new Set([...meta.meshNames, ...meta.nodeNames])];
      this._discoveredMeshes = combined;
      this._inspectStatus = `Uploaded & saved ${file.name} (${(buf.byteLength / 1024).toFixed(1)} KB, ${combined.length} mesh/node names). Click Save below to persist.`;
      await this.refreshUploadedModels();
      this.updateField('model_url', url);
    } catch (err) {
      this._inspectStatus = null;
      this._inspectError = `Upload failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  private handleUploadInput = (e: Event): void => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      void this.handleUploadGlbFile(file);
    }
  };

  private handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    this._dragActive = false;
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      void this.handleUploadGlbFile(file);
    }
  };

  private handleSelectSavedModel = async (item: UploadedModelMeta): Promise<void> => {
    this.updateField('model_url', item.url);
    const buf = await loadUploadedModel(item.url);
    if (buf) {
      this.inspectBuffer(buf, item.name);
    }
  };

  private handleDeleteSavedModel = async (item: UploadedModelMeta): Promise<void> => {
    await deleteUploadedModel(item.name);
    if (this._config?.model_url === item.url) {
      this.updateField('model_url', '');
    }
    await this.refreshUploadedModels();
  };

  private handleAutoCreateAreas = (): void => {
    if (!this._config || this._discoveredMeshes.length === 0) return;
    const current = this._config.areas ?? [];
    const existingMeshes = new Set(current.flatMap((a) => a.mesh_names ?? []));

    const prefixed = autoDiscoverAreasFromMeshes(this._discoveredMeshes, this.hass?.areas, current);
    if (prefixed.length > 0) {
      this.updateField('areas', [...current, ...prefixed]);
      return;
    }

    const added: AreaConfig[] = [];
    for (const meshName of this._discoveredMeshes) {
      if (existingMeshes.has(meshName)) continue;
      const id = meshName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      if (!id || current.some((a) => a.id === id) || added.some((a) => a.id === id)) continue;
      added.push({
        id,
        name: meshName,
        color: PALETTE[(current.length + added.length) % PALETTE.length],
        mesh_names: [meshName],
      });
    }
    if (added.length > 0) {
      this.updateField('areas', [...current, ...added]);
    }
  };

  private handleAddArea = (): void => {
    if (!this._config) return;
    const areas = [...(this._config.areas ?? [])];
    const n = areas.length + 1;
    areas.push({
      id: `area_${n}`,
      name: `Area ${n}`,
      color: PALETTE[(n - 1) % PALETTE.length],
    });
    this.updateField('areas', areas);
  };

  private updateArea(index: number, patch: Partial<AreaConfig>): void {
    if (!this._config) return;
    const areas = [...(this._config.areas ?? [])];
    areas[index] = { ...areas[index], ...patch };
    this.updateField('areas', areas);
  }

  private removeArea(index: number): void {
    if (!this._config) return;
    const areas = [...(this._config.areas ?? [])];
    areas.splice(index, 1);
    this.updateField('areas', areas);
  }

  private toggleAreaMesh(index: number, meshName: string): void {
    const area = this._config?.areas?.[index];
    if (!area) return;
    const set = new Set(area.mesh_names ?? []);
    if (set.has(meshName)) set.delete(meshName);
    else set.add(meshName);
    this.updateArea(index, { mesh_names: [...set] });
  }

  protected render() {
    if (!this._config) return nothing;
    const areas = this._config.areas ?? [];
    const haAreas = this.hass?.areas ? Object.values(this.hass.areas) : [];

    return html`
      <div class="editor">
        <div class="row">
          <label class="field">
            Card Title
            <input
              type="text"
              .value=${this._config.title ?? 'My 3D Home'}
              @input=${(e: Event) =>
                this.updateField('title', (e.target as HTMLInputElement).value)}
            />
          </label>
          <label class="field">
            Area Detail Mode
            <select
              .value=${this._config.panel_mode ?? 'slide-over'}
              @change=${(e: Event) =>
                this.updateField('panel_mode', (e.target as HTMLSelectElement).value as PanelMode)}
            >
              <option value="slide-over">Slide-over (Default)</option>
              <option value="fullscreen">Fullscreen</option>
            </select>
          </label>
        </div>

        <div
          class="dropzone ${this._dragActive ? 'active' : ''}"
          @dragover=${(e: DragEvent) => {
            e.preventDefault();
            this._dragActive = true;
          }}
          @dragleave=${() => {
            this._dragActive = false;
          }}
          @drop=${this.handleDrop}
        >
          <span>
            <strong>Upload .glb Model:</strong> Drag &amp; drop a <code>.glb</code> file here or
            browse (saved in this browser; use <code>/local/...</code> for all devices).
          </span>
          <label class="btn primary">
            Upload .glb
            <input type="file" accept=".glb" @change=${this.handleUploadInput} />
          </label>
        </div>

        ${this._uploadedModels.length > 0
          ? html`
              <div class="saved-models">
                <span>Uploaded in browser:</span>
                ${this._uploadedModels.map(
                  (item) => html`
                    <span class="saved-pill ${this._config?.model_url === item.url ? 'active' : ''}">
                      <button type="button" @click=${() => void this.handleSelectSavedModel(item)}>
                        ${item.name} (${(item.sizeBytes / 1024).toFixed(0)} KB)
                      </button>
                      <button
                        type="button"
                        title="Delete stored model"
                        @click=${() => void this.handleDeleteSavedModel(item)}
                      >
                        ✕
                      </button>
                    </span>
                  `,
                )}
              </div>
            `
          : nothing}

        <div class="model-bar">
          <label class="field">
            3D Model File or URL (bare filenames default to <code>/config/www/home-3d/</code>)
            <input
              type="text"
              placeholder="${DEFAULT_MODEL_URL} (or just my-home.glb)"
              .value=${this._config.model_url ?? ''}
              @input=${(e: Event) =>
                this.updateField('model_url', (e.target as HTMLInputElement).value)}
            />
          </label>
          <button type="button" class="btn" @click=${this.handleInspectUrl}>Inspect URL</button>
        </div>

        ${this._inspectStatus ? html`<div class="status">${this._inspectStatus}</div>` : nothing}
        ${this._inspectError ? html`<div class="status error">${this._inspectError}</div>` : nothing}

        <div class="dropzone">
          <span>
            <strong>Default Camera View:</strong>
            ${this._config.default_view
              ? html`Saved in card config (pos: ${this._config.default_view.position.join(', ')})`
              : this._capturedView
                ? html`Captured from card preview — click <em>Apply to Config</em> &amp; Save`
                : html`Auto-fit on first load (orbit/zoom card &amp; click <code>⌖ Set Default</code>)`}
          </span>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${this._capturedView
              ? html`
                  <button
                    type="button"
                    class="btn primary"
                    @click=${() => this.updateField('default_view', this._capturedView!)}
                  >
                    Apply to Config
                  </button>
                `
              : nothing}
            ${this._config.default_view || this._capturedView
              ? html`
                  <button
                    type="button"
                    class="btn"
                    @click=${() => {
                      clearDefaultView(resolveModelUrl(this._config?.model_url));
                      this._capturedView = null;
                      if (this._config) {
                        const next = { ...this._config };
                        delete next.default_view;
                        this.emitConfig(next);
                      }
                    }}
                  >
                    Reset Auto
                  </button>
                `
              : nothing}
          </div>
        </div>

        <div class="row">
          <label class="field">
            Card Height (px)
            <input
              type="number"
              min="320"
              max="1200"
              step="20"
              .value=${String(this._config.card_height ?? 560)}
              @input=${(e: Event) =>
                this.updateField('card_height', Number((e.target as HTMLInputElement).value) || 560)}
            />
          </label>
          <label class="field">
            Model Up Axis
            <select
              .value=${this._config.up_axis ?? 'auto'}
              @change=${(e: Event) =>
                this.updateField('up_axis', (e.target as HTMLSelectElement).value as UpAxisMode)}
            >
              <option value="auto">Auto (SolidCraft & glTF ready)</option>
              <option value="z">Z-Up (Raw CAD)</option>
              <option value="y">Y-Up (Standard glTF)</option>
            </select>
          </label>
        </div>

        <div class="toggles">
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.show_labels !== false}
              @change=${(e: Event) =>
                this.updateField('show_labels', (e.target as HTMLInputElement).checked)}
            />
            Show floating room labels
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.dim_unselected !== false}
              @change=${(e: Event) =>
                this.updateField('dim_unselected', (e.target as HTMLInputElement).checked)}
            />
            Dim unselected meshes
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.show_zone_overlay !== false}
              @change=${(e: Event) =>
                this.updateField('show_zone_overlay', (e.target as HTMLInputElement).checked)}
            />
            Show zone footprint highlights
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.auto_map_area_meshes !== false}
              @change=${(e: Event) =>
                this.updateField('auto_map_area_meshes', (e.target as HTMLInputElement).checked)}
            />
            Auto-map <code>area_*</code> / <code>zone_*</code> meshes
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(this._config.debug_picker)}
              @change=${(e: Event) =>
                this.updateField('debug_picker', (e.target as HTMLInputElement).checked)}
            />
            Debug coordinate picker
          </label>
        </div>

        <div class="section-header">
          <h4>Areas (${areas.length})</h4>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${this._discoveredMeshes.length > 0
              ? html`
                  <button type="button" class="btn" @click=${this.handleAutoCreateAreas}>
                    ⚡ Auto-create from GLB
                  </button>
                `
              : nothing}
            <button type="button" class="btn primary" @click=${this.handleAddArea}>
              + Add Area
            </button>
          </div>
        </div>

        ${areas.map(
          (area, idx) => html`
            <div class="area-card">
              <div class="area-top">
                <strong>${area.name || area.id}</strong>
                <button type="button" class="btn danger" @click=${() => this.removeArea(idx)}>
                  Remove
                </button>
              </div>
              <div class="row">
                <label class="field">
                  Display Name
                  <input
                    type="text"
                    .value=${area.name}
                    @input=${(e: Event) =>
                      this.updateArea(idx, { name: (e.target as HTMLInputElement).value })}
                  />
                </label>
                <label class="field">
                  Home Assistant Area
                  ${haAreas.length > 0
                    ? html`
                        <select
                          .value=${area.ha_area_id ?? ''}
                          @change=${(e: Event) =>
                            this.updateArea(idx, {
                              ha_area_id: (e.target as HTMLSelectElement).value || undefined,
                            })}
                        >
                          <option value="">— Manual entities only —</option>
                          ${haAreas.map(
                            (ha) => html`<option value=${ha.area_id}>${ha.name}</option>`,
                          )}
                        </select>
                      `
                    : html`
                        <input
                          type="text"
                          placeholder="e.g. living_room"
                          .value=${area.ha_area_id ?? ''}
                          @input=${(e: Event) =>
                            this.updateArea(idx, {
                              ha_area_id: (e.target as HTMLInputElement).value || undefined,
                            })}
                        />
                      `}
                </label>
              </div>

              <div class="row">
                <label class="field">
                  Mesh Names (comma-separated)
                  <input
                    type="text"
                    placeholder="e.g. area_living, Body17"
                    .value=${(area.mesh_names ?? []).join(', ')}
                    @input=${(e: Event) => {
                      const vals = (e.target as HTMLInputElement).value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean);
                      this.updateArea(idx, { mesh_names: vals.length ? vals : undefined });
                    }}
                  />
                </label>
                <label class="field">
                  Footprint Bounds [minX, minZ, maxX, maxZ]
                  <input
                    type="text"
                    placeholder="e.g. 0.50, 0.45, 0.80, 0.96"
                    .value=${area.bounds ? area.bounds.join(', ') : ''}
                    @change=${(e: Event) => {
                      const nums = (e.target as HTMLInputElement).value
                        .split(',')
                        .map((s) => Number(s.trim()))
                        .filter((n) => !Number.isNaN(n));
                      this.updateArea(idx, {
                        bounds:
                          nums.length === 4
                            ? (nums as [number, number, number, number])
                            : undefined,
                      });
                    }}
                  />
                </label>
              </div>

              ${this._discoveredMeshes.length > 0
                ? html`
                    <div class="mesh-chips">
                      ${this._discoveredMeshes.map((meshName) => {
                        const selected = area.mesh_names?.includes(meshName);
                        return html`
                          <button
                            type="button"
                            class="chip ${selected ? 'selected' : ''}"
                            @click=${() => this.toggleAreaMesh(idx, meshName)}
                          >
                            ${meshName}
                          </button>
                        `;
                      })}
                    </div>
                  `
                : nothing}
            </div>
          `,
        )}
      </div>
    `;
  }
}
