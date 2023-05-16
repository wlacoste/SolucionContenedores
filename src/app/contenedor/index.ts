import { IContenedor } from "domain/IContenedor";

import EmpaquetadoService from "services/EmpaquetadoService";
export function getContenedorData(id: number, contenedores: IContenedor[]) {
  const contenedor = contenedores.filter((x) => x.id === id);

  return contenedor[0];
}

export async function getContenedoresData() {
  const { data } = await EmpaquetadoService.getContainers();

  return data;
}
