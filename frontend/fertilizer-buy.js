// Dummy data for now — API-ready
async function fetchFertilizers() {
  const fertilizers = [
    {
      name: "Urea",
      pricePerKg: 300,
      imageUrl: "https://via.placeholder.com/150",
      sellerName: "Raj Singh",
      location: "Punjab"
    },
    {
      name: "DAP Fertilizer",
      pricePerKg: 450,
      imageUrl: "https://via.placeholder.com/150",
      sellerName: "Kavita Sharma",
      location: "Madhya Pradesh"
    }
  ];

  const container = document.getElementById("fertilizerList");
  fertilizers.forEach(f => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-xl rounded-xl p-4";

    card.innerHTML = `
      <img src="${f.imageUrl}" alt="${f.name}" class="rounded-xl w-full h-40 object-cover mb-3">
      <h3 class="text-lg font-bold text-green-700">${f.name}</h3>
      <p class="text-gray-600">₹${f.pricePerKg} per Kg</p>
      <p class="text-sm text-gray-500">🧑‍🌾 ${f.sellerName} - ${f.location}</p>
      <button class="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full">Buy Now</button>
    `;

    container.appendChild(card);
  });
}

window.onload = fetchFertilizers;
