/* ============================================================
   THE LEGEND OF MARIA - Player Entity
   ============================================================ */

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 12;
    this.h = 12;
    this.dir     = 'down';
    this.frame   = 0;
    this.frameTimer = 0;
    this.frameDur   = 0.12;
    this.moving     = false;
    this.running    = false;

    this.hp    = 20;
    this.maxHp = 20;
    this.invincibleTimer = 0;

    this.attackDamage   = 15;
    this.attacking      = false;
    this.attackTimer    = 0;
    this.attackProgress = 0;
    this.attackCooldown = 0;

    this.sparkles = [];
  }

  get cx() { return this.x + this.w / 2; }
  get cy() { return this.y + this.h / 2; }

  // Hitbox (feet area for collision)
  get hitbox() {
    return { x: this.x + 2, y: this.y + 18, w: this.w, h: 8 };
  }

  update(dt, map, entities) {
    this.invincibleTimer = Math.max(0, this.invincibleTimer - dt);
    this.attackCooldown  = Math.max(0, this.attackCooldown  - dt);

    // Attack
    if (this.attacking) {
      this.attackTimer += dt;
      this.attackProgress = this.attackTimer / (ATTACK_DURATION / 1000);
      if (this.attackTimer >= ATTACK_DURATION / 1000) {
        this.attacking = false;
        this.attackTimer = 0;
        this.attackProgress = 0;
      }
    }

    // Movement
    let dx = 0, dy = 0;
    const isTalking = Dialogue.isActive() || Menus.isPauseOpen() || Menus.isMemoriesOpen();

    if (!isTalking) {
      if (Input.isDown('up'))    dy = -1;
      if (Input.isDown('down'))  dy = 1;
      if (Input.isDown('left'))  dx = -1;
      if (Input.isDown('right')) dx = 1;

      this.running = Input.isDown('b');
      const speed  = this.running ? PLAYER_RUN_SPEED : PLAYER_SPEED;

      if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

      if (dx < 0) this.dir = 'left';
      if (dx > 0) this.dir = 'right';
      if (dy < 0) this.dir = 'up';
      if (dy > 0) this.dir = 'down';

      this.moving = (dx !== 0 || dy !== 0);

      // Move X then Y with collision
      const nx = this.x + dx * speed * dt;
      const ny = this.y + dy * speed * dt;

      const hbX = { x: nx + 2, y: this.y + 18, w: this.w, h: 8 };
      const hbY = { x: this.x + 2, y: ny + 18,  w: this.w, h: 8 };

      if (!map.isSolid(hbX)) this.x = nx;
      if (!map.isSolid(hbY)) this.y = ny;

      // Attack input
      if (Input.pressed('a') && !this.attacking && this.attackCooldown <= 0 && !isTalking) {
        this.startAttack();
      }
    } else {
      this.moving = false;
    }

    // Animation
    if (this.moving || this.attacking) {
      this.frameTimer += dt;
      if (this.frameTimer >= this.frameDur) {
        this.frameTimer -= this.frameDur;
        this.frame = (this.frame + 1) % 4;
      }
    } else {
      this.frame = 0;
      this.frameTimer = 0;
    }

    // Sparkles when running
    if (this.running && this.moving && Math.random() < 0.3) {
      this.sparkles.push(Utils.createSparkle(this.x + 8, this.y + 22, '#ff80c0'));
    }
  }

  startAttack() {
    this.attacking   = true;
    this.attackTimer = 0;
    this.attackCooldown = ATTACK_COOLDOWN / 1000;
    Audio.SFX.attack();
  }

  getAttackHitbox() {
    if (!this.attacking || this.attackProgress > 0.6) return null;
    const range = ATTACK_RANGE;
    let ax = this.cx, ay = this.cy;
    if (this.dir === 'right') ax += range;
    if (this.dir === 'left')  ax -= range;
    if (this.dir === 'down')  ay += range;
    if (this.dir === 'up')    ay -= range;
    return { x: ax - 14, y: ay - 14, w: 28, h: 28 };
  }

  takeDamage(amount) {
    if (this.invincibleTimer > 0) return;
    this.hp = Math.max(0, this.hp - amount);
    this.invincibleTimer = 1.2;
    Audio.SFX.hurt();
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  draw(ctx) {
    // Invincibility flash
    if (this.invincibleTimer > 0 && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
      ctx.save(); ctx.globalAlpha = 0.4;
    }

    Sprites.drawMaria(ctx, this.x, this.y, this.dir, this.frame, this.running);

    if (this.invincibleTimer > 0 && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
      ctx.restore();
    }

    // Attack effect
    if (this.attacking) {
      Sprites.drawAttack(ctx, this.x, this.y, this.dir, this.attackProgress);
    }

    // Sparkles
    Utils.updateSparkles(ctx, this.sparkles, 0.016);
  }
}
