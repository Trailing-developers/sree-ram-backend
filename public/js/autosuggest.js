document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("suggestion-input");
  const suggestionBox = document.getElementById("suggestion-box");

  if (inputField && suggestionBox) {
    console.log("hello1");
    inputField.addEventListener("input", async () => {
      console.log("hello2");
      const query = inputField.value;
      if (query.length < 2) {
        suggestionBox.innerHTML = "";
        return;
      }

      const response = await fetch(`api/gods/suggest?q=${query}`);
      const suggestions = await response.json();

      suggestionBox.innerHTML = "";
      suggestions.forEach((item) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add(
          "suggestion-item",
          "p-2",
          "hover:bg-gray-200",
          "cursor-pointer"
        );
        suggestionItem.textContent = item.name;
        suggestionItem.addEventListener("click", () => {
          inputField.value = item.name;
          suggestionBox.innerHTML = "";
        });
        suggestionBox.appendChild(suggestionItem);
      });
    });
  }
});
