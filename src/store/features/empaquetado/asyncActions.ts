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
    const items = mapToItems(paquetes);
    const cons = contenedores.map((c) => {
      let contene: Container = {
        Id: c.id,
        Length: c.length,
        Width: c.width,
        Height: c.height,
        Volume: c.volume,
      };

      return contene;
    });

    const resultadoX: resultado[] = cons.map((c) => {
      let resa: resultado = { containerID: c.Id, algorithmPackingResults: [] };
      const res = runSolution(c, items);
      const resultadoMapeado = mapearRes(res);

      resa.algorithmPackingResults.push(resultadoMapeado);

      return resa;
    });

    return resultadoX;
  }
);

function mapearRes(res: AlgorithmPackingResult) {
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

  // resultado[0].algorithmPackingResults.push(algorithm);

  // return resultado;
  return algorithm;
}

function mapToItems(paquetes: any) {
  const a = paquetes.map((paquete: any) => {
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
