// Menu mobile e anno nel footer. Nessun tracciamento, nessuna dipendenza.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }
  // Home: impronte di un animale che cammina lungo il lato destro.
  // Partono chiarissime e si scuriscono man mano che le si supera scorrendo.
  const walk = document.querySelector('.walk');
  if (walk) {
    const main = walk.parentElement;
    const hero = main.querySelector('.hero');
    const MAX = 1152; // larghezza massima del contenuto (72rem)
    let steps = [];
    let tops = [];

    const update = () => {
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const line = window.scrollY + window.innerHeight * 0.6 - mainTop;
      steps.forEach((el, i) => el.classList.toggle('is-past', tops[i] < line));
    };

    const build = () => {
      const W = main.clientWidth;
      const H = main.scrollHeight;
      const margin = (W - MAX) / 2;
      const wide = margin >= 120; // c'è spazio libero a lato del testo
      const size = wide ? 76 : W < 600 ? 38 : 50;
      const gap = size * 2.5;
      const centerX = wide ? W - margin / 2 : W - size * 0.7;
      const sway = size * (wide ? 0.35 : 0.15);
      const start = (hero ? hero.offsetHeight : 0) + gap * 0.5;
      walk.replaceChildren();
      steps = []; tops = [];
      for (let y = start, i = 0; y < H - size; y += gap, i++) {
        const el = document.createElement('span');
        el.className = 'step';
        const x = centerX - size / 2 + Math.sin(i * 0.8) * sway;
        const angle = 180 + Math.sin(i * 0.8 + 1) * 8;
        el.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;transform:rotate(${angle}deg)`;
        walk.append(el);
        steps.push(el); tops.push(y + size / 2);
      }
      update();
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    let lastSize = '';
    new ResizeObserver(() => {
      const key = main.clientWidth + 'x' + main.scrollHeight;
      if (key !== lastSize) { lastSize = key; build(); }
    }).observe(main);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
