const userName = document.getElementById("userName");
// const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";
userName.innerHTML = "Hii " + (localStorage.getItem("username") || "User");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", logoutFn);

function logoutFn() {
  localStorage.clear();
}

if (!localStorage.getItem("username")) {
  window.location.href = "login.html";
  exit;
}
