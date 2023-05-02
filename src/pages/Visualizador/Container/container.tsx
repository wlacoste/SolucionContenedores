/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { IBox } from "domain/IBox";
import { container } from "domain/IResultado";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { useControls } from "leva";

import styles from "./estilos.module.scss";
import Cube from "./cuboGeometry";
import GetContenedor from "./contenedor";

// const ContenedorComponente = React.lazy(() => import("./contenedor"));

export interface IListaBox {
  cajas: IBox[];
}

const getCajas = (cajas: IBox[]) => {
  return cajas.map((caja, i) => {
    console.log(caja);

    return (
      <Cube
        key={i}
        esmaterial={true}
        position={posicionCanonica(caja)}
        scale={[caja.packDimX, caja.packDimY, caja.packDimZ]}
        wireframe={false}
      />
    );
  });
};

export const posicionCanonica = (caja: IBox) => {
  const res = [
    caja.coordX + caja.packDimX / 2,
    caja.coordY + caja.packDimY / 2,
    caja.coordZ + caja.packDimZ / 2,
  ];

  return res;
};

interface IGeometryContainer {
  cajas: IBox[];
  containerId: number;
}

function GeometryContainer({ cajas, containerId }: IGeometryContainer) {
  // const color = useControls({
  //   value: "white",
  // });

  return (
    <div className={styles.divContainer}>
      <section className={styles.GeometryContainer}>
        <Canvas camera={{ position: [20, 50, 100], fov: 50 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          {getCajas(cajas)}
          {/* {getContenedor(containerId)} */}
          <GetContenedor id={containerId} />
          <gridHelper args={[500, 50, 0xeeeeee, 0xeeeeee]} />
          <axesHelper args={[5]} />
          <OrbitControls />
          <primitive object={new THREE.AxesHelper(500)} />
          {/* <color args={[color.value]} attach="background" /> */}
        </Canvas>
      </section>
    </div>
  );
}

export default GeometryContainer;
