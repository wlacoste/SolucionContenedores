import { resultado } from "domain/IResultado";
import { PackingResults } from "domain/IPackingResult";

import GeometryContainer, { IListaBox } from "pages/Visualizador/Container/container";

import { resultadoAlgo2 as resultadoAlgo } from "./result";

export default function Cajas() {
  const resultadoAlgoritmo: resultado[] = resultadoAlgo;

  const getCajas = (res: resultado) => {
    return res.AlgorithmPackingResults;
  };

  const getPackingResult = (res: PackingResults) => {
    return res.PackedItems;
  };

  const visualizacion = resultadoAlgoritmo.map((solucion, i) => {
    const cajas = getCajas(solucion);

    console.log(cajas);
    const packings = cajas.map((caja, j) => {
      return <GeometryContainer key={i + j} cajas={getPackingResult(caja)} />;
    });

    return packings;
  });

  return <div>{visualizacion}</div>;
}
