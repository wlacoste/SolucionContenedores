import { FormValues } from "domain/FormValues";

import EmpaquetadoService from "services/EmpaquetadoService";

export async function calcularEmpaquetado(paquetes: FormValues) {
  const { data } = await EmpaquetadoService.postEmpaquetado(paquetes);

  return data;
}
