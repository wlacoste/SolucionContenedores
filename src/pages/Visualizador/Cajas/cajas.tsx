import { resultado } from "domain/IResultado";
import { PackingResults } from "domain/IPackingResult";

import GeometryContainer, { IListaBox } from "pages/Visualizador/Container/container";
import { useAppSelector } from "store/hooks";
import { selectEmpaquetado } from "store/features/empaquetado";

import ResultadoLog from "../ResultadoLog/resultadoLog";

import styles from "./estilos.module.scss";

export default function Cajas() {
  const estado = useAppSelector(selectEmpaquetado);
  const estadoData = estado.data;

  if (estado == undefined || estado.data.length == 0) {
    return (
      <div>
        <GeometryContainer cajas={[]} containerId={0} />
      </div>
    );
  } else {
    const visualizacion = estadoData.map((soluciones, i) => {
      const solucion = soluciones.map((solucion, j) => {
        return solucion.algorithmPackingResults.map((packingResult, k) => {
          console.log(packingResult.packedItems);

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

    return <div>{visualizacion}</div>;
  }
}
