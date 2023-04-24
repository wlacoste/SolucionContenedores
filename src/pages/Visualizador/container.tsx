/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";

import styles from "./estilos.module.scss";
import Cube from "./caja";

export interface IBox {
  id: number;
  isPacked: boolean;
  dim1: number;
  dim2: number;
  dim3: number;
  coordX: number;
  coordY: number;
  coordZ: number;
  quantity: number;
  packDimX: number;
  packDimY: number;
  packDimZ: number;
  volume: number;
}

export interface IListaBox {
  cajas: IBox[];
}

function GeometryContainer(cajas: IListaBox) {
  const container: IBox = {
    id: 1,
    isPacked: true,
    dim1: 90,
    dim2: 90,
    dim3: 90,
    coordX: 0,
    coordY: 0,
    coordZ: 0,
    quantity: 1,
    packDimX: 90,
    packDimY: 90,
    packDimZ: 90,
    volume: 27000,
  };
  const getCajas = () => {
    return cajas.cajas.map((caja, i) => {
      return (
        <Cube
          key={i}
          esmaterial={true}
          position={posicionCanonica(caja)}
          scale={[caja.dim1, caja.dim2, caja.dim3]}
          wireframe={false}
        />
      );
    });
  };

  const getContainer = () => {
    return (
      <Cube
        esmaterial={false}
        position={posicionCanonica(container)}
        scale={[container.dim1, container.dim2, container.dim3]}
        wireframe={true}
      />
    );
  };

  const posicionCanonica = (caja: IBox) => {
    const res = [
      caja.coordX + caja.dim1 / 2,
      caja.coordY + caja.dim2 / 2,
      caja.coordZ + caja.dim3 / 2,
    ];

    return res;
  };

  return (
    <section className={styles.GeometryContainer}>
      <Canvas camera={{ position: [100, 100, 100], fov: 50 }}>
        <pointLight position={[10, 10, 10]} />
        <ambientLight />
        {getCajas()}
        {getContainer()}
        {/* <Cube position={[2.5, 2, 1.5]} scale={[5, 4, 3]} wireframe={true} />
        <Cube position={[1.2, 2, 0]} wireframe={true} /> */}
        <OrbitControls />
        <primitive object={new THREE.AxesHelper(100)} />
      </Canvas>
    </section>
  );
}

export default GeometryContainer;
