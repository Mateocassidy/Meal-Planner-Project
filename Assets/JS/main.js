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
            <div class="btn-group-vertical">
                <button class="btn btn-primary">Lose Weight</button>
                <button class="btn btn-primary">Maintain Weight</button>
                <button class="btn btn-primary">Gain Weight</button>
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
            <div class="btn-group-vertical">
                <button class="btn btn-primary">Male</button>
                <button class="btn btn-primary">Female</button>
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
            <div class="btn-group-vertical">
                <button class="btn btn-primary">Sedentary: little or no exercise</button>
                <button class="btn btn-primary">Exercise 1-3 times/week</button>
                <button class="btn btn-primary">Exercise 4-5 times/week</button>
                <button class="btn btn-primary">Daily exercise or intense exercise 3-4 times/week</button>
                <button class="btn btn-primary">Intense exercise 6-7 times/week</button>
                <button class="btn btn-primary">Very intense exercise daily, or physical job</button>
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

// Add event listeners to the "Next" and "Back" buttons
const nextBtn = document.getElementById("modalNextBtn");
nextBtn.addEventListener("click", handleNextBtnClick);

const backBtn = document.getElementById("modalBackBtn");
backBtn.addEventListener("click", handleBackBtnClick);

// Show the first step
showCurrentStep();