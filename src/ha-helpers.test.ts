import { describe, expect, it, vi } from 'vitest';
import { formatEntityState, resolveAreaEntities, toggleAppliance } from './ha-helpers';
import type { AreaConfig, HomeAssistant } from './types';

function makeMockHass(): HomeAssistant {
  return {
    states: {
      'sensor.living_temp': {
        entity_id: 'sensor.living_temp',
        state: '22.5',
        attributes: {
          friendly_name: 'Living Temp',
          unit_of_measurement: '°C',
          device_class: 'temperature',
        },
      },
      'light.living_lamp': {
        entity_id: 'light.living_lamp',
        state: 'on',
        attributes: { friendly_name: 'Living Lamp' },
      },
      'climate.living_ac': {
        entity_id: 'climate.living_ac',
        state: 'cool',
        attributes: {
          friendly_name: 'Living AC',
          temperature: 21,
          current_temperature: 22.5,
          hvac_modes: ['off', 'cool'],
        },
      },
      'switch.hidden_plug': {
        entity_id: 'switch.hidden_plug',
        state: 'off',
        attributes: { friendly_name: 'Hidden Plug' },
      },
    },
    entities: {
      'sensor.living_temp': { entity_id: 'sensor.living_temp', area_id: 'living' },
      'light.living_lamp': { entity_id: 'light.living_lamp', device_id: 'dev_1' },
      'switch.hidden_plug': {
        entity_id: 'switch.hidden_plug',
        area_id: 'living',
        hidden_by: 'user',
      },
    },
    devices: {
      dev_1: { id: 'dev_1', area_id: 'living' },
    },
    callService: vi.fn().mockResolvedValue(undefined),
  };
}

describe('ha-helpers', () => {
  it('resolves explicit and area-discovered entities while skipping hidden entries', () => {
    const hass = makeMockHass();
    const area: AreaConfig = {
      id: 'living_area',
      name: 'Living Area',
      ha_area_id: 'living',
      appliances: ['climate.living_ac'],
    };

    const resolved = resolveAreaEntities(hass, area);

    expect(resolved.sensors.map((s) => s.entity_id)).toEqual(['sensor.living_temp']);
    expect(resolved.appliances.map((a) => a.entity_id)).toEqual([
      'climate.living_ac',
      'light.living_lamp',
    ]);
    expect(resolved.activeApplianceCount).toBe(2);
    expect(resolved.primaryTemperature).toBe('22.5°C');
  });

  it('formats climate and sensor states clearly', () => {
    const hass = makeMockHass();
    expect(formatEntityState(hass.states['sensor.living_temp'])).toBe('22.5 °C');
    expect(formatEntityState(hass.states['climate.living_ac'])).toBe('cool · 21° (22.5°)');
  });

  it('calls appropriate Home Assistant services when toggling appliances', async () => {
    const hass = makeMockHass();
    await toggleAppliance(hass, hass.states['light.living_lamp']);
    expect(hass.callService).toHaveBeenCalledWith('light', 'toggle', {
      entity_id: 'light.living_lamp',
    });

    await toggleAppliance(hass, hass.states['climate.living_ac']);
    expect(hass.callService).toHaveBeenCalledWith('climate', 'set_hvac_mode', {
      entity_id: 'climate.living_ac',
      hvac_mode: 'off',
    });
  });
});
