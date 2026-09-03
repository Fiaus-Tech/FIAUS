import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export default function HeroScene() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const isDark = theme === 'dark';
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Tech / AI Constellation Group
    const group = new THREE.Group();
    scene.add(group);

    // Dynamic particle counts based on device
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 65 : 120;
    const radius = 10.5;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2;
      const y = radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2;
      const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push({ x, y, z });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle nodes material
    const nodeColor = isDark ? 0x60a5fa : 0x2563eb;
    const particleMaterial = new THREE.PointsMaterial({
      color: nodeColor,
      size: isMobile ? 0.28 : 0.38,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    group.add(particles);

    // Inner glowing tech core
    const coreGeometry = new THREE.IcosahedronGeometry(5.2, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x1e40af : 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Outer orbital ring
    const ringGeometry = new THREE.TorusGeometry(12.5, 0.04, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x1d4ed8,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    group.add(ringMesh);

    // Dynamic Connections (Neural network lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x3b82f6 : 0x2563eb,
      transparent: true,
      opacity: isDark ? 0.16 : 0.12
    });

    const linePositions = [];
    const maxDistance = isMobile ? 4.8 : 5.8;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(linesMesh);

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth auto rotation
      group.rotation.y += 0.003;
      group.rotation.x += 0.0015;

      // Mouse lerp
      group.rotation.y += (targetRotationY - group.rotation.y * 0.1) * 0.03;
      group.rotation.x += (targetRotationX - group.rotation.x * 0.1) * 0.03;

      // Core pulsing
      coreMesh.rotation.y -= 0.004;
      coreMesh.rotation.z += 0.002;
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      ringMesh.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Disposal
      geometry.dispose();
      particleMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [theme]);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-brand-600/20 to-brand-400/10 blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[480px] sm:h-[540px] lg:h-[620px] pointer-events-auto cursor-grab active:cursor-grabbing relative"
      aria-label="Interactive 3D Technology & AI Visualization"
    />
  );
}

