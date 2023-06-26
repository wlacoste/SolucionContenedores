import { IContenedor } from "domain/IContenedor";

import useContenedor from "app/contenedor/useContenedor";
import { useState } from "react";
import { ThemeContext } from "@emotion/react";
import React from "react";

import Cajas from "./Cajas";
import { InputSegundo } from "./Input/input2";
import Sandbox from "./Sandbox/sandbox";
import styles from "./index.module.scss";

export const ContenedorContext = React.createContext<
  [IContenedor[], React.Dispatch<React.SetStateAction<IContenedor[]>>]
>([[], () => {}]);

export default function paginaVisualizador() {
  const [contenedor, setContenedor] = useState<IContenedor[]>([
    { id: 0, width: 10, length: 10, height: 10, volume: 1000 },
  ]);

  return (
    <div className={styles.root}>
      <ContenedorContext.Provider value={[contenedor, setContenedor]}>
        {/* <InputContenedor /> */}
        <div>
          <div className={styles.inputCajas}>
            <InputSegundo />
          </div>
        </div>
        <Cajas />
        {/* <Sandbox /> */}
      </ContenedorContext.Provider>
    </div>
  );
}
