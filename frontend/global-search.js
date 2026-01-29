// 🔹 Helper function (SABSE UPAR)
function renderResultCard(item, category) {
  let buyLink = "#";

  if (category === "crop") buyLink = "crop-buy.html";
  if (category === "seed") buyLink = "seed-buy.html";
  if (category === "fertilizer") buyLink = "fertilizer-buy.html";

  return `
    <div class="bg-white rounded-lg shadow p-4">
      <img
        src="${item.image || ''}"
        class="h-40 w-full object-cover rounded"
      />

      <h3 class="text-lg font-semibold mt-2">
        ${item.name}
      </h3>

      <p class="text-sm text-gray-600">
        ${item.type || category}
      </p>

      <p class="font-semibold text-green-700">
        ₹${item.price}
      </p>

      <button
        onclick="window.location.href='${buyLink}'"
        class="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearchInput");
  const btn = document.getElementById("globalSearchBtn");
  const resultSection = document.getElementById("globalSearchResults");
  const resultGrid = document.getElementById("resultGrid");

  btn.addEventListener("click", runSearch);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") runSearch();
  });

  async function runSearch() {
    const keyword = input.value.trim();
    if (!keyword) return;

    resultGrid.innerHTML = "Loading...";
    resultSection.classList.remove("hidden");

    try {
      const [cropRes, seedRes, fertRes] = await Promise.all([
        fetch(`http://localhost:8080/api/crops/search?keyword=${keyword}`),
        fetch(`http://localhost:8080/api/seeds/search?keyword=${keyword}`),
        fetch(`http://localhost:8080/api/fertilizers/search?keyword=${keyword}`)
      ]);

      const crops = await cropRes.json();
      const seeds = await seedRes.json();
      const fertilizers = await fertRes.json();

      resultGrid.innerHTML = "";

      crops.forEach(i =>
        resultGrid.innerHTML += renderResultCard(i, "crop")
      );

      seeds.forEach(i =>
        resultGrid.innerHTML += renderResultCard(i, "seed")
      );

      fertilizers.forEach(i =>
        resultGrid.innerHTML += renderResultCard(i, "fertilizer")
      );

      if (!crops.length && !seeds.length && !fertilizers.length) {
        resultGrid.innerHTML = "<p>No results found</p>";
      }

    } catch (e) {
      console.error(e);
      resultGrid.innerHTML =
        "<p class='text-red-500'>Search failed</p>";
    }
  }
});
