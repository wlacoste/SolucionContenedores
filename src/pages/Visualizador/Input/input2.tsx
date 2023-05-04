import { resultado } from "domain/IResultado";
import { FormValues } from "domain/FormValues";

import { Button, IconButton, Input } from "@architecture-it/stylesystem";
import { useFieldArray, useForm } from "react-hook-form";
import { object, array, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { faPlus, faTrash } from "@fortawesome/pro-solid-svg-icons";
import axios from "axios";
import useEmpaquetado from "app/empaquetado/useEmpaquetado";
import { getEmpaquetado } from "store/features/empaquetado/asyncActions";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectEmpaquetado } from "store/features/empaquetado";

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
});

export function InputSegundo() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      paquete: [{ largo: null, ancho: null, alto: null, cantidad: null }],
    },
    resolver: yupResolver(validationSchema),
  });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "paquete",
  });

  const submitForm = async (formulario: any) => {
    let x: FormValues = formulario as FormValues;

    x.paquete.forEach((element, index) => {
      element.id = index + 1;
    });
    // let { data } = await axios.post("http://localhost:5000/api/v1/Empaquetado", x.paquete);
    // let response = await axios.post("http://localhost:5000/api/v1/Empaquetado");
    // let res = data as resultado[];
    let result = dispatch(getEmpaquetado(x));

    // console.log(result);
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
                cantidad: null,
              });
            }}
            onFocusVisible={() => {}}
          />
        </div>
        {fields.map((field, index) => {
          return (
            <section key={field.id} className={styles.formRoot}>
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
                  remove(index);
                }}
                onFocusVisible={() => {}}
              />
            </section>
          );
        })}
      </form>
    </div>
  );
}
