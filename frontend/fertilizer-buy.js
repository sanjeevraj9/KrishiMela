document.addEventListener("DOMContentLoaded", fetchFertilizers);

async function fetchFertilizers() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/fertilizers/search"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch fertilizers");
    }

    const fertilizers = await response.json();
    renderFertilizers(fertilizers);

  } catch (err) {
    console.error(err);
    document.getElementById("fertilizerList").innerHTML =
      "<p class='text-red-500'>Failed to load fertilizers</p>";
  }
}

function renderFertilizers(list) {
  const container = document.getElementById("fertilizerList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No fertilizers available</p>";
    return;
  }

  list.forEach(item => {
    container.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow">
        <img src="${item.image}"
             alt="${item.name}"
             class="h-40 w-full object-cover rounded">

        <h3 class="text-lg font-semibold mt-2">${item.name}</h3>
        <p>Type: ${item.type}</p>
        <p>Price: ₹${item.price}/kg</p>

        <button
          class="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Buy Now
        </button>
      </div>
    `;
  });
}
