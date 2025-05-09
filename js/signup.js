// document.getElementById("signup-btn").addEventListener("click", addUser());

function addUser() {
  let users = JSON.parse(localStorage.getItem("MyUsers")) || {};
  let username = document.getElementById("username-input").value;
  let email = document.getElementById("email-input").value;
  let password = document.getElementById("password-input").value;
  let confirmPassword = document.getElementById("confirm-password-input").value;
  let user = {
    email: email,
    username: username,
    password: password,
    favorites: [],
  };
  //   if (validate(username, email, password, confirmPassword)) {
  //     return;
  //   }
  if (users[username] == null) {
    users[username] = user;
  } else {
    existed_user();
    // return
    // need further edit
  }
  localStorage.setItem("MyUsers", JSON.stringify(users));
}

// edit the function to show alert message if the username already exists
function existed_user() {
  alert("There is already a user with this username");
}

// edit the validation function
function validate(username, email, password, confirmPassword) {
  if (username == "" || email == "" || password == "") {
    alert("please complete your information");
    return true;
  }
  if (password != confirmPassword) {
    alert("passwords should be the same");
    return true;
  }
}
