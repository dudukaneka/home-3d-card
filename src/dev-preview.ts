import './home-3d-card';
import type { Home3DCard } from './home-3d-card';
import type { Home3DCardConfig, HomeAssistant, PanelMode } from './types';

function createMockHass(): HomeAssistant {
  const states: HomeAssistant['states'] = {
    'sensor.living_temperature': {
      entity_id: 'sensor.living_temperature',
      state: '22.8',
      attributes: { friendly_name: 'Living Temp', unit_of_measurement: '°C', device_class: 'temperature' },
    },
    'binary_sensor.living_presence': {
      entity_id: 'binary_sensor.living_presence',
      state: 'on',
      attributes: { friendly_name: 'Living Presence', device_class: 'occupancy' },
    },
    'light.living_main': {
      entity_id: 'light.living_main',
      state: 'on',
      attributes: { friendly_name: 'Living Main Lights' },
    },
    'climate.living_ac': {
      entity_id: 'climate.living_ac',
      state: 'cool',
      attributes: {
        friendly_name: 'Living Room AC',
        temperature: 22,
        current_temperature: 22.8,
        hvac_modes: ['off', 'cool', 'heat'],
      },
    },
    'media_player.living_tv': {
      entity_id: 'media_player.living_tv',
      state: 'off',
      attributes: { friendly_name: 'Living Room TV' },
    },
    'sensor.kitchen_temperature': {
      entity_id: 'sensor.kitchen_temperature',
      state: '23.4',
      attributes: { friendly_name: 'Kitchen Temp', unit_of_measurement: '°C', device_class: 'temperature' },
    },
    'sensor.kitchen_humidity': {
      entity_id: 'sensor.kitchen_humidity',
      state: '54',
      attributes: { friendly_name: 'Kitchen Humidity', unit_of_measurement: '%', device_class: 'humidity' },
    },
    'light.kitchen_spots': {
      entity_id: 'light.kitchen_spots',
      state: 'on',
      attributes: { friendly_name: 'Kitchen Spots' },
    },
    'switch.coffee_maker': {
      entity_id: 'switch.coffee_maker',
      state: 'off',
      attributes: { friendly_name: 'Coffee Maker' },
    },
    'sensor.bedroom_temperature': {
      entity_id: 'sensor.bedroom_temperature',
      state: '21.5',
      attributes: { friendly_name: 'Bedroom Temp', unit_of_measurement: '°C', device_class: 'temperature' },
    },
    'binary_sensor.bedroom_motion': {
      entity_id: 'binary_sensor.bedroom_motion',
      state: 'off',
      attributes: { friendly_name: 'Bedroom Motion', device_class: 'motion' },
    },
    'light.master_bedroom': {
      entity_id: 'light.master_bedroom',
      state: 'off',
      attributes: { friendly_name: 'Master Bedroom Light' },
    },
    'fan.master_ceiling': {
      entity_id: 'fan.master_ceiling',
      state: 'off',
      attributes: { friendly_name: 'Master Ceiling Fan' },
    },
  };

  const hass: HomeAssistant = {
    states,
    areas: {
      living_room: { area_id: 'living_room', name: 'Living Room' },
      kitchen: { area_id: 'kitchen', name: 'Kitchen' },
      bedroom: { area_id: 'bedroom', name: 'Bedroom' },
    },
    themes: { darkMode: true },
    async callService(domain, service, data) {
      const entityId = data?.entity_id as string | undefined;
      if (!entityId || !states[entityId]) return;
      const cur = states[entityId];
      let nextState = cur.state;

      if (service === 'toggle') {
        nextState = cur.state === 'on' || cur.state === 'open' ? 'off' : 'on';
      } else if (domain === 'climate' && service === 'set_hvac_mode') {
        nextState = String(data?.hvac_mode ?? 'off');
      } else if (domain === 'media_player' && service === 'media_play_pause') {
        nextState = cur.state === 'playing' ? 'paused' : 'playing';
      }

      states[entityId] = { ...cur, state: nextState };
      card.hass = { ...hass, states: { ...states } };
    },
  };

  return hass;
}

const exampleConfig: Home3DCardConfig = {
  type: 'custom:home-3d-card',
  title: 'Sample 3D Home',
  model_url: '/sample-home.glb',
  panel_mode: 'slide-over',
  up_axis: 'auto',
  card_height: 620,
  dim_unselected: true,
  show_labels: true,
  show_zone_overlay: true,
  auto_map_area_meshes: true,
  debug_picker: false,
  areas: [
    {
      id: 'living_room',
      name: 'Living Room',
      color: '#a78bfa',
      mesh_names: ['area_living_room'],
      sensors: ['sensor.living_temperature', 'binary_sensor.living_presence'],
      appliances: ['light.living_main', 'climate.living_ac', 'media_player.living_tv'],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      color: '#38bdf8',
      mesh_names: ['area_kitchen'],
      sensors: ['sensor.kitchen_temperature', 'sensor.kitchen_humidity'],
      appliances: ['light.kitchen_spots', 'switch.coffee_maker'],
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      color: '#fb7185',
      mesh_names: ['area_bedroom'],
      sensors: ['sensor.bedroom_temperature', 'binary_sensor.bedroom_motion'],
      appliances: ['light.master_bedroom', 'fan.master_ceiling'],
    },
  ],
};

let activeConfig: Home3DCardConfig = { ...exampleConfig };

const card = document.createElement('home-3d-card') as Home3DCard;
const hass = createMockHass();
card.hass = hass;
card.setConfig(activeConfig);

document.getElementById('mount')?.appendChild(card);

const modeSelect = document.getElementById('modeSelect') as HTMLSelectElement;
const debugCheck = document.getElementById('debugCheck') as HTMLInputElement;
const loadExampleBtn = document.getElementById('loadExampleBtn') as HTMLButtonElement;
const clearModelBtn = document.getElementById('clearModelBtn') as HTMLButtonElement;

const refreshConfig = () => {
  card.setConfig({
    ...activeConfig,
    panel_mode: modeSelect.value as PanelMode,
    debug_picker: debugCheck.checked,
  });
};

modeSelect.addEventListener('change', refreshConfig);
debugCheck.addEventListener('change', refreshConfig);
loadExampleBtn.addEventListener('click', () => {
  activeConfig = { ...exampleConfig };
  refreshConfig();
});
clearModelBtn.addEventListener('click', () => {
  activeConfig = {
    type: 'custom:home-3d-card',
    title: 'My 3D Home',
    model_url: '',
    card_height: 620,
    areas: [],
  };
  refreshConfig();
});
