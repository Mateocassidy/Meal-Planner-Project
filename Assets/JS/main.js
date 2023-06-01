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
          <div class="container">
              <button class="btn button-forward lose">Lose Weight</button>
              <button class="btn button-forward maintain">Maintain Weight</button>
              <button class="btn button-forward gain">Gain Weight</button>
          </div>
      `
  },
  {
      title: "Age",
      content: `
          <h2>What is your age?</h2>
          <input type="number" class="form-control">
      `
  },
  {
      title: "Gender",
      content: `
          <h2>What is your gender?</h2>
          <div class="container">
              <button class="btn button-forward">Male</button>
              <button class="btn button-forward">Female</button>
          </div>
      `
  },
  {
      title: "Weight",
      content: `
          <h2>What is your current weight?</h2>
          <input type="number" class="form-control">
      `
  },
  {
      title: "Height",
      content: `
          <h2>What is your current height?</h2>
          <input type="number" class="form-control">
      `
  },
  {
      title: "Activity Level",
      content: `
          <h2>What is your current activity level?</h2>
          <div class="container row justify-content-center">
              <button class="btn button-forward col-10 m-2">Sedentary: little or no exercise</button>
              <button class="btn button-forward col-10 m-2">Exercise 1-3 times/week</button>
              <button class="btn button-forward col-10 m-2">Exercise 4-5 times/week</button>
              <button class="btn button-forward col-10 m-2">Daily exercise or intense exercise 3-4 times/week</button>
              <button class="btn button-forward col-10 m-2">Intense exercise 6-7 times/week</button>
              <button class="btn button-forward col-10 m-2">Very intense exercise daily, or physical job</button>
          </div>
      `
  }
];

var currentStep = 0;

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

// Add event listeners to the "Next" and "Back" buttons
const nextBtn = document.getElementById("modalNextBtn");
nextBtn.addEventListener("click", handleNextBtnClick);

const backBtn = document.getElementById("modalBackBtn");
backBtn.addEventListener("click", handleBackBtnClick);

function mealsModal() {
const mealQueryModal = new bootstrap.Modal(document.getElementById("mealModal"));
mealQueryModal.show();
}

var mealSearchButton = document.getElementById('meal-search-button');
mealSearchButton.addEventListener('click', function(event){
event.stopPropagation();

mealsModal();
});

var getReadyButton = document.getElementById('get-ready-button');
getReadyButton.addEventListener('click', function(event){
event.stopPropagation();

currentStep = 0;
// Show the first step
showCurrentStep();
});

var mealQuerySubmit = document.getElementById('meal-query-submit');
mealQuerySubmit.addEventListener('click', function(event){
event.preventDefault();
processQuery();
});


//variables for Edamam API request
//variables for Edamam API request
var appId = '7a627b23';
var appKey = 'acf228ccc0e17cf14f56e3a37dc64431';
var foodQuery = '';
var dietQuery = [];
var healthQuery = [];
var cuisineTypeQuery = [];
var mealTypeQuery = [];
var dishTypeQuery = [];
var calorieQuery = '';
var calorieQuery1 = '';
var calorieQuery2 = '';
var GIQuery = '';
var excludedQuery = '';
var recipeUrl;
var dietQueryString



function processQuery() {
foodQuery = document.getElementById('food-query').value;
dietQuery = document.getElementById('diet-query');
healthQuery = document.getElementById('health-query');
cuisineTypeQuery = document.getElementById('cuisine-query');
mealTypeQuery = document.getElementById('meal-type-query');
dishTypeQuery = document.getElementById('dish-query');
calorieQuery1 = document.getElementById('calorie-query-1').value;
calorieQuery2 = document.getElementById('calorie-query-2').value;
excludedQuery = document.getElementById('excluded-query').value;
if (parseInt(calorieQuery1) > parseInt(calorieQuery2)) {
  console.log('oops');
  let temp = calorieQuery2;
  calorieQuery2 = calorieQuery1;
  calorieQuery1 = temp;    
};

var calorieQueryString = `&calories=${calorieQuery1}-${calorieQuery2}`;
var foodQuery = foodQuery.trim();
  foodQuery = foodQuery.replaceAll(' ', '%20');
  foodQuery = foodQuery.replaceAll(',', '%2');
var dietQueryString = ProcessQueryInput(dietQuery, 'diet');
var healthQueryString = ProcessQueryInput(healthQuery, 'health');
var cuisineTypeQueryString = ProcessQueryInput(cuisineTypeQuery, 'cuisineType');
var mealQueryString = ProcessQueryInput(mealTypeQuery, 'mealType');
var dishQueryString = ProcessQueryInput(dishTypeQuery, 'dishType');
// var GIQueryString = ProcessStringQuery(GIQuery, 'glycemicIndex');
var excludedQueryString = ProcessStringQuery(excludedQuery, 'excluded');

recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodQuery}&app_id=${appId}&app_key=${appKey}${dietQueryString}${healthQueryString}${cuisineTypeQueryString}${mealQueryString}${dishQueryString}${calorieQueryString}${excludedQueryString}`;
getNutritionAPI();
};


