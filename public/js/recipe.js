const editBtn = document.getElementById("btn.edit");
const deleteBtn = document.getElementById("btn.delete");

const editHandler = (e) => {
  const pathname = window.location.pathname.split("/");
  window.location.href = `/admin/recipe/view/edit/${
    pathname[pathname.length - 1]
  }`;
};

const deleteHandler = async (e) => {
  let reciepeId = window.location.pathname.split("/").at(-1);
  console.log(reciepeId);
  if (confirm("Are you sure you want to delete this recipe?")) {
    const response = await fetch(
      `http://localhost:3000/admin/recipe/${reciepeId}`,
      {
        method: "delete",
      }
    );

    console.log(response.status);
    if (response.ok) {
      window.location.href = "http://localhost:3000/meals.html";
    } else {
      alert("Failed to delete the recipe.");
    }
  }
};
editBtn.addEventListener("click", editHandler);
deleteBtn.addEventListener("click", deleteHandler);
