// get the tag from the url
const params = new URLSearchParams(window.location.search);
const recipeTag = params.get("tag");

<<<<<<< HEAD
let path = "./";
=======
if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  var path = "./";
else var path = "/food-recipes-website/";
>>>>>>> a9f0c54cab5bf0e233f3404f83619970cc178ab3

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
        recipesText += `
                <div class="recipe-card"  id="${recipe}">
                    <img src="images/image${recipe}.jpg" alt="${
          data[recipe].name
        }">
                    <button onclick="fav_button(this.id)" class="fav-btn" id="fav_${recipe}"><i class="fa-regular fa-heart"></i></button>
                    <div onclick="recipe_request(this.id)" id="${recipe}">
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
        if (!/favorite/i.test(tag)) {
          tagList.add(tag);
        }
      }
    }
    tagList = Array.from(tagList).sort();

    let tags = `<button id="all" onclick="tag_filter(this.id)"><img src="images/plus-solid.svg"> all</button>`;
    for (const tag of tagList) {
      if (tag == recipeTag) {
        tags += `
                <button id="all" onclick="tag_filter(this.id)" style="background-color: #b0b0b0;">
                    <img src="images/plus-solid.svg"> ${tag}
                </button>`;
      } else
        tags += `<button id="${tag}" onclick="tag_filter(this.id)"><img src="images/plus-solid.svg"> ${tag}</button>`;
    }

    document.getElementsByClassName("but")[0].innerHTML = tags;
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

// open the recipe
function recipe_request(id) {
  window.location = `./recipe.html?id=${id}`;
  window.innerHeight = 500;
  window.innerWidth = 500;
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
  // Load cached modifications from localStorage
  // const cachedRecipes = JSON.parse(localStorage.getItem("cachedRecipes")) || {};

  let btn_id = document.getElementById(id);
  const isActive = btn_id.classList.toggle("active");
  const icon = btn_id.querySelector("i");

  // Toggle heart icon
  if (isActive) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");

    // add to local storage
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    // remove from local storage
  }

  // Add animation
  this.classList.add("animate");
  setTimeout(() => this.classList.remove("animate"), 500);

  // Save back to localStorage
  // localStorage.setItem("cachedRecipes", JSON.stringify(cachedRecipes));
}
