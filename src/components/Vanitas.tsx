import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";

const Vanitas = () => {
  const vanitasModel = useGLTF("./characters/vanitas.glb");
  const vanitasRef = useRef<RapierRigidBody>(null);
  //   const {
  //     position: { x, y },
  //   } = useControls({ position: { x: 0, y: 0 } });
  const [subscribeKeys, getKeys] = useKeyboardControls();
  useFrame((state, delta) => {
    /** Controls */
    const { forward, backward, leftward, rightward } = getKeys();
    const impulseStrength = 1 * delta;
    const torqueStrength = 1 * delta;
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    if (forward) {
      console.log("forward");
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    vanitasRef.current?.applyImpulse(impulse, true);
    vanitasRef.current?.applyTorqueImpulse(torque, true);

    /** Camera */
    const bodyPosition = vanitasRef.current?.translation()! as THREE.Vector3;
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    // smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    // smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    // state.camera.position.copy(smoothedCameraPosition);
    // state.camera.lookAt(smoothedCameraTarget);
  });
  return (
    <RigidBody
      ref={vanitasRef}
      colliders="hull"
      position={[0, 2.35, -3]}
      friction={1}
      canSleep={false}
      //   mass={1}
    >
      <primitive castShadow object={vanitasModel.scene} />
    </RigidBody>
  );
};

export default Vanitas;
