const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

let url = "/food-recipes-website/";

if (recipeId == null) {
    document.body.innerHTML = 
    `<h1>Error: No recipe ID provided</h1>
    <p>Example: <code>recipe.html?id=1</code></p>`;
}
else{ 
fetch(`${path}+data/recipes.json`)
    .then(response => response.json())
    .then(data => {
        if (!data[recipeId]) {
            document.body.innerHTML = `<h1>Recipe not found</h1>
                                    <p>No recipe with ID <strong>${recipeId}</strong> exists.</p>`;
        }

        document.getElementById('image').innerHTML = 
        `<img src="./images/image${recipeId}.jpg" alt="Image of ${data[recipeId].name}" class="cover-image" width=200x height=auto>`;

        document.getElementsByTagName('title')[0].innerHTML = `${data[recipeId].name}`;
        
        document.getElementById('article-title').innerHTML = `<h1>${data[recipeId].name}</h1>`;

        document.getElementById('description').innerHTML = 
        `<h1>Description</h1><hr>
        <p>${data[recipeId].description}</p>`;
    
        let ingredientsText = `<h1>Ingredients</h1><hr><ul>`;
        let ingredients = data[recipeId].ingredients;
        for (let i = 0; i < ingredients.length; i++)
        {
            ingredientsText += '<li>' + ingredients[i] + '</li>';
        }
        ingredientsText += '</ul>';
        document.getElementById('ingredients').innerHTML = ingredientsText;

        document.getElementById('method').innerHTML = 
        `<h1>Method</h1><hr>
        <p>${data[recipeId].method}</p>`;
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
}

