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
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmission(form);
  });
});

const handleFormSubmission = (form) => {
  const formData = new FormData(form);
  const recipeId = form.action.split("/").pop();
  console.log(JSON.stringify(formData));

  alert("still in progress");

  // fetch(`/admin/recipe/update/${recipeId}`, {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.success) {
  //       alert("Recipe updated successfully.");
  //       window.location.href = `/admin/recipe/view/${recipeId}`;
  //     } else {
  //       alert("Failed to update the recipe.");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     alert("An error occurred while updating the recipe.");
  //   });
};
