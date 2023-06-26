import { FormValues } from "domain/FormValues";
import { IContenedor, IContenedores } from "domain/IContenedor";

import { Button, IconButton, Input } from "@architecture-it/stylesystem";
import { useFieldArray, useForm } from "react-hook-form";
import { object, array, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlus, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { getEmpaquetado } from "store/features/empaquetado/asyncActions";
import { useAppDispatch } from "store/hooks";
import { useContext } from "react";

import { ContenedorContext } from "../paginaVisualizador";

import styles from "./Input.module.scss";

const validationSchema = object().shape({
  contenedor: array().of(
    object().shape({
      largo: number().required("Campo requerido").min(0.001),
      ancho: number().required("Campo requerido").min(0.001),
      alto: number().required("Campo requerido").min(0.001),
      // cantidad: number().integer().positive().min(1).required("Campo requerido"),
    })
  ),
});

export function InputContenedora() {
  const dispatch = useAppDispatch();
  const [contenedor, setContenedor] = useContext(ContenedorContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      contenedor: [{ largo: null, ancho: null, alto: null }],
    },
    resolver: yupResolver(validationSchema),
  });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "contenedor",
  });

  const submitForm = async (formulario: any) => {
    let x: IContenedores = formulario as IContenedores;

    let contenedores: IContenedor[] = x.contenedor.map((element, index) => {
      return { ...element, id: x.contenedor.length - index };
    });

    setContenedor(() => contenedores);
    console.log(contenedores);
  };

  return (
    <div className={styles.formRoot}>
      <form
        onSubmit={handleSubmit((data) => {
          submitForm(data);
        })}
      >
        <div className={styles.bottonForm}>
          <Button
            color="primary"
            disableRipple={true}
            text="Calcular empaquetado"
            type="submit"
            variant="contained"
            onFocusVisible={() => {}}
          />
          <IconButton
            IconProps={{
              icon: faPlus,
            }}
            TooltipText={""}
            className={styles.iconButton}
            color="primary"
            size="small"
            onClick={() => {
              prepend({
                largo: null,
                ancho: null,
                alto: null,
              });
            }}
            onFocusVisible={() => {}}
          />
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <IconosCajas debeRenderizar={index} />
              <section className={styles.formRoot}>
                <div className={styles.input}>
                  <Input
                    label={index == 0 ? "Largo" : ""}
                    placeholder="largo"
                    type="text"
                    {...register(`contenedor.${index}.largo`, { required: true })}
                    error={Boolean(
                      errors.contenedor != undefined && errors.contenedor[index]?.largo
                    )}
                    inputProps={{ min: 0 }}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label={index == 0 ? "Ancho" : ""}
                    placeholder="ancho"
                    type="text"
                    {...register(`contenedor.${index}.ancho`, { required: true })}
                    error={Boolean(errors.contenedor && errors.contenedor[index]?.ancho)}
                    inputProps={{ min: 0 }}
                  />
                </div>
                <div className={styles.input}>
                  <Input
                    label={index == 0 ? "Altos" : ""}
                    placeholder="altos"
                    type="number"
                    {...register(`contenedor.${index}.alto`, { required: true })}
                    error={Boolean(errors.contenedor && errors.contenedor[index]?.alto)}
                    inputProps={{ min: 0 }}
                  />
                </div>
                {/* <div className={styles.input}>
                  <Input
                    label={index == 0 ? "Cantidad" : ""}
                    placeholder="cantidad"
                    type="number"
                    {...register(`contenedor.${index}.cantidad`, { required: true })}
                    error={Boolean(errors.contenedor && errors.contenedor[index]?.cantidad)}
                    inputProps={{ min: 1 }}
                  />
                </div> */}
                <IconButton
                  IconProps={{
                    icon: faTrash,
                  }}
                  TooltipText=""
                  color="primary"
                  size="medium"
                  onClick={() => {
                    remove(index);
                  }}
                  onFocusVisible={() => {}}
                />
              </section>
            </div>
          );
        })}
      </form>
    </div>
  );
}
interface debeRenderizar {
  debeRenderizar: number;
}
function IconosCajas({ debeRenderizar }: debeRenderizar) {
  if (debeRenderizar !== 0) {
    return <></>;
  }

  return (
    <div className={styles.formRoot}>
      <div className={styles.iconoDi}>
        <img
          alt=""
          src="https://componentesui.blob.core.windows.net/recursos/iconografia-gla/descripcion-de-envio/relleno/svg/profundidad.svg"
        />
      </div>
      <div className={styles.iconoDi}>
        <img
          alt=""
          src="https://componentesui.blob.core.windows.net/recursos/iconografia-gla/descripcion-de-envio/relleno/svg/ancho.svg"
        />
      </div>
      <div className={styles.iconoDi}>
        <img
          alt=""
          src="https://componentesui.blob.core.windows.net/recursos/iconografia-gla/descripcion-de-envio/relleno/svg/altura.svg"
        />
      </div>
    </div>
  );
}
