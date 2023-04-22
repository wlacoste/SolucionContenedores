/**
 * Estructura que debe tener el campo raw
 */
export interface IPermission {
  rol: string;
  permissions: string[];
}

interface PossiblePermission extends Object {}

export const isPermission = (obj: PossiblePermission): obj is IPermission => {
  // adaptar a las propiedades que debe tener su campo "raw"
  return "role" in obj && "permissions" in obj;
};