var savedSearch = JSON.parse(localStorage.getItem('savedSearch'));
var currentSessionMeals = JSON.parse(sessionStorage.getItem('sessionMeals'));
var listOfRecipes = document.getElementById('list-of-recipes');
var listOfMeals = document.getElementById('list-of-meals');
var currentItemView = document.getElementById('current-item-container');
var totalCalories = document.getElementById('total-calories');
var calorieGoal = document.getElementById('calorie-goal').innerHTML;
var totalCalorieCount = 0;
totalCalories.innerText = totalCalorieCount;
//takes user input and changes the format to be usable in API request
function ProcessQueryInput(queryElement, query) {
let newUrl = '';

for (let i = 0; i < queryElement.length; i++) {
    var element = queryElement[i];
    let elementString ='';
    
    if (element.selected && element.innerText!=='--none--') {
      elementString = element.innerText;
      newUrl = newUrl.replaceAll(' ', '%20');
      newUrl = newUrl.replaceAll(',', '%2');
      newUrl = newUrl.concat('&', query, '=', elementString);
    };
};
return newUrl;
};

function ProcessStringQuery(queryString, query){
  if (queryString!=='') {
    let newString = queryString.trim();
    newString = newString.replaceAll(' ', '%20');
    newString = newString.replaceAll(',', '%2');
    newString = `&${query}=${newString}`;
    return newString;
  } else {
    return queryString;
  };
  
};
//Edamam API request
function getNutritionAPI(){
  fetch(recipeUrl)
      .then(function(response){
          return response.json();
      })
      .then(function(data){
          var recipies = data.hits;
          showRecipes(recipies);
      });
};

