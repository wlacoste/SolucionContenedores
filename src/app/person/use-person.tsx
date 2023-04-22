import { selectPerson } from "store/features/person";
import { getUsers } from "store/features/person/asyncActions";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useEffect } from "react";

export default function usePerson() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectPerson);

  useEffect(() => {
    const promise = dispatch(getUsers());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return data;
}
