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
let smallestZ: ScrapPad;
let trash: ScrapPad;

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

export function runSolution(container: Container, items: Item[]) {
  console.log("ejecutando solucion");
  Initialize(container, items);
  console.log("Inizializado");
  ExecuteIterations(container);
  console.log("Iteraciones");
  Report(container);
  console.log("Reporte");

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
  itemsToPack = [];
  itemsPackedInOrder = [];
  result = {
    PackedItems: [],
    UnpackedItems: [],
    IsCompletePack: false,
  };

  itemsToPack.push({
    Id: 0,
    Dim1: 0,
    Dim2: 0,
    Dim3: 0,
    Volume: 0,
    Quantity: 0,
    IsPacked: false,
    CoordX: 0,
    CoordY: 0,
    CoordZ: 0,
    PackDimX: 0,
    PackDimY: 0,
    PackDimZ: 0,
  });

  layers = [];

  itemsToPackCount = 0;

  items.map((item) => {
    for (let i = 0; i <= item.Quantity; i++) {
      let newItem: Item = { ...item };

      itemsToPack.push(newItem);
    }
    itemsToPackCount += item.Quantity;
  });

  itemsToPack.push({
    Id: 0,
    Dim1: 0,
    Dim2: 0,
    Dim3: 0,
    Volume: 0,
    Quantity: 0,
    IsPacked: false,
    CoordX: 0,
    CoordY: 0,
    CoordZ: 0,
    PackDimX: 0,
    PackDimY: 0,
    PackDimZ: 0,
  });

  totalContainerVolume = container.Length * container.Height * container.Width;
  totalItemVolume = 0.0;

  for (x = 1; x <= itemsToPackCount; x++) {
    totalItemVolume = totalItemVolume + itemsToPack[x].Volume;
  }

  scrapfirst = {
    CumX: 0,
    CumZ: 0,
    Post: null,
    Pre: null,
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
      LayerDim: 0,
    });

    ListCanditLayers();

    // layers = layers.OrderBy(l => l.LayerEval).ToList();
    layers = layers.sort((l) => l.LayerEval);

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

    layers = [];
  }
}

function ListCanditLayers() {
  console.log("Consoleand list candidLayers");
  console.log(itemsToPack);
  let same: boolean;
  let exdim = 0;
  let dimdif: number;
  let dimen2 = 0;
  let dimen3 = 0;
  let y: number;
  let z: number;
  let k: number;
  let layereval: number;

  layerListLen = 0;

  for (x = 1; x <= itemsToPackCount; x++) {
    for (y = 1; y <= 3; y++) {
      switch (y) {
        case 1:
          exdim = itemsToPack[x].Dim1;
          dimen2 = itemsToPack[x].Dim2;
          dimen3 = itemsToPack[x].Dim3;
          break;

        case 2:
          exdim = itemsToPack[x].Dim2;
          dimen2 = itemsToPack[x].Dim1;
          dimen3 = itemsToPack[x].Dim3;
          break;

        case 3:
          exdim = itemsToPack[x].Dim3;
          dimen2 = itemsToPack[x].Dim1;
          dimen3 = itemsToPack[x].Dim2;
          break;
      }

      if (exdim > py || ((dimen2 > px || dimen3 > pz) && (dimen3 > px || dimen2 > pz))) continue;

      same = false;

      for (k = 1; k <= layerListLen; k++) {
        if (exdim == layers[k].LayerDim) {
          same = true;
          continue;
        }
      }

      if (same) continue;

      layereval = 0;

      for (z = 1; z <= itemsToPackCount; z++) {
        if (!(x == z)) {
          dimdif = Math.abs(exdim - itemsToPack[z].Dim1);

          if (Math.abs(exdim - itemsToPack[z].Dim2) < dimdif) {
            dimdif = Math.abs(exdim - itemsToPack[z].Dim2);
          }
          if (Math.abs(exdim - itemsToPack[z].Dim3) < dimdif) {
            dimdif = Math.abs(exdim - itemsToPack[z].Dim3);
          }
          layereval = layereval + dimdif;
        }
      }

      layerListLen++;

      layers.push({ LayerDim: 0, LayerEval: 0 });
      layers[layerListLen].LayerEval = layereval;
      layers[layerListLen].LayerDim = exdim;
    }
  }
}

