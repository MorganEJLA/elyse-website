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
const footerCopy = document.querySelector(".footer-copy");
if (footerCopy) {
  footerCopy.textContent = "© " + new Date().getFullYear();
}
