import { IBox } from "domain/IBox";

import Cube from "./cubo";

export default function getCajas(cajas: IBox[]) {
  return cajas.map((caja, i) => {
    return (
      <Cube
        key={i}
        esmaterial={true}
        position={posicionCanonica(caja)}
        scale={[caja.packDimX - 0.05, caja.packDimY - 0.05, caja.packDimZ - 0.05]}
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
