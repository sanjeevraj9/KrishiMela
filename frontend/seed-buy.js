async function loadSeeds() {
  try {
    const response = await fetch("http://localhost:8080/api/seeds/search");

    if (!response.ok) {
      throw new Error("Failed to fetch seeds");
    }

    const seeds = await response.json();
    const seedList = document.getElementById("seedList");

    seedList.innerHTML = ""; // clear old

    seeds.forEach(seed => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow";

      card.innerHTML = `
        <img src="${seed.image}" 
             alt="${seed.name}" 
             class="h-40 w-full object-cover rounded">

        <h3 class="text-lg font-semibold mt-2">${seed.name}</h3>
        <p>Type: ${seed.type}</p>
        <p>Price: ₹${seed.price}/kg</p>

        <button class="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Buy Now
        </button>
      `;

      seedList.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    alert("Seeds load nahi ho pa rahe");
  }
}

// page load pe call
document.addEventListener("DOMContentLoaded", loadSeeds);
