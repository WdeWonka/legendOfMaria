/* ============================================================
   THE LEGEND OF MARIA - Sunflower Town Map
   ============================================================ */

function createSunflowerTown() {
  const W = 30, H = 20;
  const G = TILES.GRASS, G2 = TILES.GRASS2, FP = TILES.FLOWER_PINK;
  const FY = TILES.FLOWER_YELL, P = TILES.PATH, PD = TILES.PATH_DARK;
  const HW = TILES.HOUSE_WALL, HR = TILES.HOUSE_ROOF, D = TILES.DOOR;
  const TT = TILES.TREE_TOP, TR = TILES.TREE_TRUNK, FN = TILES.FENCE;
  const W_ = TILES.WALL, SG = TILES.SIGN, SF = TILES.SHOP_FRONT;
  const WA = TILES.WATER, BR = TILES.BRIDGE;

  // prettier-ignore
  const data = [
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
    W_,TT,TT,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, TT,TT,TT,G, G, G, G, TT,W_,
    W_,TR,TR,G, G, FP,G, G, G, G, FY,G, G, G, G, FP,G, G, G, FY,G, TR,TR,TR,G, G, G, G, TR,W_,
    W_,G, G, G, HR,HR,HR,HR,G, HR,HR,HR,HR,G, HR,HR,HR,HR,G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, HW,HW,HW,HW,G, HW,HW,HW,HW,G, HW,SF, SF,HW,G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, HW,HW,HW,HW,G, HW,HW,HW,HW,G, HW,SF, SF,HW,G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, HW, D, HW,HW,P, HW, D, HW,HW,P, HW, D, HW,HW,P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, FP,G, G, P, G, G, P, G, P, G, G, P, G, P, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, P, G, G, P, G, P, G, G, P, G, P, G, G, P, G, G, G, G, G, TT,TT,G, G, G, W_,
    W_,FY,G, G, G, P, P, P, P, P, P, P, P, P, P, P, P, P, P, G, G, G, G, G, TR,TR,G, G, FP,W_,
    W_,G, G, SG,G, P, G, G, G, G, G, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, P, G, G, G, FP,G, G, FY,G, G, G, FP,G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,TT,G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,TR,G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, FY,G, P, G, G, G, G, G, HR,HR,HR,G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, P, G, G, G, G, G, HW,HW,HW,G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, G, G, G, P, G, G, G, G, G, HW, D, HW,G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, W_,
    W_,G, FP,G, G, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, G, G, G, G, G, G, W_,
    W_,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W_,
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
  ];

  const map = new Tilemap(data, W, H);
  map.mapName   = 'sunflower_town';
  map.musicTrack = 'town';

  // NPCs
  map.npcs = [
    new NPC(5, 7,  'best_friend',  'best_friend'),
    new NPC(9, 11, 'old_lady',     'old_lady'),
    new NPC(15,11, 'young_dancer', 'young_dancer'),
    new NPC(12, 7, 'kid',          'kid'),
    new NPC(20, 9, 'cat',          'cat'),
  ];

  // Collectibles: coins and memory crystals
  map.collectibles = [
    new Collectible(7,  11, 'coin', null),
    new Collectible(13, 12, 'coin', null),
    new Collectible(17, 11, 'coin', null),
    new Collectible(22,  9, 'memory', 1),   // Memory #1
    new Collectible(25,  2, 'memory', 2),   // Memory #2
  ];

  // Transition to forest (east side, row 17-18) — placed 1 tile inside the border wall
  map.transitions = [
    {
      x: (W - 2) * TILE_SIZE, y: 17 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'whispering_forest', spawnX: 3, spawnY: 17
    }
  ];

  return map;
}
