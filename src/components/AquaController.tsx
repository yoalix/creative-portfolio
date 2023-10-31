import {
  Capsule,
  useAnimations,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Aqua } from "./Aqua";

const JUMP_FORCE = 0.5;
const MOVEMENT_SPEED = 0.2;
const MAX_VEL = 1;

const AquaController = () => {
  const aquaModel = useGLTF("./characters/aqua/metal.glb");
  aquaModel.scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material.metalness = 1;
    }
  });
  const aquaRigidBody = useRef<RapierRigidBody>(null);
  const aquaRef = useRef<THREE.Group>(null);
  const { forward, backward, left, right, jump } = useKeyboardControls(
    (state) => state
  );
  const animations = useAnimations(aquaModel.animations, aquaModel.scene);
  const { animation } = useControls("animation", {
    animation: { options: animations.names },
  });
  useEffect(() => {
    let action;
    if ((forward || backward || left || right) === false) {
      animations.actions.Walking?.stop();
      action = animations.actions["Playing Piano"];
    } else action = animations.actions.Walking;
    action?.play();
    return () => {
      animations.actions[animation]?.fadeOut(0.5);
    };
  }, [animations, forward, backward, left, right]);
  useFrame((state, delta) => {
    /** Controls */
    const impulseStrength = 1;
    const impulse = { x: 0, y: 0, z: 0 };

    const linvel = aquaRigidBody.current?.linvel();

    let changeDirection = false;
    if (forward && linvel!.z > -MAX_VEL) {
      console.log("forward");
      impulse.z -= impulseStrength;
      changeDirection = true;
    }
    if (backward && linvel!.z < MAX_VEL) {
      impulse.z += impulseStrength;
      changeDirection = true;
    }
    if (left && linvel!.x > -MAX_VEL) {
      impulse.x -= impulseStrength;
      changeDirection = true;
    }
    if (right && linvel!.x < MAX_VEL) {
      impulse.x += impulseStrength;
      changeDirection = true;
    }
    aquaRigidBody.current?.applyImpulse(impulse, true);

    if (changeDirection) {
      const angle = Math.atan2(linvel!.x, linvel!.z);
      aquaRef.current!.rotation.y = angle;
    }
  });
  return (
    <RigidBody
      ref={aquaRigidBody}
      colliders={false}
      enabledRotations={[false, false, false]}
    >
      <group ref={aquaRef}>
        {/* <Aqua castShadow /> */}
        <primitive object={aquaModel.scene} position-y={-0.89} />
        {/* <Capsule visible={true} args={[0.5, 2]} /> */}
        <ambientLight intensity={5} />
      </group>
      <CapsuleCollider args={[0.5, 0.5]} position={[0, 0, 0]} />
    </RigidBody>
  );
};

export default AquaController;
