import { FormValues } from "domain/FormValues";

import * as useCases from "app/empaquetado";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { runSolution } from "../../../components/Solucion/abafit";
import { Container, Item } from "../../../components/Solucion/entities";

export const getEmpaquetado = createAsyncThunk(
  "empaquetado/calcular",
  async (paquetes: FormValues) => {
    const resultado = await useCases.calcularEmpaquetado(paquetes);

    console.log("Por ejecutar contenedor");
    console.log(paquetes);

    const container: Container = { Id: 1, Length: 10, Width: 10, Height: 10, Volume: 1000 };
    const items = mapToItems(paquetes);

    console.log(items);
    const res = runSolution(container, items);

    console.log("este es el resultado");
    console.log(res);

    return resultado;
  }
);

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
