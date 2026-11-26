import fs from 'node:fs';
import path from 'node:path';

const [, , glbArg = 'examples/sample-home/sample-home.glb', configArg = 'examples/sample-home/areas.json'] =
  process.argv;

const glbPath = path.resolve(glbArg);
const configPath = path.resolve(configArg);

if (!fs.existsSync(glbPath)) {
  console.error(`GLB file not found: ${glbPath}`);
  process.exit(1);
}

const buf = fs.readFileSync(glbPath);
const magic = buf.readUInt32LE(0);
if (magic !== 0x46546c67) {
  console.error(`Invalid GLB header magic: 0x${magic.toString(16)}`);
  process.exit(1);
}

const chunkLen = buf.readUInt32LE(12);
const jsonText = buf.subarray(20, 20 + chunkLen).toString('utf8');
const gltf = JSON.parse(jsonText);

const nodeNames = new Set((gltf.nodes ?? []).map((n) => n.name).filter(Boolean));
const meshNames = new Set((gltf.meshes ?? []).map((m) => m.name).filter(Boolean));

console.log(`GLB verified: ${path.basename(glbPath)} (${(buf.length / 1024).toFixed(1)} KB)`);
console.log(`Generator: ${gltf.asset?.generator ?? 'unknown'}`);
console.log(`Nodes (${nodeNames.size}): ${[...nodeNames].join(', ')}`);
console.log(`Meshes (${meshNames.size}): ${[...meshNames].join(', ')}`);

if (fs.existsSync(configPath)) {
  const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const areas = cfg.areas ?? [];
  let missingCount = 0;

  for (const area of areas) {
    if (!area.id || !area.name) {
      console.error(`Invalid area entry (missing id or name): ${JSON.stringify(area)}`);
      missingCount++;
      continue;
    }
    if (!area.mesh_names?.length && !area.bounds) {
      console.warn(`Area "${area.id}" has neither mesh_names nor bounds.`);
    }
    for (const name of area.mesh_names ?? []) {
      if (!nodeNames.has(name) && !meshNames.has(name)) {
        console.error(`Area "${area.id}" references missing GLB node/mesh "${name}".`);
        missingCount++;
      }
    }
  }

  if (missingCount > 0) {
    process.exit(1);
  }
  console.log(`Area config verified: ${areas.length} area(s) validated against GLB.`);
}
