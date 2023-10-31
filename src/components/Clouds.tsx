import {
  Cloud,
  Clouds,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  Sky,
} from "@react-three/drei";
import {
  ReactThreeFiber,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/addons/objects/Water2.js";
const params = {
  color: "#ffffff",
  scale: 4,
  flowX: 1,
  flowY: 1,
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: ReactThreeFiber.Object3DNode<Water, typeof Water>;
    }
  }
}

extend({ Water });
const RClouds = () => {
  // put 'import { useControls } from 'leva' on top of the file
  const {
    azimuth,
    position: { x, y },
  } = useControls({ azimuth: 0.1, position: { x: 1, y: 1 } });
  // const water = new Water(waterGeometry, {
  //   color: params.color,
  //   scale: params.scale,
  //   flowDirection: new THREE.Vector2(params.flowX, params.flowY),
  //   textureWidth: 1024,
  //   textureHeight: 1024,
  // });

  // water.position.y = 1;
  // water.rotation.x = Math.PI * -0.5;
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(30000, 30000), []);

  const ref = useRef<Water>(null);
  const gl = useThree((state) => state.gl);
  const config = useMemo(
    () => ({
      textureWidth: 1000,
      textureHeight: 1000,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xeb8934,
      waterColor: 0x0064b5,
      distortionScale: 40,
      fog: false,
      format: gl.toneMapping,
    }),
    [waterNormals]
  );

  console.log(ref.current);
  // useFrame((state, delta) => {
  //   if (ref.current && ref.current.material.uniforms.time) {
  //     ref.current.material.uniforms.time.value += delta;
  //   }
  // });
  return (
    <>
      <Sky azimuth={azimuth} sunPosition={[x, y, 0]} />
      <Clouds
        material={THREE.MeshBasicMaterial}
        texture="./scenes/cloud1.png"
        position-y={200}
        limit={1000}
      >
        <Cloud
          segments={1000}
          volume={200}
          bounds={[1000, 1, 1000]}
          color="#E6DFDF"
          opacity={0.5}
        />
        <pointLight position={[0, 0, 0.5]} color="blue" />
      </Clouds>
      <mesh
        ref={ref}
        position={[0, -5, 0]}
        rotation-x={-Math.PI / 2}
        scale={1000}
      >
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={256}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={1}
          color="#00F7FF"
          // distortion={0.2}
          // distortionMap={waterNormals}
        />
        {/* <MeshTransmissionMaterial
          background={new THREE.Color("#00F7FF")}
          color={new THREE.Color("#00F7FF")}
          temporalDistortion={0.5}
          distortionScale={0.5}
          distortion={0.8}
          // {...config}
        /> */}
      </mesh>
      {/* <water
        ref={ref}
        args={[geom, config]}
        rotation-x={-Math.PI / 2}
        position={[-500, -5, -500]}
      /> */}
    </>
  );
};

export default RClouds;
