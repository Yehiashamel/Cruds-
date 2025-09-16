var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addInput = document.getElementById("btnAdd");
var updateInput = document.getElementById("update");
var searchInput = document.getElementById("Search");

let productContainer;
currantIndex = 0; //Conter for udpdate

// Check found element or no
if (localStorage.getItem("myproduct") != null) {
  productContainer = JSON.parse(localStorage.getItem("myproduct"));
  displayProducts(productContainer);
} else {
  productContainer = [];
}

// Start Point
addInput.addEventListener("click", function () {
  addProduct();
  clearProducts();
  displayProducts(productContainer);
});

// Add
function addProduct() {
  if (validationProductName() && validationPrice() && validationCat()) {
    let Products = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
    productContainer.push(Products);
    localStorage.setItem("myproduct", JSON.stringify(productContainer));
  }
  else {
    alert("Invalid Inputs");
  }
}


// Clear

function clearProducts() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

// Display
function displayProducts(listProducts) {
  let cartona = ``;
  for (let i = 0; i < listProducts.length; i++) {
    cartona += `
        <tr>
        <td>${i}</td>
        <td>${listProducts[i].name}</td>
        <td>${listProducts[i].price}</td>
        <td>${listProducts[i].category}</td>
        <td>${listProducts[i].desc}</td>
        <td><button class="btn btn-dark " onclick="updated(${i})">Update</button></td>
        <td><button class="btn btn-secondary " onclick="deleted(${i})">Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("body").innerHTML = cartona;
}

// Delete
function deleted(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("myproduct", JSON.stringify(productContainer));
  displayProducts(productContainer);
}

// Search
function Searech(term) {
  var containerSearch = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      containerSearch.push(productContainer[i]);
    }
    displayProducts(containerSearch);
  }
}

// Function Udeate
function updated(index) {
  currantIndex = index;
  productNameInput.value = productContainer[index].name;
  productPriceInput.value = productContainer[index].price;
  productDescInput.value = productContainer[index].desc;
  productCategoryInput.value = productContainer[index].category;
  addInput.classList.add("d-none");
  updateInput.classList.remove("d-none");
}
updateInput.addEventListener("click", function () {
  addInput.classList.remove("d-none");
  updateInput.classList.add("d-none");
  if (validationProductName() && validationPrice() && validationCat()) {
    let Products = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
    productContainer[currantIndex] = Products;
    localStorage.setItem("myproduct", JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearProducts();
  }
  else {
    alert("Invalid Inputs");
  }


});

// End Update



productNameInput.addEventListener("input", validationProductName)

function validationProductName() {
  var regx = /^[A-Z][a-z]{3,8}$/;
  if (regx.test(productNameInput.value) == true) {
    productNameInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    return false;
  }
}

productPriceInput.addEventListener("input", validationPrice)

function validationPrice() {
  var regx = /^\d+(?:\.\d+)?(?:,\d+(?:\.\d+)?)*$/;
  if (regx.test(productPriceInput.value) == true) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    return false;
  }
}

productCategoryInput.addEventListener("input", validationCat)

function validationCat() {
  var regx = /^[A-Z][a-z]{3,10}$/;
  if (regx.test(productCategoryInput.value) == true) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    return false;
  }
}
