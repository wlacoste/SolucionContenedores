import React from "react";
import Typography from "@mui/material/Typography";
import type { TokenClaims } from "@azure/msal-common";
import { useUser } from "@architecture-it/azure-b2c/use-user";
import type { IPermission } from "domain/Permission";

import styles from "./IdTokenClaims.module.scss";

interface IIdTokenClaimsProps {
  idTokenClaims: TokenClaims & {
    [key: string]: string | number | string[] | object | undefined | unknown;
  };
}

const IdTokenClaims = ({ idTokenClaims }: IIdTokenClaimsProps) => {
  const email = (idTokenClaims?.["signInNames.emailAddress"] as string) ?? "";
  const user = useUser<IPermission>();

  return (
    <article className={styles.container} id="token-div">
      <Typography>
        <strong>Email: </strong> {email}
      </Typography>
      {user && (
        <Typography component="div">
          <strong>Campo Raw: </strong>{" "}
          <pre className={styles.code}>{JSON.stringify(user?.raw, null, 4)}</pre>
        </Typography>
      )}
    </article>
  );
};

export default IdTokenClaims;
