import { parseGlbMetadata } from './model-utils';

const DB_NAME = 'home-3d-card-db';
const DB_VERSION = 1;
const STORE_NAME = 'models';

export interface UploadedModelMeta {
  name: string;
  url: string;
  sizeBytes: number;
  updatedAt: number;
}

interface StoredModelRecord {
  name: string;
  data: ArrayBuffer;
  sizeBytes: number;
  updatedAt: number;
}

const memoryFallback = new Map<string, StoredModelRecord>();

export function isIdbModelUrl(url?: string): boolean {
  return Boolean(url && url.startsWith('idb://'));
}

export function getIdbModelName(url: string): string {
  return url.slice('idb://'.length);
}

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') {
    return Promise.resolve(null);
  }
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Failed to open IndexedDB'));
  });
}

/**
 * Validates and saves a `.glb` binary in browser IndexedDB storage,
 * returning an `idb://<fileName>` model URL that persists across page reloads.
 */
export async function saveUploadedModel(
  fileName: string,
  buffer: ArrayBuffer,
): Promise<{ url: string; meta: ReturnType<typeof parseGlbMetadata> }> {
  const cleanName = fileName.trim().replace(/[\\/]+/g, '_') || 'model.glb';
  const meta = parseGlbMetadata(buffer);
  const record: StoredModelRecord = {
    name: cleanName,
    data: buffer,
    sizeBytes: buffer.byteLength,
    updatedAt: Date.now(),
  };

  const db = await openDb();
  if (!db) {
    memoryFallback.set(cleanName, record);
    return { url: `idb://${cleanName}`, meta };
  }

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(record);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error ?? new Error('Failed to store GLB in IndexedDB'));
    };
  });

  return { url: `idb://${cleanName}`, meta };
}

export async function loadUploadedModel(url: string): Promise<ArrayBuffer | null> {
  if (!isIdbModelUrl(url)) return null;
  const name = getIdbModelName(url);

  const db = await openDb();
  if (!db) {
    return memoryFallback.get(name)?.data ?? null;
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(name);
    req.onsuccess = () => {
      db.close();
      const rec = req.result as StoredModelRecord | undefined;
      resolve(rec?.data ?? null);
    };
    req.onerror = () => {
      db.close();
      reject(req.error ?? new Error('Failed to read GLB from IndexedDB'));
    };
  });
}

export async function listUploadedModels(): Promise<UploadedModelMeta[]> {
  const db = await openDb();
  if (!db) {
    return [...memoryFallback.values()].map((r) => ({
      name: r.name,
      url: `idb://${r.name}`,
      sizeBytes: r.sizeBytes,
      updatedAt: r.updatedAt,
    }));
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => {
      db.close();
      const recs = (req.result as StoredModelRecord[] | undefined) ?? [];
      resolve(
        recs
          .map((r) => ({
            name: r.name,
            url: `idb://${r.name}`,
            sizeBytes: r.sizeBytes,
            updatedAt: r.updatedAt,
          }))
          .sort((a, b) => b.updatedAt - a.updatedAt),
      );
    };
    req.onerror = () => {
      db.close();
      reject(req.error ?? new Error('Failed to list stored GLB models'));
    };
  });
}

export async function deleteUploadedModel(name: string): Promise<void> {
  const db = await openDb();
  if (!db) {
    memoryFallback.delete(name);
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(name);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error ?? new Error('Failed to delete GLB from IndexedDB'));
    };
  });
}
