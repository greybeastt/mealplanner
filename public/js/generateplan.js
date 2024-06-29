let production = true;
const baseUrl = production
  ? "https://mealplanner-86af.onrender.com"
  : "http://localhost:3000";
const mealColumn = document.querySelector(".meal-row");
const modal = document.querySelector(".modal");
const generateButton = document.getElementById("generateButton");
const loadingSpinner = document.getElementById("loadingSpinner");

const createMealItem = (recipe) => {
  const mealItem = document.createElement("div");
  mealItem.classList.add("meal-item");

  const image = document.createElement("img");
  image.src = `https://images.eatthismuch.com/${recipe.default_image.image}`;
  image.alt = recipe.food_name;

  const mealDetails = document.createElement("div");
  mealDetails.classList.add("meal-details");

  const mealTitle = document.createElement("h4");
  mealTitle.textContent = recipe.food_name;

  const mealQuantity = document.createElement("p");
  mealQuantity.textContent = `${recipe.number_servings} serving`;

  mealDetails.append(mealTitle, mealQuantity);
  mealItem.append(image, mealDetails);

  return mealItem;
};

const createModal = (recipe) => {
  const modalItem = document.createElement("div");
  modalItem.classList.add("meal-modal");

  const title = document.createElement("h1");
  title.innerText = recipe.food_name;

  const details = document.createElement("h3");
  details.innerText = `${recipe.prep_time} min prep, ${recipe.cook_time} min cook`;

  const table = document.createElement("table");

  const rows = [
    { label: "Calories", value: recipe.calories, class: "row1" },
    { label: "Carbs", value: recipe.carbs, class: "row2" },
    { label: "Fats", value: recipe.fats, class: "row3" },
    { label: "Proteins", value: recipe.proteins, class: "row4" },
  ];

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");

    th1.innerText = row.label;
    th2.innerText = Math.round(row.value * 100) / 100 || 0;

    tr.append(th1, th2);
    tr.classList.add(row.class);
    table.appendChild(tr);
  });

  modalItem.append(title, details, document.createElement("hr"), table);

  return modalItem;
};

const toggleLoading = (isLoading) => {
  generateButton.disabled = isLoading;
  loadingSpinner.style.display = isLoading ? "inline-block" : "none";
};

const fetchMealDate = async (numberOfMeals, calories) => {
  const res = await fetch(`${baseUrl}/api/v1/${numberOfMeals}/${calories}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }
  return res.json();
};
const generateBtnHandler = async (e) => {
  const numberOfMeals =
    document.getElementById("num_meals_selector").value || 2;
  const calories = document.getElementById("cal_input").value || 1000;

  toggleLoading(true);

  try {
    const data = await fetchMealDate(numberOfMeals, calories);

    mealColumn.innerHTML = "";
    let chart_calories = 0;
    data.forEach((meal) => {
      const mealContainer = document.createElement("div");
      mealContainer.classList.add("meal");

      const mealHeader = document.createElement("div");
      mealHeader.classList.add("meal-header");

      const h3Tag = document.createElement("h3");
      h3Tag.innerText = meal.type;

      const pTag = document.createElement("p");

      mealHeader.append(h3Tag, pTag);
      mealContainer.appendChild(mealHeader);

      let totalCalories = 0;

      meal.recipes.forEach((recipe) => {
        totalCalories += recipe.calories;

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        const mealItem = createMealItem(recipe);
        const modal = createModal(recipe);

        mealItem.onmouseenter = () => modal.classList.add("show");
        mealItem.onmouseleave = () => modal.classList.remove("show");

        wrapper.append(mealItem, modal);
        mealContainer.appendChild(wrapper);
      });

      pTag.innerText = `${Math.round(totalCalories)} Calories`;
      chart_calories += totalCalories;
      mealColumn.appendChild(mealContainer);
    });
    document.getElementById("chart-calories").innerHTML =
      Math.round(chart_calories) + " Calories";
  } catch (err) {
    throw err;
    alert(`${err.message}`);
  } finally {
    toggleLoading(false);
  }
};

generateButton.addEventListener("click", generateBtnHandler);
