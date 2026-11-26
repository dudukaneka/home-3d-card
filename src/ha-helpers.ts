import type { AreaConfig, HassEntity, HomeAssistant } from './types';

const SENSOR_DOMAINS = new Set(['sensor', 'binary_sensor']);
const APPLIANCE_DOMAINS = new Set([
  'light',
  'switch',
  'climate',
  'fan',
  'cover',
  'media_player',
  'lock',
  'vacuum',
  'humidifier',
  'water_heater',
]);

export function getEntityDomain(entityId: string): string {
  const dotIdx = entityId.indexOf('.');
  return dotIdx > 0 ? entityId.slice(0, dotIdx) : '';
}

export function isSensorDomain(entityId: string): boolean {
  return SENSOR_DOMAINS.has(getEntityDomain(entityId));
}

export function isApplianceDomain(entityId: string): boolean {
  return APPLIANCE_DOMAINS.has(getEntityDomain(entityId));
}

export interface ResolvedAreaEntities {
  sensors: HassEntity[];
  appliances: HassEntity[];
  activeApplianceCount: number;
  primaryTemperature: string | null;
}

/**
 * Resolves sensors and appliances for an AreaConfig using explicit entity lists
 * plus optional Home Assistant area_id auto-discovery.
 */
export function resolveAreaEntities(
  hass: HomeAssistant | undefined,
  area: AreaConfig,
): ResolvedAreaEntities {
  if (!hass?.states) {
    return {
      sensors: [],
      appliances: [],
      activeApplianceCount: 0,
      primaryTemperature: null,
    };
  }

  const sensorIds = new Set<string>(area.sensors ?? []);
  const applianceIds = new Set<string>(area.appliances ?? []);

  if (area.ha_area_id && hass.entities) {
    for (const entry of Object.values(hass.entities)) {
      if (entry.disabled_by || entry.hidden_by) continue;
      const deviceAreaId =
        entry.device_id && hass.devices ? hass.devices[entry.device_id]?.area_id : null;
      const effectiveAreaId = entry.area_id ?? deviceAreaId;
      if (effectiveAreaId !== area.ha_area_id) continue;

      if (isSensorDomain(entry.entity_id)) {
        sensorIds.add(entry.entity_id);
      } else if (isApplianceDomain(entry.entity_id)) {
        applianceIds.add(entry.entity_id);
      }
    }
  }

  const sensors = [...sensorIds]
    .map((id) => hass.states[id])
    .filter((e): e is HassEntity => Boolean(e));

  const appliances = [...applianceIds]
    .map((id) => hass.states[id])
    .filter((e): e is HassEntity => Boolean(e));

  const activeApplianceCount = appliances.filter((entity) => isEntityActive(entity)).length;

  const tempSensor = sensors.find(
    (s) =>
      s.attributes.device_class === 'temperature' ||
      s.attributes.unit_of_measurement === '°C' ||
      s.attributes.unit_of_measurement === '°F',
  );
  const primaryTemperature =
    tempSensor && tempSensor.state !== 'unavailable' && tempSensor.state !== 'unknown'
      ? `${tempSensor.state}${tempSensor.attributes.unit_of_measurement ?? ''}`
      : null;

  return {
    sensors,
    appliances,
    activeApplianceCount,
    primaryTemperature,
  };
}

export function isEntityActive(entity: HassEntity): boolean {
  const s = entity.state.toLowerCase();
  const domain = getEntityDomain(entity.entity_id);
  if (domain === 'climate') {
    return s !== 'off' && s !== 'unavailable' && s !== 'unknown';
  }
  if (domain === 'cover') {
    return s === 'open' || s === 'opening';
  }
  if (domain === 'lock') {
    return s === 'unlocked';
  }
  return s === 'on' || s === 'playing' || s === 'cleaning' || s === 'home' || s === 'open';
}

export function formatEntityState(entity: HassEntity): string {
  const domain = getEntityDomain(entity.entity_id);
  if (domain === 'climate') {
    const target = entity.attributes.temperature;
    const current = entity.attributes.current_temperature;
    if (target !== undefined) {
      return `${entity.state} · ${target}°${current !== undefined ? ` (${current}°)` : ''}`;
    }
  }
  const rawState = /^-?\d+\.\d{4,}$/.test(entity.state.trim())
    ? Number(entity.state).toFixed(2)
    : entity.state;
  const unit = entity.attributes.unit_of_measurement;
  return unit ? `${rawState} ${unit}` : rawState;
}

export async function toggleAppliance(
  hass: HomeAssistant | undefined,
  entity: HassEntity,
): Promise<void> {
  if (!hass) return;
  const domain = getEntityDomain(entity.entity_id);
  const data = { entity_id: entity.entity_id };

  switch (domain) {
    case 'light':
    case 'switch':
    case 'fan':
    case 'humidifier':
      await hass.callService(domain, 'toggle', data);
      return;
    case 'cover':
      await hass.callService('cover', 'toggle', data);
      return;
    case 'lock':
      await hass.callService('lock', entity.state === 'locked' ? 'unlock' : 'lock', data);
      return;
    case 'media_player':
      await hass.callService('media_player', 'media_play_pause', data);
      return;
    case 'climate': {
      const nextMode = entity.state === 'off' ? 'heat_cool' : 'off';
      const supported = entity.attributes.hvac_modes;
      const mode =
        nextMode === 'off'
          ? 'off'
          : supported?.find((m) => m !== 'off') ?? 'auto';
      await hass.callService('climate', 'set_hvac_mode', { ...data, hvac_mode: mode });
      return;
    }
    default:
      await hass.callService('homeassistant', 'toggle', data);
  }
}

export function openMoreInfo(host: HTMLElement, entityId: string): void {
  host.dispatchEvent(
    new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }),
  );
}
