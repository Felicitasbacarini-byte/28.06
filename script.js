/* ====================================================================
   APEX SIM RACING ACADEMY — script.js
   Sección: Navbar + Hero
   ==================================================================== */
 
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initScrollReveal();
});
 
/* ====================================================================
   CURSOR GLOW
   Destello amarillo que sigue al mouse, con efecto extra al pasar
   sobre elementos interactivos (links, botones).
   ==================================================================== */
 
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
 
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  let hasMoved = false;
 
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!hasMoved) {
      hasMoved = true;
      glowX = mouseX;
      glowY = mouseY;
      glow.classList.add('is-active');
    }
  });
 
  window.addEventListener('mouseleave', () => {
    glow.classList.remove('is-active');
  });
 
  window.addEventListener('mouseenter', () => {
    glow.classList.add('is-active');
  });
 
  // suaviza el movimiento del glow respecto al cursor real
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }
  requestAnimationFrame(animateGlow);
 
  // estado "hover" sobre elementos clickeables
  const interactiveEls = document.querySelectorAll('a, button, .btn');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => glow.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => glow.classList.remove('is-hover'));
  });
}
 
/* ====================================================================
   SCROLL REVEAL
   Los elementos marcados con [data-reveal] aparecen con fade + slide
   a medida que entran en el viewport.
   ==================================================================== */
 
function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;
 
  // En el hero, mostramos el contenido apenas carga la página
  // (no requiere scroll, ya que está visible desde el inicio).
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );
 
  revealEls.forEach((el) => observer.observe(el));
 
  // Disparo inmediato para el contenido del hero (above the fold)
  requestAnimationFrame(() => {
    const heroReveals = document.querySelectorAll('.hero [data-reveal]');
    heroReveals.forEach((el) => el.classList.add('is-visible'));
  });
}
 /* ====================================================================
   APEX SIM RACING ACADEMY — script.js
   Sección: Navbar + Hero
   ==================================================================== */
 
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initScrollReveal();
  initCounters();
});
 
/* ====================================================================
   CURSOR GLOW
   Destello amarillo que sigue al mouse, con efecto extra al pasar
   sobre elementos interactivos (links, botones).
   ==================================================================== */
 
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
 
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  let hasMoved = false;
 
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!hasMoved) {
      hasMoved = true;
      glowX = mouseX;
      glowY = mouseY;
      glow.classList.add('is-active');
    }
  });
 
  window.addEventListener('mouseleave', () => {
    glow.classList.remove('is-active');
  });
 
  window.addEventListener('mouseenter', () => {
    glow.classList.add('is-active');
  });
 
  // suaviza el movimiento del glow respecto al cursor real
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }
  requestAnimationFrame(animateGlow);
 
  // estado "hover" sobre elementos clickeables
  const interactiveEls = document.querySelectorAll('a, button, .btn');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => glow.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => glow.classList.remove('is-hover'));
  });
}
 
/* ====================================================================
   SCROLL REVEAL
   Los elementos marcados con [data-reveal] aparecen con fade + slide
   a medida que entran en el viewport.
   ==================================================================== */
 
function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;
 
  // En el hero, mostramos el contenido apenas carga la página
  // (no requiere scroll, ya que está visible desde el inicio).
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );
 
  revealEls.forEach((el) => observer.observe(el));
 
  // Disparo inmediato para el contenido del hero (above the fold)
  requestAnimationFrame(() => {
    const heroReveals = document.querySelectorAll('.hero [data-reveal]');
    heroReveals.forEach((el) => el.classList.add('is-visible'));
  });
}
 
/* ====================================================================
   CONTADORES ANIMADOS
   Los números de stats (+120, +3110, +500) cuentan desde 0 hasta su
   valor final a medida que entran en el viewport, con una animación
   lenta y desacelerada (ease-out).
   ==================================================================== */
 
function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;
 
  const DURATION = 2600; // ms — animación lenta, según lo pedido
 
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
 
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count-to'), 10);
    const startTime = performance.now();
 
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);
      el.textContent = '+' + current.toLocaleString('es-AR');
 
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = '+' + target.toLocaleString('es-AR');
      }
    }
    requestAnimationFrame(tick);
  }
 
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
 
  counters.forEach((el) => observer.observe(el));
}