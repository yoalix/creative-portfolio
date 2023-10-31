import { OrbitControls, Sky } from "@react-three/drei";
import React from "react";
import VentusVanitasScene from "./VentusVanitasScene";
import Vanitas from "./Vanitas";
import Darkside from "./Darkside";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Aqua from "./AquaController";
import Clouds from "./Clouds";
import * as THREE from "three";
import Piano from "./PianoController";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import AquaController from "./AquaController";

const Scene = () => {
  // put 'import { useControls } from 'leva' on top of the file
  const { lt, ls, height, opacity } = useControls({
    lt: 0.7,
    ls: 1.1,
    height: 300,
    opacity: 1.1,
  });
  return (
    <>
      <Perf position="top-left" />
      {/* <color attach="background" args={["#202020"]} /> */}
      <OrbitControls />
      <directionalLight position={[0, 10, 10]} intensity={5} />
      <hemisphereLight />
      <ambientLight intensity={0.5} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={lt}
          luminanceSmoothing={ls}
          height={height}
          opacity={opacity}
        />
      </EffectComposer>

      <Physics debug>
        <Clouds />
        <VentusVanitasScene />
        {/* <Vanitas /> */}
        <Aqua />
        {/* <Darkside /> */}
        <Piano />
      </Physics>
    </>
  );
};

export default Scene;
