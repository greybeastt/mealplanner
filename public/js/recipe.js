const editBtn = document.getElementById("btn.edit");
const deleteBtn = document.getElementById("btn.delete");

const editHandler = (e) => {
  var pathname = window.location.pathname.split("/");
  window.location.href = `/admin/recipe/view/edit/${
    pathname[pathname.length - 1]
  }`;
};

editBtn.addEventListener("click", editHandler);
