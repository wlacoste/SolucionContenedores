import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import PaginaVisualizador from "pages/Visualizador/paginaVisualizador";

import PrincipalSkeleton from "../skeletons/Principal";

const PaginaVisualizador = lazy(() => import("pages/Visualizador/paginaVisualizador"));

import InteractionRoute from "./InteractionRoute";

export default function AppRoutes() {
  return (
    <Suspense fallback={<PrincipalSkeleton />}>
      <Routes>
        <Route element={<InteractionRoute />}>
          <Route index element={<PaginaVisualizador />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
