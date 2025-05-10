var users = JSON.parse(localStorage.getItem("MyUsers")) || {};
function addUser() {
  if (!validateInput()) {
    return;
  };
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let user = {
    email: email,
    username: username,
    password: password,
    favorites: [],
  };

  users[username] = user;
  localStorage.setItem("MyUsers", JSON.stringify(users));
  window.location = './login.html';
};

const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

form.addEventListener('submit', e => {
  e.preventDefault();
});

const setError = (element, message) => {
  const inputControl = element.closest('.input-control');
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const setSuccess = element => {
  const inputControl = element.closest('.input-control');
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = ' ';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
}

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInput = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  let flag = true;

  if (usernameValue === '' || usernameValue == null) {
    setError(username, 'Username is required');
    flag = false;
  } else if (users[usernameValue] != null){
    setError(username, 'User already exists with this username');
    flag = false;
  } else {
    setSuccess(username);
  }

  if (emailValue === '' || emailValue == null) {
    setError(email, 'Email is required');
    flag = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
    flag = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === '' || passwordValue == null) {
    setError(password, 'Password is required');
    flag = false;
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 characters.');
    flag = false;
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === '' || confirmPasswordValue == null) {
    setError(confirmPassword, 'Please confirm your password');
    flag = false;
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "Passwords doesn't match");
    flag = false;
  } else {
    setSuccess(confirmPassword);
  }
  return flag;
};