"use strict";
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

const formMessage = document.querySelector(".form-message");

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const addItem = function (e) {
  e.preventDefault();

  let formValue = itemInput.value;

  // Create list item
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(formValue));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
  itemInput.value = "";

  // Validate statement
  if (formValue === "") {
    formMessage.classList.add("message-warning");
    li.remove();
    setTimeout(function () {
      formMessage.classList.remove("message-warning");
    }, 2000);
  }

  // Update UI
  checkUI();
};

const removeItem = function (e) {
  let targetElement = e.target;
  if (targetElement.parentElement.classList.contains("remove-item")) {
    targetElement.parentElement.parentElement.remove();
  }
  if (!targetElement) return;

  // Update UI
  checkUI();
};

const removeAllItems = function () {
  itemList.innerHTML = ``;

  // Update UI
  checkUI();
};

const filterItems = function (e) {
  const allItems = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  allItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const checkUI = function () {
  const allItems = itemList.querySelectorAll("li");
  if (allItems.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
};

// Initialize checkUI
checkUI();

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeAllItems);
itemFilter.addEventListener("input", filterItems);
