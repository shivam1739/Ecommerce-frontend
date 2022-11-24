const searchProduct = document.getElementById("searchProduct");
const categoryList = document.getElementById("category-list");
const minimun = document.getElementById("minimum");
const maximun = document.getElementById("maximun");
const clearFilterBtn = document.getElementById("clearFilter");
const productsList = document.getElementById("product_list");
const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";

function loadCategories() {
  fetch(BASE_URL + "/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
      renderCategories(data);
    })
    .catch((error) => console.error(error));
}

function renderCategories(categories) {
  let categoryListHtml = "";
  for (let i = 0; i < categories.length; i++) {
    categoryListHtml +=
      '<a class="" href="productList.html?categoryId=' +
      categories[i].id +
      '">' +
      categories[i].name +
      " " +
      "</a>";
  }
  categoryList.innerHTML = categoryListHtml;
}

function loadProducts() {
  let data = {};
  if (window.location.search) {
    data.id = window.location.search.split("=")[1];
  }
  let URI = "";
  console.log(data);
  if (data.id) {
    URI = `/categories/${data.id}/products`;
  } else {
    URI = `/products`;
  }
  fetch(BASE_URL + URI, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("success", data);
      renderProducts(data);
    })
    .catch((error) => console.log(error));
}

function renderProducts(products) {
  var productListHtml = "";
  for (let i = 0; i < products.length; i++) {
    productListHtml +=
      ' <div class="products">' +
      ' <a href="productDetails.html?productId=' +
      products[i].id +
      ' " >' +
      '<div class="productimg">' +
      '<img src="https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UL480_FMwebp_QL65_.jpg"' +
      'alt="not found"/> ' +
      "</div>" +
      '<div class="productName">' +
      products[i].name +
      "</div>" +
      '<div class="productPrice">&#8377; ' +
      products[i].cost +
      "</div>" +
      "</a>" +
      "</div>";
  }

  productsList.innerHTML = productListHtml;
}

loadCategories();
loadProducts();
