/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { IBox } from "domain/IBox";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";

import styles from "./estilos.module.scss";
import Cube from "./cuboGeometry";

export interface IListaBox {
  cajas: IBox[];
}

function GeometryContainer(cajas: IListaBox) {
  const container: IBox = {
    ID: 1,
    IsPacked: true,
    Dim1: 40,
    Dim2: 20,
    Dim3: 50,
    CoordX: 0,
    CoordY: 0,
    CoordZ: 0,
    Quantity: 1,
    PackDimX: 90,
    PackDimY: 90,
    PackDimZ: 90,
    Volume: 27000,
  };
  const getCajas = () => {
    return cajas.cajas.map((caja, i) => {
      return (
        <Cube
          key={i}
          esmaterial={true}
          position={posicionCanonica(caja)}
          scale={[caja.Dim1, caja.Dim3, caja.Dim2]}
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
        scale={[container.Dim1, container.Dim3, container.Dim2]}
        wireframe={true}
      />
    );
  };

  const posicionCanonica = (caja: IBox) => {
    const res = [
      caja.CoordX + caja.Dim1 / 2,
      caja.CoordY + caja.Dim3 / 2,
      caja.CoordZ + caja.Dim2 / 2,
    ];

    return res;
  };

  return (
    <div className={styles.divContainer}>
      <section className={styles.GeometryContainer}>
        <Canvas camera={{ position: [100, 100, 100], fov: 50 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          {getCajas()}
          {getContainer()}
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
