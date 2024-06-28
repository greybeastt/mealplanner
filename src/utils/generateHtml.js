exports.generateEditRecipeHtml = (recipeData) => {
  const { food_name, ingredients, directions, default_image, nutrition } =
    recipeData;
  const ingredientsHTML = ingredients
    .map(
      (ingredient, index) => `
      <div class="ingredient-item">
        <input type="text" name="ingredients[${index}][food_name]" value="${ingredient.food.food_name}" />
        <input type="text" name="ingredients[${index}][description]" placeholder="Description">
        <input type="text" name="ingredients[${index}][units]" placeholder="Units">
        <input type="number" name="ingredients[${index}][grams]" placeholder="Grams">
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
      <form id="updateRecipe" action="" method="POST">
        <button type="submit" class="createBtn">Update</button>
        <div class="container-wrapper">
          <div class="left-part">
            <!-- 1.1. time card  -->
            <div class="stats-card">
              <div class="time-item">
                <h4>Prep Time</h4>
                <input type="number" name="prep_time" value="${
                  recipeData.prep_time
                }"/>
              </div>
              <div class="time-item">
                <h4>Cook Time</h4>
                <input type="number" name="cook_time" value="${
                  recipeData.cook_time
                }"/>
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
${Object.entries(nutrition)
  .map(
    ([key, val]) => `
      <h4>${key}</h4>
      <input type="text" name="${key}" value="${val}" />
    `
  )
  .join("")}

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
