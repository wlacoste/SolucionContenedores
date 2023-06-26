import { FormValues } from "domain/FormValues";
import { resultado } from "domain/IResultado";
import { PackingResults } from "domain/IPackingResult";
import { IBox } from "domain/IBox";

import * as useCases from "app/empaquetado";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPeticionSol } from "pages/Visualizador/Input/input2";

import { runSolution } from "../../../components/Solucion/abafit";
import { AlgorithmPackingResult, Container, Item } from "../../../components/Solucion/entities";

export const getEmpaquetado = createAsyncThunk(
  "empaquetado/calcular",
  async ({ paquetes, contenedores }: IPeticionSol) => {
    //const resultad = await useCases.calcularEmpaquetado(paquetes);

    console.log("Por ejecutar contenedor");
    console.log(paquetes);

    const container: Container = { Id: 1, Length: 10, Width: 10, Height: 10, Volume: 1000 };
    const items = mapToItems(paquetes);

    console.log(items);
    const con: Container = {
      Id: contenedores[0].id,
      Length: contenedores[0].length,
      Width: contenedores[0].width,
      Height: contenedores[0].height,
      Volume: contenedores[0].length * contenedores[0].width * contenedores[0].height,
    };

    const res = runSolution(container, items);

    const resultadoMapeado = mapearRes(res, container);

    console.log("este es el resultado");
    console.log(res);

    console.log("resultado algoritmo");
    //console.log(resultad);

    return resultadoMapeado as resultado[];
  }
);

function mapearRes(res: AlgorithmPackingResult, container: Container) {
  let resultado: resultado[] = [
    {
      containerID: container.Id,
      algorithmPackingResults: [],
    },
  ];
  let algorithm: PackingResults = {
    algorithmID: 1,
    algorithmName: "EB-AFIT",
    isCompletePack: res.IsCompletePack,
    packedItems: [],
    packTimeInMilliseconds: 0,
    percentContainerVolumePacked: 0,
    percentItemVolumePacked: 0,
    unpackedItems: [],
  };
  let packedItems: IBox[] = res.PackedItems.map((item) => {
    let box: IBox = {
      id: item.Id,
      dim1: item.Dim1,
      dim2: item.Dim2,
      dim3: item.Dim3,
      coordX: item.CoordX,
      coordY: item.CoordY,
      coordZ: item.CoordZ,
      packDimX: item.PackDimX,
      packDimY: item.PackDimY,
      packDimZ: item.PackDimZ,
      quantity: item.Quantity,
      volume: item.Volume,
      isPacked: item.IsPacked,
    };

    return box;
  });

  let UnpackedItems: IBox[] = res.UnpackedItems.map((item) => {
    let box: IBox = {
      id: item.Id,
      dim1: item.Dim1,
      dim2: item.Dim2,
      dim3: item.Dim3,
      coordX: item.CoordX,
      coordY: item.CoordY,
      coordZ: item.CoordZ,
      packDimX: item.PackDimX,
      packDimY: item.PackDimY,
      packDimZ: item.PackDimZ,
      quantity: item.Quantity,
      volume: item.Volume,
      isPacked: item.IsPacked,
    };

    return box;
  });

  algorithm.packedItems = packedItems;
  algorithm.unpackedItems = UnpackedItems;

  resultado[0].algorithmPackingResults.push(algorithm);

  return resultado;
}

function mapToItems(paquetes: FormValues) {
  const a = paquetes.paquete.map((paquete, index) => {
    let b: Item = {
      Id: paquete.id,
      Dim1: paquete.ancho,
      Dim2: paquete.largo,
      Dim3: paquete.alto,
      Volume: paquete.alto * paquete.largo * paquete.ancho,
      Quantity: paquete.cantidad,
      IsPacked: false,
      CoordX: 0,
      CoordY: 0,
      CoordZ: 0,
      PackDimX: paquete.ancho,
      PackDimY: paquete.largo,
      PackDimZ: paquete.alto,
    };

    return b;
  });

  return a;
}
