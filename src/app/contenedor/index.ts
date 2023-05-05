import { IContenedor } from "domain/IContenedor";

import EmpaquetadoService from "services/EmpaquetadoService";
export function getContenedorData(id: number, contenedores: IContenedor[]) {
  const contenedor = contenedores.filter((x) => x.id === id);

  console.log("contenedores: tiene que haber match con " + id);
  console.log(contenedores);
  console.log("resultado  " + contenedor[0]);

  return contenedor[0];
}

export async function getContenedoresData() {
  const { data } = await EmpaquetadoService.getContainers();

  return data;
}
