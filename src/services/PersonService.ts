import type { PersonId, IPerson } from "domain/Person";

import { ServiceBase, type ICommonOptions } from "@architecture-it/core";
import env from "@architecture-it/react-env";
import { msalInstance } from "msalInstance";
import axios from "axios";
import { addResponseInterceptorRefreshToken } from "@architecture-it/azure-b2c";

const BASE_URL = env("API") + "person";

const data: IPerson[] = [
  {
    id: "1",
    name: "Gonzalo",
    lastName: "Ferreyra",
  },
  {
    id: "2",
    name: "Antony",
    lastName: "Fagundez",
  },
  {
    id: "3",
    name: "Ana",
    lastName: "Galli",
  },
  {
    id: "4",
    name: "Danilo",
    lastName: "Ceretti",
  },
];

class _PersonService extends ServiceBase {
  constructor() {
    super(BASE_URL);

    //util for refresh token
    addResponseInterceptorRefreshToken(this.client, msalInstance, axios);
  }
  // implementar getPersons
  getAll = ({ signal }: ICommonOptions) =>
    new Promise<{ data: IPerson[] }>((resolve, _reject) => {
      return resolve({ data });
    });
}

const PersonService = new _PersonService();

export default PersonService;
