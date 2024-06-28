module.exports = class Templator {
  constructor() {}
  static createHeadTag(title, css_path) {
    return `<head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    ${css_path.map((path) => `<link rel="stylesheet" href="${path}" />`)}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" />
    </head>`;
  }
  static displayMeal(recipeData) {
    const { food_name, ingredients, directions, default_image, nutrition } =
      recipeData;

    const table_of_nutrition = Object.entries(nutrition)
      .map(
        ([key, value]) =>
          `<tr>
              <td>${key}</td>
              <td>${value}</td>
            </tr>`
      )
      .join("");

    const ingredientsHTML = ingredients
      .map(
        (ingredient) => `<div class="container ingredient">
        <img width="50" height="50"
 src="${
   "https://images.eatthismuch.com/" + ingredient.food.default_image.image
 }" alt="Tortillas">
        <div class="text">
            <div class="title">${ingredient.food.food_name}</div>
            <div class="subtitle">Ready-to-bake or -fry, flour</div>
        </div>
        <div class="details">
            <div>${ingredient.food.weights[ingredient.units].description}</div>
            <div>${ingredient.food.weights[ingredient.units].grams}</div>
        </div>
    </div> 
    </hr>
    `
      )
      .join("");

    const directionsHTML = directions
      .map(
        (step) => `<div class="step-container">
        <div class="step-number">Step ${step.order + 1}</div>
        <div class="step-text">${step.text}</div>
    </div>`
      )
      .join("");

    return `
<!DOCTYPE html>
<html lang="en">
  ${this.createHeadTag(food_name, ["/css/recipe.css"])}
  <body>
    <!-- NAV -->
    <div class="navbar">
      <h1>${food_name}</h1>
    </div>

    <!-- IMAGE -->
    <div class="header">
      <img
        src="https://images.eatthismuch.com/${default_image.image}"
        alt="Header Image"
      />
    </div>

    <!-- 1. CONTAINER -->
    <div class="container">
      <div class="container-wrapper">
        <div class="left-part">
          <!-- 1.1. time card  -->
          <div class="stats-card">
            <div class="time-item">
              <h4>Prep Time</h4>
              <p>${recipeData.prep_time} minutes</p>
            </div>
            <div class="time-item">
              <h4>Cook Time</h4>
              <p>${recipeData.cook_time} minutes</p>
            </div>
            <div class="time-item">
              <h4>Total Time</h4>
              <p>${recipeData.cook_time + recipeData.prep_time} minutes</p>
            </div>
          </div>

          <h2>Ingredients</h2>
          <ul>
            ${ingredientsHTML}
          </ul>
          <h2>Instructions</h2>
          <ul>
            ${directionsHTML}
          </ul>
        </div>
        <!-- 1.2. Nutrition div -->
        <div class="nutrition-facts">
          <h2>Nutrition Facts</h2>
          <p>4 servings</p>
          <p><strong>Serving weight:</strong> 296g</p>
          <p><strong>Calories:</strong> 400</p>
          <hr style="height: 2px; background-color: black; boder: none" />
          <div class="edit-delete-buttons">
            <button class="nutrition-btn" id="nutrition.btn">
              Detailed Nutrition
              <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </button>
          </div>
          <table id="nutrition.table" style="display: none">
            ${table_of_nutrition}
          </table>
          <div class="edit-delete-buttons">
            <button class="bluebtn" id="btn.edit">Edit Recipe</button>
            <button class="redbtn" id="btn.delete">Delete Recipe</button>
          </div>
        </div>
      </div>
    </div>
    <script src="/js/recipe.js"></script>
  </body>
</html>
  `;
  }
};
