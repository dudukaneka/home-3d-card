import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  formatEntityState,
  isEntityActive,
  openMoreInfo,
  resolveAreaEntities,
  toggleAppliance,
} from './ha-helpers';
import type { AreaConfig, HassEntity, HomeAssistant, PanelMode } from './types';

@customElement('home-3d-area-hud')
export class Home3DAreaHud extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public area?: AreaConfig;
  @property({ type: String }) public mode: PanelMode = 'slide-over';

  static styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, system-ui, -apple-system, sans-serif);
    }

    .hud {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px;
      color: var(--primary-text-color, #e2e8f0);
      background: var(--ha-card-background, rgba(15, 23, 42, 0.92));
      backdrop-filter: blur(14px);
      overflow-y: auto;
    }

    .hud.slide-over {
      position: absolute;
      top: 12px;
      right: 12px;
      bottom: 12px;
      width: min(350px, calc(100% - 24px));
      border-radius: 14px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
      animation: slideIn 0.22s ease-out;
      z-index: 20;
    }

    .hud.fullscreen {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      z-index: 25;
      animation: fadeIn 0.18s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(18px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1 1 140px;
      min-width: 0;
    }

    .title-text {
      min-width: 0;
      flex: 1;
    }

    .accent-dot {
      width: 11px;
      height: 11px;
      border-radius: 999px;
      flex-shrink: 0;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtitle {
      font-size: 0.78rem;
      opacity: 0.72;
      margin-top: 2px;
    }

    .header-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    button.icon-btn {
      appearance: none;
      border: 1px solid rgba(148, 163, 184, 0.28);
      background: rgba(148, 163, 184, 0.12);
      color: inherit;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    button.icon-btn:hover {
      background: rgba(148, 163, 184, 0.22);
    }

    .section-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.68;
      margin: 0 0 8px 0;
    }

    .grid {
      display: grid;
      gap: 8px;
      grid-template-columns: 1fr;
    }

    .hud.fullscreen .grid {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }

    .sensor-card,
    .appliance-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.18);
      background: rgba(148, 163, 184, 0.08);
    }

    .appliance-card {
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .appliance-card:hover {
      background: rgba(148, 163, 184, 0.15);
    }

    .appliance-card.active {
      border-color: rgba(56, 189, 248, 0.55);
      background: rgba(56, 189, 248, 0.14);
    }

    .entity-meta {
      min-width: 0;
    }

    .entity-name {
      font-size: 0.86rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.7rem;
      opacity: 0.58;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-state {
      font-size: 0.85rem;
      font-weight: 700;
      text-align: right;
      white-space: nowrap;
    }

    .appliance-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pill-toggle {
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap;
      flex-shrink: 0;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: rgba(15, 23, 42, 0.35);
      color: inherit;
    }

    .appliance-card.active .pill-toggle {
      background: #38bdf8;
      color: #0f172a;
      border-color: transparent;
    }

    .more-btn {
      border: none;
      background: transparent;
      color: inherit;
      opacity: 0.65;
      cursor: pointer;
      padding: 4px;
      font-size: 0.9rem;
    }

    .more-btn:hover {
      opacity: 1;
    }

    .empty {
      font-size: 0.84rem;
      opacity: 0.7;
      padding: 12px;
      border-radius: 10px;
      border: 1px dashed rgba(148, 163, 184, 0.25);
    }

    @media (max-width: 600px) {
      .hud.slide-over {
        top: auto;
        left: 8px;
        right: 8px;
        bottom: 8px;
        width: auto;
        max-height: 55%;
      }
    }
  `;

  private emitClose(): void {
    this.dispatchEvent(new CustomEvent('close-area', { bubbles: true, composed: true }));
  }

  private emitToggleMode(): void {
    const next: PanelMode = this.mode === 'slide-over' ? 'fullscreen' : 'slide-over';
    this.dispatchEvent(
      new CustomEvent('change-panel-mode', {
        detail: { mode: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderSensor(entity: HassEntity) {
    const name = entity.attributes.friendly_name ?? entity.entity_id;
    return html`
      <div
        class="sensor-card"
        @click=${() => openMoreInfo(this, entity.entity_id)}
        title="Open Home Assistant details"
      >
        <div class="entity-meta">
          <div class="entity-name">${name}</div>
          <div class="entity-id">${entity.entity_id}</div>
        </div>
        <div class="entity-state">${formatEntityState(entity)}</div>
      </div>
    `;
  }

  private renderAppliance(entity: HassEntity) {
    const name = entity.attributes.friendly_name ?? entity.entity_id;
    const active = isEntityActive(entity);
    return html`
      <div
        class="appliance-card ${active ? 'active' : ''}"
        @click=${() => toggleAppliance(this.hass, entity)}
      >
        <div class="entity-meta">
          <div class="entity-name">${name}</div>
          <div class="entity-id">${entity.entity_id}</div>
        </div>
        <div class="appliance-controls">
          <span class="pill-toggle">${formatEntityState(entity)}</span>
          <button
            class="more-btn"
            title="More info"
            @click=${(e: Event) => {
              e.stopPropagation();
              openMoreInfo(this, entity.entity_id);
            }}
          >
            ⋯
          </button>
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this.area) return nothing;
    const resolved = resolveAreaEntities(this.hass, this.area);
    const accent = this.area.color ?? '#38bdf8';

    return html`
      <div class="hud ${this.mode}">
        <div class="header">
          <div class="title-group">
            <span class="accent-dot" style="background: ${accent}"></span>
            <div class="title-text">
              <h3 class="title">${this.area.name}</h3>
              <div class="subtitle">
                ${resolved.sensors.length} sensor(s) · ${resolved.activeApplianceCount}/${resolved.appliances.length} active
              </div>
            </div>
          </div>
          <div class="header-actions">
            <button
              class="icon-btn"
              @click=${this.emitToggleMode}
              title="Switch between slide-over and fullscreen"
            >
              ${this.mode === 'slide-over' ? '⛶ Expand' : '◨ Slide-over'}
            </button>
            <button class="icon-btn" @click=${this.emitClose}>✕ Overview</button>
          </div>
        </div>

        <div>
          <p class="section-label">Appliances & Controls</p>
          ${resolved.appliances.length > 0
            ? html`<div class="grid">${resolved.appliances.map((e) => this.renderAppliance(e))}</div>`
            : html`<div class="empty">
                No appliances mapped yet. Add <code>appliances</code> or set
                <code>ha_area_id</code> in card config.
              </div>`}
        </div>

        <div>
          <p class="section-label">Sensors</p>
          ${resolved.sensors.length > 0
            ? html`<div class="grid">${resolved.sensors.map((e) => this.renderSensor(e))}</div>`
            : html`<div class="empty">
                No sensors mapped yet. Add <code>sensors</code> or set
                <code>ha_area_id</code> in card config.
              </div>`}
        </div>
      </div>
    `;
  }
}
