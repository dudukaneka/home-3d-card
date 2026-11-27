import * as THREE from 'three';
import type { AreaConfig, HassArea, UpAxisMode } from './types';

export const CANONICAL_HORIZONTAL_SPAN = 12;
export const DEFAULT_LOCAL_MODEL_DIR = '/local/home-3d/';
export const DEFAULT_MODEL_URL = '/local/home-3d/home.glb';
const AREA_PALETTE = ['#38bdf8', '#34d399', '#fbbf24', '#a78bfa', '#fb7185', '#2dd4bf'];

/**
 * Resolves a user-entered model path or bare filename.
 * Bare filenames (e.g. `my-home.glb`) default to `/local/home-3d/<filename>`,
 * which maps to `/config/www/home-3d/<filename>` on Home Assistant.
 */
export function resolveModelUrl(input?: string): string {
  const trimmed = input?.trim() ?? '';
  if (!trimmed) return '';
  if (
    trimmed.startsWith('/') ||
    /^(https?:|blob:|data:|idb:)/i.test(trimmed)
  ) {
    return trimmed;
  }
  return `${DEFAULT_LOCAL_MODEL_DIR}${trimmed.replace(/^\.\//, '')}`;
}

export interface GlbMetadata {
  generator?: string;
  nodeNames: string[];
  meshNames: string[];
}

/**
 * Parses the JSON chunk of a binary glTF (.glb) buffer without instantiating WebGL.
 */
export function parseGlbMetadata(buffer: ArrayBuffer): GlbMetadata {
  if (buffer.byteLength < 20) {
    throw new Error('File is too small to be a valid .glb binary');
  }
  const view = new DataView(buffer);
  const magic = view.getUint32(0, true);
  if (magic !== 0x46546c67) {
    throw new Error('Invalid GLB file header');
  }
  const chunkLen = view.getUint32(12, true);
  const chunkType = view.getUint32(16, true);
  if (chunkType !== 0x4e4f534a || 20 + chunkLen > buffer.byteLength) {
    throw new Error('Missing or truncated glTF JSON chunk');
  }

  const jsonBytes = new Uint8Array(buffer, 20, chunkLen);
  const jsonText = new TextDecoder('utf-8').decode(jsonBytes);
  const gltf = JSON.parse(jsonText) as {
    asset?: { generator?: string };
    nodes?: Array<{ name?: string }>;
    meshes?: Array<{ name?: string }>;
  };

  const nodeNames = [...new Set((gltf.nodes ?? []).map((n) => n.name).filter((n): n is string => Boolean(n)))];
  const meshNames = [...new Set((gltf.meshes ?? []).map((m) => m.name).filter((n): n is string => Boolean(n)))];

  return {
    generator: gltf.asset?.generator,
    nodeNames,
    meshNames,
  };
}

