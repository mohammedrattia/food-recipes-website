const params = new URLSearchParams(window.location.search);
const recipeTag = params.get('tag');

let path = "/food-recipes-website/";

fetch(`${path}+data/recipes.json`)
    .then(response => response.json())
    .then(data => {
        let recipesText = ``;
        for (const recipe in data)  
        {
            if (data[recipe].tags.includes(recipeTag) || recipeTag == null || recipeTag == "all")
            {
                recipesText += 
                `<div class="recipe-card">
                    <img src="images/image${recipe}.jpg" alt="${data[recipe].name}">
                    <div>
                        <a href="#" onclick="recipe_request(this.id)" id="${recipe}">
                        <h2>${data[recipe].name}</h2>
                        <p>${data[recipe].description.slice(0, 300)}... <u>Learn more &rarr;</u></p>
                        </a>
                    </div>
                </div>
                `;
            }
        }

        document.getElementsByClassName('recipes')[0].innerHTML = recipesText;

        let tagList = new Set();
        let tags = `<button id="all" onclick="tag_filter(this.id)"><img src="images/plus-solid.svg"> all</button>`;
        for (const recipe in data)  
        {
            for (const tag of data[recipe].tags)
            {
                tagList.add(tag);
            }
        }
        tagList = Array.from(tagList).sort();
        for (const tag of tagList)
        {
            if (tag == recipeTag)
            {
                console.log(tag);
                tags += `
                <button id="all" onclick="tag_filter(this.id)" style="background-color: #b0b0b0;">
                    <img src="images/plus-solid.svg"> ${tag}
                </button>`;
            }
            else tags += `<button id="${tag}" onclick="tag_filter(this.id)"><img src="images/plus-solid.svg"> ${tag}</button>`;
        }

        document.getElementsByClassName('but')[0].innerHTML = tags;
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

// open the recipe
function recipe_request(id) {
    window.location = `./recipe.html?id=${id}`;
};

// filter by tag
function tag_filter(id) {
    window.location = `./recipes.html?tag=${id}`;
};

// filter by search
function search() {
    input = document.getElementById('filter').value.toLowerCase();
    recipes = document.getElementsByClassName('recipe-card');

    for (let i = 0; i < recipes.length; i++)
    {
        recipe = recipes[i].getElementsByTagName('h2')[0].innerText;
        if (recipe.toLowerCase().indexOf(input) != -1)
        {
            recipes[i].style.display = "";
        }
        else
        {
            recipes[i].style.display = "none";
        }
    }
}