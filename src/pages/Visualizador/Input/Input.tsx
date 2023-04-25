import { useState } from "react";
import { useForm, SubmitHandler, Controller, Control } from "react-hook-form";
import { Button, Input } from "@architecture-it/stylesystem";

import styles from "./Input.module.scss";

type Inputs = {
  dimx: number;
  dimy: number;
  dimz: number;
  cantidad: number;
};

type Dimx = number;

export default function InputContenedor() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const [estado, setEstado] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.formRoot}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {/* <input {...register("dimx", { required: true })} />
        <input {...register("dimy", { required: true })} />
        <input {...register("dimz", { required: true })} />
        <input {...register("cantidad", { required: true })} />

        {errors.dimx && <span>This field is required</span>}
        {errors.dimx && <span>This field is required</span>}
        {errors.dimz && <span>This field is required</span>}
        {errors.cantidad && <span>This field is required</span>}

        <input type="submit" /> */}

      <form className={styles.formRoot} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <div className={styles.input2}>
            <Controller
              control={control}
              name={"dimx"}
              render={({ field: { onChange, value } }) => (
                <Input label={"Dim X"} value={value || ""} onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.input2}>
            <Controller
              control={control}
              name={"dimy"}
              render={({ field: { onChange, value } }) => (
                <Input label={"Dim Y"} value={value || ""} onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.input2}>
            <Controller
              control={control}
              name={"dimz"}
              render={({ field: { onChange, value } }) => (
                <Input label={"Dim Z"} value={value || ""} onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.input2}>
            <Controller
              control={control}
              name={"cantidad"}
              render={({ field: { onChange, value } }) => (
                <Input label={"Cantidad"} value={value || 0} onChange={onChange} />
              )}
              rules={{ required: true }}
            />
          </div>
        </div>

        <Button
          className={styles.input}
          color="primary"
          text="Añadir pedido"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          onFocusVisible={() => {}}
        />

        {/* </form> */}
      </form>
    </div>
  );
}
