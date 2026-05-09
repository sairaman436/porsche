"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ModelViewer({ modelPath }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(5, 2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false; // Disable scroll zoom so it doesn't hijack page scroll

    // Elegant Showroom Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xffffff, 5);
    spotlight.position.set(0, 10, 0);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 1;
    scene.add(spotlight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    if (modelPath) {
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          
          // Center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.x += (model.position.x - center.x);
          model.position.y += (model.position.y - center.y);
          model.position.z += (model.position.z - center.z);
          
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error("Error loading model:", error);
        }
      );
    }

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* The 3D Canvas will be injected here */}
        <div ref={containerRef} className="absolute inset-0" />
        
        {/* Minimal Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-60" />
        <div className="absolute bottom-20 left-12 md:left-24 z-10 pointer-events-none">
           <h2 className="text-3xl font-sans font-light tracking-[0.2em] text-white uppercase">The Details</h2>
           <p className="text-white/60 font-sans tracking-widest text-xs uppercase mt-2">Drag to explore the architecture</p>
        </div>
    </div>
  );
}
