import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CelestialBody } from '../types/solar';

interface SolarCanvasProps {
  bodies: CelestialBody[];
  selectedBodyId: string;
  onSelectBody: (id: string) => void;
  speedMultiplier: number;
  isPaused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
}

// Procedural texture generators for fast, offline, reliable 3D textures
function createPlanetTexture(type: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  if (type === 'sun') {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.3, '#f59e0b');
    grad.addColorStop(0.7, '#ea580c');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Add turbulent solar flare noise
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 30 + 5;
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(254, 240, 138, 0.4)' : 'rgba(220, 38, 38, 0.3)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'mercury') {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 8 + 1;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(148, 163, 184, 0.3)' : 'rgba(30, 41, 59, 0.4)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'venus') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#fef3c7');
    grad.addColorStop(0.3, '#fde68a');
    grad.addColorStop(0.6, '#f59e0b');
    grad.addColorStop(1, '#d97706');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Swirling sulfur clouds
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 14;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      const y = Math.random() * h;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y + Math.random() * 60 - 30, w * 0.7, y + Math.random() * 60 - 30, w, y);
      ctx.stroke();
    }
  } else if (type === 'earth') {
    // Ocean blue base
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(0, 0, w, h);

    // Greenish continents
    ctx.fillStyle = '#15803d';
    for (let i = 0; i < 40; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * (h * 0.7) + (h * 0.15);
      const rw = Math.random() * 120 + 40;
      const rh = Math.random() * 70 + 20;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rw, rh, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar ice caps
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h * 0.08);
    ctx.fillRect(0, h * 0.92, w, h * 0.08);

    // Swirling white clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 50; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.random() * 140 + 30, Math.random() * 20 + 5, Math.random() * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'mars') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ef4444');
    grad.addColorStop(0.5, '#b91c1c');
    grad.addColorStop(1, '#7c2d12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Darker iron craters & canyon shadows
    ctx.fillStyle = 'rgba(69, 10, 10, 0.4)';
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 12 + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar ice caps
    ctx.fillStyle = '#fee2e2';
    ctx.fillRect(0, 0, w, h * 0.05);
    ctx.fillRect(0, h * 0.95, w, h * 0.05);
  } else if (type === 'jupiter') {
    // Atmospheric horizontal bands
    const bands = ['#fed7aa', '#ea580c', '#fbbf24', '#c2410c', '#fef3c7', '#9a3412', '#fdba74'];
    const bandHeight = h / 24;
    for (let i = 0; i < 24; i++) {
      ctx.fillStyle = bands[i % bands.length];
      ctx.fillRect(0, i * bandHeight, w, bandHeight + 1);
    }

    // Great Red Spot
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.ellipse(w * 0.6, h * 0.65, 55, 30, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef3c7';
    ctx.lineWidth = 4;
    ctx.stroke();
  } else if (type === 'saturn') {
    const bands = ['#fef08a', '#fde047', '#eab308', '#ca8a04', '#fef9c3'];
    const bandHeight = h / 20;
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = bands[i % bands.length];
      ctx.fillRect(0, i * bandHeight, w, bandHeight + 1);
    }
  } else if (type === 'uranus') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#bae6fd');
    grad.addColorStop(0.5, '#7dd3fc');
    grad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  } else if (type === 'neptune') {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1d4ed8');
    grad.addColorStop(0.5, '#2563eb');
    grad.addColorStop(1, '#1e40af');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Methane white storm streaks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 25; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.random() * 80 + 20, Math.random() * 8 + 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Pluto
    ctx.fillStyle = '#a8a29e';
    ctx.fillRect(0, 0, w, h);
    // Heart shape bright region
    ctx.fillStyle = '#f5f5f4';
    ctx.beginPath();
    ctx.arc(w * 0.45, h * 0.5, 40, 0, Math.PI * 2);
    ctx.arc(w * 0.55, h * 0.5, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural ring texture
function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(254, 240, 138, 0)');
  grad.addColorStop(0.1, 'rgba(254, 240, 138, 0.6)');
  grad.addColorStop(0.4, 'rgba(250, 204, 21, 0.8)');
  grad.addColorStop(0.6, 'rgba(202, 138, 4, 0.1)'); // Cassini division gap!
  grad.addColorStop(0.65, 'rgba(234, 179, 8, 0.7)');
  grad.addColorStop(0.9, 'rgba(253, 224, 71, 0.4)');
  grad.addColorStop(1, 'rgba(254, 240, 138, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

export const SolarCanvas: React.FC<SolarCanvasProps> = ({
  bodies,
  selectedBodyId,
  onSelectBody,
  speedMultiplier,
  isPaused,
  showOrbits,
  showLabels
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [screenLabels, setScreenLabels] = useState<{ id: string; nameGu: string; x: number; y: number; visible: boolean }[]>([]);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetMeshesRef = useRef<Map<string, { mesh: THREE.Mesh; orbitGroup: THREE.Group; data: CelestialBody; currentAngle: number }>>(new Map());
  const orbitLinesRef = useRef<THREE.Line[]>([]);
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 50, 85));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const sunLightRef = useRef<THREE.PointLight | null>(null);
  const moonGroupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraDistanceRef = useRef(95);
  const cameraPolarAngleRef = useRef(Math.PI / 3.5);
  const cameraAzimuthalAngleRef = useRef(0);

  // Focus transition animation
  const isTransitioningRef = useRef(false);

  // Switch camera target when selectedBodyId changes
  useEffect(() => {
    const selected = bodies.find((b) => b.id === selectedBodyId);
    if (!selected) return;

    if (selected.id === 'sun') {
      targetLookAtRef.current.set(0, 0, 0);
      targetCameraPosRef.current.set(0, 32, 45);
      cameraDistanceRef.current = 45;
    } else {
      const entry = planetMeshesRef.current.get(selected.id);
      if (entry) {
        // Calculate position in world space
        const worldPos = new THREE.Vector3();
        entry.mesh.getWorldPosition(worldPos);
        targetLookAtRef.current.copy(worldPos);

        const zoomDist = entry.data.three.radius * 4.5 + 4;
        cameraDistanceRef.current = zoomDist;
        targetCameraPosRef.current.copy(worldPos).add(new THREE.Vector3(0, zoomDist * 0.45, zoomDist));
      }
    }
    isTransitioningRef.current = true;
  }, [selectedBodyId, bodies]);

  // Handle orbits visibility
  useEffect(() => {
    orbitLinesRef.current.forEach((line) => {
      line.visible = showOrbits;
    });
  }, [showOrbits]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 50, 95);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Deep Space Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 600 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const colorMix = Math.random();
      if (colorMix > 0.8) {
        // slight blue-white
        starColors[i * 3] = 0.8;
        starColors[i * 3 + 1] = 0.9;
        starColors[i * 3 + 2] = 1.0;
      } else if (colorMix > 0.6) {
        // slight warm golden
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.92;
        starColors[i * 3 + 2] = 0.7;
      } else {
        // pure white
        starColors[i * 3] = 0.95;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 0.95;
      }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });
    const starField = new THREE.Points(starsGeometry, starMaterial);
    scene.add(starField);

    // Ambient Lighting for night sides so planets remain clearly visible for learning
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Strong Sun PointLight
    const sunLight = new THREE.PointLight(0xfffbeb, 3.2, 500, 0.8);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Secondary soft hemisphere light
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.25);
    scene.add(hemiLight);

    // Ring Texture cache
    const ringTexture = createRingTexture();

    // Create planets and orbits
    const ringOuterSegments = 64;
    bodies.forEach((body) => {
      const texture = createPlanetTexture(body.color.surfaceTextureType);

      if (body.id === 'sun') {
        // Sun Mesh
        const geometry = new THREE.SphereGeometry(body.three.radius, 48, 48);
        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        const sunMesh = new THREE.Mesh(geometry, material);
        sunMesh.userData = { id: body.id };
        scene.add(sunMesh);

        // Sun outer corona glow halo
        const glowGeo = new THREE.SphereGeometry(body.three.radius * 1.25, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.22,
          side: THREE.BackSide
        });
        const corona = new THREE.Mesh(glowGeo, glowMat);
        scene.add(corona);

        // Register in map
        const dummyGroup = new THREE.Group();
        planetMeshesRef.current.set(body.id, {
          mesh: sunMesh,
          orbitGroup: dummyGroup,
          data: body,
          currentAngle: 0
        });
      } else {
        // Planet with orbit group
        const orbitGroup = new THREE.Group();
        scene.add(orbitGroup);

        // Planet geometry
        const geometry = new THREE.SphereGeometry(body.three.radius, 36, 36);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.75,
          metalness: 0.1
        });
        const planetMesh = new THREE.Mesh(geometry, material);
        planetMesh.userData = { id: body.id };
        planetMesh.castShadow = true;
        planetMesh.receiveShadow = true;

        if (body.three.tiltAngle) {
          planetMesh.rotation.z = body.three.tiltAngle;
        }

        // Initial angle offset so planets are scattered in their orbits nicely
        const initialAngle = (Math.PI * 2 * bodies.indexOf(body)) / 8;
        planetMesh.position.set(
          Math.cos(initialAngle) * body.three.orbitRadius,
          0,
          Math.sin(initialAngle) * body.three.orbitRadius
        );

        orbitGroup.add(planetMesh);

        // Rings (Saturn, Uranus)
        if (body.three.hasRings && body.three.ringInner && body.three.ringOuter) {
          const ringGeo = new THREE.RingGeometry(body.three.ringInner, body.three.ringOuter, ringOuterSegments);
          // Rotate ring geometry to lie flat on the equator
          ringGeo.rotateX(Math.PI / 2);

          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTexture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.88,
            roughness: 0.5
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          planetMesh.add(ringMesh);
        }

        // Earth's Moon
        if (body.id === 'earth') {
          const moonGroup = new THREE.Group();
          planetMesh.add(moonGroup);
          moonGroupRef.current = moonGroup;

          const moonGeo = new THREE.SphereGeometry(0.48, 20, 20);
          const moonMat = new THREE.MeshStandardMaterial({
            color: 0xd1d5db,
            roughness: 0.9
          });
          const moonMesh = new THREE.Mesh(moonGeo, moonMat);
          moonMesh.position.set(3.4, 0, 0);
          moonGroup.add(moonMesh);
        }

        // Orbit Line
        const orbitPoints: THREE.Vector3[] = [];
        const segments = 120;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          orbitPoints.push(
            new THREE.Vector3(
              Math.cos(theta) * body.three.orbitRadius,
              0,
              Math.sin(theta) * body.three.orbitRadius
            )
          );
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(body.color.accentHex),
          transparent: true,
          opacity: 0.35
        });
        const orbitLine = new THREE.Line(orbitGeo, orbitMat);
        scene.add(orbitLine);
        orbitLinesRef.current.push(orbitLine);

        planetMeshesRef.current.set(body.id, {
          mesh: planetMesh,
          orbitGroup,
          data: body,
          currentAngle: initialAngle
        });
      }
    });

    // Asteroid Belt between Mars (r=34) and Jupiter (r=46)
    const asteroidCount = 650;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.18, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.9
    });
    const asteroidInstanced = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const radius = 38 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.2;
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const scale = Math.random() * 0.9 + 0.3;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();
      asteroidInstanced.setMatrixAt(i, dummy.matrix);
    }
    asteroidInstanced.instanceMatrix.needsUpdate = true;
    scene.add(asteroidInstanced);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Orbit and rotation
      if (!isPaused) {
        planetMeshesRef.current.forEach((item) => {
          // Axial rotation
          item.mesh.rotation.y += item.data.three.rotationSpeed * (speedMultiplier * 0.8);

          // Orbital revolution
          if (item.data.id !== 'sun') {
            item.currentAngle += item.data.three.orbitSpeed * 0.15 * speedMultiplier;
            item.mesh.position.x = Math.cos(item.currentAngle) * item.data.three.orbitRadius;
            item.mesh.position.z = Math.sin(item.currentAngle) * item.data.three.orbitRadius;
          }
        });

        // Rotate Moon around Earth
        if (moonGroupRef.current) {
          moonGroupRef.current.rotation.y += 0.03 * speedMultiplier;
        }

        // Slowly rotate starfield and asteroid belt
        starField.rotation.y += 0.00015;
        asteroidInstanced.rotation.y += 0.0007 * speedMultiplier;
      }

      // Smooth camera interpolation towards selected planet
      const selected = planetMeshesRef.current.get(selectedBodyId);
      if (selected) {
        const targetWorldPos = new THREE.Vector3();
        selected.mesh.getWorldPosition(targetWorldPos);

        // Smoothly glide lookAt point
        currentLookAtRef.current.lerp(targetWorldPos, 0.05);

        // Update camera position orbiting around targetLookAt
        const px =
          currentLookAtRef.current.x +
          cameraDistanceRef.current *
            Math.sin(cameraPolarAngleRef.current) *
            Math.sin(cameraAzimuthalAngleRef.current);
        const py =
          currentLookAtRef.current.y +
          cameraDistanceRef.current * Math.cos(cameraPolarAngleRef.current);
        const pz =
          currentLookAtRef.current.z +
          cameraDistanceRef.current *
            Math.sin(cameraPolarAngleRef.current) *
            Math.cos(cameraAzimuthalAngleRef.current);

        camera.position.lerp(new THREE.Vector3(px, py, pz), 0.06);
        camera.lookAt(currentLookAtRef.current);
      }

      renderer.render(scene, camera);

      // Project labels to 2D screen positions
      if (showLabels) {
        const newLabels: { id: string; nameGu: string; x: number; y: number; visible: boolean }[] = [];
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        planetMeshesRef.current.forEach((item) => {
          const worldPos = new THREE.Vector3();
          item.mesh.getWorldPosition(worldPos);

          // Add offset above planet
          worldPos.y += item.data.three.radius + 1.2;

          const screenPos = worldPos.clone().project(camera);

          // Check if in front of camera
          const isVisible = screenPos.z < 1 && screenPos.z > -1;
          const x = screenPos.x * halfWidth + halfWidth;
          const y = -(screenPos.y * halfHeight) + halfHeight;

          newLabels.push({
            id: item.data.id,
            nameGu: item.data.nameGu,
            x,
            y,
            visible: isVisible
          });
        });

        setScreenLabels(newLabels);
      }
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starsGeometry.dispose();
      starMaterial.dispose();
      container.replaceChildren();
    };
  }, [bodies, isPaused, speedMultiplier, showLabels, selectedBodyId]);

  // Mouse & Touch Controls
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraAzimuthalAngleRef.current -= deltaX * 0.007;
    cameraPolarAngleRef.current = Math.max(
      0.1,
      Math.min(Math.PI / 2.05, cameraPolarAngleRef.current - deltaY * 0.007)
    );

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY * 0.05;
    cameraDistanceRef.current = Math.max(5, Math.min(220, cameraDistanceRef.current + zoomFactor));
  }, []);

  // Click on Planet Raycaster
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      const clickableMeshes: THREE.Mesh[] = [];
      planetMeshesRef.current.forEach((item) => {
        clickableMeshes.push(item.mesh);
      });

      const intersects = raycaster.intersectObjects(clickableMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.id) {
          onSelectBody(hit.userData.id);
        }
      }
    },
    [onSelectBody]
  );

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing bg-slate-950"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleClick}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Projected Planet Name Badges */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none">
          {screenLabels.map((lbl) => {
            if (!lbl.visible) return null;
            const isSelected = lbl.id === selectedBodyId;
            return (
              <button
                key={lbl.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBody(lbl.id);
                }}
                style={{
                  transform: `translate(${lbl.x}px, ${lbl.y}px) translate(-50%, -100%)`
                }}
                className={`pointer-events-auto absolute transition-all px-2.5 py-0.5 text-xs font-semibold rounded-md border shadow-md flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold scale-110 z-20 shadow-amber-500/30'
                    : 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 border-slate-700/60 hover:border-slate-500 hover:scale-105 z-10'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      bodies.find((b) => b.id === lbl.id)?.color.accentHex || '#ffffff'
                  }}
                />
                <span>{lbl.nameGu}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
