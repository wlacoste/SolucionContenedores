import Cajas from "./Cajas";
import InputContenedor from "./Input";
import { InputSegundo } from "./Input/input2";
import Sandbox from "./Sandbox/sandbox";
import styles from "./index.module.scss";
export default function paginaVisualizador() {
  return (
    <div className={styles.root}>
      {/* <InputContenedor /> */}
      <InputSegundo />
      <Cajas />
      <Sandbox />
    </div>
  );
}
