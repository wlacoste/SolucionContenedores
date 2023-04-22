import { Box } from "@mui/material";
import { faCheckCircle } from "@fortawesome/pro-solid-svg-icons/faCheckCircle";
import { faTimesCircle } from "@fortawesome/pro-solid-svg-icons/faTimesCircle";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { hide, selectAlert } from "store/features/alert";
import { Alert as AlertStyleSystem } from "@architecture-it/stylesystem";

import styles from "./styles.module.scss";

const Alert = () => {
  const { message, type, open } = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();

  return open ? (
    <Box component="div">
      <AlertStyleSystem
        color={type}
        iconProps={{ icon: type === "success" ? faCheckCircle : faTimesCircle }}
        open={open}
        variant={"filled"}
        onCloseProp={() => {
          dispatch(hide());
        }}
      >
        {message}
      </AlertStyleSystem>
    </Box>
  ) : null;
};

export default Alert;
