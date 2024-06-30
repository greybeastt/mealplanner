let production = false;
let data = [];
const baseUrl = production
  ? "https://mealplanner-86af.onrender.com"
  : "http://localhost:3000";
const mealColumn = document.querySelector(".meal-row");
const modal = document.querySelector(".modal");
const generateButton = document.getElementById("generateButton");
const loadingSpinner = document.getElementById("loadingSpinner");

const createMealItem = (recipe, meal) => {
  const mealItem = document.createElement("div");
  mealItem.classList.add("meal-item");

  const dummyWrapper = document.createElement("div");
  dummyWrapper.style.display = "flex";
  dummyWrapper.style.padding = 0;
  dummyWrapper.style.margin = 0;

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
  dummyWrapper.append(image, mealDetails);

  const mealActions = document.createElement("div");
  mealActions.classList.add("meal-actions");
  // Create SVG icons
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.classList.add("w-6", "h-6", "text-gray-800", "dark:text-white");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("width", "24");
  svg1.setAttribute("height", "24");
  svg1.setAttribute("fill", "none");
  svg1.setAttribute("viewBox", "0 0 24 24");
  svg1.innerHTML = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>`;

  // Add event listener to the first SVG
  svg1.addEventListener("click", async () => {
    svg1.disabled = true;
    try {
      const meal_index = data.findIndex((m) => m.type === meal.type);
      let idx = meal.recipes.findIndex((r) => r.food_name === recipe.food_name);

      let newRecipe = await changeRecipe(recipe);
      if (meal.recipes.find((e) => newRecipe.food_name === e.food_name)) {
        newRecipe = await changeRecipe(meal[(idx + 1) % 2]);
      }
      meal.recipes[idx] = newRecipe;
      data[meal_index] = meal;
      renderMeals(data);
    } catch (err) {
      throw err;
      console.error("Error updating meals data:", err);
    } finally {
      svg1.disabled = false;
    }
  });

  // Create second SVG (dummy)
  const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg2.classList.add("w-6", "h-6", "text-gray-800", "dark:text-white");
  svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg2.setAttribute("width", "24");
  svg2.setAttribute("height", "24");
  svg2.setAttribute("fill", "none");
  svg2.setAttribute("viewBox", "0 0 24 24");
  svg2.innerHTML = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>`;

  // Append SVGs to meal actions
  mealActions.append(svg1, svg2);
  mealItem.append(dummyWrapper, mealActions);

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

const changeRecipe = async (recipe) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    // Handle error appropriately, e.g., return an error response or rethrow the error
    throw error;
  }
};

const fetchMealData = async (numberOfMeals, calories) => {
  const res = await fetch(`${baseUrl}/api/v1/${numberOfMeals}/${calories}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }
  return res.json();
};

const renderMeals = (data) => {
  mealColumn.innerHTML = "";
  data.forEach((meal) => {
    const mealContainer = createMealContainer(meal);
    mealColumn.appendChild(mealContainer);
  });
};

const createMealContainer = (meal) => {
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

    const mealItem = createMealItem(recipe, meal);
    const modal = createModal(recipe);

    mealItem.onmouseenter = () => modal.classList.add("show");
    mealItem.onmouseleave = () => modal.classList.remove("show");

    wrapper.append(mealItem, modal);
    mealContainer.appendChild(wrapper);
  });

  pTag.innerText = `${Math.round(totalCalories)} Calories`;
  return mealContainer;
};

const updateChartCalories = (data) => {
  let chart_calories = 0;
  data.forEach((meal) => {
    meal.recipes.forEach((recipe) => {
      chart_calories += recipe.calories;
    });
  });
  document.getElementById("chart-calories").innerText =
    Math.round(chart_calories) + " Calories";
};

const generateBtnHandler = async () => {
  const calories = document.getElementById("cal_input").value || 1000;
  const numberOfMeals =
    document.getElementById("num_meals_selector").value || 2;

  toggleLoading(true);

  try {
    data = await fetchMealData(numberOfMeals, calories);
    renderMeals(data);
    updateChartCalories(data);
  } catch (err) {
    alert(`Error: ${err.message}`);
  } finally {
    toggleLoading(false);
  }
};

generateButton.addEventListener("click", generateBtnHandler);
