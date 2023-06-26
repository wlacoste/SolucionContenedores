import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PrincipalSkeleton from "../skeletons/Principal";

const PaginaVisualizador = lazy(() => import("pages/Visualizador/paginaVisualizador"));

import InteractionRoute from "./InteractionRoute";

export default function AppRoutes() {
  return (
    <Suspense fallback={<PrincipalSkeleton />}>
      <Routes>
        <Route element={<InteractionRoute />}>
          {/* <Route index element={<PaginaVisualizador />} /> */}
          <Route index element={<Hola />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export function Hola() {
  return <h1>Hola mundosqui</h1>;
}
