exports.generateRecipeHtml = (recipeData) => {
  const { food_name, ingredients, directions, default_image } = recipeData;
  const ingredientsHTML = ingredients
    .map((ingredient) => `<li>${ingredient.food.food_name}</li>`)
    .join("");

  const directionsHTML = directions
    .map((step) => `<p>${step.text}</p>`)
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${food_name}</title>
    <link rel="stylesheet" href="./css/recipe.css" />
  </head>
  <body>
    <dev class="container">
      <div class="row">
        <h1>${food_name}</h1>
        <img src="https://images.eatthismuch.com/${default_image.image}" width="200" />
      </div>
      <h2>Ingredients</h2>
      <ul>
        ${ingredientsHTML}
      </ul>
      <h2>Instructions</h2>
      <div>${directionsHTML}</div>
    </dev>
    <script src="/js/recipe.js"></script>
  </body>
</html>
  `;
};
