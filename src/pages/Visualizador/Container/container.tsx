/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unknown-property */
import { IBox } from "domain/IBox";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import GetContenedor from "./contenedor";
import styles from "./estilos.module.scss";
import getCajas from "./listaCubos";

export interface IListaBox {
  cajas: IBox[];
}

interface IGeometryContainer {
  cajas: IBox[];
  containerId: number;
}

function GeometryContainer({ cajas, containerId }: IGeometryContainer) {
  return (
    <div className={styles.divContainer}>
      <section className={styles.GeometryContainer}>
        <Canvas camera={{ position: [20, 50, 100], fov: 50 }}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          {getCajas(cajas)}
          <GetContenedor id={containerId} />
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
