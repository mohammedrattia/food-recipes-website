if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  var path = "./";
else var path = "/food-recipes-website/";
fetch(`${path}data/recommendations.json`)
  .then((response) => response.json()) /*extracts data from the JSON file*/
  .then((data) => {
  const container = document.querySelector(".gallery-container");
  for (let i = 0; i < data.length; i++) {
    const recipe = data[i];
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="gallery-item-content">
      <h3><a href="recipe.html?id=${recipe.id}">${recipe.title}</a></h3>
        <p>${recipe.description}</p>
      </div>
    `;
    container.appendChild(card);
  }
});
