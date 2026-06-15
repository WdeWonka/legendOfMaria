/* ============================================================
   THE LEGEND OF MARIA - Notification System
   ============================================================ */

const Notifications = (() => {
  const el   = document.getElementById('notification');
  const text = document.getElementById('notification-text');
  let timer  = null;

  function show(msg, duration = 2500) {
    if (timer) clearTimeout(timer);
    text.textContent = msg;
    el.classList.remove('hidden');
    timer = setTimeout(() => {
      el.classList.add('hidden');
      timer = null;
    }, duration);
  }

  return { show };
})();
