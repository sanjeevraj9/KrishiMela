document.addEventListener("DOMContentLoaded", fetchCrops);

async function fetchCrops() {
  try {
    const response = await fetch("http://localhost:8080/api/crops/search");

    if (!response.ok) {
      throw new Error("Failed to fetch crops");
    }

    const crops = await response.json();
    renderCrops(crops);

  } catch (error) {
    console.error(error);
    document.getElementById("cropList").innerHTML =
      "<p class='text-red-600'>Failed to load crops</p>";
  }
}

function renderCrops(crops) {
  const cropList = document.getElementById("cropList");
  cropList.innerHTML = "";

  if (crops.length === 0) {
    cropList.innerHTML = "<p>No crops available</p>";
    return;
  }

  crops.forEach(crop => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow";

    card.innerHTML = `
      <img src="http://localhost:8080/images/${crop.image ?? 'default.jpg'}"
           class="h-40 w-full object-cover rounded mb-2">

      <h3 class="text-lg font-semibold">${crop.name}</h3>
      <p>Type: ${crop.type}</p>
      <p>Quantity: ${crop.quantity} kg</p>
      <p class="font-bold">₹${crop.price} / kg</p>
      <p class="text-sm text-gray-600">${crop.location}</p>

      <button
        class="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Buy Now
      </button>
    `;

    cropList.appendChild(card);
  });
}
