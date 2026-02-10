import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CanModel({ textures = [], onClick }) {
  const { scene } = useGLTF("/models/modelo.glb");
  const maps = useTexture(textures);

  const canRef = useRef();
  const spinning = useRef(false);
  const progress = useRef(0);
  const floatTime = useRef(0);

  // Configura texturas
  useEffect(() => {
    maps.forEach((t) => {
      t.flipY = true;
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });

    // Aplica a textura recebida via prop
    if (!scene) return;
    scene.traverse((child) => {
      if (!child.isMesh) return;
      child.material = child.material.clone();
      if (child.material.name === "Can_Label") {
        child.material.map = maps[0] || null;
        child.material.metalness = 0;
        child.material.roughness = 0.4;
        child.material.needsUpdate = true;
      }
    });
  }, [maps, scene]);

  // Atualiza a textura toda vez que muda a prop
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (!child.isMesh) return;
      if (child.material.name === "Can_Label") {
        child.material.map = maps[0] || null;
        child.material.needsUpdate = true;
      }
    });
  }, [maps, scene]);

  // Animação
  useFrame((_, delta) => {
    if (!canRef.current) return;

    // Flutuação
    floatTime.current += delta;
    canRef.current.position.y = Math.sin(floatTime.current * 1.0) * 0.12;
    canRef.current.rotation.x = Math.sin(floatTime.current * 0.7) * 0.05;
    canRef.current.rotation.z = Math.cos(floatTime.current * 0.9) * 0.04;

    // Giro ao clicar
    if (!spinning.current) return;
    progress.current += delta / 0.8;
    progress.current = Math.min(progress.current, 1);
    canRef.current.rotation.y = progress.current * Math.PI * 2;

    // Quando o giro termina, reseta
    if (progress.current >= 1) {
      spinning.current = false;
      progress.current = 0;
      canRef.current.rotation.y = 0;
    }
  });

  const handleClick = () => {
    if (spinning.current) return;
    spinning.current = true;
    onClick?.(); // dispara para o pai mudar sabor
  };

  return <primitive ref={canRef} object={scene} scale={1.2} onClick={handleClick} />;
}
