/* ============================================================
   THE LEGEND OF MARIA - Crystal Cave Map
   ============================================================ */

function createCrystalCave() {
  const W = 28, H = 20;
  const CF = TILES.CAVE_FLOOR, CW = TILES.CAVE_WALL;
  const CR = TILES.CRYSTAL;
  const P  = TILES.PATH;
  const W_ = TILES.WALL;

  // prettier-ignore
  const data = [
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
    W_,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,W_,
    W_,CW,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CR,CR,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CW,W_,
    W_,CW,CF,CW,CW,CF,CF,CW,CW,CF,CF,CF,CF,CF,CR,CR,CF,CF,CF,CW,CW,CF,CF,CW,CF,CF,CW,W_,
    W_,CW,CF,CW,CW,CF,CF,CW,CW,CF,CF,CR,CF,CF,CF,CF,CF,CF,CF,CW,CW,CF,CF,CW,CF,CF,CW,W_,
    W_,CW,CF,CF,CF,CF,CF,CF,CF,P, P, P, P, P, P, P, P, P, CF,CF,CF,CF,CF,CF,CF,CF,CW,W_,
    W_,CW,CW,CW,CF,CF,CF,CF,CF,P, CW,CW,CW,CW,CW,CW,CW,P, CF,CF,CF,CF,CF,CW,CW,CW,CW,W_,
    W_,CW,CR,CW,CF,CF,CF,CF,CF,P, CW,CF,CF,CF,CF,CF,CW,P, CF,CF,CF,CF,CF,CW,CR,CW,CW,W_,
    W_,P, CF,CF,CF,CF,CF,CF,CF,P, CW,CF,CF,CF,CF,CF,CW,P, CF,CF,CF,CF,CF,CF,CF,CF,P, W_,
    W_,CW,CF,CF,CF,CF,CF,CF,CF,P, CW,CF,CF,CF,CF,CF,CW,P, CF,CF,CF,CF,CF,CF,CF,CF,CW,W_,
    W_,CW,CF,CW,CW,CF,CF,CF,CF,P, CW,CF,CF,CF,CF,CF,CW,P, CF,CF,CF,CF,CW,CW,CF,CF,CW,W_,
    W_,CW,CR,CW,CW,CF,CF,CF,CF,P, CW,CF,CF,CF,CF,CF,CW,P, CF,CF,CF,CF,CW,CW,CR,CF,CW,W_,
    W_,CW,CF,CF,CF,CF,CF,CF,CF,P, CW,CW,CW,CW,CW,CW,CW,P, CF,CF,CF,CF,CF,CF,CF,CF,CW,W_,
    W_,CW,CF,CF,CR,CF,CF,CF,CF,P, P, P, P, P, P, P, P, P, CF,CF,CF,CR,CF,CF,CF,CF,CW,W_,
    W_,CW,CW,CW,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CW,CW,CW,CW,W_,
    W_,CW,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CW,W_,
    W_,CW,CF,CR,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CR,CF,CW,W_,
    W_,CW,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CF,CW,W_,
    W_,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,CW,W_,
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
  ];

  const map = new Tilemap(data, W, H);
  map.mapName    = 'crystal_cave';
  map.musicTrack = 'cave';

  // Boss in center room
  map.boss = new Boss(12, 7, 'stone_gorilla');

  // Enemies
  map.enemies = [
    new Enemy(3,  3,  'crystal_slime'),
    new Enemy(22, 3,  'crystal_slime'),
    new Enemy(3,  15, 'cave_spirit'),
    new Enemy(22, 15, 'cave_spirit'),
    new Enemy(5,  9,  'crystal_slime'),
    new Enemy(20, 9,  'crystal_slime'),
  ];

  // Collectibles
  map.collectibles = [
    new Collectible(14,  3, 'memory', 6),
    new Collectible(15,  3, 'memory', 7),
    new Collectible(3,  16, 'memory', 8),
    new Collectible(4,  7,  'coin',   null),
    new Collectible(22,  7, 'coin',   null),
    new Collectible(13, 15, 'heart',  null),
    new Collectible(8,  15, 'coin',   null),
  ];

  // Transitions — placed 1 tile inside border walls to be reachable
  map.transitions = [
    // Back to Crystal Lake (west)
    {
      x: TILE_SIZE, y: 8 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'crystal_lake', spawnX: 26, spawnY: 8
    },
    // To Championship Arena (needs both items - checked in game.js)
    {
      x: (W - 2) * TILE_SIZE, y: 8 * TILE_SIZE,
      w: TILE_SIZE * 2, h: TILE_SIZE * 2,
      target: 'championship_arena', spawnX: 15, spawnY: 16
    }
  ];

  return map;
}
