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
    camera.position.z = 7.5; // Restored camera distance to make mannequin smaller
    camera.position.y = 0.2;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Create Mannequin Torso (Masculine Silhouette Lathe) ---
    const points: THREE.Vector2[] = [];
    
    // Neck base
    points.push(new THREE.Vector2(0.38, 1.8));
    points.push(new THREE.Vector2(0.42, 1.5));
    
    // Broader Male Shoulders
    points.push(new THREE.Vector2(0.8, 1.4));
    points.push(new THREE.Vector2(1.35, 1.25));
    points.push(new THREE.Vector2(1.4, 1.05));
    
    // Flat / Muscular Chest (no bust curve)
    points.push(new THREE.Vector2(1.28, 0.6));
    points.push(new THREE.Vector2(1.22, 0.2));
    
    // Straight / Slightly Tapered Waist (less curve than female)
    points.push(new THREE.Vector2(1.05, -0.3));
    points.push(new THREE.Vector2(1.0, -0.7));
    
    // Male Hips / Base
    points.push(new THREE.Vector2(1.12, -1.3));
    points.push(new THREE.Vector2(1.18, -1.6));
    
    // Closing
    points.push(new THREE.Vector2(0.7, -1.75));
    points.push(new THREE.Vector2(0.0, -1.8));

    // Torso Lathe Geometry
    const latheGeometry = new THREE.LatheGeometry(points, 32);
    
    // --- Materials (Vibrant Pink & Dark Blue Branding Lights) ---
    // Solid base material with high roughness to mimic fabric/felt
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b2c4a, // Rich dark blue (less grey, more deep blue)
      roughness: 0.8,
      metalness: 0.15,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    
    const torsoMesh = new THREE.Mesh(latheGeometry, baseMaterial);
    torsoMesh.scale.set(1.35, 1.0, 0.65); // Elliptical cross section for realistic human proportions (not perfectly round/cylindrical)
    scene.add(torsoMesh);

    // Wireframe overlay (Thread network) - Made brighter and thicker for visibility
    const wireframeGeo = new THREE.WireframeGeometry(latheGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xf0c0b5, // Soft Pink/Peach
      transparent: true,
      opacity: 0.45, // Increased opacity from 0.25
    });
    const threadNetwork = new THREE.LineSegments(wireframeGeo, wireframeMat);
    threadNetwork.scale.set(1.36, 1.01, 0.66); // Slightly larger to match torso scale and prevent z-fighting
    scene.add(threadNetwork);

    // --- Standing Pole Base ---
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const baseGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.1, 16);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1a2436,
      roughness: 0.4,
      metalness: 0.8
    });
    
    const pole = new THREE.Mesh(poleGeo, metalMat);
    pole.position.y = -2.55;
    scene.add(pole);

    const standBase = new THREE.Mesh(baseGeo, metalMat);
    standBase.position.y = -3.25;
    scene.add(standBase);

    // Group to rotate everything
    const mannequinGroup = new THREE.Group();
    mannequinGroup.add(torsoMesh);
    mannequinGroup.add(threadNetwork);
    mannequinGroup.add(pole);
    mannequinGroup.add(standBase);
    mannequinGroup.position.y = 0.3; // Default height alignment
    mannequinGroup.scale.set(1.0, 1.0, 1.0); // Reset scale to normal
    scene.add(mannequinGroup);

    // --- Floating Fabric Fibers (Particle System) ---
    const fiberCount = 140;
    const fiberGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(fiberCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < fiberCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.3 + Math.random() * 1.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      velocities.push(
        (Math.random() - 0.5) * 0.002, // x
        (Math.random() + 0.15) * 0.006, // y
        (Math.random() - 0.5) * 0.002  // z
      );
    }

    fiberGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0xf0c0b5, // Pink/Peach particles
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const fiberParticles = new THREE.Points(fiberGeometry, particleMat);
    scene.add(fiberParticles);

    // --- Lighting (Brighter & More Colorful to Avoid Grey Look) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Increased ambient light from 0.45
    scene.add(ambientLight);

    // Deep Navy Blue light from left (intensity increased to 4.5)
    const blueLight = new THREE.DirectionalLight(0x1e40af, 4.5);
    blueLight.position.set(-5, 3, 2);
    scene.add(blueLight);

    // Brighter Pink/Peach light from right (intensity increased to 6.0)
    const pinkLight = new THREE.DirectionalLight(0xf472b6, 6.0);
    pinkLight.position.set(5, 2, 4);
    scene.add(pinkLight);

    // Soft white fill light from front
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
    fillLight.position.set(0, 2, 5);
    scene.add(fillLight);

    // --- Drag-to-Rotate Interactivity (360 Degrees Mouse + Touch) ---
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0;
    
    // Damping/inertia physics variables
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
      
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerPosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - previousPointerPosition.x;
      const deltaY = clientY - previousPointerPosition.y;

      // Adjust rotation speed factor
      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.005;

      // Clamp vertical rotation (pitch) to avoid turning completely upside down
      targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));

      previousPointerPosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    };

    // Attach event listeners
    const el = containerRef.current;
    el.style.cursor = "grab";
    
    el.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    el.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // If user isn't dragging, slowly rotate the mannequin on the Y axis automatically
      if (!isDragging) {
        targetRotationY += 0.15 * delta;
      }

      // Smooth interpolation (lerp) for smooth rotation behavior
      rotationY += (targetRotationY - rotationY) * 0.1;
      rotationX += (targetRotationX - rotationX) * 0.1;

      mannequinGroup.rotation.y = rotationY;
      mannequinGroup.rotation.x = rotationX;

      // Animate floating particles
      const positionsArr = fiberGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < fiberCount; i++) {
        positionsArr[i * 3] += velocities[i * 3];
        positionsArr[i * 3 + 1] += velocities[i * 3 + 1];
        positionsArr[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particle if it drifts too high
        if (positionsArr[i * 3 + 1] > 2.5) {
          positionsArr[i * 3 + 1] = -2.5;
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.3 + Math.random() * 1.5;
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
      el.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      
      el.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      
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
      className="absolute inset-0 z-0 pointer-events-auto w-full h-full"
    />
  );
}
