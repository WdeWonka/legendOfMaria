/* ============================================================
   THE LEGEND OF MARIA - Championship Arena Map
   ============================================================ */

function createChampionshipArena() {
  const W = 30, H = 22;
  const AF = TILES.ARENA_FLOOR, AS = TILES.ARENA_STAGE;
  const CR = TILES.CROWD, W_ = TILES.WALL;
  const P  = TILES.PATH;

  // prettier-ignore
  const data = [
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
    W_,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,W_,
    W_,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,W_,
    W_,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,W_,
    W_,CR,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,CR,W_,
    W_,CR,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,CR,W_,
    W_,CR,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,CR,W_,
    W_,CR,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,AS,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,W_,P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, W_,W_,
    W_,CR,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,AF,CR,W_,
    W_,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,W_,
    W_,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,W_,
    W_,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,CR,W_,
    W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,W_,
  ];

  const map = new Tilemap(data, W, H);
  map.mapName    = 'championship_arena';
  map.musicTrack = 'victory';

  // NPCs
  map.npcs = [
    new NPC(5,  9,  'arena_guard',     'arena_guard'),
    new NPC(14, 9,  'arena_announcer', 'arena_announcer'),
  ];

  // Collectibles
  map.collectibles = [
    new Collectible(8,  12, 'memory', 9),
    new Collectible(20, 12, 'memory', 10),
    new Collectible(14,  6, 'coin',   null),
    new Collectible(6,   6, 'coin',   null),
    new Collectible(22,  6, 'coin',   null),
  ];

  // Walking to the stage exit triggers the ending
  map.transitions = [
    {
      x: 11 * TILE_SIZE, y: 4 * TILE_SIZE,
      w: 8 * TILE_SIZE,  h: TILE_SIZE,
      target: '__victory__'
    }
  ];

  return map;
}
