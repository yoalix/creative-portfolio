import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, useGLTF } from "@react-three/drei";
import VentusVanitasScene from "./VentusVanitasScene";
import Scene from "./Scene";

const Controls = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
];

function RCanvas() {
  return (
    <KeyboardControls map={Controls}>
      <Canvas shadows>
        <Scene />
      </Canvas>
    </KeyboardControls>
  );
}

export default RCanvas;
