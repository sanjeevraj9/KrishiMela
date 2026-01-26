document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
   const username = document.getElementById("username").value;
  const contact = document.getElementById("contact").value; // email ya mobile
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value; // FARMER ya BUYER

  const userData = {
    name: name,
    username: username,
    email: contact,
    password: password,
    role: [role]
  };

  fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      return res.json();
    })
    .then((data) => {
      alert("Registration successful!");
      localStorage.setItem("jwtToken", data.token);
      window.location.href = "login.html";
    })
    .catch((err) => {
      console.error(err);
      alert("Registration failed: " + err.message);
    });
});
