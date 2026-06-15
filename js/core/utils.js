/* ============================================================
   THE LEGEND OF MARIA - Utility Functions
   ============================================================ */

const Utils = {

  // Clamp value between min and max
  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  // Linear interpolation
  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  // Distance between two points
  dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  },

  // Rectangle overlap test
  rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  },

  // Random integer in range [min, max]
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Random float
  randFloat(min, max) {
    return Math.random() * (max - min) + min;
  },

  // Pick random element from array
  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // Draw a pixel-art rounded rect
  drawRoundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill)   { ctx.fillStyle   = fill;   ctx.fill();   }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  },

  // Parse hex color to RGB
  hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return {r, g, b};
  },

  // Generate a sparkle particle
  createSparkle(x, y, color='#d4a0ff') {
    return {
      x, y,
      vx: Utils.randFloat(-60, 60),
      vy: Utils.randFloat(-80, -20),
      life: 1.0,
      color,
      size: Utils.randFloat(2, 5)
    };
  },

  // Update and draw sparkle array
  updateSparkles(ctx, sparkles, dt) {
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.vy += 60 * dt; // gravity
      s.life -= dt * 1.5;
      if (s.life <= 0) {
        sparkles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.color;
      ctx.fillRect(Math.round(s.x - s.size/2), Math.round(s.y - s.size/2), Math.round(s.size), Math.round(s.size));
      ctx.restore();
    }
  },

  // Wrapping text for canvas
  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const lines = text.split('\n');
    let dy = y;
    for (const line of lines) {
      const words = line.split(' ');
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (ctx.measureText(testLine).width > maxWidth && currentLine) {
          ctx.fillText(currentLine, x, dy);
          currentLine = word;
          dy += lineHeight;
        } else {
          currentLine = testLine;
        }
      }
      ctx.fillText(currentLine, x, dy);
      dy += lineHeight;
    }
    return dy;
  },

  // Ease functions
  easeInOut(t) {
    return t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;
  },
  easeOut(t) {
    return 1 - (1 - t) * (1 - t);
  },
  easeIn(t) {
    return t * t;
  },

  // Wait helper
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
