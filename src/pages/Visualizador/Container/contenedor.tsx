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
const posicionCanonicaContenedor = (caja: any) => {
  // const res: Vector3 = [caja.length / 2, caja.height / 2, caja.width / 2];
  const res = new Vector3(caja.largo / 2, caja.alto / 2, caja.ancho / 2);

  return res;
};

interface IGetContenedor {
  contenedor: IContenedor;
}

export default function GetContenedor({ contenedor }: any) {
  console.log("contenedor en getCOntenenedor");
  console.log(contenedor as IContenedor);
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
      position={posicionCanonicaContenedor(contenedor)}
      scale={1}
      onPointerOut={(event) => hover(false)}
      onPointerOver={(event) => hover(true)}
    >
      <boxGeometry args={[contenedor.largo, contenedor.alto, contenedor.ancho]} />

      <meshStandardMaterial
        color={hovered ? "red" : pB.color}
        opacity={pB.opacity}
        transparent={true}
        wireframe={pB.wireFrame}
      />
    </mesh>
  );
}
