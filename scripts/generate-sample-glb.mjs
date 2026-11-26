import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates a minimal valid glTF 2.0 binary (.glb) containing a generic 3-room sample floorplan
 * (`floor_slab`, `area_living_room`, `area_kitchen`, `area_bedroom`) for CI validation and dev preview.
 */
function buildBoxGeometry(minX, minY, minZ, maxX, maxY, maxZ) {
  const positions = new Float32Array([
    // Front (+Z)
    minX, minY, maxZ, maxX, minY, maxZ, maxX, maxY, maxZ, minX, maxY, maxZ,
    // Back (-Z)
    maxX, minY, minZ, minX, minY, minZ, minX, maxY, minZ, maxX, maxY, minZ,
    // Top (+Y)
    minX, maxY, maxZ, maxX, maxY, maxZ, maxX, maxY, minZ, minX, maxY, minZ,
    // Bottom (-Y)
    minX, minY, minZ, maxX, minY, minZ, maxX, minY, maxZ, minX, minY, maxZ,
    // Right (+X)
    maxX, minY, maxZ, maxX, minY, minZ, maxX, maxY, minZ, maxX, maxY, maxZ,
    // Left (-X)
    minX, minY, minZ, minX, minY, maxZ, minX, maxY, maxZ, minX, maxY, minZ,
  ]);

  const normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23,
  ]);

  return {
    positions,
    normals,
    indices,
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ],
  };
}

const parts = [
  { name: 'floor_slab', box: [-5, -0.2, -4, 5, 0, 4], color: [0.22, 0.27, 0.35, 1] },
  { name: 'area_living_room', box: [-4.8, 0, -3.8, 0.2, 2.2, 3.8], color: [0.65, 0.55, 0.98, 1] },
  { name: 'area_kitchen', box: [0.4, 0, -3.8, 4.8, 2.2, 0.0], color: [0.22, 0.74, 0.97, 1] },
  { name: 'area_bedroom', box: [0.4, 0, 0.2, 4.8, 2.2, 3.8], color: [0.98, 0.44, 0.52, 1] },
];

const chunks = [];
const bufferViews = [];
const accessors = [];
const meshes = [];
const nodes = [];
const materials = [];
let byteOffset = 0;

function appendTypedArray(arr) {
  const bytes = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
  const pad = (4 - (bytes.length % 4)) % 4;
  chunks.push(bytes);
  if (pad) chunks.push(Buffer.alloc(pad));
  const start = byteOffset;
  byteOffset += bytes.length + pad;
  return { byteOffset: start, byteLength: bytes.length };
}

parts.forEach((part, idx) => {
  const geo = buildBoxGeometry(...part.box);

  const posView = appendTypedArray(geo.positions);
  const normView = appendTypedArray(geo.normals);
  const idxView = appendTypedArray(geo.indices);

  const posBvIdx = bufferViews.length;
  bufferViews.push({ buffer: 0, ...posView, target: 34962 });
  const normBvIdx = bufferViews.length;
  bufferViews.push({ buffer: 0, ...normView, target: 34962 });
  const idxBvIdx = bufferViews.length;
  bufferViews.push({ buffer: 0, ...idxView, target: 34963 });

  const posAccIdx = accessors.length;
  accessors.push({
    bufferView: posBvIdx,
    componentType: 5126,
    count: 24,
    type: 'VEC3',
    min: geo.min,
    max: geo.max,
  });
  const normAccIdx = accessors.length;
  accessors.push({
    bufferView: normBvIdx,
    componentType: 5126,
    count: 24,
    type: 'VEC3',
  });
  const idxAccIdx = accessors.length;
  accessors.push({
    bufferView: idxBvIdx,
    componentType: 5123,
    count: 36,
    type: 'SCALAR',
  });

  materials.push({
    name: `${part.name}_mat`,
    pbrMetallicRoughness: {
      baseColorFactor: part.color,
      metallicFactor: 0.05,
      roughnessFactor: 0.8,
    },
  });

  meshes.push({
    name: part.name,
    primitives: [
      {
        attributes: { POSITION: posAccIdx, NORMAL: normAccIdx },
        indices: idxAccIdx,
        material: idx,
      },
    ],
  });

  nodes.push({ name: part.name, mesh: idx });
});

const gltf = {
  asset: { version: '2.0', generator: 'home-3d-card sample generator' },
  scene: 0,
  scenes: [{ name: 'SampleHome', nodes: parts.map((_, i) => i) }],
  nodes,
  meshes,
  materials,
  accessors,
  bufferViews,
  buffers: [{ byteLength: byteOffset }],
};

const jsonRaw = Buffer.from(JSON.stringify(gltf), 'utf8');
const jsonPad = (4 - (jsonRaw.length % 4)) % 4;
const jsonBuf = Buffer.concat([jsonRaw, Buffer.alloc(jsonPad, 0x20)]);
const binBuf = Buffer.concat(chunks);

const totalLength = 12 + 8 + jsonBuf.length + 8 + binBuf.length;
const out = Buffer.alloc(totalLength);
let ptr = 0;

out.writeUInt32LE(0x46546c67, ptr); ptr += 4;
out.writeUInt32LE(2, ptr); ptr += 4;
out.writeUInt32LE(totalLength, ptr); ptr += 4;

out.writeUInt32LE(jsonBuf.length, ptr); ptr += 4;
out.writeUInt32LE(0x4e4f534a, ptr); ptr += 4;
jsonBuf.copy(out, ptr); ptr += jsonBuf.length;

out.writeUInt32LE(binBuf.length, ptr); ptr += 4;
out.writeUInt32LE(0x004e4942, ptr); ptr += 4;
binBuf.copy(out, ptr);

const target = path.resolve('examples/sample-home/sample-home.glb');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out);
console.log(`Generated ${target} (${(out.length / 1024).toFixed(1)} KB)`);
