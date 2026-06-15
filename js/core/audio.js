/* ============================================================
   THE LEGEND OF MARIA - Audio Engine (Web Audio API Chiptune)
   ============================================================ */

const Audio = (() => {
  let _ctx = null, masterGain = null, musicGain = null, sfxGain = null;
  let currentTrack = null, loopTimer = null;
  let _enabled = false, _pendingTrack = null;

  function init() {
    if (_ctx) return;
    try {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = _ctx.createGain(); masterGain.gain.value = 0.65;
      musicGain  = _ctx.createGain(); musicGain.gain.value  = 0.45;
      sfxGain    = _ctx.createGain(); sfxGain.gain.value    = 0.85;
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      masterGain.connect(_ctx.destination);
      _enabled = true;
      if (_pendingTrack) { playMusic(_pendingTrack); _pendingTrack = null; }
    } catch(e) { console.warn('Web Audio not available'); }
  }

  function resume() { if (_ctx && _ctx.state === 'suspended') _ctx.resume(); }

  // ── Note helpers ────────────────────────────────────────────
  function osc(type, freq, t0, dur, gNode, vol=0.25) {
    if (!_ctx || !_enabled) return;
    const o = _ctx.createOscillator();
    const g = _ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    g.gain.linearRampToValueAtTime(vol, t0 + dur - 0.02);
    g.gain.linearRampToValueAtTime(0,   t0 + dur);
    o.connect(g); g.connect(gNode);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  const N = {
    C3:130.81,D3:146.83,E3:164.81,F3:174.61,G3:196,A3:220,B3:246.94,
    C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,
    C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77,
    C6:1046.5,D6:1174.66,E6:1318.51,
    Bb4:466.16,Ab4:415.30,Gb4:369.99,Eb4:311.13,Db4:277.18,
    Bb5:932.33,Ab5:830.61,Gb5:739.99,Eb5:622.25,Db5:554.37,
    R:0
  };

  function mel(seq, bpm, t0, gNode, type='square', vol=0.22) {
    const b = 60/bpm; let t = t0;
    for (const [n, d] of seq) { if (n > 0) osc(type, n, t, b*d-0.01, gNode, vol); t += b*d; }
    return t - t0;
  }
  function bass(seq, bpm, t0, gNode, type='sawtooth', vol=0.16) {
    const b = 60/bpm; let t = t0;
    for (const [n, d] of seq) { if (n > 0) osc(type, n, t, b*d-0.02, gNode, vol); t += b*d; }
  }
  function arp(chord, bpm, t0, gNode, steps=8, type='triangle', vol=0.10) {
    const step = (60/bpm)/4; let t = t0;
    for (let i = 0; i < steps; i++) {
      const n = chord[i % chord.length];
      if (n > 0) osc(type, n, t, step*0.9, gNode, vol);
      t += step;
    }
  }

  // ── Tracks ──────────────────────────────────────────────────
  const TRACKS = {
    title(t0, mg) {
      const bpm = 108;
      const m = [[N.E5,1],[N.G5,1],[N.A5,2],[N.G5,1],[N.E5,1],[N.D5,2],
                 [N.C5,1],[N.E5,1],[N.G5,2],[N.A5,2],[N.G5,1],[N.F5,1],[N.E5,2],[N.D5,4],
                 [N.E5,1],[N.G5,1],[N.A5,2],[N.B5,1],[N.A5,1],[N.G5,2],
                 [N.E5,1],[N.G5,1],[N.A5,4]];
      const b = [[N.A3,2],[N.C4,2],[N.E4,2],[N.G3,2],[N.F3,2],[N.A3,2],[N.C4,2],[N.E3,2],
                 [N.A3,2],[N.C4,2],[N.E4,2],[N.G3,2],[N.D3,2],[N.F3,2],[N.A3,4]];
      const dur = mel(m,bpm,t0,mg,'square',0.20);
      bass(b,bpm,t0,mg,'triangle',0.13);
      arp([N.A4,N.C5,N.E5],bpm,t0,mg,20,'triangle',0.07);
      return dur;
    },
    town(t0, mg) {
      const bpm = 118;
      const m = [[N.C5,1],[N.E5,1],[N.G5,1],[N.E5,1],[N.F5,2],[N.D5,2],
                 [N.E5,1],[N.G5,1],[N.A5,2],[N.G5,1],[N.E5,1],[N.C5,2],
                 [N.D5,1],[N.F5,1],[N.E5,4],
                 [N.G5,1],[N.A5,1],[N.B5,2],[N.A5,1],[N.G5,1],
                 [N.E5,2],[N.C5,2],[N.D5,1],[N.E5,1],[N.C5,4]];
      const b = [[N.C3,2],[N.G3,2],[N.A3,2],[N.F3,2],[N.C3,2],[N.E3,2],[N.F3,2],[N.G3,2],
                 [N.C3,4],[N.G3,4],[N.A3,4],[N.F3,4]];
      const dur = mel(m,bpm,t0,mg,'square',0.19);
      bass(b,bpm,t0,mg,'sine',0.14);
      arp([N.C4,N.E4,N.G4],bpm,t0,mg,24,'triangle',0.07);
      return dur;
    },
    forest(t0, mg) {
      const bpm = 92;
      const m = [[N.E5,2],[N.D5,1],[N.C5,1],[N.D5,2],[N.E5,2],
                 [N.G5,2],[N.A5,2],[N.G5,1],[N.E5,1],[N.D5,4],
                 [N.C5,2],[N.E5,2],[N.G5,2],[N.A5,2],
                 [N.B5,1],[N.A5,1],[N.G5,2],[N.E5,4]];
      const b = [[N.A3,2],[N.E3,2],[N.G3,2],[N.D3,2],[N.A3,4],[N.G3,4],[N.A3,2],[N.E3,6]];
      const dur = mel(m,bpm,t0,mg,'triangle',0.17);
      bass(b,bpm,t0,mg,'sawtooth',0.12);
      arp([N.A3,N.C4,N.E4,N.G4],bpm,t0,mg,20,'triangle',0.06);
      return dur;
    },
    cave(t0, mg) {
      const bpm = 86;
      const m = [[N.A4,2],[N.Bb4,1],[N.A4,1],[N.G4,2],[N.F4,2],
                 [N.E4,2],[N.F4,1],[N.G4,1],[N.A4,4],
                 [N.C5,2],[N.Bb4,1],[N.A4,1],[N.G4,2],[N.Ab4,2],
                 [N.A4,2],[N.G4,2],[N.F4,4]];
      const b = [[N.A3,2],[N.G3,2],[N.F3,2],[N.E3,2],[N.A3,4],[N.E3,4],[N.F3,4],[N.G3,4]];
      const dur = mel(m,bpm,t0,mg,'sawtooth',0.15);
      bass(b,bpm,t0,mg,'sawtooth',0.13);
      return dur;
    },
    boss(t0, mg) {
      const bpm = 138;
      const m = [[N.E4,0.5],[N.E4,0.5],[N.G4,0.5],[N.E4,0.5],[N.A4,1],[N.Bb4,0.5],[N.A4,0.5],
                 [N.G4,0.5],[N.E4,0.5],[N.G4,0.5],[N.E4,0.5],[N.F4,1],[N.E4,1],
                 [N.D5,0.5],[N.D5,0.5],[N.E5,0.5],[N.D5,0.5],[N.C5,1],[N.B4,0.5],[N.Bb4,0.5],
                 [N.A4,0.5],[N.G4,0.5],[N.F4,0.5],[N.E4,0.5],[N.A4,2]];
      const b = [[N.A3,0.5],[N.R,0.25],[N.A3,0.25],[N.A3,0.5],[N.G3,0.5],
                 [N.F3,0.5],[N.R,0.25],[N.F3,0.25],[N.F3,0.5],[N.E3,0.5],
                 [N.A3,0.5],[N.R,0.25],[N.A3,0.25],[N.A3,0.5],[N.G3,0.5],[N.F3,1],[N.E3,1]];
      const dur = mel(m,bpm,t0,mg,'sawtooth',0.22);
      bass(b,bpm,t0,mg,'square',0.15);
      return dur;
    },
    victory(t0, mg) {
      const bpm = 148;
      const m = [[N.C5,0.5],[N.C5,0.5],[N.C5,0.5],[N.C5,0.5],[N.C5,0.5],[N.E5,0.5],[N.G5,0.5],[N.C6,1.5],
                 [N.Bb5,0.5],[N.A5,0.5],[N.G5,0.5],[N.A5,0.5],[N.G5,0.5],[N.E5,0.5],[N.C5,2],
                 [N.E5,0.5],[N.E5,0.5],[N.E5,0.5],[N.F5,0.5],[N.E5,1],[N.C5,0.5],[N.E5,0.5],
                 [N.G5,0.5],[N.A5,0.5],[N.B5,0.5],[N.C6,2.5]];
      const dur = mel(m,bpm,t0,mg,'square',0.24);
      arp([N.C4,N.E4,N.G4,N.C5],bpm,t0,mg,32,'triangle',0.09);
      return dur;
    },
    ending(t0, mg) {
      const bpm = 78;
      const m = [[N.A4,2],[N.B4,1],[N.C5,1],[N.E5,2],[N.D5,2],
                 [N.C5,2],[N.A4,2],[N.G4,4],
                 [N.F4,2],[N.G4,1],[N.A4,1],[N.C5,2],[N.B4,2],
                 [N.A4,2],[N.G4,2],[N.F4,4],
                 [N.E4,2],[N.G4,2],[N.A4,2],[N.C5,2],
                 [N.B4,2],[N.A4,2],[N.G4,2],[N.E4,4],
                 [N.A4,1],[N.C5,1],[N.E5,2],[N.D5,1],[N.C5,1],[N.A4,8]];
      const b = [[N.A3,4],[N.F3,4],[N.C3,4],[N.G3,4],[N.F3,4],[N.C3,4],[N.G3,4],[N.A3,8]];
      const dur = mel(m,bpm,t0,mg,'triangle',0.20);
      bass(b,bpm,t0,mg,'sine',0.11);
      arp([N.A3,N.C4,N.E4,N.A4],bpm,t0,mg,36,'sine',0.06);
      return dur;
    }
  };

  // ── Looping music ───────────────────────────────────────────
  function playMusic(name) {
    if (!_ctx || !_enabled) { _pendingTrack = name; return; }
    if (currentTrack === name) return;
    stopMusic();
    currentTrack = name;
    const fn = TRACKS[name];
    if (!fn) return;

    // Fade in after old music fades out (0.15s crossfade gap)
    const startAt = _ctx.currentTime + 0.2;
    musicGain.gain.setValueAtTime(0, startAt);
    musicGain.gain.linearRampToValueAtTime(0.45, startAt + 0.3);

    let nextTime = startAt;
    function schedule() {
      if (currentTrack !== name) return;
      const dur = fn(nextTime, musicGain);
      nextTime += dur;
      const delay = Math.max(100, (nextTime - _ctx.currentTime - 0.25) * 1000);
      loopTimer = setTimeout(schedule, delay);
    }
    schedule();
  }

  function stopMusic() {
    currentTrack = null;
    if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
    // Fade out currently-playing oscillators so they don't bleed into the next track
    if (_ctx && musicGain) {
      musicGain.gain.cancelScheduledValues(_ctx.currentTime);
      musicGain.gain.setValueAtTime(musicGain.gain.value, _ctx.currentTime);
      musicGain.gain.linearRampToValueAtTime(0, _ctx.currentTime + 0.15);
    }
  }

  // ── SFX ─────────────────────────────────────────────────────
  let _lastHitTime = -Infinity;

  const SFX = {
    attack() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      osc('square',   N.E5, t,      0.05, sfxGain, 0.28);
      osc('square',   N.G5, t+0.04, 0.05, sfxGain, 0.22);
      osc('square',   N.B5, t+0.08, 0.05, sfxGain, 0.18);
      osc('triangle', N.E6, t+0.12, 0.08, sfxGain, 0.18);
      for (let i=0;i<4;i++) osc('sine', N.A5*(1+i*0.06), t+i*0.02, 0.04, sfxGain, 0.08);
    },
    pickup() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      [[N.C5,0],[N.E5,.06],[N.G5,.12],[N.C6,.18]].forEach(([n,d]) => osc('square',n,t+d,0.08,sfxGain,0.26));
    },
    memoryCrystal() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      [[N.G5,0],[N.A5,.08],[N.B5,.16],[N.C6,.24],[N.E6,.32],[N.D6,.48]].forEach(([n,d],i) =>
        osc('triangle',n,t+d,i<4?0.08:0.2,sfxGain,0.22));
    },
    dialogue() {
      if (!_ctx || !_enabled) return;
      osc('square', N.G5, _ctx.currentTime, 0.04, sfxGain, 0.12);
    },
    menuMove() {
      if (!_ctx || !_enabled) return;
      osc('square', N.A5, _ctx.currentTime, 0.04, sfxGain, 0.18);
    },
    menuConfirm() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      [[N.C5,0],[N.E5,.04],[N.G5,.08]].forEach(([n,d]) => osc('square',n,t+d,0.07,sfxGain,0.22));
    },
    hit() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      if (t - _lastHitTime < 0.06) return; // throttle: max ~16 hit sounds/sec
      _lastHitTime = t;
      osc('sawtooth', N.A3*0.9, t,     0.06, sfxGain, 0.28);
      osc('sawtooth', N.A3*1.1, t+.02, 0.06, sfxGain, 0.22);
      osc('square',   N.E3,     t+.06, 0.08, sfxGain, 0.18);
    },
    hurt() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      osc('sawtooth', N.D4,   t,    0.08, sfxGain, 0.32);
      osc('sawtooth', N.C4,   t+.08,0.12, sfxGain, 0.26);
      osc('square',   N.Bb4,  t+.20,0.10, sfxGain, 0.18);
    },
    bossDefeat() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      for (let i=0;i<8;i++) osc('sawtooth', N.C5/(1+i*0.06), t+i*0.08, 0.15, sfxGain, 0.22);
      osc('sine', N.A3, t+0.4, 0.5, sfxGain, 0.28);
    },
    victory() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      [N.C5,N.E5,N.G5,N.C6,N.E6].forEach((n,i) => osc('square',n,t+i*0.08,0.3-i*0.02,sfxGain,0.24));
    },
    itemGet() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      const f = [[N.C5,.12],[N.C5,.12],[N.C5,.12],[N.C5,.36],[N.C5,.12],[N.D5,.12],
                 [N.E5,.12],[N.C5,.24],[N.E5,.12],[N.G5,.36]];
      let now = t;
      for (const [n,d] of f) { osc('square',n,now,d*0.9,sfxGain,0.26); now+=d; }
    },
    coin() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      osc('square', N.E6||N.E5*2,     t,     0.05, sfxGain, 0.18);
      osc('square', N.G6||N.G5*2,     t+.05, 0.07, sfxGain, 0.18);
    },
    transition() {
      if (!_ctx || !_enabled) return;
      const t = _ctx.currentTime;
      for (let i=0;i<4;i++) osc('sine', N.A4*Math.pow(2,i/12), t+i*0.06, 0.1, sfxGain, 0.14);
    }
  };

  return {
    init, resume, playMusic, stopMusic, SFX,
    get enabled() { return _enabled; }
  };
})();
