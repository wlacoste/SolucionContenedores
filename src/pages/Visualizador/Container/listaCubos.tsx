import { IBox } from "domain/IBox";

import Cube from "./cuboGeometry";

export default function getCajas(cajas: IBox[]) {
  return cajas.map((caja, i) => {
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
}

export const posicionCanonica = (caja: IBox) => {
  const res = [
    caja.coordX + caja.packDimX / 2,
    caja.coordY + caja.packDimY / 2,
    caja.coordZ + caja.packDimZ / 2,
  ];

  return res;
};
