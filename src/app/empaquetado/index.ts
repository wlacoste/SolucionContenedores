import { FormValues } from "domain/FormValues";

import EmpaquetadoService from "services/EmpaquetadoService";

export async function calcularEmpaquetado(paquetes: FormValues) {
  const { data } = await EmpaquetadoService.postEmpaquetado(paquetes);

  return data;
}
export async function getContenedorData(id: number) {
  const { data } = await EmpaquetadoService.getContainerData(id);

  return data;
}
