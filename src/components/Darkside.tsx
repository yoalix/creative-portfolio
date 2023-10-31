import { useGLTF } from "@react-three/drei";
import React from "react";

const Darkside = () => {
  const darksideModel = useGLTF("./characters/darkside.glb");
  return (
    <primitive
      castShadow
      object={darksideModel.scene}
      scale={0.01}
      position-y={0.02}
    />
  );
};

export default Darkside;
