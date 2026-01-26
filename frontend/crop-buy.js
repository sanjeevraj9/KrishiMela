async function loadCrops() {
  try {
    const response = await fetch("http://localhost:8080/api/crops/search");

    if (!response.ok) {
      throw new Error("Failed to fetch crops");
    }

    const crops = await response.json();
    const cropList = document.getElementById("cropList");

    cropList.innerHTML = "";

    crops.forEach(crop => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow";

      card.innerHTML = `
        <img src="${crop.image}"
             alt="${crop.name}"
             class="h-40 w-full object-cover rounded">

        <h3 class="text-lg font-semibold mt-2">${crop.name}</h3>
        <p>Type: ${crop.type}</p>
        <p>Location: ${crop.location}</p>
        <p>Price: ₹${crop.price}</p>

        <button class="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Buy Now
        </button>
      `;

      cropList.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    alert("Crops load nahi ho pa rahe");
  }
}

document.addEventListener("DOMContentLoaded", loadCrops);
