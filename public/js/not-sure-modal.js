// script.js
document.getElementById("openModalButton").onclick = function () {
  document.getElementById("nutritionModal").style.display = "block";
};

document.querySelector(".close").onclick = function () {
  document.getElementById("nutritionModal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("nutritionModal")) {
    document.getElementById("nutritionModal").style.display = "none";
  }
};
document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("openModalButton");
  const nutritionModal = document.getElementById("nutritionModal");
  const closeModal = document.querySelector(".close");
  const calculateButton = document.getElementById("calculateButton");
  const resultDiv = document.getElementById("result");

  openModalButton.addEventListener("click", function () {
    nutritionModal.style.display = "block";
  });

  closeModal.addEventListener("click", function () {
    nutritionModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == nutritionModal) {
      nutritionModal.style.display = "none";
    }
  });

  calculateButton.addEventListener("click", function () {
    const gender = document.querySelector(
      "input[name='gender']:checked"
    )?.value;
    const heightCM = parseFloat(document.getElementById("heightCM").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);

    if (!gender || !heightCM || !weight || !age) {
      resultDiv.innerHTML =
        '<div class="alert alert-danger">Please fill in all fields.</div>';
      return;
    }

    let bmr;
    if (gender === "Male") {
      bmr = 10 * weight + 6.25 * heightCM - 5 * age + 5;
    } else if (gender === "Female") {
      bmr = 10 * weight + 6.25 * heightCM - 5 * age - 161;
    }

    const activityLevel = document.getElementById("activityLevel").value;
    let activityFactor;
    switch (activityLevel) {
      case "Sedentary":
        activityFactor = 1.2;
        break;
      case "Light":
        activityFactor = 1.375;
        break;
      case "Moderate":
        activityFactor = 1.55;
        break;
      case "Active":
        activityFactor = 1.725;
        break;
      case "Very Active":
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.2;
    }

    const dailyCaloricNeeds = bmr * activityFactor;

    resultDiv.innerHTML = `
            <div class="alert alert-success">
                <p>Your BMR is: ${bmr.toFixed(2)} calories/day</p>
                <p>Your daily caloric needs based on activity level (${activityLevel}): ${dailyCaloricNeeds.toFixed(
      2
    )} calories/day</p>
            </div>
        `;
  });
});
