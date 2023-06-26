import { FormValues } from "domain/FormValues";

import { useEffect } from "react";
import { selectEmpaquetado } from "store/features/empaquetado";
import { getEmpaquetado } from "store/features/empaquetado/asyncActions";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function useEmpaquetado(paquetes: FormValues) {
  const dispatch = useAppDispatch();
  const empaquetado = useAppSelector(selectEmpaquetado);

  useEffect(() => {
    // const promise = dispatch(getEmpaquetado(paquetes));

    return () => {
      // promise.abort();
    };
  }, [dispatch]);

  return empaquetado;
}
