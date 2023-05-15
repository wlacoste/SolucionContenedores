import { IBox } from "domain/IBox";

import { useControls } from "leva";
import { useMemo } from "react";

import Cube from "./cubo";

export default function listaCubos(cajas: IBox[]) {
  const options = useMemo(() => {
    return {
      esMaterial: false,
      color: { value: "#0095ba" },
      opacity: { value: 0.7, min: 0, max: 1, step: 0.1 },
      ior: { value: 1.33, min: 1, max: 2.333, step: 0.01 },
      transmission: { value: 0, min: 0, max: 1, step: 0.01 }, // Add transparency
      roughness: { value: 0.25, min: 0, max: 1, step: 0.01 }, // Add transparency
      thickness: { value: 10, min: 0, max: 20, step: 0.5 },
    };
  }, []);
  const pB = useControls("Paquetes", options);

  return cajas.map((caja, i) => {
    return (
      <Cube
        key={i}
        color={pB.color}
        esmaterial={pB.esMaterial}
        ior={pB.ior}
        opacity={pB.opacity}
        position={posicionCanonica(caja)}
        roughness={pB.roughness}
        scale={[caja.packDimX - 0.1, caja.packDimY - 0.1, caja.packDimZ - 0.1]}
        thickness={pB.thickness}
        transmission={pB.transmission}
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
