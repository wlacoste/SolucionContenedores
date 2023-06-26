/* eslint-disable react/no-unknown-property */
import { IContenedor } from "domain/IContenedor";

import { useControls } from "leva";
import { useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

import Cube from "./cubo";

const posicionCanonica = (caja: IContenedor) => {
  // const res: Vector3 = [caja.length / 2, caja.height / 2, caja.width / 2];
  const res = new Vector3(caja.length / 2, caja.height / 2, caja.width / 2);

  return res;
};

interface IGetContenedor {
  contenedor: IContenedor;
}

export default function GetContenedor({ contenedor }: any) {
  const options = useMemo(() => {
    return {
      wireFrame: true,
      color: { value: "#001f47" },
      opacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
    };
  }, []);
  const pB = useControls("Contenedor", options);

  const [hovered, hover] = useState(false);

  return (
    <mesh
      position={posicionCanonica(contenedor)}
      scale={1}
      onPointerOut={(event) => hover(false)}
      onPointerOver={(event) => hover(true)}
    >
      <boxGeometry args={[contenedor.length, contenedor.height, contenedor.width]} />

      <meshStandardMaterial
        color={hovered ? "red" : pB.color}
        opacity={pB.opacity}
        transparent={true}
        wireframe={pB.wireFrame}
      />
    </mesh>
  );
}
