document.addEventListener("DOMContentLoaded", function () {
  const typeSelector = document.getElementById("typeSelector");
  const createContent = document.getElementById("createContent");

  typeSelector.addEventListener("change", function () {
    const type = typeSelector.value;
    if (type) {
      fetch(`/create/${type}`)
        .then((response) => response.text())
        .then((html) => {
          createContent.innerHTML = html;
        })
        .catch((error) => {
          console.error("Error fetching the create page:", error);
          createContent.innerHTML = "<p>Error loading content</p>";
        });
    } else {
      createContent.innerHTML = "";
    }
  });
});
