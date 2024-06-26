const recipeTable = document.createElement("table");
recipeTable.classList.add("table");
recipeTable.classList.add("table-bordered");
recipeTable.id = "reciepeTable";
const paginationContainer = document.createElement("div");
paginationContainer.classList.add("pagination-controls");

const paginationNumbers = document.createElement("span");
paginationNumbers.id = "pagination-numbers";

const nextButton = document.createElement("button");
nextButton.id = "next-button";
nextButton.textContent = ">";

const prevButton = document.createElement("button");
prevButton.id = "prev-button";
prevButton.textContent = "<";

paginationContainer.appendChild(prevButton);
paginationContainer.appendChild(paginationNumbers);
paginationContainer.appendChild(nextButton);

let pageNumber = 1;
paginationNumbers.textContent = `Page ${pageNumber}`;

const load_next_page = () => {
  pageNumber += 1;
  recipeTable.innerHTML = "";
  paginationNumbers.textContent = `Page ${pageNumber}`;
  fetchdata();
};

const load_prev_page = () => {
  pageNumber -= 1;
  recipeTable.innerHTML = "";
  paginationNumbers.textContent = `Page ${pageNumber}`;
  fetchdata();
};

const fetchdata = async () => {
  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const response = await fetch(`/admin/recipies?page=${pageNumber}`, options); // Replace with your API endpoint

  if (!response.ok) {
    window.location.replace("/auth.html");
    return;
  }
  const data = await response.json();

  const tableHead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const imageHead = document.createElement("th");

  imageHead.textContent = "Image";
  headRow.appendChild(imageHead);

  // const nameHead = document.createElement("th");
  // nameHead.onclick = "sortTable(1)";
  // nameHead.textContent = "Recipe Name";
  // headRow.appendChild(nameHead);
  const nameHead = document.createElement("th");

  nameHead.textContent = "Recipe Name";
  headRow.appendChild(nameHead);

  // const caloriesHead = document.createElement("th");
  // caloriesHead.textContent = "Category";
  // headRow.appendChild(caloriesHead);

  // const caloriesHead = document.createElement("th");
  // caloriesHead.textContent = "Calories";
  // headRow.appendChild(caloriesHead);

  // const fatsHead = document.createElement("th");
  // fatsHead.textContent = "Fats";
  // headRow.appendChild(fatsHead);

  // const proteinsHead = document.createElement("th");
  // proteinsHead.textContent = "Proteins";
  // headRow.appendChild(proteinsHead);

  tableHead.appendChild(headRow);
  recipeTable.appendChild(tableHead);

  const tableBody = document.createElement("tbody");

  data.forEach((recipe) => {
    const row = document.createElement("tr");

    const imageCell = document.createElement("td");
    imageCell.setAttribute("data-label", "Image");
    const image = document.createElement("img");
    image.classList.add("img-thumbnail");
    // "https://ionicframework.com/docs/img/demos/thumbnail.svg"
    console.log(recipe);
    image.src =
      "https://images.eatthismuch.com/" + recipe.default_image.thumbnail;
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    const nameCell = document.createElement("td");
    nameCell.setAttribute("data-label", "Recipe Name");
    const recipeLink = document.createElement("a");
    recipeLink.href = `/admin/recipe/view/${recipe["_id"]}`;
    recipeLink.textContent = recipe.food_name;
    nameCell.appendChild(recipeLink);
    row.appendChild(nameCell);

    // const caloriesCell = document.createElement("td");
    // caloriesCell.setAttribute("data-label", "Calories");
    // caloriesCell.textContent = Math.round(recipe.calories * 10) / 10 || 0;
    // row.appendChild(caloriesCell);

    // const fatsCell = document.createElement("td");
    // fatsCell.setAttribute("data-label", "Fats");
    // fatsCell.textContent = Math.round(recipe.fats * 10) / 10 || 0;
    // row.appendChild(fatsCell);

    // const proteinsCell = document.createElement("td");
    // proteinsCell.setAttribute("data-label", "Proteins");
    // proteinsCell.textContent = Math.round(recipe.proteins * 10) / 10 || 0;
    // row.appendChild(proteinsCell);

    // const proteinsCell = document.createElement("td");
    // proteinsCell.setAttribute("data-label", "Proteins");
    // proteinsCell.textContent = recipe.meal_category || "ff";
    // row.appendChild(proteinsCell);

    tableBody.appendChild(row);
  });

  recipeTable.appendChild(tableBody);

  const resultsView = document.querySelector(".results_view");
  resultsView.innerHTML = "";
  resultsView.appendChild(recipeTable);
  resultsView.appendChild(paginationContainer);
};

document.addEventListener("DOMContentLoaded", () => {
  fetchdata();
  nextButton.addEventListener("click", load_next_page);
  prevButton.addEventListener("click", load_prev_page);
});
