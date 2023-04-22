import type { IEditPerson, IPerson, PersonId } from "domain/Person";
import PersonService from "services/PersonService";

export async function getAll(signal?: AbortSignal) {
  const { data } = await PersonService.getAll({ signal });

  return data;
}
