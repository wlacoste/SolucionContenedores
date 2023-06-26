import { IContenedor } from "domain/IContenedor";

import EmpaquetadoService from "services/EmpaquetadoService";
export function getContenedorData(id: number, contenedores: IContenedor[]) {
  console.log("id buscando", id);
  console.log("contenedores dispo", contenedores);
  const contenedor = contenedores.filter((x) => x.id === id);

  return contenedor[0];
}

export async function getContenedoresData() {
  const { data } = await EmpaquetadoService.getContainers();

  return data;
}
