export type PanelMode = 'slide-over' | 'fullscreen';
export type UpAxisMode = 'auto' | 'z' | 'y';

export interface HassEntityAttributes {
  friendly_name?: string;
  unit_of_measurement?: string;
  device_class?: string;
  icon?: string;
  brightness?: number;
  temperature?: number;
  current_temperature?: number;
  hvac_action?: string;
  hvac_modes?: string[];
  min_temp?: number;
  max_temp?: number;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed?: string;
  last_updated?: string;
}

export interface HassArea {
  area_id: string;
  name: string;
  icon?: string | null;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  area_id?: string | null;
  device_id?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
}

export interface HassDeviceRegistryEntry {
  id: string;
  area_id?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  areas?: Record<string, HassArea>;
  entities?: Record<string, HassEntityRegistryEntry>;
  devices?: Record<string, HassDeviceRegistryEntry>;
  themes?: {
    darkMode?: boolean;
  };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>;
}

export interface AreaConfig {
  /** Unique area identifier */
  id: string;
  /** Display name in HUD & floating 3D badge */
  name: string;
  /** Optional MDI icon, e.g. 'mdi:sofa' */
  icon?: string;
  /** Accent hex color for highlight & badge */
  color?: string;
  /** Optional Home Assistant area_id to auto-pull area entities */
  ha_area_id?: string;
  /** Optional glTF node/mesh names belonging to this area */
  mesh_names?: string[];
  /** Optional normalized footprint bounds [minX, minZ, maxX, maxZ] in 0..1 */
  bounds?: [number, number, number, number];
  /** Optional vertical bounds [minY, maxY] in normalized 0..1 height */
  height_bounds?: [number, number];
  /** Optional camera direction offset multiplier [dx, dy, dz] when focused */
  camera_offset?: [number, number, number];
  /** Explicit sensor entity IDs */
  sensors?: string[];
  /** Explicit appliance/control entity IDs */
  appliances?: string[];
}

export interface Home3DCardConfig {
  type: string;
  title?: string;
  model_url?: string;
  panel_mode?: PanelMode;
  up_axis?: UpAxisMode;
  card_height?: number;
  dim_unselected?: boolean;
  show_labels?: boolean;
  show_zone_overlay?: boolean;
  auto_map_area_meshes?: boolean;
  debug_picker?: boolean;
  areas?: AreaConfig[];
}

export interface ProjectedAreaLabel {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  visible: boolean;
  selected: boolean;
}

export interface DebugPickInfo {
  normX: number;
  normZ: number;
  meshName: string | null;
}
