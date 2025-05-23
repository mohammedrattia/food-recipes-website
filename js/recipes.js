let users = JSON.parse(localStorage.getItem("MyUsers")) || {};
let currentUser = localStorage.getItem("currentUser") || "";
// get the tag from the url
const params = new URLSearchParams(window.location.search);
const recipeTag = params.get("tag");

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  var path = "./";
else var path = "/food-recipes-website/";

fetch(`${path}data/recipes.json`)
  .then((response) => response.json())
  .then((data) => {
    // recipe cards
    let recipesText = ``;
    for (const recipe in data) {
      if (
        data[recipe].tags.includes(recipeTag) ||
        recipeTag == null ||
        recipeTag == "all"
      ) {
        if (
          users.hasOwnProperty(currentUser) &&
          users[currentUser].favorites.includes(recipe)
        ) {
          var isFav = "fa-solid";
          var isActive = "active";
        } else {
          var isFav = "fa-regular";
          var isActive = "";
        }
        recipesText += `
        <div class="recipe-card" onclick="recipe_request(this.id, event)" id="${recipe}">
        <img src="images/image${recipe}.jpg" alt="${data[recipe].name}" >
                  <button onclick="fav_button(this.id)" class="fav-btn ${isActive}" id="fav_${recipe}"><i class="${isFav} fa-heart"></i></button>
                  <div >
                    <h2>
                    ${data[recipe].name}
                    </h2>
                        <p>${data[recipe].description.slice(
                          0,
                          300
                        )}... <u>Learn more &rarr;</u></p>
                  </div>
                </div>
                `;
      }
    }
    document.getElementsByClassName("recipes")[0].innerHTML = recipesText;

    let tagList = new Set();
    for (const recipe in data) {
      for (const tag of data[recipe].tags) {
          tagList.add(tag);
      }
    }
    tagList = Array.from(tagList).sort();

    let tags = `<button id="all" onclick="tag_filter(this.id)" style="${
      !recipeTag || recipeTag === "all"
        ? "background-color: var(--textColor-1); color: var(--white);"
        : ""
    }"><i class="fa-solid fa-plus"></i> all</button>`;
    for (const tag of tagList) {
      if (tag == recipeTag) {
        tags += `
                <button id="${tag}" onclick="tag_filter(this.id)" style="background-color: var(--textColor-1); color: var(--white);">
                    <i class="fa-solid fa-plus"></i> ${tag}
                </button>`;
      } else
        tags += `<button id="${tag}" onclick="tag_filter(this.id)"><i class="fa-solid fa-plus"></i> ${tag}</button>`;
    }

    document.getElementsByClassName("but")[0].innerHTML = tags;
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

// open the recipe
function recipe_request(id, event) {
  if (event.target.closest('.fav-btn') || event.target.classList.contains('fa-heart')) {
    return; // Exit if we click the heart
  }
  window.location = `./recipe.html?id=${id}`;
}

// filter by tag
function tag_filter(id) {
  window.location = `./recipes.html?tag=${id}`;
}

// filter by search
function search() {
  input = document.getElementById("filter").value.toLowerCase();
  recipes = document.getElementsByClassName("recipe-card");

  for (let i = 0; i < recipes.length; i++) {
    recipe = recipes[i].getElementsByTagName("h2")[0].innerText;
    if (recipe.toLowerCase().indexOf(input) != -1) {
      recipes[i].style.display = "";
    } else {
      recipes[i].style.display = "none";
    }
  }
}

function fav_button(id) {
  let btn = document.getElementById(id);
  if (!makeFavorite()) return;
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

function makeFavorite() {
  let currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("MyUsers"));

  if (users.hasOwnProperty(currentUser) && currentUser) {
    return true;
  } else {
    window.location = `./login.html`;
    return false;
  }
}
