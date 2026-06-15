/* ============================================================
   THE LEGEND OF MARIA - Crystal Lake Village Map
   ============================================================ */

function createCrystalLake() {
  const W = 30, H = 20;
  const G  = TILES.GRASS, G2 = TILES.GRASS2;
  const WA = TILES.LAKE_WATER, SA = TILES.SAND;
  const TT = TILES.TREE_TOP, TR = TILES.TREE_TRUNK;
  const P  = TILES.PATH, PD = TILES.PATH_DARK;
  const HW = TILES.HOUSE_WALL, HR = TILES.HOUSE_ROOF, D = TILES.DOOR;
  const FP = TILES.FLOWER_PINK, FY = TILES.FLOWER_YELL;
  const W_ = TILES.WALL, BR = TILES.BRIDGE, SG = TILES.SIGN;

  // prettier-ignore
  const data = [
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
    W_,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, TT,TT,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, TT,TT,G, G, G, G, G, G, W_,
    W_,G, TR,TR,G, HR,HR,HR,G, G, G, HR,HR,HR,G, G, G, G, G, G, G, TR,TR,G, G, G, G, G, G, W_,
    W_,G, G, G, G, HW,HW,HW,G, G, G, HW,HW,HW,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, HW,HW,HW,G, G, G, HW,HW,HW,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, FP,G, HW, D, HW,P, P, P, HW, D, HW,G, G, SG,G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, G, P, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,P, P, P, P, P, P, P, P, P, P, P, P, P, P, SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,W_,
    W_,G, G, G, G, G, P, G, G, G, G, G, P, G, G, SA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,SA,G, W_,
    W_,G, G, G, G, G, P, G, G, G, FP,G, P, G, G, SA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,SA,G, W_,
    W_,G, G, FY,G, G, P, G, G, G, G, G, P, G, BR,BR,BR,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,SA,G, W_,
    W_,G, G, G, G, G, P, G, G, G, G, G, P, G, G, SA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,SA,G, W_,
    W_,G, G, G, G, G, P, P, P, P, P, P, P, G, G, SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,G, W_,
    W_,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, TT,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, TR,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, FP,G, G, FY,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, FP,G, G, G, G, G, G, W_,
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
  ];

  const map = new Tilemap(data, W, H);
  map.mapName    = 'crystal_lake';
  map.musicTrack = 'town';

  // NPCs
  map.npcs = [
    new NPC(5,  9,  'lake_elder',   'lake_elder'),
    new NPC(10, 9,  'lake_girl',    'lake_girl'),
    new NPC(12, 7,  'lake_dancer',  'lake_dancer'),
  ];

  // Collectibles
  map.collectibles = [
    new Collectible(20, 10, 'memory', 4),
    new Collectible(23, 10, 'memory', 5),
    new Collectible(8,  10, 'coin',   null),
    new Collectible(11, 10, 'coin',   null),
    new Collectible(6,  12, 'heart',  null),
  ];

  // Transitions — placed 1 tile inside border walls to be reachable
  map.transitions = [
    // Back to Forest (west)
    {
      x: TILE_SIZE, y: 8 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'whispering_forest', spawnX: 28, spawnY: 17
    },
    // To Crystal Cave (east, bridge area)
    {
      x: (W - 2) * TILE_SIZE, y: 8 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'crystal_cave', spawnX: 3, spawnY: 8
    }
  ];

  return map;
}
