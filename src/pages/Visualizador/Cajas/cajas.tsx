import { resultado } from "domain/IResultado";
import { PackingResults } from "domain/IPackingResult";

import GeometryContainer, { IListaBox } from "pages/Visualizador/Container/container";
import { useAppSelector } from "store/hooks";
import { selectEmpaquetado } from "store/features/empaquetado";

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
          return (
            <div key={i + j + k}>
              <GeometryContainer
                cajas={packingResult.packedItems}
                containerId={solucion.containerID}
              />
            </div>
          );
        });
      });

      return solucion;
    });

    return <div>{visualizacion}</div>;
  }
}
