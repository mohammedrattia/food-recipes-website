const params = new URLSearchParams(window.location.search);
const recipeTag = params.get('tag');


fetch('../data/recipes.json')
    .then(response => response.json())
    .then(data => {
        let recipesText = ``;
        for (const recipe in data)  
        {
            if (data[recipe].tags.includes(recipeTag) || recipeTag == null || recipeTag == "all")
            {
                recipesText += 
                `<div class="recipe-card" id="${data[recipe].name}">
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