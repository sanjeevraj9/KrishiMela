document.addEventListener("DOMContentLoaded", () => {
  const cropList = document.getElementById("cropList");
  const searchInput = document.getElementById("searchInput");

  const token = localStorage.getItem("token");

  // Fetch all crops from backend
  const fetchCrops = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/crops", {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      const data = await res.json();
      renderCrops(data);

      // Live search
      searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = data.filter(crop =>
          crop.name.toLowerCase().includes(keyword) ||
          crop.category.toLowerCase().includes(keyword)
        );
        renderCrops(filtered);
      });

    } catch (err) {
      console.error(err);
      cropList.innerHTML = `<p class="text-red-500 col-span-full">⚠️ Failed to fetch crops.</p>`;
    }
  };

  const renderCrops = (crops) => {
    cropList.innerHTML = "";
    if (crops.length === 0) {
      cropList.innerHTML = `<p class="text-gray-500 col-span-full">No crops found.</p>`;
      return;
    }

    crops.forEach((crop) => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md p-4 border border-green-200";
      card.innerHTML = `
        <h3 class="text-xl font-bold text-green-700 mb-2">${crop.name}</h3>
        <p><strong>Category:</strong> ${crop.category}</p>
        <p><strong>Price:</strong> ₹${crop.price} /kg</p>
        <p><strong>Quantity:</strong> ${crop.quantity} kg</p>
        <p class="mt-2 text-gray-600">${crop.description || ""}</p>
      `;
      cropList.appendChild(card);
    });
  };

  fetchCrops();
});
