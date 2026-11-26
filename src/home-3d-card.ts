import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resolveAreaEntities } from './ha-helpers';
import { isIdbModelUrl, saveUploadedModel } from './model-storage';
import { autoDiscoverAreasFromMeshes } from './model-utils';
import { SceneManager } from './scene-manager';
import './area-hud';
import './home-3d-editor';
import type {
  AreaConfig,
  DebugPickInfo,
  Home3DCardConfig,
  HomeAssistant,
  PanelMode,
  ProjectedAreaLabel,
} from './types';

@customElement('home-3d-card')
export class Home3DCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: Home3DCardConfig;
  @state() private _selectedAreaId: string | null = null;
  @state() private _hoveredAreaId: string | null = null;
  @state() private _panelModeOverride: PanelMode | null = null;
  @state() private _labels: ProjectedAreaLabel[] = [];
  @state() private _loading = false;
  @state() private _error: string | null = null;
  @state() private _debugPick: DebugPickInfo | null = null;
  @state() private _discoveredMeshes: string[] = [];
  @state() private _localUploadedUrl: string | null = null;
  @state() private _localFileName: string | null = null;
  @state() private _dragActive = false;

  private sceneManager?: SceneManager;
  private loadedModelUrl: string | null = null;

  public static getConfigElement(): HTMLElement {
    return document.createElement('home-3d-card-editor');
  }

  public static getStubConfig(): Home3DCardConfig {
    return {
      type: 'custom:home-3d-card',
      title: 'My 3D Home',
      model_url: '',
      panel_mode: 'slide-over',
      up_axis: 'auto',
      card_height: 560,
      dim_unselected: true,
      show_labels: true,
      show_zone_overlay: true,
      auto_map_area_meshes: true,
      debug_picker: false,
      areas: [],
    };
  }

  public setConfig(config: Home3DCardConfig): void {
    this._config = {
      title: 'My 3D Home',
      model_url: '',
      panel_mode: 'slide-over',
      up_axis: 'auto',
      card_height: 560,
      dim_unselected: true,
      show_labels: true,
      show_zone_overlay: true,
      auto_map_area_meshes: true,
      debug_picker: false,
      areas: [],
      ...config,
    };
    this._panelModeOverride = null;

    if (this._config.model_url && this._localUploadedUrl) {
      this._localUploadedUrl = null;
      this._localFileName = null;
    }

    if (this.sceneManager) {
      this.sceneManager.updateOptions({
        upAxis: this._config.up_axis ?? 'auto',
        dimUnselected: this._config.dim_unselected !== false,
        showZoneOverlay: this._config.show_zone_overlay !== false,
        debugPicker: Boolean(this._config.debug_picker),
        darkMode: Boolean(this.hass?.themes?.darkMode ?? true),
      });

      const activeUrl = this.getActiveModelUrl();
      if (activeUrl && this.loadedModelUrl !== activeUrl) {
        this.loadCurrentModel();
      } else if (!activeUrl) {
        this.loadedModelUrl = null;
        this._discoveredMeshes = [];
        this._labels = [];
        this._selectedAreaId = null;
        this._loading = false;
        this.sceneManager.clearModel();
      } else {
        this.sceneManager.setAreas(this.getEffectiveAreas());
      }
    }
  }

  public getCardSize(): number {
    return Math.ceil((this._config?.card_height ?? 560) / 50);
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card,
    .card-shell {
      position: relative;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 14px);
      background: var(--ha-card-background, #0f172a);
      color: var(--primary-text-color, #f8fafc);
      box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.22));
      font-family: var(--paper-font-body1_-_font-family, system-ui, -apple-system, sans-serif);
    }

    .viewport-wrap {
      position: relative;
      width: 100%;
    }

    .canvas-host {
      width: 100%;
      height: 100%;
    }

    .topbar {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      pointer-events: none;
      z-index: 10;
    }

    .brand-pill,
    .toolbar {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.72);
      color: #f8fafc;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(148, 163, 184, 0.22);
      font-size: 0.85rem;
      font-weight: 600;
    }

    .toolbar button {
      appearance: none;
      border: none;
      background: rgba(148, 163, 184, 0.16);
      color: #f8fafc;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: rgba(148, 163, 184, 0.3);
    }

    .labels-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 8;
    }

    .area-badge {
      pointer-events: auto;
      position: absolute;
      transform: translate(-50%, -100%);
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(15, 23, 42, 0.84);
      color: #f8fafc;
      font-size: 0.72rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      backdrop-filter: blur(8px);
      transition: transform 0.12s ease, border-color 0.12s ease;
      z-index: 1;
    }

    .area-badge:hover,
    .area-badge.hovered {
      transform: translate(-50%, -108%) scale(1.04);
      border-color: rgba(255, 255, 255, 0.55);
      z-index: 3;
    }

    .area-badge.selected {
      background: #0284c7;
      border-color: #7dd3fc;
      z-index: 4;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
    }

    .badge-meta {
      opacity: 0.8;
      font-weight: 500;
    }

    .status-banner,
    .onboarding {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 24px;
      border-radius: 14px;
      background: rgba(15, 23, 42, 0.92);
      color: #f8fafc;
      border: 1px solid rgba(148, 163, 184, 0.28);
      font-size: 0.9rem;
      z-index: 15;
      max-width: min(460px, calc(100% - 32px));
      text-align: center;
      backdrop-filter: blur(12px);
    }

    .onboarding.drag-active {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
    }

    .onboarding h4 {
      margin: 0 0 8px 0;
      font-size: 1.05rem;
    }

    .onboarding p {
      margin: 0 0 12px 0;
      font-size: 0.84rem;
      line-height: 1.45;
      opacity: 0.86;
    }

    .onboarding code {
      background: rgba(148, 163, 184, 0.16);
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.8rem;
    }

    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 15px;
      border-radius: 10px;
      background: #0284c7;
      color: #f8fafc;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
    }

    .upload-btn:hover {
      background: #0369a1;
    }

    .upload-btn input {
      display: none;
    }

    .status-banner.error {
      border-color: #fb7185;
      color: #fecdd3;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }

    .debug-bar {
      position: absolute;
      left: 12px;
      bottom: 12px;
      padding: 6px 10px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.84);
      color: #bae6fd;
      border: 1px solid rgba(56, 189, 248, 0.35);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.74rem;
      z-index: 12;
    }
  `;

  private getActiveModelUrl(): string {
    return this._config?.model_url?.trim() || this._localUploadedUrl || '';
  }

  private getEffectiveAreas(): AreaConfig[] {
    const explicit = this._config?.areas ?? [];
    if (this._config?.auto_map_area_meshes === false) {
      return explicit;
    }
    const autoAreas = autoDiscoverAreasFromMeshes(
      this._discoveredMeshes,
      this.hass?.areas,
      explicit,
    );
    return [...explicit, ...autoAreas];
  }

  protected firstUpdated(): void {
    const host = this.renderRoot.querySelector('.canvas-host') as HTMLElement | null;
    if (!host || !this._config) return;

    this.sceneManager = new SceneManager({
      container: host,
      upAxis: this._config.up_axis ?? 'auto',
      dimUnselected: this._config.dim_unselected !== false,
      showZoneOverlay: this._config.show_zone_overlay !== false,
      debugPicker: Boolean(this._config.debug_picker),
      darkMode: Boolean(this.hass?.themes?.darkMode ?? true),
      onAreaSelect: (areaId) => {
        this._selectedAreaId = areaId;
      },
      onAreaHover: (areaId) => {
        this._hoveredAreaId = areaId;
      },
      onLabelsUpdate: (labels) => {
        this._labels = labels;
      },
      onDebugPick: (info) => {
        this._debugPick = info;
      },
      onLoadComplete: (meshNames) => {
        this._discoveredMeshes = meshNames;
        this.sceneManager?.setAreas(this.getEffectiveAreas());
        this._loading = false;
        this._error = null;
      },
      onLoadError: (msg) => {
        this._loading = false;
        this._error = `Failed to load 3D model (${msg})`;
      },
    });

    if (this.getActiveModelUrl()) {
      this.loadCurrentModel();
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('hass') && this.sceneManager && this.hass?.themes) {
      this.sceneManager.applyTheme(Boolean(this.hass.themes.darkMode));
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sceneManager?.dispose();
    this.sceneManager = undefined;
  }

  private async loadCurrentModel(): Promise<void> {
    const url = this.getActiveModelUrl();
    if (!this.sceneManager || !this._config || !url) return;
    this._loading = true;
    this._error = null;
    this.loadedModelUrl = url;
    await this.sceneManager.loadModel(url, this.getEffectiveAreas());
  }

  private async handleUploadFile(file: File): Promise<void> {
    try {
      this._loading = true;
      this._error = null;
      const buffer = await file.arrayBuffer();
      const { url } = await saveUploadedModel(file.name, buffer);
      this._localUploadedUrl = url;
      this._localFileName = file.name;
      this._selectedAreaId = null;

      if (this._config) {
        this._config = { ...this._config, model_url: url };
      }
      await this.loadCurrentModel();
    } catch (err) {
      this._loading = false;
      this._error = `Upload failed (${err instanceof Error ? err.message : String(err)})`;
    }
  }

  private handleLocalFileSelect = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      void this.handleUploadFile(file);
    }
  };

  private handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    this._dragActive = false;
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      void this.handleUploadFile(file);
    }
  };

  private selectArea(areaId: string): void {
    this._selectedAreaId = areaId;
    this.sceneManager?.focusArea(areaId);
  }

  private clearSelection = (): void => {
    this._selectedAreaId = null;
    this.sceneManager?.resetView();
  };

  private handleModeChange = (e: CustomEvent<{ mode: PanelMode }>): void => {
    this._panelModeOverride = e.detail.mode;
  };

  private getSelectedArea(): AreaConfig | undefined {
    return this.getEffectiveAreas().find((a) => a.id === this._selectedAreaId);
  }

  protected render() {
    if (!this._config) return nothing;

    const height = this._config.card_height ?? 560;
    const activeUrl = this.getActiveModelUrl();
    const effectiveAreas = this.getEffectiveAreas();
    const selectedArea = this.getSelectedArea();
    const effectiveMode: PanelMode =
      this._panelModeOverride ?? this._config.panel_mode ?? 'slide-over';

    return html`
      <div class="card-shell">
        <div class="viewport-wrap" style="height: ${height}px">
          <div class="canvas-host"></div>

          <div class="topbar">
            <div class="brand-pill">
              <span>${this._config.title ?? 'My 3D Home'}</span>
              ${this._localFileName ? html`<small>(Uploaded: ${this._localFileName})</small>` : nothing}
            </div>
            ${this._selectedAreaId || activeUrl
              ? html`
                  <div class="toolbar">
                    ${this._selectedAreaId
                      ? html`<button @click=${this.clearSelection}>↺ Home Overview</button>`
                      : html`<span>${effectiveAreas.length > 0 ? 'Click an area to inspect' : 'No areas mapped yet'}</span>`}
                  </div>
                `
              : nothing}
          </div>

          ${this._config.show_labels !== false
            ? html`
                <div class="labels-layer">
                  ${this._labels
                    .filter((l) => l.visible)
                    .map((label) => {
                      const areaCfg = effectiveAreas.find((a) => a.id === label.id);
                      const summary = areaCfg ? resolveAreaEntities(this.hass, areaCfg) : null;
                      const metaParts: string[] = [];
                      if (summary?.primaryTemperature) metaParts.push(summary.primaryTemperature);
                      if (summary && summary.activeApplianceCount > 0) {
                        metaParts.push(`${summary.activeApplianceCount} on`);
                      }

                      return html`
                        <button
                          class="area-badge ${label.selected ? 'selected' : ''} ${this
                            ._hoveredAreaId === label.id
                            ? 'hovered'
                            : ''}"
                          style="left: ${label.x.toFixed(1)}px; top: ${label.y.toFixed(1)}px"
                          @click=${() => this.selectArea(label.id)}
                        >
                          <span class="badge-dot" style="background: ${label.color}"></span>
                          <span>${label.name}</span>
                          ${metaParts.length > 0
                            ? html`<span class="badge-meta">· ${metaParts.join(' · ')}</span>`
                            : nothing}
                        </button>
                      `;
                    })}
                </div>
              `
            : nothing}

          ${!activeUrl
            ? html`
                <div
                  class="onboarding ${this._dragActive ? 'drag-active' : ''}"
                  @dragover=${(e: DragEvent) => {
                    e.preventDefault();
                    this._dragActive = true;
                  }}
                  @dragleave=${() => {
                    this._dragActive = false;
                  }}
                  @drop=${this.handleDrop}
                >
                  <h4>Upload or Select Your 3D Home (.glb)</h4>
                  <p>
                    Drag &amp; drop a <code>.glb</code> file here or click below to upload and save
                    it in this browser, or enter a <code>/local/...</code> path in Edit Card for
                    multi-device access.
                  </p>
                  <label class="upload-btn">
                    Upload .glb File
                    <input type="file" accept=".glb" @change=${this.handleLocalFileSelect} />
                  </label>
                </div>
              `
            : nothing}

          ${this._loading
            ? html`<div class="status-banner">Loading 3D home model…</div>`
            : nothing}
          ${this._error
            ? html`
                <div class="status-banner error">
                  <div>${this._error}</div>
                  ${isIdbModelUrl(activeUrl)
                    ? html`
                        <label class="upload-btn">
                          Upload .glb File Here
                          <input type="file" accept=".glb" @change=${this.handleLocalFileSelect} />
                        </label>
                      `
                    : nothing}
                </div>
              `
            : nothing}
          ${this._config.debug_picker && this._debugPick
            ? html`
                <div class="debug-bar">
                  normX=${this._debugPick.normX}, normZ=${this._debugPick.normZ}
                  ${this._debugPick.meshName ? ` · mesh=${this._debugPick.meshName}` : ''}
                </div>
              `
            : nothing}

          <home-3d-area-hud
            .hass=${this.hass}
            .area=${selectedArea}
            .mode=${effectiveMode}
            @close-area=${this.clearSelection}
            @change-panel-mode=${this.handleModeChange}
          ></home-3d-area-hud>
        </div>
      </div>
    `;
  }
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-3d-card',
  name: 'Home 3D Dashboard Card',
  description:
    'Interactive 3D floorplan dashboard with click-to-maximize area sensors and appliances.',
  preview: true,
});
