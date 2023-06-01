// Event listener for modal submit button
var modalSubmitEl = document.getElementById("modalSubmit");
modalSubmitEl.addEventListener('click', submitForm);

// Retrieves user input and calculates from fitness calc API
function submitForm() {
    var goal = document.getElementById("goalInput").value;
    var gender = document.getElementById("genderInput").value;
    var activityLevel = document.getElementById("activityLevelInput").value;
    var age = document.getElementById("ageInput").value;
    var weight = document.getElementById("weightInput").value;
    var height = document.getElementById("heightInput").value;

    console.log("Goal:", goal);
    console.log("Gender:", gender);
    console.log("Activity Level:", activityLevel);
    console.log("Age:", age);
    console.log("Weight:", weight);
    console.log("Height:", height);

    calorieData();

    // takes user input and calculates calorie needs
    function calorieData() {
        const url = 'https://fitness-calculator.p.rapidapi.com/dailycalorie?age=' + age + '&gender=' + gender + '&height=' + height + '&weight=' + weight + '&activitylevel=' + activityLevel;
        const options = {
        	method: 'GET',
        	headers: {
        		'X-RapidAPI-Key': '02c9618479msh9539c929eb0c626p1ac9d9jsncd81691d510d',
        		'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        	}
        };
        fetch(url, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.data.BMR);
            console.log(data.data.goals[goal].calory);
        })
    }
}

//variables for Edamam API request
var appId = '7a627b23';
var appKey = 'acf228ccc0e17cf14f56e3a37dc64431';
var foodQuery = 'steak';
var dietQuery = ['high-fiber', 'high-protein'];
var healthQuery = ['crustacean-free', 'dairy-free'];
var cuisineTypeQuery = ['American', 'Asian', 'British'];
var mealTypeQuery = ['Dinner', 'Lunch'];
var dishTypeQuery = ['Main course', 'Salad'];
var calorieQuery = '100-700';
var GIQuery = '';
var excludedQuery = 'mushrooms, cabbage, green beans';

var foodQuery = foodQuery.trim();
    foodQuery = foodQuery.replaceAll(' ', '%20');
    foodQuery = foodQuery.replaceAll(',', '%2');
var dietQueryString = ProcessArrayQuery(dietQuery, 'diet');
var healthQueryString = ProcessArrayQuery(healthQuery, 'health');
var cuisineTypeQueryString = ProcessArrayQuery(cuisineTypeQuery, 'cuisineType');
var mealQueryString = ProcessArrayQuery(mealTypeQuery, 'mealType');
var dishQueryString = ProcessArrayQuery(dishTypeQuery, 'dishType');
var calorieQueryString = ProcessStringQuery(calorieQuery, 'calories');
var GIQueryString = ProcessStringQuery(GIQuery, 'glycemicIndex');
var excludedQueryString = ProcessStringQuery(excludedQuery, 'excluded');

var recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodQuery}&app_id=${appId}&app_key=${appKey}${dietQueryString}${healthQueryString}${cuisineTypeQueryString}${mealQueryString}${dishQueryString}`;

var savedSearch = JSON.parse(localStorage.getItem('savedSearch'));
var listOfRecipes = document.getElementById('list-of-recipes');
//takes user input and changes the format to be usable in API request
function ProcessArrayQuery(array, query) {
    let newUrl = '';
    for (let i = 0; i < array.length; i++) {
        var element = array[i];
        element = element.trim();
        element = element.replaceAll(' ', '%20');
        newUrl = newUrl.concat('&', query, '=', element);        
    }
    return newUrl;
}

function ProcessStringQuery(queryString, query){
    let newString = queryString.trim();
    newString = newString.replaceAll(' ', '%20');
    newString = newString.replaceAll(',', '%2');
    newString = `&${query}=${newString}`;
    return newString;
}
//Edamam API request
function getNutritionAPI(){
    fetch(recipeUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var recipies = data.hits;
            showRecipes(recipies);
        })
}  

//display recipes to user
function showRecipes(recipes){
    for (let i = 0; i < recipes.length; i++) {
        const element = recipes[i];
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
        //set number for each accordion id
        let numberString = convert(i+1);
        let accordionNumber = numberString.charAt(0).toUpperCase() + numberString.slice(1);
        //creation of each accordion item from the API
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
                    <p class="card-text is-size-6 m-2"><strong>Calories:</strong> ${calorieCount}</p>
                    <p class="card-text is-size-6 m-2"><strong>Protein:</strong> ${protienCount}</p>
                    <p class="card-text is-size-6 m-2"><strong>Carbs:</strong> ${carbCount}</p>
                    <p class="card-text is-size-6 m-2"><strong>Fat:</strong> ${fatCount}</p>
                    <p class="card-text is-size-6 m-2"><strong>Servings:</strong> ${servings}</p>
                    <p class="card-text is-size-6 m-2">
                      <button class="card-text is-size-6 add-item">
                        <i class="fa-solid fa-circle-plus fa-lg fa-pull-left icon"></i>
                      Click to add meal</button>
                    </p>
                </div>
                <img class="food-image" src="${foodImage}" style="width: 200px; height: 200px; padding: 10px;">
                <span class="is-size-6"><small>${ingredientList.innerHTML}</small></span>
                <a class="is-size-6" href="${recipeLocationUrl}" target="_blank"><small>${recipeLocationUrl}</small></a>
            </div>
        </div>
        `
        listOfRecipes.appendChild(newRecipeItem);
    }
}
//adding recipes to storage

listOfRecipes.addEventListener('click', function(event){
  event.stopImmediatePropagation();
  
  if(event.target.classList.contains('add-item')){
    let element = event.target;
    let closest = element.closest('.accordion-item');
   
    if (closest){
      saveSearchHistory(closest); 
    }
  }
})
//the savedSearch variable is declared globally and used in this function
function saveSearchHistory(history) {
  let title = history.firstElementChild.textContent;
  if (savedSearch!==null) {
    for(let i=0;i<savedSearch.length;i++){
      if (savedSearch[i].name == title) {
        savedSearch.splice(i,1);
      }
    }
    savedSearch.unshift({
      name: title,
      content: history.innerHTML
    });
    
  } else {
    savedSearch = [];
    savedSearch.unshift({
      name: title,
      content: history.innerHTML
    });
  }
  localStorage.setItem('savedSearch', JSON.stringify(savedSearch));
}

getNutritionAPI();

//code pulled from Stack Overflow to add the numbers into the Bootstrap Accordion in written form instead of numerical
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
