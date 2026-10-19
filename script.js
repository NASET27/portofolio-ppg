/* Sakelar tema terang/gelap, preferensi disimpan di browser */
(() => {
  const root = document.documentElement;
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem("ppg-portfolio-theme") || "light"; } catch {}
  if (savedTheme !== "dark" && savedTheme !== "light") savedTheme = "light";
  root.dataset.theme = savedTheme;

  const navWrap = document.querySelector(".nav-wrap");
  const nav = document.getElementById("mainNav");
  if (!navWrap || !nav) return;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";
  toggle.id = "themeToggle";
  toggle.setAttribute("aria-pressed", String(savedTheme === "dark"));
  toggle.setAttribute("aria-label", savedTheme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap");
  toggle.innerHTML = savedTheme === "dark" ? "☀ <span>Mode terang</span>" : "☾ <span>Mode gelap</span>";
  nav.insertAdjacentElement("afterend", toggle);

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    toggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
    toggle.setAttribute("aria-label", nextTheme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    toggle.innerHTML = nextTheme === "dark" ? "☀ <span>Mode terang</span>" : "☾ <span>Mode gelap</span>";
    try { localStorage.setItem("ppg-portfolio-theme", nextTheme); } catch {}
  });
})();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka navigasi");
      menuToggle.textContent = "☰";
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
