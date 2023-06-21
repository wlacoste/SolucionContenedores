import {
  AlgorithmPackingResult,
  Container,
  ContainerPackingResult,
  Item,
  Layer,
  ScrapPad,
} from "./entities";

let itemsToPack: Item[];
let itemsPackedInOrder;
let layers;
let result: AlgorithmPackingResult;

let scrapfirst: ScrapPad;
let smallestZ;
let trash;

let evened;
let hundredPercentPacked = false;
let layerDone;
let packing;
let packingBest = false;
let quit = false;

let bboxi;
let bestIteration;
let bestVariant;
let boxi;
let cboxi;
let layerListLen;
let packedItemCount;
let x;

let bbfx;
let bbfy;
let bbfz;
let bboxx;
let bboxy;
let bboxz;
let bfx;
let bfy;
let bfz;
let boxx;
let boxy;
let boxz;
let cboxx;
let cboxy;
let cboxz;
let layerinlayer;
let layerThickness;
let lilz;
let packedVolume;
let packedy;
let prelayer;
let prepackedy;
let preremainpy;
let px;
let py;
let pz;
let remainpy;
let remainpz;
let itemsToPackCount = 0;
let totalItemVolume;
let totalContainerVolume;

function runSolution(container: Container, items: Item[]) {
  Initialize(container, items);
  ExecuteIterations(container);
  Report(container);

  for (let i = 1; i <= itemsToPackCount; i++) {
    itemsToPack[i].Quantity = 1;
    if (!itemsToPack[i].IsPacked) {
      result.UnpackedItems.push(itemsToPack[i]);
    }
  }
}

function Initialize(container: Container, items: Item[]) {
  let itemsToPack: Item[] = [];
  let itemsPackedInOrder: Item[];
  let result: ContainerPackingResult[];

  itemsToPack.push({ Id: 0, Dim1: 0, Dim2: 0, Dim3: 0, Volume: 0, Quantity: 0, IsPacked: false });

  let layers: Layer[] = [];

  itemsToPackCount = 0;

  items.map((item) => {
    for (let i = 0; i <= item.Quantity; i++) {
      let newItem: Item = { ...item };

      itemsToPack.push(newItem);
    }
    itemsToPackCount += item.Quantity;
  });

  itemsToPack.push({ Id: 0, Dim1: 0, Dim2: 0, Dim3: 0, Volume: 0, Quantity: 0, IsPacked: false });

  totalContainerVolume = container.Length * container.Height * container.Width;
  totalItemVolume = 0.0;

  for (x = 1; x <= itemsToPackCount; x++) {
    totalItemVolume = totalItemVolume + itemsToPack[x].Volume;
  }

  scrapfirst = {
    CumX: 0,
    CumZ: 0,
    Post: undefined,
    Pre: undefined,
  };

  packingBest = false;
  hundredPercentPacked = false;
  quit = false;
}
