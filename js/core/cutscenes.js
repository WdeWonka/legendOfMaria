/* ============================================================
   THE LEGEND OF MARIA - Cutscene Engine
   ============================================================ */

const Cutscenes = (() => {
  const layer = document.getElementById("cutscene-layer");
  const canvas = document.getElementById("cutscene-canvas");
  const ctx = canvas.getContext("2d");
  const textBox = document.getElementById("cutscene-text-box");
  const textEl = document.getElementById("cutscene-text");

  const finalLayer = document.getElementById("final-scene");
  const finalCanvas = document.getElementById("final-canvas");
  const finalCtx = finalCanvas.getContext("2d");
  const finalMsg = document.getElementById("final-message");

  let active = false;
  let onDone = null;
  let phase = 0;
  let timer = 0;
  let animFrame = null;
  let sparkles = [];

  // ── Opening Cutscene ────────────────────────────────────────

  async function playOpening(callback) {
    active = true;
    onDone = callback;
    layer.classList.remove("hidden");
    textBox.classList.add("hidden");
    Audio.playMusic("town");

    // Phase 1: Maria sleeping (0-3s)
    await drawSleepingScene(3000);

    // Phase 2: Morning light (1s)
    await flashLight(1000);

    // Phase 3: Wake up + shock (1.5s)
    await drawShockScene(1500);

    // Phase 4: Dialogue sequence
    await showCutsceneText("...", 1000);
    await showCutsceneText("*bosteza*\nBuenos días...", 1800);
    await showCutsceneText("Espera...\n¡¿Dónde está mi traje?!", 2000);
    await showCutsceneText("Y... ¡mi Bastón Dorado!\n¡DESAPARECIERON!", 2200);
    await showCutsceneText(
      '"Los sueños se ganan."\n"Ven a encontrarnos."',
      2500,
    );

    // Phase 5: Friend enters
    await drawFriendScene(1000);
    await showCutsceneText("Tatiana: ¡María!\n¡Esto es terrible!", 1800);
    await showCutsceneText(
      "Tatiana: ¡Tu traje desapareció!\n¡Y tu bastón también!",
      2000,
    );
    await showCutsceneText(
      "Tatiana: ¡El campeonato empieza pronto!\n¡DEBES encontrarlos!",
      2200,
    );

    await showCutsceneText("María: No me rendiré.\n¡Voy a recuperarlos!", 2000);
    await showCutsceneText("La aventura comienza...", 1500);

    // Fade out
    await fadeOut(800);

    layer.classList.add("hidden");
    textBox.classList.add("hidden");
    active = false;
    if (onDone) onDone();
  }

  function drawSleepingScene(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      function frame() {
        const elapsed = Date.now() - start;
        const t = elapsed / duration;
        ctx.clearRect(0, 0, 480, 320);

        // Night room background
        ctx.fillStyle = "#0a0020";
        ctx.fillRect(0, 0, 480, 320);

        // Window with moonlight
        ctx.fillStyle = "#1a0840";
        ctx.fillRect(320, 40, 100, 80);
        ctx.fillStyle = "rgba(180,160,255,0.15)";
        ctx.fillRect(320, 40, 100, 80);
        // Moon
        ctx.fillStyle = "#ffffcc";
        ctx.beginPath();
        ctx.arc(380, 30, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e8e8a0";
        ctx.beginPath();
        ctx.arc(378, 28, 14, 0, Math.PI * 2);
        ctx.fill();
        // Stars
        ctx.fillStyle = "#ffffff";
        [
          [300, 20],
          [340, 10],
          [420, 30],
          [450, 15],
          [390, 55],
        ].forEach(([sx, sy]) => {
          ctx.fillRect(sx, sy, 2, 2);
        });

        // Bed
        ctx.fillStyle = "#6040a0";
        ctx.fillRect(80, 160, 300, 120);
        ctx.fillStyle = "#8060c0";
        ctx.fillRect(80, 160, 300, 20);
        ctx.fillStyle = "#f0e0ff";
        ctx.fillRect(100, 180, 260, 90);
        // Pillow
        ctx.fillStyle = "#e0d0ff";
        ctx.fillRect(280, 185, 80, 50);

        // Maria sleeping (head on pillow)
        ctx.fillStyle = "#3a1a00";
        ctx.fillRect(290, 188, 60, 20);
        ctx.fillStyle = "#f5c8a0";
        ctx.fillRect(295, 195, 50, 35);
        // Closed eyes (sleeping)
        ctx.fillStyle = "#3a2060";
        ctx.fillRect(300, 205, 10, 2);
        ctx.fillRect(320, 205, 10, 2);
        // Blanket over
        ctx.fillStyle = "rgba(192,144,255,0.7)";
        ctx.fillRect(100, 210, 260, 60);

        // ZZZ
        const zzAlpha = 0.5 + Math.sin(elapsed / 500) * 0.3;
        ctx.save();
        ctx.globalAlpha = zzAlpha;
        ctx.fillStyle = "#d4a0ff";
        ctx.font = "bold 14px Press Start 2P, monospace";
        ctx.fillText("z", 360, 185 - Math.sin(elapsed / 800) * 5);
        ctx.font = "bold 10px Press Start 2P, monospace";
        ctx.fillText("z", 380, 170 - Math.sin(elapsed / 800 + 1) * 5);
        ctx.font = "bold 7px Press Start 2P, monospace";
        ctx.fillText("z", 395, 158 - Math.sin(elapsed / 800 + 2) * 5);
        ctx.restore();

        // Moonlight beam
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = "#c0b0ff";
        ctx.beginPath();
        ctx.moveTo(320, 40);
        ctx.lineTo(420, 40);
        ctx.lineTo(350, 320);
        ctx.lineTo(250, 320);
        ctx.fill();
        ctx.restore();

        if (elapsed < duration) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  function flashLight(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      function frame() {
        const elapsed = Date.now() - start;
        const t = elapsed / duration;
        ctx.clearRect(0, 0, 480, 320);

        // Sunrise gradient
        const sunAlpha = Utils.easeInOut(t);
        ctx.fillStyle = "#1a0020";
        ctx.fillRect(0, 0, 480, 320);

        const grd = ctx.createLinearGradient(0, 0, 480, 320);
        grd.addColorStop(0, `rgba(255,200,100,${sunAlpha * 0.6})`);
        grd.addColorStop(0.5, `rgba(255,150,80,${sunAlpha * 0.3})`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 480, 320);

        ctx.fillStyle = `rgba(255,255,200,${sunAlpha * 0.4})`;
        ctx.fillRect(0, 0, 480, 320);

        if (elapsed < duration) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  function drawShockScene(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      function frame() {
        const elapsed = Date.now() - start;
        const t = elapsed / duration;
        ctx.clearRect(0, 0, 480, 320);

        // Morning room
        ctx.fillStyle = "#2a1840";
        ctx.fillRect(0, 0, 480, 320);

        // Window - morning
        ctx.fillStyle = "#ffcc88";
        ctx.fillRect(320, 40, 100, 80);
        const grd = ctx.createRadialGradient(370, 80, 10, 370, 80, 60);
        grd.addColorStop(0, "rgba(255,220,100,0.6)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(250, 0, 230, 200);

        // Maria standing, shocked
        const shakeX = t < 0.3 ? Math.sin(elapsed / 50) * 4 : 0;
        Sprites.drawMaria(ctx, 200 + shakeX, 120, "down", 0, false);

        // Exclamation mark
        if (t > 0.3) {
          ctx.fillStyle = "#ffff00";
          ctx.font = "bold 20px Press Start 2P, monospace";
          ctx.fillText("!", 218, 105 - Math.sin(t * Math.PI) * 8);
        }

        // Empty space where costume was
        ctx.fillStyle = "rgba(255,80,80,0.3)";
        ctx.fillRect(80, 140, 80, 100);
        ctx.strokeStyle = "#ff4040";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(80, 140, 80, 100);
        ctx.setLineDash([]);

        // Empty space where pole was
        ctx.fillStyle = "rgba(255,80,80,0.3)";
        ctx.fillRect(350, 80, 40, 180);
        ctx.strokeStyle = "#ff4040";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(350, 80, 40, 180);
        ctx.setLineDash([]);

        // Note on floor
        ctx.fillStyle = "#fff8dc";
        ctx.fillRect(180, 230, 60, 50);
        ctx.fillStyle = "#333";
        ctx.font = "5px Press Start 2P, monospace";
        ctx.fillText("note", 193, 260);

        if (elapsed < duration) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  function drawFriendScene(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      function frame() {
        const elapsed = Date.now() - start;
        const t = elapsed / duration;
        ctx.clearRect(0, 0, 480, 320);

        // Room
        ctx.fillStyle = "#2a1840";
        ctx.fillRect(0, 0, 480, 320);
        ctx.fillStyle = "#ffcc88";
        ctx.fillRect(320, 40, 100, 80);

        // Maria
        Sprites.drawMaria(ctx, 200, 120, "right", 0, false);

        // Tatiana running in
        const TatianaX = Utils.lerp(
          480,
          300,
          Utils.easeOut(Math.min(1, t * 2)),
        );
        Sprites.drawNPC(
          ctx,
          TatianaX,
          130,
          "best_friend",
          Math.floor(elapsed / 100) % 2,
        );

        if (elapsed < duration) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  function showCutsceneText(text, duration) {
    return new Promise((resolve) => {
      textEl.textContent = "";
      textBox.classList.remove("hidden");

      let i = 0;
      const full = text;
      const typeInterval = setInterval(() => {
        i++;
        textEl.textContent = full.slice(0, i);
        if (i % 3 === 0) Audio.SFX.dialogue();
        if (i >= full.length) {
          clearInterval(typeInterval);
        }
      }, 30);

      setTimeout(() => {
        clearInterval(typeInterval);
        textEl.textContent = full;
        textBox.classList.add("hidden");
        resolve();
      }, duration);
    });
  }

  function fadeOut(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      function frame() {
        const t = (Date.now() - start) / duration;
        ctx.fillStyle = `rgba(0,0,0,${Math.min(1, t)})`;
        ctx.fillRect(0, 0, 480, 320);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  // ── Final Romantic Scene ────────────────────────────────────

  async function playFinal(callback) {
    Audio.stopMusic();
    Audio.playMusic("ending");

    finalLayer.classList.remove("hidden");
    finalMsg.textContent = "";

    // Draw starfield
    drawStarfield();

    const messages = [
      "Felicitaciones, María.",
      "Recuperaste tu sueño.",
      "Nunca te rendiste.",
      "Y al igual que esta aventura...",
      "Los últimos dos años han sido\nel viaje más hermoso.",
      "Gracias por cada risa.",
      "Cada desafío.",
      "Cada baile.",
      "Cada recuerdo.",
      "Si pudiera comenzar un nuevo juego...",
      "Te elegiría de nuevo.",
      "Y otra vez.",
      "Y otra vez.",
      "Feliz Aniversario de 2 Años ❤️",
      "— Con todo mi amor.",
    ];

    for (const msg of messages) {
      await typeMessage(msg, 60);
      await Utils.wait(1400);
    }

    if (callback) callback();
  }

  function drawStarfield() {
    const start = Date.now();
    function frame() {
      if (finalLayer.classList.contains("hidden")) return;
      const t = (Date.now() - start) / 1000;

      finalCtx.fillStyle = "rgba(2,0,10,0.15)";
      finalCtx.fillRect(0, 0, 480, 320);

      // Stars
      finalCtx.fillStyle = "#ffffff";
      for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i * 127.1 + t * 0.05) * 0.5 + 0.5) * 480;
        const sy = (Math.sin(i * 311.7 + t * 0.03) * 0.5 + 0.5) * 320;
        const alpha = 0.4 + Math.sin(t * 2 + i) * 0.3;
        finalCtx.globalAlpha = alpha;
        finalCtx.fillRect(
          Math.round(sx),
          Math.round(sy),
          1 + (i % 2),
          1 + (i % 2),
        );
      }
      finalCtx.globalAlpha = 1;

      // Hearts floating
      for (let i = 0; i < 8; i++) {
        const hx = (Math.sin(i * 2.1 + t * 0.4) * 0.4 + 0.5) * 480;
        const hy = ((t * 0.05 + i * 0.125) % 1) * 320;
        finalCtx.globalAlpha = 0.3 + Math.sin(t + i) * 0.15;
        finalCtx.fillStyle = "#ff80c0";
        finalCtx.font = "10px serif";
        finalCtx.fillText("♥", hx, hy);
      }
      finalCtx.globalAlpha = 1;

      // Maria silhouette under stars
      Sprites.drawMaria(finalCtx, 210, 160, "up", Math.floor(t * 2) % 4, false);

      requestAnimationFrame(frame);
    }
    frame();
  }

  function typeMessage(text, speed) {
    return new Promise((resolve) => {
      let i = 0;
      finalMsg.textContent = "";
      const interval = setInterval(() => {
        i++;
        finalMsg.textContent = text.slice(0, i);
        if (i % 2 === 0) Audio.SFX.dialogue();
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  // ── Victory Cutscene ────────────────────────────────────────

  async function playVictory(callback) {
    layer.classList.remove("hidden");
    textBox.classList.add("hidden");
    Audio.stopMusic();
    Audio.SFX.victory();
    await Utils.wait(500);
    Audio.playMusic("victory");

    await drawVictoryScene(4000);
    await showCutsceneText("PUNTUACIÓN: 10 / 10 / 10", 2000);
    await showCutsceneText("🏆 ¡PRIMER LUGAR! 🏆\n¡MARÍA GANA!", 2500);
    await drawConfetti(2000);
    await fadeOut(800);
    layer.classList.add("hidden");

    if (callback) callback();
  }

  function drawVictoryScene(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      const confetti = Array.from({ length: 40 }, (_, i) => ({
        x: Math.random() * 480,
        y: -20 - Math.random() * 100,
        vx: Utils.randFloat(-20, 20),
        vy: Utils.randFloat(40, 80),
        color: ["#ff80c0", "#d4a0ff", "#ffe040", "#ff4488", "#c080ff"][i % 5],
        size: 4 + Math.random() * 6,
      }));

      function frame() {
        const elapsed = Date.now() - start;
        const t = elapsed / duration;
        ctx.clearRect(0, 0, 480, 320);

        // Arena background
        ctx.fillStyle = "#1a0830";
        ctx.fillRect(0, 0, 480, 320);

        // Spotlights
        for (let i = 0; i < 4; i++) {
          const angle = t * Math.PI * 2 + i * (Math.PI / 2);
          const bx = 240 + Math.cos(angle) * 80;
          const grd = ctx.createRadialGradient(bx, 0, 0, bx, 0, 200);
          grd.addColorStop(0, `rgba(255,220,180,0.3)`);
          grd.addColorStop(1, "transparent");
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, 480, 320);
        }

        // Stage floor
        ctx.fillStyle = "#d4a850";
        ctx.fillRect(60, 220, 360, 60);
        ctx.fillStyle = "#f0c870";
        ctx.fillRect(60, 220, 360, 10);

        // Crowd silhouettes
        ctx.fillStyle = "#1a0a30";
        for (let i = 0; i < 30; i++) {
          const cx = 20 + i * 15;
          const cy = 180 + Math.sin(t * 4 + i) * 5;
          ctx.fillRect(cx, cy, 8, 30);
          ctx.beginPath();
          ctx.arc(cx + 4, cy - 4, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Maria dancing
        const danceFrame = Math.floor(elapsed / 150) % 4;
        Sprites.drawMaria(ctx, 216, 190, "down", danceFrame, false);

        // Trophy
        if (t > 0.5) {
          ctx.fillStyle = "#ffd700";
          ctx.fillRect(280, 180, 30, 40);
          ctx.fillStyle = "#ffee80";
          ctx.beginPath();
          ctx.arc(295, 180, 20, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = "#cc9900";
          ctx.fillRect(275, 218, 40, 8);
          ctx.fillStyle = "#ffff00";
          ctx.font = "8px Press Start 2P, monospace";
          ctx.fillText("1st", 283, 203);
        }

        // Confetti
        const dt = 0.016;
        for (const p of confetti) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.y > 340) {
            p.y = -10;
            p.x = Math.random() * 480;
          }
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }

        if (elapsed < duration) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  function drawConfetti(duration) {
    return new Promise((resolve) => {
      const start = Date.now();
      const pieces = Array.from({ length: 60 }, (_, i) => ({
        x: Math.random() * 480,
        y: -30 - Math.random() * 100,
        vx: Utils.randFloat(-40, 40),
        vy: Utils.randFloat(60, 120),
        color: [
          "#ff80c0",
          "#d4a0ff",
          "#ffe040",
          "#ff4488",
          "#80ffff",
          "#ffaa00",
        ][i % 6],
        size: 5 + Math.random() * 8,
        rot: Math.random() * Math.PI * 2,
      }));

      function frame() {
        const elapsed = Date.now() - start;
        const dt = 0.016;

        ctx.clearRect(0, 0, 480, 320);
        ctx.fillStyle = "#1a0830";
        ctx.fillRect(0, 0, 480, 320);

        ctx.fillStyle = "#ffffff";
        ctx.font = "18px Press Start 2P, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffd700";
        ctx.fillText("¡CAMPEONA!", 240, 140);
        ctx.fillStyle = "#ff80c0";
        ctx.font = "10px Press Start 2P, monospace";
        ctx.fillText("¡María gana! ❤️", 240, 170);
        ctx.textAlign = "left";

        for (const p of pieces) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += dt * 3;
          if (p.y > 340) {
            p.y = -15;
            p.x = Math.random() * 480;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        }

        if (elapsed < duration) requestAnimationFrame(frame);
        else resolve();
      }
      frame();
    });
  }

  return { playOpening, playVictory, playFinal, isActive: () => active };
})();
