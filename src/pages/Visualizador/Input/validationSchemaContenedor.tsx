import { array, object, string } from "yup";

export default object().shape({
  contenedor: array().of(
    object()
      .shape({
        dimx: string()
          .required("Campo requerido")
          .matches(/^\d{1,}(\.\d{0,4})?$/, "Is not in correct format"),
        dimy: string()
          .required("Campo requerido")
          .matches(/^\d{1,}(\.\d{0,4})?$/, "Is not in correct format"),
        dimz: string()
          .required("Campo requerido")
          .matches(/^\d{1,}(\.\d{0,4})?$/, "Is not in correct format"),
        // cantidad: string().required("Campo requerido"),
      })
      .required("Campo requerido")
  ),
});
