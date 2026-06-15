/* ============================================================
   THE LEGEND OF MARIA - Camera System
   ============================================================ */

const Camera = (() => {
  let x = 0, y = 0;
  const W = CANVAS_W, H = CANVAS_H;

  function follow(targetX, targetY, mapPixelW, mapPixelH) {
    const tx = targetX - W / 2;
    const ty = targetY - H / 2;
    x = Utils.clamp(tx, 0, Math.max(0, mapPixelW - W));
    y = Utils.clamp(ty, 0, Math.max(0, mapPixelH - H));
  }

  function smoothFollow(targetX, targetY, mapPixelW, mapPixelH, dt) {
    const tx = targetX - W / 2;
    const ty = targetY - H / 2;
    const clampedX = Utils.clamp(tx, 0, Math.max(0, mapPixelW - W));
    const clampedY = Utils.clamp(ty, 0, Math.max(0, mapPixelH - H));
    x = Utils.lerp(x, clampedX, Math.min(1, dt * 8));
    y = Utils.lerp(y, clampedY, Math.min(1, dt * 8));
  }

  function worldToScreen(wx, wy) {
    return { sx: wx - x, sy: wy - y };
  }

  function screenToWorld(sx, sy) {
    return { wx: sx + x, wy: sy + y };
  }

  function apply(ctx) {
    ctx.translate(-Math.round(x), -Math.round(y));
  }

  return {
    get x() { return x; }, get y() { return y; },
    follow, smoothFollow, worldToScreen, screenToWorld, apply
  };
})();
