import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Navigate, Outlet } from "react-router-dom";
import PrincipalSkeleton from "skeletons/Principal";

const ProtectedRoute = () => {
  const { inProgress } = useMsal();
  const isAuth = useIsAuthenticated();

  if (inProgress !== InteractionStatus.None) {
    // Cuando inicia la aplicación verifica si existe alguna cuenta y está loggeado. Este proceso es asíncrono
    return <PrincipalSkeleton />;
  }

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
