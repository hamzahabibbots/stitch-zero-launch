import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeMannequin() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // --- Camera Setup ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;
    camera.position.y = 0.5;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Create Mannequin Torso (Procedural Lathe) ---
    // Create points defining the silhouette of a minimalist mannequin torso
    const points: THREE.Vector2[] = [];
    
    // Neck base
    points.push(new THREE.Vector2(0.35, 1.8));
    points.push(new THREE.Vector2(0.4, 1.5));
    
    // Shoulders expansion
    points.push(new THREE.Vector2(0.7, 1.4));
    points.push(new THREE.Vector2(1.15, 1.25));
    points.push(new THREE.Vector2(1.2, 1.1));
    
    // Bust/Chest curve
    points.push(new THREE.Vector2(1.0, 0.6));
    points.push(new THREE.Vector2(0.9, 0.2));
    
    // Waist narrowing
    points.push(new THREE.Vector2(0.7, -0.3));
    points.push(new THREE.Vector2(0.65, -0.6));
    
    // Hips expansion
    points.push(new THREE.Vector2(0.85, -1.2));
    points.push(new THREE.Vector2(0.95, -1.5));
    
    // Base closing
    points.push(new THREE.Vector2(0.6, -1.7));
    points.push(new THREE.Vector2(0.0, -1.75));

    // Torso Lathe Geometry
    const latheGeometry = new THREE.LatheGeometry(points, 32);
    
    // --- Materials (Dark Blue & Pink/Peach Branding Theme) ---
    // Solid base material with high roughness to mimic organic fabric/felt
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a192f, // Deep Navy Blue
      roughness: 0.85,
      metalness: 0.1,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    
    const torsoMesh = new THREE.Mesh(latheGeometry, baseMaterial);
    scene.add(torsoMesh);

    // Wireframe overlay (Thread network)
    const wireframeGeo = new THREE.WireframeGeometry(latheGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xf0c0b5, // Soft Pink/Peach
      transparent: true,
      opacity: 0.25,
      linewidth: 1, // Note: linewidth > 1 usually not supported by WebGL implementations
    });
    const threadNetwork = new THREE.LineSegments(wireframeGeo, wireframeMat);
    threadNetwork.scale.set(1.01, 1.01, 1.01); // Slightly larger to prevent z-fighting
    scene.add(threadNetwork);

    // --- Standing Pole Base ---
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const baseGeo = new THREE.CylinderGeometry(0.6, 0.65, 0.1, 16);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.5,
      metalness: 0.8
    });
    
    const pole = new THREE.Mesh(poleGeo, metalMat);
    pole.position.y = -2.5;
    scene.add(pole);

    const standBase = new THREE.Mesh(baseGeo, metalMat);
    standBase.position.y = -3.2;
    scene.add(standBase);

    // Group to rotate both torso and threads
    const mannequinGroup = new THREE.Group();
    mannequinGroup.add(torsoMesh);
    mannequinGroup.add(threadNetwork);
    mannequinGroup.add(pole);
    mannequinGroup.add(standBase);
    mannequinGroup.position.y = 0.5;
    scene.add(mannequinGroup);

    // --- Floating Fabric Fibers (Particle System) ---
    const fiberCount = 180;
    const fiberGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(fiberCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < fiberCount; i++) {
      // Position particles around the mannequin
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 2.0;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Random velocities
      velocities.push(
        (Math.random() - 0.5) * 0.003, // x
        (Math.random() + 0.1) * 0.005,  // y (drift upwards)
        (Math.random() - 0.5) * 0.003  // z
      );
    }

    fiberGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Particle texture (tiny circles)
    const particleMat = new THREE.PointsMaterial({
      color: 0xf0c0b5,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const fiberParticles = new THREE.Points(fiberGeometry, particleMat);
    scene.add(fiberParticles);

    // --- Lighting ---
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Directional Light 1: Deep Navy Blue from left
    const blueLight = new THREE.DirectionalLight(0x0e244d, 2.5);
    blueLight.position.set(-5, 3, 2);
    scene.add(blueLight);

    // Directional Light 2: Soft Peach/Pink from right
    const pinkLight = new THREE.DirectionalLight(0xf0c0b5, 3.5);
    pinkLight.position.set(5, 2, 4);
    scene.add(pinkLight);

    // Additional soft highlight from top
    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    // --- Interactive Mouse Movement ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse positions (-1 to 1)
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow idle rotation of the mannequin
      mannequinGroup.rotation.y = elapsedTime * 0.12;

      // Parallax rotation based on mouse coordinates
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.2;
      mannequinGroup.rotation.y += (targetX - mannequinGroup.rotation.y) * 0.05;
      mannequinGroup.rotation.x += (targetY - mannequinGroup.rotation.x) * 0.05;

      // Animate floating fiber particles
      const positionsArr = fiberGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < fiberCount; i++) {
        // Apply velocity
        positionsArr[i * 3] += velocities[i * 3];
        positionsArr[i * 3 + 1] += velocities[i * 3 + 1];
        positionsArr[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particle if it drifts too high
        if (positionsArr[i * 3 + 1] > 2.5) {
          positionsArr[i * 3 + 1] = -2.5;
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.2 + Math.random() * 1.5;
          positionsArr[i * 3] = Math.cos(angle) * radius;
          positionsArr[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }
      fiberGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- Resize Handler ---
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Dispose resources
      latheGeometry.dispose();
      baseMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      fiberGeometry.dispose();
      particleMat.dispose();
      poleGeo.dispose();
      baseGeo.dispose();
      metalMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
