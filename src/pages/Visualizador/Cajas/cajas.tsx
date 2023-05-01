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
        <GeometryContainer cajas={[]} />
      </div>
    );
  } else {
    const visualizacion = estadoData.map((soluciones, i) => {
      const solucion = soluciones.map((solucion, j) => {
        return solucion.algorithmPackingResults.map((packingResult, k) => {
          return <GeometryContainer key={i + j + k} cajas={packingResult.packedItems} />;
        });
      });

      return solucion;
    });

    return <div>{visualizacion}</div>;
  }
}
