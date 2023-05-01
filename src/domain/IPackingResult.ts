import { IBox } from "./IBox";

export interface PackingResults {
  algorithmID: number;
  algorithmName: string;
  isCompletePack: boolean;
  packedItems: IBox[];
  packTimeInMilliseconds?: number;
  percentContainerVolumePacked?: number;
  percentItemVolumePacked?: number;
  unpackedItems?: IBox[];
}
