const productContainer = document.getElementById("productCon");
const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";
const AddToCartBtn = document.getElementById("Add");
const GoToCartBtn = document.getElementById("Go");

function loadProducts() {
  const productId = window.location.search.split("=")[1];
  console.log(productId);
  fetch(BASE_URL + `/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        renderProductDetails(data);
      }
    });
}

function renderProductDetails(data) {
  const productDetailsHtml =
    `<div class="productData">` +
    `<div class="image">` +
    `<img src="https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UL480_FMwebp_QL65_.jpg" />` +
    `</div>` +
    `<div class="leftCont">` +
    `<div class="name">` +
    data.name +
    `</div>` +
    `<div class="cost">&#8377; ` +
    data.cost +
    `</div>` +
    `<div class="description">` +
    data.description +
    `</div>
        
      </div>
    </div>`;

  productContainer.innerHTML = productDetailsHtml;
}

// function addToCart() {
//   const productId = window.location.search.split("=")[1];
//   const cartId = localStorage.getItem("cartId");
//   const token = localStorage.getItem("token");
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
//   const data = { productId: [productId] };
//   fetch(BASE_URL + `/carts/${cartId}`, {
//     method: "PUT",
//     headers: headers,
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// }

function goToCart() {}
// AddToCartBtn.addEventListener("click", addToCart());
// GoToCartBtn.addEventListener("click", goToCart());

loadProducts();
