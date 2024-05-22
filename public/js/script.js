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
          addDynamicItemHandler();
        })
        .catch((error) => {
          console.error("Error fetching the create page:", error);
          createContent.innerHTML = "<p>Error loading content</p>";
        });
    } else {
      createContent.innerHTML = "";
    }
  });

  function addDynamicItemHandler() {
    const addItemButton = document.getElementById("addItemButton");
    const itemContainer = document.getElementById("itemContainer");

    if (addItemButton && itemContainer) {
      addItemButton.addEventListener("click", function () {
        const newItemInput = `
        <div class="flex items-center space-x-2">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Title:</label
          >
          <input
            type="text"
            id="title"
            name="title"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="imgUrl" class="block text-sm font-medium text-gray-700"
            >Image Link:</label
          >
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="body" class="block text-sm font-medium text-gray-700"
            >Body:</label
          >
          <input
            type="text"
            id="body"
            name="body"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button type="button" class="delete-button bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
        `;

        // Append the new input field to the container
        itemContainer.insertAdjacentHTML("beforeend", newItemInput);
      });

      itemContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
          e.target.parentElement.remove();
        }
      });
    }
  }
});
