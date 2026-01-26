document.addEventListener("DOMContentLoaded", fetchSeeds);

async function fetchSeeds() {
  try {
    const response = await fetch("http://localhost:8080/api/seeds/search");

    if (!response.ok) {
      throw new Error("Failed to fetch seeds");
    }

    const seeds = await response.json();
    const seedList = document.getElementById("seedList");

    seedList.innerHTML = "";

    seeds.forEach(seed => {
      seedList.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow">
          <img 
            src="http://localhost:8080/images/${seed.image}" 
            class="h-40 w-full object-cover rounded"
            onerror="this.src='images/default-seed.jpg'"
          >

          <h3 class="text-lg font-semibold mt-2">${seed.name}</h3>
          <p>Type: ${seed.type}</p>
          <p>Quantity: ${seed.quantity}</p>
          <p class="font-semibold text-green-700">₹${seed.price}/kg</p>

          <button 
            class="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Buy Now
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.error("Error:", err);
  }
}
