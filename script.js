/* ====================================================================
   APEX SIM RACING ACADEMY — script.js
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initScrollReveal();
  initCounters();
  initSec05Typewriter();
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

/* ====================================================================
   SECCIÓN 05 — FRASE (efecto letra por letra)
   Cada carácter de la frase se envuelve en un span individual con
   un transition-delay creciente. La clase "is-visible" en el
   contenedor dispara la revelación de todos los spans en cascada.
   A diferencia de los demás reveals del sitio, ESTE se repite cada
   vez que la sección entra o sale del viewport (no usa unobserve).
   ==================================================================== */

function initSec05Typewriter() {
  const frase = document.querySelector('[data-typewriter]');
  if (!frase) return;

  const DELAY_STEP = 18; // ms entre letra y letra

  // Envuelve cada carácter de texto en un span.sec05__char, agrupando
  // las letras de cada palabra dentro de un span.sec05__word (con
  // white-space: nowrap) para que el navegador nunca corte la línea
  // en medio de una palabra. Los espacios quedan como chars sueltos
  // entre palabras, que es donde sí puede saltar de línea.
  // Preserva los <span class="sec05__highlight"> ya presentes.
  function wrapChars(node) {
    let charIndex = 0;

    function makeChar(ch) {
      const span = document.createElement('span');
      span.className = 'sec05__char';
      span.textContent = ch;
      span.style.transitionDelay = `${charIndex * DELAY_STEP}ms`;
      charIndex += 1;
      return span;
    }

    function walk(node) {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const fragment = document.createDocumentFragment();
          // separa el texto en palabras y espacios, conservando ambos
          const tokens = child.textContent.split(/( +)/).filter((t) => t.length);

          tokens.forEach((token) => {
            if (token.trim() === '') {
              // espacio(s): un char suelto por cada uno
              token.split('').forEach((ch) => fragment.appendChild(makeChar(ch)));
            } else {
              // palabra: agrupada en un span que no se puede cortar
              const wordSpan = document.createElement('span');
              wordSpan.className = 'sec05__word';
              token.split('').forEach((ch) => wordSpan.appendChild(makeChar(ch)));
              fragment.appendChild(wordSpan);
            }
          });

          child.replaceWith(fragment);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          // elementos como .sec05__highlight: se procesan recursivamente
          // para que sus letras también queden individualizadas, pero
          // siguen contando dentro de la misma secuencia de delays.
          walk(child);
        }
      });
    }

    walk(node);
  }

  wrapChars(frase);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(frase);
}