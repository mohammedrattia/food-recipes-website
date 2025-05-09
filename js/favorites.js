const params = new URLSearchParams(window.location.search);
const recipeTag = params.get("tag");
// const recipeFavorite = "favorite";

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  var path = "./";
else var path = "/food-recipes-website/";

fetch(`${path}data/recipes.json`)
  .then((response) => response.json())
  .then((data) => {
    let recipesText = ``;
    for (const recipe in data) {
      if (
        (data[recipe].tags.includes(recipeTag) ||
          recipeTag == null ||
          recipeTag == "all") &&
        data[recipe].tags.includes("favorite")
      ) {
        recipesText += `<div class="recipe-card" onclick="recipe_request(this.id)" id="${recipe}">
                    <img src="images/image${recipe}.jpg" alt="${
          data[recipe].name
        }">
                    <div >
                    <!-- <a href="#" onclick="recipe_request(this.id)" id="${recipe}"> -->
                    <h2>
                    ${data[recipe].name}
                    <!--<i class="fa-solid fa-heart"></i>-->
                    <button class="fav-btn"><i class="fa-regular fa-heart"></i></button>
                    
                    </h2>
                        <p>${data[recipe].description.slice(
                          0,
                          300
                        )}... <u>Learn more &rarr;</u></p>
                    <!-- </a> -->
                    </div>
                </div>
                `;
      }
    }

    document.getElementsByClassName("recipes")[0].innerHTML = recipesText;

    document.querySelectorAll(".fav-btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent triggering the card click
        const recipeId = this.getAttribute("data-recipe");
        const isActive = this.classList.toggle("active");
        const icon = this.querySelector("i");

        // Toggle heart icon
        if (isActive) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
          localStorage.setItem(`fav_${recipeId}`, "true");
        } else {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          localStorage.setItem(`fav_${recipeId}`, "false");
        }

        // Add animation
        this.classList.add("animate");
        setTimeout(() => this.classList.remove("animate"), 500);
      });
    });

    let tagList = new Set();
    let tags = `<button id="all" onclick="tag_filter(this.id)"><img src="images/plus-solid.svg"> all</button>`;
    for (const recipe in data) {
      for (const tag of data[recipe].tags) {
        if (!/favorite/i.test(tag)) {
          tagList.add(tag);
        }
      }
    }
    tagList = Array.from(tagList).sort();
    for (const tag of tagList) {
      if (tag == recipeTag) {
        console.log(tag);
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
}

// filter by tag
function tag_filter(id) {
  window.location = `./favorites.html?tag=${id}`;
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
// add footer and navbar
fetch('navbar.html')
.then(res => res.text())
.then(data => {
  document.getElementById('navbar-placeholder').innerHTML = data;
});

// Load Footer
fetch('footer.html')
.then(res => res.text())
.then(data => {
  document.getElementById('footer-placeholder').innerHTML = data;
});