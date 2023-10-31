import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import React, { useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { GrandPiano } from "./GrandPiano";

const Piano = () => {
  const [passion] = useState(() => new Audio("./piano/Passion.mp3"));
  const collisionEnter = (event) => {
    console.log("entered");
    passion.currentTime = 0;
    passion.volume = 1;
    passion.play();
  };
  const collisionExit = (event) => {
    console.log("exited");
    passion.pause();
  };
  const { x, y } = useControls({ x: { value: 0, step: 1 }, y: 0 });
  const angle = degToRad(69);
  return (
    <>
      <RigidBody
        friction={0}
        colliders={false}
        onIntersectionEnter={collisionEnter}
        onIntersectionExit={collisionExit}
        type="fixed"
        rotation-y={angle}
      >
        <GrandPiano scale={0.001} />

        <CuboidCollider sensor args={[1, 1, 1]} />
      </RigidBody>{" "}
    </>
  );
};

export default Piano;
