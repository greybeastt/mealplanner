const mealColumn = document.querySelector(".meal-row");

const generateButton = document.getElementById("generateButton");

function createMealItem(recipe) {
  const mealItem = document.createElement("div");
  mealItem.classList.add("meal-item");

  const image = document.createElement("img");
  image.src = "https://images.eatthismuch.com/" + recipe.default_image[0].image;
  image.alt = recipe.food_name;

  const mealDetails = document.createElement("div");
  mealDetails.classList.add("meal-details");

  const mealTitle = document.createElement("h4");
  mealTitle.textContent = recipe.food_name;

  const mealQuantity = document.createElement("p");
  mealQuantity.textContent = `${recipe.number_servings} Serving`;

  mealDetails.appendChild(mealTitle);
  mealDetails.appendChild(mealQuantity);

  mealItem.appendChild(image);
  mealItem.appendChild(mealDetails);

  return mealItem;
}

const generateBtnHandler = async () => {
  const calories = document.getElementById("cal_input").value || 0;
  const numberOfMeals =
    document.getElementById("num_meals_selector").value || 0;
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/${numberOfMeals}/${calories}`
    );
    console.log(res.status);
    if (!res.ok) {
      alert(res.error);
      return;
    }
    const data = await res.json();
    // TODO: i think there is a better approach but i don't remeber
    mealColumn.innerHTML = "";

    data.forEach((meal) => {
      const mealContainer = document.createElement("div");
      mealContainer.classList.add("meal");
      let total_cal = 0;

      const mealHeader = document.createElement("div");
      mealHeader.classList.add("meal-header");

      const h3_tag = document.createElement("h3");
      h3_tag.innerText = meal.type;

      const p_tag = document.createElement("p");
      mealHeader.appendChild(h3_tag);
      mealHeader.appendChild(p_tag);
      mealContainer.appendChild(mealHeader);

      meal.recipes.forEach((recipe) => {
        total_cal += recipe.calories;
        mealContainer.appendChild(createMealItem(recipe));
      });

      p_tag.innerText = Math.round(total_cal) + " Calories";

      mealColumn.appendChild(mealContainer);
    });
  } catch (err) {
    alert(err);
  }
};

generateButton.addEventListener("click", generateBtnHandler);
