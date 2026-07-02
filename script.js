// =========================
// SCROLL SUAVE
// =========================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId && targetId.length > 1) {
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});


// =========================
// CURSOR DESTELLO AMARILLO
// =========================

(() => {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  document.querySelectorAll("a, button, .btn, .course-card, .pillar-card").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      glow.classList.add("is-hover");
    });

    element.addEventListener("mouseleave", () => {
      glow.classList.remove("is-hover");
    });
  });
})();


// =========================
// REVEAL EN SCROLL
// =========================

(() => {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
})();


// =========================
// CONTADORES
// =========================

(() => {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  function animateCounter(element) {
    const target = Number(element.dataset.target);
    const prefix = element.dataset.prefix || "";
    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      element.textContent = `${prefix}${currentValue}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${prefix}${target}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
})();


// =========================
// MANIFIESTO - LETRA POR LETRA
// =========================

(() => {
  const statementSection = document.querySelector(".statement-section");
  const statementText = document.querySelector(".js-letter-reveal");

  if (!statementSection || !statementText) return;

  function splitStatementLetters(block) {
    let globalIndex = 0;

    const lines = block.querySelectorAll(".animate-chars");

    lines.forEach((line) => {
      const nodes = Array.from(line.childNodes);

      function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          const fragment = document.createDocumentFragment();

          [...text].forEach((char) => {
            const span = document.createElement("span");
            span.classList.add("char");

            span.textContent = char === " " ? "\u00A0" : char;

            if (char.trim() !== "") {
              span.style.setProperty("--char-index", globalIndex);
              globalIndex++;
            } else {
              span.style.setProperty("--char-index", globalIndex);
            }

            fragment.appendChild(span);
          });

          node.replaceWith(fragment);
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(processNode);
        }
      }

      nodes.forEach(processNode);
    });
  }

  splitStatementLetters(statementText);

  const statementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            statementText.classList.add("is-visible");
          }, 450);

          statementObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.75
    }
  );

  statementObserver.observe(statementSection);
})();


// =========================
// PILARES - ACCORDION HORIZONTAL
// =========================

(() => {
  const pillarCards = document.querySelectorAll(".pillar-card");
  if (!pillarCards.length) return;

  pillarCards.forEach((card) => {
    card.addEventListener("click", () => {
      pillarCards.forEach((otherCard) => {
        otherCard.classList.remove("is-active");
      });

      card.classList.add("is-active");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });
})();


// =========================
// TECNOLOGÍA DE ÉLITE / VOLANTE
// =========================

(() => {
  const section = document.querySelector(".tech2-section");
  const scene = document.querySelector(".tech2-scene");
  const hotspots = document.querySelectorAll(".tech2-hotspot");

  const title = document.getElementById("tech2Title");
  const text = document.getElementById("tech2Text");
  const data = document.getElementById("tech2Data");

  if (!section || !scene) return;

  const info = {
    screen: {
      title: "Pantalla LCD",
      text: "Lectura de velocidad, marcha, delta y datos clave para corregir decisiones en tiempo real.",
      data: ["200 km/h", "Delta en vivo", "4 datos clave"]
    },
    bottom: {
      title: "Ajuste rápido",
      text: "Controles inferiores para modificar parámetros durante la sesión sin perder foco en la conducción.",
      data: ["4 encoders", "Setup dinámico", "Respuesta inmediata"]
    },
    left: {
      title: "Sector izquierdo",
      text: "Comandos de precisión para acciones rápidas, gestión de funciones y reducción del tiempo de reacción.",
      data: ["Acceso con pulgar", "Control lateral", "Menor reacción"]
    },
    right: {
      title: "Sector derecho",
      text: "Área destinada a funciones de carrera, cambios de configuración y control avanzado del vehículo.",
      data: ["Gestión de carrera", "Inputs rápidos", "Mayor precisión"]
    }
  };

  function limit(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function mix(a, b, t) {
    return a + (b - a) * t;
  }

  function updateTech2() {
    if (window.innerWidth <= 980) return;

    const rect = section.getBoundingClientRect();
    const sceneHeight = scene.offsetHeight;
    const total = section.offsetHeight - sceneHeight;
    const progress = limit(-rect.top / total, 0, 1);

    let left = 72;
    let top = 42;
    let width = 35;
    let copyOpacity = 1;

    scene.classList.remove("is-interactive");
    scene.classList.remove("has-zone");
    scene.dataset.zone = "";

    // FASE 1: al costado del texto
    if (progress <= 0.30) {
      const t = progress / 0.30;

      left = 72;
      top = 42;
      width = mix(35, 42, t);
      copyOpacity = 1;
    }

    // FASE 2: viaja al centro y el texto desaparece
    if (progress > 0.30 && progress <= 0.68) {
      const t = (progress - 0.30) / 0.38;

      left = mix(72, 39, t);
      top = mix(42, 46, t);
      width = mix(42, 58, t);

      copyOpacity = 1 - limit(t * 1.7, 0, 1);
    }

    // FASE 3: queda grande e interactivo
    if (progress > 0.68) {
      const t = (progress - 0.68) / 0.32;

      left = 39;
      top = 46;
      width = mix(58, 66, t);
      copyOpacity = 0;

      scene.classList.add("is-interactive");
    }

    scene.style.setProperty("--wheel-left", `${left}vw`);
    scene.style.setProperty("--wheel-top", `${top}%`);
    scene.style.setProperty("--wheel-width", `${width}vw`);
    scene.style.setProperty("--copy-opacity", copyOpacity);
  }

  function showZone(zone) {
    if (!scene.classList.contains("is-interactive")) return;

    const item = info[zone];
    if (!item || !title || !text || !data) return;

    scene.dataset.zone = zone;
    scene.classList.add("has-zone");

    title.textContent = item.title;
    text.textContent = item.text;
    data.innerHTML = item.data.map((value) => `<small>${value}</small>`).join("");
  }

  function hideZone() {
    scene.dataset.zone = "";
    scene.classList.remove("has-zone");
  }

  hotspots.forEach((hotspot) => {
    const zone = hotspot.dataset.zone;

    hotspot.addEventListener("mouseenter", () => showZone(zone));
    hotspot.addEventListener("mouseleave", hideZone);
    hotspot.addEventListener("click", () => showZone(zone));
  });

  window.addEventListener("scroll", updateTech2);
  window.addEventListener("resize", updateTech2);

  updateTech2();
})();
// =========================
// CIRCUITOS - SCROLL HORIZONTAL
// =========================

(() => {
  const section = document.querySelector(".circuits-section");
  const sticky = document.querySelector(".circuits-sticky");
  const track = document.querySelector(".circuits-track");

  if (!section || !sticky || !track) return;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateCircuitsGallery() {
    if (window.innerWidth <= 1000) {
      track.style.transform = "translateX(0)";
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / sectionHeight, 0, 1);

    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxMove = trackWidth - viewportWidth + window.innerWidth * 0.14;

    track.style.transform = `translateX(${-progress * maxMove}px)`;
  }

  window.addEventListener("scroll", updateCircuitsGallery);
  window.addEventListener("resize", updateCircuitsGallery);

  updateCircuitsGallery();
})();

/* =========================
   04 COACH SLIDER
========================= */
/* =========================
   04 COACH SLIDER - SOLO HACIA ADELANTE
========================= */

const coaches = [
  {
    name: "FACUNDO ÁLVAREZ",
    image: "./img/coach-facundo.png",
    quote: "“Hay que entender qué está diciendo cada dato para convertir cada error en una mejora.”"
  },
  {
    name: "LUCÍA MORENO",
    image: "./img/coach-lucia.png",
    quote: "“La telemetría no es solo para números: sirve para transformar la intuición en decisiones precisas.”"
  }
];

const coachImage = document.getElementById("coachImage");
const coachName = document.getElementById("coachName");
const coachQuote = document.getElementById("coachQuote");
const coachNext = document.getElementById("coachNext");

let coachIndex = 0;

/* precarga las imágenes para que no parpadeen */
coaches.forEach((coach) => {
  const img = new Image();
  img.src = coach.image;
});

function renderCoach() {
  if (!coachImage || !coachName || !coachQuote) return;

  const coach = coaches[coachIndex];

  coachImage.classList.add("is-changing");

  setTimeout(() => {
    coachImage.src = coach.image;
    coachImage.alt = `${coach.name}, coach de Apex`;
    coachName.textContent = coach.name;
    coachQuote.textContent = coach.quote;

    coachImage.onload = () => {
      coachImage.classList.remove("is-changing");
    };
  }, 260);
}

if (coachNext) {
  coachNext.addEventListener("click", () => {
    coachIndex = (coachIndex + 1) % coaches.length;
    renderCoach();
  });
}

renderCoach();

/* =========================
   TESTIMONIOS - DUPLICAR PARA LOOP INFINITO
========================= */

const reviewsTrack = document.querySelector(".adv-reviews-track");

if (reviewsTrack && !reviewsTrack.dataset.cloned) {
  const originalCards = Array.from(reviewsTrack.children);

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    reviewsTrack.appendChild(clone);
  });

  reviewsTrack.dataset.cloned = "true";
}

/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".adv-faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".adv-faq-question");
  const answer = item.querySelector(".adv-faq-answer");

  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((otherItem) => {
      const otherAnswer = otherItem.querySelector(".adv-faq-answer");
      otherItem.classList.remove("is-open");

      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    if (!isOpen) {
      item.classList.add("is-open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

/* =========================
   PANTALLA DE CARGA ENTRE PÁGINAS
========================= */

const pageLoader = document.getElementById("pageLoader");

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href) return;

    const isAnchor = href.startsWith("#");
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const opensNewTab = this.getAttribute("target") === "_blank";

    if (isAnchor || isExternal || opensNewTab) return;

    e.preventDefault();

    if (pageLoader) {
      pageLoader.classList.add("is-active");
    }

    setTimeout(() => {
      window.location.href = href;
    }, 2000);
  });
});