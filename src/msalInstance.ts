import { PublicClientApplication } from "@azure/msal-browser";
import {
  addDefaultCallbacks,
  addToStorageCallback,
  addApmEventCallback,
} from "@architecture-it/azure-b2c/eventCallbacks";
import { msalConfig } from "@architecture-it/azure-b2c/config";

import rum from "./monitor";

/**
 * Debe ser istanciado fuera del ciclo de vida de los componentes para evitar reisntanciar cuando rerenderice la app
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const instance = new PublicClientApplication(msalConfig);

addDefaultCallbacks(instance);

instance.addEventCallback(addToStorageCallback());

instance.addEventCallback(addApmEventCallback(rum));

export const msalInstance = instance;
