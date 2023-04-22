export interface IPerson {
  id: string;
  name: string;
  lastName: string;
}

export interface IPersonDetail extends IPerson {
  fullName: string;
}

export interface IEditPerson extends Partial<IPerson> {
  id: string;
}

export type PersonId = IPerson["id"];
