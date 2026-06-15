/* ============================================================
   THE LEGEND OF MARIA - Input System
   ============================================================ */

const Input = (() => {
  const held    = { up:false, down:false, left:false, right:false, a:false, b:false, start:false, select:false };
  const prev    = { up:false, down:false, left:false, right:false, a:false, b:false, start:false, select:false };

  const KEY_MAP = {
    'ArrowUp':'up','ArrowDown':'down','ArrowLeft':'left','ArrowRight':'right',
    'z':'a','Z':'a','x':'b','X':'b',
    'Enter':'start','Shift':'select',
    'w':'up','s':'down','a':'left','d':'right',
    'W':'up','S':'down','A':'left','D':'right',
  };

  function init() {
    window.addEventListener('keydown', e => {
      const a = KEY_MAP[e.key];
      if (a) { held[a] = true; e.preventDefault(); }
    });
    window.addEventListener('keyup', e => {
      const a = KEY_MAP[e.key];
      if (a) held[a] = false;
    });

    // D-Pad
    document.querySelectorAll('.dpad-btn[data-dir]').forEach(btn => {
      const dir = btn.dataset.dir;
      btn.addEventListener('touchstart', e => { e.preventDefault(); held[dir] = true; tryAudio(); }, { passive:false });
      btn.addEventListener('touchend',   e => { e.preventDefault(); held[dir] = false; }, { passive:false });
      btn.addEventListener('touchcancel',() => { held[dir] = false; });
      btn.addEventListener('mousedown',  () => { held[dir] = true; tryAudio(); });
      btn.addEventListener('mouseup',    () => { held[dir] = false; });
      btn.addEventListener('mouseleave', () => { held[dir] = false; });
    });

    setupBtn('btn-a',      'a');
    setupBtn('btn-b',      'b');
    setupBtn('btn-start',  'start');
    setupBtn('btn-select', 'select');
  }

  function tryAudio() { Audio.init(); Audio.resume(); }

  function setupBtn(id, action) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('touchstart', e => { e.preventDefault(); held[action] = true; tryAudio(); }, { passive:false });
    btn.addEventListener('touchend',   e => { e.preventDefault(); held[action] = false; }, { passive:false });
    btn.addEventListener('touchcancel',() => { held[action] = false; });
    btn.addEventListener('mousedown',  () => { held[action] = true; tryAudio(); });
    btn.addEventListener('mouseup',    () => { held[action] = false; });
    btn.addEventListener('mouseleave', () => { held[action] = false; });
  }

  function pressed(action) { return held[action] && !prev[action]; }
  function isDown(action)  { return !!held[action]; }
  function endFrame()      { Object.assign(prev, held); }

  return { init, pressed, isDown, endFrame, held };
})();
