import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================
    // 1. Central AI Agent Core (Wireframe Icosahedron)
    // ==========================================
    const coreGeometry = new THREE.IcosahedronGeometry(7, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x3ddc97,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    worldGroup.add(coreMesh);

    // Inner Glowing Core
    const innerCoreGeometry = new THREE.OctahedronGeometry(3.5, 0);
    const innerCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial);
    worldGroup.add(innerCoreMesh);

    // ==========================================
    // 2. Neural Node Constellation (Vertices + Lines)
    // ==========================================
    const nodeCount = 55;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];
    const spreadRadius = 22;

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * spreadRadius + 4;
      const sinPhi = Math.sin(phi);

      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    // Glowing Node Points
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x3ddc97,
      size: 0.6,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    worldGroup.add(nodePoints);

    // Dynamic Connecting Lines between nearby nodes
    const maxLines = 150;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(linesMesh);

    // ==========================================
    // 3. Ambient Starfield / Particle Cloud
    // ==========================================
    const starCount = 200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 60;
      starPositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x8a99ad,
      size: 0.3,
      transparent: true,
      opacity: 0.4,
    });
    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // ==========================================
    // Mouse Interaction (Smooth Parallax)
    // ==========================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // Animation Loop
    // ==========================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Rotate Central Cores
        coreMesh.rotation.x = elapsedTime * 0.12;
        coreMesh.rotation.y = elapsedTime * 0.18;
        innerCoreMesh.rotation.x = -elapsedTime * 0.22;
        innerCoreMesh.rotation.z = elapsedTime * 0.15;

        // Subtle pulsation
        const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
        innerCoreMesh.scale.set(pulse, pulse, pulse);

        // Slow ambient orbit
        worldGroup.rotation.y = elapsedTime * 0.04 + mouseX * 0.6;
        worldGroup.rotation.x = mouseY * 0.4;
        starPoints.rotation.y = elapsedTime * 0.01;

        // Animate constellation nodes & recalculate lines
        const pos = nodeGeometry.attributes.position.array;
        let lineIdx = 0;
        const colorAccent = new THREE.Color(0x3ddc97);
        const colorCyan = new THREE.Color(0x00e5ff);

        for (let i = 0; i < nodeCount; i++) {
          const i3 = i * 3;
          pos[i3] += nodeVelocities[i].x;
          pos[i3 + 1] += nodeVelocities[i].y;
          pos[i3 + 2] += nodeVelocities[i].z;

          // Boundary bouncing
          const dist = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
          if (dist > spreadRadius + 6 || dist < 4) {
            nodeVelocities[i].x *= -1;
            nodeVelocities[i].y *= -1;
            nodeVelocities[i].z *= -1;
          }

          // Connect to nearby nodes
          for (let j = i + 1; j < nodeCount; j++) {
            if (lineIdx >= maxLines) break;
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3 + 1] - pos[j3 + 1];
            const dz = pos[i3 + 2] - pos[j3 + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (d < 8) {
              const l6 = lineIdx * 6;
              linePositions[l6] = pos[i3];
              linePositions[l6 + 1] = pos[i3 + 1];
              linePositions[l6 + 2] = pos[i3 + 2];
              linePositions[l6 + 3] = pos[j3];
              linePositions[l6 + 4] = pos[j3 + 1];
              linePositions[l6 + 5] = pos[j3 + 2];

              const alpha = Math.max(0, 1 - d / 8);
              const col = (i + j) % 2 === 0 ? colorAccent : colorCyan;
              lineColors[l6] = col.r * alpha;
              lineColors[l6 + 1] = col.g * alpha;
              lineColors[l6 + 2] = col.b * alpha;
              lineColors[l6 + 3] = col.r * alpha;
              lineColors[l6 + 4] = col.g * alpha;
              lineColors[l6 + 5] = col.b * alpha;

              lineIdx++;
            }
          }
        }

        // Fill remaining lines with zeroes
        for (let k = lineIdx * 6; k < maxLines * 6; k++) {
          linePositions[k] = 0;
          lineColors[k] = 0;
        }

        nodeGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      coreGeometry.dispose();
      coreMaterial.dispose();
      innerCoreGeometry.dispose();
      innerCoreMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default Hero3DCanvas;
