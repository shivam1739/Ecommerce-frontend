const categoryList = document.getElementById("categoryList");
const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";
const allProducts = document.getElementById("allProducts");

function loadCategories() {
  fetch(BASE_URL + "/categories", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      renderCategories(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function loadProducts() {
  fetch(BASE_URL + "/allProducts")
    .then((response) => response.json)
    .then((data) => {
      console.log(data);
    });
}

function renderCategories(categories) {
  let categoryListHtml =
    '<div class="products">' +
    '<a class="" id="allProducts" href="productlist.html">All Products</a>' +
    "</div>";
  for (i = 0; i < categories.length; i++) {
    categoryListHtml +=
      '<div class="products">' +
      '<a class="" href="productlist.html?categoryId=' +
      categories[i].id +
      '">' +
      categories[i].name +
      "</a>" +
      "</div>";
  }

  categoryList.innerHTML = categoryListHtml;
}

// allProducts.addEventListener("click", loadProducts);
loadCategories();
