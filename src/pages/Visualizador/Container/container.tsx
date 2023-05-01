/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { IBox } from "domain/IBox";
import { container } from "domain/IResultado";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";
import { getContenedorData } from "app/empaquetado";
import React from "react";

import styles from "./estilos.module.scss";
import Cube from "./cuboGeometry";
import getContenedor from "./contenedor";

const ContenedorComponente = React.lazy(() => import("./contenedor"));

export interface IListaBox {
  cajas: IBox[];
}

const getCajas = (cajas: IBox[]) => {
  return cajas.map((caja, i) => {
    return (
      <Cube
        key={i}
        esmaterial={true}
        position={posicionCanonica(caja)}
        scale={[caja.dim1, caja.dim3, caja.dim2]}
        wireframe={false}
      />
    );
  });
};

export const posicionCanonica = (caja: IBox) => {
  const res = [
    caja.coordX + caja.dim1 / 2,
    caja.coordY + caja.dim3 / 2,
    caja.coordZ + caja.dim2 / 2,
  ];

  return res;
};

const getContainer = (container: IBox) => {
  return (
    <Cube
      esmaterial={false}
      position={posicionCanonica(container)}
      scale={[container.dim1, container.dim3, container.dim2]}
      wireframe={true}
    />
  );
};

const containerEjemplo = () => {
  const container: IBox = {
    id: 1,
    isPacked: true,
    dim1: 40,
    dim2: 20,
    dim3: 50,
    coordX: 0,
    coordY: 0,
    coordZ: 0,
    quantity: 1,
    packDimX: 90,
    packDimY: 90,
    packDimZ: 90,
    volume: 27000,
  };

  return container;
};

interface IGeometryContainer {
  cajas: IBox[];
  containerId: number;
}

function GeometryContainer({ cajas, containerId }: IGeometryContainer) {
  return (
    <div className={styles.divContainer}>
      <section className={styles.GeometryContainer}>
        <Canvas camera={{ position: [100, 100, 100], fov: 50 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          {getCajas(cajas)}
          {/* {getContenedor(containerId)} */}
          <ContenedorComponente id={containerId} />
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
