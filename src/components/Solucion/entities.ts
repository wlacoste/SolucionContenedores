export interface Item {
  Id: number;
  Dim1: number;
  Dim2: number;
  Dim3: number;
  Volume: number;
  Quantity: number;
  IsPacked: boolean;
}

export interface Container {
  Id: number;
  Length: number;
  Width: number;
  Height: number;
  Volume: number;
}

export interface AlgorithmPackingResult {
  PackedItems: Item[];
  UnpackedItems: Item[];
}

export interface ContainerPackingResult {
  AlgorithmPackingResults: AlgorithmPackingResult[];
  ContainerID: number;
}

export interface Layer {
  LayerDim: number;
  LayerEval: number;
}
export interface ScrapPad {
  CumX: number;
  CumZ: number;
  Post: ScrapPad | undefined;
  Pre: ScrapPad | undefined;
}
