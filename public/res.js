const fetchdata = async () => {
  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const response = await fetch("/admin/recipies", options); // Replace with your API endpoint

  if (!response.ok) {
    window.location.replace("/");
    return;
  }
  const data = await response.json();
  data.map((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("row", "food_result");

    const innerCol = document.createElement("div");
    innerCol.classList.add("col-11");

    const recipeLink = document.createElement("a");
    recipeLink.classList.add("row");
    recipeLink.href = ``; // TODO: replace with reciepe url

    const imageCol = document.createElement("div");
    imageCol.classList.add("search_result_image", "col-1");
    const image = document.createElement("img");
    image.width = "100";
    image.height = "100";
    // TODO: fix Images issue
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
      const nutrientCell = document.createElement("div");
      nutrientCell.classList.add("col-2", "offset-1", "nutrient_cell");
      nutrientCell.textContent = recipe[nutrient] || 0;
      statsRow.appendChild(nutrientCell);
    });

    statsCol.appendChild(statsRow);
    recipeLink.appendChild(imageCol);
    recipeLink.appendChild(recipeName);
    recipeLink.appendChild(statsCol);

    innerCol.appendChild(recipeLink);
    recipeElement.appendChild(innerCol);

    document.querySelector(".results_view").appendChild(recipeElement);
  });
};

fetchdata();
