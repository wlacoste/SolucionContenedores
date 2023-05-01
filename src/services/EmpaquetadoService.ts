import { FormValues } from "domain/FormValues";

import { ServiceBase, type ICommonOptions } from "@architecture-it/core";
import env from "@architecture-it/react-env";
import { msalInstance } from "msalInstance";
import axios from "axios";
import { addResponseInterceptorRefreshToken } from "@architecture-it/azure-b2c";

const BASE_URL = env("API") + "pedido";

class _EmpaquetadoService extends ServiceBase {
  constructor() {
    super(BASE_URL);
    //util for refresh token
    addResponseInterceptorRefreshToken(this.client, msalInstance, axios);
  }

  postEmpaquetado(paquetes: FormValues) {
    const promise = axios.post("http://localhost:5000/api/v1/Empaquetado", paquetes.paquete);

    return promise;
  }

  getContainerData(id: number) {
    const promise = axios.get("http://localhost:5000/api/v1/Container/" + id);

    return promise;
  }
}
const EmpaquetadoService = new _EmpaquetadoService();

export default EmpaquetadoService;
