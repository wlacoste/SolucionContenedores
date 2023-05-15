/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { IBox } from "domain/IBox";
import { IContenedor } from "domain/IContenedor";

import { useControls } from "leva";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";
import { DoubleSide } from "three";
import { presetsObj, PresetsType } from "@react-three/drei/helpers/environment-assets";

import GetContenedor from "./contenedor";
import styles from "./estilos.module.scss";
import listaCubos from "./listaCubos";

export interface IListaBox {
  cajas: IBox[];
}

interface IGeometryContainer {
  cajas: IBox[];
  contenedor: IContenedor;
}

function GeometryContainer({ cajas, contenedor }: IGeometryContainer) {
  const options = useMemo(() => {
    return {
      intensity: { value: 1, min: 0, max: 10, step: 0.5 },
      x: { value: 0, min: -100, max: 100, step: 5 },
      y: { value: 0, min: -100, max: 100, step: 5 },
      z: { value: 0, min: -100, max: 100, step: 5 },
      ambientLightOn: { value: 1, min: 0, max: 2, step: 0.1 },
      background: false,
      selectedOption: {
        value: "sunset",
        options: [
          "sunset",
          "dawn",
          "night",
          "warehouse",
          "forest",
          "apartment",
          "studio",
          "city",
          "park",
          "lobby",
        ],
        label: "Fondo",
        row: false,
      },
    };
  }, []);
  const pB = useControls("Luz", options);

  return (
    <div className={styles.divContainer}>
      <section className={styles.GeometryContainer}>
        <Canvas shadows camera={{ position: [20, 50, 100], fov: 50 }}>
          <Environment
            background={pB.background}
            blur={0.1}
            preset={pB.selectedOption as keyof typeof presetsObj}
          />

          {/* <pointLight intensity={pB.intensity} position={[pB.x, pB.z, pB.y]} /> */}
          {/* <pointLight position={[-50, 100, -50]} /> */}
          <directionalLight
            castShadow
            intensity={pB.intensity}
            position={[pB.x, pB.z, pB.y]}
            shadow-camera-bottom={-10}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
          />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <ambientLight intensity={pB.ambientLightOn} />
          {listaCubos(cajas)}
          <GetContenedor contenedor={contenedor} />
          <gridHelper args={[500, 50, 0xeeeeee, 0xeeeeee]} />
          <axesHelper args={[5]} />
          <OrbitControls />
          <primitive object={new THREE.AxesHelper(500)} />
        </Canvas>
      </section>
    </div>
  );
}

export default GeometryContainer;
