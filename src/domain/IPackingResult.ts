import { IBox } from "./IBox";

export interface PackingResults {
  AlgorithmID: number;
  AlgorithmName: string;
  IsCompletePack: boolean;
  PackedItems: IBox[];
  // PackTimeInMilliseconds: number ;
  // PercentContainerVolumePacked: number ;
  // PercentItemVolumePacked: number;
  // UnpackedItems: IBox[] ;
}
