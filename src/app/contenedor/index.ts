import { IContenedor } from "domain/IContenedor";

// import EmpaquetadoService from "services/EmpaquetadoService";
export function getContenedorData(id: number, contenedores: IContenedor[]) {
  const contenedor = contenedores.filter((x) => x.id === id);

  if (contenedor.length === 0) {
    return { id: 1, length: 10, height: 10, width: 10, volume: 10 } as IContenedor;
  }

  return contenedor[0];
}
