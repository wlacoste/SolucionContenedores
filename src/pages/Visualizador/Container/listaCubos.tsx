import { IBox } from "domain/IBox";

import { useControls } from "leva";
import { useMemo } from "react";

import Cube from "./cubo";

const getColor = (i: number) => {
  const colores = [
    "#6B9FFF",
    "#EF67F5",
    "#6DE896",
    "#FFF36B",
    "#F58D50",
    "#FCC692",
    "#D4D277",
    "#8FEBB7",
    "#7694D6",
    "#EE74F7",
  ];

  if (i >= colores.length) {
    i = 0;
  }

  return colores[i];
};

export default function listaCubos(cajas: IBox[]) {
  const options = useMemo(() => {
    return {
      material: false,
      // color: { value: "#0095ba" },
      opacidad: { value: 0.7, min: 0, max: 1, step: 0.1 },
      ior: { value: 1.33, min: 1, max: 2.333, step: 0.01 },
      transmision: { value: 0, min: 0, max: 1, step: 0.01 }, // Add transparency
      rugosidad: { value: 0, min: 0, max: 1, step: 0.01 }, // Add transparency
      grosor: { value: 10, min: 0, max: 20, step: 0.5 },
    };
  }, []);
  const pB = useControls("Paquetes", options);

  return cajas.map((caja, i) => {
    const color = getColor(caja.id); // armar a futuro un getcolor con algun hash

    return (
      <Cube
        key={i}
        color={color}
        esmaterial={pB.material}
        ior={pB.ior}
        nombre={caja.id}
        opacity={pB.opacidad}
        position={posicionCanonica(caja)}
        roughness={pB.rugosidad}
        scale={[caja.packDimX - 0.1, caja.packDimY - 0.1, caja.packDimZ - 0.1]}
        thickness={pB.grosor}
        transmission={pB.transmision}
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
