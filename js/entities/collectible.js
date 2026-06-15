/* ============================================================
   THE LEGEND OF MARIA - Collectible Entity
   ============================================================ */

class Collectible {
  constructor(x, y, type, id) {
    this.x    = x * TILE_SIZE;
    this.y    = y * TILE_SIZE;
    this.type = type; // 'memory', 'coin', 'heart'
    this.id   = id;
    this.collected = false;
    this.bobTimer  = Math.random() * Math.PI * 2;
    this.sparkles  = [];
  }

  get hitbox() { return { x: this.x, y: this.y, w: 16, h: 16 }; }

  update(dt, player, game) {
    if (this.collected) return;
    this.bobTimer += dt;

    const pb = player.hitbox;
    if (Utils.rectsOverlap(pb.x, pb.y, pb.w, pb.h, this.x, this.y, 16, 16)) {
      this.collect(game, player);
    }
  }

  collect(game, player) {
    this.collected = true;

    for (let i = 0; i < 8; i++) {
      this.sparkles.push(Utils.createSparkle(this.x + 8, this.y + 8, '#d4a0ff'));
    }

    if (this.type === 'memory') {
      Audio.SFX.memoryCrystal();
      game.collectMemory(this.id);
    } else if (this.type === 'coin') {
      Audio.SFX.coin();
      game.state.coins++;
      HUD.updateCoins(game.state.coins);
    } else if (this.type === 'heart') {
      Audio.SFX.pickup();
      player.heal(1);
      HUD.updateHearts(player.hp, player.maxHp);
    }
  }

  draw(ctx) {
    if (this.collected) {
      Utils.updateSparkles(ctx, this.sparkles, 0.016);
      return;
    }
    if (this.type === 'memory')  Sprites.drawMemoryCrystal(ctx, this.x, this.y);
    else if (this.type === 'coin')   Sprites.drawCoin(ctx, this.x, this.y);
    else if (this.type === 'heart')  Sprites.drawHeart(ctx, this.x, this.y);
    Utils.updateSparkles(ctx, this.sparkles, 0.016);
  }
}