function PackLayer() {
  let lenx: number;
  let lenz: number;
  let lpz: number;

  if (layerThickness == 0) {
    packing = false;

    return;
  }

  scrapfirst.CumX = px;
  scrapfirst.CumZ = 0;

  for (; !quit; ) {
    FindSmallestZ();

    if (smallestZ.Pre == null && smallestZ.Post == null) {
      //*** SITUATION-1: NO BOXES ON THE RIGHT AND LEFT SIDES ***

      lenx = smallestZ.CumX;
      lpz = remainpz - smallestZ.CumZ;
      FindBox(lenx, layerThickness, remainpy, lpz, lpz);
      CheckFound();

      if (layerDone) break;
      if (evened) continue;

      itemsToPack[cboxi].CoordX = 0;
      itemsToPack[cboxi].CoordY = packedy;
      itemsToPack[cboxi].CoordZ = smallestZ.CumZ;
      if (cboxx == smallestZ.CumX) {
        smallestZ.CumZ = smallestZ.CumZ + cboxz;
      } else {
        smallestZ.Post = {
          CumX: smallestZ.CumX,
          CumZ: smallestZ.CumZ,
          Post: null,
          Pre: smallestZ,
        };

        smallestZ.CumX = cboxx;
        smallestZ.CumZ = smallestZ.CumZ + cboxz;
      }
    } else if (smallestZ.Pre == null) {
      //*** SITUATION-2: NO BOXES ON THE LEFT SIDE ***

      lenx = smallestZ.CumX;
      lenz = smallestZ.Post!.CumZ - smallestZ.CumZ;
      lpz = remainpz - smallestZ.CumZ;
      FindBox(lenx, layerThickness, remainpy, lenz, lpz);
      CheckFound();

      if (layerDone) break;
      if (evened) continue;

      itemsToPack[cboxi].CoordY = packedy;
      itemsToPack[cboxi].CoordZ = smallestZ.CumZ;
      if (cboxx == smallestZ.CumX) {
        itemsToPack[cboxi].CoordX = 0;

        if (smallestZ.CumZ + cboxz == smallestZ.Post!.CumZ) {
          smallestZ.CumZ = smallestZ.Post!.CumX;
          trash = smallestZ.Post!;
          smallestZ.Post = smallestZ.Post!.Post;

          if (smallestZ.Post != null) {
            smallestZ.Post.Pre = smallestZ;
          }
        } else {
          smallestZ.CumZ = smallestZ.CumZ + cboxz;
        }
      } else {
        itemsToPack[cboxi].CoordX = smallestZ.CumX - cboxx;

        if (smallestZ.CumZ + cboxz == smallestZ.Post!.CumZ) {
          smallestZ.CumX = smallestZ.CumX - cboxx;
        } else {
          smallestZ.Post!.Pre = { CumX: 0, CumZ: 0, Post: smallestZ.Post, Pre: smallestZ };
          smallestZ.Post = smallestZ.Post!.Pre;
          smallestZ.Post.CumX = smallestZ.CumX;
          smallestZ.CumX = smallestZ.CumX - cboxx;
          smallestZ.Post.CumZ = smallestZ.CumZ + cboxz;
        }
      }
    } else if (smallestZ.Post == null) {
      //*** SITUATION-3: NO BOXES ON THE RIGHT SIDE ***

      lenx = smallestZ.CumX - smallestZ.Pre.CumX;
      lenz = smallestZ.Pre.CumZ - smallestZ.CumZ;
      lpz = remainpz - smallestZ.CumZ;
      FindBox(lenx, layerThickness, remainpy, lenz, lpz);
      CheckFound();

      if (layerDone) break;
      if (evened) continue;

      itemsToPack[cboxi].CoordY = packedy;
      itemsToPack[cboxi].CoordZ = smallestZ.CumZ;
      itemsToPack[cboxi].CoordX = smallestZ.Pre.CumX;

      if (cboxx == smallestZ.CumX - smallestZ.Pre.CumX) {
        if (smallestZ.CumZ + cboxz == smallestZ.Pre.CumZ) {
          smallestZ.Pre.CumX = smallestZ.CumX;
          smallestZ.Pre.Post = null;
        } else {
          smallestZ.CumZ = smallestZ.CumZ + cboxz;
        }
      } else {
        if (smallestZ.CumZ + cboxz == smallestZ.Pre.CumZ) {
          smallestZ.Pre.CumX = smallestZ.Pre.CumX + cboxx;
        } else {
          smallestZ.Pre.Post = { CumX: 0, CumZ: 0, Post: null, Pre: null };

          smallestZ.Pre.Post.Pre = smallestZ.Pre;
          smallestZ.Pre.Post.Post = smallestZ;
          smallestZ.Pre = smallestZ.Pre.Post;
          smallestZ.Pre.CumX = smallestZ.Pre.Pre!.CumX + cboxx;
          smallestZ.Pre.CumZ = smallestZ.CumZ + cboxz;
        }
      }
    } else if (smallestZ.Pre.CumZ == smallestZ.Post.CumZ) {
      //*** SITUATION-4: THERE ARE BOXES ON BOTH OF THE SIDES ***

      //*** SUBSITUATION-4A: SIDES ARE EQUAL TO EACH OTHER ***

      lenx = smallestZ.CumX - smallestZ.Pre.CumX;
      lenz = smallestZ.Pre.CumZ - smallestZ.CumZ;
      lpz = remainpz - smallestZ.CumZ;

      FindBox(lenx, layerThickness, remainpy, lenz, lpz);
      CheckFound();

      if (layerDone) break;
      if (evened) continue;

      itemsToPack[cboxi].CoordY = packedy;
      itemsToPack[cboxi].CoordZ = smallestZ.CumZ;

      if (cboxx == smallestZ.CumX - smallestZ.Pre.CumX) {
        itemsToPack[cboxi].CoordX = smallestZ.Pre.CumX;

        if (smallestZ.CumZ + cboxz == smallestZ.Post.CumZ) {
          smallestZ.Pre.CumX = smallestZ.Post.CumX;

          if (smallestZ.Post.Post != null) {
            smallestZ.Pre.Post = smallestZ.Post.Post;
            smallestZ.Post.Post.Pre = smallestZ.Pre;
          } else {
            smallestZ.Pre.Post = null;
          }
        } else {
          smallestZ.CumZ = smallestZ.CumZ + cboxz;
        }
      } else if (smallestZ.Pre.CumX < px - smallestZ.CumX) {
        if (smallestZ.CumZ + cboxz == smallestZ.Pre.CumZ) {
          smallestZ.CumX = smallestZ.CumX - cboxx;
          itemsToPack[cboxi].CoordX = smallestZ.CumX;
        } else {
          itemsToPack[cboxi].CoordX = smallestZ.Pre.CumX;
          smallestZ.Pre.Post = { CumX: 0, CumZ: 0, Post: null, Pre: null };

          smallestZ.Pre.Post.Pre = smallestZ.Pre;
          smallestZ.Pre.Post.Post = smallestZ;
          smallestZ.Pre = smallestZ.Pre.Post;
          smallestZ.Pre.CumX = smallestZ.Pre.Pre!.CumX + cboxx;
          smallestZ.Pre.CumZ = smallestZ.CumZ + cboxz;
        }
      } else {
        if (smallestZ.CumZ + cboxz == smallestZ.Pre.CumZ) {
          smallestZ.Pre.CumX = smallestZ.Pre.CumX + cboxx;
          itemsToPack[cboxi].CoordX = smallestZ.Pre.CumX;
        } else {
          itemsToPack[cboxi].CoordX = smallestZ.CumX - cboxx;
          smallestZ.Post.Pre = { CumX: 0, CumZ: 0, Post: null, Pre: null };

          smallestZ.Post.Pre.Post = smallestZ.Post;
          smallestZ.Post.Pre.Pre = smallestZ;
          smallestZ.Post = smallestZ.Post.Pre;
          smallestZ.Post.CumX = smallestZ.CumX;
          smallestZ.Post.CumZ = smallestZ.CumZ + cboxz;
          smallestZ.CumX = smallestZ.CumX - cboxx;
        }
      }
    } else {
      //*** SUBSITUATION-4B: SIDES ARE NOT EQUAL TO EACH OTHER ***

      lenx = smallestZ.CumX - smallestZ.Pre.CumX;
      lenz = smallestZ.Pre.CumZ - smallestZ.CumZ;
      lpz = remainpz - smallestZ.CumZ;
      FindBox(lenx, layerThickness, remainpy, lenz, lpz);
      CheckFound();

      if (layerDone) break;
      if (evened) continue;

      itemsToPack[cboxi].CoordY = packedy;
      itemsToPack[cboxi].CoordZ = smallestZ.CumZ;
      itemsToPack[cboxi].CoordX = smallestZ.Pre.CumX;

      if (cboxx == smallestZ.CumX - smallestZ.Pre.CumX) {
        if (smallestZ.CumZ + cboxz == smallestZ.Pre.CumZ) {
          smallestZ.Pre.CumX = smallestZ.CumX;
          smallestZ.Pre.Post = smallestZ.Post;
          smallestZ.Post.Pre = smallestZ.Pre;
        } else {
          smallestZ.CumZ = smallestZ.CumZ + cboxz;
        }
      } else {
        if (smallestZ.CumZ + cboxz == smallestZ.Pre.CumZ) {
          smallestZ.Pre.CumX = smallestZ.Pre.CumX + cboxx;
        } else if (smallestZ.CumZ + cboxz == smallestZ.Post.CumZ) {
          itemsToPack[cboxi].CoordX = smallestZ.CumX - cboxx;
          smallestZ.CumX = smallestZ.CumX - cboxx;
        } else {
          //   smallestZ.Pre.Post = new ScrapPad();
          smallestZ.Pre.Post = { CumX: 0, CumZ: 0, Post: null, Pre: null };

          smallestZ.Pre.Post.Pre = smallestZ.Pre;
          smallestZ.Pre.Post.Post = smallestZ;
          smallestZ.Pre = smallestZ.Pre.Post;
          smallestZ.Pre.CumX = smallestZ.Pre.Pre!.CumX + cboxx;
          smallestZ.Pre.CumZ = smallestZ.CumZ + cboxz;
        }
      }
    }

    VolumeCheck();
  }
}

