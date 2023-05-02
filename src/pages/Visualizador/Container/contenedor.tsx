import { IBox } from "domain/IBox";
import { container } from "domain/IResultado";

import { getContenedorData } from "app/empaquetado";
import { useEffect, useState } from "react";

import Cube from "./cuboGeometry";

interface IContenedor {
  id: number;
}

const posicionCanonica = (caja: IBox) => {
  const res = [
    caja.coordX + caja.packDimX / 2,
    caja.coordY + caja.packDimZ / 2,
    caja.coordZ + caja.packDimY / 2,
  ];

  return res;
};

export default function GetContenedor({ id }: IContenedor) {
  const [contenedor, setContenedor] = useState<IBox>({
    id: id,
    dim1: 0,
    dim2: 0,
    dim3: 0,
    coordX: 0,
    coordY: 0,
    coordZ: 0,
    packDimX: 0,
    packDimY: 0,
    packDimZ: 0,
  });

  useEffect(() => {
    async function getContenedor() {
      const response = await getContenedorData(id);
      const cajaContenedor: IBox = {
        id: response.id,
        dim1: response.length,
        dim2: response.height,
        dim3: response.width,
        coordX: 0,
        coordY: 0,
        coordZ: 0,
        packDimX: response.length,
        packDimY: response.height,
        packDimZ: response.width,
      };

      setContenedor(cajaContenedor);
    }
    if (contenedor.id != 0) {
      getContenedor();
    }
  }, []);

  return (
    <Cube
      esmaterial={false}
      position={posicionCanonica(contenedor)}
      scale={[contenedor.dim1, contenedor.dim3, contenedor.dim2]}
      wireframe={true}
    />
  );
}
