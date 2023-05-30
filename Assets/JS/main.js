
 // Modal steps
 const modalSteps = [
    {
        title: "Let's get started!",
        content: `
            <p>First, we'll do some quick calculations</p>
        `
    },
    {
        title: "Goals",
        content: `
            <h2>What are your goals?</h2>
            <div class="input-group mb-3">
                <select class="form-select input-group-sm" id="goalInput">
                  <option selected>Select Goal</option>
                  <option value="1">Lose Weight</option>
                  <option value="2">Maintain Weight</option>
                  <option value="3">Gain Weight</option>
                </select>
          </div>
        `
    },
    {
        title: "Age",
        content: `
            <h2>What is your age?</h2>
            <input id="ageInput" type="number" class="form-control">
        `
    },
    {
        title: "Gender",
        content: `
            <h2>What is your gender?</h2>
            <div class="input-group mb-3">
                <select class="form-select input-group-sm" id="genderInput">
                  <option selected>Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
            </div>
        `
    },
    {
        title: "Weight",
        content: `
            <h2>What is your current weight?</h2>
            <input id="weightInput" type="number" class="form-control">
        `
    },
    {
        title: "Height",
        content: `
            <h2>What is your current height?</h2>
            <input id="weightInput" type="number" class="form-control">
        `
    },
    {
        title: "Activity Level",
        content: `
            <h2>What is your current activity level?</h2>
            <div class="input-group mb-3">
                <select class="form-select input-group-sm" id="activityLevelInput">
                  <option selected>Select Activity Level</option>
                  <option value="1">Sedentary: little or no exercise</option>
                  <option value="2">Exercise 1-3 times/week</option>
                  <option value="3">Exercise 4-5 times/week</option>
                  <option value="4">Daily exercise or intense exercise 3-4 times/week</option>
                  <option value="5">Intense exercise 6-7 times/week</option>
                  <option value="6">Very intense exercise daily, or physical job</option>
                </select>
          </div>
        `
    }
];

let currentStep = 0;

// Function to show the modal with the given title and content
function showModal(title, content) {
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    modalTitle.textContent = title;
    modalBody.innerHTML = content;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById("modalContainer"));
    modal.show();
}

// Function to show the current step
function showCurrentStep() {
    const step = modalSteps[currentStep];
    showModal(step.title, step.content);
}

// Function to handle the "Next" button click
function handleNextBtnClick() {
    currentStep++;
    if (currentStep >= modalSteps.length) {
        // Reached the last step
        // Perform any necessary actions or submit the form
        console.log("Reached the last step. Submitting the form...");
       // Hide the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalContainer"));
        modal.hide();
    } else {
        showCurrentStep();
    }
}

// Function to handle the "Back" button click
function handleBackBtnClick() {
    currentStep--;
    if (currentStep < 0) {
        // Reached the first step
        // Perform any necessary actions or go back to the previous page
        console.log("Reached the first step. Going back...");

        // Hide the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalContainer"));
        modal.hide();
    } else {
        showCurrentStep();
    }
}

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
}

var modalSubmit = document.getElementById("modalContainer");

modalSubmit.addEventListener("shown.bs.modal", function() {
  submitForm();
}); 

// Add event listeners to the "Next" and "Back" buttons
const nextBtn = document.getElementById("modalNextBtn");
nextBtn.addEventListener("click", handleNextBtnClick);

const backBtn = document.getElementById("modalBackBtn");
backBtn.addEventListener("click", handleBackBtnClick);


// Show the first step
const modalBtn = document.getElementById("modalBtn");
modalBtn.addEventListener('click', showCurrentStep);

var appId = '7a627b23';
var appKey = 'acf228ccc0e17cf14f56e3a37dc64431';
var foodQuery = 'chicken';
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

// var recipeUrlExample = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7a627b23&app_key=acf228ccc0e17cf14f56e3a37dc64431&diet=balanced&diet=high-fiber&diet=high-protein&health=crustacean-free&health=dairy-free&cuisineType=American&cuisineType=Asian&cuisineType=British&mealType=Dinner&mealType=Lunch&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&calories=100-700&glycemicIndex=55-70&excluded=mushrooms%2C%20cabbage`;

var listOfRecipes = document.getElementById('accordionPanelsStayOpenExample');

function ProcessArrayQuery(array, query) {
    let newUrl = '';
    for (let i = 0; i < array.length; i++) {
        var element = array[i];
        element = element.trim();
        element = element.replaceAll(' ', '%20');
        newUrl = newUrl.concat('&', query, '=', element);
        console.log(newUrl);
        
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
                    <p class="card-text is-size-6"><strong>Calories:</strong> ${calorieCount}</p>
                    <p class="card-text is-size-6"><strong>Protein:</strong> ${protienCount}</p>
                    <p class="card-text is-size-6"><strong>Carbs:</strong> ${carbCount}</p>
                    <p class="card-text is-size-6"><strong>Fat:</strong> ${fatCount}</p>
                    <p class="card-text is-size-6"><strong>Servings:</strong> ${servings}</p>
                </div>
                <img class="food-image" src="${foodImage}" style="width: 200px; height: 200px; padding: 10px;">
                <span class="is-size-6"><small>${ingredientList.innerHTML}</small></span>
                <a class="is-size-6" href="${recipeLocationUrl}" target="_blank"><small>${recipeLocationUrl}</small></a>
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