function FindBox(hmx: number, hy: number, hmy: number, hz: number, hmz: number) {
  let y;

  bfx = 32767;
  bfy = 32767;
  bfz = 32767;
  bbfx = 32767;
  bbfy = 32767;
  bbfz = 32767;
  boxi = 0;
  bboxi = 0;

  for (y = 1; y <= itemsToPackCount; y = y + itemsToPack[y].Quantity) {
    for (x = y; x < x + itemsToPack[y].Quantity - 1; x++) {
      if (!itemsToPack[x].IsPacked) break;
    }

    if (itemsToPack[x].IsPacked) continue;

    if (x > itemsToPackCount) return;

    AnalyzeBox(
      hmx,
      hy,
      hmy,
      hz,
      hmz,
      itemsToPack[x].Dim1,
      itemsToPack[x].Dim2,
      itemsToPack[x].Dim3
    );

    if (itemsToPack[x].Dim1 == itemsToPack[x].Dim3 && itemsToPack[x].Dim3 == itemsToPack[x].Dim2)
      continue;

    AnalyzeBox(
      hmx,
      hy,
      hmy,
      hz,
      hmz,
      itemsToPack[x].Dim1,
      itemsToPack[x].Dim3,
      itemsToPack[x].Dim2
    );
    AnalyzeBox(
      hmx,
      hy,
      hmy,
      hz,
      hmz,
      itemsToPack[x].Dim2,
      itemsToPack[x].Dim1,
      itemsToPack[x].Dim3
    );
    AnalyzeBox(
      hmx,
      hy,
      hmy,
      hz,
      hmz,
      itemsToPack[x].Dim2,
      itemsToPack[x].Dim3,
      itemsToPack[x].Dim1
    );
    AnalyzeBox(
      hmx,
      hy,
      hmy,
      hz,
      hmz,
      itemsToPack[x].Dim3,
      itemsToPack[x].Dim1,
      itemsToPack[x].Dim2
    );
    AnalyzeBox(
      hmx,
      hy,
      hmy,
      hz,
      hmz,
      itemsToPack[x].Dim3,
      itemsToPack[x].Dim2,
      itemsToPack[x].Dim1
    );
  }
}

