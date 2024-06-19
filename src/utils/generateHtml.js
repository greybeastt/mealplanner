exports.generateRecipeHtml = (recipeData) => {
  const { food_name, ingredients, directions, default_image, nutrition } =
    recipeData;
  const ingredientsHTML = ingredients
    .map((ingredient) => `<li>${ingredient.food.food_name}</li>`)
    .join("");

  const directionsHTML = directions
    .map((step) => `<li>${step.text}</li>`)
    .join("");

  // ${JSON.stringify(nutrition)}
  // number_servings
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${food_name}</title>
    <link rel="stylesheet" href="/css/recipe.css" />
  </head>
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
          <table>
            <tr>
              <td>Total Fat</td>
              <td>21g</td>
            </tr>
            <tr>
              <td>Cholesterol</td>
              <td>0.5mg</td>
            </tr>
            <tr>
              <td>Sodium</td>
              <td>780mg</td>
            </tr>
            <tr>
              <td>Total Carbohydrate</td>
              <td>46g</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>15g</td>
            </tr>
          </table>
          <div class="edit-delete-buttons">
            <button class="bluebtn">Edit Recipe</button>
            <button class="redbtn">Delete Recipe</button>
          </div>
        </div>
      </div>
    </div>
    <script src="/js/recipe.js"></script>
  </body>
</html>

  `;
};
