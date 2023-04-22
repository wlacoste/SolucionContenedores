/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Vector3 } from "three";

import styles from "./estilos.module.scss";
import Cube from "./caja";

interface IBox {
  position: [number, number, number];
  dimension: [number, number, number];
}

interface IListaBox {
  cajas: IBox[];
}

function GeometryContainer() {
  const cajas: IBox[] = [
    {
      position: [0, 0, 0],
      dimension: [3, 3, 3],
    },
    {
      position: [0, 0, 3],
      dimension: [3, 3, 3],
    },
    {
      position: [0, 0, 6],
      dimension: [3, 3, 3],
    },
    {
      position: [0, 0, 9],
      dimension: [5, 5, 5],
    },
  ];

  const container: IBox = {
    position: [0, 0, 0],
    dimension: [15, 15, 15],
  };
  const getCajas = () => {
    return cajas.map((caja, i) => {
      return (
        <Cube
          key={i}
          esmaterial={true}
          position={posicionCanonica(caja)}
          scale={caja.dimension}
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
        scale={container.dimension}
        wireframe={true}
      />
    );
  };

  const posicionCanonica = ({ position, dimension }: IBox) => {
    const res = [
      position[0] + dimension[0] / 2,
      position[1] + dimension[1] / 2,
      position[2] + dimension[2] / 2,
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
