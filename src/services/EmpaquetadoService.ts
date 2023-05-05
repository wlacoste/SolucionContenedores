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
    console.log("request");
    console.log(paquetes.paquete);
    const promise = axios.post(process.env.REACT_APP_API_PACKING!, paquetes.paquete);

    return promise;
  }

  getContainerData(id: number) {
    const promise = axios.get(process.env.REACT_APP_API_CONTAINER! + id);

    return promise;
  }
  getContainers() {
    const promise = axios.get(process.env.REACT_APP_API_CONTAINER!);

    return promise;
  }
}
const EmpaquetadoService = new _EmpaquetadoService();

export default EmpaquetadoService;
