const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
var users = JSON.parse(localStorage.getItem("MyUsers")) || {};
var currentUser = localStorage.getItem("currentUser") || "";

function loginUser(event) {
  event.preventDefault();
  if (!validateInput()) return;

  currentUser = username.value;
  localStorage.setItem("currentUser", currentUser);
  window.location.replace("./index.html");
}

const setError = (element, message) => {
  const inputControl = element.closest(".input-control");
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.closest(".input-control");
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = " ";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInput = () => {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  let flag = true;

  if (usernameValue === "" || usernameValue == null) {
    setError(username, "Username is required");
    flag = false;
  } else if (!users.hasOwnProperty(usernameValue)) {
    setError(username, "Username doesn't exist");
    return false;
  } else {
    setSuccess(username);
  }

  if (passwordValue === "" || passwordValue == null) {
    setError(password, "Password is required");
    flag = false;
  } else if (users[usernameValue].password !== passwordValue) {
    setError(password, "Password is incorrect");
    flag = false;
  } else {
    setSuccess(password);
  }
  return flag;
};