function AnalyzeBox(
  hmx: number,
  hy: number,
  hmy: number,
  hz: number,
  hmz: number,
  dim1: number,
  dim2: number,
  dim3: number
) {
  if (dim1 <= hmx && dim2 <= hmy && dim3 <= hmz) {
    if (dim2 <= hy) {
      if (hy - dim2 < bfy) {
        boxx = dim1;
        boxy = dim2;
        boxz = dim3;
        bfx = hmx - dim1;
        bfy = hy - dim2;
        bfz = Math.abs(hz - dim3);
        boxi = x;
      } else if (hy - dim2 == bfy && hmx - dim1 < bfx) {
        boxx = dim1;
        boxy = dim2;
        boxz = dim3;
        bfx = hmx - dim1;
        bfy = hy - dim2;
        bfz = Math.abs(hz - dim3);
        boxi = x;
      } else if (hy - dim2 == bfy && hmx - dim1 == bfx && Math.abs(hz - dim3) < bfz) {
        boxx = dim1;
        boxy = dim2;
        boxz = dim3;
        bfx = hmx - dim1;
        bfy = hy - dim2;
        bfz = Math.abs(hz - dim3);
        boxi = x;
      }
    } else {
      if (dim2 - hy < bbfy) {
        bboxx = dim1;
        bboxy = dim2;
        bboxz = dim3;
        bbfx = hmx - dim1;
        bbfy = dim2 - hy;
        bbfz = Math.abs(hz - dim3);
        bboxi = x;
      } else if (dim2 - hy == bbfy && hmx - dim1 < bbfx) {
        bboxx = dim1;
        bboxy = dim2;
        bboxz = dim3;
        bbfx = hmx - dim1;
        bbfy = dim2 - hy;
        bbfz = Math.abs(hz - dim3);
        bboxi = x;
      } else if (dim2 - hy == bbfy && hmx - dim1 == bbfx && Math.abs(hz - dim3) < bbfz) {
        bboxx = dim1;
        bboxy = dim2;
        bboxz = dim3;
        bbfx = hmx - dim1;
        bbfy = dim2 - hy;
        bbfz = Math.abs(hz - dim3);
        bboxi = x;
      }
    }
  }
}

