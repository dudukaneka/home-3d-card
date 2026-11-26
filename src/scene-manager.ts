import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getIdbModelName, isIdbModelUrl, loadUploadedModel } from './model-storage';
import {
  computeFocusCameraPose,
  normalizedFootprintToBox3,
  normalizeModelRoot,
  worldPointToNormalizedXZ,
} from './model-utils';
import type {
  AreaConfig,
  CameraPoseConfig,
  DebugPickInfo,
  ProjectedAreaLabel,
  UpAxisMode,
} from './types';

interface AreaVolume {
  config: AreaConfig;
  box: THREE.Box3;
  anchor: THREE.Vector3;
  hitbox: THREE.Mesh;
  highlightPad: THREE.Mesh;
  outline: THREE.LineSegments;
  meshes: THREE.Mesh[];
  color: THREE.Color;
}

interface MaterialSnapshot {
  opacity: number;
  transparent: boolean;
}

export interface SceneManagerOptions {
  container: HTMLElement;
  upAxis: UpAxisMode;
  dimUnselected: boolean;
  showZoneOverlay: boolean;
  debugPicker: boolean;
  darkMode: boolean;
  defaultView?: CameraPoseConfig | null;
  onAreaSelect: (areaId: string | null) => void;
  onAreaHover: (areaId: string | null) => void;
  onLabelsUpdate: (labels: ProjectedAreaLabel[]) => void;
  onDebugPick?: (info: DebugPickInfo) => void;
  onLoadComplete?: (meshNames: string[]) => void;
  onLoadError?: (message: string) => void;
}

const DEFAULT_PALETTE = ['#38bdf8', '#34d399', '#fbbf24', '#a78bfa', '#fb7185', '#2dd4bf'];

export class SceneManager {
  private readonly container: HTMLElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly resizeObserver: ResizeObserver;

  private options: SceneManagerOptions;
  private modelGroup: THREE.Group | null = null;
  private modelBounds = new THREE.Box3();
  private zoneGroup = new THREE.Group();
  private areaVolumes: AreaVolume[] = [];
  private originalMaterials = new Map<THREE.Material, MaterialSnapshot>();

  private autoOverviewTarget = new THREE.Vector3(0, 0.5, 0);
  private autoOverviewPosition = new THREE.Vector3(8, 9, 10);
  private overviewTarget = new THREE.Vector3(0, 0.5, 0);
  private overviewPosition = new THREE.Vector3(8, 9, 10);
  private targetGoal = new THREE.Vector3();
  private positionGoal = new THREE.Vector3();
  private animatingCamera = false;

  private selectedAreaId: string | null = null;
  private hoveredAreaId: string | null = null;
  private pointerDownPos = { x: 0, y: 0 };
  private rafId = 0;
  private disposed = false;

  constructor(options: SceneManagerOptions) {
    this.options = options;
    this.container = options.container;

    this.scene = new THREE.Scene();
    this.scene.add(this.zoneGroup);

    const width = Math.max(this.container.clientWidth, 320);
    const height = Math.max(this.container.clientHeight, 240);

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    this.camera.position.copy(this.overviewPosition);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.04;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 40;

    this.setupLighting();
    this.applyTheme(options.darkMode);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.container);

    const dom = this.renderer.domElement;
    dom.addEventListener('pointerdown', this.handlePointerDown);
    dom.addEventListener('pointermove', this.handlePointerMove);
    dom.addEventListener('pointerup', this.handlePointerUp);
    this.controls.addEventListener('start', () => {
      this.animatingCamera = false;
    });

