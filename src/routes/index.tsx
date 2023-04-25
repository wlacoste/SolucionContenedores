import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Cube from "pages/Visualizador";
import Cajas from "pages/Visualizador/Cajas";
import Container from "pages/Visualizador/Container/container";
import PaginaVisualizador from "pages/Visualizador/paginaVisualizador";

import PrincipalSkeleton from "../skeletons/Principal";

const Home = lazy(() => import("../pages/Home"));
const User = lazy(() => import("../pages/User"));
const Person = lazy(() => import("../pages/Person"));

import ProtectedRoute from "./ProtectedRoute";
import InteractionRoute from "./InteractionRoute";

export default function AppRoutes() {
  return (
    <Suspense fallback={<PrincipalSkeleton />}>
      <Routes>
        <Route element={<InteractionRoute />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<User />} path="user" />
            <Route element={<Person />} path="person" />
          </Route>
          <Route element={<PaginaVisualizador />} path="caja" />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
