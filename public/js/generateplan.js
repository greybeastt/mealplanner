let production = true;
const baseUrl = production
  ? "https://mealplanner-86af.onrender.com"
  : "localhost:3000";
const mealColumn = document.querySelector(".meal-row");
const modal = document.querySelector(".modal");
const generateButton = document.getElementById("generateButton");

// Function to show modal
const showModal = (element) => {
  modal.classList.add("show");
  console.log("hi");
};

// Function to hide modal
const hideModal = (element) => {
  modal.classList.remove("show");
  console.log("bye");
};

const createMealItem = (recipe) => {
  const mealItem = document.createElement("div");
  mealItem.classList.add("meal-item");

  const image = document.createElement("img");
  image.src = `https://images.eatthismuch.com/${recipe.default_image[0].image}`;
  image.alt = recipe.food_name;

  const mealDetails = document.createElement("div");
  mealDetails.classList.add("meal-details");

  const mealTitle = document.createElement("h4");
  mealTitle.textContent = recipe.food_name;

  const mealQuantity = document.createElement("p");
  mealQuantity.textContent = `${recipe.number_servings} Serving`;

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

const generateBtnHandler = async () => {
  const calories = document.getElementById("cal_input").value || 0;
  const numberOfMeals =
    document.getElementById("num_meals_selector").value || 0;

  try {
    const res = await fetch(`${baseUrl}/api/v1/${numberOfMeals}/${calories}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    mealColumn.innerHTML = "";

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

      mealColumn.appendChild(mealContainer);
    });
  } catch (err) {
    alert(`Failed to generate meals: ${err.message}`);
  }
};

generateButton.addEventListener("click", generateBtnHandler);
