import { IBox } from "domain/IBox";
import { container } from "domain/IResultado";

import { getContenedorData } from "app/empaquetado";
import { useEffect, useState } from "react";

import { posicionCanonica } from "./container";
import Cube from "./cuboGeometry";

interface IContenedor {
  id: number;
}
export default function getContenedor({ id }: IContenedor) {
  const [contenedor, setContenedor] = useState<IBox>({
    id: id,
    dim1: 0,
    dim2: 0,
    dim3: 0,
    coordX: 0,
    coordY: 0,
    coordZ: 0,
  });

  useEffect(() => {
    async function getContenedor() {
      const response = await getContenedorData(id);
      const cajaContenedor: IBox = {
        id: response.id,
        dim1: response.length,
        dim2: response.width,
        dim3: response.height,
        coordX: 0,
        coordY: 0,
        coordZ: 0,
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
