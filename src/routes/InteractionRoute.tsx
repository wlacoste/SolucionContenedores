import { InteractionStatus } from "@azure/msal-browser";
import { Outlet } from "react-router-dom";

const InteractionRoute = () => {
  //llamar a los hooks de Azure B2C
  const { inProgress } = { inProgress: InteractionStatus.None };

  if (inProgress !== InteractionStatus.None) {
    // Cuando inicia la aplicación verifica si existe alguna cuenta y está loggeado. Este proceso es asíncrono
    // llamar al PrincipalSkeleton
    return <>Implementar el Skeleton</>;
  }

  return <Outlet />;
};

export default InteractionRoute;
