'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WireframeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // DYNAMIC GRID
    const size = 150;
    const divisions = 60;
    // Primary: Lime, Secondary: Black for high contrast on light bg
    const gridHelper = new THREE.GridHelper(size, divisions, 0xCCFF00, 0x000000);
    
    gridHelper.material.opacity = 0.4;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Initial Camera Pos
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 0, 0);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      // Sensitivity
      targetX = (e.clientX - window.innerWidth / 2) * 0.0008;
      targetY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth Easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      gridHelper.rotation.y = mouseX;
      gridHelper.rotation.x = mouseY + 0.3; // Base tilt for better perspective

      // Subtle pulse to prove it's working
      const time = Date.now() * 0.001;
      gridHelper.material.opacity = 0.2 + Math.sin(time) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[1] opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
}
