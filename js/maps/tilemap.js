/* ============================================================
   THE LEGEND OF MARIA - Tilemap Base Class
   ============================================================ */

class Tilemap {
  constructor(data, width, height) {
    this.data   = data;   // flat array of tile IDs
    this.width  = width;  // in tiles
    this.height = height; // in tiles
    this.pixelW = width  * TILE_SIZE;
    this.pixelH = height * TILE_SIZE;
    this.npcs   = [];
    this.enemies   = [];
    this.collectibles = [];
    this.boss   = null;
    this.transitions = []; // { x,y,w,h, target }
    this.mapName = '';
    this.musicTrack = 'town';
    this._tileCache = {};
  }

  get(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= this.width || ty >= this.height) return TILES.WALL;
    return this.data[ty * this.width + tx];
  }

  // Test if a world-space rectangle is in a solid tile
  isSolid(rect) {
    const x1 = Math.floor(rect.x / TILE_SIZE);
    const y1 = Math.floor(rect.y / TILE_SIZE);
    const x2 = Math.floor((rect.x + rect.w - 1) / TILE_SIZE);
    const y2 = Math.floor((rect.y + rect.h - 1) / TILE_SIZE);
    for (let ty = y1; ty <= y2; ty++) {
      for (let tx = x1; tx <= x2; tx++) {
        if (SOLID_TILES.has(this.get(tx, ty))) return true;
      }
    }
    return false;
  }

  getTransition(rect) {
    for (const t of this.transitions) {
      if (Utils.rectsOverlap(rect.x, rect.y, rect.w, rect.h, t.x, t.y, t.w, t.h)) {
        return t;
      }
    }
    return null;
  }

  draw(ctx, camX, camY) {
    const startX = Math.floor(camX / TILE_SIZE);
    const startY = Math.floor(camY / TILE_SIZE);
    const endX   = Math.min(this.width,  startX + Math.ceil(CANVAS_W / TILE_SIZE) + 2);
    const endY   = Math.min(this.height, startY + Math.ceil(CANVAS_H / TILE_SIZE) + 2);

    for (let ty = Math.max(0, startY); ty < endY; ty++) {
      for (let tx = Math.max(0, startX); tx < endX; tx++) {
        const tileId = this.get(tx, ty);
        Sprites.drawTile(ctx, tileId, tx * TILE_SIZE, ty * TILE_SIZE);
      }
    }
  }

  update(dt, player, game) {
    // Update NPCs
    for (const npc of this.npcs) npc.update(dt);

    // Update enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      this.enemies[i].update(dt, player, this, game);
      if (this.enemies[i].isFullyDead()) this.enemies.splice(i, 1);
    }

    // Update boss
    if (this.boss && !this.boss.isFullyDead()) {
      this.boss.update(dt, player, this, game);
    }

    // Update collectibles
    for (const c of this.collectibles) c.update(dt, player, game);

    // Interaction: NPC talk
    if (Input.pressed('a') && !Dialogue.isActive() && !Menus.isAnyOpen()) {
      for (const npc of this.npcs) {
        const ph = player.hitbox;
        if (Utils.rectsOverlap(ph.x - 4, ph.y - 4, ph.w + 8, ph.h + 8,
            npc.interactBox.x, npc.interactBox.y, npc.interactBox.w, npc.interactBox.h)) {
          npc.interact(game);
          break;
        }
      }
    }

    // Check transition
    if (!Dialogue.isActive()) {
      const trans = this.getTransition(player.hitbox);
      if (trans) {
        if (trans.requiresBoss && !game.state.defeatedBosses.includes(trans.requiresBoss)) {
          if ((this._blockNotifCooldown = (this._blockNotifCooldown || 0) - dt) <= 0) {
            Notifications.show('⚔️ ¡Derrota al jefe primero!', 2500);
            this._blockNotifCooldown = 3;
          }
        } else {
          game.changeMap(trans.target, trans.spawnX, trans.spawnY);
        }
      }
    }
  }

  drawEntities(ctx) {
    // Collect all entities with Y for sorting
    const entities = [];
    for (const npc of this.npcs)       entities.push({ y: npc.y,          draw: () => npc.draw(ctx) });
    for (const e   of this.enemies)    entities.push({ y: e.y,            draw: () => e.draw(ctx) });
    for (const c   of this.collectibles) entities.push({ y: c.y,          draw: () => c.draw(ctx) });
    if (this.boss) entities.push({ y: this.boss.y, draw: () => this.boss.draw(ctx) });

    // Sort by Y for depth
    entities.sort((a, b) => a.y - b.y);
    for (const e of entities) e.draw();
  }
}
