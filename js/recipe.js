let users = JSON.parse(localStorage.getItem("MyUsers")) || {};
let currentUser = localStorage.getItem("currentUser") || "";
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  var path = "./";
else var path = "/food-recipes-website/";

if (recipeId == null) {
  document.getElementById("article-title").innerHTML = `<h1>Error: No recipe ID provided</h1>
    <p>Example: <code>recipe.html?id=1</code></p>`;
} else {
  fetch(`${path}data/recipes.json`)
    .then((response) => response.json())
    .then((data) => {
      if (!data[recipeId]) {
        document.getElementById("article-title").innerHTML = `<h1>Recipe not found</h1>
                                    <p>No recipe with ID <strong>${recipeId}</strong> exists.</p>`;
      }

      document.getElementById(
        "image"
      ).innerHTML = `<img src="./images/image${recipeId}.jpg" alt="Image of ${data[recipeId].name}" class="cover-image" width=200x height=auto>`;

      document.getElementsByTagName(
        "title"
      )[0].innerHTML = `${data[recipeId].name}`;

      if (users[currentUser].favorites.includes(recipeId)) {
        var isFav = "fa-solid";
        var isActive = "active";
      } else {
        var isFav = "fa-regular";
        var isActive = "";
      }

      document.getElementById("article-title").innerHTML = `
      <h1>${data[recipeId].name}
      <button onclick="fav_button(this.id)" class="fav-btn ${isActive}" id="fav_${recipeId}"><i class="${isFav} fa-heart"></i></button>
      </h1>`;
      // <button class="fav-btn"><i class="fa-regular fa-heart"></i></button></h1>

      document.getElementById(
        "description"
      ).innerHTML = `<h2>Description</h2><hr>
        <p>${data[recipeId].description}</p>`;

      let ingredientsText = `<h2>Ingredients</h2><hr><ul>`;
      let ingredients = data[recipeId].ingredients;
      for (let i = 0; i < ingredients.length; i++) {
        ingredientsText += "<li>" + ingredients[i] + "</li>";
      }
      ingredientsText += "</ul>";
      document.getElementById("ingredients").innerHTML = ingredientsText;

      document.getElementById("method").innerHTML = `<h2>Method</h2><hr>
        <p>${data[recipeId].method}</p>`;
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
}

function fav_button(id) {
  let btn = document.getElementById(id);
  const isActive = btn.classList.toggle("active");
  const icon = btn.querySelector("i");
  // Toggle heart icon
  if (isActive) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    users[currentUser].favorites.push(id.slice(4, id.length));
  } else {
    let recipe_index = users[currentUser].favorites.indexOf(
      id.slice(4, id.length)
    );
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    users[currentUser].favorites.splice(recipe_index, 1);
  }
  localStorage.setItem("MyUsers", JSON.stringify(users));
}
