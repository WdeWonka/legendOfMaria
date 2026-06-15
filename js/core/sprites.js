/* ============================================================
   THE LEGEND OF MARIA - Pixel Art Sprite Renderer
   All sprites drawn procedurally with canvas 2D API
   ============================================================ */

const Sprites = {

  // ── Tile Rendering ─────────────────────────────────────────

  drawTile(ctx, tileId, px, py) {
    const S = TILE_SIZE;
    ctx.save();
    ctx.translate(px, py);
    switch (tileId) {
      case TILES.GRASS:       this._grass(ctx, S, '#5ea832'); break;
      case TILES.GRASS2:      this._grass(ctx, S, '#52a028'); break;
      case TILES.FLOWER_PINK: this._flowerTile(ctx, S, '#ff80c0'); break;
      case TILES.FLOWER_YELL: this._flowerTile(ctx, S, '#ffe060'); break;
      case TILES.PATH:        this._path(ctx, S, '#c8a878'); break;
      case TILES.PATH_DARK:   this._path(ctx, S, '#b09060'); break;
      case TILES.WALL:        this._wall(ctx, S); break;
      case TILES.HOUSE_WALL:  this._houseWall(ctx, S); break;
      case TILES.HOUSE_ROOF:  this._houseRoof(ctx, S); break;
      case TILES.WATER:
      case TILES.LAKE_WATER:  this._water(ctx, S); break;
      case TILES.SAND:        this._sand(ctx, S); break;
      case TILES.TREE_TRUNK:  this._treeTrunk(ctx, S); break;
      case TILES.TREE_TOP:    this._treeTop(ctx, S); break;
      case TILES.FOREST_DARK: this._forestDark(ctx, S); break;
      case TILES.CAVE_FLOOR:  this._caveFloor(ctx, S); break;
      case TILES.CAVE_WALL:   this._caveWall(ctx, S); break;
      case TILES.CRYSTAL:     this._crystal(ctx, S); break;
      case TILES.ARENA_FLOOR: this._arenaFloor(ctx, S); break;
      case TILES.ARENA_STAGE: this._arenaStage(ctx, S); break;
      case TILES.CROWD:       this._crowd(ctx, S); break;
      case TILES.FENCE:       this._fence(ctx, S); break;
      case TILES.DOOR:        this._door(ctx, S); break;
      case TILES.SIGN:        this._sign(ctx, S); break;
      case TILES.CHEST:       this._chest(ctx, S); break;
      case TILES.SHOP_FRONT:  this._shopFront(ctx, S); break;
      case TILES.BRIDGE:      this._bridge(ctx, S); break;
      default:
        ctx.fillStyle = '#3a2060';
        ctx.fillRect(0, 0, S, S);
    }
    ctx.restore();
  },

  _grass(ctx, S, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    for (let i = 0; i < 4; i++) {
      const bx = (i * 5 + 2) % S;
      const by = (i * 7 + 1) % S;
      ctx.fillRect(bx, by, 2, 1);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillRect(1, 1, 3, 1);
  },

  _flowerTile(ctx, S, flowerColor) {
    this._grass(ctx, S, '#5ea832');
    ctx.fillStyle = flowerColor;
    ctx.fillRect(3, 6, 2, 2);
    ctx.fillRect(10, 3, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, 6, 1, 1);
    ctx.fillRect(11, 3, 1, 1);
    // stem
    ctx.fillStyle = '#3a7020';
    ctx.fillRect(4, 8, 1, 2);
    ctx.fillRect(11, 5, 1, 2);
  },

  _path(ctx, S, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect((i*6)+1, (i*5)+2, 3, 1);
    }
  },

  _wall(ctx, S) {
    ctx.fillStyle = '#6a5a7a';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#5a4a6a';
    for (let y = 0; y < S; y += 4) {
      ctx.fillRect(0, y, S, 1);
    }
    for (let x = 0; x < S; x += 8) {
      ctx.fillRect(x, 0, 1, S);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(0, 0, S, 2);
  },

  _houseWall(ctx, S) {
    ctx.fillStyle = '#f0e0d0';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#d8c8b8';
    for (let y = 0; y < S; y += 4) {
      ctx.fillRect(0, y, S, 1);
    }
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    for (let x = 0; x < S; x += 8) {
      for (let y = 0; y < S; y += 4) {
        ctx.fillRect(x + (y%8===0 ? 0 : 4), y, 1, 3);
      }
    }
  },

  _houseRoof(ctx, S) {
    ctx.fillStyle = '#c04040';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#a83030';
    for (let y = 0; y < S; y += 3) {
      ctx.fillRect(0, y + 2, S, 1);
    }
    ctx.fillStyle = 'rgba(255,200,200,0.2)';
    ctx.fillRect(0, 0, S, 2);
  },

  _water(ctx, S) {
    ctx.fillStyle = '#4488cc';
    ctx.fillRect(0, 0, S, S);
    const t = (Date.now() / 1000) % 2;
    const waveOff = Math.sin(t * Math.PI) * 2;
    ctx.fillStyle = 'rgba(100,180,255,0.4)';
    ctx.fillRect(0, 4 + waveOff, S, 2);
    ctx.fillRect(0, 11 + waveOff, S, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(2, 2, 4, 1);
    ctx.fillRect(10, 9, 3, 1);
  },

  _sand(ctx, S) {
    ctx.fillStyle = '#e8d888';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(3, 4, 2, 1);
    ctx.fillRect(9, 10, 3, 1);
    ctx.fillRect(12, 3, 2, 1);
  },

  _treeTrunk(ctx, S) {
    this._grass(ctx, S, '#5ea832');
    ctx.fillStyle = '#7a5030';
    ctx.fillRect(5, 8, 6, 8);
    ctx.fillStyle = '#6a4020';
    ctx.fillRect(6, 9, 1, 6);
    ctx.fillRect(9, 9, 1, 6);
  },

  _treeTop(ctx, S) {
    this._grass(ctx, S, '#5ea832');
    ctx.fillStyle = '#3a7030';
    ctx.fillRect(2, 0, 12, 10);
    ctx.fillStyle = '#4a9040';
    ctx.fillRect(3, 0, 10, 8);
    ctx.fillStyle = '#5aaa50';
    ctx.fillRect(5, 0, 6, 5);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(5, 1, 3, 2);
    ctx.fillStyle = '#2a6020';
    ctx.fillRect(2, 8, 1, 2);
    ctx.fillRect(13, 8, 1, 2);
  },

  _forestDark(ctx, S) {
    ctx.fillStyle = '#2a4020';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#3a5028';
    ctx.fillRect(0, 0, 8, S);
    ctx.fillStyle = '#1a3015';
    ctx.fillRect(8, 0, 8, S);
    ctx.fillStyle = 'rgba(100,200,80,0.1)';
    ctx.fillRect(3, 3, 2, 2);
    ctx.fillRect(10, 8, 3, 2);
  },

  _caveFloor(ctx, S) {
    ctx.fillStyle = '#3a3545';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#2d2838';
    ctx.fillRect(1, 1, 3, 2);
    ctx.fillRect(8, 6, 4, 2);
    ctx.fillRect(12, 12, 3, 2);
  },

  _caveWall(ctx, S) {
    ctx.fillStyle = '#252030';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#1a1525';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#302840';
    ctx.fillRect(2, 3, 5, 4);
    ctx.fillRect(9, 9, 4, 4);
    ctx.fillStyle = '#1a1020';
    ctx.fillRect(3, 4, 3, 2);
    ctx.fillRect(10, 10, 2, 2);
  },

  _crystal(ctx, S) {
    this._caveFloor(ctx, S);
    const t = (Date.now() / 800) % (Math.PI * 2);
    const glow = 0.5 + Math.sin(t) * 0.3;
    ctx.fillStyle = `rgba(160,100,255,${glow})`;
    ctx.fillRect(6, 2, 4, 12);
    ctx.fillStyle = `rgba(200,150,255,${glow * 0.8})`;
    ctx.fillRect(7, 1, 2, 2);
    ctx.fillStyle = `rgba(240,200,255,0.6)`;
    ctx.fillRect(7, 4, 1, 3);
  },

  _arenaFloor(ctx, S) {
    ctx.fillStyle = '#b8a870';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#a89860';
    ctx.fillRect(0, 0, S, 1);
    ctx.fillRect(0, 0, 1, S);
    ctx.fillStyle = 'rgba(255,220,100,0.15)';
    for (let i = 0; i < S; i += 4) {
      ctx.fillRect(i, i, 1, 1);
    }
  },

  _arenaStage(ctx, S) {
    ctx.fillStyle = '#d4a850';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#f0c870';
    ctx.fillRect(1, 1, S-2, 3);
    ctx.fillStyle = '#c09040';
    ctx.fillRect(0, S-2, S, 2);
    // spotlight gleam
    ctx.fillStyle = 'rgba(255,255,200,0.2)';
    ctx.fillRect(4, 4, 8, 8);
  },

  _crowd(ctx, S) {
    // Colorful crowd silhouettes
    const crowdColors = ['#cc4444','#44aa44','#4488cc','#cc88cc','#ccaa44','#44cccc'];
    ctx.fillStyle = crowdColors[(Math.floor(Date.now()/500)) % crowdColors.length];
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#222';
    ctx.fillRect(3, 6, 4, 8);
    ctx.fillRect(10, 4, 4, 10);
    ctx.fillStyle = '#ffcc88';
    ctx.fillRect(4, 4, 3, 3);
    ctx.fillRect(11, 2, 3, 3);
  },

  _fence(ctx, S) {
    this._grass(ctx, S, '#5ea832');
    ctx.fillStyle = '#d0b888';
    ctx.fillRect(0, 4, S, 2);
    ctx.fillRect(0, 9, S, 2);
    ctx.fillRect(2, 0, 2, S);
    ctx.fillRect(12, 0, 2, S);
    ctx.fillStyle = '#b89860';
    ctx.fillRect(3, 0, 1, S);
    ctx.fillRect(13, 0, 1, S);
  },

  _door(ctx, S) {
    this._houseWall(ctx, S);
    ctx.fillStyle = '#7a4020';
    ctx.fillRect(4, 6, 8, 10);
    ctx.fillStyle = '#9a6040';
    ctx.fillRect(5, 7, 6, 8);
    ctx.fillStyle = '#ffcc40';
    ctx.fillRect(11, 10, 1, 1);
  },

  _sign(ctx, S) {
    this._grass(ctx, S, '#5ea832');
    ctx.fillStyle = '#c8a040';
    ctx.fillRect(6, 2, 8, 8);
    ctx.fillStyle = '#a88030';
    ctx.fillRect(7, 3, 6, 6);
    ctx.fillStyle = '#7a5020';
    ctx.fillRect(9, 10, 2, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(8, 5, 4, 1);
    ctx.fillRect(8, 7, 4, 1);
  },

  _chest(ctx, S) {
    this._grass(ctx, S, '#5ea832');
    ctx.fillStyle = '#a86820';
    ctx.fillRect(2, 6, 12, 8);
    ctx.fillStyle = '#c88840';
    ctx.fillRect(3, 7, 10, 6);
    ctx.fillStyle = '#7a4810';
    ctx.fillRect(2, 6, 12, 3);
    ctx.fillStyle = '#ffd040';
    ctx.fillRect(6, 8, 4, 4);
    ctx.fillStyle = '#ffee80';
    ctx.fillRect(7, 9, 2, 2);
    // Lock
    ctx.fillStyle = '#cc9920';
    ctx.fillRect(7, 9, 2, 3);
    ctx.fillStyle = '#ffe040';
    ctx.fillRect(7, 8, 2, 2);
  },

  _shopFront(ctx, S) {
    ctx.fillStyle = '#f0e8d0';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#e08040';
    ctx.fillRect(0, 0, S, 5);
    ctx.fillStyle = '#f09050';
    ctx.fillRect(0, 1, S, 2);
    ctx.fillStyle = '#c070c0';
    ctx.fillRect(2, 6, 5, 6);
    ctx.fillRect(9, 6, 5, 6);
    ctx.fillStyle = '#88aaee';
    ctx.fillRect(3, 7, 3, 4);
    ctx.fillRect(10, 7, 3, 4);
  },

  _bridge(ctx, S) {
    ctx.fillStyle = '#4488cc';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#c8a878';
    ctx.fillRect(0, 3, S, 10);
    ctx.fillStyle = '#b09060';
    ctx.fillRect(0, 3, S, 1);
    ctx.fillRect(0, 12, S, 1);
    ctx.fillStyle = '#a08050';
    for (let x = 0; x < S; x += 4) {
      ctx.fillRect(x, 4, 1, 8);
    }
  },

  // ── Character Sprites ───────────────────────────────────────

  drawMaria(ctx, x, y, dir, frame, isRunning) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    const f = frame % 4;
    const legSwing = Math.sin(f * Math.PI / 2) * 2;
    const armSwing = -legSwing;
    const headBob  = isRunning ? Math.abs(Math.sin(f * Math.PI / 2)) * 1 : 0;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(8, 28 - headBob, 6, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    if (dir === 'down') {
      this._mariaFront(ctx, f, legSwing, armSwing, headBob);
    } else if (dir === 'up') {
      this._mariaBack(ctx, f, legSwing, armSwing, headBob);
    } else {
      ctx.save();
      if (dir === 'right') ctx.scale(-1, 1), ctx.translate(-16, 0);
      this._mariaSide(ctx, f, legSwing, armSwing, headBob);
      ctx.restore();
    }

    ctx.restore();
  },

  _mariaFront(ctx, f, legSwing, armSwing, headBob) {
    // Hair / ponytail
    ctx.fillStyle = '#3a1a00';
    ctx.fillRect(2, 1 + headBob, 12, 7);
    ctx.fillStyle = '#5a2a00';
    ctx.fillRect(3, 1 + headBob, 10, 5);
    // Ponytail
    ctx.fillStyle = '#5a2a00';
    ctx.fillRect(12, 2 + headBob, 3, 5);
    ctx.fillRect(13, 5 + headBob, 2, 3);
    // Pink bow
    ctx.fillStyle = '#ff80c0';
    ctx.fillRect(11, 1 + headBob, 3, 2);
    ctx.fillRect(12, 0 + headBob, 1, 1);
    // Skin - face
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(4, 3 + headBob, 8, 6);
    // Eyes
    ctx.fillStyle = '#3a2060';
    ctx.fillRect(5, 5 + headBob, 2, 2);
    ctx.fillRect(9, 5 + headBob, 2, 2);
    // Eye whites
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 5 + headBob, 1, 1);
    ctx.fillRect(10, 5 + headBob, 1, 1);
    // Blush
    ctx.fillStyle = 'rgba(255,120,120,0.5)';
    ctx.fillRect(4, 7 + headBob, 2, 1);
    ctx.fillRect(10, 7 + headBob, 2, 1);
    // Mouth
    ctx.fillStyle = '#c06040';
    ctx.fillRect(7, 8 + headBob, 2, 1);
    // Body - outfit (purple/pink)
    ctx.fillStyle = '#8040b0';
    ctx.fillRect(3, 9 + headBob, 10, 8);
    ctx.fillStyle = '#a060d0';
    ctx.fillRect(4, 10 + headBob, 8, 6);
    // Waist belt
    ctx.fillStyle = '#ff80c0';
    ctx.fillRect(3, 15 + headBob, 10, 2);
    // Arms
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(0, 10 + headBob - armSwing, 3, 6);
    ctx.fillRect(13, 10 + headBob + armSwing, 3, 6);
    // Hands
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(0, 15 + headBob - armSwing, 3, 2);
    ctx.fillRect(13, 15 + headBob + armSwing, 3, 2);
    // Skirt / shorts
    ctx.fillStyle = '#c050a0';
    ctx.fillRect(2, 17 + headBob, 12, 4);
    ctx.fillStyle = '#d060b0';
    ctx.fillRect(3, 17 + headBob, 10, 3);
    // Legs
    ctx.fillStyle = '#f0b090';
    ctx.fillRect(3, 21 + headBob + legSwing, 4, 5);
    ctx.fillRect(9, 21 + headBob - legSwing, 4, 5);
    // Shoes
    ctx.fillStyle = '#4040cc';
    ctx.fillRect(2, 25 + headBob + legSwing, 5, 2);
    ctx.fillRect(9, 25 + headBob - legSwing, 5, 2);
  },

  _mariaBack(ctx, f, legSwing, armSwing, headBob) {
    // Hair (back view)
    ctx.fillStyle = '#3a1a00';
    ctx.fillRect(2, 1 + headBob, 12, 8);
    ctx.fillStyle = '#5a2a00';
    ctx.fillRect(3, 2 + headBob, 10, 6);
    // Long ponytail
    ctx.fillStyle = '#5a2a00';
    ctx.fillRect(10, 3 + headBob, 3, 10);
    ctx.fillRect(11, 12 + headBob, 2, 4);
    // Pink bow
    ctx.fillStyle = '#ff80c0';
    ctx.fillRect(10, 1 + headBob, 3, 2);
    // Head back
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(4, 2 + headBob, 8, 5);
    // Body
    ctx.fillStyle = '#8040b0';
    ctx.fillRect(3, 9 + headBob, 10, 8);
    ctx.fillStyle = '#6030a0';
    ctx.fillRect(4, 10 + headBob, 8, 6);
    // Arms
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(0, 10 + headBob + armSwing, 3, 6);
    ctx.fillRect(13, 10 + headBob - armSwing, 3, 6);
    // Belt
    ctx.fillStyle = '#ff80c0';
    ctx.fillRect(3, 15 + headBob, 10, 2);
    // Skirt back
    ctx.fillStyle = '#c050a0';
    ctx.fillRect(2, 17 + headBob, 12, 4);
    // Legs
    ctx.fillStyle = '#f0b090';
    ctx.fillRect(3, 21 + headBob + legSwing, 4, 5);
    ctx.fillRect(9, 21 + headBob - legSwing, 4, 5);
    // Shoes
    ctx.fillStyle = '#4040cc';
    ctx.fillRect(2, 25 + headBob + legSwing, 5, 2);
    ctx.fillRect(9, 25 + headBob - legSwing, 5, 2);
  },

  _mariaSide(ctx, f, legSwing, armSwing, headBob) {
    // Hair (side)
    ctx.fillStyle = '#3a1a00';
    ctx.fillRect(3, 1 + headBob, 10, 7);
    ctx.fillStyle = '#5a2a00';
    ctx.fillRect(4, 2 + headBob, 8, 5);
    // Ponytail (side, flowing back)
    ctx.fillStyle = '#5a2a00';
    ctx.fillRect(1, 3 + headBob, 3, 8);
    ctx.fillRect(0, 8 + headBob, 2, 4);
    // Bow
    ctx.fillStyle = '#ff80c0';
    ctx.fillRect(1, 2 + headBob, 3, 2);
    // Face
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(5, 3 + headBob, 7, 6);
    ctx.fillStyle = '#3a2060';
    ctx.fillRect(10, 5 + headBob, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(11, 5 + headBob, 1, 1);
    // Nose
    ctx.fillStyle = '#d09070';
    ctx.fillRect(11, 7 + headBob, 1, 1);
    // Mouth
    ctx.fillStyle = '#c06040';
    ctx.fillRect(9, 8 + headBob, 2, 1);
    // Blush
    ctx.fillStyle = 'rgba(255,120,120,0.4)';
    ctx.fillRect(9, 7 + headBob, 2, 1);
    // Body
    ctx.fillStyle = '#8040b0';
    ctx.fillRect(4, 9 + headBob, 9, 8);
    ctx.fillStyle = '#a060d0';
    ctx.fillRect(5, 10 + headBob, 7, 6);
    // Belt
    ctx.fillStyle = '#ff80c0';
    ctx.fillRect(4, 15 + headBob, 9, 2);
    // Front arm
    ctx.fillStyle = '#f5c8a0';
    ctx.fillRect(12, 10 + headBob - armSwing, 3, 6);
    // Back arm
    ctx.fillStyle = '#d0a080';
    ctx.fillRect(2, 10 + headBob + armSwing, 3, 6);
    // Skirt
    ctx.fillStyle = '#c050a0';
    ctx.fillRect(3, 17 + headBob, 10, 4);
    // Legs
    ctx.fillStyle = '#f0b090';
    ctx.fillRect(4, 21 + headBob + legSwing, 4, 5);
    ctx.fillRect(8, 21 + headBob - legSwing, 4, 5);
    // Shoes
    ctx.fillStyle = '#4040cc';
    ctx.fillRect(3, 25 + headBob + legSwing, 5, 2);
    ctx.fillRect(7, 25 + headBob - legSwing, 5, 2);
  },

  // ── Attack Effect ───────────────────────────────────────────

  drawAttack(ctx, x, y, dir, progress) {
    const alpha = 1 - progress;
    const spread = progress * 28;
    ctx.save();
    ctx.globalAlpha = alpha;

    // Determine offset based on direction
    let ox = 0, oy = 0;
    if (dir === 'right') ox = spread;
    else if (dir === 'left') ox = -spread;
    else if (dir === 'down') oy = spread;
    else if (dir === 'up') oy = -spread;

    const cx = x + 8 + ox;
    const cy = y + 14 + oy;
    const r  = 8 + spread * 0.5;

    // Outer glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(0.3, '#ff80d0');
    grd.addColorStop(0.7, '#c040ff');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Star sparkles around attack
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + progress * Math.PI;
      const sr = r * 0.8;
      const sx = cx + Math.cos(angle) * sr;
      const sy = cy + Math.sin(angle) * sr;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(sx) - 1, Math.round(sy) - 1, 3, 3);
      ctx.fillStyle = '#ffb0e0';
      ctx.fillRect(Math.round(sx), Math.round(sy), 1, 1);
    }

    ctx.restore();
  },

  // ── NPC Sprites ─────────────────────────────────────────────

  drawNPC(ctx, x, y, type, frame) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    const f = frame % 2;
    const bob = f * 1;
    switch (type) {
      case 'best_friend': this._npcSofia(ctx, bob); break;
      case 'old_lady':    this._npcOldLady(ctx, bob); break;
      case 'young_dancer': this._npcDancer(ctx, bob); break;
      case 'kid':         this._npcKid(ctx, bob); break;
      case 'cat':         this._npcCat(ctx, bob); break;
      case 'lake_elder':  this._npcElder(ctx, bob); break;
      case 'lake_girl':   this._npcLakeGirl(ctx, bob); break;
      case 'lake_dancer': this._npcLakeDancer(ctx, bob); break;
      case 'arena_guard': this._npcGuard(ctx, bob); break;
      case 'arena_announcer': this._npcAnnouncer(ctx, bob); break;
      default:            this._npcGeneric(ctx, bob, '#8888ff'); break;
    }
    ctx.restore();
  },

  _npcGeneric(ctx, bob, color) {
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(5, 1 + bob, 6, 6);
    ctx.fillStyle = color; ctx.fillRect(4, 7 + bob, 8, 8);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(1, 8 + bob, 3, 5);
    ctx.fillRect(12, 8 + bob, 3, 5);
    ctx.fillStyle = '#5050cc'; ctx.fillRect(4, 15 + bob, 4, 5);
    ctx.fillRect(8, 15 + bob, 4, 5);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(6, 3 + bob, 1, 2);
    ctx.fillRect(9, 3 + bob, 1, 2);
    ctx.fillStyle = '#5a3010'; ctx.fillRect(4, 1 + bob, 8, 3);
  },

  _npcSofia(ctx, bob) {
    // Best friend - pink outfit, blonde hair
    ctx.fillStyle = '#ffe080'; ctx.fillRect(3, 0 + bob, 10, 7);
    ctx.fillStyle = '#ffd040'; ctx.fillRect(4, 1 + bob, 8, 5);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    ctx.fillStyle = '#ff8050'; ctx.fillRect(7, 7 + bob, 2, 1);
    ctx.fillStyle = '#ff66aa'; ctx.fillRect(3, 8 + bob, 10, 8);
    ctx.fillStyle = '#ff99cc'; ctx.fillRect(4, 9 + bob, 8, 6);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 5);
    ctx.fillRect(13, 9 + bob, 3, 5);
    ctx.fillStyle = '#6644aa'; ctx.fillRect(4, 16 + bob, 4, 5);
    ctx.fillRect(8, 16 + bob, 4, 5);
    ctx.fillStyle = '#ff66aa'; ctx.fillRect(2, 9 + bob, 2, 1);
  },

  _npcOldLady(ctx, bob) {
    // White/gray hair, purple shawl, cane
    ctx.fillStyle = '#e0e0e0'; ctx.fillRect(3, 0 + bob, 10, 7);
    ctx.fillStyle = '#cccccc'; ctx.fillRect(4, 1 + bob, 8, 5);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    ctx.fillStyle = '#c06040'; ctx.fillRect(7, 7 + bob, 2, 1);
    // Wrinkles
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(5, 5 + bob, 6, 1);
    ctx.fillStyle = '#7050a0'; ctx.fillRect(2, 8 + bob, 12, 10);
    ctx.fillStyle = '#9070c0'; ctx.fillRect(3, 9 + bob, 10, 8);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 5);
    ctx.fillRect(13, 9 + bob, 3, 5);
    ctx.fillStyle = '#5a3010'; ctx.fillRect(4, 18 + bob, 4, 5);
    ctx.fillRect(8, 18 + bob, 4, 5);
    // Cane
    ctx.fillStyle = '#a07030'; ctx.fillRect(13, 12 + bob, 2, 12);
    ctx.fillRect(11, 12 + bob, 4, 2);
  },

  _npcDancer(ctx, bob) {
    // Young dancer - teal leotard, dark hair, tall
    ctx.fillStyle = '#2a1a00'; ctx.fillRect(4, 0 + bob, 8, 7);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    ctx.fillStyle = '#ff9060'; ctx.fillRect(4, 7 + bob, 2, 1); ctx.fillRect(10, 7 + bob, 2, 1);
    ctx.fillStyle = '#008888'; ctx.fillRect(3, 8 + bob, 10, 9);
    ctx.fillStyle = '#00aaaa'; ctx.fillRect(4, 9 + bob, 8, 7);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 6);
    ctx.fillRect(13, 9 + bob, 3, 6);
    ctx.fillStyle = '#444488'; ctx.fillRect(4, 17 + bob, 4, 5);
    ctx.fillRect(8, 17 + bob, 4, 5);
  },

  _npcKid(ctx, bob) {
    // Smaller sprite, overalls, red cap
    ctx.fillStyle = '#cc2020'; ctx.fillRect(4, 0 + bob, 8, 4);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#2a2090'; ctx.fillRect(5, 4 + bob, 2, 1);
    ctx.fillRect(9, 4 + bob, 2, 1);
    ctx.fillStyle = '#cc6030'; ctx.fillRect(7, 7 + bob, 2, 1);
    ctx.fillStyle = '#4466cc'; ctx.fillRect(3, 8 + bob, 10, 7);
    ctx.fillStyle = '#5588ee'; ctx.fillRect(4, 9 + bob, 8, 5);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 4);
    ctx.fillRect(13, 9 + bob, 3, 4);
    ctx.fillStyle = '#2244aa'; ctx.fillRect(4, 15 + bob, 4, 4);
    ctx.fillRect(8, 15 + bob, 4, 4);
    // Straps
    ctx.fillStyle = '#4466cc'; ctx.fillRect(5, 8 + bob, 2, 1);
    ctx.fillRect(9, 8 + bob, 2, 1);
  },

  _npcCat(ctx, bob) {
    // Orange tabby cat
    ctx.fillStyle = '#e08020';
    ctx.fillRect(3, 8 + bob, 10, 8);
    ctx.fillStyle = '#f0a040';
    ctx.fillRect(4, 9 + bob, 8, 6);
    // Head
    ctx.fillStyle = '#e08020';
    ctx.fillRect(4, 2 + bob, 8, 8);
    ctx.fillStyle = '#f0a040';
    ctx.fillRect(5, 3 + bob, 6, 6);
    // Ears
    ctx.fillStyle = '#e08020';
    ctx.fillRect(3, 0 + bob, 3, 4);
    ctx.fillRect(10, 0 + bob, 3, 4);
    ctx.fillStyle = '#ff9090';
    ctx.fillRect(4, 1 + bob, 1, 2);
    ctx.fillRect(11, 1 + bob, 1, 2);
    // Eyes
    ctx.fillStyle = '#22aa22';
    ctx.fillRect(5, 5 + bob, 3, 2);
    ctx.fillRect(9, 5 + bob, 3, 2);
    ctx.fillStyle = '#111111';
    ctx.fillRect(6, 5 + bob, 1, 2);
    ctx.fillRect(10, 5 + bob, 1, 2);
    // Nose, whiskers
    ctx.fillStyle = '#ff8080';
    ctx.fillRect(7, 8 + bob, 2, 1);
    ctx.fillStyle = '#c06010';
    ctx.fillRect(0, 8 + bob, 3, 1);
    ctx.fillRect(13, 8 + bob, 3, 1);
    // Tail
    ctx.fillStyle = '#e08020';
    ctx.fillRect(1, 11 + bob, 3, 5);
    ctx.fillRect(0, 14 + bob, 4, 2);
    // Stripes
    ctx.fillStyle = '#c06010';
    ctx.fillRect(5, 10 + bob, 6, 1);
    ctx.fillRect(5, 12 + bob, 6, 1);
    // Legs
    ctx.fillRect(4, 16 + bob, 3, 3);
    ctx.fillRect(9, 16 + bob, 3, 3);
    ctx.fillStyle = '#ffe0c0';
    ctx.fillRect(4, 18 + bob, 3, 1);
    ctx.fillRect(9, 18 + bob, 3, 1);
  },

  _npcElder(ctx, bob) {
    // Wise elder - white robe, staff, long beard
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 1 + bob, 8, 7);
    ctx.fillStyle = '#e0e0e0'; ctx.fillRect(3, 0 + bob, 10, 4);
    // Long beard
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(4, 7 + bob, 8, 6);
    ctx.fillRect(5, 12 + bob, 6, 4);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 3 + bob, 2, 2);
    ctx.fillRect(9, 3 + bob, 2, 2);
    // Robe
    ctx.fillStyle = '#ffffff'; ctx.fillRect(2, 8 + bob, 12, 11);
    ctx.fillStyle = '#e0d8f0'; ctx.fillRect(3, 9 + bob, 10, 9);
    // Staff
    ctx.fillStyle = '#aa8040'; ctx.fillRect(14, 4 + bob, 2, 16);
    ctx.fillStyle = '#ffcc00'; ctx.fillRect(13, 2 + bob, 4, 3);
    ctx.fillRect(14, 3 + bob, 2, 2);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(12, 9 + bob, 2, 5);
    ctx.fillStyle = '#5050aa'; ctx.fillRect(4, 19 + bob, 3, 2);
    ctx.fillRect(9, 19 + bob, 3, 2);
  },

  _npcLakeGirl(ctx, bob) {
    // Girl near lake - blue dress
    ctx.fillStyle = '#aa7040'; ctx.fillRect(4, 0 + bob, 8, 7);
    ctx.fillStyle = '#cc9060'; ctx.fillRect(5, 1 + bob, 6, 5);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    ctx.fillStyle = '#c06040'; ctx.fillRect(7, 7 + bob, 2, 1);
    ctx.fillStyle = '#2266cc'; ctx.fillRect(3, 8 + bob, 10, 8);
    ctx.fillStyle = '#4488ee'; ctx.fillRect(4, 9 + bob, 8, 6);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 5);
    ctx.fillRect(13, 9 + bob, 3, 5);
    ctx.fillStyle = '#1144aa'; ctx.fillRect(2, 16 + bob, 12, 4);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 20 + bob, 4, 2);
    ctx.fillRect(8, 20 + bob, 4, 2);
    ctx.fillStyle = '#2244aa'; ctx.fillRect(3, 21 + bob, 4, 2);
    ctx.fillRect(9, 21 + bob, 4, 2);
  },

  _npcLakeDancer(ctx, bob) {
    // Male dancer near lake - green outfit
    ctx.fillStyle = '#5a3010'; ctx.fillRect(3, 0 + bob, 10, 7);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    ctx.fillStyle = '#206020'; ctx.fillRect(3, 8 + bob, 10, 9);
    ctx.fillStyle = '#308030'; ctx.fillRect(4, 9 + bob, 8, 7);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 6);
    ctx.fillRect(13, 9 + bob, 3, 6);
    ctx.fillStyle = '#1a4010'; ctx.fillRect(4, 17 + bob, 4, 5);
    ctx.fillRect(8, 17 + bob, 4, 5);
    ctx.fillStyle = '#106010'; ctx.fillRect(3, 21 + bob, 4, 2);
    ctx.fillRect(9, 21 + bob, 4, 2);
  },

  _npcGuard(ctx, bob) {
    // Arena guard - armored, impressive
    ctx.fillStyle = '#c0a040'; ctx.fillRect(3, 0 + bob, 10, 7);
    ctx.fillStyle = '#e0c060'; ctx.fillRect(5, 1 + bob, 6, 5);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(5, 3 + bob, 6, 5);
    ctx.fillStyle = '#333'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    // Armor
    ctx.fillStyle = '#606080'; ctx.fillRect(2, 8 + bob, 12, 10);
    ctx.fillStyle = '#808090'; ctx.fillRect(3, 9 + bob, 10, 8);
    ctx.fillStyle = '#c0a040'; ctx.fillRect(5, 9 + bob, 6, 2);
    ctx.fillStyle = '#606080'; ctx.fillRect(0, 8 + bob, 2, 7);
    ctx.fillRect(14, 8 + bob, 2, 7);
    ctx.fillStyle = '#404060'; ctx.fillRect(4, 18 + bob, 4, 5);
    ctx.fillRect(8, 18 + bob, 4, 5);
    ctx.fillStyle = '#303050'; ctx.fillRect(3, 22 + bob, 4, 2);
    ctx.fillRect(9, 22 + bob, 4, 2);
    // Spear
    ctx.fillStyle = '#888'; ctx.fillRect(15, 0 + bob, 2, 22);
    ctx.fillStyle = '#c0c0c0'; ctx.fillRect(14, -2 + bob, 4, 4);
    ctx.fillStyle = '#e0e0e0'; ctx.fillRect(15, -3 + bob, 2, 3);
  },

  _npcAnnouncer(ctx, bob) {
    // Flashy announcer - tuxedo, mic
    ctx.fillStyle = '#5a3010'; ctx.fillRect(4, 0 + bob, 8, 7);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(4, 2 + bob, 8, 6);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(5, 4 + bob, 2, 2);
    ctx.fillRect(9, 4 + bob, 2, 2);
    ctx.fillStyle = '#c06040'; ctx.fillRect(7, 7 + bob, 2, 1);
    ctx.fillStyle = '#111'; ctx.fillRect(3, 8 + bob, 10, 9);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(7, 9 + bob, 2, 5);
    ctx.fillStyle = '#cc3333'; ctx.fillRect(7, 9 + bob, 2, 2);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(0, 9 + bob, 3, 6);
    ctx.fillRect(13, 9 + bob, 3, 6);
    ctx.fillStyle = '#333'; ctx.fillRect(4, 17 + bob, 4, 5);
    ctx.fillRect(8, 17 + bob, 4, 5);
    // Microphone
    ctx.fillStyle = '#888'; ctx.fillRect(14, 8 + bob, 2, 8);
    ctx.fillStyle = '#aaa'; ctx.fillRect(13, 6 + bob, 4, 3);
  },

  // ── Enemy Sprites ───────────────────────────────────────────

  drawEnemy(ctx, x, y, type, frame, hp, maxHp) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    const f = frame % 4;

    switch (type) {
      case 'raccoon':     this._enemyRaccoon(ctx, f); break;
      case 'bat':         this._enemyBat(ctx, f); break;
      case 'crystal_slime': this._enemyCrystalSlime(ctx, f); break;
      case 'cave_spirit': this._enemyCaveSpirit(ctx, f); break;
    }

    // Small HP bar
    if (hp < maxHp) {
      const bw = 16;
      const bh = 2;
      ctx.fillStyle = '#300';
      ctx.fillRect(0, -4, bw, bh);
      ctx.fillStyle = '#f04060';
      ctx.fillRect(0, -4, bw * (hp / maxHp), bh);
    }

    ctx.restore();
  },

  _enemyRaccoon(ctx, f) {
    const bob = Math.sin(f * Math.PI / 2) * 1;
    // Body
    ctx.fillStyle = '#808090';
    ctx.fillRect(2, 6 + bob, 12, 10);
    ctx.fillStyle = '#a0a0b0';
    ctx.fillRect(3, 7 + bob, 10, 8);
    // Head
    ctx.fillStyle = '#808090';
    ctx.fillRect(3, 0 + bob, 10, 8);
    ctx.fillStyle = '#a0a0b0';
    ctx.fillRect(4, 1 + bob, 8, 6);
    // Mask
    ctx.fillStyle = '#303030';
    ctx.fillRect(4, 2 + bob, 3, 3);
    ctx.fillRect(9, 2 + bob, 3, 3);
    // Eyes
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(5, 3 + bob, 2, 2);
    ctx.fillRect(9, 3 + bob, 2, 2);
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(6, 3 + bob, 1, 1);
    ctx.fillRect(10, 3 + bob, 1, 1);
    // Ears
    ctx.fillStyle = '#606070';
    ctx.fillRect(2, -2 + bob, 3, 4);
    ctx.fillRect(11, -2 + bob, 3, 4);
    // Tail - striped
    ctx.fillStyle = '#808090'; ctx.fillRect(12, 10 + bob, 4, 6);
    ctx.fillStyle = '#303030';
    ctx.fillRect(12, 11 + bob, 4, 1);
    ctx.fillRect(12, 13 + bob, 4, 1);
    // Legs
    ctx.fillStyle = '#606070';
    ctx.fillRect(3, 16 + bob, 4, 3);
    ctx.fillRect(9, 16 + bob, 4, 3);
    ctx.fillStyle = '#303030';
    ctx.fillRect(2, 18 + bob, 5, 1);
    ctx.fillRect(9, 18 + bob, 5, 1);
  },

  _enemyBat(ctx, f) {
    const flap = f % 2 === 0 ? -2 : 2;
    // Wings
    ctx.fillStyle = '#4a2060';
    ctx.fillRect(0, 6 + flap, 5, 6);
    ctx.fillRect(11, 6 + flap, 5, 6);
    ctx.fillStyle = '#6a3080';
    ctx.fillRect(1, 7 + flap, 4, 4);
    ctx.fillRect(11, 7 + flap, 4, 4);
    // Body
    ctx.fillStyle = '#2a1040';
    ctx.fillRect(4, 6, 8, 10);
    ctx.fillStyle = '#4a2060';
    ctx.fillRect(5, 7, 6, 8);
    // Head
    ctx.fillStyle = '#2a1040';
    ctx.fillRect(4, 0, 8, 8);
    ctx.fillStyle = '#3a1850';
    ctx.fillRect(5, 1, 6, 6);
    // Ears
    ctx.fillStyle = '#4a2060';
    ctx.fillRect(3, -3, 3, 5);
    ctx.fillRect(10, -3, 3, 5);
    ctx.fillStyle = '#ff8080';
    ctx.fillRect(4, -2, 1, 3);
    ctx.fillRect(11, -2, 1, 3);
    // Eyes
    ctx.fillStyle = '#ff4060';
    ctx.fillRect(5, 2, 2, 2);
    ctx.fillRect(9, 2, 2, 2);
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(6, 2, 1, 1);
    ctx.fillRect(10, 2, 1, 1);
    // Fangs
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 7, 1, 2);
    ctx.fillRect(9, 7, 1, 2);
  },

  _enemyCrystalSlime(ctx, f) {
    const stretch = Math.sin(f * Math.PI / 2) * 2;
    const color = '#60d0ff';
    const darkColor = '#2090c0';
    // Slime body
    ctx.fillStyle = `rgba(96,208,255,0.85)`;
    ctx.beginPath();
    ctx.ellipse(8, 12 - stretch/2, 7 + stretch/3, 8 + stretch/2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(160,240,255,0.5)`;
    ctx.beginPath();
    ctx.ellipse(6, 10 - stretch/2, 3, 4, -0.3, 0, Math.PI * 2);
    ctx.fill();
    // Crystal shards on top
    ctx.fillStyle = '#80e8ff';
    ctx.fillRect(5, 2 - stretch, 3, 6);
    ctx.fillRect(8, 4 - stretch, 2, 4);
    ctx.fillRect(10, 3 - stretch, 2, 5);
    ctx.fillStyle = '#c0f4ff';
    ctx.fillRect(6, 2 - stretch, 1, 3);
    // Eyes
    ctx.fillStyle = '#004488';
    ctx.fillRect(5, 10, 2, 2);
    ctx.fillRect(9, 10, 2, 2);
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(6, 10, 1, 1);
    ctx.fillRect(10, 10, 1, 1);
  },

  _enemyCaveSpirit(ctx, f) {
    const t = (Date.now() / 500) % (Math.PI * 2);
    const drift = Math.sin(t) * 3;
    const alpha = 0.7 + Math.sin(t * 2) * 0.2;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(0, drift);
    // Ghostly form
    ctx.fillStyle = '#c080ff';
    ctx.fillRect(3, 2, 10, 14);
    ctx.fillStyle = '#d8a0ff';
    ctx.fillRect(4, 1, 8, 12);
    ctx.fillStyle = '#b060f0';
    ctx.fillRect(2, 8, 2, 8);
    ctx.fillRect(12, 8, 2, 8);
    ctx.fillRect(5, 14, 2, 6);
    ctx.fillRect(9, 14, 2, 6);
    // Wispy bottom
    ctx.fillStyle = '#c080ff';
    ctx.fillRect(3, 14, 10, 4);
    ctx.fillStyle = '#a050e0';
    ctx.fillRect(3, 16, 3, 2); ctx.fillRect(7, 17, 2, 1); ctx.fillRect(10, 16, 3, 2);
    // Eyes
    ctx.fillStyle = '#ffff80';
    ctx.fillRect(5, 5, 3, 3);
    ctx.fillRect(9, 5, 3, 3);
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(6, 6, 1, 1);
    ctx.fillRect(10, 6, 1, 1);
    // Mouth
    ctx.fillStyle = '#ff80ff';
    ctx.fillRect(5, 10, 6, 1);
    ctx.fillRect(6, 11, 4, 1);
    ctx.restore();
  },

  // ── Boss Sprites ────────────────────────────────────────────

  drawBoss(ctx, x, y, type, frame, phase) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    const f = frame;

    if (type === 'shadow_tailor') {
      this._bossShadowTailor(ctx, f, phase);
    } else if (type === 'stone_gorilla') {
      this._bossStoneGorilla(ctx, f, phase);
    }

    ctx.restore();
  },

  _bossShadowTailor(ctx, f, phase) {
    const t = Date.now() / 1000;
    const bob = Math.sin(t * 3) * 3;
    const sway = Math.sin(t * 2) * 4;
    // Shadow cloak
    ctx.fillStyle = '#220044';
    ctx.fillRect(4, 8 + bob, 24, 24);
    ctx.fillStyle = '#330066';
    ctx.fillRect(6, 10 + bob, 20, 20);
    // Cloak frill effect
    ctx.fillStyle = '#440088';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(4 + i*7, 30 + bob, 5, 4);
    }
    // Head
    ctx.fillStyle = '#1a0030';
    ctx.fillRect(8, -2 + bob, 16, 14);
    ctx.fillStyle = '#280050';
    ctx.fillRect(10, 0 + bob, 12, 10);
    // Hat with scissors
    ctx.fillStyle = '#0a0020';
    ctx.fillRect(6, -8 + bob, 20, 8);
    ctx.fillStyle = '#440088';
    ctx.fillRect(4, -4 + bob, 24, 4);
    // Scissors on hat
    ctx.fillStyle = '#aaaaaa';
    ctx.fillRect(12, -10 + bob, 2, 4);
    ctx.fillRect(14, -10 + bob, 2, 4);
    ctx.fillRect(11, -12 + bob, 5, 2);
    // Eyes - glowing purple
    ctx.fillStyle = '#cc44ff';
    ctx.fillRect(10, 3 + bob, 4, 4);
    ctx.fillRect(18, 3 + bob, 4, 4);
    ctx.fillStyle = '#ff88ff';
    ctx.fillRect(11, 4 + bob, 2, 2);
    ctx.fillRect(19, 4 + bob, 2, 2);
    // Smile
    ctx.fillStyle = '#8800cc';
    ctx.fillRect(11, 9 + bob, 10, 2);
    ctx.fillRect(10, 10 + bob, 2, 1);
    ctx.fillRect(20, 10 + bob, 2, 1);
    // Arms with measuring tape
    ctx.fillStyle = '#220044';
    ctx.fillRect(0, 14 + bob + sway, 8, 12);
    ctx.fillRect(24, 14 + bob - sway, 8, 12);
    // Hands
    ctx.fillStyle = '#1a0030';
    ctx.fillRect(0, 24 + bob + sway, 6, 4);
    ctx.fillRect(26, 24 + bob - sway, 6, 4);
    // Measuring tape
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(-4, 24 + bob + sway, 12, 2);
    ctx.fillStyle = '#ff8800';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(-4 + i*2, 24 + bob + sway, 1, 2);
    }
    // Phase 2: Dark energy swirling
    if (phase >= 2) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 6; i++) {
        const angle = t * 2 + (i / 6) * Math.PI * 2;
        const rx = 16 + Math.cos(angle) * 20;
        const ry = 15 + bob + Math.sin(angle) * 8;
        ctx.fillStyle = '#8800cc';
        ctx.fillRect(rx, ry, 4, 4);
      }
      ctx.restore();
    }
  },

  _bossStoneGorilla(ctx, f, phase) {
    const t = Date.now() / 1000;
    const pound = Math.abs(Math.sin(t * 2)) * 4;
    const growl = Math.sin(t * 4) * 1;
    // Body - massive
    ctx.fillStyle = '#556677';
    ctx.fillRect(2, 12 + pound, 28, 22);
    ctx.fillStyle = '#667788';
    ctx.fillRect(4, 14 + pound, 24, 18);
    // Chest - lighter
    ctx.fillStyle = '#88aabb';
    ctx.fillRect(8, 16 + pound, 16, 12);
    // Head
    ctx.fillStyle = '#556677';
    ctx.fillRect(4, -4 + pound, 24, 18);
    ctx.fillStyle = '#667788';
    ctx.fillRect(6, -2 + pound, 20, 14);
    // Brow ridge
    ctx.fillStyle = '#3a4a55';
    ctx.fillRect(4, 2 + pound, 24, 4);
    // Eyes - fierce
    ctx.fillStyle = '#ff4400';
    ctx.fillRect(7, 4 + pound, 6, 5);
    ctx.fillRect(19, 4 + pound, 6, 5);
    ctx.fillStyle = '#ff8800';
    ctx.fillRect(9, 5 + pound, 2, 2);
    ctx.fillRect(21, 5 + pound, 2, 2);
    ctx.fillStyle = '#ffee00';
    ctx.fillRect(9, 5 + pound, 1, 1);
    ctx.fillRect(21, 5 + pound, 1, 1);
    // Nostrils
    ctx.fillStyle = '#334455';
    ctx.fillRect(12, 9 + pound, 3, 2);
    ctx.fillRect(17, 9 + pound, 3, 2);
    // Mouth - open when pounding
    ctx.fillStyle = '#222';
    ctx.fillRect(10, 11 + pound + growl, 12, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 11 + pound + growl, 3, 2);
    ctx.fillRect(19, 11 + pound + growl, 3, 2);
    // Arms
    ctx.fillStyle = '#445566';
    ctx.fillRect(-4, 10 + pound, 10, 18);
    ctx.fillRect(26, 10 + pound, 10, 18);
    // Fists - pounding ground
    ctx.fillStyle = '#3a4a55';
    ctx.fillRect(-6, 26 + pound, 12, 8);
    ctx.fillRect(26, 26 + pound, 12, 8);
    // Stone patterns
    ctx.fillStyle = '#3a4a55';
    ctx.fillRect(6, 16 + pound, 3, 3);
    ctx.fillRect(22, 18 + pound, 3, 3);
    ctx.fillRect(13, 14 + pound, 4, 2);
    // Phase 2: Rock throwing
    if (phase >= 2) {
      ctx.save();
      ctx.fillStyle = '#889900';
      for (let i = 0; i < 3; i++) {
        const rx = -10 + i * 20 + Math.sin(t * 3 + i) * 6;
        const ry = -15 + Math.abs(Math.sin(t * 4 + i * 1.5)) * -5;
        ctx.fillRect(rx, ry, 6, 6);
        ctx.fillStyle = '#aabb00';
        ctx.fillRect(rx+1, ry+1, 2, 2);
        ctx.fillStyle = '#889900';
      }
      ctx.restore();
    }
    // Legs
    ctx.fillStyle = '#445566';
    ctx.fillRect(4, 33 + pound, 10, 8);
    ctx.fillRect(18, 33 + pound, 10, 8);
    ctx.fillStyle = '#3a4a55';
    ctx.fillRect(3, 39 + pound, 12, 3);
    ctx.fillRect(17, 39 + pound, 12, 3);
  },

  // ── Collectibles ────────────────────────────────────────────

  drawMemoryCrystal(ctx, x, y) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    const t = (Date.now() / 600) % (Math.PI * 2);
    const glow = 0.6 + Math.sin(t) * 0.4;
    const bob  = Math.sin(t * 0.8) * 2;

    ctx.translate(4, 4 + bob);
    // Outer glow
    ctx.save();
    ctx.globalAlpha = glow * 0.4;
    ctx.fillStyle = '#c080ff';
    ctx.beginPath();
    ctx.arc(4, 4, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Crystal body
    ctx.fillStyle = `rgba(180,100,255,${glow})`;
    ctx.fillRect(0, 2, 2, 4);
    ctx.fillRect(2, 0, 4, 8);
    ctx.fillRect(6, 2, 2, 4);
    // Sheen
    ctx.fillStyle = `rgba(240,200,255,${glow * 0.8})`;
    ctx.fillRect(3, 1, 1, 3);
    ctx.fillRect(4, 0, 1, 2);
    // Star
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(3, 3, 2, 2);

    ctx.restore();
  },

  drawCoin(ctx, x, y) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    const t = (Date.now() / 400) % (Math.PI * 2);
    const scaleX = Math.abs(Math.cos(t));
    ctx.save();
    ctx.translate(6, 6);
    ctx.scale(scaleX, 1);
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffee88';
    ctx.fillRect(-2, -2, 2, 2);
    ctx.fillStyle = '#cc9900';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  },

  drawHeart(ctx, x, y) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    const t = (Date.now() / 500) % (Math.PI * 2);
    const bob = Math.sin(t) * 2;
    ctx.translate(4, 4 + bob);
    ctx.fillStyle = '#ff4488';
    // Heart shape via rects
    ctx.fillRect(1, 0, 2, 1); ctx.fillRect(5, 0, 2, 1);
    ctx.fillRect(0, 1, 8, 3);
    ctx.fillRect(0, 4, 6, 1);
    ctx.fillRect(1, 5, 4, 1);
    ctx.fillRect(2, 6, 2, 1);
    ctx.fillRect(3, 7, 1, 1);
    ctx.fillStyle = '#ff88bb';
    ctx.fillRect(1, 1, 2, 2);
    ctx.restore();
  },

  // ── Portraits for Dialogue ──────────────────────────────────

  drawPortrait(ctx, characterKey) {
    ctx.clearRect(0, 0, 48, 48);
    ctx.fillStyle = '#1a0030';
    ctx.fillRect(0, 0, 48, 48);

    switch (characterKey) {
      case 'Maria':          this._portraitMaria(ctx); break;
      case 'Sofia':          this._portraitSofia(ctx); break;
      case 'Grandma Rose':   this._portraitOldLady(ctx); break;
      case 'Luna':           this._portraitDancer(ctx); break;
      case 'Timmy':          this._portraitKid(ctx); break;
      case 'Whiskers':       this._portraitCat(ctx); break;
      case 'Elder Kai':      this._portraitElder(ctx); break;
      case 'Lily':           this._portraitLakeGirl(ctx); break;
      case 'Marco':          this._portraitLakeDancer(ctx); break;
      case 'Guard Rex':      this._portraitGuard(ctx); break;
      case 'Announcer':      this._portraitAnnouncer(ctx); break;
      case 'Shadow Tailor':  this._portraitShadowTailor(ctx); break;
      case 'Stone Gorilla':  this._portraitStoneGorilla(ctx); break;
      default:               this._portraitGeneric(ctx, '#8888ff'); break;
    }
  },

  _portraitMaria(ctx) {
    // Background
    ctx.fillStyle = '#2a0050'; ctx.fillRect(0, 0, 48, 48);
    // Hair
    ctx.fillStyle = '#3a1a00'; ctx.fillRect(6, 4, 36, 22);
    ctx.fillStyle = '#5a2a00'; ctx.fillRect(8, 6, 32, 16);
    // Ponytail
    ctx.fillStyle = '#5a2a00'; ctx.fillRect(36, 8, 8, 16);
    // Bow
    ctx.fillStyle = '#ff80c0'; ctx.fillRect(33, 4, 8, 6);
    ctx.fillStyle = '#ff60a0'; ctx.fillRect(35, 2, 4, 4);
    // Face
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    // Eyebrows
    ctx.fillStyle = '#5a2a00'; ctx.fillRect(13, 14, 8, 2);
    ctx.fillRect(27, 14, 8, 2);
    // Eyes
    ctx.fillStyle = '#3a2060'; ctx.fillRect(13, 17, 8, 6);
    ctx.fillRect(27, 17, 8, 6);
    ctx.fillStyle = '#6040a0'; ctx.fillRect(14, 18, 6, 4);
    ctx.fillRect(28, 18, 6, 4);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 18, 3, 2);
    ctx.fillRect(29, 18, 3, 2);
    ctx.fillStyle = '#000000'; ctx.fillRect(16, 19, 3, 3);
    ctx.fillRect(30, 19, 3, 3);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(16, 19, 1, 1);
    ctx.fillRect(30, 19, 1, 1);
    // Blush
    ctx.fillStyle = 'rgba(255,120,120,0.5)'; ctx.fillRect(11, 24, 7, 4);
    ctx.fillRect(30, 24, 7, 4);
    // Nose
    ctx.fillStyle = '#d09070'; ctx.fillRect(22, 26, 4, 2);
    // Mouth - smile
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#ff9070'; ctx.fillRect(19, 31, 10, 2);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(20, 31, 8, 1);
    // Neck
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    // Outfit
    ctx.fillStyle = '#8040b0'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#a060d0'; ctx.fillRect(8, 42, 32, 6);
    ctx.fillStyle = '#ff80c0'; ctx.fillRect(6, 40, 36, 3);
  },

  _portraitSofia(ctx) {
    ctx.fillStyle = '#1a0040'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#ffe060'; ctx.fillRect(6, 2, 36, 22);
    ctx.fillStyle = '#ffd030'; ctx.fillRect(8, 4, 32, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 17, 3, 2); ctx.fillRect(28, 17, 3, 2);
    ctx.fillStyle = '#333'; ctx.fillRect(15, 17, 3, 3); ctx.fillRect(28, 17, 3, 3);
    ctx.fillStyle = 'rgba(255,120,120,0.5)'; ctx.fillRect(10, 24, 7, 4); ctx.fillRect(31, 24, 7, 4);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(19, 31, 10, 1);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#ff66aa'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#ff99cc'; ctx.fillRect(8, 42, 32, 6);
  },

  _portraitOldLady(ctx) {
    ctx.fillStyle = '#1a1040'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#e8e8e8'; ctx.fillRect(6, 2, 36, 22);
    ctx.fillStyle = '#cccccc'; ctx.fillRect(8, 4, 32, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = 'rgba(100,60,30,0.2)'; ctx.fillRect(10, 20, 28, 2); ctx.fillRect(10, 26, 28, 2);
    ctx.fillStyle = '#5a3a1a'; ctx.fillRect(14, 15, 7, 5); ctx.fillRect(27, 15, 7, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 16, 3, 2); ctx.fillRect(28, 16, 3, 2);
    ctx.fillStyle = '#553322'; ctx.fillRect(15, 16, 3, 3); ctx.fillRect(28, 16, 3, 3);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#7050a0'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#9070c0'; ctx.fillRect(8, 42, 32, 6);
  },

  _portraitDancer(ctx) {
    ctx.fillStyle = '#001a30'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#2a1a00'; ctx.fillRect(6, 2, 36, 22);
    ctx.fillStyle = '#5a3010'; ctx.fillRect(8, 4, 32, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 17, 3, 2); ctx.fillRect(28, 17, 3, 2);
    ctx.fillStyle = '#222'; ctx.fillRect(15, 17, 3, 3); ctx.fillRect(28, 17, 3, 3);
    ctx.fillStyle = 'rgba(255,120,120,0.4)'; ctx.fillRect(10, 24, 7, 4); ctx.fillRect(31, 24, 7, 4);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#008888'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#00aaaa'; ctx.fillRect(8, 42, 32, 6);
  },

  _portraitKid(ctx) {
    ctx.fillStyle = '#001a40'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#cc2020'; ctx.fillRect(4, 0, 40, 14);
    ctx.fillStyle = '#aa1010'; ctx.fillRect(4, 10, 40, 5);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#4444cc'; ctx.fillRect(12, 16, 7, 4); ctx.fillRect(29, 16, 7, 4);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(13, 17, 3, 2); ctx.fillRect(30, 17, 3, 2);
    ctx.fillStyle = '#222'; ctx.fillRect(13, 17, 3, 2); ctx.fillRect(30, 17, 3, 2);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(19, 30, 10, 2);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#4466cc'; ctx.fillRect(6, 40, 36, 8);
  },

  _portraitCat(ctx) {
    ctx.fillStyle = '#1a0a00'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#e08020'; ctx.fillRect(4, 4, 40, 36);
    ctx.fillStyle = '#f0a040'; ctx.fillRect(6, 6, 36, 28);
    ctx.fillStyle = '#e08020'; ctx.fillRect(4, 0, 12, 12); ctx.fillRect(32, 0, 12, 12);
    ctx.fillStyle = '#ff9090'; ctx.fillRect(6, 2, 6, 8); ctx.fillRect(36, 2, 6, 8);
    ctx.fillStyle = '#22aa22'; ctx.fillRect(12, 16, 10, 8); ctx.fillRect(26, 16, 10, 8);
    ctx.fillStyle = '#111'; ctx.fillRect(16, 16, 2, 8); ctx.fillRect(30, 16, 2, 8);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(12, 16, 4, 3); ctx.fillRect(26, 16, 4, 3);
    ctx.fillStyle = '#ff8080'; ctx.fillRect(20, 28, 8, 4);
    ctx.fillStyle = '#c06010'; ctx.fillRect(0, 24, 10, 2); ctx.fillRect(38, 24, 10, 2);
    ctx.fillRect(2, 26, 8, 2); ctx.fillRect(38, 26, 8, 2);
    ctx.fillStyle = '#c06010';
    for (let i = 0; i < 4; i++) { ctx.fillRect(8 + i*8, 10, 4, 3); }
  },

  _portraitElder(ctx) {
    ctx.fillStyle = '#000a1a'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#e8e8e8'; ctx.fillRect(6, 0, 36, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(8, 8, 32, 24);
    ctx.fillStyle = '#e8e8e8'; ctx.fillRect(10, 28, 28, 14);
    ctx.fillRect(14, 36, 20, 12);
    ctx.fillStyle = '#5a3a1a'; ctx.fillRect(12, 13, 8, 5); ctx.fillRect(28, 13, 8, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(13, 14, 4, 2); ctx.fillRect(29, 14, 4, 2);
    ctx.fillStyle = '#554422'; ctx.fillRect(13, 14, 4, 3); ctx.fillRect(29, 14, 4, 3);
    ctx.fillStyle = '#d09070'; ctx.fillRect(21, 23, 6, 3);
    ctx.fillStyle = '#c06040'; ctx.fillRect(17, 28, 14, 3);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#e0d8f0'; ctx.fillRect(8, 42, 32, 6);
    ctx.fillStyle = '#aa8040'; ctx.fillRect(40, 10, 6, 38);
    ctx.fillStyle = '#ffcc00'; ctx.fillRect(36, 6, 12, 8);
  },

  _portraitLakeGirl(ctx) {
    ctx.fillStyle = '#001a3a'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#aa7040'; ctx.fillRect(6, 2, 36, 22);
    ctx.fillStyle = '#cc9060'; ctx.fillRect(8, 4, 32, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 17, 3, 2); ctx.fillRect(28, 17, 3, 2);
    ctx.fillStyle = '#222'; ctx.fillRect(15, 17, 3, 3); ctx.fillRect(28, 17, 3, 3);
    ctx.fillStyle = 'rgba(255,120,120,0.4)'; ctx.fillRect(10, 24, 7, 4); ctx.fillRect(31, 24, 7, 4);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#2266cc'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#4488ee'; ctx.fillRect(8, 42, 32, 6);
  },

  _portraitLakeDancer(ctx) {
    ctx.fillStyle = '#001a10'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#5a3010'; ctx.fillRect(6, 2, 36, 22);
    ctx.fillStyle = '#7a4010'; ctx.fillRect(8, 4, 32, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 17, 3, 2); ctx.fillRect(28, 17, 3, 2);
    ctx.fillStyle = '#222'; ctx.fillRect(15, 17, 3, 3); ctx.fillRect(28, 17, 3, 3);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#206020'; ctx.fillRect(6, 40, 36, 8);
    ctx.fillStyle = '#308030'; ctx.fillRect(8, 42, 32, 6);
  },

  _portraitGuard(ctx) {
    ctx.fillStyle = '#0a0a1a'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#c0a040'; ctx.fillRect(4, 0, 40, 16);
    ctx.fillStyle = '#e0c060'; ctx.fillRect(6, 2, 36, 12);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#333'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = '#222'; ctx.fillRect(15, 17, 3, 3); ctx.fillRect(28, 17, 3, 3);
    ctx.fillStyle = 'rgba(200,80,20,0.3)'; ctx.fillRect(10, 24, 7, 4); ctx.fillRect(31, 24, 7, 4);
    ctx.fillStyle = '#3a3a3a'; ctx.fillRect(16, 30, 16, 3);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#606080'; ctx.fillRect(4, 40, 40, 8);
    ctx.fillStyle = '#808090'; ctx.fillRect(6, 42, 36, 6);
    ctx.fillStyle = '#c0a040'; ctx.fillRect(14, 41, 20, 3);
  },

  _portraitAnnouncer(ctx) {
    ctx.fillStyle = '#1a0a00'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#5a3010'; ctx.fillRect(6, 2, 36, 22);
    ctx.fillStyle = '#7a5020'; ctx.fillRect(8, 4, 32, 16);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 26);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 17, 3, 2); ctx.fillRect(28, 17, 3, 2);
    ctx.fillStyle = '#222'; ctx.fillRect(15, 17, 3, 3); ctx.fillRect(28, 17, 3, 3);
    ctx.fillStyle = '#c06040'; ctx.fillRect(18, 30, 12, 3);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(18, 36, 12, 6);
    ctx.fillStyle = '#111'; ctx.fillRect(4, 40, 40, 8);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(20, 40, 8, 8);
    ctx.fillStyle = '#cc3333'; ctx.fillRect(20, 40, 8, 4);
  },

  _portraitShadowTailor(ctx) {
    ctx.fillStyle = '#0a0015'; ctx.fillRect(0, 0, 48, 48);
    // Dark cloak
    ctx.fillStyle = '#220044'; ctx.fillRect(0, 20, 48, 28);
    ctx.fillStyle = '#330066'; ctx.fillRect(4, 22, 40, 24);
    // Dark face
    ctx.fillStyle = '#1a0030'; ctx.fillRect(8, 4, 32, 22);
    ctx.fillStyle = '#250045'; ctx.fillRect(10, 6, 28, 18);
    // Hat
    ctx.fillStyle = '#0a0018'; ctx.fillRect(4, -2, 40, 10);
    ctx.fillStyle = '#440088'; ctx.fillRect(2, 6, 44, 4);
    // Glowing eyes
    ctx.fillStyle = '#cc44ff'; ctx.fillRect(12, 12, 8, 8);
    ctx.fillRect(28, 12, 8, 8);
    ctx.fillStyle = '#ff88ff'; ctx.fillRect(14, 14, 4, 4);
    ctx.fillRect(30, 14, 4, 4);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 15, 2, 2);
    ctx.fillRect(31, 15, 2, 2);
    // Sinister smile
    ctx.fillStyle = '#8800cc'; ctx.fillRect(14, 22, 20, 3);
    ctx.fillRect(12, 24, 3, 2);
    ctx.fillRect(33, 24, 3, 2);
    // Scissors
    ctx.fillStyle = '#aaaaaa'; ctx.fillRect(34, 4, 4, 10);
    ctx.fillRect(38, 4, 4, 10);
    ctx.fillRect(32, 2, 12, 4);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(35, 3, 2, 2);
  },

  _portraitStoneGorilla(ctx) {
    ctx.fillStyle = '#0a1018'; ctx.fillRect(0, 0, 48, 48);
    // Massive body fill
    ctx.fillStyle = '#445566'; ctx.fillRect(0, 24, 48, 24);
    ctx.fillStyle = '#556677'; ctx.fillRect(2, 26, 44, 22);
    // Chest
    ctx.fillStyle = '#88aabb'; ctx.fillRect(14, 28, 20, 16);
    // Head
    ctx.fillStyle = '#445566'; ctx.fillRect(4, 4, 40, 26);
    ctx.fillStyle = '#556677'; ctx.fillRect(6, 6, 36, 22);
    // Brow
    ctx.fillStyle = '#3a4a55'; ctx.fillRect(4, 12, 40, 6);
    // Eyes
    ctx.fillStyle = '#ff4400'; ctx.fillRect(10, 14, 12, 8);
    ctx.fillRect(26, 14, 12, 8);
    ctx.fillStyle = '#ff8800'; ctx.fillRect(14, 16, 4, 4);
    ctx.fillRect(30, 16, 4, 4);
    ctx.fillStyle = '#ffee00'; ctx.fillRect(14, 16, 2, 2);
    ctx.fillRect(30, 16, 2, 2);
    // Nostrils
    ctx.fillStyle = '#334455'; ctx.fillRect(18, 24, 5, 3);
    ctx.fillRect(25, 24, 5, 3);
    // Mouth
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(14, 28, 20, 6);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(14, 28, 5, 3);
    ctx.fillRect(29, 28, 5, 3);
    // Stone patterns
    ctx.fillStyle = '#3a4a55'; ctx.fillRect(6, 10, 6, 4);
    ctx.fillRect(36, 14, 6, 4);
    ctx.fillRect(20, 6, 8, 3);
  },

  _portraitGeneric(ctx, color) {
    ctx.fillStyle = '#1a0030'; ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = '#5a3010'; ctx.fillRect(6, 2, 36, 20);
    ctx.fillStyle = '#f5c8a0'; ctx.fillRect(10, 10, 28, 24);
    ctx.fillStyle = '#3a2060'; ctx.fillRect(14, 16, 7, 5); ctx.fillRect(27, 16, 7, 5);
    ctx.fillStyle = color; ctx.fillRect(6, 36, 36, 12);
  }
};
