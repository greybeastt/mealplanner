const mealContainer = document.querySelector(".meal");

let calories = document.getElementById("cal_input");

let mealsNum = document.getElementById("num_meals_selector");
let mealsNumVal = mealsNum.value;

let generateButton = document.getElementById("generateButton");

function createMealItem(imageUrl, title, quantity) {
  const mealItem = document.createElement("div");
  mealItem.classList.add("meal-item");

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = title;

  const mealDetails = document.createElement("div");
  mealDetails.classList.add("meal-details");

  const mealTitle = document.createElement("h3");
  mealTitle.textContent = title;

  const mealQuantity = document.createElement("p");
  mealQuantity.textContent = quantity;

  mealDetails.appendChild(mealTitle);
  mealDetails.appendChild(mealQuantity);

  mealItem.appendChild(image);
  mealItem.appendChild(mealDetails);

  return mealItem;
}

const getmeals = async () => {
  const res = await fetch(
    `http://localhost:3000/api/v1/${mealsNumVal}/${calories.value}`
  );
  let data = await res.json();
  data.forEach((element) => {
    let receipes = element.recipes;
    console.log(receipes);
    receipes.forEach((element) => {
      mealContainer.appendChild(
        createMealItem(element.imageSrc, "", element.food_name)
      );
    });
  });
};

generateButton.addEventListener("click", getmeals);
