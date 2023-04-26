import { Button, Input, InputQuantity } from "@architecture-it/stylesystem";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import styles from "./Input.module.scss";

type FormValues = {
  paquete: {
    dimx: number;
    dimy: number;
    dimz: number;
    cantidad: number;
  }[];
};

export function InputSegundo() {
  const validationSchema = yup.object({
    dimx: yup
      .string()
      .required("Campo requerido")
      .matches(/^\d{1,}(\.\d{0,4})?$/, "Is not in correct format"),
    dimy: yup
      .string()
      .required("Campo requerido")
      .matches(/^\d{1,}(\.\d{0,4})?$/, "Is not in correct format"),
    dimz: yup
      .string()
      .required("Campo requerido")
      .matches(/^\d{1,}(\.\d{0,4})?$/, "Is not in correct format"),
    cantidad: yup.number().required("Campo requerido").moreThan(0),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      paquete: [{ dimx: 0, dimy: 0, dimz: 0, cantidad: 0 }],
    },
    resolver: yupResolver(validationSchema),
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "paquete",
  });
  // const handle = (data: any) => {
  //   console.log(inputFields);
  // };

  // const [inputFields, setInputFields] = useState([{ dimx: 0, dimy: 0, dimz: 0, cantidad: 0 }]);

  // const addFields = () => {
  //   let newfield = { dimx: 0, dimy: 0, dimz: 0, cantidad: 0 };

  //   setInputFields([...inputFields, newfield]);
  // };

  return (
    <div className={styles.formRoot}>
      {/* <form
        className={styles.formRoot}
        onSubmit={handleSubmit((inputFields) => handle(inputFields))}
      >
        {inputFields.map((input, index) => {
          return (
            <div key={index} className={styles.formRoot}>
              <div className={styles.input}>
                <Input
                  label="Dim X"
                  placeholder="Dim x"
                  {...register("dimx", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name ? (errors.name.message as string) : ""}
                />
              </div>
              <div className={styles.input}>
                <Input
                  label="Dim Y"
                  placeholder="Dim y"
                  type="text"
                  {...register("dimy", { required: true })}
                  error={Boolean(errors.dimy)}
                  helperText={errors.dimy ? (errors.dimy.message as string) : ""}
                />
              </div>
              <div className={styles.input}>
                <Input
                  label="Dim Z"
                  placeholder="Dim Z"
                  type="text"
                  {...register("dimz", { required: true })}
                  error={Boolean(errors.dimz)}
                  helperText={errors.dimz ? (errors.dimz.message as string) : ""}
                />
              </div>
              <div className={styles.input}>
                <Input
                  label="Cantidad"
                  placeholder="cantidad"
                  type="number"
                  {...register("cantidad", { required: true, min: 0 })}
                  error={Boolean(errors.cantidad)}
                  helperText={errors.cantidad ? (errors.cantidad.message as string) : ""}
                  inputProps={{ min: 0 }}
                />
              </div>
            </div>
          );
        })}
        <Button
          color="primary"
          style={{ display: "block" }}
          text="Enviar"
          type="submit"
          variant="contained"
        />
        <Button
          color="primary"
          style={{ display: "block" }}
          text="Add"
          type="button"
          variant="contained"
          onClick={addFields}
        /> */}
      {/* <button onClick={addFields}>Add More..</button> */}

      <form
        onSubmit={handleSubmit((data) => {
          console.log("submited data", data);
        })}
      >
        {fields.map((field, index) => {
          return (
            <section key={field.id}>
              <input {...register(`paquete.${index}.dimx`, { required: true })} />
              <input {...register(`paquete.${index}.dimy`)} />
              <input {...register(`paquete.${index}.dimz`)} />
              <input {...register(`paquete.${index}.cantidad`, { valueAsNumber: true })} />
              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                remove
              </button>
            </section>
          );
        })}
        <button
          type="button"
          onClick={() => {
            prepend({
              dimx: 0,
              dimy: 0,
              dimz: 0,
              cantidad: 0,
            });
          }}
        >
          append
        </button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