    this.animate();
  }

  private setupLighting(): void {
    const hemi = new THREE.HemisphereLight(0xf8fafc, 0x334155, 1.15);
    this.scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.35);
    dir.position.set(10, 18, 12);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 45;
    const d = 10;
    dir.shadow.camera.left = -d;
    dir.shadow.camera.right = d;
    dir.shadow.camera.top = d;
    dir.shadow.camera.bottom = -d;
    dir.shadow.bias = -0.0005;
    this.scene.add(dir);

    const fill = new THREE.DirectionalLight(0x93c5fd, 0.45);
    fill.position.set(-10, 8, -8);
    this.scene.add(fill);

    const groundGeo = new THREE.PlaneGeometry(48, 48);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.005;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  public applyTheme(darkMode: boolean): void {
    this.options.darkMode = darkMode;
    this.scene.background = new THREE.Color(darkMode ? 0x0f172a : 0xf1f5f9);
  }

  public updateOptions(partial: Partial<SceneManagerOptions>): void {
    this.options = { ...this.options, ...partial };
    if (partial.darkMode !== undefined) {
      this.applyTheme(partial.darkMode);
    }
    if (partial.defaultView !== undefined) {
      this.setDefaultView(partial.defaultView);
    }
    this.refreshVisualHighlights();
  }

  public getCameraPose(): CameraPoseConfig {
    return {
      position: [
        Number(this.camera.position.x.toFixed(3)),
        Number(this.camera.position.y.toFixed(3)),
        Number(this.camera.position.z.toFixed(3)),
      ],
      target: [
        Number(this.controls.target.x.toFixed(3)),
        Number(this.controls.target.y.toFixed(3)),
        Number(this.controls.target.z.toFixed(3)),
      ],
    };
  }

  public setDefaultView(pose?: CameraPoseConfig | null): void {
    this.options.defaultView = pose ?? null;
    if (pose) {
      this.overviewPosition.set(...pose.position);
      this.overviewTarget.set(...pose.target);
    } else {
      this.overviewPosition.copy(this.autoOverviewPosition);
      this.overviewTarget.copy(this.autoOverviewTarget);
    }
  }

  public async loadModel(url: string, areas: AreaConfig[]): Promise<void> {
    const loader = new GLTFLoader();
    try {
      let gltf;
      if (isIdbModelUrl(url)) {
        const buffer = await loadUploadedModel(url);
        if (!buffer) {
          throw new Error(
            `Model "${getIdbModelName(url)}" is not saved in this browser yet. Upload the .glb or host it at /local/.`,
          );
        }
        gltf = await loader.parseAsync(buffer, '');
      } else {
        gltf = await loader.loadAsync(url);
      }
      if (this.disposed) return;

      if (this.modelGroup) {
        this.scene.remove(this.modelGroup);
      }
      this.originalMaterials.clear();

      const root = gltf.scene;
      const wrapper = new THREE.Group();
      wrapper.add(root);

      const metrics = normalizeModelRoot(root, this.options.upAxis);
      this.modelBounds = metrics.bounds.clone();

      const meshNames: string[] = [];
      wrapper.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.name) meshNames.push(obj.name);
          obj.castShadow = true;
          obj.receiveShadow = true;
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          const cloned = mats.map((m) => {
            const c = m.clone();
            if (c instanceof THREE.MeshStandardMaterial) {
              c.roughness = Math.max(c.roughness, 0.72);
              c.metalness = Math.min(c.metalness, 0.15);
            }
            this.originalMaterials.set(c, {
              opacity: c.opacity,
              transparent: c.transparent,
            });
            return c;
          });
          obj.material = Array.isArray(obj.material) ? cloned : cloned[0];
        }
      });

      this.modelGroup = wrapper;
      this.scene.add(wrapper);

      const aspect = this.camera.aspect || 1.5;
      const overviewPose = computeFocusCameraPose(
        this.modelBounds,
        this.camera.fov,
        aspect,
        [0.42, 0.96, 0.92],
        1.1,
      );
      this.autoOverviewTarget.copy(overviewPose.target);
      this.autoOverviewPosition.copy(overviewPose.position);

      if (this.options.defaultView) {
        this.overviewTarget.set(...this.options.defaultView.target);
        this.overviewPosition.set(...this.options.defaultView.position);
      } else {
        this.overviewTarget.copy(overviewPose.target);
        this.overviewPosition.copy(overviewPose.position);
      }

      this.camera.position.copy(this.overviewPosition);
      this.controls.target.copy(this.overviewTarget);
      this.controls.update();

      this.setAreas(areas);
      this.options.onLoadComplete?.(meshNames);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.options.onLoadError?.(msg);
    }
  }

  public clearModel(): void {
    if (this.modelGroup) {
      this.scene.remove(this.modelGroup);
      this.modelGroup = null;
    }
    this.originalMaterials.clear();
    this.selectedAreaId = null;
    this.hoveredAreaId = null;
    while (this.zoneGroup.children.length > 0) {
      this.zoneGroup.remove(this.zoneGroup.children.pop()!);
    }
    this.areaVolumes = [];
    this.options.onLabelsUpdate([]);
  }

  public setAreas(areas: AreaConfig[]): void {
    while (this.zoneGroup.children.length > 0) {
      const child = this.zoneGroup.children.pop()!;
      this.zoneGroup.remove(child);
    }
    this.areaVolumes = [];

    if (!this.modelGroup) return;

    areas.forEach((area, idx) => {
      const box = new THREE.Box3();
      const matchedMeshes: THREE.Mesh[] = [];

      if (area.mesh_names?.length) {
        const nameSet = new Set(area.mesh_names);
        this.modelGroup!.traverse((obj) => {
          if (obj instanceof THREE.Mesh && (nameSet.has(obj.name) || nameSet.has(obj.parent?.name ?? ''))) {
            matchedMeshes.push(obj);
            box.expandByObject(obj);
          }
        });
      }

      if (area.bounds) {
        const footprintBox = normalizedFootprintToBox3(
          this.modelBounds,
          area.bounds,
          area.height_bounds ?? [0, 1],
        );
        box.union(footprintBox);
      }

      if (box.isEmpty()) return;

      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const color = new THREE.Color(area.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length]);

      const hitboxGeo = new THREE.BoxGeometry(
        Math.max(size.x, 0.25),
        Math.max(size.y, 0.35),
        Math.max(size.z, 0.25),
      );
      const hitboxMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
      hitbox.position.copy(center);
      hitbox.userData.areaId = area.id;
      this.zoneGroup.add(hitbox);

      const padGeo = new THREE.PlaneGeometry(Math.max(size.x, 0.25), Math.max(size.z, 0.25));
      const padMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const highlightPad = new THREE.Mesh(padGeo, padMat);
      highlightPad.rotation.x = -Math.PI / 2;
      highlightPad.position.set(center.x, box.min.y + 0.015, center.z);
      this.zoneGroup.add(highlightPad);

      const edgesGeo = new THREE.EdgesGeometry(hitboxGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2,
      });
      const outline = new THREE.LineSegments(edgesGeo, edgesMat);
      outline.position.copy(center);
      this.zoneGroup.add(outline);

      const anchor = new THREE.Vector3(center.x, box.max.y + 0.28, center.z);

      this.areaVolumes.push({
        config: area,
        box,
        anchor,
        hitbox,
        highlightPad,
        outline,
        meshes: matchedMeshes,
        color,
      });
    });

    this.refreshVisualHighlights();
  }

  public focusArea(areaId: string | null): void {
    this.selectedAreaId = areaId;
    if (!areaId) {
      this.resetView();
      return;
    }

    const volume = this.areaVolumes.find((v) => v.config.id === areaId);
    if (!volume) return;

    const pose = computeFocusCameraPose(
      volume.box,
      this.camera.fov,
      this.camera.aspect || 1.5,
      volume.config.camera_offset ?? [0.65, 0.95, 0.85],
      1.45,
    );
    this.targetGoal.copy(pose.target);
    this.positionGoal.copy(pose.position);
    this.animatingCamera = true;
    this.refreshVisualHighlights();
  }

  public resetView(): void {
    this.selectedAreaId = null;
    this.targetGoal.copy(this.overviewTarget);
    this.positionGoal.copy(this.overviewPosition);
    this.animatingCamera = true;
    this.refreshVisualHighlights();
  }

  private refreshVisualHighlights(): void {
    const showOverlay = this.options.showZoneOverlay;
    const selectedSet = new Set<THREE.Mesh>();

    if (this.selectedAreaId) {
      const vol = this.areaVolumes.find((v) => v.config.id === this.selectedAreaId);
      vol?.meshes.forEach((m) => selectedSet.add(m));
    }

    for (const vol of this.areaVolumes) {
      const isSelected = vol.config.id === this.selectedAreaId;
      const isHovered = vol.config.id === this.hoveredAreaId;
      const padMat = vol.highlightPad.material as THREE.MeshBasicMaterial;
      const lineMat = vol.outline.material as THREE.LineBasicMaterial;

      vol.highlightPad.visible = showOverlay || isSelected || isHovered;
      vol.outline.visible = showOverlay || isSelected || isHovered;

      padMat.opacity = isSelected ? 0.28 : isHovered ? 0.18 : 0.06;
      lineMat.opacity = isSelected ? 0.9 : isHovered ? 0.65 : 0.18;
    }

    if (this.modelGroup) {
      const shouldDim = Boolean(
        this.selectedAreaId && this.options.dimUnselected && selectedSet.size > 0,
      );
      this.modelGroup.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        const isKeep = !shouldDim || selectedSet.has(obj);
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const mat of mats) {
          const snap = this.originalMaterials.get(mat);
          if (!snap) continue;
          mat.transparent = isKeep ? snap.transparent : true;
          mat.opacity = isKeep ? snap.opacity : 0.22;
          mat.needsUpdate = true;
        }
      });
    }
  }

  private updatePointer(ev: PointerEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private pickArea(ev: PointerEvent): string | null {
    this.updatePointer(ev);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hitboxes = this.areaVolumes.map((v) => v.hitbox);
    const hits = this.raycaster.intersectObjects(hitboxes, false);
    if (hits.length > 0) {
      return (hits[0].object.userData.areaId as string) ?? null;
    }
    return null;
  }

  private handlePointerDown = (ev: PointerEvent): void => {
    this.pointerDownPos = { x: ev.clientX, y: ev.clientY };
  };

  private handlePointerMove = (ev: PointerEvent): void => {
    const hovered = this.pickArea(ev);
    if (hovered !== this.hoveredAreaId) {
      this.hoveredAreaId = hovered;
      this.renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';
      this.refreshVisualHighlights();
      this.options.onAreaHover(hovered);
    }
  };

  private handlePointerUp = (ev: PointerEvent): void => {
    const dx = ev.clientX - this.pointerDownPos.x;
    const dy = ev.clientY - this.pointerDownPos.y;
    if (Math.hypot(dx, dy) > 6) return; // Dragged camera, ignore click

    if (this.options.debugPicker && this.modelGroup) {
      this.updatePointer(ev);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const modelHits = this.raycaster.intersectObject(this.modelGroup, true);
      if (modelHits.length > 0) {
        const hit = modelHits[0];
        const norm = worldPointToNormalizedXZ(this.modelBounds, hit.point);
        this.options.onDebugPick?.({
          ...norm,
          meshName: hit.object.name || null,
        });
      }
    }

    const picked = this.pickArea(ev);
    if (picked) {
      this.focusArea(picked);
      this.options.onAreaSelect(picked);
    }
  };

  private handleResize(): void {
    if (this.disposed) return;
    const width = Math.max(this.container.clientWidth, 320);
    const height = Math.max(this.container.clientHeight, 240);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private emitProjectedLabels(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;

    const labels: ProjectedAreaLabel[] = this.areaVolumes.map((vol) => {
      const projected = vol.anchor.clone().project(this.camera);
      const visible = projected.z >= -1 && projected.z <= 1;
      return {
        id: vol.config.id,
        name: vol.config.name,
        color: `#${vol.color.getHexString()}`,
        x: (projected.x * 0.5 + 0.5) * width,
        y: (-projected.y * 0.5 + 0.5) * height,
        visible,
        selected: vol.config.id === this.selectedAreaId,
      };
    });

    this.options.onLabelsUpdate(labels);
  }

  private animate = (): void => {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(this.animate);

    if (this.animatingCamera) {
      this.camera.position.lerp(this.positionGoal, 0.12);
      this.controls.target.lerp(this.targetGoal, 0.12);
      if (
        this.camera.position.distanceTo(this.positionGoal) < 0.03 &&
        this.controls.target.distanceTo(this.targetGoal) < 0.03
      ) {
        this.camera.position.copy(this.positionGoal);
        this.controls.target.copy(this.targetGoal);
        this.animatingCamera = false;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.emitProjectedLabels();
  };

  public dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    const dom = this.renderer.domElement;
    dom.removeEventListener('pointerdown', this.handlePointerDown);
    dom.removeEventListener('pointermove', this.handlePointerMove);
    dom.removeEventListener('pointerup', this.handlePointerUp);
    this.controls.dispose();
    this.renderer.dispose();
    dom.remove();
  }
}
