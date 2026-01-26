// script.js

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Form reload na ho

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();

      // ✅ Token save karo localStorage me
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again later.");
  }
});
