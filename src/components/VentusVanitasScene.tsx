import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";

const VentusVanitasScene = () => {
  const scene = useGLTF("./scenes/ventus-vanitas/scene.glb");

  return (
    <RigidBody type="fixed" colliders={false} friction={2}>
      <primitive
        object={scene.scene}
        scale={0.7}
        position={[0, 0, 0]}
        rotation-x={-Math.PI / 2}
        receiveShadow
      />
      <CylinderCollider position={[0, -1.5, 0]} args={[1.5, 8.7]} />
    </RigidBody>
  );
};

export default VentusVanitasScene;
