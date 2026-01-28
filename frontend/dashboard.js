document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const hamburgerBtn = document.getElementById("hamburgerBtn");

  const profileText = document.getElementById("profileText");

  /* ---------------- SIDEBAR ---------------- */

  fetch("sidebar.html")
    .then(res => res.text())
    .then(html => {
      sidebar.innerHTML = html;

      const sectionLinks = sidebar.querySelectorAll("li[data-section]");
      sectionLinks.forEach(item => {
        item.addEventListener("click", () => {
          const sectionId = item.getAttribute("data-section");
          switchSection(sectionId);

          sidebar.classList.add("-translate-x-full");
          overlay.classList.add("hidden");
        });
      });
    });

  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });

  /* ---------------- PROFILE LOGIC ---------------- */

  const token = localStorage.getItem("token");
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const profileAvatar = document.getElementById("profileAvatar");

// Avatar letter
profileAvatar.innerText = name ? name.charAt(0).toUpperCase() : "S";

// Toggle menu
profileBtn.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

// Menu content
if (!token) {
  profileMenu.innerHTML = `
    <a href="login.html" class="block px-4 py-3 hover:bg-gray-100">Login</a>
    <a href="register.html" class="block px-4 py-3 hover:bg-gray-100">Sign Up</a>
  `;
} else {
  profileMenu.innerHTML = `
    <div class="px-4 py-3 border-b">
      <p class="font-semibold">${name}</p>
      <p class="text-sm text-gray-500">${email}</p>
    </div>
    <button id="logoutBtn"
      class="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">
      Logout
    </button>
  `;

  setTimeout(() => {
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }, 0);
}

// Close on outside click
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.add("hidden");
  }
});

  /* ---------------- TABS ---------------- */

  const tabBtns = document.querySelectorAll(".tabBtn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const sectionId = btn.getAttribute("data-section");
      switchSection(sectionId);

      tabBtns.forEach(b =>
        b.classList.remove("border-b-2", "border-green-600", "text-green-900")
      );
      btn.classList.add("border-b-2", "border-green-600", "text-green-900");
    });
  });

  /* ---------------- DEFAULT HOME ---------------- */

  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.add("hidden")
  );
  document.getElementById("home")?.classList.remove("hidden");

  function switchSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec =>
      sec.classList.add("hidden")
    );

    const active = document.getElementById(sectionId);
    if (active) {
      active.classList.remove("hidden");
      active.scrollIntoView({ behavior: "smooth" });
    }
  }

});
