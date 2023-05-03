import { resultado } from "domain/IResultado";

import GeometryContainer from "pages/Visualizador/Container/container";
import { useAppSelector } from "store/hooks";
import { selectEmpaquetado } from "store/features/empaquetado";
import { useState } from "react";
import { Pagination } from "@mui/material";

import ResultadoLog from "../ResultadoLog/resultadoLog";

import styles from "./estilos.module.scss";

export default function Cajas() {
  const elementosPorPagina = 1;
  const [thisPage, setPaginaActual] = useState(1);

  const estado = useAppSelector(selectEmpaquetado);
  const estadoData = estado.data;
  const pageCount = Math.ceil(estadoData.length / elementosPorPagina);
  const indexUltimo = thisPage * elementosPorPagina;
  const indexPrimero = indexUltimo - elementosPorPagina;
  const actual = estadoData.slice(indexPrimero, indexUltimo);

  const handleChange = (e: any, p: any) => {
    setPaginaActual(p);
  };

  if (estado == undefined || estado.data.length == 0) {
    return (
      <div>
        <GeometryContainer cajas={[]} containerId={0} />
      </div>
    );
  } else {
    const visualizacion = (x: resultado[][]) => {
      return x.map((soluciones, i) => {
        const solucion = soluciones.map((solucion, j) => {
          return solucion.algorithmPackingResults.map((packingResult, k) => {
            return (
              <div key={i + j + k} className={styles.solucionContenedor}>
                <GeometryContainer
                  cajas={packingResult.packedItems}
                  containerId={solucion.containerID}
                />
                <ResultadoLog containerId={solucion.containerID} packingResult={packingResult} />
              </div>
            );
          });
        });

        return solucion;
      });
    };

    return (
      <div>
        <Pagination count={pageCount} page={thisPage} onChange={handleChange} />
        <section className={styles.cardContainer}>{visualizacion(actual)}</section>
      </div>
    );
  }
}
