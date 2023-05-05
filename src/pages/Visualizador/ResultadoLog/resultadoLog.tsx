import { IBox } from "domain/IBox";
import { PackingResults } from "domain/IPackingResult";
import { IContenedor } from "domain/IContenedor";

import { getContenedorData } from "app/contenedor";
import { useEffect, useState } from "react";
import useContenedor from "app/contenedor/useContenedor";

import styles from "./estilos.module.scss";

interface IResultadoLog {
  packingResult: PackingResults;
  contenedor: IContenedor;
}

const noestaGirado = (item: IBox) => {
  return item.dim1 === item.packDimX && item.dim3 === item.packDimY && item.dim2 === item.packDimZ;
};
const fueRotado = (item: IBox) => {
  if (!noestaGirado(item)) {
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
        <div className={styles.listParent}>
          <ul>
            {items.map((item, j) => {
              if (item.id.toString() === i && item.isPacked) {
                return (
                  <li key={`${index}${j}`}>
                    {` ${item.coordX},${item.coordZ},${item.coordY} ${fueRotado(item)}`}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  });

  return <div>{result}</div>;
};

export default function ResultadoLog({ packingResult, contenedor }: IResultadoLog) {
  return (
    <div className={styles.root}>
      <h4>{`Contenedor ${contenedor.id}`}</h4>

      <span>{`${contenedor.length} x ${contenedor.width} x ${contenedor.height}`}</span>
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
