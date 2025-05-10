// Load Header
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
    login_or_out();
  });

// Load Footer
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });
// onpagereveal
function login_or_out() {
  let currentUser = localStorage.getItem("currentUser") || "";
  let users = JSON.parse(localStorage.getItem("MyUsers")) || {};
  let loginButton = document.getElementById("login-btn");
  if (currentUser) {
    loginButton.innerHTML = `Logout`;
  } else {
    loginButton.innerHTML = `Login`;
  }
  localStorage.setItem("currentUser", currentUser);
  localStorage.setItem("MyUsers", JSON.stringify(users));
}

function logout() {
  localStorage.removeItem("currentUser");
}

function goFavorites() {
  let currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("MyUsers"));

  if (users.hasOwnProperty(currentUser) && currentUser) {
    window.location = `./favorites.html`;
  } else {
    goLogin();
  }
}

function goLogin() {
  window.location = `./login.html`;
}
