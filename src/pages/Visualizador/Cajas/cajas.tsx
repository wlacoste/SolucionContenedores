import { resultado } from "domain/IResultado";
import { IContenedor } from "domain/IContenedor";

import GeometryContainer from "pages/Visualizador/Container/container";
import { useAppSelector } from "store/hooks";
import { selectEmpaquetado } from "store/features/empaquetado";
import { useState } from "react";
import { Pagination } from "@mui/material";
import useContenedor from "app/contenedor/useContenedor";
import { getContenedorData } from "app/contenedor";

import ResultadoLog from "../ResultadoLog/resultadoLog";

import styles from "./estilos.module.scss";

const getContenedor = (id: number, contenedores: IContenedor[]) => {
  const contenedor = contenedores.filter((x) => x.id === id);

  return contenedor[0];
};

export default function Cajas() {
  const elementosPorPagina = 1;
  const [thisPage, setPaginaActual] = useState(1);

  const estado = useAppSelector(selectEmpaquetado);
  const estadoData = estado.data;
  const pageCount = Math.ceil(estadoData.length / elementosPorPagina);
  const indexUltimo = thisPage * elementosPorPagina;
  const indexPrimero = indexUltimo - elementosPorPagina;
  const actual = estadoData.slice(indexPrimero, indexUltimo);
  const contenedores = useContenedor();

  const handleChange = (e: any, p: any) => {
    setPaginaActual(p);
  };

  if (estado == undefined || estado.data.length == 0) {
    return (
      <div>
        <GeometryContainer
          cajas={[]}
          contenedor={{ id: 0, length: 0, height: 0, width: 0, volume: 0 }}
        />
      </div>
    );
  } else {
    const visualizacion = (x: resultado[][]) => {
      return x.map((soluciones, i) => {
        const solucion = soluciones.map((solucion, j) => {
          const containerId = solucion.containerID;
          const contenedor = getContenedorData(containerId, contenedores.data);

          return solucion.algorithmPackingResults.map((packingResult, k) => {
            return (
              <div key={`{${i} + ${j} + ${k}`} className={styles.solucionContenedor}>
                <GeometryContainer cajas={packingResult.packedItems} contenedor={contenedor} />
                <ResultadoLog contenedor={contenedor} packingResult={packingResult} />
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
