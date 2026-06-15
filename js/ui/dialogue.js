/* ============================================================
   THE LEGEND OF MARIA - Dialogue System
   ============================================================ */

const Dialogue = (() => {
  const box      = document.getElementById('dialogue-box');
  const nameEl   = document.getElementById('dialogue-name');
  const textEl   = document.getElementById('dialogue-text');
  const contEl   = document.getElementById('dialogue-continue');
  const portCtx  = document.getElementById('portrait-canvas').getContext('2d');

  let lines     = [];
  let lineIdx   = 0;
  let charIdx   = 0;
  let typeTimer = 0;
  let active    = false;
  let onDone    = null;
  let currentSpeaker = '';
  let charDelay = 0.03; // seconds per character
  let revealed  = '';
  let waitConfirm = false;

  function show(dialogue, callback) {
    // dialogue: array of [speaker, line1, line2, ...]
    // Flatten into list of {speaker, text}
    lines = [];
    for (const entry of dialogue) {
      const speaker = entry[0];
      for (let i = 1; i < entry.length; i++) {
        lines.push({ speaker, text: entry[i] });
      }
    }
    lineIdx   = 0;
    active    = true;
    onDone    = callback || null;
    box.classList.remove('hidden');
    showLine();
  }

  function showLine() {
    if (lineIdx >= lines.length) { close(); return; }
    const line = lines[lineIdx];
    currentSpeaker = line.speaker;
    nameEl.textContent = line.speaker;
    textEl.textContent = '';
    revealed = '';
    charIdx  = 0;
    typeTimer = 0;
    waitConfirm = false;
    contEl.style.display = 'none';
    // Draw portrait
    portCtx.clearRect(0, 0, 48, 48);
    Sprites.drawPortrait(portCtx, line.speaker);
  }

  function advance() {
    if (!active) return false;
    if (charIdx < lines[lineIdx].text.length) {
      // Reveal all immediately
      revealed = lines[lineIdx].text;
      charIdx  = revealed.length;
      textEl.textContent = revealed;
      contEl.style.display = 'block';
      waitConfirm = true;
      return true;
    }
    if (waitConfirm) {
      lineIdx++;
      Audio.SFX.dialogue();
      showLine();
      return true;
    }
    return true;
  }

  function update(dt) {
    if (!active) return;
    if (charIdx >= lines[lineIdx].text.length) {
      contEl.style.display = 'block';
      waitConfirm = true;
      return;
    }
    typeTimer += dt;
    while (typeTimer >= charDelay && charIdx < lines[lineIdx].text.length) {
      typeTimer -= charDelay;
      charIdx++;
      const full = lines[lineIdx].text;
      revealed = full.slice(0, charIdx);
      textEl.textContent = revealed;
      if (charIdx % 3 === 0) Audio.SFX.dialogue();
    }
  }

  function close() {
    active = false;
    box.classList.add('hidden');
    nameEl.textContent = '';
    textEl.textContent = '';
    portCtx.clearRect(0, 0, 48, 48);
    if (onDone) { const cb = onDone; onDone = null; cb(); }
  }

  function isActive() { return active; }

  return { show, advance, update, isActive, close };
})();
