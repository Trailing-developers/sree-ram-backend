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
          if (type === "darshan_widgets") {
            addWidgetItemHandler();
          } else {
            addDynamicItemHandler();
          }
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

  function addWidgetItemHandler() {
    const addCardButton = document.getElementById("add-card-button");
    const container = document.getElementById("card-container");
    let cardCounter =
      parseInt(
        document.getElementById("card-container").dataset.cardCount,
        10
      ) || 0;

    addCardButton.addEventListener("click", () => {
      cardCounter += 1;
      const cardGroup = document.createElement("div");
      cardGroup.classList.add("card", "border", "p-4", "mb-4");
      cardGroup.dataset.id = cardCounter;
      cardGroup.innerHTML = `
          <div class="flex items-center mb-2">
            <button type="button" class="add-item-button bg-blue-500 text-white px-2 py-1 rounded">Add Item</button>
            <button type="button" class="remove-card-button bg-red-500 text-white px-2 py-1 rounded">Remove Card</button>
          </div>
          <div>
          <label
            for="widgetTitle"
            class="block text-sm font-medium text-gray-700"
            >Widget Title:</label
          >
          <input
            type="text"
            name="cards[${cardCounter}][title][]"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
          <div class="item-container mb-4" data-id=${cardCounter}></div>
        `;

      container.appendChild(cardGroup);
    });

    container.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("add-item-button")) {
        const itemContainer = event.target
          .closest(".card")
          .querySelector(".item-container");
        const dataSetId = itemContainer.dataset.id;
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("flex", "items-center", "mb-2");

        inputGroup.innerHTML = `
        <div class="flex items-center mb-2">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name:</label
          >
          <input
            type="text"
            name="cards[${dataSetId}][name][]"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="place" class="block text-sm font-medium text-gray-700"
            >Place:</label
          >
          <input
            type="text"
            name="cards[${dataSetId}][place][]"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            for="imgUrl"
            class="block text-sm font-medium text-gray-700"
            >Image:</label
          >
          <input
            type="text"
            name="cards[${dataSetId}][imgUrl][]"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            for="pageId"
            class="block text-sm font-medium text-gray-700"
            >PageId:</label
          >
          <input
            type="text"
            name="cards[${dataSetId}][pageId][]"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

          <button
            type="button"
            class="delete-item-button bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
      </div>
          `;

        itemContainer.appendChild(inputGroup);
      }

      if (
        event.target &&
        event.target.classList.contains("delete-item-button")
      ) {
        event.target.parentNode.remove();
      }
      if (
        event.target &&
        event.target.classList.contains("remove-card-button")
      ) {
        event.target.closest(".card").remove();
      }
    });
  }
});
