fetch("/admin/recipies") // Replace with your API endpoint
  .then((response) => response.json())
  .then((data) => {
    // Process the data and display recipes (see next step)
    console.log(data[0]);
    data.map((recipe) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("row", "food_result");

      const innerCol = document.createElement("div");
      innerCol.classList.add("col-11");

      const recipeLink = document.createElement("a");
      recipeLink.classList.add("row");
      recipeLink.href = ``; // Replace with your link format

      const imageCol = document.createElement("div");
      imageCol.classList.add("search_result_image", "col-1");
      const image = document.createElement("img");
      image.width = "100";
      image.height = "100";
      image.src =
        "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"; // Replace with your image property name
      imageCol.appendChild(image);

      const recipeName = document.createElement("div");
      recipeName.classList.add("result_name", "col-3");
      recipeName.textContent = recipe.food_name;

      const statsCol = document.createElement("div");
      statsCol.classList.add("col-8");

      const statsRow = document.createElement("div");
      statsRow.classList.add("row", "result_stats");

      ["calories", "fats", "protiens"].forEach((nutrient) => {
        console.log(recipe[nutrient]);
        const nutrientCell = document.createElement("div");
        nutrientCell.classList.add("col-2", "offset-1", "nutrient_cell");
        nutrientCell.textContent = recipe[nutrient] || 0; // Replace with your nutrient value property name
        statsRow.appendChild(nutrientCell);
      });

      statsCol.appendChild(statsRow);

      recipeLink.appendChild(imageCol);
      recipeLink.appendChild(recipeName);
      recipeLink.appendChild(statsCol);

      innerCol.appendChild(recipeLink);
      recipeElement.appendChild(innerCol);

      // Add the recipe element to the container
      document.querySelector(".results_view").appendChild(recipeElement);
    });
  })
  .catch((error) => console.error(error));
