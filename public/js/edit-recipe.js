document.addEventListener("DOMContentLoaded", () => {
  const addIngredientButton = document.getElementById("add-ingredient-button");
  const ingredientsList = document.getElementById("ingredients-list");

  addIngredientButton.addEventListener("click", () => {
    const index = ingredientsList.children.length;
    const newIngredient = document.createElement("div");
    newIngredient.classList.add("ingredient-item");
    newIngredient.innerHTML = `
      <input type="text" name="ingredients[${index}][food_name]" placeholder="Name" >
      <input type="text" name="ingredients[${index}][description]" placeholder="Description">
      <input type="number" name="ingredients[${index}][amount]" placeholder="Amount">
      <input type="text" name="ingredients[${index}][weight_description]" placeholder="Weight Description">
      <input type="number" name="ingredients[${index}][weight_grams]" placeholder="Weight (Grams)">
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

  const recipeId = window.location.pathname.split("/").at(-1);
  const form = e.target;
  const formData = new FormData(form);
  let recipeData = {
    prep_time: formData.get("prep_time"),
    cook_time: formData.get("cook_time"),
    directions: [],
    ingredients: [],
    nutritions: {},
  };

  // Collect directions
  form.querySelectorAll(".direction-item textarea").forEach((textarea) => {
    const trimmedValue = textarea.value.trim();
    if (trimmedValue) {
      recipeData.directions.push(trimmedValue);
    }
  });

  // Collect ingredients
  form.querySelectorAll(".ingredient-item").forEach((item) => {
    const ingredient = {
      name: item.querySelector("input[name$='[food_name]']").value,
      description: item.querySelector("input[name$='[description]']").value,
      amount: item.querySelector("input[name$='[amount]']").value,
      weight_description: item.querySelector("input[name$='[weight_description]']").value,
      weight_grams: item.querySelector("input[name$='[weight_grams]']").value,
    };
    if (ingredient.name) {
      recipeData.ingredients.push(ingredient);
    }
  });

  // Collect nutrition facts
  form.querySelectorAll(".nutrition-facts input").forEach((input) => {
    if (input.value) {
      recipeData.nutritions[input.name] = parseFloat(input.value) || 0;
    }
  });

  // Send data to the server
  try {
    const response = await fetch(`/admin/recipe/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (response.ok) {
      console.log(recipeData);
      alert("Recipe updated successfully!");
      // Optionally redirect or update the UI
      // window.location.href = `/admin/recipe/view/${recipeId}`;
    } else {
      const errorData = await response.json();
      alert(`Failed to update recipe: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the recipe.");
  }
};