import { IBox } from "domain/IBox";

import { useControls } from "leva";
import { useMemo } from "react";

import Cube from "./cubo";

const getColor = (i: number) => {
  let c = i;
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

  if (c >= colores.length) {
    c = 0;
  }

  return colores[c];
};

const getControls = (idCaja: number[]) => {
  //   const cantCajasDiferentes = countUnique(idCaja);
  //   const controles = [];

  //   for (let i = 0; i < cantCajasDiferentes; ++i) {
  //     useControls(`Paquetes ${i} `, { color: getColor(i) });
  //   }

  //   return controles;
  // };
  return [
    useControls("Paquetes 1", { color: "#6B9FFF" }),
    useControls("Paquetes 2", { color: "#EF67F5" }),
    useControls("Paquetes 3", { color: "#6DE896" }),
    useControls("Paquetes 4", { color: "#FFF36B" }),
    useControls("Paquetes 5", { color: "#F58D50" }),
  ];
};

function countUnique(iterable: number[]) {
  return new Set(iterable).size;
}

export default function listaCubos(cajas: IBox[]) {
  const options = useMemo(() => {
    return {
      material: false,
      opacidad: { value: 0.7, min: 0, max: 1, step: 0.1 },
      ior: { value: 1.33, min: 1, max: 2.333, step: 0.01 },
      transmision: { value: 0, min: 0, max: 1, step: 0.01 },
      rugosidad: { value: 0, min: 0, max: 1, step: 0.01 },
      grosor: { value: 10, min: 0, max: 20, step: 0.5 },
    };
  }, []);
  const pB = useControls("Paquetes", options);
  const colorControls = getControls(cajas.map((caja) => caja.id));

  //TODO generar un use memo que programaticamente defina la cantindad de valores(paquetes) y usar solo el mismo hook
  return cajas.map((caja, i) => {
    return (
      <Cube
        key={i}
        color={colorControls[caja.id - 1].color}
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
