/* ============================================================
   THE LEGEND OF MARIA - Main Game Engine
   ============================================================ */

const Game = (() => {

  const canvas     = document.getElementById('gameCanvas');
  const ctx        = canvas.getContext('2d');
  const titleEl    = document.getElementById('title-screen');
  const titleCanvas= document.getElementById('title-sprite-canvas');
  const titleCtx   = titleCanvas.getContext('2d');
  const transEl    = document.getElementById('transition-overlay');

  // ── Game state ──────────────────────────────────────────────
  let mode         = 'title'; // title | opening | playing | boss_intro | boss_post | victory | final
  let currentMap   = null;
  let player       = null;
  let lastTime     = 0;
  let titleAnim    = 0;
  let arenaTriggered = false;
  let mapChanging  = false;

  const state = {
    currentMap: 'sunflower_town',
    playerX: 7 * TILE_SIZE,
    playerY: 10 * TILE_SIZE,
    hp: 5, maxHp: 5,
    coins: 0,
    hasCostume: false,
    hasPole: false,
    memoriesCollected: [],
    defeatedBosses: [],
  };

  const MAP_MUSIC = {
    sunflower_town:    'town',
    whispering_forest: 'forest',
    crystal_lake:      'town',
    crystal_cave:      'cave',
    championship_arena:'victory',
  };

  const MAP_FACTORIES = {
    sunflower_town:       createSunflowerTown,
    whispering_forest:    createWhisperingForest,
    crystal_lake:         createCrystalLake,
    crystal_cave:         createCrystalCave,
    championship_arena:   createChampionshipArena,
  };

  // ── Init ────────────────────────────────────────────────────
  function init() {
    Input.init();
    const saved = Save.load();
    Object.assign(state, saved);
    runTitleAnim();
    requestAnimationFrame(loop);

    // Start on button click / touch / key
    document.getElementById('btn-start').addEventListener('click', () => {
      if (mode === 'title') startGame();
    });
    document.getElementById('btn-start').addEventListener('touchend', (e) => {
      e.preventDefault();
      if (mode === 'title') startGame();
    });
    document.getElementById('btn-a').addEventListener('click', () => {
      if (mode === 'title') startGame();
    });
    document.getElementById('btn-a').addEventListener('touchend', (e) => {
      e.preventDefault();
      if (mode === 'title') startGame();
    });
  }

  function runTitleAnim() {
    if (mode !== 'title') return;
    titleCtx.clearRect(0, 0, 64, 64);
    const f = Math.floor(Date.now() / 220) % 4;
    Sprites.drawMaria(titleCtx, 16, 8, 'down', f, false);
    titleAnim = requestAnimationFrame(runTitleAnim);
  }

  // ── Start ───────────────────────────────────────────────────
  function startGame() {
    if (mode !== 'title') return;
    mode = 'opening';
    titleEl.classList.add('hidden');
    cancelAnimationFrame(titleAnim);

    loadMap(state.currentMap, state.playerX / TILE_SIZE, state.playerY / TILE_SIZE);

    Cutscenes.playOpening(() => {
      mode = 'playing';
      HUD.show();
      syncHUD();
      Audio.playMusic(MAP_MUSIC[state.currentMap] || 'town');
    });
  }

  // ── Load Map ────────────────────────────────────────────────
  function loadMap(mapName, spawnTileX, spawnTileY) {
    const factory = MAP_FACTORIES[mapName];
    if (!factory) return;

    currentMap = factory();

    // Mark defeated bosses
    if (currentMap.boss && state.defeatedBosses.includes(currentMap.boss.type)) {
      currentMap.boss.dead       = true;
      currentMap.boss.state      = 'dead';
      currentMap.boss.deathTimer = 99;
      HUD.hideBoss();
    }

    // Remove already-collected memories
    currentMap.collectibles = currentMap.collectibles.filter(c =>
      !(c.type === 'memory' && state.memoriesCollected.includes(c.id))
    );

    state.currentMap = mapName;

    const px = spawnTileX * TILE_SIZE;
    const py = spawnTileY * TILE_SIZE;

    if (!player) {
      player = new Player(px, py);
      player.hp    = state.hp;
      player.maxHp = state.maxHp;
    } else {
      player.x = px;
      player.y = py;
      player.attacking = false;
    }
    player.attackDamage = 15 + state.memoriesCollected.length * 5;

    Camera.follow(player.cx, player.cy, currentMap.pixelW, currentMap.pixelH);
  }

  // ── Main Loop ────────────────────────────────────────────────
  function loop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;
    update(dt, timestamp);
    draw(timestamp);
    requestAnimationFrame(loop);
  }

  // ── Update ──────────────────────────────────────────────────
  function update(dt, timestamp) {

    if (mode === 'title') {
      if (Input.pressed('start') || Input.pressed('a')) startGame();
      Input.endFrame();
      return;
    }

    if (mode === 'opening' || mode === 'victory' || mode === 'final') {
      Input.endFrame();
      return;
    }

    // ── Boss dialogue modes ─────────────────────────────────────
    if (mode === 'boss_intro' || mode === 'boss_post') {
      if (Input.pressed('a') || Input.pressed('start')) Dialogue.advance();
      Dialogue.update(dt);
      Input.endFrame();
      return;
    }

    if (mode !== 'playing') { Input.endFrame(); return; }

    // ── Pause / Select ──────────────────────────────────────────
    if (Input.pressed('start')) {
      if (Menus.isPauseOpen()) Menus.closePause();
      else if (!Dialogue.isActive()) Menus.openPause();
    }
    if (Input.pressed('select') && !Menus.isPauseOpen() && !Dialogue.isActive()) {
      Menus.openMemories({ state });
    }

    // ── Pause menu navigation ───────────────────────────────────
    if (Menus.isPauseOpen()) {
      if (Input.pressed('up'))   Menus.pauseUp();
      if (Input.pressed('down')) Menus.pauseDown();
      if (Input.pressed('a'))    Menus.pauseConfirm({ state, goToTitle, changeMap });
      Input.endFrame();
      return;
    }

    if (Menus.isAnyOpen()) { Input.endFrame(); return; }

    // ── Dialogue advance ────────────────────────────────────────
    if (Dialogue.isActive()) {
      if (Input.pressed('a') || Input.pressed('start')) Dialogue.advance();
      Dialogue.update(dt);
      Input.endFrame();
      return;
    }

    // ── Player update ───────────────────────────────────────────
    if (!player || !currentMap || mapChanging) { Input.endFrame(); return; }

    player.update(dt, currentMap, null);
    state.hp    = player.hp;
    state.playerX = player.x;
    state.playerY = player.y;

    if (player.hp <= 0) {
      respawnPlayer();
      Input.endFrame();
      return;
    }

    HUD.updateHearts(player.hp, player.maxHp);
    Camera.smoothFollow(player.cx, player.cy, currentMap.pixelW, currentMap.pixelH, dt);

    // ── Map update ──────────────────────────────────────────────
    currentMap.update(dt, player, {
      state,
      changeMap,
      collectMemory,
      onBossDefeated,
      goToTitle
    });

    // ── Boss proximity trigger ──────────────────────────────────
    if (currentMap.boss &&
        !currentMap.boss.dead &&
        currentMap.boss.state === 'idle' &&
        !state.defeatedBosses.includes(currentMap.boss.type)) {
      const dx = player.cx - currentMap.boss.cx;
      const dy = player.cy - currentMap.boss.cy;
      if (Math.hypot(dx, dy) < 110) {
        triggerBossIntro(currentMap.boss.type);
      }
    }

    // ── Arena trigger ───────────────────────────────────────────
    if (state.currentMap === 'championship_arena' && !arenaTriggered) {
      if (!state.hasCostume || !state.hasPole) {
        // Block with guard dialogue handled via NPC
      } else {
        arenaTriggered = true;
        mode = 'victory';
        setTimeout(() => {
          Cutscenes.playVictory(() => {
            mode = 'final';
            Cutscenes.playFinal(() => goToTitle());
          });
        }, 2500);
      }
    }

    // ── Auto-save ───────────────────────────────────────────────
    Save.save(state);
    Input.endFrame();
  }

  // ── Draw ────────────────────────────────────────────────────
  function draw(timestamp) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    if (mode === 'title') {
      drawStars(ctx, timestamp);
      return;
    }

    if (!currentMap || !player) return;

    ctx.save();
    Camera.apply(ctx);

    // Tiles
    currentMap.draw(ctx, Camera.x, Camera.y);

    // All entities sorted by Y (painter's algorithm)
    const ents = [];
    for (const npc of currentMap.npcs)         ents.push({ y: npc.y + 16,        fn: () => npc.draw(ctx) });
    for (const e   of currentMap.enemies)       ents.push({ y: e.y + 16,          fn: () => e.draw(ctx) });
    for (const c   of currentMap.collectibles)  ents.push({ y: c.y,               fn: () => c.draw(ctx) });
    if (currentMap.boss)                        ents.push({ y: currentMap.boss.y + 20, fn: () => currentMap.boss.draw(ctx) });
    ents.push({ y: player.y + 20, fn: () => player.draw(ctx) });
    ents.sort((a, b) => a.y - b.y);
    for (const e of ents) e.fn();

    ctx.restore();

    // Cave ambient
    if (state.currentMap === 'crystal_cave') {
      ctx.fillStyle = 'rgba(30,0,50,0.32)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }

    // Vignette
    const vg = ctx.createRadialGradient(CANVAS_W/2, CANVAS_H/2, CANVAS_H*0.28, CANVAS_W/2, CANVAS_H/2, CANVAS_H*0.82);
    vg.addColorStop(0, 'transparent');
    vg.addColorStop(1, 'rgba(0,0,0,0.38)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }

  function drawStars(ctx, timestamp) {
    const t = timestamp / 1000;
    ctx.fillStyle = 'rgba(2,0,12,0.6)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    for (let i = 0; i < 35; i++) {
      const sx = ((Math.sin(i * 127.3 + t * 0.04) * 0.5 + 0.5) * CANVAS_W) | 0;
      const sy = ((Math.cos(i * 311.7 + t * 0.03) * 0.5 + 0.5) * CANVAS_H) | 0;
      const a  = 0.3 + Math.sin(t * 1.5 + i) * 0.25;
      ctx.fillStyle = `rgba(220,180,255,${a})`;
      ctx.fillRect(sx, sy, 1 + (i % 3 === 0 ? 1 : 0), 1 + (i % 5 === 0 ? 1 : 0));
    }
  }

  // ── Boss flow ────────────────────────────────────────────────
  function triggerBossIntro(bossType) {
    if (mode !== 'playing') return;
    const bData = BOSS_DATA[bossType];
    mode = 'boss_intro';
    Audio.stopMusic();
    Audio.playMusic('boss');
    HUD.showBoss(bData.name);
    HUD.updateBossHp(bData.hp, bData.maxHp);
    Dialogue.show(bData.dialoguePre, () => {
      currentMap.boss.startFight();
      mode = 'playing';
    });
  }

  function onBossDefeated(bossType) {
    if (state.defeatedBosses.includes(bossType)) return;
    state.defeatedBosses.push(bossType);
    mode = 'boss_post';
    Audio.stopMusic();

    const bData = BOSS_DATA[bossType];
    setTimeout(() => {
      Dialogue.show(bData.dialoguePost, () => {
        if (bData.reward === 'costume') {
          state.hasCostume = true;
          HUD.setCostume(true);
          Audio.SFX.itemGet();
          Notifications.show('💗 ¡Obtuviste: Traje del Campeonato!', 3500);
        } else if (bData.reward === 'pole') {
          state.hasPole = true;
          HUD.setPole(true);
          Audio.SFX.itemGet();
          Notifications.show('⚡ ¡Obtuviste: Pole Dorado!', 3500);
        }
        if (state.hasCostume && state.hasPole) {
          setTimeout(() => Notifications.show('✨ ¡Ambos objetos recuperados! ¡Ve al Arena!', 4000), 2000);
        }
        Save.save(state);
        Audio.playMusic(MAP_MUSIC[state.currentMap] || 'town');
        mode = 'playing';
      });
    }, 1000);
  }

  // ── Collectible callback ─────────────────────────────────────
  function collectMemory(id) {
    if (!state.memoriesCollected.includes(id)) {
      state.memoriesCollected.push(id);
      if (player) player.attackDamage = 15 + state.memoriesCollected.length * 5;
      const mem = MEMORY_DATA.find(m => m.id === id);
      if (mem) Notifications.show(`${mem.icon} Memoria: ${mem.subtitle}`, 3000);
      Save.save(state);
    }
  }

  // ── Map change ───────────────────────────────────────────────
  function changeMap(targetMap, spawnX, spawnY) {
    if (mapChanging) return;

    if (targetMap === 'championship_arena' && (!state.hasCostume || !state.hasPole)) {
      if (!Dialogue.isActive()) {
        const missing = !state.hasCostume && !state.hasPole ? 'tu Traje y el Pole Dorado'
          : !state.hasCostume ? 'tu Traje del Campeonato'
          : 'tu Pole Dorado de Competencia';
        Dialogue.show([["Guard Rex", `Necesitas ${missing}\n¡antes de entrar al Arena!`, "¡Ve a encontrarlos primero!"]]);
      }
      return;
    }

    mapChanging = true;
    transEl.classList.add('fade-in');
    Audio.SFX.transition();

    setTimeout(() => {
      loadMap(targetMap, spawnX, spawnY);
      Audio.playMusic(MAP_MUSIC[targetMap] || 'town');
      syncHUD();
      transEl.classList.remove('fade-in');
      mapChanging = false;
    }, 480);
  }

  // ── Player death ─────────────────────────────────────────────
  function respawnPlayer() {
    Notifications.show('💔 Caíste... ¡De vuelta a Sunflower Town!', 3000);
    setTimeout(() => {
      player.hp = player.maxHp;
      player.invincibleTimer = 2;
      state.hp = player.maxHp;
      changeMap('sunflower_town', 7, 10);
      syncHUD();
    }, 1200);
  }

  // ── Go to title ──────────────────────────────────────────────
  function goToTitle() {
    mode         = 'title';
    currentMap   = null;
    player       = null;
    arenaTriggered = false;
    mapChanging  = false;
    titleEl.classList.remove('hidden');
    HUD.hide();
    HUD.hideBoss();
    Audio.stopMusic();
    Audio.playMusic('title');
    runTitleAnim();
  }

  // ── Sync HUD ─────────────────────────────────────────────────
  function syncHUD() {
    HUD.updateHearts(player ? player.hp : state.hp, state.maxHp);
    HUD.updateCoins(state.coins);
    HUD.setCostume(state.hasCostume);
    HUD.setPole(state.hasPole);
  }

  return { init, state, changeMap, collectMemory, onBossDefeated, goToTitle };
})();

// ── Boot ─────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Lazy audio init on first touch/click/key
  const tryAudio = () => { Audio.init(); Audio.playMusic('title'); };
  document.addEventListener('touchstart', tryAudio, { once: true, passive: true });
  document.addEventListener('mousedown',  tryAudio, { once: true });
  document.addEventListener('keydown',    tryAudio, { once: true });

  Game.init();
});