function CheckFound() {
  evened = false;

  if (boxi != 0) {
    cboxi = boxi;
    cboxx = boxx;
    cboxy = boxy;
    cboxz = boxz;
  } else {
    if (bboxi > 0 && (layerinlayer != 0 || (smallestZ.Pre == null && smallestZ.Post == null))) {
      if (layerinlayer == 0) {
        prelayer = layerThickness;
        lilz = smallestZ.CumZ;
      }

      cboxi = bboxi;
      cboxx = bboxx;
      cboxy = bboxy;
      cboxz = bboxz;
      layerinlayer = layerinlayer + bboxy - layerThickness;
      layerThickness = bboxy;
    } else {
      if (smallestZ.Pre == null && smallestZ.Post == null) {
        layerDone = true;
      } else {
        evened = true;

        if (smallestZ.Pre == null) {
          trash = smallestZ.Post!;
          smallestZ.CumX = smallestZ.Post!.CumX;
          smallestZ.CumZ = smallestZ.Post!.CumZ;
          smallestZ.Post = smallestZ.Post!.Post;
          if (smallestZ.Post != null) {
            smallestZ.Post.Pre = smallestZ;
          }
        } else if (smallestZ.Post == null) {
          smallestZ.Pre.Post = null;
          smallestZ.Pre.CumX = smallestZ.CumX;
        } else {
          if (smallestZ.Pre.CumZ == smallestZ.Post.CumZ) {
            smallestZ.Pre.Post = smallestZ.Post.Post;

            if (smallestZ.Post.Post != null) {
              smallestZ.Post.Post.Pre = smallestZ.Pre;
            }

            smallestZ.Pre.CumX = smallestZ.Post.CumX;
          } else {
            smallestZ.Pre.Post = smallestZ.Post;
            smallestZ.Post.Pre = smallestZ.Pre;

            if (smallestZ.Pre.CumZ < smallestZ.Post.CumZ) {
              smallestZ.Pre.CumX = smallestZ.CumX;
            }
          }
        }
      }
    }
  }
}

