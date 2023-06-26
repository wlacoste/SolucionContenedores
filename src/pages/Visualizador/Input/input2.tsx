import { FormValues } from "domain/FormValues";
import { IContenedor } from "domain/IContenedor";

import { Button, IconButton, Input } from "@architecture-it/stylesystem";
import { useFieldArray, useForm } from "react-hook-form";
import { object, array, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlus, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { getEmpaquetado } from "store/features/empaquetado/asyncActions";
import { useAppDispatch } from "store/hooks";
import contenedor from "store/features/contenedor";
import { useContext } from "react";

import { ContenedorContext } from "../paginaVisualizador";

import styles from "./Input.module.scss";

const validationSchema = object().shape({
  paquete: array().of(
    object().shape({
      largo: number().required("Campo requerido").min(0.001),
      ancho: number().required("Campo requerido").min(0.001),
      alto: number().required("Campo requerido").min(0.001),
      cantidad: number().integer().positive().min(1).required("Campo requerido"),
    })
  ),
  contenedor: array().of(
    object().shape({
      largo: number().required("Campo requerido").min(0.001),
      ancho: number().required("Campo requerido").min(0.001),
      alto: number().required("Campo requerido").min(0.001),
    })
  ),
});

const mapToContainer = (c: any) => {
  let a: IContenedor = {
    id: c.id,
    length: c.largo,
    height: c.alto,
    width: c.ancho,
    volume: c.largo * c.alto * c.ancho,
  };

  return a;
};

export interface IPeticionSol {
  paquetes: FormValues;
  contenedores: IContenedor[];
}

export function InputSegundo() {
  const dispatch = useAppDispatch();
  const [contenedor, setContenedor] = useContext(ContenedorContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      paquete: [{ largo: null, ancho: null, alto: null, cantidad: null }],
      contenedor: [{ largo: null, ancho: null, alto: null }],
    },
    resolver: yupResolver(validationSchema),
  });
  const {
    fields: paqueteField,
    prepend: paquetePrepend,
    remove: paqueteRemove,
  } = useFieldArray({
    control,
    name: "paquete",
  });
  const {
    fields: contenedorField,
    prepend: contenedorPrepend,
    remove: contenedorRemove,
  } = useFieldArray({
    control,
    name: "contenedor",
  });

  const submitForm = async (formulario: any) => {
    let x = formulario.paquete;
    let c = formulario.contenedor;

    x.forEach((element: any, index: number) => {
      element.id = index + 1;
    });
    c.forEach((element: any, index: number) => {
      element.id = index + 1;
    });

    if (c.length === 0) return;
    const nuevosContenedores: IContenedor[] = c.map((cs: any) => {
      return mapToContainer(cs);
    });

    setContenedor(() => nuevosContenedores);

    let peticion: IPeticionSol = {
      paquetes: x as FormValues,
      contenedores: nuevosContenedores as IContenedor[],
    };

    let result = dispatch(getEmpaquetado(peticion));
  };

  return (
    <div className={styles.formRoot}>
      <form
        onSubmit={handleSubmit((data) => {
          submitForm(data);
        })}
      >
        <div className={styles.formulario}>
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
                paquetePrepend({
                  largo: null,
                  ancho: null,
                  alto: null,
                  cantidad: null,
                });
              }}
              onFocusVisible={() => {}}
            />
          </div>
          {paqueteField.map((field, index) => {
            return (
              <div key={field.id}>
                <IconosCajas debeRenderizar={index} />
                <section className={styles.formRoot}>
                  <div className={styles.input}>
                    <Input
                      label={index == 0 ? "Largo" : ""}
                      placeholder="largo"
                      type="text"
                      {...register(`paquete.${index}.largo`, { required: true })}
                      error={Boolean(errors.paquete != undefined && errors.paquete[index]?.largo)}
                      inputProps={{ min: 0 }}
                    />
                  </div>
                  <div className={styles.input}>
                    <Input
                      label={index == 0 ? "Ancho" : ""}
                      placeholder="ancho"
                      type="text"
                      {...register(`paquete.${index}.ancho`, { required: true })}
                      error={Boolean(errors.paquete && errors.paquete[index]?.ancho)}
                      inputProps={{ min: 0 }}
                    />
                  </div>
                  <div className={styles.input}>
                    <Input
                      label={index == 0 ? "Alto" : ""}
                      placeholder="alto"
                      type="number"
                      {...register(`paquete.${index}.alto`, { required: true })}
                      error={Boolean(errors.paquete && errors.paquete[index]?.alto)}
                      inputProps={{ min: 0 }}
                    />
                  </div>
                  <div className={styles.input}>
                    <Input
                      label={index == 0 ? "Cantidad" : ""}
                      placeholder="cantidad"
                      type="number"
                      {...register(`paquete.${index}.cantidad`, { required: true })}
                      error={Boolean(errors.paquete && errors.paquete[index]?.cantidad)}
                      inputProps={{ min: 1 }}
                    />
                  </div>
                  <IconButton
                    IconProps={{
                      icon: faTrash,
                    }}
                    TooltipText=""
                    color="primary"
                    size="medium"
                    onClick={() => {
                      paqueteRemove(index);
                    }}
                    onFocusVisible={() => {}}
                  />
                </section>
              </div>
            );
          })}
        </div>
        <div className={styles.formulario}>
          <div className={styles.bottonForm}>
            <IconButton
              IconProps={{
                icon: faPlus,
              }}
              TooltipText={""}
              className={styles.iconButton}
              color="primary"
              size="small"
              onClick={() => {
                contenedorPrepend({
                  largo: null,
                  ancho: null,
                  alto: null,
                });
              }}
              onFocusVisible={() => {}}
            />
          </div>
          {contenedorField.map((field, index) => {
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
                      label={index == 0 ? "Alto" : ""}
                      placeholder="alto"
                      type="number"
                      {...register(`contenedor.${index}.alto`, { required: true })}
                      error={Boolean(errors.contenedor && errors.contenedor[index]?.alto)}
                      inputProps={{ min: 0 }}
                    />
                  </div>

                  <IconButton
                    IconProps={{
                      icon: faTrash,
                    }}
                    TooltipText=""
                    color="primary"
                    size="medium"
                    onClick={() => {
                      contenedorRemove(index);
                    }}
                    onFocusVisible={() => {}}
                  />
                </section>
              </div>
            );
          })}
        </div>
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
