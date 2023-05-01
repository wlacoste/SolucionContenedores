import { PackingResults } from "./IPackingResult";

export interface resultado {
  containerID: number;
  algorithmPackingResults: PackingResults[];
}

export interface container {
  id: number;
  length: number;
  width: number;
  height: number;
  volume: number;
}
