/* ============================================================
   THE LEGEND OF MARIA - HUD System
   ============================================================ */

const HUD = (() => {
  const hudEl       = document.getElementById('hud');
  const hearts      = document.querySelectorAll('.heart');
  const coinCountEl = document.getElementById('coin-count');
  const costumeEl   = document.getElementById('item-costume');
  const poleEl      = document.getElementById('item-pole');
  const bossHudEl   = document.getElementById('boss-hud');
  const bossNameEl  = document.getElementById('boss-name-label');
  const bossBarEl   = document.getElementById('boss-health-bar');

  function show()  { hudEl.classList.remove('hidden'); }
  function hide()  { hudEl.classList.add('hidden'); }

  function updateHearts(hp, maxHp) {
    hearts.forEach((h, i) => {
      h.classList.toggle('full',  i < hp);
      h.classList.toggle('empty', i >= hp);
    });
  }

  function updateCoins(n) {
    coinCountEl.textContent = n;
  }

  function setCostume(collected) {
    costumeEl.classList.toggle('collected', collected);
    costumeEl.classList.toggle('missing',   !collected);
  }

  function setPole(collected) {
    poleEl.classList.toggle('collected', collected);
    poleEl.classList.toggle('missing',   !collected);
  }

  function showBoss(name) {
    bossNameEl.textContent = name;
    bossBarEl.style.width = '100%';
    bossHudEl.classList.remove('hidden');
  }

  function updateBossHp(hp, maxHp) {
    const pct = Math.max(0, hp / maxHp) * 100;
    bossBarEl.style.width = pct + '%';
  }

  function hideBoss() {
    bossHudEl.classList.add('hidden');
  }

  return { show, hide, updateHearts, updateCoins, setCostume, setPole, showBoss, updateBossHp, hideBoss };
})();
