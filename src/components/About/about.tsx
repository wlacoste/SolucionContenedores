import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "var(--border-radius-large)",
};

export default function about() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>About</Button>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={open}
        onClose={handleClose}
      >
        <Box component="div" sx={style}>
          <Typography component="h2" id="modal-modal-title" variant="h6">
            Solucion contenedores
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Esta aplicacion fue desarrollada para ordenar multiples cajas de diferentes dimensiones
            dentro de uno o varios contenedores. Para utilizarla: una vez ingresada al menos los
            datos de una caja y un contenedor. Se generara una solucion por cada contenedor. Se
            renderizara una visualizacion de como se posiciona cada caja en el contenedor y en el
            log, se podra ver que cajas no fue posiblee guardar.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
