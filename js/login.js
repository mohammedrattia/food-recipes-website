function loginUser(event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("MyUsers"));
  let currentUser = localStorage.getItem("currentUser") || "";
  let username = document.getElementById("username-input").value;
  let password = document.getElementById("password-input").value;

  console.log("code works");
  if (
    users != null &&
    users[username] != null &&
    users[username].username == username &&
    users[username].password == password
  ) {
    currentUser = username;
    localStorage.setItem("currentUser", currentUser);
    window.location.replace("./index.html");
    console.log("ay 7aga");
  } else {
    not_existed_user();
  }
};

// edit the function to show alert message if the username already exists
function not_existed_user() {
  alert("Enter Valid Credentials");
};
