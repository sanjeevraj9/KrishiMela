document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Load sidebar
  fetch("sidebar.html")
    .then(res => res.text())
    .then(html => {
      sidebar.innerHTML = html;

      const sectionLinks = sidebar.querySelectorAll("li[data-section]");
      sectionLinks.forEach((item) => {
        item.addEventListener("click", () => {
          const sectionId = item.getAttribute("data-section");
          switchSection(sectionId);

          sidebar.classList.add("-translate-x-full");
          overlay.classList.add("hidden");
        });
      });
    });

  // Hamburger toggle
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
  });

  // Header tab switching
  const tabBtns = document.querySelectorAll(".tabBtn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sectionId = btn.getAttribute("data-section");
      switchSection(sectionId);

      tabBtns.forEach((b) => b.classList.remove("border-b-2", "border-green-600", "text-green-900"));
      btn.classList.add("border-b-2", "border-green-600", "text-green-900");
    });
  });

  // Hide all sections and show only home on load
  const allSections = document.querySelectorAll(".section");
  allSections.forEach((sec) => sec.classList.add("hidden"));
  const home = document.getElementById("home");
  if (home) home.classList.remove("hidden");

  // Switch section with fade animation + smooth scroll
  function switchSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach((sec) => sec.classList.add("hidden"));

    const active = document.getElementById(sectionId);
    if (active) {
      active.classList.remove("hidden");
      active.classList.add("fade-in");

      // Remove animation class after animation finishes
      setTimeout(() => {
        active.classList.remove("fade-in");
      }, 400);

      active.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});
