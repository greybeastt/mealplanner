exports.generateRecipeHtml = (recipeData) => {
  const title = recipeData.food_name;
  const ingredients = recipeData.ingredients
    .map((ingredient) => `<li>${ingredient.food.food_name}</li>`)
    .join("");
  const instructions = recipeData.directions
    .map((step) => `<p>${step.text}</p>`)
    .join("");
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <h2>Ingredients</h2>
        <ul>${ingredients}</ul>
        <h2>Instructions</h2>
        <div>${instructions}</div>
        <script src="/js/recipe.js"></script>
      </body>
    </html>
  `;
};
