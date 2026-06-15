/* ============================================================
   THE LEGEND OF MARIA - Menu Systems
   ============================================================ */

const Menus = (() => {
  // ── Pause Menu ──────────────────────────────────────────────
  const pauseEl    = document.getElementById('pause-menu');
  const pauseItems = document.querySelectorAll('.pause-item');
  let pauseIdx     = 0;
  let pauseActive  = false;

  function openPause() {
    pauseActive = true;
    pauseIdx    = 0;
    updatePauseCursor();
    pauseEl.classList.remove('hidden');
    Audio.SFX.menuConfirm();
  }
  function closePause() {
    pauseActive = false;
    pauseEl.classList.add('hidden');
  }
  function updatePauseCursor() {
    pauseItems.forEach((item, i) => item.classList.toggle('selected', i === pauseIdx));
  }
  function pauseUp()   { pauseIdx = (pauseIdx - 1 + pauseItems.length) % pauseItems.length; updatePauseCursor(); Audio.SFX.menuMove(); }
  function pauseDown() { pauseIdx = (pauseIdx + 1) % pauseItems.length; updatePauseCursor(); Audio.SFX.menuMove(); }

  function pauseConfirm(game) {
    const action = pauseItems[pauseIdx]?.dataset.action;
    Audio.SFX.menuConfirm();
    if      (action === 'continue')  { closePause(); }
    else if (action === 'memories')  { closePause(); openMemories(game); }
    else if (action === 'controls')  { closePause(); openControls(); }
    else if (action === 'about')     { closePause(); openAbout(); }
    else if (action === 'title')     { closePause(); if (game.goToTitle) game.goToTitle(); }
  }
  pauseItems.forEach((item, i) => {
    item.addEventListener('click', () => { pauseIdx = i; updatePauseCursor(); });
    item.addEventListener('touchend', (e) => { e.preventDefault(); pauseIdx = i; updatePauseCursor(); });
  });

  // ── Memory Panel ────────────────────────────────────────────
  const memPanel    = document.getElementById('memory-panel');
  const memGrid     = document.getElementById('memory-grid');
  const memDetail   = document.getElementById('memory-detail');
  const memDTitle   = document.getElementById('memory-detail-title');
  const memDText    = document.getElementById('memory-detail-text');
  const memBackBtn  = document.getElementById('memory-back-btn');
  const memCloseBtn = document.getElementById('memory-close-btn');
  let memoriesOpen  = false;

  function openMemories(game) {
    memoriesOpen = true;
    memPanel.classList.remove('hidden');
    memDetail.classList.add('hidden');
    buildGrid(game.state ? game.state.memoriesCollected : []);
    Audio.SFX.menuConfirm();
  }
  function closeMemories() {
    memoriesOpen = false;
    memPanel.classList.add('hidden');
    memDetail.classList.add('hidden');
  }
  function buildGrid(collected) {
    memGrid.innerHTML = '';
    MEMORY_DATA.forEach(mem => {
      const slot = document.createElement('div');
      const has  = collected.includes(mem.id);
      slot.className = 'memory-slot' + (has ? ' collected' : '');
      slot.innerHTML = `<span>${has ? mem.icon : '?'}</span><span class="memory-slot-num">${mem.id}</span>`;
      if (has) {
        const handler = () => showDetail(mem);
        slot.addEventListener('click', handler);
        slot.addEventListener('touchend', (e) => { e.preventDefault(); handler(); });
        slot.style.cursor = 'pointer';
      }
      memGrid.appendChild(slot);
    });
  }
  function showDetail(mem) {
    memDTitle.textContent = `${mem.icon} ${mem.subtitle}`;
    memDText.textContent  = mem.text;
    memDetail.classList.remove('hidden');
    Audio.SFX.memoryCrystal();
  }
  memBackBtn?.addEventListener('click',    () => memDetail.classList.add('hidden'));
  memBackBtn?.addEventListener('touchend', (e) => { e.preventDefault(); memDetail.classList.add('hidden'); });
  memCloseBtn?.addEventListener('click',    () => closeMemories());
  memCloseBtn?.addEventListener('touchend', (e) => { e.preventDefault(); closeMemories(); });

  // ── Controls Panel ──────────────────────────────────────────
  const ctrlPanel    = document.getElementById('controls-panel');
  const ctrlCloseBtn = document.getElementById('controls-close-btn');
  function openControls()  { ctrlPanel.classList.remove('hidden'); Audio.SFX.menuConfirm(); }
  function closeControls() { ctrlPanel.classList.add('hidden'); }
  ctrlCloseBtn?.addEventListener('click',    () => closeControls());
  ctrlCloseBtn?.addEventListener('touchend', (e) => { e.preventDefault(); closeControls(); });

  // ── About Panel ─────────────────────────────────────────────
  const aboutPanel    = document.getElementById('about-panel');
  const aboutCloseBtn = document.getElementById('about-close-btn');
  function openAbout()  { aboutPanel.classList.remove('hidden'); Audio.SFX.menuConfirm(); }
  function closeAbout() { aboutPanel.classList.add('hidden'); }
  aboutCloseBtn?.addEventListener('click',    () => closeAbout());
  aboutCloseBtn?.addEventListener('touchend', (e) => { e.preventDefault(); closeAbout(); });

  function isPauseOpen()    { return pauseActive; }
  function isMemoriesOpen() { return memoriesOpen; }
  function isAnyOpen() {
    return pauseActive || memoriesOpen ||
           !ctrlPanel.classList.contains('hidden') ||
           !aboutPanel.classList.contains('hidden');
  }

  return {
    openPause, closePause, pauseUp, pauseDown, pauseConfirm, isPauseOpen,
    openMemories, closeMemories, isMemoriesOpen,
    openControls, closeControls,
    openAbout,   closeAbout,
    isAnyOpen
  };
})();
