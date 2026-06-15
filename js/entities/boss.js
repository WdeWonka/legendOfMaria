/* ============================================================
   THE LEGEND OF MARIA - Boss Entity
   ============================================================ */

class Boss {
  constructor(x, y, type) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.type = type;
    const data = BOSS_DATA[type];
    this.name  = data.name;
    this.hp    = data.hp;
    this.maxHp = data.maxHp;
    this.speed = data.speed;
    this.dmg   = data.attackDamage;
    this.range = data.attackRange;
    this.atkCd = data.attackCooldown / 1000;
    this.w = 32; this.h = 40;

    this.atkTimer   = 2.0;
    this.frame      = 0;
    this.frameTimer = 0;
    this.dead       = false;
    this.deathTimer = 0;
    this.phase      = 1;
    this.sparkles   = [];
    this.knockTimer = 0;
    this.knockback  = { x: 0, y: 0 };
    this.state      = 'idle'; // idle, intro, fight, dead
    this.introShown = false;
    this.stateTimer = 0;
    this.projectiles = [];
  }

  get hitbox() { return { x: this.x + 4, y: this.y + 8, w: this.w - 8, h: this.h - 8 }; }
  get cx() { return this.x + this.w / 2; }
  get cy() { return this.y + this.h / 2; }

  update(dt, player, map, game) {
    if (this.state === 'idle') return;
    if (this.dead) {
      this.deathTimer += dt;
      for (let i = 0; i < 3; i++) {
        this.sparkles.push(Utils.createSparkle(
          this.cx + Utils.randFloat(-20, 20),
          this.cy + Utils.randFloat(-20, 20),
          '#d4a0ff'
        ));
      }
      return;
    }

    this.stateTimer += dt;
    this.atkTimer   -= dt;

    // Phase transition
    if (this.hp < this.maxHp * 0.5 && this.phase === 1) {
      this.phase = 2;
      this.speed *= 1.3;
      this.atkCd *= 0.7;
    }

    // Knockback
    if (this.knockTimer > 0) {
      this.x += this.knockback.x * dt;
      this.y += this.knockback.y * dt;
      this.knockTimer -= dt;
      this.knockback.x *= 0.85;
      this.knockback.y *= 0.85;
    }

    // Move toward player
    const dx = player.cx - this.cx;
    const dy = player.cy - this.cy;
    const dist = Math.hypot(dx, dy) || 1;

    if (this.knockTimer <= 0 && dist > 40) {
      const spd = this.speed * dt;
      const nx = this.x + (dx / dist) * spd;
      const ny = this.y + (dy / dist) * spd;
      const hbX = { x: nx + 4, y: this.y + 8, w: this.w - 8, h: this.h - 8 };
      const hbY = { x: this.x + 4, y: ny + 8,  w: this.w - 8, h: this.h - 8 };
      if (!map.isSolid(hbX)) this.x = nx;
      if (!map.isSolid(hbY)) this.y = ny;
    }

    // Attack player on contact
    if (dist < 50 && this.atkTimer <= 0) {
      player.takeDamage(this.dmg);
      this.atkTimer = this.atkCd;
    }

    // Phase 2: shoot projectiles
    if (this.phase >= 2 && this.atkTimer <= 0 && dist < 200) {
      this._shootProjectile(player);
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;

      // Check player hit
      if (Utils.rectsOverlap(p.x - 6, p.y - 6, 12, 12,
          player.hitbox.x, player.hitbox.y, player.hitbox.w, player.hitbox.h)) {
        player.takeDamage(1);
        this.projectiles.splice(i, 1);
        continue;
      }
      if (p.life <= 0 || map.isSolid({ x: p.x - 4, y: p.y - 4, w: 8, h: 8 })) {
        this.projectiles.splice(i, 1);
      }
    }

    // Check player attack
    const atkHitbox = player.getAttackHitbox();
    if (atkHitbox && player.attacking && this.knockTimer <= 0) {
      if (Utils.rectsOverlap(
        atkHitbox.x, atkHitbox.y, atkHitbox.w, atkHitbox.h,
        this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h
      )) {
        this.hit(dx, dy, player.attackDamage, game);
      }
    }

    // Animation
    this.frameTimer += dt;
    if (this.frameTimer >= 0.12) { this.frameTimer = 0; this.frame = (this.frame + 1) % 8; }
  }

  _shootProjectile(player) {
    const dx = player.cx - this.cx;
    const dy = player.cy - this.cy;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = 80;
    this.projectiles.push({
      x: this.cx, y: this.cy,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      life: 3.0,
      color: this.type === 'shadow_tailor' ? '#aa00ff' : '#885500'
    });
  }

  hit(dx, dy, damage, game) {
    this.hp -= damage;
    const dist = Math.hypot(dx, dy) || 1;
    this.knockback = { x: (-dx/dist) * 80, y: (-dy/dist) * 80 };
    this.knockTimer = 0.25;
    Audio.SFX.hit();
    HUD.updateBossHp(this.hp, this.maxHp);
    for (let i = 0; i < 6; i++) {
      this.sparkles.push(Utils.createSparkle(this.cx, this.cy, '#ff60a0'));
    }
    if (this.hp <= 0) {
      this.hp = 0;
      this.die(game);
    }
  }

  die(game) {
    this.dead = true;
    this.deathTimer = 0;
    this.state = 'dead';
    Audio.SFX.bossDefeat();
    HUD.hideBoss();
    if (game && game.onBossDefeated) game.onBossDefeated(this.type);
  }

  startFight() {
    this.state = 'fight';
  }

  draw(ctx) {
    // Draw projectiles
    for (const p of this.projectiles) {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(p.x - 1, p.y - 1, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.dead) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - this.deathTimer * 2);
      Sprites.drawBoss(ctx, this.x, this.y, this.type, this.frame, this.phase);
      ctx.restore();
    } else {
      Sprites.drawBoss(ctx, this.x, this.y, this.type, this.frame, this.phase);
    }

    Utils.updateSparkles(ctx, this.sparkles, 0.016);
  }

  isFullyDead() { return this.dead && this.deathTimer > 1.5; }
}
