import Container, { IBox, IListaBox } from "pages/Visualizador/container";

interface resultadoQuery {
  resultados: resultado[];
}

interface resultado {
  containerID: number;
  algorithmPackingResults: PackingResults[];
}
interface PackingResults {
  algorithmID: number;
  algorithmName: string;
  isCompletePack: boolean;
  packedItems: IBox[];
  packTimeInMilliseconds: number;
  percentContainerVolumePacked: number;
  percentItemVolumePacked: number;
  unpackedItems: IBox[];
}

export default function Cajas() {
  const resultadoAlgoritmo: resultado[] = [
    {
      containerID: 1,
      algorithmPackingResults: [
        {
          algorithmID: 1,
          algorithmName: "EB-AFIT",
          isCompletePack: false,
          packedItems: [
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 0,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 5,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 10,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 15,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 20,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
          ],
          packTimeInMilliseconds: 76,
          percentContainerVolumePacked: 4,
          percentItemVolumePacked: 0.77,
          unpackedItems: [
            {
              id: 1,
              isPacked: false,
              dim1: 30,
              dim2: 30,
              dim3: 30,
              coordX: 0,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 0,
              packDimY: 0,
              packDimZ: 0,
              volume: 27000,
            },
            {
              id: 1,
              isPacked: false,
              dim1: 30,
              dim2: 30,
              dim3: 30,
              coordX: 0,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 0,
              packDimY: 0,
              packDimZ: 0,
              volume: 27000,
            },
            {
              id: 1,
              isPacked: false,
              dim1: 30,
              dim2: 30,
              dim3: 30,
              coordX: 0,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 0,
              packDimY: 0,
              packDimZ: 0,
              volume: 27000,
            },
          ],
        },
      ],
    },
    {
      containerID: 1,
      algorithmPackingResults: [
        {
          algorithmID: 1,
          algorithmName: "EB-AFIT",
          isCompletePack: true,
          packedItems: [
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 0,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 5,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 10,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 15,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 2,
              isPacked: true,
              dim1: 5,
              dim2: 5,
              dim3: 5,
              coordX: 20,
              coordY: 0,
              coordZ: 0,
              quantity: 1,
              packDimX: 5,
              packDimY: 5,
              packDimZ: 5,
              volume: 125,
            },
            {
              id: 1,
              isPacked: true,
              dim1: 30,
              dim2: 30,
              dim3: 30,
              coordX: 0,
              coordY: 0,
              coordZ: 5,
              quantity: 1,
              packDimX: 30,
              packDimY: 30,
              packDimZ: 30,
              volume: 27000,
            },
            {
              id: 1,
              isPacked: true,
              dim1: 30,
              dim2: 30,
              dim3: 30,
              coordX: 30,
              coordY: 0,
              coordZ: 5,
              quantity: 1,
              packDimX: 30,
              packDimY: 30,
              packDimZ: 30,
              volume: 27000,
            },
            {
              id: 1,
              isPacked: true,
              dim1: 30,
              dim2: 30,
              dim3: 30,
              coordX: 60,
              coordY: 0,
              coordZ: 5,
              quantity: 1,
              packDimX: 30,
              packDimY: 30,
              packDimZ: 30,
              volume: 27000,
            },
          ],
          packTimeInMilliseconds: 76,
          percentContainerVolumePacked: 11.2,
          percentItemVolumePacked: 100,
          unpackedItems: [],
        },
      ],
    },
  ];

  const renders = resultadoAlgoritmo.map((res, i) => {
    return res.algorithmPackingResults.map((packing) => {
      return packing.packedItems;
    });
  });

  const getCajas = (res: resultado) => {
    return res.algorithmPackingResults;
  };

  const getPackingResult = (res: PackingResults) => {
    return res.packedItems;
  };

  const visualizacion = resultadoAlgoritmo.map((solucion, i) => {
    const cajas = getCajas(solucion);

    console.log(cajas);
    const packings = cajas.map((caja, j) => {
      if (caja.isCompletePack) {
        return <Container key={i + j} cajas={getPackingResult(caja)} />;
      }
    });

    return packings;
  });

  return <div>{visualizacion}</div>;
}