function VolumeCheck() {
  itemsToPack[cboxi].IsPacked = true;
  itemsToPack[cboxi].PackDimX = cboxx;
  itemsToPack[cboxi].PackDimY = cboxy;
  itemsToPack[cboxi].PackDimZ = cboxz;
  packedVolume = packedVolume + itemsToPack[cboxi].Volume;
  packedItemCount++;

  if (packingBest) {
    OutputBoxList();
  } else if (packedVolume == totalContainerVolume || packedVolume == totalItemVolume) {
    packing = false;
    hundredPercentPacked = true;
  }
}

function OutputBoxList() {
  let packCoordX = 0;
  let packCoordY = 0;
  let packCoordZ = 0;
  let packDimX = 0;
  let packDimY = 0;
  let packDimZ = 0;

  switch (bestVariant) {
    case 1:
      packCoordX = itemsToPack[cboxi].CoordX;
      packCoordY = itemsToPack[cboxi].CoordY;
      packCoordZ = itemsToPack[cboxi].CoordZ;
      packDimX = itemsToPack[cboxi].PackDimX;
      packDimY = itemsToPack[cboxi].PackDimY;
      packDimZ = itemsToPack[cboxi].PackDimZ;
      break;

    case 2:
      packCoordX = itemsToPack[cboxi].CoordZ;
      packCoordY = itemsToPack[cboxi].CoordY;
      packCoordZ = itemsToPack[cboxi].CoordX;
      packDimX = itemsToPack[cboxi].PackDimZ;
      packDimY = itemsToPack[cboxi].PackDimY;
      packDimZ = itemsToPack[cboxi].PackDimX;
      break;

    case 3:
      packCoordX = itemsToPack[cboxi].CoordY;
      packCoordY = itemsToPack[cboxi].CoordZ;
      packCoordZ = itemsToPack[cboxi].CoordX;
      packDimX = itemsToPack[cboxi].PackDimY;
      packDimY = itemsToPack[cboxi].PackDimZ;
      packDimZ = itemsToPack[cboxi].PackDimX;
      break;

    case 4:
      packCoordX = itemsToPack[cboxi].CoordY;
      packCoordY = itemsToPack[cboxi].CoordX;
      packCoordZ = itemsToPack[cboxi].CoordZ;
      packDimX = itemsToPack[cboxi].PackDimY;
      packDimY = itemsToPack[cboxi].PackDimX;
      packDimZ = itemsToPack[cboxi].PackDimZ;
      break;

    case 5:
      packCoordX = itemsToPack[cboxi].CoordX;
      packCoordY = itemsToPack[cboxi].CoordZ;
      packCoordZ = itemsToPack[cboxi].CoordY;
      packDimX = itemsToPack[cboxi].PackDimX;
      packDimY = itemsToPack[cboxi].PackDimZ;
      packDimZ = itemsToPack[cboxi].PackDimY;
      break;

    case 6:
      packCoordX = itemsToPack[cboxi].CoordZ;
      packCoordY = itemsToPack[cboxi].CoordX;
      packCoordZ = itemsToPack[cboxi].CoordY;
      packDimX = itemsToPack[cboxi].PackDimZ;
      packDimY = itemsToPack[cboxi].PackDimX;
      packDimZ = itemsToPack[cboxi].PackDimY;
      break;
  }

  itemsToPack[cboxi].CoordX = packCoordX;
  itemsToPack[cboxi].CoordY = packCoordY;
  itemsToPack[cboxi].CoordZ = packCoordZ;
  itemsToPack[cboxi].PackDimX = packDimX;
  itemsToPack[cboxi].PackDimY = packDimY;
  itemsToPack[cboxi].PackDimZ = packDimZ;

  itemsPackedInOrder.push(itemsToPack[cboxi]);
}

