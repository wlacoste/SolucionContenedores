import { IBox } from "domain/IBox";
import { IContenedor } from "domain/IContenedor";

import { getContenedorData } from "app/contenedor";
import { useEffect, useState } from "react";

import Cube from "./cuboGeometry";

const posicionCanonica = (caja: IContenedor) => {
  const res = [caja.length / 2, caja.height / 2, caja.width / 2];

  return res;
};

interface IGetContenedor {
  contenedor: IContenedor;
}

export default function GetContenedor({ contenedor }: IGetContenedor) {
  // const [contenedor, setContenedor] = useState<IBox>({
  //   id: id,
  //   dim1: 0,
  //   dim2: 0,
  //   dim3: 0,
  //   coordX: 0,
  //   coordY: 0,
  //   coordZ: 0,
  //   packDimX: 0,
  //   packDimY: 0,
  //   packDimZ: 0,
  // });

  // useEffect(() => {
  //   async function getContenedor() {
  //     // const response = await getContenedorData(id);
  //     //invierto heigth con width asi la altura
  //     // se vuelve el eje vertical en el visualizador
  //     const cajaContenedor: IBox = {
  //       id: id,
  //       dim1: length,
  //       dim2: height,
  //       dim3: width,
  //       coordX: 0,
  //       coordY: 0,
  //       coordZ: 0,
  //       packDimX: length,
  //       packDimY: height,
  //       packDimZ: width,
  //     };

  //     setContenedor(cajaContenedor);
  //   }
  //   if (contenedor.id != 0) {
  //     getContenedor();
  //   }
  // }, []);

  return (
    <Cube
      esmaterial={false}
      position={posicionCanonica(contenedor)}
      scale={[contenedor.length, contenedor.height, contenedor.width]}
      wireframe={true}
    />
  );
}
