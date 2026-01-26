document.getElementById("fertilizerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fertilizerData = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    quantity: parseFloat(document.getElementById("quantity").value),
    pricePerKg: parseFloat(document.getElementById("pricePerKg").value),
    imageUrl: document.getElementById("imageUrl").value,
    description: document.getElementById("description").value
  };

  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch("http://localhost:8080/api/fertilizers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(fertilizerData)
    });

    if (response.ok) {
      alert("Fertilizer submitted successfully!");
      document.getElementById("fertilizerForm").reset();
    } else {
      alert("Failed to submit fertilizer.");
    }
  } catch (err) {
    console.error("Error submitting fertilizer:", err);
  }
});
