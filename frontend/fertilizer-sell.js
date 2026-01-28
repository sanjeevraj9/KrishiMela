document.getElementById("fertilizerForm")
  .addEventListener("submit", async function (e) {

  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    return;
  }

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("type", document.getElementById("type").value);
  formData.append("quantity", document.getElementById("quantity").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("image", document.getElementById("image").files[0]);

  try {
    const response = await fetch(
      "http://localhost:8080/api/fertilizers/add",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token
        },
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    alert("Fertilizer uploaded successfully!");
    document.getElementById("fertilizerForm").reset();

  } catch (err) {
    console.error(err);
    alert("Error uploading fertilizer");
  }
});
