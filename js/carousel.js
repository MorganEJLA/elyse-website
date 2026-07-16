// Inquiry type selector

document.querySelectorAll(".inq-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".inq-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    document.getElementById("inquiry-type").value = item.textContent.trim();
  });
});
const siteName = document.querySelector(".site-name");
const hero = document.querySelector("#hero");

const observer = new IntersectionObserver(
  ([entry]) => {
    siteName.classList.toggle("site-name--visible", !entry.isIntersecting);
  },
  { threshold: 0 },
);

observer.observe(hero);
// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // close menu when a link is tapped
  mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
    });
  });
}
document.querySelector(".footer-copy").textContent =
  "© " + new Date().getFullYear();
// js/carousel.js
(() => {
  const track = document.getElementById("carouselTrack");
  const outer = document.getElementById("carouselOuter");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsEl = document.getElementById("carouselDots");
  const countEl = document.getElementById("carouselCount");

  if (!track || !outer) return; // bail if section not present

  const cards = track.querySelectorAll(".project-card");
  const total = cards.length;
  const GAP = 24; // matches 1.5rem gap at 16px base
  let current = 0;

  function visibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth >= 960) return 3;
    return 2;
  }

  function cardWidth() {
    const vc = visibleCount();
    if (vc === 1) return outer.offsetWidth;
    return (outer.offsetWidth - (vc - 1) * GAP) / vc;
  }

  function maxIndex() {
    return Math.max(0, total - visibleCount());
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    const n = maxIndex() + 1;
    for (let i = 0; i < n; i++) {
      const btn = document.createElement("button");
      btn.className = "carousel-dot" + (i === current ? " active" : "");
      btn.setAttribute("aria-label", "Slide " + (i + 1));
      btn.addEventListener("click", () => go(i));
      dotsEl.appendChild(btn);
    }
  }

  function go(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const gap = visibleCount() === 1 ? 0 : GAP;
    const offset = current * (cardWidth() + gap);
    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();
    countEl.textContent = `${current + 1} / ${maxIndex() + 1}`;
    dotsEl.querySelectorAll(".carousel-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  prevBtn.addEventListener("click", () => go(current - 1));
  nextBtn.addEventListener("click", () => go(current + 1));

  function init() {
    const cw = cardWidth();
    cards.forEach((c) => {
      c.style.width = cw + "px";
    });
    if (current > maxIndex()) current = maxIndex();
    go(current);
    buildDots();
  }

  window.addEventListener("resize", init);
  init();
})();
