import type { IPermission } from "domain/Permission";

import { Button, useToggle } from "@architecture-it/stylesystem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUser } from "@architecture-it/azure-b2c/use-user";

import IdTokenClaims from "../../components/IdTokenClaims";

import styles from "./User.module.scss";

const User = () => {
  const user = useUser<IPermission>();
  const [show, { toggle }] = useToggle();

  return (
    <section className={styles.container}>
      <Typography className={styles.message} variant="h1">
        <span className={styles.span}>Bienvenido</span> {user?.name}
      </Typography>
      <Box className={styles.claimsContainer} component="div" data-view={show}>
        {show && user?.idTokenClaims && <IdTokenClaims idTokenClaims={user?.idTokenClaims} />}
        <Button
          text={`${show ? "Ocultar" : "Mostrar"} claims del token`}
          variant="contained"
          onClick={toggle}
        />
      </Box>
    </section>
  );
};

export default User;
