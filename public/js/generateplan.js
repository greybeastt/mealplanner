const mealColumn = document.querySelector(".meal-row");

// Get modal element
const modal = document.querySelector(".modal");

// Function to show modal
function showModal(element) {
  modal.classList.add("show");
  console.log("hi");
}

// Function to hide modal
function hideModal(element) {
  // modal.style.display = "none";
  modal.classList.remove("show");

  console.log("bye");
}

const generateButton = document.getElementById("generateButton");

const createMealItem = (recipe) => {
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
};

const createModal = (recipe) => {
  let th1;
  let th2;
  const modalItem = document.createElement("div");
  modalItem.classList.add("modal");

  const title = document.createElement("h1");
  title.innerText = recipe.food_name;
  const details = document.createElement("h3");
  details.innerText = `${recipe.prep_time} min prep, ${recipe.cook_time} min cook`;

  const table = document.createElement("table");

  const caloriesRow = document.createElement("tr");
  caloriesRow.classList.add("row1");
  th1 = document.createElement("th");
  th1.innerText = "Calories";
  th2 = document.createElement("th");
  th2.innerText = Math.round(recipe.calories * 100) / 100 || 0;
  caloriesRow.append(th1);
  caloriesRow.append(th2);

  const carbsRow = document.createElement("tr");
  carbsRow.classList.add("row2");
  th1 = document.createElement("th");
  th1.innerText = "Carbs";
  th2 = document.createElement("th");
  th2.innerText = Math.round(recipe.carbs * 100) / 100 || "NOTFOUND";
  carbsRow.append(th1);
  carbsRow.append(th2);

  const fatsRow = document.createElement("tr");
  fatsRow.classList.add("row3");
  th1 = document.createElement("th");
  th1.innerText = "Fats";
  th2 = document.createElement("th");
  th2.innerText = Math.round(recipe.fats * 100) / 100 || 0;
  fatsRow.append(th1);
  fatsRow.append(th2);

  const proteinRow = document.createElement("tr");
  proteinRow.classList.add("row4");
  th1 = document.createElement("th");
  th1.innerText = "protien";
  th2 = document.createElement("th");
  th2.innerText = Math.round(recipe.proteins * 100) / 100 || 0;
  proteinRow.append(th1);
  proteinRow.append(th2);

  table.append(caloriesRow);
  table.append(carbsRow);
  table.append(fatsRow);
  table.append(proteinRow);
  modalItem.append(title);
  modalItem.append(details);
  modalItem.append(document.createElement("hr"));
  modalItem.append(table);
  return modalItem;
};

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
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        const mealItem = createMealItem(recipe);
        const modal = createModal(recipe);
        mealItem.onmouseenter = () => {
          modal.classList.add("show");
        };
        mealItem.onmouseleave = () => {
          modal.classList.remove("show");
        };
        wrapper.appendChild(mealItem);
        wrapper.appendChild(modal);

        mealContainer.appendChild(wrapper);
      });

      p_tag.innerText = Math.round(total_cal) + " Calories";

      mealColumn.appendChild(mealContainer);
    });
  } catch (err) {
    alert(err);
    throw err;
  }
};

generateButton.addEventListener("click", generateBtnHandler);