function humanizeSlug(slug: string): string {
  return slug
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/**
 * Discovers areas automatically from glTF mesh/node names prefixed with `area_` or `zone_`,
 * matching them against Home Assistant areas when available.
 */
export function autoDiscoverAreasFromMeshes(
  meshNames: string[],
  hassAreas?: Record<string, HassArea>,
  existingAreas: AreaConfig[] = [],
): AreaConfig[] {
  const existingMeshSet = new Set(existingAreas.flatMap((a) => a.mesh_names ?? []));
  const existingIdSet = new Set(existingAreas.map((a) => a.id));
  const areaEntries = hassAreas ? Object.values(hassAreas) : [];
  const discovered: AreaConfig[] = [];

  for (const rawName of meshNames) {
    const match = /^(?:area|zone)[_-](.+)$/i.exec(rawName);
    if (!match) continue;
    if (existingMeshSet.has(rawName)) continue;

    const rawSlug = match[1];
    const normalizedId = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    if (!normalizedId || existingIdSet.has(normalizedId)) continue;

    const matchedHaArea = areaEntries.find(
      (a) =>
        a.area_id.toLowerCase() === normalizedId ||
        a.name.toLowerCase().replace(/[^a-z0-9]+/g, '_') === normalizedId,
    );

    existingIdSet.add(normalizedId);
    existingMeshSet.add(rawName);

    const colorIdx = existingAreas.length + discovered.length;
    discovered.push({
      id: normalizedId,
      name: matchedHaArea?.name ?? humanizeSlug(rawSlug),
      color: AREA_PALETTE[colorIdx % AREA_PALETTE.length],
      mesh_names: [rawName],
      ha_area_id: matchedHaArea?.area_id ?? normalizedId,
    });
  }

  return discovered;
}

export interface NormalizedModelMetrics {
  appliedZUpRotation: boolean;
  scaleFactor: number;
  bounds: THREE.Box3;
  size: THREE.Vector3;
  center: THREE.Vector3;
}

/**
 * Determines whether a loaded glTF scene should be rotated from Z-up to Y-up.
 * Note: SolidCraft 0.49+ already bakes a -90 deg X rotation onto the root node,
 * so post-transform world bounds are already Y-up unless raw Z is clearly the short vertical axis.
 */
export function shouldConvertZUpToYUp(
  rawSize: THREE.Vector3,
  mode: UpAxisMode = 'auto',
): boolean {
  if (mode === 'z') return true;
  if (mode === 'y') return false;
  // Heuristic for unrotated Z-up floorplans: vertical Z is shorter than both horizontal plan axes
  // while Y is not already the short vertical axis.
  return (
    rawSize.z > 0 &&
    rawSize.z < rawSize.x * 0.65 &&
    rawSize.z < rawSize.y * 0.65 &&
    rawSize.y >= rawSize.z
  );
}

/**
 * Normalizes an arbitrary CAD/3D scene so it rests on Y=0, centered at XZ=(0,0),
 * with its largest horizontal dimension scaled to CANONICAL_HORIZONTAL_SPAN.
 */
export function normalizeModelRoot(
  root: THREE.Object3D,
  upAxis: UpAxisMode = 'auto',
): NormalizedModelMetrics {
  root.updateMatrixWorld(true);
  const initialBox = new THREE.Box3().setFromObject(root);
  const initialSize = initialBox.getSize(new THREE.Vector3());

  const appliedZUpRotation = shouldConvertZUpToYUp(initialSize, upAxis);
  if (appliedZUpRotation) {
    root.rotation.x = -Math.PI / 2;
    root.updateMatrixWorld(true);
  }

  const rotatedBox = new THREE.Box3().setFromObject(root);
  const rotatedSize = rotatedBox.getSize(new THREE.Vector3());
  const horizontalSpan = Math.max(rotatedSize.x, rotatedSize.z, 0.0001);
  const scaleFactor = CANONICAL_HORIZONTAL_SPAN / horizontalSpan;

  root.scale.multiplyScalar(scaleFactor);
  root.updateMatrixWorld(true);

  const scaledBox = new THREE.Box3().setFromObject(root);
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

  root.position.x -= scaledCenter.x;
  root.position.z -= scaledCenter.z;
  root.position.y -= scaledBox.min.y;
  root.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(root);
  return {
    appliedZUpRotation,
    scaleFactor,
    bounds,
    size: bounds.getSize(new THREE.Vector3()),
    center: bounds.getCenter(new THREE.Vector3()),
  };
}

/**
 * Converts normalized 0..1 footprint bounds [minX, minZ, maxX, maxZ] into a world-space Box3
 * anchored to the normalized model's overall bounding box.
 */
export function normalizedFootprintToBox3(
  modelBounds: THREE.Box3,
  bounds: [number, number, number, number],
  heightBounds: [number, number] = [0, 1],
): THREE.Box3 {
  const [nMinX, nMinZ, nMaxX, nMaxZ] = bounds;
  const [nMinY, nMaxY] = heightBounds;
  const size = modelBounds.getSize(new THREE.Vector3());

  const minX = modelBounds.min.x + Math.min(nMinX, nMaxX) * size.x;
  const maxX = modelBounds.min.x + Math.max(nMinX, nMaxX) * size.x;
  const minZ = modelBounds.min.z + Math.min(nMinZ, nMaxZ) * size.z;
  const maxZ = modelBounds.min.z + Math.max(nMinZ, nMaxZ) * size.z;
  const minY = modelBounds.min.y + Math.min(nMinY, nMaxY) * size.y;
  const maxY = modelBounds.min.y + Math.max(nMinY, nMaxY) * size.y;

  return new THREE.Box3(
    new THREE.Vector3(minX, minY, minZ),
    new THREE.Vector3(maxX, maxY, maxZ),
  );
}

/**
 * Maps a world-space XZ point back into normalized 0..1 model footprint coordinates.
 */
export function worldPointToNormalizedXZ(
  modelBounds: THREE.Box3,
  point: THREE.Vector3,
): { normX: number; normZ: number } {
  const size = modelBounds.getSize(new THREE.Vector3());
  const normX = size.x > 0 ? (point.x - modelBounds.min.x) / size.x : 0.5;
  const normZ = size.z > 0 ? (point.z - modelBounds.min.z) / size.z : 0.5;
  return {
    normX: Number(Math.min(1, Math.max(0, normX)).toFixed(3)),
    normZ: Number(Math.min(1, Math.max(0, normZ)).toFixed(3)),
  };
}

/**
 * Computes ideal camera target and position to frame a bounding box.
 */
export function computeFocusCameraPose(
  targetBox: THREE.Box3,
  fovDeg: number,
  aspect: number,
  offsetDir: [number, number, number] = [0.65, 0.95, 0.85],
  padding = 1.35,
): { target: THREE.Vector3; position: THREE.Vector3 } {
  const target = targetBox.getCenter(new THREE.Vector3());
  const size = targetBox.getSize(new THREE.Vector3());
  const radius = Math.max(size.length() * 0.5, 0.6);

  const fovRad = THREE.MathUtils.degToRad(fovDeg);
  const fitHeightDist = radius / Math.sin(fovRad / 2);
  const fitWidthDist = fitHeightDist / Math.max(aspect, 0.5);
  const distance = Math.max(fitHeightDist, fitWidthDist) * padding;

  const dir = new THREE.Vector3(...offsetDir).normalize();
  const position = target.clone().addScaledVector(dir, distance);
  return { target, position };
}
