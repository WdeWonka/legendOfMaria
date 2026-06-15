/* ============================================================
   THE LEGEND OF MARIA - Enemy Entity
   ============================================================ */

class Enemy {
  constructor(x, y, type) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.type = type;
    this.w = 16; this.h = 16;

    const stats = {
      raccoon:       { hp: 20, speed: 38, dmg: 1, range: 60,  atkCd: 1.5 },
      bat:           { hp: 12, speed: 55, dmg: 1, range: 80,  atkCd: 1.2 },
      crystal_slime: { hp: 25, speed: 30, dmg: 1, range: 50,  atkCd: 1.8 },
      cave_spirit:   { hp: 18, speed: 50, dmg: 1, range: 100, atkCd: 1.0 },
    }[type] || { hp: 15, speed: 35, dmg: 1, range: 60, atkCd: 1.5 };

    this.hp = stats.hp; this.maxHp = stats.hp;
    this.speed = stats.speed;
    this.dmg = stats.dmg;
    this.range = stats.range;
    this.atkCd = stats.atkCd;

    this.atkTimer  = Math.random() * this.atkCd;
    this.frame     = 0;
    this.frameTimer = 0;
    this.dead      = false;
    this.deathTimer = 0;
    this.knockback = { x: 0, y: 0 };
    this.knockTimer = 0;
    this.sparkles   = [];
    this.state      = 'idle'; // idle, chase, attack
    this.stateTimer = 0;
    this.wanderDx   = 0;
    this.wanderDy   = 0;
    this.wanderTimer = 0;
  }

  get hitbox() { return { x: this.x + 2, y: this.y + 4, w: 12, h: 12 }; }

  update(dt, player, map) {
    if (this.dead) {
      this.deathTimer += dt;
      Utils.updateSparkles(null, this.sparkles, dt);
      return;
    }

    // Knockback
    if (this.knockTimer > 0) {
      this.x += this.knockback.x * dt;
      this.y += this.knockback.y * dt;
      this.knockTimer -= dt;
      this.knockback.x *= 0.85;
      this.knockback.y *= 0.85;
    }

    // AI
    const dx = player.cx - (this.x + 8);
    const dy = player.cy - (this.y + 8);
    const dist = Math.hypot(dx, dy);

    this.atkTimer -= dt;

    if (dist < this.range) {
      this.state = 'chase';
      if (this.knockTimer <= 0) {
        const spd = this.speed * dt;
        const nx = this.x + (dx / dist) * spd;
        const ny = this.y + (dy / dist) * spd;
        const hbX = { x: nx + 2, y: this.y + 4, w: 12, h: 12 };
        const hbY = { x: this.x + 2, y: ny + 4,  w: 12, h: 12 };
        if (!map.isSolid(hbX)) this.x = nx;
        if (!map.isSolid(hbY)) this.y = ny;
      }

      // Attack player on contact
      if (dist < 20 && this.atkTimer <= 0) {
        player.takeDamage(this.dmg);
        this.atkTimer = this.atkCd;
      }
    } else {
      // Wander
      this.state = 'idle';
      this.wanderTimer -= dt;
      if (this.wanderTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        this.wanderDx = Math.cos(angle);
        this.wanderDy = Math.sin(angle);
        this.wanderTimer = Utils.randFloat(0.8, 2.0);
      }
      if (this.wanderTimer > 0) {
        const spd = this.speed * 0.3 * dt;
        const nx = this.x + this.wanderDx * spd;
        const ny = this.y + this.wanderDy * spd;
        const hbX = { x: nx + 2, y: this.y + 4, w: 12, h: 12 };
        const hbY = { x: this.x + 2, y: ny + 4,  w: 12, h: 12 };
        if (!map.isSolid(hbX)) this.x = nx;
        if (!map.isSolid(hbY)) this.y = ny;
      }
    }

    // Animation
    this.frameTimer += dt;
    if (this.frameTimer >= 0.15) { this.frameTimer = 0; this.frame = (this.frame + 1) % 4; }

    // Check player attack
    const atkHitbox = player.getAttackHitbox();
    if (atkHitbox && player.attacking && Utils.rectsOverlap(
      atkHitbox.x, atkHitbox.y, atkHitbox.w, atkHitbox.h,
      this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h
    )) {
      if (player.attacking && this.knockTimer <= 0) {
        this.hit(dx, dy, 10);
      }
    }
  }

  hit(dx, dy, damage) {
    this.hp -= damage;
    const dist = Math.hypot(dx, dy) || 1;
    this.knockback = { x: (-dx/dist) * 120, y: (-dy/dist) * 120 };
    this.knockTimer = 0.3;
    Audio.SFX.hit();
    for (let i = 0; i < 5; i++) {
      this.sparkles.push(Utils.createSparkle(this.x + 8, this.y + 8, '#ff6090'));
    }
    if (this.hp <= 0) this.die();
  }

  die() {
    this.dead = true;
    this.deathTimer = 0;
    for (let i = 0; i < 10; i++) {
      this.sparkles.push(Utils.createSparkle(this.x + 8, this.y + 8, '#ff80c0'));
    }
  }

  draw(ctx) {
    if (this.dead) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - this.deathTimer * 3);
      Sprites.drawEnemy(ctx, this.x, this.y, this.type, this.frame, this.hp, this.maxHp);
      ctx.restore();
    } else {
      Sprites.drawEnemy(ctx, this.x, this.y, this.type, this.frame, this.hp, this.maxHp);
    }
    Utils.updateSparkles(ctx, this.sparkles, 0.016);
  }

  isFullyDead() { return this.dead && this.deathTimer > 0.5; }
}
