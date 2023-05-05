import { useEffect } from "react";
import { selectContenedores } from "store/features/contenedor";
import { getContenedores } from "store/features/contenedor/asyncActions";
import { selectEmpaquetado } from "store/features/empaquetado";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function useContenedor() {
  const dispatch = useAppDispatch();
  const contenedores = useAppSelector(selectContenedores);

  useEffect(() => {
    const promise = dispatch(getContenedores());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return contenedores;
}
