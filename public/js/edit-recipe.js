document.addEventListener("DOMContentLoaded", () => {
  const addIngredientButton = document.getElementById("add-ingredient-button");
  const ingredientsList = document.getElementById("ingredients-list");

  addIngredientButton.addEventListener("click", () => {
    const index = ingredientsList.children.length;
    const newIngredient = document.createElement("div");
    newIngredient.classList.add("ingredient-item");
    newIngredient.innerHTML = `
      <input type="text" name="ingredients[${index}][food_name]" value="" />
    `;
    ingredientsList.appendChild(newIngredient);
  });

  const addDirectionButton = document.getElementById("add-direction-button");
  const directionsList = document.getElementById("directions-list");

  addDirectionButton.addEventListener("click", () => {
    const index = directionsList.children.length;
    const newDirection = document.createElement("div");
    newDirection.classList.add("direction-item");
    newDirection.innerHTML = `
      <textarea name="directions[${index}][text]"></textarea>
    `;
    directionsList.appendChild(newDirection);
  });

  const deleteButton = document.getElementById("delete-recipe-button");
  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      fetch(`/admin/recipe/delete/${recipeData._id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          window.location.href = "/admin/recipes";
        } else {
          alert("Failed to delete the recipe.");
        }
      });
    }
  });

  const form = document.getElementById("updateRecipe");
  form.addEventListener("submit", formHandler);
});

const formHandler = async (e) => {
  e.preventDefault();

  const reciepeId = window.location.pathname.split("/").at(-1);
  const form = e.target;
  const formData = new FormData(form);
  let recipeData = {};

  recipeData.prep_time = formData.get("prep_time");
  recipeData.cook_time = formData.get("cook_time");

  recipeData.directions = [];
  form
    .querySelectorAll(".direction-item textarea")
    .forEach((textarea, index) => {
      if (textarea.value.trim() == "") {
        return;
      }
      recipeData.directions.push(textarea.value.trim());
    });

  recipeData.ingredients = [];
  form.querySelectorAll(".ingredient-item input").forEach((input, index) => {
    recipeData.ingredients.push(input.value);
  });

  recipeData.nutritions = {};
  form.querySelectorAll(".nutrition-facts input").forEach((input) => {
    recipeData.nutritions[input.name] = parseFloat(input.value);
  });
  // Sending the data
  try {
    const response = await fetch(`/admin/recipe/${reciepeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (response.ok) {
      // const result = await response.json();
      alert("Recipe updated successfully!");
      // Optionally redirect or update the UI
    } else {
      alert("Failed to update recipe.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the recipe.");
  }
  // window.location.href = `/admin/recipe/view/${recipeId}`;
};
