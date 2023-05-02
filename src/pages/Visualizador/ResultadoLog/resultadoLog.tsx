import { IBox } from "domain/IBox";
import { PackingResults } from "domain/IPackingResult";

import { getContenedorData } from "app/empaquetado";
import { useEffect, useState } from "react";

import styles from "./estilos.module.scss";

interface IResultadoLog {
  packingResult: PackingResults;
  containerId: number;
}

const estaGirado = (item: IBox) => {
  return item.dim1 != item.packDimX && item.dim2 != item.packDimY && item.dim3 != item.packDimZ;
};
const fueRotado = (item: IBox) => {
  if (estaGirado(item)) {
    return "rotado";
  } else return "";
};

const contar = (packedItems: IBox[]) => {
  const counts: any = {};

  packedItems.forEach(function (x) {
    counts[x.id] = (counts[x.id] || 0) + 1;
  });

  return counts;
};

const texto = (items: IBox[] | undefined) => {
  if (items == undefined) {
    return "";
  }
  const cantidad = contar(items);
  const x = Object.keys(cantidad);
  const result = x.map((i, index) => {
    const dimensiones = items.find((item) => item.id.toString() === i);

    return (
      <div key={index} className={styles.items}>
        <h4>{`Id ${i} : cantidad ${cantidad[i]}`}</h4>
        <p>
          {`Dimensiones: ${dimensiones?.dim1}x${dimensiones?.dim2}x${dimensiones?.dim3}.
        Volumen unitario: ${dimensiones?.volume}`}{" "}
        </p>
        {/* <h4>Posiciones</h4> */}
        <ul>
          {items.map((item, j) => {
            if (item.id.toString() === i && item.isPacked) {
              return (
                <li key={j}>
                  {` ${item.coordX},${item.coordZ},${item.coordY} ${fueRotado(item)}`}
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  });

  return <div>{result}</div>;
};

export default function ResultadoLog({ packingResult, containerId }: IResultadoLog) {
  const [contenedor, setContenedor] = useState<IBox>({
    id: containerId,
    dim1: 0,
    dim2: 0,
    dim3: 0,
    coordX: 0,
    coordY: 0,
    coordZ: 0,
    packDimX: 0,
    packDimY: 0,
    packDimZ: 0,
  });

  useEffect(() => {
    async function getContenedor() {
      const response = await getContenedorData(containerId);
      const cajaContenedor: IBox = {
        id: response.id,
        dim1: response.length,
        dim2: response.width,
        dim3: response.height,
        coordX: 0,
        coordY: 0,
        coordZ: 0,
        packDimX: 0,
        packDimY: 0,
        packDimZ: 0,
      };

      setContenedor(cajaContenedor);
    }
    if (contenedor.id != 0) {
      getContenedor();
    }
  }, []);

  return (
    <div className={styles.root}>
      <h4>Contenedor</h4>

      <span>{`${contenedor.dim1} x ${contenedor.dim2} x ${contenedor.dim3}`}</span>
      <p>{`Packing Completo: ${packingResult.isCompletePack}`}</p>
      <p>{`Contenedor ocupado: ${packingResult.percentContainerVolumePacked}%`}</p>
      <p>{`Volumen empacado: ${packingResult.percentItemVolumePacked}%`}</p>
      <div>
        <h4>Items empaquetados</h4>
        {texto(packingResult.packedItems)}
      </div>
      <div>
        <h4>Items no empaquetados</h4>
        {texto(packingResult.unpackedItems)}
      </div>
    </div>
  );
}
