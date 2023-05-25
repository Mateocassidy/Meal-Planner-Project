var recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7a627b23&app_key=acf228ccc0e17cf14f56e3a37dc64431&diet=balanced&health=alcohol-free&cuisineType=American&mealType=Dinner&dishType=Main%20course&calories=100-1000`
var containerDiv = document.getElementById('containerDiv');

function getNutritionAPI(){
    fetch(recipeUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var recipies = data.hits;
            console.log(data);
            showRecipes(recipies);
        })
}  


function showRecipes(recipes){
    for (let i = 0; i < 4; i++) {
        const element = recipes[i];
        console.log(element);
        let recipeName = element.recipe.label;
        let calorieCount = Math.trunc(element.recipe.calories);
        let ingredientListData = element.recipe.ingredientLines;
        let foodImage = element.recipe.images.SMALL.url;
        let recipeLocationUrl = element.recipe.url;

        var ingredientList = document.createElement('ol');
        for (let j = 0; j < ingredientListData.length; j++) {
            const listEl = ingredientListData[j];
            let newIngredient = document.createElement('li');
            newIngredient.innerHTML = listEl;
            ingredientList.append(newIngredient);
        };

        var newCard = document.createElement('div');
        newCard.innerHTML = `
        <div class="card m-4 border border-info rounded-lg shadow-md" style="width: 30rem;">
            <div class="card-header bg-info">
                <h5 class="card-title">${recipeName}</h5>
            </div>
            <div class="card-body" id="recipeCard${i}">
                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                <img src="${foodImage}" style="width: 200px; height: 200px;">
                <p class="card-text">Calories: ${calorieCount}</p>
                <span><small>${ingredientList.innerHTML}</small></span>
                <a href="${recipeLocationUrl}"><small>${recipeLocationUrl}</small></a>
            </div>
        </div>`
        console.log(ingredientList);
        containerDiv.appendChild(newCard);
        

    }
}



getNutritionAPI();