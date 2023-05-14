import { IContenedor } from "domain/IContenedor";

import Cube from "./cubo";

const posicionCanonica = (caja: IContenedor) => {
  const res = [caja.length / 2, caja.height / 2, caja.width / 2];

  return res;
};

interface IGetContenedor {
  contenedor: IContenedor;
}

export default function GetContenedor({ contenedor }: IGetContenedor) {
  return (
    <Cube
      esmaterial={false}
      position={posicionCanonica(contenedor)}
      scale={[contenedor.length, contenedor.height, contenedor.width]}
      wireframe={true}
    />
  );
}
