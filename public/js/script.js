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
          } else if (type === "temples") {
            addUpcomingEventsHandler();
            document
              .querySelectorAll(".suggestion-input")
              .forEach((inputField) => {
                const suggestionBox = inputField.nextElementSibling;
                suggestionHandler(inputField, suggestionBox);
              });
          } else if (type === "events") {
            suggestAddressHandler();
          } else if (type === "katha") {
            addGodHandler();
            document
              .querySelectorAll(".suggestion-input")
              .forEach((inputField) => {
                const suggestionBox = inputField.nextElementSibling;
                suggestionHandler(inputField, suggestionBox);
              });
          } else if (type === "media_temple" || type === "media_katha") {
            addMediaHandler(type === "media_temple");
            document
              .querySelectorAll(".suggestion-input")
              .forEach((inputField) => {
                const suggestionBox = inputField.nextElementSibling;
                suggestionTempleHandler(inputField, suggestionBox);
              });
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

  function addUpcomingEventsHandler() {
    // const addEventButton = document.getElementById("add-event-button");
    // const container = document.getElementById("event-container");

    // if (addEventButton && container) {
    //   addEventButton.addEventListener("click", function () {
    //     const newItemInput = `
    //     <div class="flex items-center space-x-2">
    //     <div>
    //     Date:
    //     <input
    //       type="datetime-local"
    //       name="upcomingEvents[dateTime][]"
    //       class="input border p-2 mr-2"
    //       value=""
    //     />
    //     Event Details:
    //     <input
    //       type="text"
    //       name="upcomingEvents[details][]"
    //       class="input border p-2 mr-2"
    //       value=""
    //     />
    //     Event Location:
    //     <input
    //       type="text"
    //       name="upcomingEvents[location][]"
    //       class="input border p-2 mr-2"
    //       value=""
    //     />
    //       <button
    //         type="button"
    //         class="delete-event-button bg-red-500 text-white px-2 py-1 rounded"
    //       >
    //         Delete Event
    //       </button>

    //   </div>
    //     </div>
    //     `;

    //     // Append the new input field to the container
    //     container.insertAdjacentHTML("beforeend", newItemInput);
    //   });

    //   container.addEventListener("click", function (e) {
    //     if (e.target.classList.contains("delete-event-button")) {
    //       e.target.parentElement.remove();
    //     }
    //   });
    // }

    const addDarshanButton = document.getElementById("add-darshan-button");
    const darshanContainer = document.getElementById("darshanChargesContainer");

    if (addDarshanButton && darshanContainer) {
      addDarshanButton.addEventListener("click", function () {
        const newItemInput = `
        <div>
        Type:
        <input type="text" name="darshan[type][typeName][]" class="input border p-2 mr-2" />
        Amount:
        <input type="text" name="darshan[type][amount][]" class="input border p-2 mr-2" />
        Timing:
        <input type="text" name="darshan[type][timing][]" class="input border p-2 mr-2" />
        <button
          type="button"
          id="delete-darshan-button"
          class="delete-darshan-button bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete Type
        </button>
      </div>`;

        darshanContainer.insertAdjacentHTML("beforeend", newItemInput);
      });

      darshanContainer.addEventListener("click", function (e) {
        console.log("clicked");
        if (e.target.classList.contains("delete-darshan-button")) {
          e.target.parentElement.remove();
        }
      });
    }

    addGodHandler();
    suggestAddressHandler();
  }

  function addGodHandler() {
    const addGodButton = document.getElementById("add-gods-button");
    const godsContainer = document.getElementById("godContainer");

    if (addGodButton && godsContainer) {
      addGodButton.addEventListener("click", function () {
        const newInputDiv = document.createElement("div");
        newInputDiv.classList.add("relative", "mb-4");

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "godIds[]";
        newInput.classList.add("suggestion-input", "input", "border", "p-2");
        newInput.autocomplete = "off";

        const suggestionBox = document.createElement("div");
        suggestionBox.classList.add(
          "absolute",
          "bg-white",
          "border",
          "border-gray-300",
          "w-full",
          "mt-1"
        );

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add(
          "bg-red-500",
          "text-white",
          "delete-gods-button",
          "px-2",
          "py-1",
          "rounded",
          "ml-2"
        );
        deleteButton.addEventListener("click", () => {
          inputDiv.remove();
        });

        newInputDiv.appendChild(newInput);
        newInputDiv.appendChild(suggestionBox);
        newInputDiv.appendChild(deleteButton);

        godsContainer.appendChild(newInputDiv);

        suggestionHandler(newInput, suggestionBox);
      });

      // document.querySelectorAll(".suggestion-input").forEach(suggestionHandler);
      godsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-gods-button")) {
          e.target.parentElement.remove();
        }
      });
    }
  }

  function addMediaHandler(isTemple) {
    const addMediaButton = document.getElementById("addItemButton");
    const mediaContainer = document.getElementById("itemContainer");

    if (addMediaButton && mediaContainer) {
      addMediaButton.addEventListener("click", function () {
        const newInputDiv = document.createElement("div");
        newInputDiv.classList.add("relative", "mb-4");

        const newInputMedia = document.createElement("input");
        newInputMedia.type = "text";
        newInputMedia.name = "media[]";
        newInputMedia.classList.add("input", "border", "p-2");
        newInputMedia.autocomplete = "off";

        const newInput1 = document.createElement("input");
        newInput1.type = "text";
        newInput1.name = "name[]";
        newInput1.classList.add("input", "border", "p-2");
        newInput1.autocomplete = "off";

        const tabInput = document.createElement("input");
        tabInput.type = "text";
        tabInput.name = "tab[]";
        tabInput.classList.add("input", "border", "p-2");
        tabInput.autocomplete = "off";

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "entityId[]";
        newInput.classList.add("suggestion-input", "input", "border", "p-2");
        newInput.autocomplete = "off";

        const suggestionBox = document.createElement("div");
        suggestionBox.classList.add(
          "absolute",
          "bg-white",
          "border",
          "border-gray-300",
          "w-full",
          "mt-1"
        );

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add(
          "bg-red-500",
          "text-white",
          "delete-gods-button",
          "px-2",
          "py-1",
          "rounded",
          "ml-2"
        );
        deleteButton.addEventListener("click", () => {
          inputDiv.remove();
        });

        newInputDiv.appendChild(newInput1);
        newInputDiv.appendChild(tabInput);
        newInputDiv.appendChild(newInput);
        newInputDiv.appendChild(suggestionBox);
        newInputDiv.appendChild(newInputMedia);
        newInputDiv.appendChild(deleteButton);

        mediaContainer.appendChild(newInputDiv);

        suggestionTempleHandler(newInput, suggestionBox, isTemple);
      });

      // document.querySelectorAll(".suggestion-input").forEach(suggestionHandler);
      mediaContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-gods-button")) {
          e.target.parentElement.remove();
        }
      });
    }
  }

  function suggestAddressHandler() {
    const addressInput = document.getElementById("addressSearch");
    const suggestionsList = document.getElementById("addressSuggestions");
    const lat = document.getElementById("lat");
    const lon = document.getElementById("lon");

    if (addressInput && suggestionsList) {
      addressInput.addEventListener("input", async () => {
        const query = addressInput.value;
        if (query.length >= 1) {
          const response = await fetch(`/api/address/suggest?q=${query}`);
          const results = await response.json();
          suggestionsList.innerHTML = "";

          results.data.forEach((result) => {
            const li = document.createElement("li");
            li.textContent = `${result.address1}, ${result.city}, ${result.state}`;
            li.classList.add("p-2", "cursor-pointer", "hover:bg-gray-200");
            li.addEventListener("click", () => {
              addressInput.value = result.id;
              if (lat && lon) {
                lat.value = result.latitude;
                lon.value = result.longitude;
              }
              suggestionsList.innerHTML = "";
            });
            suggestionsList.appendChild(li);
          });
        } else {
          suggestionsList.innerHTML = ""; // Clear suggestions if query is too short
        }
      });
    }
  }

  function suggestionHandler(inputField, suggestionBox) {
    if (inputField && suggestionBox) {
      inputField.addEventListener("input", async () => {
        const query = inputField.value;
        if (query.length < 1) {
          suggestionBox.innerHTML = "";
          return;
        }

        const response = await fetch(`api/gods/suggest?q=${query}`);
        const suggestions = await response.json();

        suggestionBox.innerHTML = "";
        suggestions.data.forEach((item) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add(
            "suggestion-item",
            "p-2",
            "hover:bg-gray-200",
            "cursor-pointer"
          );
          suggestionItem.textContent = item.name;
          suggestionItem.addEventListener("click", () => {
            inputField.value = item.id;
            suggestionBox.innerHTML = "";
          });
          suggestionBox.appendChild(suggestionItem);
        });
      });
    }
  }

  function suggestionTempleHandler(inputField, suggestionBox, isTemple) {
    if (inputField && suggestionBox) {
      inputField.addEventListener("input", async () => {
        const query = inputField.value;
        if (query.length < 1) {
          suggestionBox.innerHTML = "";
          return;
        }
        const url = isTemple
          ? `api/temple/suggest?q=${query}`
          : `api/katha/suggest?q=${query}`;

        const response = await fetch(url);
        const suggestions = await response.json();

        suggestionBox.innerHTML = "";
        suggestions.data.forEach((item) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add(
            "suggestion-item",
            "p-2",
            "hover:bg-gray-200",
            "cursor-pointer"
          );
          suggestionItem.textContent = isTemple ? item.name : item.title;
          suggestionItem.addEventListener("click", () => {
            inputField.value = item.id;
            suggestionBox.innerHTML = "";
          });
          suggestionBox.appendChild(suggestionItem);
        });
      });
    }
  }
});
