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
};

exports.generateEditRecipeHtml = (recipeData) => {
  const { food_name, ingredients, directions, default_image, nutrition } =
    recipeData;
  const ingredientsHTML = ingredients
    .map(
      (ingredient, index) => `
      <div class="ingredient-item">
        <input type="text" name="ingredients[${index}][food_name]" value="${ingredient.food.food_name}" />
      </div>
    `
    )
    .join("");

  const directionsHTML = directions
    .map(
      (step, index) => `
      <div class="direction-item">
        <textarea name="directions[${index}][text]">${step.text}</textarea>
      </div>
    `
    )
    .join("");

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit ${food_name}</title>
    <link rel="stylesheet" href="/css/edit-recipe.css" />
     <link rel="stylesheet" href="/css/recipe.css" />
  </head>
  <body>
    <!-- NAV -->

    <div class="navbar">
      <h1>Edit ${food_name}</h1>
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
      <form action="/admin/recipe/update/${recipeData._id}" method="POST">
        <div class="container-wrapper">
          <div class="left-part">
            <!-- 1.1. time card  -->
            <div class="stats-card">
              <div class="time-item">
                <h4>Prep Time</h4>
                <input type="number" name="prep_time" value="${
                  recipeData.prep_time
                }" />
              </div>
              <div class="time-item">
                <h4>Cook Time</h4>
                <input type="number" name="cook_time" value="${
                  recipeData.cook_time
                }" />
              </div>
              <div class="time-item">
                <h4>Total Time</h4>
                <p>${recipeData.cook_time + recipeData.prep_time} minutes</p>
              </div>
            </div>

            <h2>Ingredients</h2>
            <div id="ingredients-list">
              ${ingredientsHTML}
            </div>
            <button type="button" id="add-ingredient-button">Add Ingredient</button>

            <h2>Instructions</h2>
            <div id="directions-list">
              ${directionsHTML}
            </div>
            <button type="button" id="add-direction-button">Add Direction</button>
          </div>
          <!-- 1.2. Nutrition div -->
          <div class="nutrition-facts">
            <h2>Nutrition Facts</h2>
            <input type="number" name="number_servings" value="${
              nutrition.number_servings
            }" />
            <input type="number" name="calories" value="${
              nutrition.calories
            }" />
            <input type="number" name="total_fat" value="${
              nutrition.total_fat
            }" />
            <input type="number" name="cholesterol" value="${
              nutrition.cholesterol
            }" />
            <input type="number" name="sodium" value="${nutrition.sodium}" />
            <input type="number" name="total_carbohydrate" value="${
              nutrition.total_carbohydrate
            }" />
            <input type="number" name="protein" value="${nutrition.protein}" />
            <div class="edit-delete-buttons">
              <button type="submit" class="bluebtn">Save Changes</button>
              <button type="button" class="redbtn" id="delete-recipe-button">Delete Recipe</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <script src="/js/edit-recipe.js"></script>
  </body>
</html>

  `;
};
