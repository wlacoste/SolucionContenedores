import Container, { IBox, IListaBox } from "pages/Visualizador/container";

import { resultadoAlgo2 as resultadoAlgo } from "./result";

interface resultadoQuery {
  resultados: resultado[];
}

export interface resultado {
  ContainerID: number;
  AlgorithmPackingResults: PackingResults[];
}
export interface PackingResults {
  AlgorithmID: number;
  AlgorithmName: string;
  IsCompletePack: boolean;
  PackedItems: IBox[];
  // PackTimeInMilliseconds: number;
  // PercentContainerVolumePacked: number;
  // PercentItemVolumePacked: number;
  // UnpackedItems: IBox[];
}

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
      return <Container key={i + j} cajas={getPackingResult(caja)} />;
    });

    return packings;
  });

  return <div>{visualizacion}</div>;
}
