document.getElementById("cropForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("type", document.getElementById("type").value);
  formData.append("quantity", document.getElementById("quantity").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("location", document.getElementById("location").value);
  formData.append("image", document.getElementById("image").files[0]);

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8080/api/crops/upload", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error("Crop upload failed");
    }

    alert("✅ Crop uploaded successfully");
    document.getElementById("cropForm").reset();

  } catch (err) {
    console.error(err);
    alert("❌ Error uploading crop");
  }
});
