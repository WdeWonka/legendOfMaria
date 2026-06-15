/* ============================================================
   THE LEGEND OF MARIA - Save System (localStorage)
   ============================================================ */

const Save = (() => {
  const KEY = 'legend_of_maria_save';

  const defaults = {
    currentMap: 'sunflower_town',
    playerX: 7 * TILE_SIZE,
    playerY: 10 * TILE_SIZE,
    hp: 5,
    maxHp: 5,
    coins: 0,
    hasCostume: false,
    hasPole: false,
    memoriesCollected: [],
    defeatedBosses: [],
    version: 1
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...defaults };
      return { ...defaults, ...JSON.parse(raw) };
    } catch(e) {
      return { ...defaults };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch(e) {}
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  return { load, save, clear, defaults };
})();
