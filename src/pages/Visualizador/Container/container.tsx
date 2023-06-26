/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { IBox } from "domain/IBox";
import { IContenedor } from "domain/IContenedor";

import { extend, Object3DNode } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Leva, useControls } from "leva";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";
import { presetsObj } from "@react-three/drei/helpers/environment-assets";
import { FullTheme, LevaCustomTheme } from "leva/dist/declarations/src/styles";

import almendra from "./Almendra_Bold.json";
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

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
const creadorTexto = (texto: string) => {
  const font = new FontLoader().parse(almendra);

  return (
    <mesh>
      <textGeometry args={[texto, { font, size: 1, height: 0.1 }]} />
      <meshLambertMaterial attach="material" color={"gold"} />
    </mesh>
  );
};

function GeometryContainer({ cajas, contenedor }: IGeometryContainer) {
  console.log("contenedores en geometry container", contenedor);
  const options = useMemo(() => {
    return {
      intensity: { value: 0, min: 0, max: 10, step: 0.5 },
      x: { value: 0, min: -100, max: 100, step: 5 },
      y: { value: 0, min: -100, max: 100, step: 5 },
      z: { value: 100, min: -100, max: 100, step: 5 },
      ambientLightOn: { value: 0, min: 0, max: 1, step: 1 },
      background: false,
      selectedOption: {
        value: "warehouse",
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

  const tema: LevaCustomTheme = {
    colors: {
      elevation1: "#d71920",
      elevation2: "#fcfdff",
      elevation3: "#e1e3e8",
      accent1: "#dbdbdb",
      accent2: "#ff3939",
      accent3: "#fafafa",
      highlight1: "#ffffff",
      highlight2: "#404248",
      highlight3: "#655656",
      vivid1: "#ffcc00",
    },
  };

  return (
    <div className={styles.divContainer}>
      <Leva
        collapsed // default = false, when true the GUI is collpased
        theme={tema}
      />
      <section className={styles.GeometryContainer}>
        <Canvas shadows camera={{ position: [20, 50, 100], fov: 50 }}>
          {/* <Environment
            background={pB.background}
            blur={0.1}
            // preset={pB.selectedOption as keyof typeof presetsObj}
            preset={"sunset"}
          /> */}

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
          {/* <ambientLight intensity={pB.ambientLightOn} /> */}
          {listaCubos(cajas)}
          <GetContenedor contenedor={contenedor} />
          <gridHelper args={[500, 50, 0xee0000, 0xeeeeee]} />
          <axesHelper args={[5]} />
          <OrbitControls />
          <primitive object={new THREE.AxesHelper(500)} />
        </Canvas>
      </section>
    </div>
  );
}

export default GeometryContainer;
