/* ============================================================
   THE LEGEND OF MARIA - Whispering Forest Map
   ============================================================ */

function createWhisperingForest() {
  const W = 32, H = 22;
  const G  = TILES.GRASS, G2 = TILES.GRASS2;
  const FD = TILES.FOREST_DARK;
  const TT = TILES.TREE_TOP,  TR = TILES.TREE_TRUNK;
  const P  = TILES.PATH, PD = TILES.PATH_DARK;
  const W_ = TILES.WALL;
  const FP = TILES.FLOWER_PINK, FY = TILES.FLOWER_YELL;

  // prettier-ignore
  const data = [
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
    W_,FD,FD,FD,FD,TT,TT,FD,FD,FD,FD,TT,TT,FD,FD,FD,FD,TT,TT,FD,FD,FD,FD,TT,TT,FD,FD,FD,FD,FD,FD,W_,
    W_,FD,FD,FD,FD,TR,TR,FD,FD,FD,FD,TR,TR,FD,FD,FD,FD,TR,TR,FD,FD,FD,FD,TR,TR,FD,FD,FD,FD,FD,FD,W_,
    W_,FD,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, FD,FD,W_,
    W_,FD,G, TT,TT,G, G, TT,G, G, G, G, TT,G, G, G, G, G, G, G, TT,G, G, TT,G, G, G, G, G, FD,FD,W_,
    W_,FD,G, TR,TR,G, G, TR,G, G, P, G, TR,G, G, P, G, G, G, G, TR,G, G, TR,G, G, G, FD,FD,FD,FD,W_,
    W_,FD,G, G, G, G, G, G, G, G, P, G, G, G, G, P, G, G, G, G, G, G, G, G, G, G, FD,FD,FD,FD,FD,W_,
    W_,FD,G, G, G, FP,G, G, G, G, P, G, G, G, G, P, G, G, FP,G, G, G, G, G, G, G, FD,FD,FD,FD,FD,W_,
    W_,FD,G, G, G, G, G, TT,G, G, P, G, G, G, G, P, G, G, G, G, TT,G, G, G, G, G, G, FD,FD,FD,FD,W_,
    W_,FD,G, G, G, G, G, TR,G, G, P, G, G, FY,G, P, G, G, G, G, TR,G, G, G, G, G, G, FD,FD,FD,FD,W_,
    W_,FD,G, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, G, G, FD,FD,FD,FD,W_,
    W_,FD,G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, G, FD,FD,FD,FD,W_,
    W_,FD,G, P, G, TT,G, G, G, G, G, G, G, G, G, G, G, G, TT,G, G, G, G, G, P, G, FD,FD,FD,FD,FD,W_,
    W_,FD,G, P, G, TR,G, G, FP,G, G, G, G, FP,G, G, G, G, TR,G, G, G, G, G, P, G, FD,FD,FD,FD,FD,W_,
    W_,FD,G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, P, G, FD,FD,FD,FD,FD,W_,
    W_,FD,G, P, G, G, G, G, G, G, FD,FD,G, G, G, G, G, G, G, G, G, G, G, G, P, G, FD,FD,FD,FD,FD,W_,
    W_,FD,G, P, G, G, G, G, G, FD,FD,FD,FD,G, G, G, G, G, G, G, G, G, G, G, P, G, G, FD,FD,FD,FD,W_,
    W_,P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, W_,
    W_,FD,G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, FD,FD,FD,FD,W_,
    W_,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,W_,
    W_,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,FD,W_,
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
  ];

  const map = new Tilemap(data, W, H);
  map.mapName    = 'whispering_forest';
  map.musicTrack = 'forest';

  // Boss
  map.boss = new Boss(14, 6, 'shadow_tailor');

  // Enemies (spawn only after boss is beaten via game logic)
  map.enemies = [
    new Enemy(7,  4,  'raccoon'),
    new Enemy(20, 4,  'raccoon'),
    new Enemy(10, 13, 'bat'),
    new Enemy(18, 13, 'bat'),
    new Enemy(6,  15, 'raccoon'),
    new Enemy(22, 15, 'raccoon'),
  ];

  // Collectibles
  map.collectibles = [
    new Collectible(12, 7,  'memory', 3),   // Memory #3
    new Collectible(20, 11, 'coin',   null),
    new Collectible(6,  10, 'coin',   null),
    new Collectible(14, 14, 'heart',  null),
    new Collectible(22, 14, 'coin',   null),
  ];

  // Transitions — placed 1 tile inside border walls to be reachable
  map.transitions = [
    // Back to Sunflower Town (west side)
    {
      x: TILE_SIZE, y: 17 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'sunflower_town', spawnX: 26, spawnY: 17
    },
    // Forward to Crystal Lake (east side) — blocked until shadow_tailor is defeated
    {
      x: (W - 2) * TILE_SIZE, y: 17 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'crystal_lake', spawnX: 3, spawnY: 8,
      requiresBoss: 'shadow_tailor'
    }
  ];

  return map;
}
