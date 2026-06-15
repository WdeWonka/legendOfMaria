/* ============================================================
   THE LEGEND OF MARIA - NPC Entity
   ============================================================ */

class NPC {
  constructor(x, y, type, dialogueKey) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.w = 16; this.h = 16;
    this.type        = type;
    this.dialogueKey = dialogueKey;
    this.frame       = 0;
    this.frameTimer  = 0;
    this.talking     = false;
    this.interacted  = false;
    this.name        = '';
  }

  get hitbox() { return { x: this.x + 2, y: this.y + 12, w: 12, h: 8 }; }
  get interactBox() { return { x: this.x - 8, y: this.y - 8, w: 32, h: 36 }; }

  update(dt) {
    this.frameTimer += dt;
    if (this.frameTimer >= 0.6) { this.frameTimer = 0; this.frame = (this.frame + 1) % 2; }
  }

  draw(ctx) {
    Sprites.drawNPC(ctx, this.x, this.y, this.type, this.frame);
    // Interaction indicator
    if (!this.talking) {
      const t = (Date.now() / 600) % (Math.PI * 2);
      const bob = Math.sin(t) * 2;
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px Press Start 2P, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', this.x + 8, this.y - 4 + bob);
      ctx.textAlign = 'left';
    }
  }

  interact(game) {
    if (Dialogue.isActive()) return;
    const dialogue = NPC_DIALOGUES[this.dialogueKey];
    if (!dialogue) return;
    this.talking = true;
    Dialogue.show(dialogue, () => { this.talking = false; });
  }
}
