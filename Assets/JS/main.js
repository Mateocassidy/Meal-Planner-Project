var recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=bacon&app_id=7a627b23&app_key=acf228ccc0e17cf14f56e3a37dc64431&diet=balanced&health=alcohol-free&cuisineType=American&mealType=Dinner&dishType=Main%20course&calories=100-1000`
var listOfRecipes = document.getElementById('accordionPanelsStayOpenExample');

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
    for (let i = 0; i < recipes.length; i++) {
        const element = recipes[i];
        console.log(element);
        let recipeName = element.recipe.label;
        let servings = element.recipe.yield;
        let ingredientListData = element.recipe.ingredientLines;
        let foodImage = element.recipe.images.SMALL.url;
        let recipeLocationUrl = element.recipe.url; 
        let calorieCount = Math.trunc((element.recipe.calories)/servings);
        let protienCount = `${Math.trunc((element.recipe.totalNutrients.PROCNT.quantity)/servings)}${element.recipe.totalNutrients.PROCNT.unit}`;
        let carbCount = `${Math.trunc((element.recipe.totalNutrients.CHOCDF.quantity)/servings)}${element.recipe.totalNutrients.CHOCDF.unit}`;
        let fatCount = `${Math.trunc((element.recipe.totalNutrients.FAT.quantity)/servings)}${element.recipe.totalNutrients.FAT.unit}`;
        var ingredientList = document.createElement('ol');

        for (let j = 0; j < ingredientListData.length; j++) {
            const listEl = ingredientListData[j];
            let newIngredient = document.createElement('li');
            newIngredient.textContent = listEl;
            ingredientList.append(newIngredient);
        };

        let numberString = convert(i+1);
        let accordionNumber = numberString.charAt(0).toUpperCase() + numberString.slice(1);

        var newRecipeItem = document.createElement('div');
        newRecipeItem.classList.add('accordion-item');
        newRecipeItem.innerHTML = `
        <h2 class="accordion-header rounded-pill" id="recipeCard ${i+1}">
            <button class="accordion-button collapsed header-buttons" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${accordionNumber}" aria-expanded="false" aria-controls="panelsStayOpen-collapse${accordionNumber}">
            ${recipeName}
            </button>
        </h2>
        <div id="panelsStayOpen-collapse${accordionNumber}" class="accordion-collapse collapse">
            <div class="accordion-body position-relative">
                <div class="position-absolute top-10 start-50 macro-bg" style="width: 50%;">
                    <p class="card-text"><strong>Calories:</strong> ${calorieCount}</p>
                    <p class="card-text"><strong>Protein:</strong> ${protienCount}</p>
                    <p class="card-text"><strong>Carbs:</strong> ${carbCount}</p>
                    <p class="card-text"><strong>Fat:</strong> ${fatCount}</p>
                    <p class="card-text"><strong>Servings:</strong> ${servings}</p>
                </div>
                <img src="${foodImage}" style="width: 200px; height: 200px; padding: 10px;">
                <span><small>${ingredientList.innerHTML}</small></span>
                <a href="${recipeLocationUrl}" target="_blank"><small>${recipeLocationUrl}</small></a>
            </div>
        </div>
        `
        console.log(ingredientList);
        listOfRecipes.appendChild(newRecipeItem);
        

    }
}



getNutritionAPI();

//code pulled from Stack Overflow to add the numbers into the Bootstrap Accordion correctly
var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function convert_millions(num) {
  if (num >= 1000000) {
    return convert_millions(Math.floor(num / 1000000)) + " million " + convert_thousands(num % 1000000);
  } else {
    return convert_thousands(num);
  }
}

function convert_thousands(num) {
  if (num >= 1000) {
    return convert_hundreds(Math.floor(num / 1000)) + " thousand " + convert_hundreds(num % 1000);
  } else {
    return convert_hundreds(num);
  }
}

function convert_hundreds(num) {
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
  } else {
    return convert_tens(num);
  }
}

function convert_tens(num) {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}

function convert(num) {
  if (num == 0) return "zero";
  else return convert_millions(num);
}

// `
//     <div class="accordion-item">
//         <h2 class="accordion-header" id="recipeCard${i}">
//             <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
//             ${recipeName}
//             </button>
//         </h2>
//         <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
//             <div class="accordion-body">
//                 <img src="${foodImage}" style="width: 200px; height: 200px;">
//                 <p class="card-text">Calories: ${calorieCount}</p>
//                 <span><small>${ingredientList.innerHTML}</small></span>
//                 <a href="${recipeLocationUrl}"><small>${recipeLocationUrl}</small></a>
//             </div>
//         </div>
//     </div>
//     </div>
//     `

//     `<div class="card m-4 border border-info rounded-lg shadow-md" style="width: 30rem;">
//     <div class="card-header bg-info">
//         <h5 class="card-title">${recipeName}</h5>
//     </div>
//     <div class="card-body" id="recipeCard${i}">
//         <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
//         <img src="${foodImage}" style="width: 200px; height: 200px;">
//         <p class="card-text">Calories: ${calorieCount}</p>
//         <span><small>${ingredientList.innerHTML}</small></span>
//         <a href="${recipeLocationUrl}"><small>${recipeLocationUrl}</small></a>
//     </div>
// </div>`