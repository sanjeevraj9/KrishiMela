document.getElementById("seedForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("type", document.getElementById("type").value);
  formData.append("quantity", document.getElementById("quantity").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("image", document.getElementById("image").files[0]);

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/seeds/add", {
      method: "POST",
      headers: {
       // "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
        
      },
      
      body: formData
    });

    if (response.ok) {
      alert("Seed submitted successfully!");
      document.getElementById("seedForm").reset();
    } else {
      alert("Failed to submit seed");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
