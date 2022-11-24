const showSignupTitle = document.getElementById("signupTitle");
const showLoginTitle = document.getElementById("loginTitle");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const succErrMsg = document.getElementById("succErrMsg");
const authErrMsg = document.getElementById("authErrMsg");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const signupUsername = document.getElementById("signUpUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const showSignupBtn = document.getElementById("showSignupbtn");
const showLoginBtn = document.getElementById("showloginbtn");

showSignupBtn.addEventListener("click", showSignupform);
showLoginBtn.addEventListener("click", showLoginform);
signupBtn.addEventListener("click", signupFn);
loginBtn.addEventListener("click", loginFn);

function showLoginform() {
  signupForm.classList.add("hide");
  loginForm.classList.remove("hide");
  showLoginTitle.classList.remove("hide");
  showSignupTitle.classList.add("hide");
}

function showSignupform() {
  signupForm.classList.remove("hide");
  loginForm.classList.add("hide");
  showLoginTitle.classList.add("hide");
  showSignupTitle.classList.remove("hide");
}
function removeErr() {
  setTimeout(() => {
    authErrMsg.innerText = "";
    succErrMsg.innerText = "";
  }, 1000);
}
const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";

async function loginFn() {
  if (loginUsername.value == "") {
    updateAuthErrorMsg("Username should not be empty");
  } else if (loginPassword.value == "") {
    updateAuthErrorMsg("Password should not be empty");
  } else {
    const data = {
      username: loginUsername.value,
      password: loginPassword.value,
    };
    fetch(BASE_URL + "/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("hiiiiii");
        console.log("Success:", data.accessToken);
        if (data.accessToken) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("email", data.email);

          createCart();
        } else {
          updateAuthErrorMsg(data.msg);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function signupFn() {
  if (signupUsername.value == "") {
    updateAuthErrorMsg("Username should not be empty");
  } else if (signupPassword.value == "") {
    updateAuthErrorMsg("Password should not be empty");
  } else {
    const data = {
      username: signupUsername.value,
      password: signupPassword.value,
      email: signupEmail.value,
    };
    fetch(BASE_URL + "/auth/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        updateSuccErrorMsg(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

async function createCart() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const headers = {
    "content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  fetch(BASE_URL + "/carts", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("cartId", data.id);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateAuthErrorMsg(msg) {
  authErrMsg.innerText = msg;
  removeErr();
}
function updateSuccErrorMsg(msg) {
  succErrMsg.innerText = msg;
  removeErr();
}

function redirectToHome() {
  window.location.href = "/";
}

if (localStorage.getItem("username")) {
  window.location.href = "index.html";
}
