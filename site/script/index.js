const viewButtons = document.querySelectorAll(".style-switcher button");

viewButtons.forEach(button => {
  button.addEventListener("click", el => {
    document.body.classList.remove("grid", "list");
    viewButtons.forEach(button => {
      button.classList.remove("active");
    });
    el.target.classList.add("active");
    document.body.classList.add(el.target.dataset.bodyClass);
  });
});
