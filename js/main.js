if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  var path = "./";
else var path = "/food-recipes-website/";
fetch(`${path}data/recommendations.json`)
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector(".gallery-container");
    data.forEach((recipe) => {
      const card = document.createElement("div");
      card.className = "gallery-item";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="gallery-item-content">
          <h3><a href="recipes.html">${recipe.title}</a></h3>
          <p>${recipe.description}</p>
        </div>
      `;
      container.appendChild(card);
    });
  });
