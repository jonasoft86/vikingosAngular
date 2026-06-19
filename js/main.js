document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main > section[id]")];

const setActiveSection = (id) => {
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    },
    { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, 0.25, 0.5] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle) navToggle.checked = false;
  });
});

const revealGroups = [
  [".hero .eyebrow, .hero h1, .hero .lead, .hero .actions", true],
  [".section-heading > *, .projects > .container > .eyebrow, .projects > .container > h2, .projects > .container > .lead", false],
  [".service-grid article, .project-card, .values article, .process > div, .process li, .closing, .contact-grid > *, .footer", false],
];

const revealItems = [];
revealGroups.forEach(([selector, maskHeadings]) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add("reveal");
    if (maskHeadings && element.matches("h1, h2")) element.classList.add("reveal--mask");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    revealItems.push(element);
  });
});

const heroRevealItems = revealItems.filter((element) => element.closest(".hero"));
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    heroRevealItems.forEach((element) => element.classList.add("is-visible"));
  });
});

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  revealItems
    .filter((element) => !element.closest(".hero"))
    .forEach((element) => revealObserver.observe(element));
}

const hero = document.querySelector(".hero");
const parallaxLayers = [
  [document.querySelector(".hero-scene__mountains"), 0.035],
  [document.querySelector(".hero-scene__tide--back"), 0.055],
  [document.querySelector(".hero-scene__tide--middle"), 0.075],
  [document.querySelector(".hero-scene__tide--front"), 0.095],
  [document.querySelector(".hero-scene__ship"), 0.06],
  [document.querySelector(".hero-scene__foreground-tide"), 0.11],
  ...[...document.querySelectorAll(".hero-scene__hull-wave")].map((layer) => [layer, 0.12]),
].filter(([element]) => element);

let ticking = false;
const updateScrollEffects = () => {
  const scrollY = window.scrollY;
  header?.classList.toggle("is-scrolled", scrollY > 20);

  if (!reduceMotion.matches && hero && scrollY <= hero.offsetHeight * 1.25) {
    parallaxLayers.forEach(([layer, speed]) => {
      layer.style.translate = `0 ${Math.round(scrollY * speed)}px`;
    });
  }
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollEffects);
  },
  { passive: true }
);
updateScrollEffects();

const tiltCards = [...document.querySelectorAll(".project-card, .service-grid article")];
if (finePointer.matches && !reduceMotion.matches) {
  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 7;
      const rotateX = (0.5 - y) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      card.style.setProperty("--glow-x", `${x * 100}%`);
      card.style.setProperty("--glow-y", `${y * 100}%`);
      card.style.setProperty("--glow-opacity", "1");
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("transform");
      card.style.setProperty("--glow-opacity", "0");
    });
  });
}

const contactForm = document.querySelector(".contact-form");
const formStatus = contactForm?.querySelector(".form-status");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    if (formStatus) {
      formStatus.textContent = "Revisa los campos obligatorios.";
      formStatus.className = "form-status is-error";
    }
    return;
  }

  if (formStatus) {
    formStatus.textContent = "Formulario validado. Falta conectar el servicio de envío.";
    formStatus.className = "form-status is-success";
  }
});