//display recipes to user
function showRecipes(recipes){
try {
  while (listOfRecipes.hasChildNodes) {
    listOfRecipes.removeChild(listOfRecipes.firstChild);
};
} catch (error) {
  
};
  
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
      newRecipeItem.style.borderRadius="14px";
      newRecipeItem.innerHTML = `
      <h2 class="accordion-header rounded-pill light-mode-text" id="recipeCard ${i+1}">
          <button class="accordion-button collapsed header-buttons" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${accordionNumber}" aria-expanded="false" aria-controls="panelsStayOpen-collapse${accordionNumber}" style="border-radius:14px !important;">
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
    addCurrentMeal(closest);
  };
};
});
//the savedSearch variable is declared globally and used in this function
function saveSearchHistory(history) {
console.log(history);
let calorieText = history.children[1].children[0].children[0].children[0].innerText;
let proteinText = history.children[1].children[0].children[0].children[1].innerText.substr(9);
let carbsText = history.children[1].children[0].children[0].children[2].innerText.substr(7);
let fatText = history.children[1].children[0].children[0].children[3].innerText.substr(5);
let servingsText = history.children[1].children[0].children[0].children[4].innerText.substr(10);
let image = history.children[1].children[0].children[1].src;
let ingredientText = history.children[1].children[0].children[2].innerHTML;
let linkText = history.children[1].children[0].children[3].innerHTML;
let calorieNum = Number.parseInt(calorieText.substr(10));
let title = history.firstElementChild.textContent;
if (savedSearch!==null) {
  for(let i=0;i<savedSearch.length;i++){
    if (savedSearch[i].name == title) {
      savedSearch.splice(i,1);
    };
  };
  savedSearch.unshift({
    name: title,
    content: history.innerHTML,
    calories: calorieNum,
    protein: proteinText,
    carbs: carbsText,
    fat: fatText,
    servings: servingsText,
    image: image,
    ingredients: ingredientText,
    link: linkText
  });
  
} else {
  savedSearch = [];
  savedSearch.unshift({
    name: title,
    content: history.innerHTML,
    calories: calorieNum,
    protein: proteinText,
    carbs: carbsText,
    fat: fatText,
    servings: servingsText,
    image: image,
    ingredients: ingredientText,
    link: linkText
  });
};
localStorage.setItem('savedSearch', JSON.stringify(savedSearch));
};
//add selection to side
function addCurrentMeal(current) {
let title = current.firstElementChild.textContent;
let calorieText = current.children[1].children[0].children[0].children[0].innerText;
let calorieNum = Number.parseInt(calorieText.substr(10));

if (currentSessionMeals!==null) {
  
  for (let i = 0; i < currentSessionMeals.length; i++) {
    if (currentSessionMeals[i].name == title) {
      currentSessionMeals.splice(i,1);
    } else {
      
    };
  };
  currentSessionMeals.unshift({
    name: title,
    content: current.innerHTML,
    calories: calorieNum
  });
  
} else {
  // totalCalorieCount = totalCalorieCount + calorieNum;
  // totalCalories.innerText = totalCalorieCount;
  currentSessionMeals = [];
  currentSessionMeals.unshift({
    name: title,
    content: current.innerHTML,
    calories: calorieNum
  });
}
sessionStorage.setItem('sessionMeals', JSON.stringify(currentSessionMeals));
displayCurrentMeals();
}
//display side container and update calorie count
function displayCurrentMeals() {
try {
    while (listOfMeals.hasChildNodes) {
        listOfMeals.removeChild(listOfMeals.firstChild);
    };
} catch (error) {
  
};

totalCalorieCount = 0;
var currentSessionMeals = JSON.parse(sessionStorage.getItem('sessionMeals'));

if (currentSessionMeals.length === 0) {
  totalCalories.innerText = 0;
}
for (let i = 0; i < currentSessionMeals.length; i++) {
  var element = currentSessionMeals[i];
  var currentMealItem = document.createElement('li');
      currentMealItem.classList.add('list-group-item', 'list-group-item-action', 'header-buttons', 'is-12', 'col-12', 'current-meal-item');
      currentMealItem.innerHTML = element.name;
  let calorieNum = Number.parseInt(element.calories);
      totalCalorieCount = totalCalorieCount + calorieNum;
      totalCalories.innerText = totalCalorieCount;
  listOfMeals.appendChild(currentMealItem);
};
if (parseInt(totalCalorieCount)>=(parseInt(calorieGoal)+500)) {
  
  totalCalories.style.backgroundColor = "#FF0907";
} else if (parseInt(totalCalorieCount)<=(parseInt(calorieGoal)-500)){
  totalCalories.style.backgroundColor = '#F4C903';
  
} else {
  
  totalCalories.style.backgroundColor = '#065B00';
  totalCalories.style.color = "white";
}
};
//remove items from side
listOfMeals.addEventListener('click', function(event){
event.preventDefault();
if (event.target.tagName == 'LI') {
  let viewItem = event.target;
  viewCurrentItem(viewItem);
};
});

function viewCurrentItem(viewItem) {
for (let i = 0; i < savedSearch.length; i++) {
  var element = savedSearch[i];
  if (element.name.trim() == viewItem.innerText.trim()) {
    displayCurrentItem(element);
  } else {
  };
};
};

function displayCurrentItem(current) {
let itemName = current.name;
let calorieCount = current.calories;
let protienCount = current.protein;
let carbCount = current.carbs;
let fatCount = current.fat;
let servings = current.servings;
let foodImage = current.image;
let ingredientList = current.ingredients;
let recipeLocationUrl = current.link;
let currentItemTitle = document.createElement('h3');
currentItemTitle.classList.add('is-size-6');
currentItemTitle.style.fontWeight='700';
currentItemTitle.style.color='white';
currentItemTitle.style.textShadow='2px 2px black';
currentItemTitle.innerHTML = itemName;
let currentItemCard = document.createElement('div');
currentItemCard.classList.add('card', 'position-relative', 'current-item');
currentItemCard.innerHTML = `  
        <div class="position-absolute top-10 start-50 macro-bg" style="width: 50%; opacity: 0.9;">
            <p class="card-text is-size-7 m-2"><strong>Calories:</strong> ${calorieCount}</p>
            <p class="card-text is-size-7 m-2"><strong>Protein:</strong> ${protienCount}</p>
            <p class="card-text is-size-7 m-2"><strong>Carbs:</strong> ${carbCount}</p>
            <p class="card-text is-size-7 m-2"><strong>Fat:</strong> ${fatCount}</p>
            <p class="card-text is-size-7 m-2"><strong>Servings:</strong> ${servings}</p>
            <p class="card-text is-size-7 m-2">
              <button class="card-text is-size-7 remove-item" style="background-color: hsl(120, 100%, 50%, 0.0)">
                <i class="fa-solid fa-circle-minus fa-lg fa-pull-left icon"></i>
              Click to remove from list</button>
            </p>
        </div>
        <img class="food-image" src="${foodImage}" style="width: 150px; height: 150px; padding: 10px;">
        <span class="is-size-6 m-2"><small>${ingredientList}</small></span>
        <a class="is-size-6" href="${recipeLocationUrl}" target="_blank"><small>${recipeLocationUrl}</small></a>    
`
try {
  while (currentItemView.hasChildNodes) {
    currentItemView.removeChild(currentItemView.firstChild);
  };
  
} catch (error) {
  
};
currentItemView.appendChild(currentItemTitle);
currentItemView.appendChild(currentItemCard);
};

function removeCurrentItem(removeItem) {

for (let i = 0; i < currentSessionMeals.length; i++) {
  var element = currentSessionMeals[i];

  if (element.name.trim() == removeItem.innerText.trim()) {
    currentSessionMeals.splice(i, 1);
    
    try {
      while (currentItemView.hasChildNodes) {
        currentItemView.removeChild(currentItemView.firstChild);
      };
    } catch (error) {
      
    };
    
  } else{
  };
};
sessionStorage.setItem('sessionMeals', JSON.stringify(currentSessionMeals));
displayCurrentMeals();
};

try {
displayCurrentMeals();
} catch (error) {

};

currentItemView.addEventListener('click', function(event){
event.stopImmediatePropagation();

if(event.target.classList.contains('remove-item')){
  
  let element = event.target;
  let closest = element.closest('.current-item');
  let title = closest.previousSibling;
 
  if (title){
    removeCurrentItem(title);
  };
};
});


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
