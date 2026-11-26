import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  autoDiscoverAreasFromMeshes,
  CANONICAL_HORIZONTAL_SPAN,
  computeFocusCameraPose,
  normalizedFootprintToBox3,
  normalizeModelRoot,
  parseGlbMetadata,
  shouldConvertZUpToYUp,
  worldPointToNormalizedXZ,
} from './model-utils';

describe('model-utils', () => {
  it('detects unrotated Z-up models vs already Y-up SolidCraft models', () => {
    const zUpSize = new THREE.Vector3(240, 140, 23);
    expect(shouldConvertZUpToYUp(zUpSize, 'auto')).toBe(true);
    expect(shouldConvertZUpToYUp(zUpSize, 'y')).toBe(false);
    expect(shouldConvertZUpToYUp(new THREE.Vector3(10, 10, 10), 'z')).toBe(true);

    const alreadyYUpSize = new THREE.Vector3(0.241, 0.026, 0.141);
    expect(shouldConvertZUpToYUp(alreadyYUpSize, 'auto')).toBe(false);
  });

  it('normalizes Z-up CAD mesh to rest at Y=0 centered at XZ=(0,0)', () => {
    const root = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 20));
    box.position.set(50, 30, 10);
    root.scale.setScalar(0.001);
    root.add(box);

    const metrics = normalizeModelRoot(root, 'auto');

    expect(metrics.appliedZUpRotation).toBe(true);
    expect(metrics.bounds.min.y).toBeCloseTo(0, 4);
    expect(metrics.center.x).toBeCloseTo(0, 4);
    expect(metrics.center.z).toBeCloseTo(0, 4);
    expect(Math.max(metrics.size.x, metrics.size.z)).toBeCloseTo(CANONICAL_HORIZONTAL_SPAN, 4);
  });

  it('converts normalized bounds to world Box3 and back to normalized XZ', () => {
    const modelBounds = new THREE.Box3(
      new THREE.Vector3(-6, 0, -3),
      new THREE.Vector3(6, 2, 3),
    );
    const zoneBox = normalizedFootprintToBox3(modelBounds, [0.25, 0.5, 0.75, 1.0]);

    expect(zoneBox.min.x).toBeCloseTo(-3);
    expect(zoneBox.max.x).toBeCloseTo(3);
    expect(zoneBox.min.z).toBeCloseTo(0);
    expect(zoneBox.max.z).toBeCloseTo(3);

    const center = zoneBox.getCenter(new THREE.Vector3());
    const norm = worldPointToNormalizedXZ(modelBounds, center);
    expect(norm.normX).toBeCloseTo(0.5);
    expect(norm.normZ).toBeCloseTo(0.75);
  });

  it('computes focus camera pose outside the target box', () => {
    const box = new THREE.Box3(new THREE.Vector3(-1, 0, -1), new THREE.Vector3(1, 2, 1));
    const pose = computeFocusCameraPose(box, 42, 1.5);
    expect(pose.target.y).toBeCloseTo(1);
    expect(pose.position.distanceTo(pose.target)).toBeGreaterThan(2);
  });

  it('parses GLB metadata header without WebGL', () => {
    const json = JSON.stringify({
      asset: { generator: 'TestExporter', version: '2.0' },
      nodes: [{ name: 'area_kitchen' }, { name: 'Wall' }],
      meshes: [{ name: 'area_kitchen' }],
    });
    const jsonBytes = new TextEncoder().encode(json);
    const paddedLen = Math.ceil(jsonBytes.length / 4) * 4;
    const buf = new ArrayBuffer(20 + paddedLen);
    const view = new DataView(buf);
    view.setUint32(0, 0x46546c67, true);
    view.setUint32(4, 2, true);
    view.setUint32(8, buf.byteLength, true);
    view.setUint32(12, paddedLen, true);
    view.setUint32(16, 0x4e4f534a, true);
    const out = new Uint8Array(buf, 20, paddedLen);
    out.fill(0x20);
    out.set(jsonBytes);

    const meta = parseGlbMetadata(buf);
    expect(meta.generator).toBe('TestExporter');
    expect(meta.nodeNames).toEqual(['area_kitchen', 'Wall']);
    expect(meta.meshNames).toEqual(['area_kitchen']);
  });

  it('auto-discovers area_* and zone_* meshes and matches HA areas', () => {
    const areas = autoDiscoverAreasFromMeshes(
      ['Body1', 'area_living_room', 'zone_patio'],
      {
        living_room: { area_id: 'living_room', name: 'Main Living Room' },
      },
      [],
    );

    expect(areas).toHaveLength(2);
    expect(areas[0]).toMatchObject({
      id: 'living_room',
      name: 'Main Living Room',
      ha_area_id: 'living_room',
      mesh_names: ['area_living_room'],
    });
    expect(areas[1]).toMatchObject({
      id: 'patio',
      name: 'Patio',
      ha_area_id: 'patio',
      mesh_names: ['zone_patio'],
    });
  });
});
