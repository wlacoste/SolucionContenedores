import { Button, Input, InputQuantity } from "@architecture-it/stylesystem";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export function InputSegundo() {
  const validationSchema = yup.object({
    name: yup.string().required("Campo requerido"),
    email: yup
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
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      // Inline styles of the form as an example, as a good practice classes should be used.
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "var(--spacing-6)",
        width: "max-content",
        marginTop: "var(--spacing-3)",
      }}
      onSubmit={handleSubmit((data) => data)}
    >
      {/* Validation example with custom error handling for required input */}
      <div>
        <Input
          label="Nombre"
          placeholder="Nombre"
          {...register("name", { required: true })}
          error={Boolean(errors.name)}
          helperText={errors.name ? (errors.name.message as string) : ""}
        />
      </div>

      <div>
        <Input
          label="Email"
          placeholder="Email"
          type="text"
          {...register("email", { required: true })}
          error={Boolean(errors.email)}
          helperText={errors.email ? (errors.email.message as string) : ""}
        />
      </div>
      <div>
        {/* <Input
          label="Cantidad"
          placeholder="cantidad"
          type="number"
          {...register("cantidad", { required: true })}
          error={Boolean(errors.cantidad)}
          helperText={errors.cantidad ? (errors.cantidad.message as string) : ""}
        /> */}
        <Controller
          control={control}
          name={"cantidad"}
          render={({ field: { onChange, value } }) => (
            <InputQuantity
              required
              helperText={errors.cantidad ? (errors.cantidad.message as string) : ""}
              label="Cantidad"
              placeholder="0"
            />
          )}
          rules={{ required: true, min: 1 }}
        />
      </div>

      <Button
        color="primary"
        style={{ display: "block" }}
        text="Enviar"
        type="submit"
        variant="contained"
      />
    </form>
  );
}
