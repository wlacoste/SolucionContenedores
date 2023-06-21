import {
  AlgorithmPackingResult,
  Container,
  ContainerPackingResult,
  Item,
  Layer,
  ScrapPad,
} from "./entities";

let itemsToPack: Item[];
let itemsPackedInOrder: Item[];
let layers: Layer[];
let result: AlgorithmPackingResult;

let scrapfirst: ScrapPad;
let smallestZ;
let trash;

let evened: boolean;
let hundredPercentPacked: boolean = false;
let layerDone: boolean;
let packing: boolean;
let packingBest: boolean = false;
let quit: boolean = false;

let bboxi: number;
let bestIteration: number;
let bestVariant: number;
let boxi: number;
let cboxi: number;
let layerListLen: number;
let packedItemCount: number;
let x: number;

let bbfx: number;
let bbfy: number;
let bbfz: number;
let bboxx: number;
let bboxy: number;
let bboxz: number;
let bfx: number;
let bfy: number;
let bfz: number;
let boxx: number;
let boxy: number;
let boxz: number;
let cboxx: number;
let cboxy: number;
let cboxz: number;
let layerinlayer: number;
let layerThickness: number;
let lilz: number;
let packedVolume: number;
let packedy: number;
let prelayer: number;
let prepackedy: number;
let preremainpy: number;
let px: number;
let py: number;
let pz: number;
let remainpy: number;
let remainpz: number;
let itemsToPackCount = 0;
let totalItemVolume: number;
let totalContainerVolume: number;

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
  result.PackedItems = itemsPackedInOrder;

  if (result.UnpackedItems.length == 0) {
    result.IsCompletePack = true;
  }

  return result;
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

function ExecuteIterations(container: Container) {
  let itelayer: number;
  let layersIndex: number;
  let bestVolume = 0.0;

  for (
    let containerOrientationVariant = 1;
    containerOrientationVariant <= 6 && !quit;
    containerOrientationVariant++
  ) {
    switch (containerOrientationVariant) {
      case 1:
        px = container.Length;
        py = container.Height;
        pz = container.Width;
        break;

      case 2:
        px = container.Width;
        py = container.Height;
        pz = container.Length;
        break;

      case 3:
        px = container.Width;
        py = container.Length;
        pz = container.Height;
        break;

      case 4:
        px = container.Height;
        py = container.Length;
        pz = container.Width;
        break;

      case 5:
        px = container.Length;
        py = container.Width;
        pz = container.Height;
        break;

      case 6:
        px = container.Height;
        py = container.Width;
        pz = container.Length;
        break;
    }

    layers.push({
      LayerEval: -1,
      LayerDim: undefined,
    });
    ListCanditLayers();
    // layers = layers.OrderBy(l => l.LayerEval).ToList();

    for (layersIndex = 1; layersIndex <= layerListLen && !quit; layersIndex++) {
      packedVolume = 0.0;
      packedy = 0;
      packing = true;
      layerThickness = 0;
      if (layers[layersIndex].LayerDim !== undefined) {
        layerThickness = layers[layersIndex].LayerDim!;
      }
      itelayer = layersIndex;
      remainpy = py;
      remainpz = pz;
      packedItemCount = 0;

      for (x = 1; x <= itemsToPackCount; x++) {
        itemsToPack[x].IsPacked = false;
      }

      do {
        layerinlayer = 0;
        layerDone = false;

        PackLayer();

        packedy = packedy + layerThickness;
        remainpy = py - packedy;

        if (layerinlayer != 0 && !quit) {
          prepackedy = packedy;
          preremainpy = remainpy;
          remainpy = layerThickness - prelayer;
          packedy = packedy - layerThickness + prelayer;
          remainpz = lilz;
          layerThickness = layerinlayer;
          layerDone = false;

          PackLayer();

          packedy = prepackedy;
          remainpy = preremainpy;
          remainpz = pz;
        }

        FindLayer(remainpy);
      } while (packing && !quit);

      if (packedVolume > bestVolume && !quit) {
        bestVolume = packedVolume;
        bestVariant = containerOrientationVariant;
        bestIteration = itelayer;
      }

      if (hundredPercentPacked) break;
    }

    if (hundredPercentPacked) break;

    if (container.Length == container.Height && container.Height == container.Width)
      containerOrientationVariant = 6;

    layers = new List<Layer>();
  }
}