function FindSmallestZ() {
  let scrapmemb: ScrapPad = scrapfirst;

  smallestZ = scrapmemb;

  while (scrapmemb.Post != null) {
    if (scrapmemb.Post.CumZ < smallestZ.CumZ) {
      smallestZ = scrapmemb.Post;
    }

    scrapmemb = scrapmemb.Post;
  }
}

function FindLayer(thickness: number) {
  let exdim = 0;
  let dimdif;
  let dimen2 = 0;
  let dimen3 = 0;
  let y: number;
  let z: number;
  let layereval;
  let evals = 1000000;

  layerThickness = 0;

  for (x = 1; x <= itemsToPackCount; x++) {
    if (itemsToPack[x].IsPacked) continue;

    for (y = 1; y <= 3; y++) {
      switch (y) {
        case 1:
          exdim = itemsToPack[x].Dim1;
          dimen2 = itemsToPack[x].Dim2;
          dimen3 = itemsToPack[x].Dim3;
          break;

        case 2:
          exdim = itemsToPack[x].Dim2;
          dimen2 = itemsToPack[x].Dim1;
          dimen3 = itemsToPack[x].Dim3;
          break;

        case 3:
          exdim = itemsToPack[x].Dim3;
          dimen2 = itemsToPack[x].Dim1;
          dimen3 = itemsToPack[x].Dim2;
          break;
      }

      layereval = 0;

      if (
        exdim <= thickness &&
        ((dimen2 <= px && dimen3 <= pz) || (dimen3 <= px && dimen2 <= pz))
      ) {
        for (z = 1; z <= itemsToPackCount; z++) {
          if (!(x == z) && !itemsToPack[z].IsPacked) {
            dimdif = Math.abs(exdim - itemsToPack[z].Dim1);

            if (Math.abs(exdim - itemsToPack[z].Dim2) < dimdif) {
              dimdif = Math.abs(exdim - itemsToPack[z].Dim2);
            }

            if (Math.abs(exdim - itemsToPack[z].Dim3) < dimdif) {
              dimdif = Math.abs(exdim - itemsToPack[z].Dim3);
            }

            layereval = layereval + dimdif;
          }
        }

        if (layereval < evals) {
          evals = layereval;
          layerThickness = exdim;
        }
      }
    }
  }

  if (layerThickness == 0 || layerThickness > remainpy) packing = false;
}

function Report(container: Container) {
  quit = false;

  switch (bestVariant) {
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

  packingBest = true;

  //Print("BEST SOLUTION FOUND AT ITERATION                      :", bestIteration, "OF VARIANT", bestVariant);
  //Print("TOTAL ITEMS TO PACK                                   :", itemsToPackCount);
  //Print("TOTAL VOLUME OF ALL ITEMS                             :", totalItemVolume);
  //Print("WHILE CONTAINER ORIENTATION X - Y - Z                 :", px, py, pz);

  layers = [];
  layers.push({ LayerDim: undefined, LayerEval: -1 });
  ListCanditLayers();
  layers = layers.sort((l) => l.LayerEval);
  packedVolume = 0;
  packedy = 0;
  packing = true;
  layerThickness = layers[bestIteration].LayerDim!;
  remainpy = py;
  remainpz = pz;

  for (x = 1; x <= itemsToPackCount; x++) {
    itemsToPack[x].IsPacked = false;
  }

  do {
    layerinlayer = 0;
    layerDone = false;
    PackLayer();
    packedy = packedy + layerThickness;
    remainpy = py - packedy;

    if (layerinlayer > 0.0001) {
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

    if (!quit) {
      FindLayer(remainpy);
    }
  } while (packing && !quit);
}
