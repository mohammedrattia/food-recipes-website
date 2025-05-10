// Load Header
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
    currentTheme = localStorage.getItem("currentTheme") || "lightmode";
    switchthemes = document.getElementById("switch-themes");
    root = document.documentElement;
    login_or_out();
    if (currentTheme === "darkmode") {
      enableDarkmode();
    } else {
      disableDarkmode();
    }
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

// Switch Themes Button

function enableDarkmode() {
  root.classList.add("darkmode");
  localStorage.setItem("currentTheme", "darkmode");
  switchthemes.getElementsByTagName("svg")[0].style.display = "block";
  switchthemes.getElementsByTagName("svg")[1].style.display = "none";
}

function disableDarkmode() {
  root.classList.remove("darkmode");
  localStorage.setItem("currentTheme", "lightmode");
  switchthemes.getElementsByTagName("svg")[1].style.display = "block";
  switchthemes.getElementsByTagName("svg")[0].style.display = "none";
}

function switchTheme() {
  currentTheme = localStorage.getItem("currentTheme");
  if (currentTheme === "darkmode") {
    console.log("I don't work");
    disableDarkmode();
  } else {
    console.log("I work");
    enableDarkmode();
  }
}
