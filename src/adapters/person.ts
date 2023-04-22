import type { IPerson, IPersonDetail } from "domain/Person";

export const getExtended = (person: IPerson): IPersonDetail => {
  return {
    ...person,
    fullName: person.name + " " + person.lastName,
  };
};
