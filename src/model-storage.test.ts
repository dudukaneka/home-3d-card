import { describe, expect, it } from 'vitest';
import {
  deleteUploadedModel,
  getIdbModelName,
  isIdbModelUrl,
  listUploadedModels,
  loadUploadedModel,
  saveUploadedModel,
} from './model-storage';

function makeValidGlbBuffer(): ArrayBuffer {
  const json = JSON.stringify({
    asset: { generator: 'Vitest', version: '2.0' },
    nodes: [{ name: 'area_kitchen' }],
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
  return buf;
}

describe('model-storage', () => {
  it('detects and parses idb:// model URLs', () => {
    expect(isIdbModelUrl('idb://house.glb')).toBe(true);
    expect(isIdbModelUrl('/local/house.glb')).toBe(false);
    expect(getIdbModelName('idb://house.glb')).toBe('house.glb');
  });

  it('saves, lists, loads, and deletes valid GLB binaries', async () => {
    const buf = makeValidGlbBuffer();
    const { url, meta } = await saveUploadedModel('my-home.glb', buf);

    expect(url).toBe('idb://my-home.glb');
    expect(meta.meshNames).toEqual(['area_kitchen']);

    const list = await listUploadedModels();
    expect(list.some((item) => item.name === 'my-home.glb')).toBe(true);

    const loaded = await loadUploadedModel(url);
    expect(loaded?.byteLength).toBe(buf.byteLength);

    await deleteUploadedModel('my-home.glb');
    const afterDelete = await loadUploadedModel(url);
    expect(afterDelete).toBeNull();
  });

  it('rejects non-GLB payloads before saving', async () => {
    const invalid = new TextEncoder().encode('not a glb').buffer;
    await expect(saveUploadedModel('bad.glb', invalid)).rejects.toThrow();
  });
});
