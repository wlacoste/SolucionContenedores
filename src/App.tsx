import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import Alert from "components/Alert";

import Main from "./layout/Main";
import AppRoutes from "./routes";

interface IAppProps {
  msalInstance: IPublicClientApplication;
}

export default function App({ msalInstance }: IAppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <Main>
        <AppRoutes />
      </Main>
      <Alert />
    </MsalProvider>
  );
}
