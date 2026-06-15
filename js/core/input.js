/* ============================================================
   THE LEGEND OF MARIA - Input System
   ============================================================ */

const Input = (() => {
  const held = { up:false, down:false, left:false, right:false, a:false, b:false, start:false, select:false };
  const prev = { up:false, down:false, left:false, right:false, a:false, b:false, start:false, select:false };

  const KEY_MAP = {
    'ArrowUp':'up','ArrowDown':'down','ArrowLeft':'left','ArrowRight':'right',
    'z':'a','Z':'a','x':'b','X':'b',
    'Enter':'start','Shift':'select',
    'w':'up','s':'down','a':'left','d':'right',
    'W':'up','S':'down','A':'left','D':'right',
  };

  function tryAudio() { Audio.init(); Audio.resume(); }

  function setupBtn(id, action) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('touchstart', e => { e.preventDefault(); held[action] = true; tryAudio(); }, { passive: false });
    btn.addEventListener('touchend',   e => { e.preventDefault(); held[action] = false; }, { passive: false });
    btn.addEventListener('touchcancel',() => { held[action] = false; });
    btn.addEventListener('mousedown',  () => { held[action] = true; tryAudio(); });
    btn.addEventListener('mouseup',    () => { held[action] = false; });
    btn.addEventListener('mouseleave', () => { held[action] = false; });
  }

  function initJoystick() {
    const base = document.getElementById('joystick-base');
    const knob = document.getElementById('joystick-knob');
    if (!base || !knob) return;

    const DEAD   = 10;   // pixels dead zone
    const MAX_R  = 28;   // max knob travel radius
    let active   = false;

    function move(cx, cy) {
      const r  = base.getBoundingClientRect();
      const ox = r.left + r.width  / 2;
      const oy = r.top  + r.height / 2;
      const dx = cx - ox;
      const dy = cy - oy;
      const dist  = Math.hypot(dx, dy);
      const clamp = Math.min(dist, MAX_R);
      const angle = Math.atan2(dy, dx);
      const kx    = (Math.cos(angle) * clamp).toFixed(1);
      const ky    = (Math.sin(angle) * clamp).toFixed(1);
      knob.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;
      held.left  = dx < -DEAD;
      held.right = dx >  DEAD;
      held.up    = dy < -DEAD;
      held.down  = dy >  DEAD;
    }

    function reset() {
      active = false;
      held.left = held.right = held.up = held.down = false;
      knob.style.transform = 'translate(-50%, -50%)';
    }

    base.addEventListener('touchstart', e => {
      e.preventDefault();
      active = true;
      tryAudio();
      move(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }, { passive: false });

    base.addEventListener('touchmove', e => {
      e.preventDefault();
      if (active) move(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }, { passive: false });

    base.addEventListener('touchend',    e => { e.preventDefault(); reset(); }, { passive: false });
    base.addEventListener('touchcancel', reset);

    // Mouse fallback (desktop testing)
    base.addEventListener('mousedown', e => { active = true; tryAudio(); move(e.clientX, e.clientY); });
    document.addEventListener('mousemove', e => { if (active) move(e.clientX, e.clientY); });
    document.addEventListener('mouseup',   () => { if (active) reset(); });
  }

  function init() {
    window.addEventListener('keydown', e => {
      const a = KEY_MAP[e.key];
      if (a) { held[a] = true; e.preventDefault(); }
    });
    window.addEventListener('keyup', e => {
      const a = KEY_MAP[e.key];
      if (a) held[a] = false;
    });

    setupBtn('btn-a',      'a');
    setupBtn('btn-b',      'b');
    setupBtn('btn-start',  'start');
    setupBtn('btn-select', 'select');

    initJoystick();
  }

  function pressed(action) { return held[action] && !prev[action]; }
  function isDown(action)  { return !!held[action]; }
  function endFrame()      { Object.assign(prev, held); }

  return { init, pressed, isDown, endFrame, held };
})();
